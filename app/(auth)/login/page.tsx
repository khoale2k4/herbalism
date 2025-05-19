'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthOperation } from '@/lib/main';
import { removeTokenFromCookie, setTokenInCookie } from '@/app/utils/token';
import { delay } from '@/app/utils/delay';
import { useLanguage } from '@/hooks/useLanguage';

const Login = () => {
    const { t } = useLanguage();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const authOp = new AuthOperation();
    const [notify, setNotify] = useState<string | null>(null);
    const duration = 3000;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await authOp.login(email, password);
            if (response.success) {
                await delay(duration);
                setTokenInCookie(response.data.token); // Đảm bảo cookie có SameSite=None; Secure
                localStorage.setItem('user', JSON.stringify(response.data.info));
                console.log('Redirecting to / with token:', response.data.token);
                router.push('/'); // Thay window.location.href
            } else {
                console.log('Login failed:', response.message);
                setNotify("Sai tài khoản hoặc mật khẩu");
            }
        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
            setNotify("Đã xảy ra lỗi, vui lòng thử lại");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        console.log('Đăng nhập với Google');
    };

    useEffect(() => {
        // Xóa comment removeTokenFromCookie nếu cần, nhưng tránh chạy mỗi khi authOp thay đổi
        // console.log('useEffect ran, authOp:', authOp);
    }, []); // Loại bỏ dependency [authOp] vì authOp không thay đổi

    return (
        <div className="max-w-screen mx-auto">
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
                {/* Xóa các div animate-blob để tránh WebKit overload */}
                <div className="w-full max-w-md px-6 py-8 bg-white rounded-xl shadow-lg z-50">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <div className="relative w-32 h-16">
                            <Image
                                src="/img/logo-image.png"
                                alt="Company Logo"
                                fill
                                className="object-contain"
                                priority={false} // Tắt priority để tối ưu tải
                            />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6" suppressHydrationWarning>
                        {t.loginPageText.title}
                    </h2>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                                {t.loginPageText.form.email.label}
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setNotify(null);
                                }}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                                placeholder={t.loginPageText.form.email.placeholder}
                                required
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                                    {t.loginPageText.form.password.label}
                                </label>
                                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                                    {t.loginPageText.form.password.forgotPassword}
                                </Link>
                            </div>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setNotify(null);
                                }}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                                placeholder="••••••••"
                                required
                            />
                            {notify && <p className="text-red-500 text-sm mt-2">{notify}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {t.loginPageText.form.submitButton.loading}
                                </>
                            ) : (
                                t.loginPageText.form.submitButton.default
                            )}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-600">
                        {t.loginPageText.links.register.text + " "}
                        <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                            {t.loginPageText.links.register.action}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;