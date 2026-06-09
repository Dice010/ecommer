"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Context/Auth/useAuthContext";
import { getFontSize } from "@/lib/fontSize";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { Login } = useAuth();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      Login(userName, password);
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Đăng nhập thất bại: Lỗi hệ thống không xác định.");
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 radial-bg">
      {/* Các blob tạo hiệu ứng chuyển động nghệ thuật */}
      <div className="bg-blob top-0 left-0" />
      <div className="bg-blob bottom-0 right-0" />
      
      <form
        onSubmit={handleLogin}
        className="glass-card p-10 rounded-3xl w-full max-w-md relative z-10 transition-all duration-500 hover:shadow-2xl border border-white/50"
      >
        <h1
          style={{ fontSize: getFontSize("h2") }}
          className="font-bold text-[#1E2538] mb-8 text-center tracking-tight"
        >
          Đăng Nhập
        </h1>

        {/* Các phần khác giữ nguyên, nhưng thêm class shadow-inner cho input để tạo chiều sâu */}
        <div className="mb-4">
          <label
            className="block text-[#1E2538] mb-2 font-medium"
            style={{ fontSize: getFontSize("p") }}
          >
            Tên đăng nhập
          </label>
          <input
            type="text"
            className="w-full p-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-inner transition-all"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-[#1E2538] mb-2 font-medium"
            style={{ fontSize: getFontSize("p") }}
          >
            Mật khẩu
          </label>
          <input
            type="password"
            className="w-full p-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-inner transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#1E2538] text-white py-3 rounded-xl hover:bg-pink-500 transition-all duration-300 font-semibold shadow-lg hover:shadow-pink-500/30"
          style={{ fontSize: getFontSize("p") }}
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
