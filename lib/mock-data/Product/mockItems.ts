import { itemsDetail } from "@/types/Product";
import { mockCategories } from "./mockCategories"

export const mockItems: itemsDetail[] = [
  {
    id: "item-1",
    name: "Hoa Hồng Đỏ Ecuador",
    description: "Hồng đỏ nhập khẩu, bông to, cánh dày",
    cost: 30000,
    stock: 150,
    category: [mockCategories[2]], // Bông lẻ
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
    itemLink: "/items/hong-do-ecuador"
  },
  {
    id: "item-2",
    name: "Hoa Hồng Kem Tulip",
    description: "Hồng màu kem nhẹ nhàng, thanh lịch",
    cost: 20000,
    stock: 200,
    category: [mockCategories[2]], 
    imageUrl: "https://images.unsplash.com/photo-1533616688419-b7a585564566",
    itemLink: "/items/hong-kem"
  },
  {
    id: "item-3",
    name: "Hoa Hướng Dương",
    description: "Hướng dương size lớn, màu vàng rực rỡ",
    cost: 25000,
    stock: 100,
    category: [mockCategories[2]],
    imageUrl: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651",
    itemLink: "/items/huong-duong"
  },
  {
    id: "item-4",
    name: "Hoa Baby Trắng",
    description: "Hoa baby Hà Lan nhập khẩu, nhánh đều",
    cost: 15000,
    stock: 80,
    category: [mockCategories[2]],
    imageUrl: "https://images.unsplash.com/photo-1550950158-d0d960dff51b",
    itemLink: "/items/baby-trang"
  },
  {
    id: "item-5",
    name: "Hoa Cẩm Tú Cầu Xanh",
    description: "Cẩm tú cầu Đà Lạt nguyên cành lớn",
    cost: 45000,
    stock: 50,
    category: [mockCategories[2]],
    imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d",
    itemLink: "/items/cam-tu-cau"
  },
  {
    id: "item-6",
    name: "Hoa Tulip Hồng",
    description: "Tulip nhập khẩu Hà Lan giữ tươi lâu",
    cost: 35000,
    stock: 90,
    category: [mockCategories[2]],
    imageUrl: "https://images.unsplash.com/photo-1520763185298-1b434c919102",
    itemLink: "/items/tulip-hong"
  },
  {
    id: "item-7",
    name: "Lá Bạc (Eucalyptus)",
    description: "Lá phụ trang trí, mùi thơm dễ chịu",
    cost: 5000,
    stock: 300,
    category: [],
    imageUrl: "https://images.unsplash.com/photo-1545241047-6083a3684587",
    itemLink: "/items/la-bac"
  },
  {
    id: "item-8",
    name: "Giấy gói Hàn Quốc cao cấp",
    description: "Giấy gói chống thấm nước nhiều màu",
    cost: 8000,
    stock: 500,
    category: [],
    imageUrl: "",
    itemLink: "/items/giay-goi"
  },
  {
    id: "item-9",
    name: "Nơ Ruy-băng lụa",
    description: "Ruy băng thắt nơ tạo điểm nhấn cho bó hoa",
    cost: 3000,
    stock: 600,
    category: [],
    imageUrl: "",
    itemLink: "/items/no-ruy-bang"
  },
  {
    id: "item-10",
    name: "Giỏ tre đan tay",
    description: "Giỏ tre dùng làm lẵng hoa cắm sẵn",
    cost: 25000,
    stock: 40,
    category: [],
    imageUrl: "",
    itemLink: "/items/gio-tre"
  }
];