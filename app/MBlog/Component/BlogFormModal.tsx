"use client";

import React from "react";
import { getFontSize } from "@/lib/fontSize";
import { FullBlog } from "@/types/Blog";

interface BlogFormModalProps {
  isOpen: boolean;
  editingId: string | null;
  formData: Partial<FullBlog>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<FullBlog>>>;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function BlogFormModal({
  isOpen,
  editingId,
  formData,
  setFormData,
  onClose,
  onSubmit,
}: BlogFormModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <h2
          style={{ fontSize: getFontSize("h3") }}
          className="font-bold text-[#1E2538] mb-6"
        >
          {editingId ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}
        </h2>
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-[#1E2538] font-medium mb-1">
              Tiêu đề
            </label>
            <input
              required
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-[#F4F6F9] border-none text-[#1E2538] focus:ring-2 focus:ring-pink-300 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-[#1E2538] font-medium mb-1">
              Đường dẫn (href)
            </label>
            <input
              required
              type="text"
              value={formData.href}
              onChange={(e) =>
                setFormData({ ...formData, href: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-[#F4F6F9] border-none text-[#1E2538] focus:ring-2 focus:ring-pink-300 outline-none transition-all"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[#1E2538] font-medium mb-1">
                Link Ảnh Header
              </label>
              <input
                type="text"
                value={formData.imgURL_Header || ""}
                onChange={(e) =>
                  setFormData({ ...formData, imgURL_Header: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-[#F4F6F9] border-none text-[#1E2538] focus:ring-2 focus:ring-pink-300 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-[#1E2538] font-medium mb-1">
                Link Ảnh Body
              </label>
              <input
                type="text"
                value={formData.imgURL_Body || ""}
                onChange={(e) =>
                  setFormData({ ...formData, imgURL_Body: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-[#F4F6F9] border-none text-[#1E2538] focus:ring-2 focus:ring-pink-300 outline-none transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-[#1E2538] font-medium mb-1">
              Tóm tắt (Content Header)
            </label>
            <textarea
              required
              rows={3}
              value={formData.content_Header}
              onChange={(e) =>
                setFormData({ ...formData, content_Header: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-[#F4F6F9] border-none text-[#1E2538] focus:ring-2 focus:ring-pink-300 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-[#1E2538] font-medium mb-1">
              Nội dung chi tiết (Content Body)
            </label>
            <textarea
              required
              rows={5}
              value={formData.content_Body}
              onChange={(e) =>
                setFormData({ ...formData, content_Body: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-[#F4F6F9] border-none text-[#1E2538] focus:ring-2 focus:ring-pink-300 outline-none transition-all"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl font-medium text-slate-500 hover:bg-slate-100 transition-all"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="bg-[#1E2538] text-white px-6 py-3 rounded-xl font-medium hover:bg-opacity-90 active:scale-95 transition-all shadow-md"
            >
              {editingId ? "Cập nhật" : "Tạo bài viết"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
