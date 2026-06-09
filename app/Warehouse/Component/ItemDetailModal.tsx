"use client";

import React, { useState } from "react";
import Image from "next/image";
import { getFontSize } from "@/lib/fontSize";
import { itemsDetail } from "@/types/Product";

interface ItemDetailModalProps {
  item: itemsDetail | null;
  onClose: () => void;
  onEdit: (item: itemsDetail) => void;
  onDelete: (id: string) => void;
  role: string;
}

export default function ItemDetailModal({
  item,
  onClose,
  onEdit,
  onDelete,
  role,
}: ItemDetailModalProps) {
  const [isBroken, setIsBroken] = useState(false);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative border border-slate-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-slate-100 text-[#1E2538] rounded-full hover:bg-pink-100 transition-colors"
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 relative aspect-square rounded-2xl overflow-hidden bg-slate-100">
            <Image
              unoptimized
              src={
                isBroken || !item.imageUrl
                  ? "/images/fallback_img.png"
                  : item.imageUrl
              }
              alt={item.name}
              fill
              className="object-cover"
              onError={() => setIsBroken(true)}
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div className="w-full">
              <span className="text-[#C5A880] font-bold text-sm mb-2 block">
                {item.id}
              </span>
              <h2
                style={{ fontSize: getFontSize("h2") }}
                className="font-bold text-[#1E2538] mb-2"
              >
                {item.name}
              </h2>
              <p
                style={{ fontSize: getFontSize("p") }}
                className="text-slate-600 mb-4 leading-relaxed"
              >
                {item.description}
              </p>

              <div className="bg-[#F4F6F9] p-4 rounded-xl space-y-3">
                <p className="flex justify-between font-semibold text-[#1E2538]">
                  Giá nhập (Cost):{" "}
                  <span className="text-[#C5A880]">
                    {item.cost.toLocaleString()}đ
                  </span>
                </p>
                <p className="flex justify-between font-semibold text-[#1E2538]">
                  Tồn kho (Stock):{" "}
                  <span
                    className={`${item.stock > 20 ? "text-green-600" : "text-red-500"}`}
                  >
                    {item.stock} đơn vị
                  </span>
                </p>
                <p className="flex justify-between font-semibold text-[#1E2538]">
                  Danh mục:{" "}
                  <span className="text-slate-500 font-normal">
                    {item.category.map((c) => c.name).join(", ") ||
                      "Chưa phân loại"}
                  </span>
                </p>
              </div>
            </div>

            {/* MANAGEMENT ACTIONS */}
            {role !== "Customer" && (
              <div className="flex gap-3 mt-6 border-t border-slate-100 pt-4">
                <button
                  onClick={() => onEdit(item)}
                  className="flex-1 bg-[#1E2538] text-white py-2.5 rounded-xl font-semibold hover:bg-opacity-90 active:scale-[0.98] transition-all text-sm"
                >
                  Sửa thông tin gốc
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="px-4 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 active:scale-[0.98] transition-all text-sm border border-red-200"
                >
                  Xóa
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
