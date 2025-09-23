import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import {DialogContent, DialogTitle, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {useActiveBill} from '@/state/bills/selectors';
import {useSetActiveBill} from '@/state/bills/dispatchers';
import {Content} from './content';

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

// A dialog component to display the active bill details on table row click
export function ActiveBillDialog() {
    const activeBill = useActiveBill();
    const setActiveBill = useSetActiveBill();

    function handleClose() {
        setActiveBill(undefined);
    }

    return (
        <BootstrapDialog
            fullWidth
            maxWidth="md"
            onClose={handleClose}
            aria-labelledby="active-bill-dialog"
            open={!!activeBill}
        >
            <DialogTitle sx={{m: 0, p: 2}} id="active-bill-dialog">
                Bill Title Preview
            </DialogTitle>

            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                <CloseIcon />
            </IconButton>

            <DialogContent dividers>
                <Content />
            </DialogContent>
        </BootstrapDialog>
    );
}
