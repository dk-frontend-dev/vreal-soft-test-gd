import {Module} from "@nestjs/common";
import {FileController} from "@/file/file.controller";
import {FileService} from "@/file/file.service";
import {FolderService} from "@/folder/folder.service";
import {CurrentFileAccessGuard} from "@/@guards/current-file-access.guard";
import {ParentFolderFileAccessGuard} from "@/@guards/parent-folder-file-access.guard";

@Module({
    imports: [],
    controllers: [FileController],
    providers: [FileService, FolderService, CurrentFileAccessGuard, ParentFolderFileAccessGuard]
})
export class FileModule {}
