import {IsString, IsUUID} from 'class-validator';

export class FolderParamsDto {
  @IsString()
  @IsUUID()
  id: string;
}
