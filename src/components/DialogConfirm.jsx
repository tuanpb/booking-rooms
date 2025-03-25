import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Button
} from "@mui/material";

const DialogConfirm = ({ title, message, open, onClose, onConfirm }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle sx={{ fontWeight: 'bold' }}>
                {title}
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1">
                    {message}
                </Typography>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose} variant="outlined">
                    Hủy
                </Button>
                <Button
                    onClick={() => {
                        if (onConfirm) {
                            onConfirm();
                        }
                        onClose();
                    }}
                    color="error"
                    variant="contained"
                >
                    Xác nhận
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogConfirm;
