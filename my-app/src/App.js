import React from 'react';
import './App.css';
// Import Page Giỏ hàng vừa tạo
import GioHang from './components/GioHang';
export default function App() {
  return (
    <div className="App" style={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#2c3e50', padding: '15px 20px', color: 'white', textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>Hệ Thống E-Commerce</h1>
      </header>
      
      <main style={{ padding: '20px 0' }}>
        {/* Nhúng toàn bộ Page hoàn chỉnh vào đây */}
        <GioHang />
      </main>
    </div>
  );
}