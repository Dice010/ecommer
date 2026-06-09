"use client";

import React, { useState } from "react";
import Image from "next/image";
import { getFontSize } from "@/lib/fontSize";
import { ProductDetail } from "@/types/Product";

interface ProductDetailModalProps {
  product: ProductDetail | null;
  onClose: () => void;
  onEdit: (product: ProductDetail) => void;
  onDelete: (id: string) => void;
  role: string;
}

export default function ProductDetailModal({
  product,
  onClose,
  onEdit,
  onDelete,
  role,
}: ProductDetailModalProps) {
  const [isBroken, setIsBroken] = useState(false);

  if (!product) return null;

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
                isBroken || !product.imageUrl
                  ? "/images/fallback_img.png"
                  : product.imageUrl
              }
              alt={product.name}
              fill
              className="object-cover"
              onError={() => setIsBroken(true)}
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div>
              <span className="text-pink-500 font-bold text-sm mb-2 block">
                {product.id}
              </span>
              <h2
                style={{ fontSize: getFontSize("h2") }}
                className="font-bold text-[#1E2538] mb-2"
              >
                {product.name}
              </h2>
              <p
                style={{ fontSize: getFontSize("p") }}
                className="text-slate-600 mb-4 leading-relaxed"
              >
                {product.description}
              </p>

              <div className="bg-[#F4F6F9] p-4 rounded-xl mb-4">
                <p className="font-semibold text-[#1E2538] mb-2">
                  Giá bán lẻ:{" "}
                  <span className="text-pink-500">
                    {product.sellPrice.toLocaleString()}đ
                  </span>
                </p>
                <p className="font-semibold text-[#1E2538] mb-2">
                  Danh mục: {product.category.map((c) => c.name).join(", ")}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#1E2538] mb-2">
                  Cấu thành nguyên liệu:
                </h4>
                <ul className="space-y-2 max-h-32 overflow-y-auto pr-1">
                  {product.ingredients.map((ing, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between bg-slate-50 p-2 rounded-lg text-sm text-[#1E2538] border border-slate-100"
                    >
                      <span>{ing.item.name}</span>
                      <span className="font-bold text-slate-600">
                        x{ing.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* MANAGEMENT ACTIONS */}
            {role !== "Customer" && (
              <div className="flex gap-3 mt-6 border-t border-slate-100 pt-4">
                <button
                  onClick={() => onEdit(product)}
                  className="flex-1 bg-[#1E2538] text-white py-2.5 rounded-xl font-semibold hover:bg-opacity-90 active:scale-[0.98] transition-all text-sm"
                >
                  Sửa sản phẩm
                </button>
                <button
                  onClick={() => onDelete(product.id)}
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
