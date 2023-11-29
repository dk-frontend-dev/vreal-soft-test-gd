import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {FileService} from '@/file/file.service';
import {AccessType, File, User} from '@prisma/client';
import {FileInterceptor} from '@nestjs/platform-express';
import {CustomParseFilePipe} from '@/@pipes/file.pipe';
import {ALLOWED_FILE_TYPES, filesDir, ONE_MB} from '@/@constants/file.constant';
import {CreateFileDto} from '@/file/dtos/create-file.dto';
import {UpdateFileDto} from '@/file/dtos/update-file.dto';
import {JwtAuthGuard} from '@/@guards/jwt-auth.guard';
import {CurrentUser} from '@/@decorators/current-user.decorator';
import {CurrentFileAccessGuard} from '@/@guards/current-file-access.guard';
import {GetFilesDto} from '@/file/dtos/get-files.dto';
import {FileQueryDto} from '@/file/dtos/file-query.dto';
import {ParentFolderFileAccessGuard} from '@/@guards/parent-folder-file-access.guard';
import {FileParamsDto} from '@/file/dtos/file-params.dto';
import {join} from "path";

@Controller('files')
export class FileController {
  constructor(private fileService: FileService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async index(@CurrentUser() user: User, @Query() query: GetFilesDto): Promise<File[]> {
    return this.fileService.findMany({
      folderId: query.folderId ?? null,
      OR: [
        {type: AccessType.PUBLIC},
        {
          folder: {
            OR: [
              {
                access: {
                  some: {
                    userEmail: user.email
                  }
                }
              },
              {
                userId: user.id
              }
            ]
          }
        },
        {userId: user.id}
      ]
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async findMany(@CurrentUser() user: User, @Query() query) {
    return this.fileService.findMany({
      name: {
        contains: query.name,
      },
      OR: [
        {type: AccessType.PUBLIC},
        {
          folder: {
            OR: [
              {
                access: {
                  some: {
                    userEmail: user.email
                  }
                }
              },
              {
                userId: user.id
              }
            ]
          }
        },
        {userId: user.id}
      ]
    })
  }

  @Get('file/:filename')
  async sendFile(@Param('filename') filename: string, @Res() res) {
    return res.sendFile(join(filesDir, `${filename}`))
  }

  @UseGuards(JwtAuthGuard, CurrentFileAccessGuard)
  @Delete(':id')
  async delete(@Param() params: FileParamsDto): Promise<void> {
    return this.fileService.delete(params.id);
  }

  @UseGuards(JwtAuthGuard, ParentFolderFileAccessGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile(
      new CustomParseFilePipe({
        fileType: ALLOWED_FILE_TYPES,
        maxSize: ONE_MB * 4,
        isRequired: true
      })
    )
    file: Express.Multer.File,
    @Body() payload: CreateFileDto,
    @Query() query: FileQueryDto,
    @CurrentUser() user: User
  ): Promise<File> {
    return this.fileService.create(user, payload, query.folderId, file);
  }

  @UseGuards(JwtAuthGuard, ParentFolderFileAccessGuard, CurrentFileAccessGuard)
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
      })
    )
    file: Express.Multer.File,
    @Body() payload: UpdateFileDto
  ): Promise<File> {
    return this.fileService.update(params.id, payload, file, query.folderId);
  }
}
