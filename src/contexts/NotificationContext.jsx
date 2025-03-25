// src/contexts/NotificationContext.jsx
import { createContext, useContext, useState } from 'react';

// Tạo context
const NotificationContext = createContext();

// Provider component
export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'info'
    });

    // Hàm hiển thị thông báo
    const showNotification = (message, severity = 'info') => {
        setNotification({
            open: true,
            message,
            severity
        });
    };

    // Hàm đóng thông báo
    const closeNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotification({ ...notification, open: false });
    };

    return (
        <NotificationContext.Provider value={{
            notification,
            showNotification,
            closeNotification
        }}>
            {children}
        </NotificationContext.Provider>
    );
};

// Custom hook để sử dụng context
export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
