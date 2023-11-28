import {FolderAccess} from '@prisma/client'

export const isGrantedLib = (currentUserId: string, ownerId: string, grantedUsers: FolderAccess[]): boolean => {
    const isGranted = grantedUsers.some(({userId}) => userId === currentUserId);
    const isOwner = currentUserId === ownerId;

    return isGranted || isOwner;
}
