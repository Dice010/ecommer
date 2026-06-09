"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getFontSize } from "@/lib/fontSize";
import { useCartContext } from "@/Context/Cart/useCartContext";
import { useAuth } from "@/Context/Auth/useAuthContext";
import { mockItems } from "@/lib/mock-data/Product/mockItems";
import { CartItems } from "@/types/Cart";

// Hàm giả lập API (Mock API) để xử lý logic trừ kho khi thanh toán thành công
const mockUpdateInventoryAPI = async (cart: CartItems[]) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      cart.forEach((cartItem) => {
        cartItem.product.ingredients?.forEach((ingredient) => {
          const totalUsed = ingredient.quantity * cartItem.quantity;

          const targetItem = mockItems.find(
            (item) => String(item.id) === String(ingredient.item.id),
          );
          if (targetItem) {
            targetItem.stock = Math.max(0, targetItem.stock - totalUsed);
          }
        });
      });
      resolve("Thanh toán & Cập nhật kho thành công");
    }, 1500);
  });
};

export default function CartPage() {
  const { user } = useAuth();
  const { state, dispatch } = useCartContext();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [couponInput, setCouponInput] = useState(""); // State lưu text nhập mã giảm giá

  const displayName = user
    ? user.role === "Customer"
      ? user.firstName
      : user.fullName
    : "bạn";

  // Hàm xử lý áp dụng mã giảm giá
  const handleApplyDiscount = () => {
    const cleanCode = couponInput.trim().toUpperCase();
    if (!cleanCode) return;

    try {
      // Vì logic validation (kiểm tra tồn tại/đã dùng) nằm trong Reducer/CartUtils,
      // việc bọc dispatch trong try-catch giúp bắt trọn vẹn lỗi đồng bộ được throw ra từ file xử lý của bạn.
      dispatch({ type: "ADD_DISCOUNT", payload: cleanCode });
      setCouponInput(""); // Áp dụng thành công thì xóa rỗng ô nhập
    } catch (error) {
      if (error instanceof Error) {
        alert(`❌ ${error.message}`);
      } else {
        alert("❌ Mã giảm giá không hợp lệ!");
      }
    }
  };

  const handleCheckout = async () => {
    if (state.cart.length === 0) {
      alert("Giỏ hàng của bạn đang trống!");
      return;
    }

    setIsCheckingOut(true);

    try {
      await mockUpdateInventoryAPI(state.cart);
      dispatch({ type: "CHECK_OUT" });

      alert(
        `🎉 THANH TOÁN THÀNH CÔNG!\nCảm ơn ${displayName} đã mua sắm tại Florist Ecom. Đơn hàng của bạn đang được xử lý!`,
      );
    } catch (error) {
      console.error("Lỗi trong quá trình thanh toán:", error);
      alert("Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại!");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <h1
          style={{ fontSize: getFontSize("h2") }}
          className="font-bold text-[#1E2538] mb-8"
        >
          Giỏ Hàng Của Bạn
        </h1>

        {state.cart.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
            <p
              style={{ fontSize: getFontSize("p") }}
              className="text-slate-500 mb-6"
            >
              Bạn chưa có sản phẩm nào trong giỏ hàng.
            </p>
            <Link
              href="/"
              className="inline-block bg-pink-400 text-white font-medium px-8 py-3 rounded-xl hover:bg-pink-500 hover:shadow-md transition-all"
              style={{ fontSize: getFontSize("p") }}
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cột trái: Danh sách mặt hàng */}
            <div className="lg:col-span-2 space-y-4">
              {state.cart.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white p-4 rounded-2xl shadow-sm flex flex-col md:flex-row items-center gap-4 border border-slate-100"
                >
                  <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-[#F4F6F9]">
                    <Image
                      src={item.product.imageUrl || "/images/fallback_img.png"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                      unoptimized
                    />
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <Link href={item.product.productLink || `/`}>
                      <h3
                        style={{ fontSize: getFontSize("p") }}
                        className="font-bold text-[#1E2538] hover:text-pink-500 transition-colors"
                      >
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-pink-500 font-semibold mt-1">
                      {item.product.sellPrice.toLocaleString("vi-VN")}đ
                    </p>
                  </div>

                  <div className="flex items-center gap-3 bg-[#F4F6F9] px-3 py-1.5 rounded-lg border border-slate-200">
                    <button
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_CART",
                          payload: item.product.id,
                        })
                      }
                      className="w-8 h-8 flex items-center justify-center font-bold text-[#1E2538] hover:bg-white rounded-md transition-colors"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-medium text-[#1E2538]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        dispatch({ type: "ADD_CART", payload: item.product.id })
                      }
                      className="w-8 h-8 flex items-center justify-center font-bold text-[#1E2538] hover:bg-white rounded-md transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cột phải: Tổng quan & Khung Coupon */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-fit">
              <h3
                style={{ fontSize: getFontSize("h4") }}
                className="font-bold text-[#1E2538] mb-6 border-b border-slate-100 pb-4"
              >
                Tổng Quan Đơn Hàng
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Số lượng món:</span>
                  <span className="font-medium text-[#1E2538]">
                    {state.count}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Mã giảm giá áp dụng:</span>
                  <span className="font-medium text-[#1E2538]">
                    {state.discount.length} mã
                  </span>
                </div>
              </div>

              {/* BỔ SUNG: Khung nhập mã giảm giá */}
              <div className="mb-6 pt-4 border-t border-slate-100">
                <label
                  style={{ fontSize: getFontSize("sub") }}
                  className="block text-slate-500 font-semibold mb-2"
                >
                  MÃ GIẢM GIÁ (COUPON)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Nhập mã (Ví dụ: WELCOME10)"
                    className="flex-1 px-3 py-2.5 rounded-xl bg-[#F4F6F9] border-none text-[#1E2538] focus:ring-2 focus:ring-pink-300 outline-none transition-all text-sm"
                  />
                  <button
                    onClick={handleApplyDiscount}
                    className="bg-pink-400 text-white px-4 py-2 rounded-xl font-bold hover:bg-pink-500 transition-colors text-sm shadow-sm"
                  >
                    Áp dụng
                  </button>
                </div>

                {/* Danh sách các mã giảm giá đang được áp dụng thực tế */}
                {state.discount.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {state.discount.map((couponObj, idx) => {
                        const code = Object.keys(couponObj)[0];
                        const detail = couponObj[code];
                        return (
                          <div
                            key={idx}
                            className="flex items-center gap-1.5 bg-pink-50 text-pink-600 px-2.5 py-1 rounded-lg border border-pink-100 text-xs font-semibold"
                          >
                            <span>
                              {code} (-{detail.value.toLocaleString()}
                              {detail.type === "Percentage" ? "%" : "đ"})
                            </span>
                            <button
                              onClick={() =>
                                dispatch({
                                  type: "REMOVE_DISCOUNT",
                                  payload: code,
                                })
                              }
                              className="hover:text-pink-800 font-bold ml-1 text-sm transition-colors"
                              title="Hủy áp dụng mã"
                            >
                              ×
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-100 pt-4 mb-8 flex justify-between items-end">
                <span className="text-slate-600">Tổng cộng:</span>
                <span
                  style={{ fontSize: getFontSize("h3") }}
                  className="font-bold text-pink-500"
                >
                  {state.totalPrice.toLocaleString("vi-VN")}đ
                </span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-md ${
                  isCheckingOut
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-[#1E2538] hover:bg-opacity-90 active:scale-[0.98]"
                }`}
                style={{ fontSize: getFontSize("p") }}
              >
                {isCheckingOut ? "ĐANG XỬ LÝ..." : "THANH TOÁN NGAY"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
