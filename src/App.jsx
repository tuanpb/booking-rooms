import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { io } from "socket.io-client";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import About from "./pages/About";
import News from "./pages/News";
import Contact from "./pages/Contact";
import Rooms from "./pages/Rooms";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

import banner1 from "./assets/banner1.jpg"
import banner2 from "./assets/banner2.jpg"
import banner3 from "./assets/banner3.jpg"
import dataFake from "./pages/dataFake";

import { NotificationProvider } from './contexts/NotificationContext';
import NotificationSnackbar from './components/NotificationSnackbar';

const queryClient = new QueryClient();
const socket = io("http://localhost:4000");

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <Router>
          <AppBar position="fixed">
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                65 MUSIC BOX
              </Typography>

              {isMobile ? (
                <IconButton
                  color="inherit"
                  edge="end"
                  onClick={() => setDrawerOpen(true)}
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/">Trang chủ</Button>
                  <Button color="inherit" component={Link} to="/about">Giới thiệu</Button>
                  <Button color="inherit" component={Link} to="/news">Tin tức</Button>
                  <Button color="inherit" component={Link} to="/contact">Liên hệ</Button>
                  {isAuthenticated ? (
                    <>
                      <Button color="inherit" component={Link} to="/admin">Admin</Button>
                      <Button color="inherit" onClick={handleLogout}>Đăng xuất</Button>
                    </>
                  ) : (
                    <Button color="inherit" component={Link} to="/login">Đăng nhập</Button>
                  )}
                </>
              )}
            </Toolbar>
          </AppBar>

          {/* Drawer cho mobile */}
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <List sx={{ width: 250 }}>
              <ListItem button component={Link} to="/" onClick={() => setDrawerOpen(false)}>
                <ListItemText primary="Trang chủ" />
              </ListItem>
              <ListItem button component={Link} to="/about" onClick={() => setDrawerOpen(false)}>
                <ListItemText primary="Giới thiệu" />
              </ListItem>
              <ListItem button component={Link} to="/news" onClick={() => setDrawerOpen(false)}>
                <ListItemText primary="Tin tức" />
              </ListItem>
              <ListItem button component={Link} to="/contact" onClick={() => setDrawerOpen(false)}>
                <ListItemText primary="Liên hệ" />
              </ListItem>
              {isAuthenticated ? (
                <>
                  <ListItem button component={Link} to="/admin" onClick={() => setDrawerOpen(false)}>
                    <ListItemText primary="Admin" />
                  </ListItem>
                  <ListItem button onClick={() => { handleLogout(); setDrawerOpen(false); }}>
                    <ListItemText primary="Đăng xuất" />
                  </ListItem>
                </>
              ) : (
                <ListItem button component={Link} to="/login" onClick={() => setDrawerOpen(false)}>
                  <ListItemText primary="Đăng nhập" />
                </ListItem>
              )}
            </List>
          </Drawer>

          <Container
            maxWidth="xl"
            sx={{
              mt: { xs: 6, sm: 8 },
              px: { xs: 0.5, sm: 1, md: 2 },
              width: '100%',
              '& .MuiContainer-root': {
                maxWidth: '100%'
              }
            }}
          >
            <Box sx={{
              maxWidth: '1400px',
              mx: 'auto',
              width: '100%'
            }}>
              <Slider {...sliderSettings}>
                <img src={banner1} alt="Slider 1" style={{ width: "100%", borderRadius: "10px" }} />
                <img src={banner2} alt="Slider 2" style={{ width: "100%", borderRadius: "10px" }} />
                <img src={banner3} alt="Slider 3" style={{ width: "100%", borderRadius: "10px" }} />
              </Slider>
              <Routes>
                <Route path="/" element={<Rooms rooms={dataFake} />} />
                <Route path="/about" element={<About />} />
                <Route path="/news" element={<News />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/admin" element={isAuthenticated ? <Admin /> : <Navigate to="/login" />} />
              </Routes>
            </Box>
          </Container>

          <footer style={{
            textAlign: "center",
            padding: "20px",
            marginTop: "20px",
            background: "#f5f5f5",
            marginBottom: isMobile ? "60px" : "20px" // Thêm margin dưới cho mobile để tránh bị thanh điều khiển che
          }}>
            <Typography variant="body1">© 2025 tuanpb. All rights reserved.</Typography>
          </footer>
          <NotificationSnackbar />
        </Router>
      </NotificationProvider>
    </QueryClientProvider>
  );
}

export default App;
