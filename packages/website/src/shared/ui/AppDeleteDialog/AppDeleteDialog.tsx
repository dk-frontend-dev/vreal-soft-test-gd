import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import AppButton from "@/shared/ui/AppButton/AppButton.tsx";
import {BaseDialogProps} from "@/shared/models/dialog.model.ts";

interface AppDeleteDialogProps extends BaseDialogProps {
    isLoading: boolean;
    title: string;
    text: string;
}
function AppDeleteDialog({isOpen, onClose, isLoading, closeDialog, title, text}: AppDeleteDialogProps) {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <AppButton disabled={isLoading} text={'Disagree'} onClick={() => closeDialog(false)} variant="contained" color="success" />
                <AppButton disabled={isLoading} text={'Agree'} onClick={() => closeDialog(true)} variant="contained" color="error" autoFocus />
            </DialogActions>
        </Dialog>
    )
}

export default AppDeleteDialog;
