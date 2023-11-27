-- DropForeignKey
ALTER TABLE "FolderAccess" DROP CONSTRAINT "FolderAccess_folderId_fkey";

-- AddForeignKey
ALTER TABLE "FolderAccess" ADD CONSTRAINT "FolderAccess_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
