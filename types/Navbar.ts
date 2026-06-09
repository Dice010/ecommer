import { UserRole } from "./Users";

type INavbarItem = {
  id: string;
  label: string;
  href: string;
};

export type NavbarItem = Record<string, INavbarItem>;

type Navbar = INavbarItem[];

export type RoleBasedNavbar = Record<UserRole, Navbar>;