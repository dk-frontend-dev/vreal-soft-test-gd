import {IsOptional, IsString, IsUUID} from 'class-validator';

export class FileQueryDto {
  @IsString()
  @IsUUID()
  @IsOptional()
  folderId?: string;
}
