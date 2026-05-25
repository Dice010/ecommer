'use client';
import { useState } from 'react';
import AuthToggle from '@/components/auth/AuthToggle';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden">
        {/* Gọi component thanh gạt */}
        <AuthToggle activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="p-8">
          {/* Đổi form dựa trên biến activeTab */}
          {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
}