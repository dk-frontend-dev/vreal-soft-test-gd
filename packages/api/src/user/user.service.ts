import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from '@/@services/prisma/prisma.service';
import {GoogleUser, UserResponse} from '@/@models/user.model';
import {JwtService} from '@nestjs/jwt';
import {Prisma, User} from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  public async findMany(where: Prisma.UserWhereInput = {}): Promise<User[]> {
    return this.prisma.user.findMany({where});
  }

  public async signIn(user: GoogleUser): Promise<UserResponse> {
    if (!user) {
      throw new BadRequestException('No user from google');
    }

    const userExists = await this.prisma.user.findUnique({
      where: {email: user.email}
    });

    if (!userExists) {
      const createdUser = await this.registerUser(user);
      return this.getUserPayload(createdUser);
    }

    return this.getUserPayload(userExists);
  }

  public async registerUser(user: GoogleUser): Promise<User> {
    return this.prisma.user.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        picture: user.picture
      }
    });
  }

  public generateJwt<T extends object>(payload: T): string {
    return this.jwtService.sign(payload);
  }

  private getUserPayload(user: User): UserResponse {
    const token = this.generateJwt({
      email: user.email,
      id: user.id
    });

    return {
      ...user,
      accessToken: token
    };
  }
}
