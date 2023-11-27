import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from "@nestjs/common";
import {FolderService} from "@/folder/folder.service";
import {Folder, User} from "@prisma/client";
import {CreateFolderDto} from "@/folder/dto/create-folder.dto";
import {UpdateFolderDto} from "@/folder/dto/update-folder.dto";
import {JwtAuthGuard} from "@/@guards/jwt-auth.guard";
import {CurrentUser} from "@/@decorators/current-user.decorator";
import {FolderAccessGuard} from "@/@guards/folder-access.guard";

@UseGuards(JwtAuthGuard)
@Controller('folders')
export class FolderController {
    constructor(private readonly folderService: FolderService) {}

    @Get()
    async index(): Promise<Folder[]> {
        return this.folderService.findMany({
            parentId: null
        });
    }

    @Get('all')
    async getAll(): Promise<Folder[]> {
        return this.folderService.findMany()
    }

    @Post()
    async create(@Body() payload: CreateFolderDto, @CurrentUser() user: User): Promise<Folder> {
        return this.folderService.create(user, payload);
    }

    @UseGuards(FolderAccessGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() payload: UpdateFolderDto): Promise<Folder> {
        return this.folderService.update(id, payload);
    }

    @UseGuards(FolderAccessGuard)
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.folderService.delete(id);
    }
}
