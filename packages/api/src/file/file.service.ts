import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from '@/@services/prisma/prisma.service';
import {Prisma, User} from '@prisma/client';
import {File} from '@prisma/client';
import * as fs from 'fs';
import {v4 as uuid} from 'uuid';
import * as path from 'path';
import {join} from 'path';
import {StoredFileData} from '@/@models/file.model';
import {CreateFileDto} from '@/file/dtos/create-file.dto';
import {UpdateFileDto} from '@/file/dtos/update-file.dto';

@Injectable()
export class FileService {
  private readonly uploadDir = join(__dirname, '..', 'public');

  constructor(private prisma: PrismaService) {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir);
    }
  }

  public async findMany(where: Prisma.FileWhereInput = {}): Promise<File[]> {
    return this.prisma.file.findMany({where});
  }

  public async findOne(where: Prisma.FileWhereUniqueInput): Promise<File> {
    return this.prisma.file.findUnique({where});
  }

  public async create(user: User, payload: CreateFileDto, folderId: string, file: Express.Multer.File): Promise<File> {
    const fileData = await this.storeFile(file);

    return this.prisma.file.create({
      data: {
        name: payload.name,
        extension: fileData.extension,
        storedFileName: fileData.storedFileName,
        folder: folderId ? {connect: {id: folderId}} : {},
        type: payload.type,
        user: {
          connect: {
            id: user.id
          }
        }
      }
    });
  }

  public async update(id: string, payload: UpdateFileDto, file: Express.Multer.File, folderId: string): Promise<File> {
    const fileExists = await this.findOne({id});

    let fileData: StoredFileData | null = null;

    if (file) {
      fileData = await this.storeFile(file);
    }

    return this.prisma.file.update({
      where: {id},
      data: {
        name: payload.name,
        type: payload.type,
        extension: fileData?.extension ?? fileExists.extension,
        storedFileName: fileData?.storedFileName ?? fileExists.storedFileName,
        folder: folderId ? {connect: {id: folderId}} : {disconnect: true}
      }
    });
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.file.delete({
      where: {id}
    });
  }

  public async storeFile(file: Express.Multer.File): Promise<StoredFileData> {
    try {
      const extension = path.extname(file.originalname);
      const fileName = `${uuid()}${extension}`;
      const filePath = path.join(this.uploadDir, fileName);

      fs.writeFileSync(filePath, file.buffer);
      return {storedFileName: fileName, extension};
    } catch {
      throw new BadRequestException('Error saving file');
    }
  }
}
