import { Staff } from "@/types/Users";

export const mockAdmin: Staff = {
  id: 1,
  username: "admin_florist",
  password: "hashed_password_admin_2026",
  fullName: "Nguyễn Trần Quốc Anh",
  address: "Phường Bến Nghé, Quận 1, TP. HCM",
  email: "admin.florist@gmail.com",
  phone: "0901234567",
  paycycle: "monthly",
  earnings: 25000000,
  isActive: true,
  isLoggedIn: false,
  role: "Admin",
};
