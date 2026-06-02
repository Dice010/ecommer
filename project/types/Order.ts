import { Product } from "./Product";
import { Customer, Staff } from "./Users";
import { Voucher, Coupon } from "./Discount";

export type OrderItem = {
  product: Product;
  quantity: number;
  priceAtPurchase: number;
};

export type OrderStatus = "Pending" | "Completed" | "Cancelled";

export type Order = {
  id: number;
  orderCode: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  customer: Customer | null;
  staff: Staff | null;
  items: OrderItem[];
  totalItems: number;
  subTotal: number;
  discount: number;
  finalTotal: number;
  paymentMethod: "Cash";
  status: OrderStatus;
  note?: string;
  couponApplied?: Coupon | null;
  vouchersUsed?: Voucher[];
};
