import {BadRequestException, CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';
import {PrismaService} from '@/@services/prisma/prisma.service';
import {User} from '@prisma/client';
import {isGrantedLib} from '@/@helpers/is-granted.helper';

@Injectable()
export class CurrentFolderAccessGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return this.validate(request.params.id, request.user);
  }

  private async validate(folderId: string, user: User): Promise<boolean> {
    const folder = await this.prisma.folder.findUnique({
      where: {
        id: folderId
      },
      include: {
        access: true,
        folder: true
      }
    });

    const isRootFolder = !folder.folder;

    if (isRootFolder) {
      return true;
    }

    if (!folder) {
      throw new BadRequestException(`The parent folder with id=${folderId} not found`);
    }

    return isGrantedLib(user, folder.userId, folder.access);
  }
}
