"use client";

import React, { useState } from "react";
import { getFontSize } from "@/lib/fontSize";
import { ProductDetail, itemsDetail } from "@/types/Product";
// IMPORT DỮ LIỆU DANH MỤC CÓ SẴN
import { mockCategories } from "@/lib/mock-data/Product/mockCategories";

export type WarehouseFormData = Partial<ProductDetail> & Partial<itemsDetail>;

interface WarehouseFormModalProps {
  isOpen: boolean;
  type: "products" | "items";
  editingData: WarehouseFormData | null;
  onClose: () => void;
  onSubmit: (data: WarehouseFormData) => void;
}

export default function WarehouseFormModal({
  isOpen,
  type,
  editingData,
  onClose,
  onSubmit,
}: WarehouseFormModalProps) {
  const [formData, setFormData] = useState<WarehouseFormData>({});

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const [prevEditingData, setPrevEditingData] =
    useState<WarehouseFormData | null>(null);

  if (isOpen !== prevIsOpen || editingData !== prevEditingData) {
    setPrevIsOpen(isOpen);
    setPrevEditingData(editingData);

    if (isOpen) {
      if (editingData) {
        setFormData(editingData);
      } else {
        setFormData({
          name: "",
          description: "",
          imageUrl: "",
          sellPrice: type === "products" ? 0 : undefined,
          cost: type === "items" ? 0 : undefined,
          stock: 0,
          category: [],
          ingredients: [], // Tạm thời rỗng cho thành phẩm mới
          productLink: "",
          itemLink: "",
        });
      }
    }
  }

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative border border-slate-200"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-slate-100 text-[#1E2538] rounded-full hover:bg-pink-100"
        >
          ✕
        </button>

        <h2
          style={{ fontSize: getFontSize("h3") }}
          className="font-bold text-[#1E2538] mb-6"
        >
          {editingData ? "Cập nhật" : "Thêm mới"}{" "}
          {type === "products" ? "Thành phẩm" : "Nguyên vật liệu"}
        </h2>

        <div className="space-y-4 text-[#1E2538]">
          <div>
            <label className="block text-sm font-semibold mb-1">Tên gọi</label>
            <input
              required
              type="text"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#F4F6F9] border-none focus:ring-2 focus:ring-pink-300 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Mô tả ngắn
            </label>
            <textarea
              rows={3}
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#F4F6F9] border-none focus:ring-2 focus:ring-pink-300 outline-none text-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                {type === "products" ? "Giá bán lẻ (đ)" : "Giá nhập gốc (đ)"}
              </label>
              <input
                required
                type="number"
                value={
                  type === "products"
                    ? formData.sellPrice || 0
                    : formData.cost || 0
                }
                onChange={(e) =>
                  setFormData(
                    type === "products"
                      ? { ...formData, sellPrice: Number(e.target.value) }
                      : { ...formData, cost: Number(e.target.value) },
                  )
                }
                className="w-full px-4 py-2.5 rounded-xl bg-[#F4F6F9] border-none focus:ring-2 focus:ring-pink-300 outline-none text-sm"
              />
            </div>

            {type === "items" && (
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Số lượng tồn
                </label>
                <input
                  required
                  type="number"
                  value={formData.stock || 0}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: Number(e.target.value) })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F4F6F9] border-none focus:ring-2 focus:ring-pink-300 outline-none text-sm"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Đường dẫn hình ảnh (URL)
            </label>
            <input
              type="text"
              value={formData.imageUrl || ""}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-[#F4F6F9] border-none focus:ring-2 focus:ring-pink-300 outline-none text-sm"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          {/* CHỌN DANH MỤC PHÂN LOẠI (CATEGORIES) MỚI ĐƯỢC THÊM VÀO */}
          <div className="pt-2">
            <label className="block text-sm font-semibold mb-2">
              Danh mục phân loại (Categories)
            </label>
            <div className="flex flex-wrap gap-2">
              {mockCategories.map((cat) => {
                const isSelected = formData.category?.some(
                  (c) => c.id === cat.id,
                );
                return (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => {
                      const current = formData.category || [];
                      if (isSelected) {
                        setFormData({
                          ...formData,
                          category: current.filter((c) => c.id !== cat.id),
                        });
                      } else {
                        setFormData({
                          ...formData,
                          category: [...current, cat],
                        });
                      }
                    }}
                    className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all border ${
                      isSelected
                        ? "bg-pink-100 border-pink-400 text-pink-700 shadow-sm"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-8 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-slate-100 text-slate-700 py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-200"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            className="flex-1 bg-pink-500 text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-pink-600 transition-colors shadow-sm"
          >
            Lưu thông tin
          </button>
        </div>
      </form>
    </div>
  );
}
