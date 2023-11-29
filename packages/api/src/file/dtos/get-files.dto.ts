import {IsOptional, IsString, IsUUID} from 'class-validator';

export class GetFilesDto {
  @IsString()
  @IsUUID()
  @IsOptional()
  folderId?: string;
}
