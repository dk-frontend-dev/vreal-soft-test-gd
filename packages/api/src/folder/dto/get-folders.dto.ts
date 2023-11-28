import {IsOptional, IsString, IsUUID} from "class-validator";

export class GetFoldersDto {
    @IsString()
    @IsUUID()
    @IsOptional()
    parentId?: string;
}
