import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import AppButton from "@/shared/ui/AppButton/AppButton.tsx";
import {BaseDialogProps} from "@/shared/models/dialog.model.ts";
import {File} from '@prisma/client';
import {getFilePathLib} from "@/shared/lib/fileLib.ts";
import s from './ViewFile.module.scss';
import {VIDEO_FORMATS} from "@/shared/constants/fileConstants.ts";


interface AppViewFileDialogProps extends BaseDialogProps {
    file: File;
}

function ViewFile({isOpen, onClose, closeDialog, file}: AppViewFileDialogProps) {

    const pathToResource = getFilePathLib(file.storedFileName);
    const isVideo = VIDEO_FORMATS.includes(file.extension);

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle id="alert-dialog-title">File</DialogTitle>
            <DialogContent>
                {
                    isVideo ? <video className={s.video} src={pathToResource} muted playsInline loop autoPlay></video> : <img className={s.image} src={pathToResource} alt='' width={200} height={200} />
                }
            </DialogContent>
            <DialogActions>
                <AppButton text={'Close'} onClick={() => closeDialog(false)} variant="contained" color="primary" />
            </DialogActions>
        </Dialog>
    )
}

export default ViewFile;
