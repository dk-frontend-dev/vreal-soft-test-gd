import {FolderAccess} from "@prisma/client";
import {removeDuplicates} from "@/@helpers/remove-duplicates.helper";

export const concatPermissions = (access: FolderAccess[] = [], userEmails: string[], currentUserEmail: string) => {
    const emails = [
        ...userEmails,
        ...access.map(({userEmail}) => userEmail),
        currentUserEmail
    ]

    return removeDuplicates(emails).map(userEmail => ({userEmail}))
}
