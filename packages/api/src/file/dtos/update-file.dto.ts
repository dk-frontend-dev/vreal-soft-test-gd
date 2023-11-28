import {IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength} from "class-validator";
import {AccessType} from "@prisma/client";

export class UpdateFileDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @IsString()
    @IsEnum(AccessType)
    type: AccessType;
}
