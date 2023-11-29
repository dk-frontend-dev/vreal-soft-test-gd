import {FolderAccess} from "@prisma/client";

export const filterGrantedUsersLib = (grantedUsers?: FolderAccess[], currentUserEmail?: string) => {
    if (!grantedUsers || !currentUserEmail) return [];

    const result = grantedUsers?.filter(({userEmail}) => userEmail !== currentUserEmail);

    return result.map(({userEmail}) => userEmail);
}
