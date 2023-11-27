import {Controller, Get, Post, Req, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {UserService} from "@/user/user.service";
import {AccessToken, UserResponse} from "@/@models/user.model";
import {User} from "@prisma/client";
import {JwtAuthGuard} from "@/@guards/jwt-auth.guard";
import {CurrentUser} from "@/@decorators/current-user.decorator";

@Controller()
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get('users')
    async index(): Promise<User[]> {
        return this.userService.findMany();
    }

    @Post('users/refresh')
    async refreshAccessToken(@CurrentUser() user: User): Promise<AccessToken> {
        const accessToken = this.userService.generateJwt({id: user.id, email: user.email});

        return {accessToken}
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req): Promise<void> {}

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req): Promise<UserResponse> {
        return this.userService.signIn(req.user)
    }
}

