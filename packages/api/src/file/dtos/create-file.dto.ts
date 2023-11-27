import {IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength} from "class-validator";
import {AccessType} from "@prisma/client";

export class CreateFileDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @IsString()
    @IsOptional()
    folderId?: string;

    @IsString()
    @IsEnum(AccessType)
    type: AccessType;
}
