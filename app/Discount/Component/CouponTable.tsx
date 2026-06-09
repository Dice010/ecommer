"use client";
import React from "react";
import { Coupon } from "@/types/Discount";
import { getFontSize } from "@/lib/fontSize";

interface CouponTableProps {
  coupons: Coupon;
  onRemove: (code: string) => void;
}

export default function CouponTable({ coupons, onRemove }: CouponTableProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2
        style={{ fontSize: getFontSize("h3") }}
        className="font-semibold mb-4 text-[#1E2538]"
      >
        Danh Sách Mã Hiện Có
      </h2>

      {Object.keys(coupons).length === 0 ? (
        <div
          style={{ fontSize: getFontSize("p") }}
          className="text-center py-12 text-gray-400"
        >
          Chưa có mã giảm giá nào trong hệ thống. Hãy tạo mã đầu tiên!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th
                  style={{ fontSize: getFontSize("sub") }}
                  className="p-3 font-semibold text-gray-600"
                >
                  ID
                </th>
                <th
                  style={{ fontSize: getFontSize("sub") }}
                  className="p-3 font-semibold text-gray-600"
                >
                  Mã Code
                </th>
                <th
                  style={{ fontSize: getFontSize("sub") }}
                  className="p-3 font-semibold text-gray-600"
                >
                  Tên Ưu Đãi
                </th>
                <th
                  style={{ fontSize: getFontSize("sub") }}
                  className="p-3 font-semibold text-gray-600"
                >
                  Mức Giảm
                </th>
                <th
                  style={{ fontSize: getFontSize("sub") }}
                  className="p-3 font-semibold text-gray-600 text-center"
                >
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {Object.entries(coupons).map(([couponCode, detail]) => (
                <tr
                  key={couponCode}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td
                    style={{ fontSize: getFontSize("sub") }}
                    className="p-3 font-mono text-gray-500"
                  >
                    {detail.id}
                  </td>
                  <td
                    style={{ fontSize: getFontSize("p") }}
                    className="p-3 font-bold text-blue-600 tracking-wider"
                  >
                    {couponCode}
                  </td>
                  <td
                    style={{ fontSize: getFontSize("p") }}
                    className="p-3 text-gray-700 font-medium"
                  >
                    {detail.name}
                  </td>
                  <td className="p-3">
                    {detail.type === "Percentage" ? (
                      <span
                        style={{ fontSize: getFontSize("sub") }}
                        className="px-2.5 py-1 font-semibold rounded-full bg-green-100 text-green-800"
                      >
                        Giảm {detail.value}%
                      </span>
                    ) : (
                      <span
                        style={{ fontSize: getFontSize("sub") }}
                        className="px-2.5 py-1 font-semibold rounded-full bg-purple-100 text-purple-800"
                      >
                        Giảm {detail.value.toLocaleString("vi-VN")} đ
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => onRemove(couponCode)}
                      style={{ fontSize: getFontSize("p") }}
                      className="text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded transition-colors hover:bg-red-50 cursor-pointer"
                      title="Xóa mã này"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
