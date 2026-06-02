export type DiscountStatus = "Active" | "Expired" | "Disabled";
export type DiscountType = "Percentage" | "FixedAmount";

export type Coupon = {
  id: number;
  code: string;
  name: string;
  description: string;
  type: DiscountType;
  value: number;
  minOrderValue?: number;
  maxDiscountAmount?: number;
  usageLimit?: number;
  usedCount: number;
  limitPerCustomer?: number;
  startDate: string | Date;
  endDate: string | Date;
  status: DiscountStatus;
  createdAt: string | Date;
};

export type Voucher = {
  id: number;
  voucherCode: string;
  title: string;
  worthAmount: number;
  isAccumulative: boolean;
  allowPartialPayment: boolean;
  customerId?: number | null;
  isUsed: boolean;
  usedAt?: string | Date | null;
  expiryDate: string | Date;
  status: DiscountStatus;
  createdAt: string | Date;
};
