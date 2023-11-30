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
import {ApiConsumes, ApiCreatedResponse, ApiOperation, ApiQuery, ApiTags} from "@nestjs/swagger";
import {FileResponseDto} from "@/file/dtos/file-response.dto";

@ApiTags('Files')
@Controller('files')
export class FileController {
  constructor(private fileService: FileService) {}

  @ApiOperation({ summary: 'get all files that you have access to' })
  @ApiQuery({ name: 'folderId', type: GetFilesDto })
  @ApiCreatedResponse({
    type: [FileResponseDto],
    description: 'files response',
  })
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

  @ApiOperation({ summary: 'get all files that you have access to by name' })
  @ApiQuery({ name: 'name', type: 'string' })
  @ApiCreatedResponse({
    type: [FileResponseDto],
    description: 'files response',
  })
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

  @ApiOperation({ summary: 'get stored file resource' })
  @Get('file/:filename')
  async sendFile(@Param('filename') filename: string, @Res() res) {
    return res.sendFile(join(filesDir, `${filename}`))
  }

  @ApiOperation({ summary: 'delete file' })
  @UseGuards(JwtAuthGuard, CurrentFileAccessGuard)
  @Delete(':id')
  async delete(@Param() params: FileParamsDto): Promise<void> {
    return this.fileService.delete(params.id);
  }

  @ApiOperation({ summary: 'create file' })
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({
    type: [FileResponseDto],
    description: 'files response',
  })
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

  @ApiOperation({ summary: 'update file' })
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({
    type: [FileResponseDto],
    description: 'files response',
  })
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
