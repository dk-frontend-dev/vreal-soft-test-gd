import {Module} from '@nestjs/common';
import {FolderController} from '@/folder/folder.controller';
import {FolderService} from '@/folder/folder.service';
import {ParentFolderAccessGuard} from '@/@guards/parent-folder-access.guard';
import {CurrentFolderAccessGuard} from '@/@guards/current-folder-access.guard';

@Module({
  imports: [],
  controllers: [FolderController],
  providers: [FolderService, ParentFolderAccessGuard, CurrentFolderAccessGuard]
})
export class FolderModule {}
