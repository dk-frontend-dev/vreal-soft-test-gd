import {Folder, FolderAccess} from "@prisma/client";

export interface FolderWithGrantedUsers extends Folder {
    access: FolderAccess[];
}
