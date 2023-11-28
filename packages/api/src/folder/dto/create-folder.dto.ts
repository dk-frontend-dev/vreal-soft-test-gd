import {IsArray, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength} from "class-validator";

export class CreateFolderDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @IsString()
    @IsUUID()
    @IsOptional()
    parentId?: string;

    @IsArray()
    userEmails: string[];
}
