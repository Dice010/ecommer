import { CartItems } from "./Cart";

export type UserRole = "Admin" | "Staff" | "Customer";

export type userName = string;

export type BaseUser = {
  id: string;
  phone: string;
  email: string;
  address: string;
  password: string;
  role: UserRole;
};

export type Staff = BaseUser & {
  fullName: string;
  paycycle: "monthly" | "hourly";
  earnings: number;
  role: "Staff" | "Admin";
};

export type Customer = BaseUser & {
  lastName: string;
  firstName: string;
  cart: CartItems[];
  role: "Customer";
};

export type User = Record<userName, Staff | Customer>;
