import FolderIcon from '@mui/icons-material/Folder';
import s from './Folder.module.scss';
import AppButton from "@/shared/ui/AppButton/AppButton.tsx";
import {useState} from "react";
import {httpClient} from "@/shared/api/httpClient.ts";
import AppDeleteDialog from "@/shared/ui/AppDeleteDialog/AppDeleteDialog.tsx";
import EditFolder from "@/widgets/Folders/EditFolder/EditFolder.tsx";
import {FolderWithGrantedUsers} from "@/shared/models/folder.model.ts";
import {useStore} from "@/store/store.ts";
import AppAuthor from "@/shared/ui/AppAuthor/AppAuthor.tsx";

interface FolderProps {
    folder: FolderWithGrantedUsers;
    onClick: (folderId: string) => void;
    onFolderUpdated: () => void;
}

function Folder({folder, onClick, onFolderUpdated}: FolderProps) {
    const {allUsers, currentUser} = useStore();
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const deleteFolder = async (folderId: string) => {
        setIsLoading(true);
        await httpClient.delete(`folders/${folderId}`);
        setIsLoading(false);
        onFolderUpdated();
    }

    const closeDeleteDialog = async (response: boolean) => {
        setIsDeleteOpen(false);

        if (!response) return;

        await deleteFolder(folder.id);
        setIsDeleteOpen(false);
    }

    const closeEditDialog = (response: boolean) => {
        setIsEditOpen(false);

        if (!response) return;

        onFolderUpdated();
    }

    return (
        <>
            <div className={s.section}>
                <div>
                    <FolderIcon />
                    <p className={s.title}>{folder.name}</p>
                    <AppAuthor currentUserEmail={currentUser?.email} allUsers={allUsers} userId={folder.userId} />
                </div>

                <div className={s.actions}>
                    <AppButton text={'Delete'} variant="outlined" color="error" onClick={() => setIsDeleteOpen(true)} />
                    <AppButton text={'Edit'} variant="outlined" color="primary" onClick={() => setIsEditOpen(true)} />
                    <AppButton text={'Open'} onClick={() => onClick(folder.id)} />
                </div>
            </div>

            <AppDeleteDialog
                isOpen={isDeleteOpen}
                isLoading={isLoading}
                closeDialog={closeDeleteDialog}
                title={'Are you sure that you want to delete folder?'}
                text={'If you delete a folder, all of its contents will be deleted as well'}
            />

            <EditFolder isOpen={isEditOpen} closeDialog={closeEditDialog} selectedFolder={folder} />
        </>
    )
}

export default Folder;
