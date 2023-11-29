import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, InputLabel,
    TextField
} from "@mui/material";
import AppButton from "@/shared/ui/AppButton/AppButton.tsx";
import {Controller, useForm} from "react-hook-form";
import AppMultiSelect from "@/shared/ui/AppMultiSelect/AppMultiSelect.tsx";
import {useStore} from "@/store/store.ts";
import {validationErrors} from "@/shared/constants/validationErrors.ts";
import {useState} from "react";
import {filterGrantedUsersLib} from "@/shared/lib/filterGrantedUsersLib.ts";
import {BaseDialogProps} from "@/shared/models/dialog.model.ts";
import {CreateFolderPayload} from "@/shared/models/folder.model.ts";
import {createFolderApi} from "@/shared/api/folderAPI.ts";

interface CreateFolderProps extends BaseDialogProps {}

function CreateFolder({isOpen, closeDialog, onClose}: CreateFolderProps) {
    const [isLoading, setIsLoading] = useState<boolean>();
    const {allUsers, currentFolder, currentUser} = useStore();
    const {control, handleSubmit, reset} = useForm<CreateFolderPayload>();

    const createFolder = async (payload: CreateFolderPayload) => {
        setIsLoading(true);

        await createFolderApi(payload, currentFolder?.id)

        reset();
        setIsLoading(false);
        closeDialog(true);
    }

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
        >
            <DialogTitle id="alert-dialog-title">
                Create Folder
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(createFolder)} id={'create-folder'}>
                    <InputLabel>Folder Name</InputLabel>

                    <Controller
                        control={control}
                        name={'name'}
                        defaultValue=''
                        rules={{required: validationErrors.required, max: {value: 100, message: validationErrors.maxLength}}}
                        render={({field, fieldState: {error}}) => (
                            <TextField
                                {...field}
                                type='text'
                                fullWidth
                                label={'Folder name'}
                                error={error !== undefined}
                                helperText={error ? error.message : ''}
                            />
                        )}
                    ></Controller>

                    <InputLabel>Granted users (optional)</InputLabel>

                    <Controller
                        control={control}
                        name={'userEmails'}
                        defaultValue={filterGrantedUsersLib(currentFolder?.access, currentUser?.email)}
                        render={({field}) => (
                            <AppMultiSelect sx={{width: '100%'}} valueKey={'email'} field={field} label={'Granted users'} options={allUsers} />
                        )}
                    ></Controller>
                    <small>*Granted users will be inherited from the parent</small>
                </form>
            </DialogContent>
            <DialogActions>
                <AppButton disabled={isLoading} text={'Close'} onClick={() => closeDialog(false)} variant="outlined" />
                <AppButton disabled={isLoading} type={'submit'} text={'Create'} form={'create-folder'} variant="contained" color="success" autoFocus />
            </DialogActions>
        </Dialog>
    )
}

export default CreateFolder;
