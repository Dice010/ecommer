"use client";

import React, { useState } from "react";
import { getFontSize } from "@/lib/fontSize";
import { useAuth } from "@/Context/Auth/useAuthContext";
import { useBlogReducer } from "@/app/Blogs/useBlogReducer";
import { FullBlog } from "@/types/Blog";

// Import các Components đã tách
import BlogFormModal from "./Component/BlogFormModal";
import BlogTable from "./Component/BlogTable";

export default function ManageBlogPage() {
  const { user } = useAuth();
  const role = user?.role || "Customer";
  const { DB, dispatch } = useBlogReducer();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<FullBlog>>({
    title: "",
    href: "",
    content_Header: "",
    content_Body: "",
    imgURL_Header: "",
    imgURL_Body: "",
  });

  if (role === "Customer") {
    return (
      <div className="min-h-screen bg-[#F4F6F9] flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <h2
            style={{ fontSize: getFontSize("h2") }}
            className="text-red-500 font-bold mb-4"
          >
            Từ chối truy cập
          </h2>
          <p style={{ fontSize: getFontSize("p") }} className="text-[#1E2538]">
            Bạn không có quyền truy cập vào trang quản trị Blog.
          </p>
        </div>
      </div>
    );
  }

  const handleOpenForm = (blog?: FullBlog) => {
    if (blog) {
      setEditingId(blog.id);
      setFormData(blog);
    } else {
      setEditingId(null);
      setFormData({
        title: "",
        href: "",
        content_Header: "",
        content_Body: "",
        imgURL_Header: "",
        imgURL_Body: "",
      });
    }
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      dispatch({
        type: "UPDATE_BLOG",
        oldId: editingId,
        newBlog: formData as Omit<FullBlog, "id">,
      });
    } else {
      dispatch({
        type: "CREATE_BLOG",
        newBlog: { ...formData, id: "" } as FullBlog,
      });
    }
    setIsFormOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) {
      dispatch({ type: "REMOVE_BLOG", id });
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Quản lý */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1
              style={{ fontSize: getFontSize("h1") }}
              className="font-bold text-[#1E2538]"
            >
              Quản lý Blog
            </h1>
            <p
              style={{ fontSize: getFontSize("sub") }}
              className="text-slate-500 mt-1"
            >
              {role === "Admin"
                ? "Toàn quyền quản trị hệ thống bài viết"
                : "Quản lý nội dung bài viết"}
            </p>
          </div>
          <button
            onClick={() => handleOpenForm()}
            className="bg-gradient-to-r from-[#C5A880] to-[#E2A2B1] text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 active:scale-95 transition-all shadow-md"
            style={{ fontSize: getFontSize("p") }}
          >
            + Thêm bài viết mới
          </button>
        </div>

        {/* Form Modal Component */}
        <BlogFormModal
          isOpen={isFormOpen}
          editingId={editingId}
          formData={formData}
          setFormData={setFormData}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleSubmit}
        />

        {/* Data Table Component */}
        <BlogTable blogs={DB} onEdit={handleOpenForm} onDelete={handleDelete} />
      </div>
    </div>
  );
}
