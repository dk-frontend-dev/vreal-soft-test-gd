import {ApiProperty} from "@nestjs/swagger";

export class UserResponseDto {
    @ApiProperty({
        description: 'users`s Id',
        example: 'a2ed2955-3528-463d-8c6f-13ef548b1fec',
    })
    id: string;

    @ApiProperty({
        example: 'some@mail.com',
        description: 'users`s email',
    })
    email: string;

    @ApiProperty({
        example: 'Davyd',
        description: 'users`s name',
    })
    firstName: string | null

    @ApiProperty({
        example: 'Kasumov',
        description: 'users`s last name',
    })
    lastName: string | null

    @ApiProperty({
        example: 'https://google.com/some-picture',
        description: 'users`s avatar',
    })
    picture: string

    @ApiProperty({
        example: new Date().toISOString(),
        description: 'users`s createdAt',
    })
    createdAt: Date

    @ApiProperty({
        example: new Date().toISOString(),
        description: 'users`s updatedAt',
    })
    updatedAt: Date
}

export class RefreshTokenResponseDto {
    @ApiProperty({
        example: 'some access token',
        description: 'users`s access token',
    })
    accessToken: string;
}
