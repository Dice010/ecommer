import React, { useState } from 'react';

// 1. Component Nhập thông tin khách hàng
function ThongTinKhachHang({ thongTin, setThongTin }) {
  const thayDoiDuLieu = (e) => {
    const { name, value } = e.target;
    setThongTin(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div>
        <label>Họ và Tên (*):</label><br/>
        <input type="text" name="hoTen" value={thongTin.hoTen} onChange={thayDoiDuLieu} required style={{ width: '100%' }} />
      </div>
      <div>
        <label>Số điện thoại (*):</label><br/>
        <input type="tel" name="soDienThoai" value={thongTin.soDienThoai} onChange={thayDoiDuLieu} required style={{ width: '100%' }} />
      </div>
      <div>
        <label>Địa chỉ giao hàng (*):</label><br/>
        <textarea name="diaChi" value={thongTin.diaChi} onChange={thayDoiDuLieu} required style={{ width: '100%' }} />
      </div>
    </div>
  );
}

// 2. Component Nhập mã giảm giá
function MaGiamGia({ maGiamGia, setMaGiamGia }) {
  const [maNhap, setMaNhap] = useState('');
  const apDung = () => {
    if (maNhap.trim() !== '') {
      setMaGiamGia({ ma: maNhap, loaiGiam: 'PhanTram', giaTri: 10 }); 
      alert('Áp dụng mã thành công!');
    }
  };

  return (
    <div style={{ marginTop: '15px' }}>
      <label>Mã giảm giá:</label>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input type="text" value={maNhap} onChange={(e) => setMaNhap(e.target.value)} disabled={maGiamGia !== null} />
        {maGiamGia ? <button onClick={() => { setMaGiamGia(null); setMaNhap(''); }}>Gỡ bỏ</button> : <button onClick={apDung}>Áp dụng</button>}
      </div>
    </div>
  );
}

// 3. Component Tổng kết và Đặt hàng (Export ra để đưa vào file GioHang.jsx)
export default function ThanhToan({ danhSachMua, thongTinKhach, setThongTinKhach, maGiamGia, setMaGiamGia }) {
  const [phuongThucThanhToan, setPhuongThucThanhToan] = useState('COD');
  
  const tongTienGoc = danhSachMua.reduce((tong, sp) => tong + (sp.giaHienTai * sp.soLuongMua), 0);
  const tienGiam = maGiamGia ? (maGiamGia.loaiGiam === 'PhanTram' ? (tongTienGoc * maGiamGia.giaTri) / 100 : maGiamGia.giaTri) : 0;
  const tongTienCuoiCung = tongTienGoc - tienGiam;

  const xuLyDatHang = () => {
    if (!thongTinKhach.hoTen || !thongTinKhach.soDienThoai) return alert('Vui lòng điền thông tin!');
    console.log('Dữ liệu lưu DB:', {
      khachHang: thongTinKhach, chiTiet: danhSachMua, tongTien: tongTienCuoiCung, maGiam: maGiamGia?.ma, thanhToan: phuongThucThanhToan
    });
    alert('Đặt hàng thành công!');
  };

  return (
    <div style={{ padding: '15px', background: '#f5f5f5' }}>
      <h2>Thông Tin Thanh Toán</h2>
      <ThongTinKhachHang thongTin={thongTinKhach} setThongTin={setThongTinKhach} />
      <MaGiamGia maGiamGia={maGiamGia} setMaGiamGia={setMaGiamGia} />
      
      <div style={{ marginTop: '15px' }}>
        <p>Tạm tính: {tongTienGoc.toLocaleString()} đ</p>
        <p>Giảm giá: -{tienGiam.toLocaleString()} đ</p>
        <h3>Tổng: {tongTienCuoiCung.toLocaleString()} đ</h3>
      </div>
      
      <div style={{ margin: '15px 0' }}>
        <select value={phuongThucThanhToan} onChange={(e) => setPhuongThucThanhToan(e.target.value)}>
          <option value="COD">Thanh toán khi nhận hàng (COD)</option>
        </select>
      </div>
      <button onClick={xuLyDatHang} style={{ padding: '10px', background: 'blue', color: 'white', width: '100%' }}>Xác Nhận Đặt Hàng</button>
    </div>
  );
}