"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link"; // 1. Import Link
import { getFontSize } from "@/lib/fontSize";
import { ProductDetail } from "@/types/Product";
import { useAuth } from "@/Context/Auth/useAuthContext";

interface ProductCardProps {
  product: ProductDetail;
  cartItem?: { quantity: number };
  onAddToCart: (id: string) => void;
  onRemoveFromCart: (id: string) => void;
}

export default function ProductCard({
  product,
  cartItem,
  onAddToCart,
  onRemoveFromCart,
}: ProductCardProps) {
  const { user } = useAuth();
  const role = user?.role ?? "Customer";

  const isExistInCart = !!cartItem;
  const [imgSrc, setImgSrc] = useState(
    product.imageUrl && product.imageUrl.startsWith("/")
      ? product.imageUrl
      : "/images/fallback_img.png",
  );

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
      {/* 2. Bọc phần nội dung trong Link để điều hướng */}
      <Link href={`/${product.id}`} className="block">
        {/* Hình ảnh */}
        <div className="relative aspect-square w-full bg-gray-50 overflow-hidden">
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, 25vw"
            className="object-cover"
            onError={() => setImgSrc("/images/fallback.png")}
          />
        </div>

        {/* Thông tin */}
        <div className="p-4">
          <h3
            style={{ fontSize: getFontSize("h5") }}
            className="font-semibold text-[#1E2538] line-clamp-2 min-h-[3rem]"
          >
            {product.name}
          </h3>
          <p
            style={{ fontSize: getFontSize("h6") }}
            className="mt-2 font-bold text-[#1E2538]"
          >
            {product.sellPrice.toLocaleString("vi-VN")}đ
          </p>
        </div>
      </Link>

      {/* Tương tác Role-based (Đặt ngoài thẻ Link để tránh xung đột sự kiện click) */}
      <div className="p-4 pt-0">
        {role === "Admin" || role === "Staff" ? (
          <div className="w-full text-center py-2.5 bg-gray-100 text-gray-500 rounded-xl font-medium border border-dashed border-gray-200 select-none">
            <span style={{ fontSize: getFontSize("sub") }}>
              Chỉ xem trước ({role})
            </span>
          </div>
        ) : (
          <div>
            {!isExistInCart ? (
              <button
                onClick={(e) => {
                  e.preventDefault(); // Đảm bảo không nhảy link
                  onAddToCart(product.id);
                }}
                className="w-full bg-[#1E2538] text-white py-2.5 rounded-xl font-medium hover:bg-opacity-90 cursor-pointer hover:scale-105 active:scale-[0.98] transition-all"
                style={{ fontSize: getFontSize("p") }}
              >
                Thêm vào giỏ
              </button>
            ) : (
              <div 
                className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-1"
                onClick={(e) => e.preventDefault()} // Chặn click lan ra Link cha
              >
                <button
                  onClick={() => onRemoveFromCart(product.id)}
                  className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center font-bold text-[#1E2538] hover:bg-gray-100 active:scale-95 transition-all"
                >
                  －
                </button>
                <span
                  style={{ fontSize: getFontSize("p") }}
                  className="font-bold text-[#1E2538]"
                >
                  {cartItem?.quantity || 0}
                </span>
                <button
                  onClick={() => onAddToCart(product.id)}
                  className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center font-bold text-[#1E2538] hover:bg-gray-100 active:scale-95 transition-all"
                >
                  ＋
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}