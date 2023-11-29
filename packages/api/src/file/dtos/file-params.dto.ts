import {IsString, IsUUID} from 'class-validator';

export class FileParamsDto {
  @IsString()
  @IsUUID()
  id: string;
}
