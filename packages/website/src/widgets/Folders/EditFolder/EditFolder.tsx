import {Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {validationErrors} from "@/shared/constants/validationErrors.ts";
import {filterGrantedUsersLib} from "@/shared/lib/filterGrantedUsersLib.ts";
import AppMultiSelect from "@/shared/ui/AppMultiSelect/AppMultiSelect.tsx";
import AppButton from "@/shared/ui/AppButton/AppButton.tsx";
import {useStore} from "@/store/store.ts";
import {FolderWithGrantedUsers, UpdateFolderPayload} from "@/shared/models/folder.model.ts";
import {ROOT_FOLDER_ID} from "@/shared/constants/commonConstants.ts";
import AppSelect from "@/shared/ui/AppSelect/AppSelect.tsx";
import {useMemo, useState} from "react";
import {BaseDialogProps} from "@/shared/models/dialog.model.ts";
import {updateFolderApi} from "@/shared/api/folderAPI.ts";

interface EditFolderProps extends BaseDialogProps {
    selectedFolder: FolderWithGrantedUsers;
}

function EditFolder({isOpen, onClose, closeDialog, selectedFolder}: EditFolderProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {allUsers, currentUser, allFolders} = useStore();
    const {control, handleSubmit} = useForm<UpdateFolderPayload>();

    const allFoldersWithoutCurrent = useMemo(() => {
        return allFolders?.filter(folder => folder.id !== selectedFolder.id);
    }, [allFolders, selectedFolder]);

    const updateFolder = async (payload: UpdateFolderPayload) => {
        setIsLoading(true);

        await updateFolderApi(selectedFolder.id, payload);

        closeDialog(true);
        setIsLoading(false);
    }

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
        >
            <DialogTitle id="alert-dialog-title">
                Edit Folder
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(updateFolder)} id={'update-folder'}>
                    <InputLabel>Folder Name</InputLabel>

                    <Controller
                        control={control}
                        name={'name'}
                        defaultValue={selectedFolder.name}
                        rules={{required: validationErrors.required, max: {value: 100, message: validationErrors.maxLength}}}
                        render={({field, fieldState: {error}}) => (
                            <>
                                <TextField
                                    {...field}
                                    type='text'
                                    fullWidth
                                    label={'Folder name'}
                                    error={error !== undefined}
                                    helperText={error ? error.message : ''}
                                />
                            </>
                        )}
                    ></Controller>

                    <InputLabel>Granted users (optional)</InputLabel>

                    <Controller
                        control={control}
                        name={'userEmails'}
                        defaultValue={filterGrantedUsersLib(selectedFolder?.access, currentUser?.email)}
                        render={({field}) => (
                            <AppMultiSelect sx={{width: '100%'}} valueKey={'email'} field={field} label={'Granted users'} options={allUsers} />
                        )}
                    ></Controller>
                    <small>*Granted users will be inherited from the parent</small>

                    <InputLabel>Parent folder</InputLabel>

                    <Controller
                        control={control}
                        name={'parentId'}
                        defaultValue={selectedFolder.parentId ?? ROOT_FOLDER_ID}
                        render={({field}) => (
                            <AppSelect field={field}>
                                <MenuItem value={ROOT_FOLDER_ID}>Root</MenuItem>
                                {allFoldersWithoutCurrent?.map((folder, index) => (
                                    <MenuItem key={index} value={folder.id}>{folder.name}</MenuItem>
                                ))}
                            </AppSelect>
                        )}
                    ></Controller>
                </form>
            </DialogContent>
            <DialogActions>
                <AppButton disabled={isLoading} text={'Close'} onClick={() => closeDialog(false)} variant="outlined" />
                <AppButton disabled={isLoading} type={'submit'} text={'Update'} form={'update-folder'} variant="contained" color="success" autoFocus />
            </DialogActions>
        </Dialog>
    )
}

export default EditFolder;
