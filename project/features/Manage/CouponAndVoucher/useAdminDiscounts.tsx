"use client";

import { useSyncExternalStore, useMemo } from "react";
import { useAuth } from "../../Auth/useAuthContext";
import { Coupon, Voucher } from "@/types/Discount";

const EMPTY_ARRAY_STR = "[]";

// Lắng nghe thay đổi dữ liệu chương trình giảm giá từ localStorage giữa các tab trình duyệt
const subscribe = (cb: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
};

// Các hàm lấy chuỗi text dữ liệu Coupon và Voucher từ localStorage dưới máy khách
const getCouponSnapshot = () =>
  (typeof window !== "undefined" && localStorage.getItem("admin_coupons")) ||
  EMPTY_ARRAY_STR;

const getVoucherSnapshot = () =>
  (typeof window !== "undefined" && localStorage.getItem("admin_vouchers")) ||
  EMPTY_ARRAY_STR;

// Trả về mảng rỗng mặc định khi chạy trên Server để chống lỗi giao diện (Hydration)
const getServerSnapshot = () => EMPTY_ARRAY_STR;

export function useAdminDiscounts() {
  const { isAdmin } = useAuth(); // Kiểm tra xem quyền hiện tại có phải Admin không

  // Đồng bộ chuỗi dữ liệu Coupon và Voucher từ bộ nhớ localStorage
  const couponStr = useSyncExternalStore(
    subscribe,
    getCouponSnapshot,
    getServerSnapshot,
  );
  const voucherStr = useSyncExternalStore(
    subscribe,
    getVoucherSnapshot,
    getServerSnapshot,
  );

  // Ép chuỗi text thành mảng Object Coupon (Chỉ ép khi dữ liệu thực sự thay đổi)
  const coupons = useMemo<Coupon[]>(() => {
    try {
      return JSON.parse(couponStr);
    } catch {
      return [];
    }
  }, [couponStr]);

  // Ép chuỗi text thành mảng Object Voucher
  const vouchers = useMemo<Voucher[]>(() => {
    try {
      return JSON.parse(voucherStr);
    } catch {
      return [];
    }
  }, [voucherStr]);

  // --- CÁC CHỨC NĂNG TẠO MÃ CỦA ADMIN ---

  // Hàm tạo mới một mã Coupon (Mã giảm giá theo đơn hàng)
  function createCoupon(newCoupon: Omit<Coupon, "id" | "usedCount">) {
    if (!isAdmin) {
      console.warn(
        "Cảnh báo bảo mật: Bạn không có quyền thực hiện hành động này!",
      );
      return;
    }

    const updated = [
      ...coupons,
      { ...newCoupon, id: Date.now(), usedCount: 0 }, // Fake ID tự tăng và đặt lượt dùng ban đầu bằng 0
    ];
    localStorage.setItem("admin_coupons", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage")); // Kích hoạt đồng bộ các tab khác
  }

  // Hàm tạo mới một thẻ Voucher (Phiếu quà tặng trừ thẳng tiền)
  function createVoucher(
    newVoucher: Omit<Voucher, "id" | "isUsed" | "usedAt">,
  ) {
    if (!isAdmin) {
      console.warn(
        "Cảnh báo bảo mật: Bạn không có quyền thực hiện hành động này!",
      );
      return;
    }

    const updated = [
      ...vouchers,
      { ...newVoucher, id: Date.now(), isUsed: false, usedAt: null }, // Đặt mặc định là chưa sử dụng
    ];
    localStorage.setItem("admin_vouchers", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  }

  return {
    // Bảo mật: Nếu đúng Admin mới trả dữ liệu thực tế, còn lại trả về mảng rỗng để ẩn giao diện
    coupons: isAdmin ? coupons : [],
    vouchers: isAdmin ? vouchers : [],
    createCoupon,
    createVoucher,
  };
}
