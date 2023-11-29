import Dropzone from "react-dropzone";
import {ControllerFieldState, Noop} from "react-hook-form";
import s from './AppFileInput.module.scss';
import AppButton from "@/shared/ui/AppButton/AppButton.tsx";
import clsx from "clsx";
import {FileMimeTypes} from "@/shared/constants/fileConstants.ts";

interface AppFileInputProps {
    fieldState: ControllerFieldState;
    onChange: (...event: any[]) => void;
    onBlur: Noop;
    onDrop: <T extends File>(acceptedFiles: T[]) => void;
    acceptedFileTypes?: Record<string, string[]>;
    filename: string;
}

const defaultFileTypes = {
    [FileMimeTypes.SVG]: ['.svg'],
    [FileMimeTypes.PNG]: ['.png'],
    [FileMimeTypes.JPG]: ['.jpg'],
}

function AppFileInput({onDrop, fieldState, onChange, onBlur, filename, acceptedFileTypes = defaultFileTypes}: AppFileInputProps) {
    return (
        <Dropzone
            noClick
            onDrop={onDrop}
            accept={acceptedFileTypes}
        >
            {({
                  getRootProps,
                  getInputProps,
                  open,
                  isDragActive
              }) => (
                <div>
                    <div
                        className={clsx(s.container, {[s.active]: isDragActive})}
                        {...getRootProps()}
                    >
                        <input
                            {...getInputProps({
                                id: 'spreadsheet',
                                onChange,
                                onBlur,
                            })}
                        />

                        <AppButton className={s.button} text={'Choose a file'} variant={'contained'} type="button" onClick={open} />
                        <p className={s.text}>or drag and drop</p>

                        <p className={s.filename}>{filename ?? 'No file selected.'}</p>

                        <div>
                            {fieldState.error && (
                                <span role="alert">{fieldState.error.message}</span>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Dropzone>
    )
}

export default AppFileInput;
