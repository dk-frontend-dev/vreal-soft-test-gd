import {
    Body,
    Controller, Delete,
    Get, Param,
    Post, Put, Query,
    UploadedFile, UseGuards,
    UseInterceptors
} from "@nestjs/common";
import {FileService} from "@/file/file.service";
import {AccessType, File, User} from "@prisma/client";
import {FileInterceptor} from "@nestjs/platform-express";
import {CustomParseFilePipe} from "@/@pipes/file.pipe";
import {ALLOWED_FILE_TYPES, ONE_MB} from "@/@constants/file.constant";
import {CreateFileDto} from "@/file/dtos/create-file.dto";
import {UpdateFileDto} from "@/file/dtos/update-file.dto";
import {JwtAuthGuard} from "@/@guards/jwt-auth.guard";
import {CurrentUser} from "@/@decorators/current-user.decorator";
import {CurrentFileAccessGuard} from "@/@guards/current-file-access.guard";
import {GetFilesDto} from "@/file/dtos/get-files.dto";
import {FileQueryDto} from "@/file/dtos/file-query.dto";
import {ParentFolderFileAccessGuard} from "@/@guards/parent-folder-file-access.guard";
import {FileParamsDto} from "@/file/dtos/file-params.dto";

@UseGuards(JwtAuthGuard)
@Controller('files')
export class FileController {
    constructor(private fileService: FileService) {}

    @Get()
    async index(@CurrentUser() user: User, @Query() query: GetFilesDto): Promise<File[]> {
        return this.fileService.findMany({
            folderId: query.folderId ?? null,
            OR: [
                {type: AccessType.PUBLIC},
                {userId: user.id}
            ]
        });
    }

    @Get('all')
    async getAll(@CurrentUser() user: User): Promise<File[]> {
        return this.fileService.findMany(
            {
                OR: [
                    {type: AccessType.PUBLIC},
                    {userId: user.id}
                ]
            }
        )
    }

    @UseGuards(CurrentFileAccessGuard)
    @Delete(':id')
    async delete(@Param() params: FileParamsDto): Promise<void> {
        return this.fileService.delete(params.id);
    }

    @UseGuards(ParentFolderFileAccessGuard)
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(@UploadedFile(
        new CustomParseFilePipe({
            fileType: ALLOWED_FILE_TYPES,
            maxSize: ONE_MB * 4,
            isRequired: true
        }),
    ) file: Express.Multer.File, @Body() payload: CreateFileDto, @Query() query: FileQueryDto,  @CurrentUser() user: User): Promise<File> {
        return this.fileService.create(user, payload, query.folderId, file);
    }

    @UseGuards(ParentFolderFileAccessGuard, CurrentFileAccessGuard)
    @Put(':id')
    @UseInterceptors(FileInterceptor('file'))
    async update(
        @Param() params: FileParamsDto,
        @Query() query: FileQueryDto,
        @UploadedFile(
            new CustomParseFilePipe({
                fileType: ALLOWED_FILE_TYPES,
                maxSize: ONE_MB * 4,
                isRequired: false
            }),
        ) file: Express.Multer.File,
        @Body() payload: UpdateFileDto,
    ): Promise<File> {
            return this.fileService.update(params.id, payload, file, query.folderId);
    }
}
