"use client";

import Link from "next/link";
import { getFontSize } from "@/lib/fontSize";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-slate-300/30"
      style={{ backgroundColor: "#F4F6F9", color: "#1E2538" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8 pb-8 border-b border-slate-300/20">
          <div className="space-y-4 xl:col-span-1">
            <Link
              href="/"
              className="font-bold tracking-tight bg-linear-to-r from-[#C5A880] to-[#E2A2B1] bg-clip-text text-transparent hover:opacity-90 transition-opacity"
              style={{ fontSize: getFontSize("h3") }}
            >
              Florist Ecom
            </Link>
            <p
              className="text-slate-600 max-w-md leading-relaxed"
              style={{ fontSize: getFontSize("p") }}
            >
              Nơi kết nối những tâm hồn yêu hoa bằng những tác phẩm nghệ thuật
              băng giá độc bản. Mang sắc màu thiên nhiên tinh tế vào không gian
              sống của bạn.
            </p>

            <div className="flex space-x-5 pt-2">
              <a
                href="#"
                className="text-slate-500 hover:text-[#C5A880] transition-colors"
                aria-label="Facebook"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-[#E2A2B1] transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16.4a4.238 4.238 0 110-8.476 4.238 4.238 0 010 8.476zm6.405-11.285a1.122 1.122 0 100 2.244 1.122 1.122 0 000-2.244z"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3
                  className="font-semibold uppercase tracking-wider text-slate-900"
                  style={{ fontSize: getFontSize("h6") }}
                >
                  Cửa hàng
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li>
                    <Link
                      href="/"
                      className="text-slate-600 hover:text-[#C5A880] transition-colors"
                      style={{ fontSize: getFontSize("sub") }}
                    >
                      Sản phẩm mới
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-slate-600 hover:text-[#C5A880] transition-colors"
                      style={{ fontSize: getFontSize("sub") }}
                    >
                      Hoa tươi định kỳ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-slate-600 hover:text-[#C5A880] transition-colors"
                      style={{ fontSize: getFontSize("sub") }}
                    >
                      BST Băng Giá
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-slate-600 hover:text-[#C5A880] transition-colors"
                      style={{ fontSize: getFontSize("sub") }}
                    >
                      Quà tặng đặc biệt
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3
                  className="font-semibold uppercase tracking-wider text-slate-900"
                  style={{ fontSize: getFontSize("h6") }}
                >
                  Khám phá
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li>
                    <Link
                      href="/Blogs"
                      className="text-slate-600 hover:text-[#E2A2B1] transition-colors"
                      style={{ fontSize: getFontSize("sub") }}
                    >
                      Chuyện của Hoa
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/Blogs"
                      className="text-slate-600 hover:text-[#E2A2B1] transition-colors"
                      style={{ fontSize: getFontSize("sub") }}
                    >
                      Nghệ thuật cắm hoa
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-slate-600 hover:text-[#E2A2B1] transition-colors"
                      style={{ fontSize: getFontSize("sub") }}
                    >
                      Về chúng tôi
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3
                  className="font-semibold uppercase tracking-wider text-slate-900"
                  style={{ fontSize: getFontSize("h6") }}
                >
                  Hỗ trợ khách hàng
                </h3>
                <ul role="list" className="mt-4 space-y-3">
                  <li>
                    <span
                      className="text-slate-600 block"
                      style={{ fontSize: getFontSize("sub") }}
                    >
                      Hotline: 1900 xxxx (8:00 - 21:00)
                    </span>
                  </li>
                  <li>
                    <span
                      className="text-slate-600 block"
                      style={{ fontSize: getFontSize("sub") }}
                    >
                      Email: contact@floristecom.com
                    </span>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-slate-600 hover:text-slate-900 transition-colors"
                      style={{ fontSize: getFontSize("sub") }}
                    >
                      Chính sách giao hàng bảo quản
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className="text-slate-600 hover:text-slate-900 transition-colors"
                      style={{ fontSize: getFontSize("sub") }}
                    >
                      Điều khoản dịch vụ
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 md:flex md:items-center md:justify-between pt-2">
          <p
            className="text-slate-500 mt-8 md:mt-0"
            style={{ fontSize: getFontSize("sub") }}
          >
            &copy; {currentYear} Florist Ecom. Bảo lưu mọi quyền. Thiết kế theo
            tiêu chuẩn hệ thống ứng dụng Next.js.
          </p>
          <div className="mt-4 flex space-x-6 md:mt-0">
            <span
              className="inline-flex items-center text-slate-400"
              style={{ fontSize: getFontSize("sub") }}
            >
              <span className="mr-1.5 h-2 w-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              Hệ thống vận hành ổn định
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
