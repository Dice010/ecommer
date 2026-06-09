"use client";
import React, { useState } from "react";
import { DiscountType } from "@/types/Discount";
import { getFontSize } from "@/lib/fontSize";

interface CouponFormProps {
  onCreate: (
    code: string,
    name: string,
    type: DiscountType,
    value: number,
  ) => void;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

export default function CouponForm({
  onCreate,
  error,
  setError,
}: CouponFormProps) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState<DiscountType>("Percentage");
  const [value, setValue] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!code.trim() || !name.trim() || value <= 0) {
      setError("Vui lòng điền đầy đủ thông tin hợp lệ.");
      return;
    }

    // Gửi dữ liệu ngược lên component cha giải quyết logic Reducer
    onCreate(code, name, type, value);

    // Reset form sau khi trigger thành công
    setCode("");
    setName("");
    setValue(0);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
      <h2
        style={{ fontSize: getFontSize("h3") }}
        className="font-semibold mb-4 text-[#1E2538]"
      >
        Tạo Coupon Mới
      </h2>

      {error && (
        <div
          style={{ fontSize: getFontSize("sub") }}
          className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg font-medium"
        >
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            style={{ fontSize: getFontSize("sub") }}
            className="block font-medium text-gray-600 mb-1"
          >
            Mã Code (Ví dụ: SUMMER50)
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{ fontSize: getFontSize("p") }}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[#1E2538] focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
            placeholder="NHAPMACODE"
            required
          />
        </div>

        <div>
          <label
            style={{ fontSize: getFontSize("sub") }}
            className="block font-medium text-gray-600 mb-1"
          >
            Tên chương trình
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ fontSize: getFontSize("p") }}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[#1E2538] focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ví dụ: Tri ân khách hàng"
            required
          />
        </div>

        <div>
          <label
            style={{ fontSize: getFontSize("sub") }}
            className="block font-medium text-gray-600 mb-1"
          >
            Loại giảm giá
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as DiscountType)}
            style={{ fontSize: getFontSize("p") }}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[#1E2538] focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="Percentage">Phần trăm (%)</option>
            <option value="FixedAmount">Số tiền cố định (đ)</option>
          </select>
        </div>

        <div>
          <label
            style={{ fontSize: getFontSize("sub") }}
            className="block font-medium text-gray-600 mb-1"
          >
            Giá trị giảm {type === "Percentage" ? "(%)" : "(VND)"}
          </label>
          <input
            type="number"
            value={value || ""}
            onChange={(e) => setValue(Number(e.target.value))}
            min="1"
            style={{ fontSize: getFontSize("p") }}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[#1E2538] focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={type === "Percentage" ? "Ví dụ: 15" : "Ví dụ: 50000"}
            required
          />
        </div>

        <button
          type="submit"
          style={{ fontSize: getFontSize("p") }}
          className="w-full bg-[#1E2538] hover:bg-opacity-95 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm cursor-pointer"
        >
          + Tạo Mã Giảm Giá
        </button>
      </form>
    </div>
  );
}
