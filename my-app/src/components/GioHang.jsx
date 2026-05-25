import React, { useState } from 'react';
import ThanhToan from './ThanhToan'; // Import file thứ 2 vào

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
    if (sanPham.soLuongMua > 1) {
      capNhatSoLuong(sanPham.id, sanPham.soLuongMua - 1);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc', padding: '10px 0' }}>
      <div>
        <h4>{sanPham.ten}</h4>
        <p>Giá: {sanPham.giaHienTai.toLocaleString()} đ</p>
      </div>
      <div>
        <button onClick={giamSoLuong}>-</button>
        <span style={{ margin: '0 10px' }}>{sanPham.soLuongMua}</span>
        <button onClick={tangSoLuong}>+</button>
      </div>
      <div>
        <p>Tổng: {(sanPham.giaHienTai * sanPham.soLuongMua).toLocaleString()} đ</p>
        <button onClick={() => xoaSanPham(sanPham.id)} style={{ color: 'red' }}>Xóa</button>
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

  if (danhSachMua.length === 0) return <p>Giỏ hàng đang trống.</p>;

  return (
    <div>
      {danhSachMua.map(sanPham => (
        <ChiTietSanPham 
          key={sanPham.id} sanPham={sanPham} 
          capNhatSoLuong={capNhatSoLuong} xoaSanPham={xoaSanPham}
        />
      ))}
    </div>
  );
}

// 3. Component chính (Export ra ngoài để App.js gọi)
export default function GioHang() {
  const [danhSachMua, setDanhSachMua] = useState([]); 
  const [thongTinKhach, setThongTinKhach] = useState({ hoTen: '', soDienThoai: '', diaChi: '' });
  const [maGiamGia, setMaGiamGia] = useState(null);

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <div style={{ flex: 6 }}>
        <h2>Giỏ Hàng Của Bạn</h2>
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