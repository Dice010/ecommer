import React, { useState } from 'react';

// 1. Component Nhập thông tin khách hàng (Họ tên, SĐT, Địa chỉ)
function ThongTinKhachHang({ thongTin, setThongTin }) {
  const thayDoiDuLieu = (e) => {
    const { name, value } = e.target;
    setThongTin(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div>
        <label style={{ fontWeight: 'bold', fontSize: '14px', color: '#555' }}>Họ và Tên (*):</label>
        <input type="text" name="hoTen" value={thongTin.hoTen} onChange={thayDoiDuLieu} required style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #ccc' }} />
      </div>
      <div>
        <label style={{ fontWeight: 'bold', fontSize: '14px', color: '#555' }}>Số điện thoại (*):</label>
        <input type="tel" name="soDienThoai" value={thongTin.soDienThoai} onChange={thayDoiDuLieu} required style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #ccc' }} />
      </div>
      <div>
        <label style={{ fontWeight: 'bold', fontSize: '14px', color: '#555' }}>Địa chỉ giao hàng (*):</label>
        <textarea name="diaChi" value={thongTin.diaChi} onChange={thayDoiDuLieu} required style={{ width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #ccc', height: '60px', resize: 'none' }} />
      </div>
    </div>
  );
}

// 2. Component Nhập và áp dụng Mã giảm giá (Voucher)
function MaGiamGia({ maGiamGia, setMaGiamGia }) {
  const [maNhap, setMaNhap] = useState('');
  const apDung = () => {
    if (maNhap.trim() !== '') {
      setMaGiamGia({ ma: maNhap, loaiGiam: 'PhanTram', giaTri: 10 }); // Mặc định giảm 10%
      alert('Áp dụng mã giảm giá 10% thành công!');
    }
  };

  return (
    <div style={{ marginTop: '15px', borderTop: '1px dashed #ddd', paddingTop: '15px' }}>
      <label style={{ fontWeight: 'bold', fontSize: '14px', color: '#555' }}>Mã giảm giá (Coupon):</label>
      <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
        <input type="text" value={maNhap} onChange={(e) => setMaNhap(e.target.value)} disabled={maGiamGia !== null} style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="Nhập mã..." />
        {maGiamGia ? (
          <button onClick={() => { setMaGiamGia(null); setMaNhap(''); }} style={{ padding: '8px 12px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Gỡ</button>
        ) : (
          <button onClick={apDung} style={{ padding: '8px 12px', background: '#2c3e50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Áp dụng</button>
        )}
      </div>
    </div>
  );
}

// 3. Component Tổng kết và nút bấm Đặt hàng chính
export default function ThanhToan({ danhSachMua, thongTinKhach, setThongTinKhach, maGiamGia, setMaGiamGia }) {
  const [phuongThucThanhToan, setPhuongThucThanhToan] = useState('COD');
  
  const tongTienGoc = danhSachMua.reduce((tong, sp) => tong + (sp.giaHienTai * sp.soLuongMua), 0);
  const tienGiam = maGiamGia ? (tongTienGoc * maGiamGia.giaTri) / 100 : 0;
  const tongTienCuoiCung = tongTienGoc - tienGiam;

  const xuLyDatHang = () => {
    if (!thongTinKhach.hoTen || !thongTinKhach.soDienThoai || !thongTinKhach.diaChi) {
      return alert('Vui lòng điền đầy đủ thông tin giao hàng!');
    }
    alert(`Đặt hàng thành công!\nTổng tiền thanh toán: ${tongTienCuoiCung.toLocaleString()} đ`);
  };

  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#2c3e50', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Thông Tin Thanh Toán</h3>
      <ThongTinKhachHang thongTin={thongTinKhach} setThongTin={setThongTinKhach} />
      <MaGiamGia maGiamGia={maGiamGia} setMaGiamGia={setMaGiamGia} />
      
      <div style={{ marginTop: '15px', background: '#f8f9fa', padding: '12px', borderRadius: '6px', fontSize: '14px' }}>
        <p style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0' }}><span>Tạm tính:</span> <span>{tongTienGoc.toLocaleString()} đ</span></p>
        <p style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0', color: '#e74c3c' }}><span>Giảm giá:</span> <span>-{tienGiam.toLocaleString()} đ</span></p>
        <h3 style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0 0 0', color: '#2ecc71', borderTop: '1px solid #ddd', paddingTop: '10px' }}><span>Tổng cộng:</span> <span>{tongTienCuoiCung.toLocaleString()} đ</span></h3>
      </div>
      
      <div style={{ margin: '15px 0' }}>
        <select value={phuongThucThanhToan} onChange={(e) => setPhuongThucThanhToan(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
          <option value="COD">Thanh toán khi nhận hàng (COD)</option>
        </select>
      </div>
      <button onClick={xuLyDatHang} style={{ padding: '12px', background: '#e67e22', color: 'white', width: '100%', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>XÁC NHẬN ĐẶT HÀNG</button>
    </div>
  );
}