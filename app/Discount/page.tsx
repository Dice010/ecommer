"use client";
import React, { useState } from "react";
import { useCouponReducer } from "./useDiscountReducer";
import { DiscountType } from "@/types/Discount";
import { getFontSize } from "@/lib/fontSize";

import CouponForm from "./Component/CouponForm";
import CouponTable from "./Component/CouponTable";

export default function DiscountManagementPage() {
  const { DB, dispatch } = useCouponReducer();
  const [error, setError] = useState("");

  // Logic nghiệp vụ Thêm mã giảm giá (An toàn tuyệt đối với linter unknown error)
  const handleCreateCoupon = (
    code: string,
    name: string,
    type: DiscountType,
    value: number,
  ) => {
    const formattedCode = code.trim().toUpperCase();
    try {
      dispatch({
        type: "CREATE_COUPON",
        code: formattedCode,
        newCoupon: { name, type, value },
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Đã xảy ra lỗi không xác định.");
      }
    }
  };

  const handleRemoveCoupon = (couponCode: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa mã ${couponCode}?`)) {
      try {
        dispatch({ type: "REMOVE_COUPON", code: couponCode });
      } catch (err: unknown) {
        if (err instanceof Error) {
          alert(err.message);
        } else {
          alert("Lỗi không xác định khi xóa mã giảm giá.");
        }
      }
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl min-h-screen bg-[#F4F6F9]">
      <h1
        style={{ fontSize: getFontSize("h1") }}
        className="font-bold mb-6 text-[#1E2538] border-b border-gray-200 pb-3"
      >
        Quản Lý Mã Giảm Giá (Coupon)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Render Component Nhập liệu Form */}
        <CouponForm
          onCreate={handleCreateCoupon}
          error={error}
          setError={setError}
        />

        {/* Render Component Bảng dữ liệu */}
        <div className="lg:col-span-2">
          <CouponTable coupons={DB} onRemove={handleRemoveCoupon} />
        </div>
      </div>
    </div>
  );
}
