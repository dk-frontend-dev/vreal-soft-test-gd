import {Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {validationErrors} from "@/shared/constants/validationErrors.ts";
import AppSelect from "@/shared/ui/AppSelect/AppSelect.tsx";
import {FILE_TYPES, ONE_MB} from "@/shared/constants/fileConstants.ts";
import {validateFileSize} from "@/shared/validators/fileValidators.ts";
import AppFileInput from "@/shared/ui/AppFileInput/AppFileInput.tsx";
import AppButton from "@/shared/ui/AppButton/AppButton.tsx";
import {EditFilePayload} from "@/shared/models/file.model.ts";
import {File as IFile} from "@prisma/client";
import {getFileNameLib} from "@/shared/lib/fileLib.ts";
import {useStore} from "@/store/store.ts";
import {useState} from "react";
import {httpClient} from "@/shared/api/httpClient.ts";
import {rootFolderIdLib} from "@/shared/lib/rootFolderIdLib.ts";
import {ROOT_FOLDER_ID} from "@/shared/constants/commonConstants.ts";

interface EditFileProps {
    isOpen: boolean;
    onClose?: () => void;
    closeDialog: (response: boolean) => void;
    file: IFile;
}

function EditFile({isOpen, onClose, closeDialog, file}: EditFileProps) {
    const [isLoading, setIsLoading] = useState<boolean>();
    const {allFolders} = useStore();
    const {control, handleSubmit, setValue, reset} = useForm<EditFilePayload>();

    const maxFileSize = ONE_MB * 4;

    const editFile = async (payload: EditFilePayload) => {
        setIsLoading(true);

        const formData = new FormData();
        formData.append('name', payload.name);
        formData.append('type', payload.type);

        if (payload.file) {
            formData.append('file', payload.file[0])
        }

        await httpClient.put(`files/${file.id}`, formData, {params: {folderId: rootFolderIdLib(payload.folderId)}})

        setIsLoading(false);
        reset();
        closeDialog(true);
    }

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
        >
            <DialogTitle id="alert-dialog-title">
                Edit File
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(editFile)} id={'create-file'}>
                    <InputLabel>File Name</InputLabel>

                    <Controller
                        control={control}
                        name={'name'}
                        defaultValue={file.name}
                        rules={{required: validationErrors.required, max: {value: 100, message: validationErrors.maxLength}}}
                        render={({field, fieldState: {error}}) => (
                            <TextField
                                {...field}
                                type='text'
                                fullWidth
                                label={'File name'}
                                error={error !== undefined}
                                helperText={error ? error.message : ''}
                            />
                        )}
                    ></Controller>

                    <InputLabel>File type</InputLabel>

                    <Controller
                        control={control}
                        name={'type'}
                        defaultValue={file.type}
                        render={({field}) => (
                            <AppSelect field={field}>
                                {FILE_TYPES.map((fileType, index) => (
                                    <MenuItem key={index} value={fileType}>{fileType}</MenuItem>
                                ))}
                            </AppSelect>
                        )}
                    ></Controller>

                    <InputLabel>Parent folder</InputLabel>

                    <Controller
                        control={control}
                        name={'folderId'}
                        defaultValue={file.folderId ?? ROOT_FOLDER_ID}
                        render={({field}) => (
                            <AppSelect field={field}>
                                <MenuItem value={ROOT_FOLDER_ID}>Root</MenuItem>
                                {allFolders?.map((folder, index) => (
                                    <MenuItem key={index} value={folder.id}>{folder.name}</MenuItem>
                                ))}
                            </AppSelect>
                        )}
                    ></Controller>

                    <InputLabel>File</InputLabel>

                    <Controller
                        control={control}
                        name={'file'}
                        rules={{validate: validateFileSize(maxFileSize, false)}}
                        render={({field: { onChange, onBlur, value }, fieldState}) => (
                            <AppFileInput
                                fieldState={fieldState}
                                onChange={onChange}
                                onBlur={onBlur}
                                filename={value?.[0].name ?? getFileNameLib(file.name, file.extension)}
                                onDrop={(acceptedFiles) => {
                                    setValue('file', acceptedFiles, {
                                        shouldValidate: true,
                                    });
                                }}
                            />
                        )}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <AppButton disabled={isLoading} text={'Close'} onClick={() => closeDialog(false)} variant="outlined" />
                <AppButton disabled={isLoading} type={'submit'} text={'Create'} form={'create-file'} variant="contained" color="success" autoFocus />
            </DialogActions>
        </Dialog>
    )
}

export default EditFile;
