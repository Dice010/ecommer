export default function RegisterForm() {
  return (
    <div className="space-y-4 py-4">
      <input type="text" placeholder="Họ và tên" className="w-full border border-gray-300 p-3 rounded outline-none focus:border-red-500" />
      <input type="text" placeholder="Số điện thoại" className="w-full border border-gray-300 p-3 rounded outline-none focus:border-red-500" />
      <input type="text" placeholder="Tên đăng nhập" className="w-full border border-gray-300 p-3 rounded outline-none focus:border-red-500" />
      <input type="password" placeholder="Mật khẩu" className="w-full border border-gray-300 p-3 rounded outline-none focus:border-red-500" />
      <button className="w-full bg-black text-white py-3 rounded font-bold hover:opacity-90 transition-all">
        TẠO TÀI KHOẢN
      </button>
    </div>
  );
}