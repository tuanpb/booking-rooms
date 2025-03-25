import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (username === "admin" && password === "123456") {
            onLogin();
            navigate("/admin"); // Chuyển hướng đến trang admin sau khi đăng nhập thành công
        } else {
            alert("Sai tài khoản hoặc mật khẩu!");
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5, textAlign: "center" }}>
                <Typography variant="h5">Đăng nhập</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Tài khoản"
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Mật khẩu"
                        type="password"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Đăng nhập
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Login;
