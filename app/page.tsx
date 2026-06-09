"use client";

import React from "react";
import { mockProducts } from "@/lib/mock-data/Product/mockProduct";
import { useAuth } from "@/Context/Auth/useAuthContext";
import { useCartContext } from "@/Context/Cart/useCartContext";
import { getFontSize } from "@/lib/fontSize";
import ProductCard from "@/app/Component_Store/ProductCard";

export default function StorePage() {
  const { user } = useAuth();
  const { state, dispatch } = useCartContext();

  // Xác định vai trò của tài khoản hiện tại, mặc định nếu chưa đăng nhập là Customer
  const userRole = user ? user.role : "Customer";

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-[#1E2538] py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Tiêu đề Trang Cửa Hàng */}
        <header className="mb-10 text-center">
          <h1
            style={{ fontSize: getFontSize("h1") }}
            className="font-bold tracking-tight text-[#1E2538] mb-2"
          >
            Cửa Hàng Hoa Florist Ecom
          </h1>
          <p
            style={{ fontSize: getFontSize("p") }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Khám phá bộ sưu tập hoa tươi cao cấp với dải màu sắc tinh tế và
            thiết kế hiện đại.
          </p>

          {/* Badge hiển thị Role để kiểm tra giao diện trực quan */}
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span
              style={{ fontSize: getFontSize("sub") }}
              className="font-medium text-gray-500"
            >
              Chế độ xem: <strong className="text-[#1E2538]">{userRole}</strong>
            </span>
          </div>
        </header>

        {/* Danh sách sản phẩm được map và đẩy dữ liệu vào Component con */}
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockProducts.map((product) => {
            // Tìm kiếm sản phẩm xem đã tồn tại trong giỏ hàng hiện tại chưa
            const cartItem = state.cart.find(
              (item) => item.product.id === product.id,
            );

            return (
              <ProductCard
                key={product.id}
                product={product}
                cartItem={cartItem}
                onAddToCart={(id: string) =>
                  dispatch({ type: "ADD_CART", payload: id })
                }
                onRemoveFromCart={(id: string) =>
                  dispatch({ type: "REMOVE_CART", payload: id })
                }
              />
            );
          })}
        </main>
      </div>
    </div>
  );
}
