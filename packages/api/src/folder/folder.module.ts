import {Module} from "@nestjs/common";
import {FolderController} from "@/folder/folder.controller";
import {FolderService} from "@/folder/folder.service";
import {FolderAccessGuard} from "@/@guards/folder-access.guard";

@Module({
    imports: [],
    controllers: [FolderController],
    providers: [FolderService, FolderAccessGuard]
})
export class FolderModule {}
