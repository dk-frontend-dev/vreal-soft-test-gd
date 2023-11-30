import {IsString, IsUUID} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class FolderParamsDto {
  @ApiProperty({
    type: 'string',
    description: 'folder`s id',
    example: 'a2ed2955-3528-463d-8c6f-13ef548b1fec',
  })
  @IsString()
  @IsUUID()
  id: string;
}
