import {BadRequestException, CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {PrismaService} from "@/@services/prisma/prisma.service";
import {User} from "@prisma/client";
import {isGrantedLib} from "@/@helpers/is-granted.helper";

@Injectable()
export class ParentFolderAccessGuard implements CanActivate {
    constructor(private prisma: PrismaService) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        return this.validate(request.body.parentId, request.user);
    }

    private async validate(parentId: string, user: User): Promise<boolean> {
        if (!parentId) {
            return true;
        }

        const parentFolder = await this.prisma.folder.findUnique({
            where: {
                id: parentId
            },
            include: {
                access: true
            }
        })


        if (!parentFolder) {
            throw new BadRequestException(`The parent folder with id=${parentId} not found`);
        }

        return isGrantedLib(user, parentFolder.userId, parentFolder.access);
    }
}
