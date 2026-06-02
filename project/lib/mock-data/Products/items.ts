import { items } from "@/types/Product";
import { mockCategories } from "./category";

export const mockItems: items[] = [
  {
    id: 101,
    name: "Hoa Hồng Đỏ Đô",
    description: "Hoa hồng đỏ nhập khẩu, cánh dày",
    cost: 15000,
    stock: 200,
    category: [mockCategories[0]],
    imageUrl: "hong-do.jpg",
    isActive: true,
    itemLink: "/item/hong-do", // sửa lại Link sao cho phù hợp với thực tế
  },
  {
    id: 102,
    name: "Hoa Hướng Dương",
    description: "Hướng dương Đà Lạt đóa to",
    cost: 20000,
    stock: 150,
    category: [mockCategories[0]],
    imageUrl: "huong-duong.jpg",
    isActive: true,
    itemLink: "/item/huong-duong", // sửa lại Link sao cho phù hợp với thực tế
  },
  {
    id: 103,
    name: "Hoa Tulip Trắng",
    description: "Tulip Hà Lan thanh lịch",
    cost: 35000,
    stock: 100,
    category: [mockCategories[0]],
    imageUrl: "tulip-trang.jpg",
    isActive: true,
    itemLink: "/item/tulip-trang", // sửa lại Link sao cho phù hợp với thực tế
  },
  {
    id: 104,
    name: "Hoa Cẩm Tú Cầu",
    description: "Cẩm tú cầu đổi màu size lớn",
    cost: 40000,
    stock: 80,
    category: [mockCategories[0]],
    imageUrl: "cam-tu-cau.jpg",
    isActive: true,
    itemLink: "/item/cam-tu-cau", // sửa lại Link sao cho phù hợp với thực tế
  },
  {
    id: 105,
    name: "Hoa Baby Trắng",
    description: "Cành hoa baby phun sương làm nền",
    cost: 10000,
    stock: 300,
    category: [mockCategories[0]],
    imageUrl: "baby-trang.jpg",
    isActive: true,
    itemLink: "/item/baby-trang", // sửa lại Link sao cho phù hợp với thực tế
  },
  {
    id: 106,
    name: "Lá Bạc Trang Trí",
    description: "Lá táo phụ kiện cắm hoa",
    cost: 5000,
    stock: 500,
    category: [],
    imageUrl: "la-bac.jpg",
    isActive: true,
    itemLink: "/item/la-bac", // sửa lại Link sao cho phù hợp với thực tế
  },
  {
    id: 107,
    name: "Giấy Gói Cao Cấp",
    description: "Giấy gói chống thấm Hàn Quốc",
    cost: 8000,
    stock: 1000,
    category: [],
    imageUrl: "giay-goi.jpg",
    isActive: true,
    itemLink: "/item/giay-goi", // sửa lại Link sao cho phù hợp với thực tế
  },
];
