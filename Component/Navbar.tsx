"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/Context/Auth/useAuthContext";
import { useCartContext } from "@/Context/Cart/useCartContext";
import { RoleBasedNavbar, NavbarItem } from "@/types/Navbar";
import { getFontSize } from "@/lib/fontSize";

const navbarItem: NavbarItem = {
  Store: { id: "N00", label: "Cửa hàng", href: "/" },
  Warehouse: { id: "N01", label: "Quản lý kho", href: "/Warehouse" },
  Discount: { id: "N02", label: "Quản lý mã giảm giá", href: "/Discount" },
  Blog: { id: "N03", label: "Blog", href: "/Blogs" },
  MBlog: { id: "N04", label: "Quản lý Blog", href: "/MBlog" },
  Cart: { id: "N05", label: "Giỏ hàng", href: "/Cart" },
};

const navbarData: RoleBasedNavbar = {
  Admin: [
    navbarItem["Store"],
    navbarItem["Warehouse"],
    navbarItem["Blog"],
    navbarItem["MBlog"],
    navbarItem["Discount"],
  ],
  Staff: [navbarItem["Store"], navbarItem["Warehouse"], navbarItem["MBlog"]],
  Customer: [navbarItem["Store"], navbarItem["Blog"], navbarItem["Cart"]],
};

// Hook chống lỗi Hydration an toàn cho Next.js App Router
const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export default function Navbar() {
  const { user, Logout } = useAuth();
  const { state } = useCartContext();
  const isMounted = useIsMounted();

  const currentRole = user?.role || "Customer";
  const menuItems = navbarData[currentRole] || navbarData["Customer"];
  const totalItems = state.count || 0;

  const displayName = user
    ? "firstName" in user
      ? `${user.firstName} ${user.lastName}`
      : user.fullName
    : "Thành viên";

  return (
    <nav className="bg-linear-to-r from-caramel-cool to-pink-frost text-white px-6 py-4 shadow-md flex items-center justify-between border-b border-white/10">
      {/* Brand Logo */}
      <div
        style={{ fontSize: getFontSize("h3") }}
        className="font-bold tracking-wide text-white"
      >
        <Link href="/" className="hover:opacity-90 transition-opacity">
          Florist <span className="text-[#1E2538]">Ecom</span>
        </Link>
      </div>

      {/* Menu Navigation */}
      <div className="flex items-center gap-6">
        {menuItems.map((item) => {
          const isCart = item.id === "N05";
          return (
            <Link
              key={item.id}
              href={user ? item.href : "/login"}
              style={{ fontSize: getFontSize("p") }}
              className="relative hover:scale-110 transition-all py-1 font-medium text-white/90 flex items-center gap-2"
            >
              {isCart ? (
                // Icon Giỏ hàng SVG
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              ) : (
                item.label
              )}

              {/* Badge số lượng giỏ hàng */}
              {isCart && isMounted && totalItems > 0 && (
                <span className="absolute -top-2 -right-4 bg-[#1E2538] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Authentication & User Profile */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            {/* Khung chứa Profile tinh tế trên nền Gradient */}
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20 shadow-sm">
              <div className="relative w-7 h-7 rounded-full overflow-hidden bg-white/30">
                <Image
                  src="/images/fallback_profile.png"
                  alt="User Profile"
                  fill
                  sizes="28px"
                  className="object-cover"
                  priority
                />
              </div>
              <span
                style={{ fontSize: getFontSize("sub") }}
                className="text-white font-medium max-w-[100px] truncate"
              >
                {displayName}
              </span>
            </div>

            <button
              onClick={Logout}
              style={{ fontSize: getFontSize("p") }}
              className="bg-pink-400 text-white hover:scale-110 hover:shadow-5xl px-4 py-1.5 rounded-md transition-all font-medium border border-transparent shadow-sm"
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <Link
            href="/login"
            style={{ fontSize: getFontSize("p") }}
            className="bg-pink-400 text-white hover:scale-110 hover:shadow-5xl px-5 py-1.5 rounded-md transition-all font-medium shadow-md"
          >
            Đăng nhập
          </Link>
        )}
      </div>
    </nav>
  );
}
