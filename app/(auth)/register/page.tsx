'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { AuthOperation } from '@/lib/main';
import { useRouter } from 'next/navigation';

const Register = () => {
    const { t } = useLanguage();
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [notification, setNotification] = useState<{
        type: 'success' | 'error';
        message: string;
    } | null>(null);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };
    const [passwordStrength, setPasswordStrength] = useState(0);
    const authOp = new AuthOperation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }

        // Password strength calculation
        if (name === 'password') {
            calculatePasswordStrength(value);
        }
    };

    const calculatePasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        setPasswordStrength(strength);
    };

    const getStrengthColor = () => {
        if (passwordStrength === 0) return 'bg-gray-200';
        if (passwordStrength === 1) return 'bg-red-500';
        if (passwordStrength === 2) return 'bg-yellow-500';
        if (passwordStrength === 3) return 'bg-blue-500';
        return 'bg-green-500';
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = t.registerPage.errorMessages.fullName.required;
        }

        if (!formData.email.trim()) {
            newErrors.email = t.registerPage.errorMessages.email.required;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t.registerPage.errorMessages.email.invalid;
        }

        if (!formData.password) {
            newErrors.password = t.registerPage.errorMessages.password.required;
        } else if (formData.password.length < 8) {
            newErrors.password = t.registerPage.errorMessages.password.minLength;
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = t.registerPage.errorMessages.confirmPassword.mismatch;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        setIsLoading(true);
        try {
            const response = await authOp.register(formData.email, formData.password, formData.fullName);
            if (response.success) {
                setNotification({
                    type: 'success',
                    message: t.registerPage.notification.success
                });

                setFormData({
                    fullName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
                await new Promise(resolve => setTimeout(resolve, 3000));
                router.push('/login');
            } else {
                console.log(response.message,  response.message === "Tài khoản đã tồn tại")
                if (response.message === "Tài khoản đã tồn tại") {
                    setNotification({
                        type: 'error',
                        message: t.registerPage.notification.existedEmail
                    });
                } else {
                    setNotification({
                        type: 'error',
                        message: t.registerPage.notification.error
                    });
                }
            }
        } catch (error) {
            console.error('Lỗi đăng ký:', error);
            setNotification({
                type: 'error',
                message: t.registerPage.notification.error
            });
        } finally {
            setIsLoading(false);
            setTimeout(() => {
                setNotification(null);
            }, 5000);
        }
    };

    const handleGoogleSignup = () => {
        // Xử lý đăng ký bằng Google
        console.log('Đăng ký với Google');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 bg-cover">
            {/* Decorative elements */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {notification && (
                <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                    } text-white animate-fade-in-down`}>
                    <div className="flex items-center">
                        {notification.type === 'success' ? (
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        )}
                        <span>{notification.message}</span>
                    </div>
                </div>
            )}

            <div className="w-full max-w-md px-6 py-8 bg-white rounded-xl shadow-lg z-10">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <div className="relative w-32 h-16">
                        <Image
                            src="/img/logo-image.png"
                            alt="Company Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">{t.registerPage.title}</h2>
                <p className="text-center text-gray-600 mb-6">{t.registerPage.subtitle}</p>

                {/* Social Registration */}
                {/* <div className="mb-6">
                    <button
                        onClick={handleGoogleSignup}
                        type="button"
                        className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300"
                    >
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        Đăng ký với Google
                    </button>
                </div> */}

                {/* Divider */}
                {/* <div className="relative flex items-center justify-center mb-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-sm text-gray-500">Hoặc đăng ký với Email</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div> */}

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fullName">
                            {t.registerPage.fullName}
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 ${errors.fullName ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder={t.registerPage.placeholder.fullName}
                        />
                        {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                            {t.registerPage.email}
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder={t.registerPage.placeholder.email}
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                            {t.registerPage.password}
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 ${errors.password ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="••••••••"
                        />
                        {formData.password && (
                            <div className="mt-1">
                                <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${getStrengthColor()} transition-all duration-300`}
                                        style={{ width: `${(passwordStrength / 4) * 100}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    {passwordStrength === 0 && t.registerPage.strength[0]}
                                    {passwordStrength === 1 && t.registerPage.strength[1]}
                                    {passwordStrength === 2 && t.registerPage.strength[2]}
                                    {passwordStrength === 3 && t.registerPage.strength[3]}
                                    {passwordStrength === 4 && t.registerPage.strength[4]}
                                </p>
                            </div>
                        )}
                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="confirmPassword">
                            {t.registerPage.confirmPassword}
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="••••••••"
                        />
                        {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                    </div>

                    <div className="flex items-center mt-2">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                            {t.registerPage.terms.label} <a href="/terms" className="text-indigo-600 hover:text-indigo-800">{t.registerPage.terms.terms}</a> {t.registerPage.terms.and}{' '}
                            <a href="/privacy" className="text-indigo-600 hover:text-indigo-800">{t.registerPage.terms.privacy}</a> {t.registerPage.terms.suffix}
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !isChecked}
                        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 mt-6 ${isLoading || !isChecked ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {t.registerPage.submit.loading}
                            </>
                        ) : (
                            t.registerPage.submit.default
                        )}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    {t.registerPage.loginPrompt.text}{' '}
                    <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                        {t.registerPage.loginPrompt.link}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;