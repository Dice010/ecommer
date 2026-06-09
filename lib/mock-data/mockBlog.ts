import { BlogCards, BlogDetails, FullBlog } from "@/types/Blog";

export const mockFullBlogs: FullBlog[] = [
  {
    id: "blog-01",
    title: "5 Bí Quyết Giữ Hoa Hồng Tươi Lâu Cả Tuần Bạn Cần Biết",
    imgURL_Header:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
    href: "/blogs/bi-quyet-giu-hoa-hong-tuoi-lau",
    content_Header:
      "Làm sao để bó hoa hồng được tặng giữ được vẻ rực rỡ lâu nhất? Hãy cùng Florist khám phá những mẹo cực kỳ đơn giản nhưng hiệu quả ngay tại nhà.",
    imgURL_Body: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11",
    content_Body:
      "Bước 1: Cắt gốc hoa theo góc 45 độ để tăng diện tích hút nước...\nBước 2: Thay nước định kỳ 2 ngày một lần...",
  },
  {
    id: "blog-02",
    title: "Ý Nghĩa Của Hoa Tulip Theo Từng Màu Sắc Trong Tình Yêu",
    imgURL_Header:
      "https://images.unsplash.com/photo-1520763185298-1b434c919102",
    href: "/blogs/y-nghia-hoa-tulip-trong-tinh-yeu",
    content_Header:
      "Không chỉ có hoa hồng, Tulip cũng là biểu tượng mãnh liệt của tình yêu. Tuy nhiên, mỗi sắc màu của Tulip lại mang một thông điệp ẩn giấu khác nhau.",
    imgURL_Body: "https://images.unsplash.com/photo-1533616688419-b7a585564566",
    content_Body:
      "Tulip đỏ đại diện cho tình yêu lãng mạn. Tulip hồng thể hiện sự hạnh phúc. Tulip vàng tượng trưng cho sự rạng rỡ như ánh mặt trời.",
  },
  {
    id: "blog-03",
    title: "Xu Hướng Chọn Hoa Tặng Mẹ Trong Ngày Lễ 8/3",
    imgURL_Header: "https://images.unsplash.com/photo-1563245372-f21724e3856d",
    href: "/blogs/xu-huong-chon-hoa-tang-me-8-3",
    content_Header:
      "Ngày Quốc tế Phụ nữ 8/3 là dịp để bày tỏ lòng biết ơn đến người mẹ kính yêu. Xu hướng hoa năm nay hướng về sự tối giản nhưng tinh tế.",
    imgURL_Body: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9",
    content_Body:
      "Thay vì những bó hoa quá cầu kỳ, các giỏ hoa kết hợp giữa Cẩm Tú Cầu và hoa hồng kem đang được ưa chuộng hơn cả.",
  },
];

export const mockBlogCards: BlogCards[] = mockFullBlogs.map((blog) => ({
  id: blog.id,
  title: blog.title,
  imgURL_Header: blog.imgURL_Header,
  href: blog.href,
}));

export const mockBlogDetails: BlogDetails[] = mockFullBlogs.map((blog) => ({
  id: blog.id,
  title: blog.title,
  imgURL_Header: blog.imgURL_Header,
  content_Header: blog.content_Header,
  imgURL_Body: blog.imgURL_Body,
  content_Body: blog.content_Body,
}));
