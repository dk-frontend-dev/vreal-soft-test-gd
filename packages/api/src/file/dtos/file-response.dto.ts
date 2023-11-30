import {ApiProperty} from "@nestjs/swagger";
import {AccessType} from "@prisma/client";

export class FileResponseDto {
    @ApiProperty({
        description: 'file access Id',
        example: 'a2ed2955-3528-463d-8c6f-13ef548b1fec',
    })
    id: string

    @ApiProperty({
        description: 'file`s name',
        example: 'some name',
    })
    name: string

    @ApiProperty({
        description: 'file`s extension',
        example: '.svg',
    })
    extension: string

    @ApiProperty({
        description: 'file`s stored file name',
        example: 'a2ed2955-3528-463d-8c6f-13ef548b1fec.svg',
    })
    storedFileName: string

    @ApiProperty({
        type: 'enum',
        description: 'file`s type',
        example: AccessType.PUBLIC,
        enum: AccessType
    })
    type: AccessType

    @ApiProperty({
        type: 'string',
        description: 'file`s parent folder id',
        example: 'a2ed2955-3528-463d-8c6f-13ef548b1fec.svg',
        required: false
    })
    folderId: string | null

    @ApiProperty({
        type: 'string',
        description: 'file`s user id',
        example: 'a2ed2955-3528-463d-8c6f-13ef548b1fec.svg',
    })
    userId: string

    @ApiProperty({
        type: 'date',
        description: 'file`s createdAt',
        example: new Date().toISOString(),
    })
    createdAt: Date

    @ApiProperty({
        type: 'date',
        description: 'file`s updatedAt',
        example: new Date().toISOString(),
    })
    updatedAt: Date
}
