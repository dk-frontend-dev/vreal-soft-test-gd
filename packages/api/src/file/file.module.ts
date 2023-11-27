import {Module} from "@nestjs/common";
import {FileController} from "@/file/file.controller";
import {FileService} from "@/file/file.service";
import {FolderService} from "@/folder/folder.service";
import {FileAccessGuard} from "@/@guards/file-access.guard";

@Module({
    imports: [],
    controllers: [FileController],
    providers: [FileService, FolderService, FileAccessGuard]
})
export class FileModule {}
