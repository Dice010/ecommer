"use client";

import { useSyncExternalStore, useMemo } from "react";
import { Staff, Customer } from "@/types/Users";

// Định nghĩa kiểu user: Nhân viên, Khách hàng (kèm trạng thái đã đăng nhập) hoặc chưa đăng nhập (null)
type UserType =
  | (Staff & { type: "staff"; isLoggedIn: true })
  | (Customer & { type: "customer"; isLoggedIn: true })
  | null;

// Đăng ký lắng nghe sự kiện thay đổi từ localStorage giữa các tab (Cross-tab)
const subscribe = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

// Đọc chuỗi text thông tin user từ localStorage dưới trình duyệt
const getSnapshot = () => {
  if (typeof window === "undefined") return "null";
  return localStorage.getItem("auth_user") || "null";
};

// Trả về chuỗi mặc định khi chạy trên Server để chống lỗi giao diện (Hydration)
const getServerSnapshot = () => "null";

export function useAuthState() {
  // Lấy dữ liệu đăng nhập trực tiếp từ localStorage
  const authString = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  // Chỉ ép chuỗi text thành Object khi thông tin đăng nhập thực sự thay đổi (Tối ưu hiệu năng)
  const user = useMemo<UserType>(() => {
    if (authString === "null") return null;
    try {
      return JSON.parse(authString);
    } catch (error) {
      console.error("Lỗi parse JSON auth:", error);
      return null;
    }
  }, [authString]);

  // --- CÁC HÀM XỬ LÝ ---

  // Xử lý khi đăng nhập thành công: Lưu dữ liệu và báo cho các tab khác cập nhật theo
  function login(userData: Staff | Customer, type: "staff" | "customer") {
    const completeUser = { ...userData, type, isLoggedIn: true };
    localStorage.setItem("auth_user", JSON.stringify(completeUser));
    // Tự kích hoạt sự kiện storage để ép tab hiện tại nhận diện thay đổi ngay lập tức
    window.dispatchEvent(new Event("storage"));
  }

  // Xử lý đăng xuất: Xóa dữ liệu và báo cho các tab khác cập nhật theo
  function logout() {
    localStorage.removeItem("auth_user");
    window.dispatchEvent(new Event("storage"));
  }

  // --- HỆ THỐNG BIẾN PHÂN QUYỀN (Tự động cập nhật theo trạng thái user) ---
  const isAdmin =
    user?.type === "staff" && "role" in user && user.role === "Admin";
  const isStaff =
    user?.type === "staff" && "role" in user && user.role === "Staff";
  const isCustomer = user?.type === "customer";

  return {
    user,
    // Kiểm tra trạng thái đang tải dữ liệu (Tránh hiện tượng giao diện bị nháy lúc load lại trang)
    isLoading:
      typeof window !== "undefined" &&
      authString === "null" &&
      localStorage.getItem("auth_user") !== null,
    isAdmin,
    isStaff,
    isCustomer,
    login,
    logout,
  };
}
