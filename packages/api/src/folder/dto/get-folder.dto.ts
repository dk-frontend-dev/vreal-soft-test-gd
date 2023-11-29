import {IsString, IsUUID} from 'class-validator';

export class GetFolderDto {
  @IsString()
  @IsUUID()
  id: string;
}
