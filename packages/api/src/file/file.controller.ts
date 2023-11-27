import {
    Body,
    Controller, Delete,
    Get, Param,
    Post, Put,
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
import {FileAccessGuard} from "@/@guards/file-access.guard";

@UseGuards(JwtAuthGuard)
@Controller('files')
export class FileController {
    constructor(private fileService: FileService) {}

    @Get()
    async index(@CurrentUser() user: User): Promise<File[]> {
        return this.fileService.findMany({
            folderId: null,
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

    @UseGuards(FileAccessGuard)
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.fileService.delete(id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(@UploadedFile(
        new CustomParseFilePipe({
            fileType: ALLOWED_FILE_TYPES,
            maxSize: ONE_MB * 4,
            isRequired: true
        }),
    ) file: Express.Multer.File, @Body() payload: CreateFileDto, @CurrentUser() user: User): Promise<File> {
        return this.fileService.create(user, payload, file);
    }

    @UseGuards(FileAccessGuard)
    @Put(':id')
    @UseInterceptors(FileInterceptor('file'))
    async update(
        @Param('id') id: string,
        @UploadedFile(
            new CustomParseFilePipe({
                fileType: ALLOWED_FILE_TYPES,
                maxSize: ONE_MB * 4,
                isRequired: false
            }),
        ) file: Express.Multer.File,
        @Body() payload: UpdateFileDto,
        @CurrentUser() user: User,
    ): Promise<File> {
            return this.fileService.update(id, payload, file, user);
    }
}
