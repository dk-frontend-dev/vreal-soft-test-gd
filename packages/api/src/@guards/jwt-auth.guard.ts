import {AuthGuard} from "@nestjs/passport";
import {ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    public canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    public handleRequest(err, user) {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        
        return user;
    }
}
