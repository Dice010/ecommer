import { Coupon, DetailCoupon } from "@/types/Discount";

const couponDetails: DetailCoupon[] = [
  {
    id: "coup-01",
    name: "Chào mừng thành viên mới",
    type: "Percentage",
    value: 10, // Giảm 10%
  },
  {
    id: "coup-02",
    name: "Tri ân khách hàng thân thiết",
    type: "FixedAmount",
    value: 50000, // Giảm 50.000đ
  },
  {
    id: "coup-03",
    name: "Siêu sale ngày lễ tình nhân 14/2",
    type: "Percentage",
    value: 20, // Giảm 20%
  },
  {
    id: "coup-04",
    name: "Khuyến mãi mùa hè rực rỡ",
    type: "FixedAmount",
    value: 30000, // Giảm 30.000đ
  },
  {
    id: "coup-05",
    name: "Mã giảm giá đã hết hạn hoặc tạm dừng",
    type: "Percentage",
    value: 15,
  },
];

export const mockCoupons: Coupon = {
  WELCOME10: couponDetails[0],
  LOVECARD50: couponDetails[1],
  VALENTINE20: couponDetails[2],
  SUMMER30: couponDetails[3],
  EXPIRED15: couponDetails[4],
};
