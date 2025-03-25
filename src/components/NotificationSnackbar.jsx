// NotificationSnackbar.jsx
import { Snackbar, Alert } from '@mui/material';
import { useNotification } from '../contexts/NotificationContext';

const NotificationSnackbar = () => {
    // Lấy notification và closeNotification từ context
    const { notification, closeNotification } = useNotification();

    return (
        <Snackbar
            open={notification.open}
            autoHideDuration={6000}
            onClose={closeNotification}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert
                elevation={6}
                variant="filled"
                onClose={closeNotification}
                severity={notification.severity || 'info'} // Thêm fallback cho severity
                sx={{ width: '100%' }}
            >
                {notification.message}
            </Alert>
        </Snackbar>
    );
};

export default NotificationSnackbar;
