"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getFontSize } from "@/lib/fontSize";
import { useBlogReducer } from "../useBlogReducer"; // Đảm bảo đường dẫn này trỏ đúng

export default function BlogDetailPage() {
  const { id } = useParams();
  const { DB } = useBlogReducer();

  // Logic tìm kiếm bài viết kết hợp cắt chuỗi slug (Đã fix lỗi 404)
  const blog = DB.find((b) => {
    const slugFromHref = b.href.split("/").pop();
    return slugFromHref === String(id) || String(b.id) === String(id);
  });

  // Hàm lọc ảnh an toàn: Chặn đứng Next.js Image Config Error
  const getSafeImageUrl = (url: string | undefined) => {
    if (!url) return "/images/fallback_img.png";
    // Nếu phát hiện URL là link bên ngoài (chứa http/https) -> Ép về fallback ngay lập tức
    if (url.startsWith("http")) {
      return "/images/fallback_img.png";
    }
    return url;
  };

  // Khởi tạo State với hàm an toàn
  const [imgHeader, setImgHeader] = useState(() =>
    getSafeImageUrl(blog?.imgURL_Header),
  );
  const [imgBody, setImgBody] = useState(() =>
    getSafeImageUrl(blog?.imgURL_Body),
  );

  if (!blog) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-[#F4F6F9]">
        <p
          style={{ fontSize: getFontSize("h3") }}
          className="text-[#1E2538] font-medium"
        >
          Bài viết không tồn tại.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6F9] py-10 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200/50">
        {/* Ảnh Header */}
        <div className="relative w-full h-64 sm:h-80 md:h-[400px]">
          <Image
            src={imgHeader}
            alt={blog.title}
            fill
            className="object-cover"
            onError={() => setImgHeader("/images/fallback_img.png")}
            priority
          />
        </div>

        <div className="p-6 sm:p-10">
          {/* Tiêu đề bài viết */}
          <h1
            style={{ fontSize: getFontSize("h1") }}
            className="font-bold text-[#1E2538] mb-6 leading-tight"
          >
            {blog.title}
          </h1>

          {/* Nội dung Tóm tắt / Phần mở đầu */}
          <p
            style={{ fontSize: getFontSize("h5") }}
            className="text-slate-600 mb-8 font-medium leading-relaxed italic border-l-4 border-[#1E2538] pl-4"
          >
            {blog.content_Header}
          </p>

          {/* Ảnh Body (Chỉ render nếu tồn tại) */}
          {blog.imgURL_Body && (
            <div className="relative w-full h-64 sm:h-80 md:h-96 mb-8 rounded-xl overflow-hidden shadow-sm">
              <Image
                src={imgBody}
                alt={`${blog.title} - Nội dung`}
                fill
                className="object-cover"
                onError={() => setImgBody("/images/fallback_img.png")}
              />
            </div>
          )}

          {/* Nội dung chính */}
          <div
            style={{ fontSize: getFontSize("p") }}
            className="text-[#1E2538] leading-relaxed whitespace-pre-line"
          >
            {blog.content_Body}
          </div>
        </div>
      </article>
    </div>
  );
}
