import { Container, Typography } from "@mui/material";

const Admin = () => {
    return (
        <Container maxWidth="md">
            <Typography variant="h4" sx={{ mt: 5, textAlign: "center" }}>
                Chào mừng đến với trang Admin!
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
                Đây là trang quản lý hệ thống Karaoke của bạn.
            </Typography>
        </Container>
    );
};

export default Admin;
