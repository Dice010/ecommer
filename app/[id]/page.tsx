"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { mockProducts } from "@/lib/mock-data/Product/mockProduct";
import { getFontSize } from "@/lib/fontSize";
import { useCartContext } from "@/Context/Cart/useCartContext";
import { useAuth } from "@/Context/Auth/useAuthContext";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const { state, dispatch } = useCartContext();

  const product = mockProducts.find((p) => String(p.id) === String(id));
  const userRole = user?.role || "Customer";

  const [imgSrc, setImgSrc] = useState(
    product?.imageUrl && product.imageUrl.startsWith("/")
      ? product.imageUrl
      : "/images/fallback_img.png",
  );

  if (!product) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#F4F6F9]">
        <p
          style={{ fontSize: getFontSize("h3") }}
          className="text-[#1E2538] font-medium"
        >
          Sản phẩm bạn tìm kiếm không tồn tại.
        </p>
      </div>
    );
  }

  const cartItem = state.cart.find(
    (item) => String(item.product.id) === String(product.id),
  );

  const {
    name,
    sellPrice,
    description,
    ingredients,
    imageUrl,
    productLink,
    ...rest
  } = product;

  return (
    <main className="min-h-screen bg-[#F4F6F9] py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm flex flex-col md:flex-row gap-10">
        {/* Khu vực hình ảnh */}
        <div className="relative w-full md:w-1/2 aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
          <Image
            src={imgSrc}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            onError={() => setImgSrc("/images/fallback_img.png")}
          />
        </div>

        {/* Thông tin chi tiết */}
        <div className="flex-1 flex flex-col">
          <h1
            style={{ fontSize: getFontSize("h2") }}
            className="font-bold text-[#1E2538] mb-4"
          >
            {name}
          </h1>

          <p
            style={{ fontSize: getFontSize("h3") }}
            className="text-pink-500 font-bold mb-6"
          >
            {sellPrice.toLocaleString("vi-VN")}đ
          </p>

          <p
            style={{ fontSize: getFontSize("p") }}
            className="text-gray-600 mb-6 leading-relaxed"
          >
            {description}
          </p>

          {/* Hiển thị các thông tin khác từ rest */}
          <div className="mb-8 space-y-2">
            {Object.entries(rest).map(([key, value]) => {
              let displayValue = "";

              if (value && typeof value === "object") {
                if (Array.isArray(value)) {
                  displayValue = value
                    .map((item) => {
                      if (item && typeof item === "object") {
                        const subObj = item as unknown as Record<
                          string,
                          unknown
                        >;

                        if ("name" in subObj && subObj.name !== undefined) {
                          return String(subObj.name);
                        } else if (
                          "label" in subObj &&
                          subObj.label !== undefined
                        ) {
                          return String(subObj.label);
                        } else {
                          return JSON.stringify(item);
                        }
                      }
                      return String(item);
                    })
                    .join(", ");
                } else {
                  const obj = value as unknown as Record<string, unknown>;

                  if ("name" in obj && obj.name !== undefined) {
                    displayValue = String(obj.name);
                  } else if ("label" in obj && obj.label !== undefined) {
                    displayValue = String(obj.label);
                  } else {
                    displayValue = JSON.stringify(value);
                  }
                }
              } else {
                displayValue = String(value);
              }

              return (
                <p
                  key={key}
                  style={{ fontSize: getFontSize("p") }}
                  className="text-gray-700"
                >
                  <span className="font-semibold capitalize">
                    {key === "id" ? "Mã sản phẩm" : key}:{" "}
                  </span>
                  {displayValue}
                </p>
              );
            })}
          </div>

          {/* Logic giỏ hàng */}
          {userRole === "Admin" || userRole === "Staff" ? (
            <div className="mt-auto">
              <span
                style={{ fontSize: getFontSize("sub") }}
                className="inline-block bg-gray-100 text-gray-500 italic px-4 py-3 rounded-xl border border-gray-200"
              >
                Chế độ xem trước: Quyền {userRole} không được phép thao tác giỏ
                hàng.
              </span>
            </div>
          ) : (
            <div className="mt-auto">
              {cartItem ? (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_CART", payload: product.id })
                    }
                    className="w-12 h-12 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center font-bold text-[#1E2538]"
                  >
                    －
                  </button>
                  <span
                    style={{ fontSize: getFontSize("h4") }}
                    className="font-bold text-[#1E2538] w-8 text-center"
                  >
                    {cartItem.quantity}
                  </span>
                  <button
                    onClick={() =>
                      dispatch({ type: "ADD_CART", payload: product.id })
                    }
                    className="w-12 h-12 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center font-bold text-[#1E2538]"
                  >
                    ＋
                  </button>
                </div>
              ) : (
                <button
                  onClick={() =>
                    dispatch({ type: "ADD_CART", payload: product.id })
                  }
                  className="w-full md:w-auto bg-[#1E2538] text-white px-10 py-4 rounded-xl font-medium"
                >
                  Thêm vào giỏ hàng
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
