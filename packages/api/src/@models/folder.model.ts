import {Folder, FolderAccess} from "@prisma/client";

export interface FolderWithAccess extends Folder {
    access: FolderAccess[];
}
