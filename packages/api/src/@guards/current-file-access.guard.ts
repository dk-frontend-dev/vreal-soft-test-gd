import {BadRequestException, CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {PrismaService} from "@/@services/prisma/prisma.service";
import {Observable} from "rxjs";
import {User} from "@prisma/client";
import {isGrantedLib} from "@/@helpers/is-granted.helper";

@Injectable()
export class CurrentFileAccessGuard implements CanActivate {
    constructor(private prisma: PrismaService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        return this.validate(request.params.id, request.user);
    }

    private async validate(fileId: string, user: User): Promise<boolean> {
        const file = await this.prisma.file.findUnique(
            {
                where: {id: fileId},
                include: {
                    folder: {
                        include: {
                            access: true
                        }
                    }
                }
            }
        );

        if (!file) {
            throw new BadRequestException(`The file with id=${fileId} not found`);
        }

        if (!file.folder) {
            return true;
        }

        return isGrantedLib(user, file.userId, file.folder.access);
    }
}
