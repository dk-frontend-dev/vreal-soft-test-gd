import {BadRequestException, CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {PrismaService} from "@/@services/prisma/prisma.service";
import {Observable} from "rxjs";
import {isGrantedLib} from "@/@helpers/is-granted.helper";
import {User} from "@prisma/client";

@Injectable()
export class ParentFolderFileAccessGuard implements CanActivate {
    constructor(private prisma: PrismaService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        return this.validate(request.query.folderId, request.user);
    }

    private async validate(folderId: string, user: User): Promise<boolean> {
        if (!folderId) {
            return true;
        }

        const folder = await this.prisma.folder.findUnique(
            {
                where: {id: folderId},
                include: {
                    access: true
                }
            }
        );

        if (!folder) {
            throw new BadRequestException(`The parent folder with id=${folderId} not found`);
        }

        return isGrantedLib(user, folder.userId, folder.access);
    }
}
