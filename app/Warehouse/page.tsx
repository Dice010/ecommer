"use client";

import React, { useState } from "react";
import Image from "next/image";
import { getFontSize } from "@/lib/fontSize";
import { useAuth } from "@/Context/Auth/useAuthContext"; // Đã sửa tên import chuẩn xác
import { useProductReducer, useItemReducer } from "./useWarehouseReducer";
import { ProductDetail, itemsDetail } from "@/types/Product";

// IMPORT COMPONENTS
import ProductDetailModal from "./Component/ProductDetailModal";
import ItemDetailModal from "./Component/ItemDetailModal";
import WarehouseFormModal, {
  WarehouseFormData,
} from "./Component/WarehouseFormModal"; // Import thêm Type

export default function WarehousePage() {
  // 1. GỌI HOOK TRỰC TIẾP (Sửa lỗi Rules of Hooks và cấm require)
  const { user } = useAuth();
  const role = user?.role || "Customer";

  // Kết nối Reducers và Dispatch
  const { DB: products, dispatch: dispatchProducts } = useProductReducer();
  const { DB: items, dispatch: dispatchItems } = useItemReducer();

  // States quản lý trạng thái
  const [activeTab, setActiveTab] = useState<"products" | "items">("products");
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(
    null,
  );
  const [selectedItem, setSelectedItem] = useState<itemsDetail | null>(null);
  const [brokenCards, setBrokenCards] = useState<Record<string, boolean>>({});

  // 2. KHAI BÁO STATE KHÔNG DÙNG ANY (Sửa lỗi dòng 31)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingData, setEditingData] = useState<WarehouseFormData | null>(
    null,
  );

  if (role === "Customer") {
    return (
      <div className="min-h-screen bg-[#F4F6F9] p-8 flex flex-col items-center justify-center">
        <h2
          style={{ fontSize: getFontSize("h2") }}
          className="text-red-500 font-bold mb-4"
        >
          Từ chối truy cập
        </h2>
        <p style={{ fontSize: getFontSize("p") }} className="text-[#1E2538]">
          Bạn không có quyền truy cập vào trang Quản lý Kho.
        </p>
      </div>
    );
  }

  // --- HÀM XỬ LÝ CRUD TRỰC TIẾP ---
  const handleOpenCreateForm = () => {
    setEditingData(null);
    setIsFormOpen(true);
  };

  // 3. ĐỊNH NGHĨA TYPE RÕ RÀNG CHO DATA (Sửa lỗi dòng 52)
  const handleOpenEditForm = (data: ProductDetail | itemsDetail) => {
    setEditingData(data as WarehouseFormData);
    setSelectedProduct(null);
    setSelectedItem(null);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string, type: "products" | "items") => {
    if (confirm(`Bạn có chắc chắn muốn xóa mã kho này không?`)) {
      if (type === "products") {
        dispatchProducts({ type: "REMOVE_PRODUCT", id });
        setSelectedProduct(null);
      } else {
        dispatchItems({ type: "REMOVE_ITEM", id });
        setSelectedItem(null);
      }
    }
  };

  // 4. SỬ DỤNG TYPE WarehouseFormData ĐỂ NHẬN DATA TỪ FORM (Sửa lỗi dòng 71)
  const handleFormSubmit = (data: WarehouseFormData) => {
    if (activeTab === "products") {
      const productPayload = data as Omit<ProductDetail, "id">;
      if (editingData && editingData.id) {
        dispatchProducts({
          type: "UPDATE_PRODUCT",
          oldId: editingData.id,
          newProduct: productPayload,
        });
      } else {
        dispatchProducts({
          type: "CREATE_PRODUCT",
          newProduct: {
            ...productPayload,
            category: productPayload.category || [],
          },
        });
      }
    } else {
      const itemPayload = data as Omit<itemsDetail, "id">;
      if (editingData && editingData.id) {
        dispatchItems({
          type: "UPDATE_ITEM",
          oldId: editingData.id,
          newItem: itemPayload,
        });
      } else {
        dispatchItems({
          type: "CREATE_ITEM",
          newItem: { ...itemPayload, category: itemPayload.category || [] },
        });
      }
    }
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] p-4 md:p-8">
      {/* HEADER + ACTION BUTTON */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1
            style={{ fontSize: getFontSize("h1") }}
            className="font-bold text-[#1E2538]"
          >
            Hệ Thống Quản Lý Kho
          </h1>
          <p
            style={{ fontSize: getFontSize("sub") }}
            className="text-slate-500 mt-1"
          >
            {role === "Admin"
              ? "Toàn quyền quản trị kho hàng."
              : "Nhân viên kiểm kho."}
          </p>
        </div>
        <button
          onClick={handleOpenCreateForm}
          className="bg-pink-500 text-white px-5 py-3 rounded-2xl font-bold shadow-md hover:bg-pink-600 transition-colors active:scale-[0.98] text-sm self-start sm:self-auto"
        >
          + Thêm{" "}
          {activeTab === "products" ? "thành phẩm mới" : "nguyên vật liệu"}
        </button>
      </div>

      {/* TABS CHUYỂN ĐỔI */}
      <div className="flex gap-4 mb-6 border-b border-slate-300 pb-2">
        <button
          onClick={() => setActiveTab("products")}
          style={{ fontSize: getFontSize("p") }}
          className={`font-semibold px-4 py-2 rounded-t-lg transition-all ${
            activeTab === "products"
              ? "text-pink-500 border-b-2 border-pink-500"
              : "text-slate-500 hover:text-[#1E2538]"
          }`}
        >
          Thành phẩm (Products)
        </button>
        <button
          onClick={() => setActiveTab("items")}
          style={{ fontSize: getFontSize("p") }}
          className={`font-semibold px-4 py-2 rounded-t-lg transition-all ${
            activeTab === "items"
              ? "text-pink-500 border-b-2 border-pink-500"
              : "text-slate-500 hover:text-[#1E2538]"
          }`}
        >
          Nguyên vật liệu (Items)
        </button>
      </div>

      {/* DANH SÁCH LƯỚI (GRID) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {activeTab === "products" &&
          products.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-pink-200"
            >
              <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4 bg-slate-100">
                <Image
                  unoptimized
                  src={
                    brokenCards[product.id] || !product.imageUrl
                      ? "/images/fallback_img.png"
                      : product.imageUrl
                  }
                  alt={product.name}
                  fill
                  className="object-cover"
                  onError={() =>
                    setBrokenCards((prev) => ({ ...prev, [product.id]: true }))
                  }
                />
              </div>
              <h3
                style={{ fontSize: getFontSize("p") }}
                className="font-bold text-[#1E2538] truncate"
              >
                {product.name}
              </h3>
              <p
                style={{ fontSize: getFontSize("sub") }}
                className="text-slate-500 mt-1"
              >
                Giá bán: {product.sellPrice.toLocaleString()}đ
              </p>
            </div>
          ))}

        {activeTab === "items" &&
          items.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-caramel-cool"
            >
              <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4 bg-slate-100">
                <Image
                  unoptimized
                  src={
                    brokenCards[item.id] || !item.imageUrl
                      ? "/images/fallback_img.png"
                      : item.imageUrl
                  }
                  alt={item.name}
                  fill
                  className="object-cover"
                  onError={() =>
                    setBrokenCards((prev) => ({ ...prev, [item.id]: true }))
                  }
                />
              </div>
              <h3
                style={{ fontSize: getFontSize("p") }}
                className="font-bold text-[#1E2538] truncate"
              >
                {item.name}
              </h3>
              <div className="flex justify-between items-center mt-1">
                <p
                  style={{ fontSize: getFontSize("sub") }}
                  className="text-slate-500"
                >
                  Giá nhập: {item.cost.toLocaleString()}đ
                </p>
                <span
                  className={`px-2 py-1 rounded-md text-xs font-bold ${item.stock > 20 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                >
                  Kho: {item.stock}
                </span>
              </div>
            </div>
          ))}
      </div>

      {/* --- NHÚNG TOÀN BỘ MODALS CHI TIẾT & FORM --- */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onEdit={handleOpenEditForm}
        onDelete={(id) => handleDelete(id, "products")}
        role={role}
      />

      <ItemDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onEdit={handleOpenEditForm}
        onDelete={(id) => handleDelete(id, "items")}
        role={role}
      />

      <WarehouseFormModal
        isOpen={isFormOpen}
        type={activeTab}
        editingData={editingData}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
