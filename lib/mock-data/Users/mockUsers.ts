import { User } from "@/types/Users";
import { mockAdmin } from "./mockAdmin";
import { mockStaffs } from "./mockStaff";
import { mockCustomers } from "./mockCustomer";

export const mockUsers: User = {
  "admin": mockAdmin,
  "an.nguyen": mockStaffs[0],
  "binh.tran": mockStaffs[1],
  "cuong.le": mockStaffs[2],
  "dung.hoang": mockStaffs[3],
  "giang.vu": mockStaffs[4],
  "minh.nguyen": mockCustomers[0],
  "lan.tran": mockCustomers[1],
  "khoa.pham": mockCustomers[2],
  "huong.le": mockCustomers[3],
  "tuan.ngo": mockCustomers[4]
};