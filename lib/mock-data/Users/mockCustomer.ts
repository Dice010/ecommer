import { Customer } from "@/types/Users";
import { mockProducts } from "../Product/mockProduct";

export const mockCustomers: Customer[] = [
  {
    id: "u-cust-1",
    phone: "0381112222",
    email: "khachhang.minh@gmail.com",
    address: "11 Hoàng Hoa Thám, Quận Bình Thạnh, TP.HCM",
    password: "hashed_customer_1",
    role: "Customer",
    lastName: "Nguyễn Hoàng",
    firstName: "Minh",
    cart: [
      { product: mockProducts[0], quantity: 1 }, // Bó Hồng Đỏ Ecuador Classic
      { product: mockProducts[5], quantity: 2 }  // Cành Lẻ Hồng Đỏ Ecuador
    ]
  },
  {
    id: "u-cust-2",
    phone: "0383334444",
    email: "lan.tran@yahoo.com",
    address: "88 Trần Hưng Đạo, Quận 5, TP.HCM",
    password: "hashed_customer_2",
    role: "Customer",
    lastName: "Trần Ngọc",
    firstName: "Lan",
    cart: [
      { product: mockProducts[1], quantity: 1 }  // Bó Tình Yêu Thuần Khiết
    ]
  },
  {
    id: "u-cust-3",
    phone: "0385556666",
    email: "khoa.pham@hotmail.com",
    address: "55 Nguyễn Trãi, Quận 5, TP.HCM",
    password: "hashed_customer_3",
    role: "Customer",
    lastName: "Phạm Đăng",
    firstName: "Khoa",
    cart: [] // Giỏ hàng trống
  },
  {
    id: "u-cust-4",
    phone: "0387778888",
    email: "huong.le@gmail.com",
    address: "321 Phan Xích Long, Quận Phú Nhuận, TP.HCM",
    password: "hashed_customer_4",
    role: "Customer",
    lastName: "Lê Thị",
    firstName: "Hương",
    cart: [
      { product: mockProducts[2], quantity: 2 }, // 2 Bó Hướng Dương
      { product: mockProducts[3], quantity: 1 }  // 1 Giỏ Hoa Khai Trương
    ]
  },
  {
    id: "u-cust-5",
    phone: "0389990000",
    email: "tuantu@gmail.com",
    address: "74 Nguyễn Văn Cừ, Quận 5, TP.HCM",
    password: "hashed_customer_5",
    role: "Customer",
    lastName: "Ngô Anh",
    firstName: "Tuấn",
    cart: [
      { product: mockProducts[4], quantity: 1 }  // Bó Tulip Hồng
    ]
  }
];