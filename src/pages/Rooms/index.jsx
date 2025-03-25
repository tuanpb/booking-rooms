import { useEffect, useState } from "react";
import {
    Button,
    Container,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Chip,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useTheme,
    useMediaQuery,
    CircularProgress,
    Skeleton,
    Snackbar,
    Alert as MuiAlert,
    Grid
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import InfoIcon from '@mui/icons-material/Info';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import DialogConfirm from "../../components/DialogConfirm"; // Đường dẫn tới component DialogConfirm

import { useNotification } from '../../contexts/NotificationContext';

const generateSampleRooms = () => {
    const rooms = [
        "Phòng A1", "Phòng A2", "Phòng A3",
        "Phòng B1", "Phòng B2",
        "Phòng VIP 1", "Phòng VIP 2", "Phòng VIP 3"
    ];

    const a = rooms.map((room, index) => ({
        id: index + 1,
        name: room,
        type: room.includes("VIP") ? "vip" : room.startsWith("Phòng A") ? "a" : "b",
        schedule: generateSampleHours(),
    }))

    return a;
};

const generateSampleHours = () => {
    const schedule = [];

    // Tạo khung giờ từ 0:00 đến 23:30 với bước 30 phút
    for (let hour = 0; hour < 24; hour++) {
        for (let minute of ["00", "30"]) {
            // Nếu là 23:30 thì bỏ qua
            if (hour === 23 && minute === "30") continue;

            const isBooked = Math.random() < 0.3;

            schedule.push({
                time: `${hour.toString().padStart(2, "0")}:${minute}`,
                status: isBooked ? "booked" : "available",
                customer: isBooked ? {
                    name: `Khách hàng ${hour}`,
                    phone: `0000-${hour}`,
                    deposit: Math.random() > 0.5 ? "Đã cọc" : "Chưa cọc"
                } : null,
            });
        }
    }
    return schedule;
}

const Rooms = ({ rooms: initialRooms }) => {

    const { showNotification, closeNotification } = useNotification();

    const [rooms, setRooms] = useState([]);
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [openDialog, setOpenDialog] = useState(false);
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [depositStatus, setDepositStatus] = useState("Chưa cọc");
    const [customerInfoDialog, setCustomerInfoDialog] = useState({ open: false, customer: null });
    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);

    // Thêm state cho dialog xác nhận
    const [confirmDialog, setConfirmDialog] = useState({
        open: false,
        title: "",
        message: "",
        onConfirm: null
    });

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Hàm mở dialog xác nhận
    const openConfirmDialog = (title, message, onConfirm) => {
        setConfirmDialog({
            open: true,
            title,
            message,
            onConfirm
        });
    };

    // Hàm đóng dialog xác nhận
    const closeConfirmDialog = () => {
        setConfirmDialog({ ...confirmDialog, open: false });
    };

    const fetchData = async () => {
        setLoading(true);
        // Giả lập thời gian tải dữ liệu
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRooms(generateSampleRooms());
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [selectedDate]);

    const toggleSlotSelection = (roomId, time) => {
        const slotKey = `${roomId}-${time}`;
        setSelectedSlots((prevSelected) =>
            prevSelected.includes(slotKey)
                ? prevSelected.filter((slot) => slot !== slotKey)
                : [...prevSelected, slotKey]
        );
    };

    const openBookingDialog = () => {
        if (selectedSlots.length === 0) {
            showNotification("Vui lòng chọn ít nhất một khung giờ.", "warning");
            return;
        }
        setOpenDialog(true);
    };

    const confirmBooking = async () => {
        if (!customerName || !customerPhone) {
            showNotification("Vui lòng nhập đầy đủ họ tên và số điện thoại!", "error");
            return;
        }

        setBookingLoading(true);

        // Giả lập thời gian xử lý đặt phòng
        await new Promise(resolve => setTimeout(resolve, 1500));

        setRooms((prevRooms) =>
            prevRooms.map((room) => ({
                ...room,
                schedule: room.schedule.map((slot) =>
                    selectedSlots.includes(`${room.id}-${slot.time}`)
                        ? { ...slot, status: "booked", customer: { name: customerName, phone: customerPhone, deposit: depositStatus } }
                        : slot
                ),
            }))
        );

        setBookingLoading(false);

        showNotification("Đặt phòng thành công!", "success");
        setSelectedSlots([]);
        setCustomerName("");
        setCustomerPhone("");
        setDepositStatus("Chưa cọc");
        setOpenDialog(false);
    };

    const cancelBooking = (e, roomId, time, customerPhone) => {
        // Ngăn chặn sự kiện click lan truyền đến cell
        e.stopPropagation();

        openConfirmDialog(
            "Xác nhận hủy đặt phòng",
            "Bạn có chắc chắn muốn hủy đặt phòng này không?",
            async () => {
                setLoading(true);
                // Giả lập thời gian xử lý hủy đặt phòng
                await new Promise(resolve => setTimeout(resolve, 800));
                setRooms((prevRooms) =>
                    prevRooms.map((room) => {
                        if (room.id === roomId) {
                            return {
                                ...room,
                                schedule: room.schedule.map((slot) =>
                                    slot.time === time && slot.status === "booked"
                                        ? { ...slot, status: "available", customer: null }
                                        : slot
                                ),
                            };
                        }
                        return room;
                    })
                );
                setLoading(false);
                showNotification("Đã hủy đặt phòng thành công", "success");
            }
        );
    };

    const handleCloseDialog = () => {
        if (bookingLoading) return; // Ngăn đóng dialog khi đang xử lý đặt phòng
        setOpenDialog(false);
    };

    const showCustomerInfo = (e, customer) => {
        e.stopPropagation();
        setCustomerInfoDialog({ open: true, customer });
    };

    const closeCustomerInfo = () => {
        setCustomerInfoDialog({ open: false, customer: null });
    };

    // Lấy tất cả các khung giờ duy nhất
    const getAllTimeSlots = () => {
        if (rooms.length === 0 || rooms[0].schedule.length === 0) return [];

        const allTimeSlots = rooms[0].schedule.map(slot => slot.time);
        return allTimeSlots.sort();
    };

    // Render bảng lịch đặt phòng
    const renderScheduleTable = () => {
        const timeSlots = getAllTimeSlots();

        if (loading) {
            return (
                <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 180px)', overflow: 'auto' }}>
                    <Table stickyHeader size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        fontWeight: 'bold',
                                        backgroundColor: '#f5f5f5',
                                        position: 'sticky',
                                        left: 0,
                                        zIndex: 3,
                                        minWidth: 80
                                    }}
                                >
                                    Giờ / Phòng
                                </TableCell>
                                {[1, 2, 3, 4, 5].map(index => (
                                    <TableCell
                                        key={index}
                                        align="center"
                                        sx={{
                                            fontWeight: 'bold',
                                            minWidth: 100,
                                            backgroundColor: '#f5f5f5'
                                        }}
                                    >
                                        <Skeleton variant="text" width="80%" height={24} />
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(row => (
                                <TableRow key={row}>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        sx={{
                                            fontWeight: 'bold',
                                            backgroundColor: '#f5f5f5',
                                            position: 'sticky',
                                            left: 0,
                                            zIndex: 2
                                        }}
                                    >
                                        <Skeleton variant="text" width={40} />
                                    </TableCell>
                                    {[1, 2, 3, 4, 5].map(col => (
                                        <TableCell key={`${row}-${col}`} align="center">
                                            <Skeleton variant="rectangular" width="100%" height={36} />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            );
        }

        return (
            <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 180px)', overflow: 'auto' }}>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    fontWeight: 'bold',
                                    backgroundColor: '#f5f5f5',
                                    position: 'sticky',
                                    left: 0,
                                    zIndex: 3,
                                    minWidth: 80
                                }}
                            >
                                Giờ / Phòng
                            </TableCell>
                            {rooms.map(room => (
                                <TableCell
                                    key={room.id}
                                    align="center"
                                    sx={{
                                        fontWeight: 'bold',
                                        minWidth: 100,
                                        backgroundColor: room.type === 'vip' ? '#fff8e1' : '#f5f5f5',
                                        color: room.type === 'vip' ? 'warning.dark' : 'text.primary',
                                        borderBottom: room.type === 'vip' ? '3px solid #ffc107' : undefined
                                    }}
                                >
                                    {room.name}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {timeSlots.map(time => (
                            <TableRow key={time}>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    sx={{
                                        fontWeight: 'bold',
                                        backgroundColor: '#f5f5f5',
                                        position: 'sticky',
                                        left: 0,
                                        zIndex: 2
                                    }}
                                >
                                    {time}
                                </TableCell>
                                {rooms.map(room => {
                                    const slot = room.schedule.find(s => s.time === time);
                                    if (!slot) return <TableCell key={`${room.id}-${time}-empty`}></TableCell>;

                                    const isBooked = slot.status === "booked";
                                    const slotKey = `${room.id}-${time}`;
                                    const isSelected = selectedSlots.includes(slotKey);

                                    return (
                                        <TableCell
                                            key={`${room.id}-${time}`}
                                            align="center"
                                            onClick={() => !isBooked && toggleSlotSelection(room.id, time)}
                                            sx={{
                                                cursor: isBooked ? 'default' : 'pointer',
                                                backgroundColor: isBooked
                                                    ? "#ffcccc"
                                                    : isSelected
                                                        ? "#b3e0ff"
                                                        : 'inherit',
                                                border: isSelected
                                                    ? "1px solid #0066cc"
                                                    : undefined,
                                                position: 'relative',
                                                p: 1,
                                                '&:hover': {
                                                    backgroundColor: isBooked
                                                        ? "#ffcccc"
                                                        : isSelected
                                                            ? "#99d6ff"
                                                            : "#f9f9f9"
                                                }
                                            }}
                                        >
                                            {isBooked ? (
                                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                                    <IconButton
                                                        size="small"
                                                        color="info"
                                                        onClick={(e) => showCustomerInfo(e, slot.customer)}
                                                    >
                                                        <InfoIcon fontSize="small" />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        color="error"
                                                        onClick={(e) => cancelBooking(e, room.id, time, slot.customer?.phone)}
                                                    >
                                                        <CancelIcon fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            ) : (
                                                isSelected ? (
                                                    <Typography variant="body2" fontWeight="bold" color="primary">
                                                        Đã chọn
                                                    </Typography>
                                                ) : (
                                                    <Typography variant="body2" color="text.secondary">
                                                        Trống
                                                    </Typography>
                                                )
                                            )}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    // Thêm component chú thích trạng thái phòng
    const renderRoomStatusLegend = () => {
        return (
            <Paper sx={{ p: 2, mb: 2, borderRadius: 2 }}>
                {/* <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Chú thích trạng thái phòng:
                </Typography> */}
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{
                                width: 24,
                                height: 24,
                                bgcolor: '#ffcccc',
                                borderRadius: 1
                            }} />
                            <Typography variant="body2">Đã đặt</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{
                                width: 24,
                                height: 24,
                                bgcolor: '#b3e0ff',
                                border: '1px solid #0066cc',
                                borderRadius: 1
                            }} />
                            <Typography variant="body2">Đang chọn</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{
                                width: 24,
                                height: 24,
                                bgcolor: 'white',
                                border: '1px solid #ddd',
                                borderRadius: 1
                            }} />
                            <Typography variant="body2">Còn trống</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{
                                width: 24,
                                height: 24,
                                bgcolor: '#fff8e1',
                                borderBottom: '3px solid #ffc107',
                                borderRadius: 1
                            }} />
                            <Typography variant="body2" color="warning.dark">Phòng VIP</Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 1.5, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <InfoIcon fontSize="small" color="info" />
                        <Typography variant="body2">Xem thông tin</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CancelIcon fontSize="small" color="error" />
                        <Typography variant="body2">Hủy đặt phòng</Typography>
                    </Box>
                </Box>
            </Paper>
        );
    };

    return (
        <>
            <Container maxWidth="xl" sx={{ mt: 3, mb: 10 }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    mb: 3,
                    gap: 2
                }}>
                    <Typography variant="h5" fontWeight="bold">Quản lý đặt phòng
                        <Typography variant="body1">
                            <strong>Số điện thoại:</strong>
                            <TextField
                                margin="dense"
                                label="Số điện thoại"
                                type="tel"
                                fullWidth
                                value={customerPhone}
                                onChange={(e) => setCustomerPhone(e.target.value)}
                                required
                                variant="outlined"
                                disabled={bookingLoading}
                            />
                            <Button variant="contained">Đăng nhập nhanh</Button>
                        </Typography>
                        {loading && (
                            <CircularProgress
                                size={20}
                                sx={{ ml: 2, verticalAlign: 'middle' }}
                            />
                        )}
                    </Typography>
                    <DatePicker
                        label="Chọn ngày"
                        value={selectedDate}
                        onChange={(newDate) => setSelectedDate(newDate)}
                        slotProps={{
                            textField: {
                                fullWidth: isMobile,
                                disabled: loading
                            }
                        }}
                    />
                </Box>

                {/* Thêm phần chú thích trạng thái phòng */}
                {renderRoomStatusLegend()}

                {renderScheduleTable()}

                <Box
                    sx={{
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: { xs: 1, sm: 2 },
                        bgcolor: 'background.paper',
                        borderTop: '1px solid #ddd',
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: { xs: 'stretch', sm: 'center' },
                        gap: { xs: 1, sm: 0 },
                        zIndex: 10
                    }}
                >
                    <Box>
                        <Typography variant="body2" color="text.secondary">
                            Đã chọn: <strong>{selectedSlots.length}</strong> khung giờ
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, maxWidth: { xs: '100%', sm: '500px' }, mt: 0.5 }}>
                            {selectedSlots.slice(0, isMobile ? 2 : 5).map((slot) => {
                                const [roomId, time] = slot.split('-');
                                const roomName = rooms.find(r => r.id === parseInt(roomId))?.name;
                                return (
                                    <Chip
                                        key={slot}
                                        label={`${roomName} - ${time}`}
                                        size="small"
                                        onDelete={() => toggleSlotSelection(parseInt(roomId), time)}
                                        sx={{ fontSize: '0.7rem' }}
                                        disabled={loading}
                                    />
                                );
                            })}
                            {selectedSlots.length > (isMobile ? 2 : 5) && (
                                <Chip
                                    label={`+${selectedSlots.length - (isMobile ? 2 : 5)} khung giờ khác`}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                    sx={{ fontSize: '0.7rem' }}
                                />
                            )}
                        </Box>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth={isMobile}
                        sx={{
                            borderRadius: '20px',
                            px: { xs: 2, sm: 4 },
                            py: 1,
                            mt: { xs: 1, sm: 0 }
                        }}
                        onClick={openBookingDialog}
                        disabled={selectedSlots.length === 0 || loading}
                    >
                        {selectedSlots.length > 0 ? `Đặt ${selectedSlots.length} khung giờ` : 'Đặt Phòng'}
                    </Button>
                </Box>

                {/* Dialog đặt phòng */}
                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    maxWidth="sm"
                    fullWidth
                    fullScreen={isMobile}
                >
                    <DialogTitle sx={{
                        bgcolor: '#f5f5f5',
                        fontWeight: 'bold',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        Thông tin đặt phòng
                        {isMobile && !bookingLoading && (
                            <IconButton onClick={handleCloseDialog}>
                                <CloseIcon />
                            </IconButton>
                        )}
                    </DialogTitle>
                    <DialogContent dividers>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Họ tên"
                            type="text"
                            fullWidth
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            required
                            variant="outlined"
                            disabled={bookingLoading}
                        />
                        <TextField
                            margin="dense"
                            label="Số điện thoại"
                            type="tel"
                            fullWidth
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            required
                            variant="outlined"
                            disabled={bookingLoading}
                        />
                        <FormControl fullWidth margin="dense" variant="outlined" disabled={bookingLoading}>
                            <InputLabel>Trạng thái cọc</InputLabel>
                            <Select
                                value={depositStatus}
                                onChange={(e) => setDepositStatus(e.target.value)}
                                label="Trạng thái cọc"
                            >
                                <MenuItem value="Chưa cọc">Chưa cọc</MenuItem>
                                <MenuItem value="Đã cọc">Đã cọc</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 'bold' }}>
                            Các khung giờ đã chọn ({selectedSlots.length}):
                        </Typography>
                        <Box sx={{
                            p: 1.5,
                            bgcolor: '#f9f9f9',
                            borderRadius: 1,
                            mt: 1,
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 0.5,
                            maxHeight: isMobile ? '200px' : '150px',
                            overflowY: 'auto'
                        }}>
                            {selectedSlots.map((slot) => {
                                const [roomId, time] = slot.split('-');
                                const roomName = rooms.find(r => r.id === parseInt(roomId))?.name;
                                return (
                                    <Chip
                                        key={slot}
                                        label={`${roomName} - ${time}`}
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        onDelete={!bookingLoading ? () => toggleSlotSelection(parseInt(roomId), time) : undefined}
                                        disabled={bookingLoading}
                                    />
                                );
                            })}
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{ p: 2, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 1 : 0 }}>
                        <Button
                            onClick={handleCloseDialog}
                            variant="outlined"
                            fullWidth={isMobile}
                            disabled={bookingLoading}
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={confirmBooking}
                            color="primary"
                            variant="contained"
                            disabled={!customerName || !customerPhone || bookingLoading}
                            fullWidth={isMobile}
                            startIcon={bookingLoading ? <CircularProgress size={20} color="inherit" /> : null}
                        >
                            {bookingLoading ? 'Đang xử lý...' : 'Xác nhận'}
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Dialog thông tin khách hàng */}
                <Dialog
                    open={customerInfoDialog.open}
                    onClose={closeCustomerInfo}
                    maxWidth="xs"
                    fullScreen={isMobile}
                >
                    <DialogTitle sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        Thông tin khách hàng
                        {isMobile && (
                            <IconButton onClick={closeCustomerInfo}>
                                <CloseIcon />
                            </IconButton>
                        )}
                    </DialogTitle>
                    <DialogContent>
                        {customerInfoDialog.customer && (
                            <Box>
                                <Typography variant="body1">
                                    <strong>Họ tên:</strong> {customerInfoDialog.customer.name}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Số điện thoại:</strong> {customerInfoDialog.customer.phone}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Trạng thái cọc:</strong> {customerInfoDialog.customer.deposit}
                                </Typography>
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={closeCustomerInfo}
                            fullWidth={isMobile}
                            variant="contained"
                        >
                            Đóng
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Sử dụng component DialogConfirm */}
                <DialogConfirm
                    open={confirmDialog.open}
                    title={confirmDialog.title}
                    message={confirmDialog.message}
                    onClose={closeConfirmDialog}
                    onConfirm={confirmDialog.onConfirm}
                />
            </Container>
        </>
    );
};

export default Rooms;
