import {Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {validationErrors} from "@/shared/constants/validationErrors.ts";
import {filterGrantedUsersLib} from "@/shared/lib/filterGrantedUsersLib.ts";
import AppMultiSelect from "@/shared/ui/AppMultiSelect/AppMultiSelect.tsx";
import AppButton from "@/shared/ui/AppButton/AppButton.tsx";
import {useStore} from "@/store/store.ts";
import {FolderWithGrantedUsers, UpdateFolderPayload} from "@/shared/models/folder.model.ts";

interface EditFolderProps {
    isOpen: boolean;
    onClose?: () => void;
    closeDialog: (response?: UpdateFolderPayload) => Promise<void>;
    isLoading: boolean;
    selectedFolder: FolderWithGrantedUsers;
}

function EditFolder({isOpen, onClose, closeDialog, isLoading, selectedFolder}: EditFolderProps) {
    const {allUsers, currentUser} = useStore();
    const {control, handleSubmit} = useForm();

    const updateFolder = async (payload: any) => {
        closeDialog(payload);
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
                </form>
            </DialogContent>
            <DialogActions>
                <AppButton disabled={isLoading} text={'Close'} onClick={() => closeDialog()} variant="outlined" />
                <AppButton disabled={isLoading} type={'submit'} text={'Update'} form={'update-folder'} variant="contained" color="success" autoFocus />
            </DialogActions>
        </Dialog>
    )
}

export default EditFolder;
