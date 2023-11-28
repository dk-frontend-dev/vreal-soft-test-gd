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

const validationErrors = {
    text: {
        required: 'This field is required',
        pattern: 'Invalid name'
    }
}

interface CreateFolderProps {
    isOpen: boolean;
    onClose?: () => void;
    closeDialog: (response: boolean) => void;
}

function CreateFolder({isOpen, closeDialog, onClose}: CreateFolderProps) {
    const {allUsers} = useStore();
    const {control, handleSubmit, formState} = useForm();

    const handleOnSubmit = (payload: any) => {
        console.log(payload);
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
                <form onSubmit={handleSubmit(handleOnSubmit)} id={'create-folder'}>
                    <InputLabel>Folder Name</InputLabel>

                    <Controller
                        control={control}
                        name={'name'}
                        defaultValue=''
                        rules={{required: validationErrors.text.required}}
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
                        name={'grantedUsers'}
                        defaultValue={[]}
                        render={({field}) => (
                            <AppMultiSelect sx={{width: '100%'}} valueKey={'email'} field={field} label={'Granted users'} options={allUsers} />
                        )}
                    ></Controller>
                </form>
            </DialogContent>
            <DialogActions>
                <AppButton text={'Close'} onClick={() => closeDialog(false)} variant="outlined" />
                <AppButton type={'submit'} text={'Create'} form={'create-folder'} variant="contained" color="success" autoFocus />
            </DialogActions>
        </Dialog>
    )
}

export default CreateFolder;
