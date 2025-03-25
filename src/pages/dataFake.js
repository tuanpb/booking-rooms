export default [
    {
        "id": 1,
        "name": "Phòng A1",
        "type": "a", // xác định loại phòng (ví dụ: vip, thường, ...)
        "schedule": [
            {
                "time": "00:00",
                "status": "booked", // (available, booked) đổi thành 0-1 hoặc sựa vào customer
                "customer": {
                    "name": "Khách hàng 0",
                    "phone": "0000-0",
                    "deposit": "Đã cọc" // đổi thành 0-1
                }
            },
            {
                "time": "00:30",
                "status": "available",
                "customer": null
            },
            {
                "time": "01:00",
                "status": "available",
                "customer": null
            },
            {
                "time": "01:30",
                "status": "available",
                "customer": null
            },
            {
                "time": "02:00",
                "status": "available",
                "customer": null
            },
            {
                "time": "02:30",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 2",
                    "phone": "0000-2",
                    "deposit": "Đã cọc"
                }
            },
            {
                "time": "03:00",
                "status": "available",
                "customer": null
            },
            {
                "time": "03:30",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 3",
                    "phone": "0000-3",
                    "deposit": "Chưa cọc"
                }
            },
            {
                "time": "04:00",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 4",
                    "phone": "0000-4",
                    "deposit": "Đã cọc"
                }
            },
            {
                "time": "04:30",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 4",
                    "phone": "0000-4",
                    "deposit": "Chưa cọc"
                }
            },
            {
                "time": "05:00",
                "status": "available",
                "customer": null
            },
            {
                "time": "05:30",
                "status": "available",
                "customer": null
            },
            {
                "time": "06:00",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 6",
                    "phone": "0000-6",
                    "deposit": "Chưa cọc"
                }
            },
            {
                "time": "06:30",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 6",
                    "phone": "0000-6",
                    "deposit": "Chưa cọc"
                }
            },
            {
                "time": "07:00",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 7",
                    "phone": "0000-7",
                    "deposit": "Chưa cọc"
                }
            },
            {
                "time": "07:30",
                "status": "available",
                "customer": null
            },
            {
                "time": "08:00",
                "status": "available",
                "customer": null
            },
            {
                "time": "08:30",
                "status": "available",
                "customer": null
            },
            {
                "time": "09:00",
                "status": "available",
                "customer": null
            },
            {
                "time": "09:30",
                "status": "available",
                "customer": null
            },
            {
                "time": "10:00",
                "status": "available",
                "customer": null
            },
            {
                "time": "10:30",
                "status": "available",
                "customer": null
            },
            {
                "time": "11:00",
                "status": "available",
                "customer": null
            },
            {
                "time": "11:30",
                "status": "available",
                "customer": null
            },
            {
                "time": "12:00",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 12",
                    "phone": "0000-12",
                    "deposit": "Đã cọc"
                }
            },
            {
                "time": "12:30",
                "status": "available",
                "customer": null
            },
            {
                "time": "13:00",
                "status": "available",
                "customer": null
            },
            {
                "time": "13:30",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 13",
                    "phone": "0000-13",
                    "deposit": "Đã cọc"
                }
            },
            {
                "time": "14:00",
                "status": "available",
                "customer": null
            },
            {
                "time": "14:30",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 14",
                    "phone": "0000-14",
                    "deposit": "Đã cọc"
                }
            },
            {
                "time": "15:00",
                "status": "available",
                "customer": null
            },
            {
                "time": "15:30",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 15",
                    "phone": "0000-15",
                    "deposit": "Chưa cọc"
                }
            },
            {
                "time": "16:00",
                "status": "available",
                "customer": null
            },
            {
                "time": "16:30",
                "status": "available",
                "customer": null
            },
            {
                "time": "17:00",
                "status": "available",
                "customer": null
            },
            {
                "time": "17:30",
                "status": "available",
                "customer": null
            },
            {
                "time": "18:00",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 18",
                    "phone": "0000-18",
                    "deposit": "Chưa cọc"
                }
            },
            {
                "time": "18:30",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 18",
                    "phone": "0000-18",
                    "deposit": "Đã cọc"
                }
            },
            {
                "time": "19:00",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 19",
                    "phone": "0000-19",
                    "deposit": "Đã cọc"
                }
            },
            {
                "time": "19:30",
                "status": "available",
                "customer": null
            },
            {
                "time": "20:00",
                "status": "available",
                "customer": null
            },
            {
                "time": "20:30",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 20",
                    "phone": "0000-20",
                    "deposit": "Chưa cọc"
                }
            },
            {
                "time": "21:00",
                "status": "available",
                "customer": null
            },
            {
                "time": "21:30",
                "status": "available",
                "customer": null
            },
            {
                "time": "22:00",
                "status": "available",
                "customer": null
            },
            {
                "time": "22:30",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 22",
                    "phone": "0000-22",
                    "deposit": "Đã cọc"
                }
            },
            {
                "time": "23:00",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 23",
                    "phone": "0000-23",
                    "deposit": "Chưa cọc"
                }
            }
        ]
    },
    {
        "id": 6,
        "name": "Phòng VIP 1",
        "type": "vip",
        "schedule": [
            {
                "time": "00:00",
                "status": "available",
                "customer": null
            },
            {
                "time": "00:30",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 0",
                    "phone": "0000-0",
                    "deposit": "Chưa cọc"
                }
            },
            {
                "time": "01:00",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 1",
                    "phone": "0000-1",
                    "deposit": "Chưa cọc"
                }
            },
            {
                "time": "01:30",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 1",
                    "phone": "0000-1",
                    "deposit": "Chưa cọc"
                }
            },
            {
                "time": "02:00",
                "status": "available",
                "customer": null
            },
            {
                "time": "02:30",
                "status": "available",
                "customer": null
            },
            {
                "time": "03:00",
                "status": "available",
                "customer": null
            },
            {
                "time": "03:30",
                "status": "available",
                "customer": null
            },
            {
                "time": "04:00",
                "status": "available",
                "customer": null
            },
            {
                "time": "04:30",
                "status": "available",
                "customer": null
            },
            {
                "time": "05:00",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 5",
                    "phone": "0000-5",
                    "deposit": "Đã cọc"
                }
            },
            {
                "time": "05:30",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 5",
                    "phone": "0000-5",
                    "deposit": "Chưa cọc"
                }
            },
            {
                "time": "06:00",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 6",
                    "phone": "0000-6",
                    "deposit": "Đã cọc"
                }
            },
            {
                "time": "06:30",
                "status": "available",
                "customer": null
            },
            {
                "time": "07:00",
                "status": "available",
                "customer": null
            },
            {
                "time": "07:30",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 7",
                    "phone": "0000-7",
                    "deposit": "Đã cọc"
                }
            },
            {
                "time": "08:00",
                "status": "available",
                "customer": null
            },
            {
                "time": "08:30",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 8",
                    "phone": "0000-8",
                    "deposit": "Đã cọc"
                }
            },
            {
                "time": "09:00",
                "status": "available",
                "customer": null
            },
            {
                "time": "09:30",
                "status": "available",
                "customer": null
            },
            {
                "time": "10:00",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 10",
                    "phone": "0000-10",
                    "deposit": "Chưa cọc"
                }
            },
            {
                "time": "10:30",
                "status": "available",
                "customer": null
            },
            {
                "time": "11:00",
                "status": "available",
                "customer": null
            },
            {
                "time": "11:30",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 11",
                    "phone": "0000-11",
                    "deposit": "Chưa cọc"
                }
            },
            {
                "time": "12:00",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 12",
                    "phone": "0000-12",
                    "deposit": "Đã cọc"
                }
            },
            {
                "time": "12:30",
                "status": "available",
                "customer": null
            },
            {
                "time": "13:00",
                "status": "available",
                "customer": null
            },
            {
                "time": "13:30",
                "status": "available",
                "customer": null
            },
            {
                "time": "14:00",
                "status": "available",
                "customer": null
            },
            {
                "time": "14:30",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 14",
                    "phone": "0000-14",
                    "deposit": "Đã cọc"
                }
            },
            {
                "time": "15:00",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 15",
                    "phone": "0000-15",
                    "deposit": "Chưa cọc"
                }
            },
            {
                "time": "15:30",
                "status": "available",
                "customer": null
            },
            {
                "time": "16:00",
                "status": "available",
                "customer": null
            },
            {
                "time": "16:30",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 16",
                    "phone": "0000-16",
                    "deposit": "Đã cọc"
                }
            },
            {
                "time": "17:00",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 17",
                    "phone": "0000-17",
                    "deposit": "Chưa cọc"
                }
            },
            {
                "time": "17:30",
                "status": "available",
                "customer": null
            },
            {
                "time": "18:00",
                "status": "available",
                "customer": null
            },
            {
                "time": "18:30",
                "status": "available",
                "customer": null
            },
            {
                "time": "19:00",
                "status": "available",
                "customer": null
            },
            {
                "time": "19:30",
                "status": "available",
                "customer": null
            },
            {
                "time": "20:00",
                "status": "available",
                "customer": null
            },
            {
                "time": "20:30",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 20",
                    "phone": "0000-20",
                    "deposit": "Đã cọc"
                }
            },
            {
                "time": "21:00",
                "status": "available",
                "customer": null
            },
            {
                "time": "21:30",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 21",
                    "phone": "0000-21",
                    "deposit": "Đã cọc"
                }
            },
            {
                "time": "22:00",
                "status": "available",
                "customer": null
            },
            {
                "time": "22:30",
                "status": "available",
                "customer": null
            },
            {
                "time": "23:00",
                "status": "booked",
                "customer": {
                    "name": "Khách hàng 23",
                    "phone": "0000-23",
                    "deposit": "Chưa cọc"
                }
            }
        ]
    },

]