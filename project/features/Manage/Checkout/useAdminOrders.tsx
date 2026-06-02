"use client";

import { useSyncExternalStore, useMemo } from "react";
import { useAuth } from "../../Auth/useAuthContext";
import { Order } from "@/types/Order";

const EMPTY_ARRAY_STR = "[]";

// Lắng nghe thay đổi dữ liệu từ localStorage giữa các tab trình duyệt
const subscribe = (cb: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
};

// Hàm lấy chuỗi text danh sách hóa đơn từ localStorage dưới máy khách
const getOrdersSnapshot = () =>
  (typeof window !== "undefined" && localStorage.getItem("project_orders")) ||
  EMPTY_ARRAY_STR;

// Trả về mảng rỗng mặc định khi chạy trên Server để chống lỗi giao diện (Hydration)
const getServerSnapshot = () => EMPTY_ARRAY_STR;

export function useAdminOrders() {
  const { isAdmin } = useAuth(); // Kiểm tra xem user hiện tại có phải Admin không

  // Đồng bộ chuỗi text danh sách hóa đơn từ localStorage (Dùng chung bộ lưu trữ với trang khách hàng)
  const ordersStr = useSyncExternalStore(
    subscribe,
    getOrdersSnapshot,
    getServerSnapshot,
  );

  // Ép chuỗi text thành mảng Object Hóa đơn (Chỉ ép khi dữ liệu thực sự thay đổi)
  const orders = useMemo<Order[]>(() => {
    try {
      return JSON.parse(ordersStr);
    } catch {
      return [];
    }
  }, [ordersStr]);

  // --- CHỨC NĂNG CỦA ADMIN ---

  // Hàm xử lý Hủy hóa đơn
  function cancelOrder(orderId: number) {
    if (!isAdmin) {
      console.warn(
        "Cảnh báo bảo mật: Bạn không có quyền thực hiện hành động này!",
      );
      return;
    }

    // Tìm đúng hóa đơn theo ID để đổi trạng thái thành "Cancelled" và cập nhật mốc thời gian
    const updated = orders.map((order) =>
      String(order.id) === String(orderId)
        ? {
            ...order,
            status: "Cancelled" as const,
            updatedAt: new Date().toISOString(),
          }
        : order,
    );

    // Lưu danh sách mới sau khi hủy vào localStorage và báo cho các tab khác cập nhật UI
    localStorage.setItem("project_orders", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  }

  return {
    // Bảo mật: Nếu là Admin thì mới trả về danh sách đơn hàng, nếu không thì trả về mảng rỗng để ẩn giao diện
    orders: isAdmin ? orders : [],
    cancelOrder,
  };
}
