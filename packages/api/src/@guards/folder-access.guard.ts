import {BadRequestException, CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {PrismaService} from "@/@services/prisma/prisma.service";
import {User} from "@prisma/client";
import {isUUID} from "class-validator";

@Injectable()
export class FolderAccessGuard implements CanActivate {
    constructor(private prisma: PrismaService) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        return this.validate(request.params.id, request.user);
    }

    private async validate(folderId: string, user: User): Promise<boolean> {
        if (!folderId || !isUUID(folderId)) {
            throw new BadRequestException(`The folder with id=${folderId} not found`);
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
            throw new BadRequestException(`The folder with id=${folderId} not found`);
        }

        const isGranted = folder.access.some(({userId}) => userId === user.id);
        const isOwner = folder.userId === user.id;

        return isGranted || isOwner;
    }
}
