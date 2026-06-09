import { ProductDetail } from "@/types/Product";
import { mockCategories } from "./mockCategories"
import { mockItems } from "./mockItems";


export const mockProducts: ProductDetail[] = [
  {
    id: "prod-1",
    name: "Bó Hồng Đỏ Ecuador Classic",
    description: "Bó hoa gồm 9 bông hồng đỏ Ecuador lãng mạn, bọc giấy đen huyền bí thích hợp tặng người yêu.",
    sellPrice: 450000,
    ingredients: [
      { item: mockItems[0], quantity: 9 },  // Hồng đỏ
      { item: mockItems[6], quantity: 5 },  // Lá bạc
      { item: mockItems[7], quantity: 3 },  // Giấy gói
      { item: mockItems[8], quantity: 1 }   // Nơ
    ],
    category: [mockCategories[0], mockCategories[1]], // Ngày lễ, Bó lẻ
    imageUrl: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11",
    productLink: "/products/bo-hong-do-classic"
  },
  {
    id: "prod-2",
    name: "Bó Tình Yêu Thuần Khiết",
    description: "Sự kết hợp ngọt ngào giữa hồng kem và hoa baby trắng tinh khôi.",
    sellPrice: 380000,
    ingredients: [
      { item: mockItems[1], quantity: 10 }, // Hồng kem
      { item: mockItems[3], quantity: 3 },  // Baby trắng
      { item: mockItems[7], quantity: 2 },  // Giấy gói
      { item: mockItems[8], quantity: 1 }   // Nơ
    ],
    category: [mockCategories[1]], // Bó lẻ
    imageUrl: "https://images.unsplash.com/photo-1561181286-d3fee7d55364",
    productLink: "/products/bo-tinh-yeu-thuan-khiet"
  },
  {
    id: "prod-3",
    name: "Bó Hướng Dương Khởi Đầu Mới",
    description: "3 bông hướng dương rực rỡ mang năng lượng tích cực, phù hợp tặng tốt nghiệp, chúc mừng.",
    sellPrice: 220000,
    ingredients: [
      { item: mockItems[2], quantity: 3 },  // Hướng dương
      { item: mockItems[6], quantity: 4 },  // Lá bạc
      { item: mockItems[7], quantity: 2 },  // Giấy gói
      { item: mockItems[8], quantity: 1 }   // Nơ
    ],
    category: [mockCategories[1]], // Bó lẻ
    imageUrl: "https://images.unsplash.com/photo-1595855759920-86582396756a",
    productLink: "/products/bo-huong-duong-khoi-dau"
  },
  {
    id: "prod-4",
    name: "Giỏ Hoa Khai Trương Hồng Phát",
    description: "Giỏ hoa sang trọng kết hợp giữa cẩm tú cầu và các loại hồng cho các dịp lễ, khai trương.",
    sellPrice: 650000,
    ingredients: [
      { item: mockItems[4], quantity: 2 },  // Cẩm tú cầu
      { item: mockItems[0], quantity: 5 },  // Hồng đỏ
      { item: mockItems[1], quantity: 5 },  // Hồng kem
      { item: mockItems[9], quantity: 1 },  // Giỏ tre
      { item: mockItems[8], quantity: 2 }   // Nơ
    ],
    category: [mockCategories[0]], // Ngày lễ
    imageUrl: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9",
    productLink: "/products/gio-hoa-khai-truong"
  },
  {
    id: "prod-5",
    name: "Bó Tulip Hồng Ngọt Ngào",
    description: "Bó hoa Tulip nhập khẩu tinh tế dành cho các cô nàng yêu thích sự tối giản, hiện đại.",
    sellPrice: 520000,
    ingredients: [
      { item: mockItems[5], quantity: 10 }, // Tulip hồng
      { item: mockItems[7], quantity: 2 },  // Giấy gói
      { item: mockItems[8], quantity: 1 }   // Nơ
    ],
    category: [mockCategories[1]], // Bó lẻ
    imageUrl: "https://images.unsplash.com/photo-1533616688419-b7a585564566",
    productLink: "/products/bo-tulip-hong"
  },
  {
    id: "prod-6",
    name: "Cành Lẻ Hồng Đỏ Ecuador",
    description: "Một cành hồng đỏ Ecuador được tỉa lá gọn gàng.",
    sellPrice: 50000,
    ingredients: [
      { item: mockItems[0], quantity: 1 }   // Chỉ có 1 bông hồng đỏ
    ],
    category: [mockCategories[2]], // Bông lẻ
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
    productLink: "/products/canh-le-hong-do"
  },
  {
    id: "prod-7",
    name: "Cành Lẻ Hướng Dương Đơn",
    description: "Một cành hướng dương đơn thích hợp decor bàn làm việc.",
    sellPrice: 40000,
    ingredients: [
      { item: mockItems[2], quantity: 1 }
    ],
    category: [mockCategories[2]], // Bông lẻ
    imageUrl: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651",
    productLink: "/products/canh-le-huong-duong"
  },
  {
    id: "prod-8",
    name: "Bó Hoa Baby Khổng Lồ Mây Trắng",
    description: "Một vòng tay đầy hoa baby trắng bồng bềnh như mây, món quà tuyệt vời cho ngày kỷ niệm.",
    sellPrice: 600000,
    ingredients: [
      { item: mockItems[3], quantity: 15 }, // Nhiều hoa baby
      { item: mockItems[7], quantity: 4 },
      { item: mockItems[8], quantity: 1 }
    ],
    category: [mockCategories[0], mockCategories[1]], // Ngày lễ, Bó lẻ
    imageUrl: "https://images.unsplash.com/photo-1550950158-d0d960dff51b",
    productLink: "/products/bo-baby-khong-lo"
  },
  {
    id: "prod-9",
    name: "Cành Lẻ Cẩm Tú Cầu Xanh",
    description: "Cẩm tú cầu xanh cành đơn sang trọng.",
    sellPrice: 70000,
    ingredients: [
      { item: mockItems[4], quantity: 1 }
    ],
    category: [mockCategories[2]], // Bông lẻ
    imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d",
    productLink: "/products/canh-le-cam-tu-cau"
  },
  {
    id: "prod-10",
    name: "Hộp Hoa Trái Tim Valentine",
    description: "Hộp hoa thiết kế đặc biệt cho ngày Lễ Tình Nhân với hồng đỏ xếp hình trái tim.",
    sellPrice: 850000,
    ingredients: [
      { item: mockItems[0], quantity: 20 }, // 20 bông hồng đỏ
      { item: mockItems[6], quantity: 5 },  // Lá bạc
      { item: mockItems[8], quantity: 1 }   // Nơ
    ],
    category: [mockCategories[0]], // Ngày lễ
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
    productLink: "/products/hop-hoa-trai-tim-valentine"
  }
];