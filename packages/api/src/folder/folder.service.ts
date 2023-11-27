import {Injectable} from "@nestjs/common";
import {Folder, Prisma, User} from "@prisma/client";
import {PrismaService} from "@/@services/prisma/prisma.service";
import {CreateFolderDto} from "@/folder/dto/create-folder.dto";

@Injectable()
export class FolderService {
    constructor(private readonly prisma: PrismaService) {}

    public async findMany(where: Prisma.FolderWhereInput = {}): Promise<Folder[]> {
        return this.prisma.folder.findMany({where});
    }

    public async findOne(where: Prisma.FolderWhereUniqueInput, include: Prisma.FolderInclude = {}) {
        return this.prisma.folder.findUnique({where, include});
    }

    public async create(user: User, payload: CreateFolderDto): Promise<Folder> {
        return this.prisma.folder.create({
            data: {
                name: payload.name,
                folder: payload.parentId ? {connect: {id: payload.parentId}} : {},
                user: {
                    connect: {
                        id: user.id
                    }
                },
                access: {
                    createMany: {
                        data: payload.userIds.map(userId => ({userId})),
                        skipDuplicates: true
                    }
                }
            },
            include: {
                access: true
            }
        });


    }

    public async update(id: string, payload: CreateFolderDto): Promise<Folder> {
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
                        data: payload.userIds.map(userId => ({userId})),
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
