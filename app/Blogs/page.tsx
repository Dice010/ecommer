"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getFontSize } from "@/lib/fontSize";
import { useBlogReducer } from "./useBlogReducer";

export default function BlogsPage() {
  const { DB } = useBlogReducer();
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setBrokenImages((prev) => ({ ...prev, [id]: true }));
  };

  // Hàm chặn các domain chưa được cấu hình trong next.config.js
  const getSafeImageUrl = (url: string | undefined) => {
    if (!url) return "/images/fallback_img.png";

    // Nếu phát hiện domain bị lỗi của Next.js, tự động chuyển qua fallback
    if (url.includes("images.unsplash.com")) {
      return "/images/fallback_img.png";
    }

    return url;
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* --- Phần Tiêu đề & Quản lý --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1
              style={{ fontSize: getFontSize("h1") }}
              className="font-bold tracking-tight text-[#1E2538]"
            >
              Góc Sáng Tạo & Blog Hoa
            </h1>
            <p
              style={{ fontSize: getFontSize("sub") }}
              className="text-[#1E2538] opacity-70 mt-1"
            >
              Nơi chia sẻ những câu chuyện, kinh nghiệm và cảm hứng nghệ thuật
              cắm hoa độc quyền từ Florist Ecom.
            </p>
          </div>
        </div>

        {/* --- Danh sách Bài viết (Grid Layout) --- */}
        {DB.length === 0 ? (
          <div className="text-center py-20">
            <p
              style={{ fontSize: getFontSize("h3") }}
              className="font-medium text-[#1E2538] opacity-60"
            >
              Hiện chưa có bài viết nào.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DB.map((blog) => {
              const isImageBroken = brokenImages[blog.id] || false;

              return (
                <Link
                  href={blog.href.replace("/blogs/", "/Blogs/")}
                  className="group bg-white rounded-2xl shadow-sm ..."
                  key={blog.id}
                >
                  <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 flex flex-col h-full transition-all duration-300 hover:-translate-y-1">
                    {/* Khu vực Bọc Ảnh */}
                    <div className="relative w-full aspect-video bg-gray-100 overflow-hidden">
                      <Image
                        // Sử dụng getSafeImageUrl để chặn lỗi Next.js config
                        src={
                          isImageBroken
                            ? "/images/fallback_img.png"
                            : getSafeImageUrl(blog.imgURL_Header)
                        }
                        alt={blog.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={() => handleImageError(blog.id)}
                      />
                    </div>

                    {/* Nội dung Tóm tắt */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h2
                        style={{ fontSize: getFontSize("h4") }}
                        className="font-bold text-[#1E2538] mb-3 line-clamp-2 group-hover:text-pink-500 transition-colors"
                      >
                        {blog.title}
                      </h2>
                      <p
                        style={{ fontSize: getFontSize("p") }}
                        className="text-gray-500 line-clamp-3 flex-grow leading-relaxed"
                      >
                        {blog.content_Header}
                      </p>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
