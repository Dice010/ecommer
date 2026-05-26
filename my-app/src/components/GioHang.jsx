import React, { useState } from 'react';
import ThanhToan from './GioHangThanhToan/ThanhToan';

// 1. Component hiển thị từng dòng sản phẩm
function ChiTietSanPham({ sanPham, capNhatSoLuong, xoaSanPham }) {
  const tangSoLuong = () => {
    if (sanPham.soLuongMua < sanPham.tonKho) {
      capNhatSoLuong(sanPham.id, sanPham.soLuongMua + 1);
    } else {
      alert('Vượt quá số lượng tồn kho!');
    }
  };

  const giamSoLuong = () => {
    if (sanPham.soLuongMua > 1) capNhatSoLuong(sanPham.id, sanPham.soLuongMua - 1);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd', padding: '15px 0' }}>
      <div style={{ flex: 2 }}>
        <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{sanPham.ten}</h4>
        <p style={{ margin: 0, color: '#888', fontSize: '14px' }}>Giá: {sanPham.giaHienTai.toLocaleString()} đ</p>
      </div>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <button onClick={giamSoLuong} style={{ padding: '2px 8px' }}>-</button>
        <span style={{ margin: '0 12px', fontWeight: 'bold' }}>{sanPham.soLuongMua}</span>
        <button onClick={tangSoLuong} style={{ padding: '2px 8px' }}>+</button>
      </div>
      <div style={{ flex: 1, textAlign: 'right' }}>
        <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#2ecc71' }}>{(sanPham.giaHienTai * sanPham.soLuongMua).toLocaleString()} đ</p>
        <button onClick={() => xoaSanPham(sanPham.id)} style={{ color: '#e74c3c', border: 'none', background: 'none', cursor: 'pointer', fontSize: '13px' }}>Xóa</button>
      </div>
    </div>
  );
}

// 2. Component hiển thị danh sách sản phẩm
function DanhSachSanPham({ danhSachMua, setDanhSachMua }) {
  const capNhatSoLuong = (idSanPham, soLuongMoi) => {
    const danhSachMoi = danhSachMua.map(sp => 
      sp.id === idSanPham ? { ...sp, soLuongMua: soLuongMoi } : sp
    );
    setDanhSachMua(danhSachMoi);
  };

  const xoaSanPham = (idSanPham) => {
    setDanhSachMua(danhSachMua.filter(sp => sp.id !== idSanPham));
  };

  if (danhSachMua.length === 0) return <p style={{ textAlign: 'center', color: '#999', padding: '20px' }}>Giỏ hàng đang trống.</p>;

  return (
    <div style={{ background: '#fff', padding: '0 15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
      {danhSachMua.map(sanPham => (
        <ChiTietSanPham 
          key={sanPham.id} sanPham={sanPham} 
          capNhatSoLuong={capNhatSoLuong} xoaSanPham={xoaSanPham}
        />
      ))}
    </div>
  );
}

// 3. Component chính của trang Giỏ Hàng
export default function GioHang() {
  // Nạp sẵn dữ liệu mẫu để khi mở lên là có giao diện hoàn chỉnh ngay lập tức
  const [danhSachMua, setDanhSachMua] = useState([
    { id: 1, ten: 'Điện thoại iPhone 15 Pro Max 256GB', giaHienTai: 29990000, soLuongMua: 1, tonKho: 5 },
    { id: 2, ten: 'Tai nghe Apple AirPods Pro Gen 2', giaHienTai: 5590000, soLuongMua: 1, tonKho: 8 }
  ]); 
  
  const [thongTinKhach, setThongTinKhach] = useState({ hoTen: '', soDienThoai: '', diaChi: '' });
  const [maGiamGia, setMaGiamGia] = useState(null);

  return (
    <div style={{ display: 'flex', gap: '30px', padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ flex: 6 }}>
        <h2 style={{ borderBottom: '2px solid #3498db', paddingBottom: '10px', color: '#2c3e50' }}>Giỏ Hàng Của Bạn</h2>
        <DanhSachSanPham danhSachMua={danhSachMua} setDanhSachMua={setDanhSachMua} />
      </div>
      <div style={{ flex: 4 }}>
        <ThanhToan 
          danhSachMua={danhSachMua} 
          thongTinKhach={thongTinKhach} setThongTinKhach={setThongTinKhach}
          maGiamGia={maGiamGia} setMaGiamGia={setMaGiamGia}
        />
      </div>
    </div>
  );
}