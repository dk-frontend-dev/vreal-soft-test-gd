import {Controller, Get, Post, Req, Res, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {UserService} from '@/user/user.service';
import {AccessToken} from '@/@models/user.model';
import {User} from '@prisma/client';
import {JwtAuthGuard} from '@/@guards/jwt-auth.guard';
import {CurrentUser} from '@/@decorators/current-user.decorator';
import {ApiCreatedResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {RefreshTokenResponseDto, UserResponseDto} from "@/user/dtos/user-response.dto";

@ApiTags('Users')
@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'get all users without current' })
  @ApiCreatedResponse({
    type: [UserResponseDto],
    description: 'users response',
  })
  @UseGuards(JwtAuthGuard)
  @Get('users/all')
  async index(@CurrentUser() user: User): Promise<User[]> {
    return this.userService.findMany({
      email: {
        not: user.email
      }
    });
  }

  @ApiOperation({ summary: 'get current user' })
  @ApiCreatedResponse({
    type: UserResponseDto,
    description: 'user response',
  })
  @UseGuards(JwtAuthGuard)
  @Get('users')
  async findOne(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  @ApiOperation({ summary: 'refresh access token' })
  @ApiCreatedResponse({
    type: RefreshTokenResponseDto,
    description: 'user access token',
  })
  @Post('users/refresh')
  async refreshAccessToken(@CurrentUser() user: User): Promise<AccessToken> {
    const accessToken = this.userService.generateJwt({id: user.id, email: user.email});

    return {accessToken};
  }

  @ApiOperation({ summary: 'Register or login user with google' })
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req): Promise<void> {}

  @ApiOperation({ summary: 'Redirect user to frontend with accessToken' })
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res): Promise<void> {
    const user = await this.userService.signIn(req.user);

    res.redirect(`http://localhost:5173/google-oauth-success-redirect/${user.accessToken}`);
  }
}
