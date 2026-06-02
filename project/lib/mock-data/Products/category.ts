import { category } from "@/types/Product";

export const mockCategories: category[] = [
  {
    id: 1,
    name: "Bông lẻ",
    description: "Các loại hoa lẻ cành như Hồng, Hướng Dương, Tulip...",
    isActive: true,
    categoryLink: "/category/bong-le", // sửa lại Link sao cho phù hợp với thực tế
  },
  {
    id: 2,
    name: "Bó hoa lẻ",
    description: "Bó hoa đơn loại thiết kế tối giản",
    isActive: true,
    categoryLink: "/category/bo-hoa-le", // sửa lại Link sao cho phù hợp với thực tế
  },
  {
    id: 3,
    name: "Bó hoa theo mùa",
    description: "Hoa tươi đặc trưng theo mùa Xuân, Hạ, Thu, Đông",
    isActive: true,
    categoryLink: "/category/bo-hoa-theo-mua",
  },
  {
    id: 4,
    name: "Bó hoa theo lễ",
    description: "Thiết kế cao cấp cho ngày Valentine, 8/3, 20/11...",
    isActive: true,
    categoryLink: "/category/bo-hoa-theo-le", // sửa lại Link sao cho phù hợp với thực tế
  },
];
