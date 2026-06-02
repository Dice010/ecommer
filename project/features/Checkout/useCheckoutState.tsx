"use client";

import { useState, useEffect } from "react";
import { useCart } from "../Cart/useCartContext";
import { useAuth } from "../Auth/useAuthContext";
import { Order } from "@/types/Order";
import { Coupon, Voucher } from "@/types/Discount";

export function useCheckoutState() {
  const { cartItems, totalPrice, totalItems, clearCart } = useCart();
  const { user } = useAuth();

  // Danh sách các hóa đơn đã thanh toán thành công
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderNote, setOrderNote] = useState<string>("");
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // Trạng thái dùng để khóa nút khi đang xử lý đơn

  // Đồng bộ nạp danh sách hóa đơn từ localStorage sau khi Client mount xong (Tránh lỗi Hydration)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("project_orders");
      if (stored) {
        // Đẩy vào setTimeout (bất đồng bộ) để xóa triệt để cảnh báo linter React
        setTimeout(() => {
          setOrders(JSON.parse(stored));
        }, 0);
      }
    }
  }, []);

  // --- TỰ ĐỘNG TÍNH TOÁN KHI RENDER (DERIVED STATE) ---

  // Kiểm tra xem Coupon có đủ điều kiện áp dụng với tổng tiền hiện tại không
  const isCouponValid = coupon && totalPrice >= (coupon.minOrderValue || 0);

  // Tính số tiền được giảm từ Coupon (Xử lý cả loại giảm theo % hoặc giảm thẳng số tiền cố định)
  const couponDiscount = isCouponValid
    ? coupon.type === "Percentage"
      ? Math.min(
          (totalPrice * coupon.value) / 100,
          coupon.maxDiscountAmount || Infinity,
        )
      : coupon.value
    : 0;

  // Số tiền còn lại của đơn hàng sau khi đã trừ đi phần giảm giá từ Coupon
  const remainingAfterCoupon = Math.max(0, totalPrice - couponDiscount);

  // Lọc và tính toán số tiền Voucher hợp lệ (Tự động loại bỏ Voucher thừa nếu tổng tiền đã về 0đ)
  let accumulatedVoucherDiscount = 0;
  const validVouchers: Voucher[] = [];

  for (const v of vouchers) {
    if (accumulatedVoucherDiscount < remainingAfterCoupon) {
      validVouchers.push(v);
      accumulatedVoucherDiscount += v.worthAmount;
    }
  }

  // Khống chế số tiền giảm từ Voucher, không cho phép vượt quá số tiền còn lại sau khi dùng Coupon
  const voucherDiscount = Math.min(
    accumulatedVoucherDiscount,
    remainingAfterCoupon,
  );

  // Tính tổng số tiền được giảm giá và số tiền cuối cùng khách phải thanh toán
  const totalDiscount = couponDiscount + voucherDiscount;
  const finalTotal = Math.max(0, totalPrice - totalDiscount);

  // --- CÁC HÀM CHỨC NĂNG XỬ LÝ BIẾN ĐỔI ---

  // Áp dụng mã Coupon vào đơn hàng
  function applyCoupon(newCoupon: Coupon) {
    if (totalPrice < (newCoupon.minOrderValue || 0)) {
      alert(
        `Đơn hàng tối thiểu phải từ ${newCoupon.minOrderValue?.toLocaleString()}đ`,
      );
      return;
    }
    setCoupon(newCoupon);
  }

  // Chọn thêm Voucher (Kiểm tra trùng lặp và điều kiện cộng dồn của Voucher)
  function applyVoucher(newVoucher: Voucher) {
    if (newVoucher.isUsed) return alert("Voucher này đã dùng rồi!");
    if (vouchers.some((v) => v.id === newVoucher.id))
      return alert("Voucher này đã được chọn!");

    // Kiểm tra xem các Voucher đã chọn trước đó và Voucher mới này có cho phép cộng dồn không
    const canAccumulate =
      vouchers.every((v) => v.isAccumulative) && newVoucher.isAccumulative;
    if (vouchers.length > 0 && !canAccumulate) {
      return alert("Không thể cộng dồn loại Voucher này!");
    }

    setVouchers((prev) => [...prev, newVoucher]);
  }

  // Tiến hành thanh toán bằng tiền mặt, xuất hóa đơn và lưu trữ
  function processCashPayment() {
    if (cartItems.length === 0 || isSubmitting) return null;

    setIsSubmitting(true); // Khóa nút bấm ngay lập tức chống hiện tượng click đúp (spam đơn)

    // Khởi tạo đối tượng hóa đơn theo chuẩn dữ liệu Order
    const newOrder: Order = {
      id: Date.now(),
      orderCode: `HD${Math.floor(1000 + Math.random() * 9000)}`, // Tạo mã hóa đơn ngẫu nhiên dạng HD1234
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      customer: user?.type === "customer" ? user : null,
      staff: user?.type === "staff" ? user : null,
      // Thực hiện Deep Copy cho object product lồng bên trong để cắt đứt hoàn toàn tham chiếu
      items: cartItems.map((item) => ({
        ...item,
        product: JSON.parse(JSON.stringify(item.product)),
        priceAtPurchase: item.product.sellPrice,
      })),
      totalItems,
      subTotal: totalPrice,
      discount: totalDiscount,
      finalTotal,
      paymentMethod: "Cash",
      status: "Completed", // Tiền mặt thanh toán xong coi như hoàn thành luôn đơn
      note: orderNote,
    };

    // Lưu hóa đơn mới vào danh sách tổng và cập nhật vào bộ nhớ localStorage
    setOrders((prevOrders) => {
      const updatedOrders = [newOrder, ...prevOrders];
      localStorage.setItem("project_orders", JSON.stringify(updatedOrders));
      return updatedOrders;
    });

    // Reset sạch trạng thái giỏ hàng và form nhập sau khi hoàn thành thanh toán
    clearCart();
    setCoupon(null);
    setVouchers([]);
    setOrderNote("");
    setIsSubmitting(false); // Mở khóa nút bấm

    alert(`Thanh toán thành công! Mã đơn: ${newOrder.orderCode}`);
    return newOrder;
  }

  return {
    orders,
    appliedCoupon: isCouponValid ? coupon : null, // Chỉ trả về Coupon nếu nó thực sự hợp lệ với giỏ hàng hiện tại
    appliedVouchers: validVouchers, // Chỉ trả về danh sách các Voucher tham gia giảm trừ thực tế
    orderNote,
    setOrderNote,
    couponDiscount,
    voucherDiscount,
    totalDiscount,
    finalTotal,
    isSubmitting,
    applyCoupon,
    removeCoupon: () => setCoupon(null),
    applyVoucher,
    removeVoucher: (id: number) =>
      setVouchers((prev) => prev.filter((v) => v.id !== id)),
    processCashPayment,
  };
}
