export type DiscountType = "Percentage" | "FixedAmount";
export type Code = string;


export type DetailCoupon = {
  id: string;
  name: string;
  type: DiscountType;
  value: number;
};


export type Coupon = Record<Code, DetailCoupon>;