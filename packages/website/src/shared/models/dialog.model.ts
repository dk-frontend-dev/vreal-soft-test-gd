export interface BaseDialogProps {
    isOpen: boolean;
    onClose?: () => void;
    closeDialog: (response: boolean) => void;
}
