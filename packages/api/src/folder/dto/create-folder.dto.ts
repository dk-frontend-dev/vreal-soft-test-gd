import {IsArray, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateFolderDto {
  @ApiProperty({
    type: 'string',
    description: 'folder`s name',
    example: 'some folder name',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'folder`s parent id',
    example: 'a2ed2955-3528-463d-8c6f-13ef548b1fec',
    required: false
  })
  @IsString()
  @IsUUID()
  @IsOptional()
  parentId?: string;

  @ApiProperty({
    type: 'array',
    description: 'folder`s granted users',
    example: ['davidkasumov@gmail.com'],
  })
  @IsArray()
  userEmails: string[];
}
