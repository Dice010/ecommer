"use client";

import React, { useState } from "react";
import Image from "next/image";
import { getFontSize } from "@/lib/fontSize";
import { FullBlog } from "@/types/Blog";

interface BlogTableProps {
  blogs: FullBlog[];
  onEdit: (blog: FullBlog) => void;
  onDelete: (id: string) => void;
}

export default function BlogTable({ blogs, onEdit, onDelete }: BlogTableProps) {
  // State để theo dõi xem ảnh nào bị lỗi mạng (404) để tự động thay bằng fallback
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setBrokenImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-[#1E2538] border-b border-slate-200">
              <th
                className="p-4 font-semibold"
                style={{ fontSize: getFontSize("p") }}
              >
                ID
              </th>
              <th
                className="p-4 font-semibold"
                style={{ fontSize: getFontSize("p") }}
              >
                Hình ảnh
              </th>
              <th
                className="p-4 font-semibold"
                style={{ fontSize: getFontSize("p") }}
              >
                Tiêu đề
              </th>
              <th
                className="p-4 font-semibold"
                style={{ fontSize: getFontSize("p") }}
              >
                Tóm tắt
              </th>
              <th
                className="p-4 font-semibold text-center"
                style={{ fontSize: getFontSize("p") }}
              >
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => {
              // Logic xác định nguồn ảnh an toàn
              const imgSrc =
                brokenImages[blog.id] || !blog.imgURL_Header
                  ? "/images/fallback_img.png"
                  : blog.imgURL_Header;

              return (
                <tr
                  key={blog.id}
                  className="border-b border-slate-100 hover:bg-[#F4F6F9]/50 transition-colors"
                >
                  <td className="p-4 text-slate-500 font-medium">{blog.id}</td>
                  <td className="p-4">
                    <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-slate-200">
                      <Image
                        src={imgSrc}
                        alt={blog.title}
                        fill
                        unoptimized // <-- Phép màu ở đây: Bỏ qua lỗi bắt buộc cấu hình domain trong next.config.js
                        onError={() => handleImageError(blog.id)} // Bắt lỗi an toàn nếu link ảnh Unsplash bị chết (404)
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  </td>
                  <td
                    className="p-4 text-[#1E2538] font-medium max-w-xs truncate"
                    title={blog.title}
                  >
                    {blog.title}
                  </td>
                  <td
                    className="p-4 text-slate-500 text-sm max-w-sm truncate"
                    title={blog.content_Header}
                  >
                    {blog.content_Header}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => onEdit(blog)}
                        className="text-blue-500 hover:text-blue-700 font-medium px-3 py-1 bg-blue-50 rounded-lg transition-colors"
                        style={{ fontSize: getFontSize("sub") }}
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => onDelete(blog.id)}
                        className="text-red-500 hover:text-red-700 font-medium px-3 py-1 bg-red-50 rounded-lg transition-colors"
                        style={{ fontSize: getFontSize("sub") }}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {blogs.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  Chưa có bài viết nào trên hệ thống.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
