import React from 'react';
import './App.css';
// Import Component chính của chức năng giỏ hàng
import TrangGioHang from './components/GioHangThanhToan/TrangGioHang';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Dự án E-commerce</h1>
      </header>
      
      <main style={{ padding: '20px' }}>
        {/* Gọi Component ra để hiển thị */}
        <TrangGioHang />
      </main>
    </div>
  );
}

export default App;
