import { Staff } from "@/types/Users";


 export const mockAdmin: Staff = {
  id: "u-admin-1",
  phone: "0901234567",
  email: "admin.florist@gmail.com",
  address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
  password: "hashed_password_admin",
  role: "Admin", // Quyền Admin
  fullName: "Nguyễn Văn Quản Lý",
  paycycle: "monthly",
  earnings: 25000000
};
