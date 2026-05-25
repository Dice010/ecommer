interface AuthToggleProps {
  activeTab: 'login' | 'register';
  setActiveTab: (tab: 'login' | 'register') => void;
}

export default function AuthToggle({ activeTab, setActiveTab }: AuthToggleProps) {
  return (
    <div className="bg-[#FF452F] p-4 flex justify-center items-center text-white font-bold text-lg shadow-md">
      <button
        onClick={() => setActiveTab('register')}
        className={`px-4 transition-all ${activeTab === 'register' ? 'text-yellow-300 scale-110' : 'opacity-80 hover:opacity-100'}`}
      >
        Đăng Ký
      </button>
      
      <span className="mx-2 text-white/50">|</span>
      
      <button
        onClick={() => setActiveTab('login')}
        className={`px-4 transition-all ${activeTab === 'login' ? 'text-yellow-300 scale-110' : 'opacity-80 hover:opacity-100'}`}
      >
        Đăng Nhập
      </button>
    </div>
  );
}