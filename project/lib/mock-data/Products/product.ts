import { Product } from "@/types/Product";
import { mockCategories } from "./category";
import { mockItems } from "./items";

export const mockProducts: Product[] = [
  // =========================================================================
  // GROUP 1: 5 Bó hoa lẻ (Sản phẩm đơn giản, tập trung vào một loại hoa chính)
  // =========================================================================
  {
    id: 1,
    name: "Cành Hồng Đỏ Đơn Giản",
    description: "Một cành hồng đỏ kèm lá bạc bọc kiếng",
    sellPrice: 30000,
    category: [mockCategories[0]],
    imageUrl: "p-hong-do.jpg",
    isActive: true,
    productLink: "/product/canh-hong-do", // sửa lại Link sao cho phù hợp với thực tế
    ingredients: [
      { item: mockItems[0], quantity: 1 },
      { item: mockItems[5], quantity: 1 },
    ],
  },
  {
    id: 2,
    name: "Đóa Hướng Dương Rạng Rỡ",
    description: "Một bông hướng dương gói giấy kraft mộc mạc",
    sellPrice: 40000,
    category: [mockCategories[0]],
    imageUrl: "p-huong-duong.jpg",
    isActive: true,
    productLink: "/product/doas-huong-duong", // sửa lại Link sao cho phù hợp với thực tế
    ingredients: [
      { item: mockItems[1], quantity: 1 },
      { item: mockItems[6], quantity: 1 },
    ],
  },
  {
    id: 3,
    name: "Cành Tulip Trắng Tinh Khôi",
    description: "Một cành Tulip trắng tối giản sang trọng",
    sellPrice: 60000,
    category: [mockCategories[0]],
    imageUrl: "p-tulip-trang.jpg",
    isActive: true,
    productLink: "/product/canh-tulip", // sửa lại Link sao cho phù hợp với thực tế
    ingredients: [{ item: mockItems[2], quantity: 1 }],
  },
  {
    id: 4,
    name: "Cẩm Tú Cầu Đơn",
    description: "Một bông cẩm tú cầu xanh bọc giấy lụa",
    sellPrice: 70000,
    category: [mockCategories[0]],
    imageUrl: "p-cam-tu-cau.jpg",
    isActive: true,
    productLink: "/product/cam-tu-cau-don", // sửa lại Link sao cho phù hợp với thực tế
    ingredients: [
      { item: mockItems[3], quantity: 1 },
      { item: mockItems[6], quantity: 1 },
    ],
  },
  {
    id: 5,
    name: "Nhánh Baby Ngọt Ngào",
    description: "Một bó nhỏ hoa baby trắng buộc nơ ruy băng",
    sellPrice: 25000,
    category: [mockCategories[0]],
    imageUrl: "p-baby.jpg",
    isActive: true,
    productLink: "/product/nhanh-baby", // sửa lại Link sao cho phù hợp với thực tế
    ingredients: [{ item: mockItems[4], quantity: 2 }],
  },

  // =========================================================================
  // GROUP 2: 5 Bó hoa lẻ (Kết hợp 1 loại hoa chính với phụ kiện đơn giản)
  // =========================================================================
  {
    id: 6,
    name: "Bó 9 Đóa Hồng Đỏ",
    description: "Biểu trưng cho tình yêu vĩnh cửu và nồng cháy",
    sellPrice: 250000,
    category: [mockCategories[1]],
    imageUrl: "bo-9-hong.jpg",
    isActive: true,
    productLink: "/product/bo-9-hong-do", // sửa lại Link sao cho phù hợp với thực tế
    ingredients: [
      { item: mockItems[0], quantity: 9 },
      { item: mockItems[5], quantity: 4 },
      { item: mockItems[6], quantity: 2 },
    ],
  },
  {
    id: 7,
    name: "Bó Hướng Dương Ấm Áp",
    description: "3 bông hướng dương phối cùng hoa baby điểm xuyến",
    sellPrice: 180000,
    category: [mockCategories[1]],
    imageUrl: "bo-huong-duong.jpg",
    isActive: true,
    productLink: "/product/bo-huong-duong-am-ap", // sửa lại Link sao cho phù hợp với thực tế
    ingredients: [
      { item: mockItems[1], quantity: 3 },
      { item: mockItems[4], quantity: 2 },
      { item: mockItems[6], quantity: 2 },
    ],
  },
  {
    id: 8,
    name: "Bó Tulip Trắng Thuần Khiết",
    description: "5 cành tulip trắng phối giấy gói đen cao cấp",
    sellPrice: 320000,
    category: [mockCategories[1]],
    imageUrl: "bo-tulip.jpg",
    isActive: true,
    productLink: "/product/bo-tulip-trang", // sửa lại Link sao cho phù hợp với thực tế
    ingredients: [
      { item: mockItems[2], quantity: 5 },
      { item: mockItems[6], quantity: 2 },
    ],
  },
  {
    id: 9,
    name: "Mây Trắng Baby",
    description: "Bó hoa baby trắng khổng lồ bồng bềnh như mây",
    sellPrice: 200000,
    category: [mockCategories[1]],
    imageUrl: "bo-baby-cloud.jpg",
    isActive: true,
    productLink: "/product/may-trang-baby", // sửa lại Link sao cho phù hợp với thực tế
    ingredients: [
      { item: mockItems[4], quantity: 15 },
      { item: mockItems[6], quantity: 3 },
    ],
  },
  {
    id: 10,
    name: "Bó Cẩm Tú Cầu Đôi",
    description: "2 bông cẩm tú cầu phối lá bạc dáng dài thanh lịch",
    sellPrice: 150000,
    category: [mockCategories[1]],
    imageUrl: "bo-doi-cam-tu-cau.jpg",
    isActive: true,
    productLink: "/product/bo-cam-tu-cau-doi", // sửa lại Link sao cho phù hợp với thực tế
    ingredients: [
      { item: mockItems[3], quantity: 2 },
      { item: mockItems[5], quantity: 3 },
      { item: mockItems[6], quantity: 2 },
    ],
  },

  // =========================================================================
  // GROUP 3: 5 Bó bông theo mùa (Kết hợp nhiều loại hoa đa dạng)
  // =========================================================================
  {
    id: 11,
    name: "Khúc Giao Mùa Xuân",
    description: "Tone màu nhẹ nhàng kết hợp hồng và tulip trắng",
    sellPrice: 450000,
    category: [mockCategories[2]],
    imageUrl: "xuan-giao-mua.jpg",
    isActive: true,
    productLink: "/product/khuc-giao-mua-xuan", // sửa lại Link sao cho phù hợp với thực tế
    ingredients: [
      { item: mockItems[0], quantity: 5 },
      { item: mockItems[2], quantity: 5 },
      { item: mockItems[4], quantity: 3 },
      { item: mockItems[6], quantity: 2 },
    ],
  },
  {
    id: 12,
    name: "Nắng Hạ Rực Rỡ",
    description: "Sự kết hợp năng động giữa Hướng Dương rực cháy và Baby",
    sellPrice: 390000,
    category: [mockCategories[2]],
    imageUrl: "nang-ha.jpg",
    isActive: true,
    productLink: "/product/nang-ha-ruc-ro", // sửa lại Link sao cho phù hợp với thực tế
    ingredients: [
      { item: mockItems[1], quantity: 5 },
      { item: mockItems[4], quantity: 5 },
      { item: mockItems[5], quantity: 4 },
      { item: mockItems[6], quantity: 2 },
    ],
  },
  {
    id: 13,
    name: "Hương Sắc Mùa Thu",
    description: "Sự hòa quyện lãng mạn giữa sắc đỏ hồng và vàng hướng dương",
    sellPrice: 420000,
    category: [mockCategories[2]],
    imageUrl: "huong-thu.jpg",
    isActive: true,
    productLink: "/product/huong-sac-mua-thu", // sửa lại Link sao cho phù hợp với thực tế
    ingredients: [
      { item: mockItems[0], quantity: 6 },
      { item: mockItems[1], quantity: 3 },
      { item: mockItems[5], quantity: 5 },
      { item: mockItems[6], quantity: 2 },
    ],
  },
  {
    id: 14,
    name: "Tuyết Trắng Đêm Đông",
    description: "Sự kết hợp tinh khôi giữa Tulip trắng quyến rũ và Baby",
    sellPrice: 500000,
    category: [mockCategories[2]],
    imageUrl: "dong-tuyet.jpg",
    isActive: true,
    productLink: "/product/tuyet-trang-dem-dong", // sửa lại Link sao cho phù hợp với thực tế
    ingredients: [
      { item: mockItems[2], quantity: 7 },
      { item: mockItems[4], quantity: 6 },
      { item: mockItems[6], quantity: 3 },
    ],
  },
  {
    id: 15,
    name: "Bó Hoa Bốn Mùa Đặc Biệt",
    description: "Mỗi loại hoa một chút, đại diện cho sắc màu cả năm",
    sellPrice: 600000,
    category: [mockCategories[2]],
    imageUrl: "bon-mua.jpg",
    isActive: true,
    productLink: "/product/bo-hoa-bon-mua", // sửa lại Link sao cho phù hợp với thực tế
    ingredients: [
      { item: mockItems[0], quantity: 3 },
      { item: mockItems[1], quantity: 2 },
      { item: mockItems[2], quantity: 3 },
      { item: mockItems[3], quantity: 1 },
      { item: mockItems[4], quantity: 2 },
      { item: mockItems[6], quantity: 3 },
    ],
  },

  // =========================================================================
  // GROUP 4: 5 Bó bông theo lễ (Sản phẩm phân khúc cao cấp, số lượng lớn)
  // =========================================================================
  {
    id: 16,
    name: "Valentine Đắm Say",
    description: "Bó hoa lớn kết từ 33 đóa hồng đỏ cho tình yêu mãnh liệt",
    sellPrice: 750000,
    category: [mockCategories[3]],
    imageUrl: "valentine-love.jpg",
    isActive: true,
    productLink: "/product/valentine-dam-say", // sửa lại Link sao cho phù hợp với thực tế
    ingredients: [
      { item: mockItems[0], quantity: 33 },
      { item: mockItems[5], quantity: 10 },
      { item: mockItems[6], quantity: 4 },
    ],
  },
  {
    id: 17,
    name: "Ơn Thầy Kính Yêu 20/11",
    description: "Bó hoa trang trọng tôn vinh và tri ân thầy cô giáo",
    sellPrice: 350000,
    category: [mockCategories[3]],
    imageUrl: "tri-an-20-11.jpg",
    isActive: true,
    productLink: "/product/on-thay-kinh-yeu", // sửa lại Link sao cho phù hợp với thực tế
    ingredients: [
      { item: mockItems[1], quantity: 5 },
      { item: mockItems[4], quantity: 4 },
      { item: mockItems[5], quantity: 4 },
      { item: mockItems[6], quantity: 2 },
    ],
  },
  {
    id: 18,
    name: "Gửi Người Phụ Nữ Tôi Yêu 8/3",
    description: "Sự kết hợp quý phái giữa Cẩm Tú Cầu và Hồng Đỏ",
    sellPrice: 550000,
    category: [mockCategories[3]],
    imageUrl: "quoc-te-phu-nu.jpg",
    isActive: true,
    productLink: "/product/gui-nguoi-phu-nu-toi-yeu", // sửa lại Link sao cho phù hợp với thực tế
    ingredients: [
      { item: mockItems[3], quantity: 2 },
      { item: mockItems[0], quantity: 12 },
      { item: mockItems[5], quantity: 6 },
      { item: mockItems[6], quantity: 3 },
    ],
  },
  {
    id: 19,
    name: "Bó Hoa Tốt Nghiệp Rực Rỡ",
    description: "Chúc mừng tân cử nhân với sắc vàng tươi tắn, may mắn",
    sellPrice: 280000,
    category: [mockCategories[3]],
    imageUrl: "tot-nghiep.jpg",
    isActive: true,
    productLink: "/product/bo-hoa-tot-nghiep", // sửa lại Link sao cho phù hợp với thực tế
    ingredients: [
      { item: mockItems[1], quantity: 4 },
      { item: mockItems[4], quantity: 5 },
      { item: mockItems[6], quantity: 2 },
    ],
  },
  {
    id: 20,
    name: "Giáng Sinh Ấm Áp",
    description: "Bó hoa tone đỏ rực rỡ mang không khí lễ hội an lành",
    sellPrice: 480000,
    category: [mockCategories[3]],
    imageUrl: "noel-warm.jpg",
    isActive: true,
    productLink: "/product/giang-sinh-am-ap", // sửa lại Link sao cho phù hợp với thực tế
    ingredients: [
      { item: mockItems[0], quantity: 15 },
      { item: mockItems[5], quantity: 8 },
      { item: mockItems[6], quantity: 3 },
    ],
  },
];
