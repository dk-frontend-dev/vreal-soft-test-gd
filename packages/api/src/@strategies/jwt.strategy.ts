import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import {PrismaService} from "@/@services/prisma/prisma.service";
import * as process from "process";
import {User} from "@prisma/client";
import {JwtUserPayload} from "@/@models/user.model";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private prisma: PrismaService) {
        super({
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_KEY,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtUserPayload): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {id: payload.id}
        });

        if (!user) throw new UnauthorizedException('Please log in to continue');

        return user;
    }
}
