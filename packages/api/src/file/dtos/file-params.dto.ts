import {IsString, IsUUID} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class FileParamsDto {
  @ApiProperty({
    type: 'string',
    description: 'file`s id',
    example: 'a2ed2955-3528-463d-8c6f-13ef548b1fec',
  })
  @IsString()
  @IsUUID()
  id: string;
}
