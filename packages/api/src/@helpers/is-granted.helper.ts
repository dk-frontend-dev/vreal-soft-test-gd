import {FolderAccess, User} from '@prisma/client'

export const isGrantedLib = (user: User, ownerId: string, grantedUsers: FolderAccess[]): boolean => {
    const isGranted = grantedUsers.some(({userEmail}) => userEmail === user.email);
    const isOwner = user.id === ownerId;

    return isGranted || isOwner;
}
