import {Injectable} from "@nestjs/common";
import {Folder, FolderAccess, Prisma, User} from "@prisma/client";
import {PrismaService} from "@/@services/prisma/prisma.service";
import {CreateFolderDto} from "@/folder/dto/create-folder.dto";
import {concatPermissions} from "@/@helpers/contact-permissions.helper";
import {FolderWithAccess} from "@/@models/folder.model";

@Injectable()
export class FolderService {
    constructor(private readonly prisma: PrismaService) {}

    public async findMany(where: Prisma.FolderWhereInput = {}, include: Prisma.FolderInclude = {}): Promise<Folder[]> {
        return this.prisma.folder.findMany({where, include});
    }

    public async findOne(where: Prisma.FolderWhereUniqueInput, include: Prisma.FolderInclude = {}) {
        return this.prisma.folder.findUnique({where, include});
    }

    public async create(user: User, payload: CreateFolderDto, parentFolderAccess: FolderAccess[]): Promise<Folder> {
        return this.prisma.folder.create({
            data: {
                name: payload.name,
                user: {
                    connect: {
                        id: user.id
                    }
                },
                access: {
                    createMany: {
                        data: concatPermissions(parentFolderAccess, payload.userEmails, user.email),
                        skipDuplicates: true
                    }
                }
            },
            include: {
                access: true
            }
        });
    }

    public async update(id: string, payload: CreateFolderDto, parentFolder: FolderWithAccess | null, user: User): Promise<any> {
        await this.prisma.folderAccess.deleteMany({
            where: {folderId: id}
        })

        return this.prisma.folder.update({
            where: {id},
            data: {
                name: payload.name,
                folder: payload.parentId ? {connect: {id: payload.parentId}} : {disconnect: true},
                access: {
                    createMany: {
                        data: concatPermissions(parentFolder?.access, payload.userEmails, user.email),
                        skipDuplicates: true
                    }
                }
            },
            include: {
                access: true
            }
        })
    }

    public async delete(id: string): Promise<void> {
        await this.prisma.folder.delete({
            where: {id},
        })
    }
}
