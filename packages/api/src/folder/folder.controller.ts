import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from "@nestjs/common";
import {FolderService} from "@/folder/folder.service";
import {Folder, User} from "@prisma/client";
import {CreateFolderDto} from "@/folder/dto/create-folder.dto";
import {UpdateFolderDto} from "@/folder/dto/update-folder.dto";
import {JwtAuthGuard} from "@/@guards/jwt-auth.guard";
import {CurrentUser} from "@/@decorators/current-user.decorator";
import {ParentFolderAccessGuard} from "@/@guards/parent-folder-access.guard";
import {GetFoldersDto} from "@/folder/dto/get-folders.dto";
import {GetFolderDto} from "@/folder/dto/get-folder.dto";
import {CurrentFolderAccessGuard} from "@/@guards/current-folder-access.guard";
import {FolderParamsDto} from "@/folder/dto/folder-params.dto";

@UseGuards(JwtAuthGuard)
@Controller('folders')
export class FolderController {
    constructor(private readonly folderService: FolderService) {}

    @Get()
    async index(@Query() query: GetFoldersDto, @CurrentUser() user: User): Promise<Folder[]> {
        return this.folderService.findMany({
            parentId: query.parentId ?? null,
            OR: [
                {
                    access: {
                        some: {
                            userEmail: user.email
                        }
                    }
                },
                {
                    userId: user.id
                }
            ]
        }, {access: true});
    }

    @Get('all')
    async findAll(@CurrentUser() user: User): Promise<Folder[]> {
        return this.folderService.findMany({
            OR: [
                {
                    userId: user.id,
                },
                {
                    access: {
                        some: {
                            userEmail: user.email
                        }
                    }
                }
            ]
        })
    }

    @Get(':id')
    async findOne(@Param() query: GetFolderDto, @CurrentUser() user: User): Promise<Folder> {
        return this.folderService.findOne(
            {
                id: query.id,
                OR: [
                    {
                        access: {
                            some: {
                                userEmail: user.email
                            }
                        }
                    },
                    {
                        userId: user.id
                    }
                ]
            }, {access: true});
    }

    @UseGuards(ParentFolderAccessGuard)
    @Post()
    async create(@Body() payload: CreateFolderDto, @CurrentUser() user: User): Promise<Folder> {
        if (!payload.parentId) {
            return this.folderService.create(user, payload, [])
        }

        const { access } = await this.folderService.findOne({id: payload.parentId}, {access: true})

        return this.folderService.create(user, payload, access);
    }

    @UseGuards(ParentFolderAccessGuard, CurrentFolderAccessGuard)
    @Put(':id')
    async update(@Param() params: FolderParamsDto, @Body() payload: UpdateFolderDto, @CurrentUser() user: User): Promise<Folder> {
        let parentFolder = null;

        if (payload.parentId) {
            parentFolder = await this.folderService.findOne({id: payload.parentId}, {access: true})
        }

        return this.folderService.update(params.id, payload, parentFolder, user);
    }

    @UseGuards(CurrentFolderAccessGuard)
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.folderService.delete(id);
    }
}
