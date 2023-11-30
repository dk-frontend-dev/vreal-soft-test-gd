import {ApiProperty} from "@nestjs/swagger";
import {folderAccessExampleResponse} from "@/@constants/swagger.constant";

export class FolderAccessResponseDto {
    @ApiProperty({
        description: 'folder access Id',
        example: 'a2ed2955-3528-463d-8c6f-13ef548b1fec',
    })
    id: string

    @ApiProperty({
        description: 'folder access parent id',
        example: 'a2ed2955-3528-463d-8c6f-13ef548b1fec',
    })
    folderId: string

    @ApiProperty({
        description: 'folder access user email',
        example: 'davidkasumovfrontend@gmail.com',
    })
    userEmail: string
}

export class FolderResponseDto {
    @ApiProperty({
        type: 'string',
        description: 'folder`s Id',
        example: 'a2ed2955-3528-463d-8c6f-13ef548b1fec',
    })
    id: string;

    @ApiProperty({
        type: 'string',
        description: 'folder`s name',
        example: 'some folder name',
    })
    name: string;

    @ApiProperty({
        description: 'folder`s parent id',
        example: 'a2ed2955-3528-463d-8c6f-13ef548b1fec',
    })
    parentId: string | null;

    @ApiProperty({
        type: 'string',
        description: 'folder`s user id',
        example: 'a2ed2955-3528-463d-8c6f-13ef548b1fec',
    })
    userId: string

    @ApiProperty({
        type: Date,
        description: 'folder`s createdAt',
        example: new Date().toISOString(),
    })
    createdAt: Date

    @ApiProperty({
        type: Date,
        description: 'folder`s updatedAt',
        example: new Date().toISOString(),
    })
    updatedAt: Date
}

export class FolderResponseWithAccessDto extends FolderResponseDto {
    @ApiProperty({
        type: 'array',
        description: 'folder`s granted users',
        example: [folderAccessExampleResponse],
    })
    access: FolderAccessResponseDto[];
}
