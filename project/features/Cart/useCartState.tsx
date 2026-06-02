"use client";

import { useSyncExternalStore, useMemo } from "react";
import { CartItems } from "@/types/Cart";
import { Product } from "@/types/Product";

// Tập hợp lưu các hàm thông báo cho React biết khi giỏ hàng thay đổi
const listeners = new Set<() => void>();

// Đăng ký lắng nghe dữ liệu từ localStorage (chạy khi mở trang)
const subscribe = (callback: () => void) => {
  listeners.add(callback);

  // Đồng bộ giỏ hàng ngay lập tức nếu khách mở nhiều tab cùng lúc
  const handleCrossTab = (e: StorageEvent) => {
    if (e.key === "project_cart") callback();
  };
  window.addEventListener("storage", handleCrossTab);

  // Hủy lắng nghe khi đóng trang / tắt component
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", handleCrossTab);
  };
};

// Đọc chuỗi text giỏ hàng từ localStorage dưới máy khách
const getSnapshot = () => {
  if (typeof window === "undefined") return "[]";
  return localStorage.getItem("project_cart") || "[]";
};

// Trả về mảng rỗng mặc định khi chạy trên Server để chống lỗi giao diện (Hydration)
const getServerSnapshot = () => "[]";

export function useCartState() {
  // Lấy chuỗi dữ liệu giỏ hàng từ localStorage
  const cartItemsString = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  // Chỉ ép chuỗi text thành mảng Object khi giỏ hàng thực sự thay đổi (Tối ưu bộ nhớ)
  const cartItems = useMemo<CartItems[]>(() => {
    return JSON.parse(cartItemsString);
  }, [cartItemsString]);

  // Hàm lưu giỏ hàng mới vào máy khách và báo cho React cập nhật giao diện
  function saveCart(newCart: CartItems[]) {
    localStorage.setItem("project_cart", JSON.stringify(newCart));
    listeners.forEach((callback) => callback());
  }

  // --- CÁC HÀM XỬ LÝ CHỨC NĂNG ---

  // Thêm sản phẩm vào giỏ
  function addCartItem(p: Product) {
    const isExist = cartItems.find(
      (item) => String(item.product.id) === String(p.id),
    );
    let updated: CartItems[];

    if (isExist) {
      // Nếu trùng ID thì tăng số lượng lên 1
      updated = cartItems.map((item) =>
        String(item.product.id) === String(p.id)
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    } else {
      // Nếu là món mới, sao chép độc lập sản phẩm (Deep Copy) để tránh lỗi bộ nhớ
      const clonedProduct = JSON.parse(JSON.stringify(p));
      updated = [...cartItems, { product: clonedProduct, quantity: 1 }];
    }
    saveCart(updated);
  }

  // Giảm số lượng (Nếu đang là 1 mà giảm tiếp thì xóa luôn món đó khỏi giỏ)
  function decreaseCartItem(productId: number) {
    const isExist = cartItems.find(
      (item) => String(item.product.id) === String(productId),
    );
    let updated: CartItems[];

    if (isExist && isExist.quantity > 1) {
      updated = cartItems.map((item) =>
        String(item.product.id) === String(productId)
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
    } else {
      updated = cartItems.filter(
        (item) => String(item.product.id) !== String(productId),
      );
    }
    saveCart(updated);
  }

  // Xóa hẳn sản phẩm ra khỏi giỏ
  function removeCartItem(productId: number) {
    const updated = cartItems.filter(
      (item) => String(item.product.id) !== String(productId),
    );
    saveCart(updated);
  }

  // Xóa sạch bách giỏ hàng (Dùng khi hủy hoặc sau khi thanh toán xong)
  function clearCart() {
    localStorage.removeItem("project_cart");
    listeners.forEach((callback) => callback());
  }

  // Tự động tính Tổng số lượng và Tổng tiền mỗi lần giỏ hàng thay đổi
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.product.sellPrice,
    0,
  );

  return {
    cartItems,
    totalItems,
    totalPrice,
    addCartItem,
    decreaseCartItem,
    removeCartItem,
    clearCart,
  };
}
