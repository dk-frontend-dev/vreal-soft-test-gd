export const rootFolderIdLib = (folderId: string | null) => {
    return folderId === 'null' || !folderId ? null : folderId;
}
