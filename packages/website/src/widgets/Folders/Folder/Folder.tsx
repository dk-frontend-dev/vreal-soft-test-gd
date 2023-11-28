import FolderIcon from '@mui/icons-material/Folder';
import s from './Folder.module.scss';
import AppButton from "@/shared/ui/AppButton/AppButton.tsx";
import {isGrantedLib} from "@/shared/lib/isGruntedLib.ts";
import {useStore} from "@/store/store.ts";
import {FolderWithGrantedUsers} from "@/shared/models/folder.model.ts";
import {useEffect, useState} from "react";
import {httpClient} from "@/shared/api/httpClient.ts";
import AppDeleteDialog from "@/shared/ui/AppDeleteDialog/AppDeleteDialog.tsx";

interface FolderProps {
    folder: FolderWithGrantedUsers;
    onClick: (folderId: string) => void;
    onFolderDeleted: () => void;
}

function Folder({folder, onClick, onFolderDeleted}: FolderProps) {
    const [isGranted, setIsGranted] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {currentUser} = useStore();

    const deleteFolder = async (folderId: string) => {
        setIsLoading(true);
        await httpClient.delete(`folders/${folderId}`);
        setIsLoading(false);
        onFolderDeleted();
    }
    const closeDeleteDialog = async (response: boolean) => {
        if (!response) {
            return setIsDeleteOpen(false);
        }

        await deleteFolder(folder.id);
        setIsDeleteOpen(false);
    }

    useEffect(() => {
        const isHavePermissions = isGrantedLib(currentUser!.id, folder.userId, folder.access);
        setIsGranted(isHavePermissions);
    }, [currentUser])


    return (
        <>
            <div className={s.section}>
                <div>
                    <FolderIcon />
                    <p className={s.title}>{folder.name}</p>
                </div>

                <div className={s.actions}>
                    <AppButton disabled={!isGranted} text={'Delete'} variant="outlined" color="error" onClick={() => setIsDeleteOpen(true)} />
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
        </>
    )
}

export default Folder;
