import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import AppButton from "@/shared/ui/AppButton/AppButton.tsx";
import {BaseDialogProps} from "@/shared/models/dialog.model.ts";
import {File} from '@prisma/client';
import {getFilePathLib} from "@/shared/lib/fileLib.ts";
import s from './ViewFile.module.scss';


interface AppViewFileDialogProps extends BaseDialogProps {
    file: File;
}

function ViewFile({isOpen, onClose, closeDialog, file}: AppViewFileDialogProps) {

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle id="alert-dialog-title">File</DialogTitle>
            <DialogContent>
                <img className={s.image} src={getFilePathLib(file.storedFileName)} alt='' width={200} height={200} />
            </DialogContent>
            <DialogActions>
                <AppButton text={'Disagree'} onClick={() => closeDialog(false)} variant="contained" color="primary" />
            </DialogActions>
        </Dialog>
    )
}

export default ViewFile;
