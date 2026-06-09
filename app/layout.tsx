import type { Metadata } from "next";
import Navbar from "@/Component/Navbar";
import Footer from "@/Component/Footer";
import { AuthProvider } from "@/Context/Auth/useAuthContext";
import { CartProvider } from "@/Context/Cart/useCartContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Florist Ecom",
  description: "Cửa hàng hoa trực tuyến",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="min-h-screen bg-[#F4F6F9] text-[#1E2538]">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
