export default function LoginForm() {
  return (
    <div className="space-y-4 py-4">
      <input 
        type="text" 
        placeholder="Tên đăng nhập" 
        className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-red-500 outline-none"
      />
      <input 
        type="password" 
        placeholder="Mật khẩu" 
        className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-red-500 outline-none"
      />
      <button className="w-full bg-red-600 text-white py-3 rounded font-bold hover:bg-red-700 transition-all">
        ĐĂNG NHẬP
      </button>
      <p className="text-sm text-blue-600 text-right cursor-pointer hover:underline">Quên mật khẩu?</p>
    </div>
  );
}