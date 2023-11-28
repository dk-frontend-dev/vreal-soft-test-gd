import {FolderAccess} from "@prisma/client";
import {removeDuplicates} from "@/@helpers/remove-duplicates.helper";

export const concatPermissions = (access: FolderAccess[] = [], userEmails: string[]) => {
    const emails = [
        ...userEmails,
        ...access.map(({userEmail}) => userEmail)
    ]

    return removeDuplicates(emails).map(userEmail => ({userEmail}))
}
