export type Staff = {
  id: number;
  username: string;
  password: string;
  fullName: string;
  address: string;
  email: string;
  phone: string;
  paycycle: "monthly" | "hourly";
  earnings: number;
  isActive: boolean;
  isLoggedIn: boolean;
  role: "Staff" | "Admin";
};

export type Customer = {
  id: number;
  username: string;
  lastName: string;
  firstName: string;
  phone: string;
  address: string;
  isLoggedIn: boolean;
};

