import {Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, TextField} from '@mui/material';
import {Controller, useForm} from 'react-hook-form';
import {validationErrors} from '@/shared/constants/validationErrors.ts';
import AppButton from '@/shared/ui/AppButton/AppButton.tsx';
import {useState} from 'react';
import AppSelect from '@/shared/ui/AppSelect/AppSelect.tsx';
import {useStore} from '@/store/store.ts';
import AppFileInput from '@/shared/ui/AppFileInput/AppFileInput.tsx';
import {validateFileSize} from '@/shared/validators/fileValidators.ts';
import {ONE_MB, FILE_TYPES} from '@/shared/constants/fileConstants.ts';
import {CreateFilePayload, AccessType} from '@/shared/models/file.model.ts';
import {BaseDialogProps} from '@/shared/models/dialog.model.ts';
import {createFileApi} from '@/shared/api/fileAPI.ts';

interface CreateFileProps extends BaseDialogProps {}

function CreateFile({isOpen, onClose, closeDialog}: CreateFileProps) {
  const {currentFolder} = useStore();
  const [isLoading, setIsLoading] = useState<boolean>();
  const {control, handleSubmit, setValue, reset} = useForm<CreateFilePayload>();

  const maxFileSize = ONE_MB * 4;
  const createFile = async (payload: CreateFilePayload) => {
    setIsLoading(true);

    await createFileApi(payload, currentFolder?.id);

    setIsLoading(false);
    closeDialog(true);
    reset();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle id="alert-dialog-title">Create File</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(createFile)} id={'create-file'}>
          <InputLabel>File Name</InputLabel>

          <Controller
            control={control}
            name={'name'}
            defaultValue=""
            rules={{required: validationErrors.required, max: {value: 100, message: validationErrors.maxLength}}}
            render={({field, fieldState: {error}}) => (
              <TextField {...field} type="text" fullWidth label={'File name'} error={error !== undefined} helperText={error ? error.message : ''} />
            )}
          ></Controller>

          <InputLabel>File type</InputLabel>

          <Controller
            control={control}
            name={'type'}
            defaultValue={AccessType.PUBLIC}
            render={({field}) => (
              <AppSelect field={field}>
                {FILE_TYPES.map((fileType, index) => (
                  <MenuItem key={index} value={fileType}>
                    {fileType}
                  </MenuItem>
                ))}
              </AppSelect>
            )}
          ></Controller>

          <InputLabel>File</InputLabel>

          <Controller
            control={control}
            name={'file'}
            rules={{required: validationErrors.required, validate: validateFileSize(maxFileSize)}}
            render={({field: {onChange, onBlur, value}, fieldState}) => (
              <AppFileInput
                fieldState={fieldState}
                onChange={onChange}
                onBlur={onBlur}
                filename={value?.[0].name}
                onDrop={acceptedFiles => {
                  setValue('file', acceptedFiles, {
                    shouldValidate: true
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
  );
}

export default CreateFile;
