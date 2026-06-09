import { Staff } from "@/types/Users";


export const mockStaffs: Staff[] = [
  {
    id: "u-staff-1",
    phone: "0912345678",
    email: "an.nguyen@florist.com",
    address: "456 Nguyễn Thị Minh Khai, Quận 3, TP.HCM",
    password: "hashed_password_staff1",
    role: "Staff",
    fullName: "Nguyễn Văn An",
    paycycle: "monthly",
    earnings: 10000000
  },
  {
    id: "u-staff-2",
    phone: "0923456789",
    email: "binh.tran@florist.com",
    address: "789 Điện Biên Phủ, Quận Bình Thạnh, TP.HCM",
    password: "hashed_password_staff2",
    role: "Staff",
    fullName: "Trần Thị Bình",
    paycycle: "hourly",
    earnings: 4500000 // Tính theo giờ
  },
  {
    id: "u-staff-3",
    phone: "0934567890",
    email: "cuong.le@florist.com",
    address: "12 Cách Mạng Tháng 8, Quận 10, TP.HCM",
    password: "hashed_password_staff3",
    role: "Staff",
    fullName: "Lê Hoàng Cường",
    paycycle: "monthly",
    earnings: 12000000
  },
  {
    id: "u-staff-4",
    phone: "0945678901",
    email: "dung.hoang@florist.com",
    address: "99 Cộng Hòa, Quận Tân Bình, TP.HCM",
    password: "hashed_password_staff4",
    role: "Staff",
    fullName: "Hoàng Thị Dung",
    paycycle: "hourly",
    earnings: 5200000
  },
  {
    id: "u-staff-5",
    phone: "0956789012",
    email: "giang.vu@florist.com",
    address: "234 Võ Văn Ngân, TP. Thủ Đức",
    password: "hashed_password_staff5",
    role: "Staff",
    fullName: "Vũ Hoàng Giang",
    paycycle: "monthly",
    earnings: 9500000
  }
];