"use client";

import { useSyncExternalStore, useMemo } from "react";
import { useAuth } from "../../Auth/useAuthContext";
import { items, Product } from "@/types/Product";

const EMPTY_ARRAY_STR = "[]";

// Lắng nghe thay đổi dữ liệu kho và sản phẩm từ localStorage giữa các tab trình duyệt
const subscribe = (cb: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
};

// Các hàm lấy chuỗi text dữ liệu Nguyên liệu và Sản phẩm từ localStorage dưới máy khách
const getInventorySnapshot = () =>
  (typeof window !== "undefined" && localStorage.getItem("admin_inventory")) ||
  EMPTY_ARRAY_STR;

const getProductsSnapshot = () =>
  (typeof window !== "undefined" && localStorage.getItem("admin_products")) ||
  EMPTY_ARRAY_STR;

// Trả về mảng rỗng mặc định khi chạy trên Server để chống lỗi giao diện (Hydration)
const getServerSnapshot = () => EMPTY_ARRAY_STR;

export function useAdminInventory() {
  const { isAdmin } = useAuth(); // Kiểm tra xem quyền hiện tại có phải Admin không

  // Đồng bộ chuỗi text dữ liệu Nguyên liệu và Sản phẩm từ bộ nhớ
  const inventoryStr = useSyncExternalStore(
    subscribe,
    getInventorySnapshot,
    getServerSnapshot,
  );
  const productsStr = useSyncExternalStore(
    subscribe,
    getProductsSnapshot,
    getServerSnapshot,
  );

  // Ép chuỗi text thành mảng Object Nguyên liệu thô (Chỉ ép khi dữ liệu thực sự thay đổi)
  const inventory = useMemo<items[]>(() => {
    try {
      return JSON.parse(inventoryStr);
    } catch {
      return [];
    }
  }, [inventoryStr]);

  // Ép chuỗi text thành mảng Object Sản phẩm mở bán
  const products = useMemo<Product[]>(() => {
    try {
      return JSON.parse(productsStr);
    } catch {
      return [];
    }
  }, [productsStr]);

  // --- CÁC CHỨC NĂNG QUẢN LÝ CỦA ADMIN ---

  // Cập nhật số lượng tồn kho của một Nguyên liệu (Dùng khi nhập kho hoặc kiểm kho)
  function updateStock(itemId: number, newStock: number) {
    if (!isAdmin) return;

    // Tìm đúng nguyên liệu theo ID để ghi đè số lượng tồn kho mới
    const updated = inventory.map((item) =>
      String(item.id) === String(itemId) ? { ...item, stock: newStock } : item,
    );
    localStorage.setItem("admin_inventory", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage")); // Kích hoạt đồng bộ các tab khác
  }

  // Thêm một loại Nguyên liệu thô mới vào kho
  function addNewItem(newItem: Omit<items, "id">) {
    if (!isAdmin) return;

    const updated = [...inventory, { ...newItem, id: Date.now() }]; // Tự cấp ID bằng timestamp
    localStorage.setItem("admin_inventory", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  }

  // Tạo một Sản phẩm mới để mở bán lên cửa hàng
  function addNewProduct(newProduct: Omit<Product, "id">) {
    if (!isAdmin) return;

    const updated = [...products, { ...newProduct, id: Date.now() }];
    localStorage.setItem("admin_products", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  }

  // Xóa bỏ hoặc ngừng bán một Sản phẩm
  function removeProduct(productId: number) {
    if (!isAdmin) return;

    // Lọc bỏ sản phẩm được chọn ra khỏi mảng
    const updated = products.filter((p) => String(p.id) !== String(productId));
    localStorage.setItem("admin_products", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  }

  return {
    // Bảo mật: Nếu đúng Admin mới trả dữ liệu thực tế, còn lại ẩn hết bằng mảng rỗng để bảo vệ giao diện
    inventory: isAdmin ? inventory : [],
    products: isAdmin ? products : [],
    updateStock,
    addNewItem,
    addNewProduct,
    removeProduct,
  };
}
