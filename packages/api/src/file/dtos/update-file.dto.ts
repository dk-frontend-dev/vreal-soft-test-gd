import {IsEnum, IsNotEmpty, IsString, MaxLength} from 'class-validator';
import {AccessType} from '@prisma/client';
import {ApiProperty} from "@nestjs/swagger";
import fs from "fs";

export class UpdateFileDto {
  @ApiProperty({
    type: 'string',
    description: 'file`s name',
    example: 'some file'
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    type: 'enum',
    description: 'file`s type',
    enum: AccessType,
    example: AccessType.PUBLIC
  })
  @IsString()
  @IsEnum(AccessType)
  type: AccessType;

  @ApiProperty({
    description: 'file`s file'
  })
  file: fs.promises.FileHandle;
}
