import {IsArray, IsNotEmpty, IsOptional, IsString, MaxLength} from "class-validator";

export class CreateFolderDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @IsString()
    @IsOptional()
    parentId?: string;

    @IsArray()
    userIds: string[];
}
