"use client";

import { useSyncExternalStore, useMemo } from "react";
import { useAuth } from "../../Auth/useAuthContext";
import { Staff, Customer } from "@/types/Users";

const EMPTY_ARRAY_STR = "[]";
const listeners = new Set<() => void>();

// Lắng nghe thay đổi từ localStorage giữa các tab trình duyệt
const subscribe = (cb: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
};

// Các hàm lấy chuỗi text dữ liệu (Snapshot) từ localStorage dưới máy khách
const getStaffSnapshot = () =>
  (typeof window !== "undefined" && localStorage.getItem("admin_staffs")) ||
  EMPTY_ARRAY_STR;

const getCustomerSnapshot = () =>
  (typeof window !== "undefined" && localStorage.getItem("admin_customers")) ||
  EMPTY_ARRAY_STR;

// Trả về mảng rỗng mặc định khi chạy trên Server để chống lỗi giao diện (Hydration)
const getServerSnapshot = () => EMPTY_ARRAY_STR;

export function useAdminUsers() {
  const { isAdmin } = useAuth(); // Lấy thông tin kiểm tra xem có phải Admin không

  // Đồng bộ chuỗi text dữ liệu Nhân viên và Khách hàng từ localStorage
  const staffStr = useSyncExternalStore(
    subscribe,
    getStaffSnapshot,
    getServerSnapshot,
  );
  const customerStr = useSyncExternalStore(
    subscribe,
    getCustomerSnapshot,
    getServerSnapshot,
  );

  // Ép chuỗi text thành mảng Object Nhân viên (Chỉ ép khi chuỗi text thực sự thay đổi)
  const staffs = useMemo<Staff[]>(() => {
    try {
      return JSON.parse(staffStr);
    } catch {
      return [];
    }
  }, [staffStr]);

  // Ép chuỗi text thành mảng Object Khách hàng
  const customers = useMemo<Customer[]>(() => {
    try {
      return JSON.parse(customerStr);
    } catch {
      return [];
    }
  }, [customerStr]);

  // --- CÁC HÀM XỬ LÝ CHỨC NĂNG CỦA ADMIN ---

  // Thêm nhân viên mới
  function addStaff(newStaff: Omit<Staff, "id" | "isLoggedIn">) {
    if (!isAdmin) {
      console.warn(
        "Cảnh báo bảo mật: Bạn không có quyền thực hiện hành động này!",
      );
      return;
    }

    const updated = [
      ...staffs,
      { ...newStaff, id: Date.now(), isLoggedIn: false }, // Fake ID bằng timestamp
    ];
    localStorage.setItem("admin_staffs", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage")); // Báo cho các tab khác cập nhật theo
  }

  // Khóa hoặc mở khóa tài khoản nhân viên (Bật/Tắt trạng thái hoạt động)
  function toggleStaffStatus(id: number) {
    if (!isAdmin) {
      console.warn(
        "Cảnh báo bảo mật: Bạn không có quyền thực hiện hành động này!",
      );
      return;
    }

    // So sánh ID dạng ép chuỗi cho chắc chắn, tìm đúng người thì đảo ngược biến isActive
    const updated = staffs.map((s) =>
      String(s.id) === String(id) ? { ...s, isActive: !s.isActive } : s,
    );
    localStorage.setItem("admin_staffs", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  }

  return {
    // Bảo mật: Nếu đúng là Admin thì mới trả dữ liệu, nếu không thì trả về mảng rỗng để ẩn giao diện
    staffs: isAdmin ? staffs : [],
    customers: isAdmin ? customers : [],
    addStaff,
    toggleStaffStatus,
  };
}
