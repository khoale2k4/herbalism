import { XCircle } from 'lucide-react';
import Link from 'next/link';

export default function PaymentCancel({
    searchParams,
}: {
    searchParams: {
        code?: string;
        id?: string;
        cancel?: string;
        status?: string;
        orderCode?: string;
    };
}) {
    const { code, id, status, orderCode } = searchParams;

    return (
        <div className="min-h-screen bg-amber-50">
            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-amber-200">
                    <div className="bg-amber-600 p-8 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-500 rounded-full mb-6">
                            <XCircle className="text-white" size={48} />
                        </div>
                        <h1 className="text-3xl font-serif font-bold text-white mb-2">Payment Cancelled</h1>
                        <p className="text-lg text-amber-100">Your order was not completed</p>
                    </div>

                    <div className="p-8 space-y-6">
                        <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
                            <h2 className="text-xl font-semibold text-amber-800 mb-4">Order Status</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Order Number</p>
                                    <p className="font-medium">#{orderCode || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Status</p>
                                    <p className="font-medium capitalize">{status?.toLowerCase() || 'cancelled'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Transaction ID</p>
                                    <p className="font-medium">{id || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Error Code</p>
                                    <p className="font-medium">{code || 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">What Happened?</h2>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <span className="inline-block bg-gray-200 text-gray-800 rounded-full p-1 mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    <span>The payment process was interrupted or cancelled</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="inline-block bg-gray-200 text-gray-800 rounded-full p-1 mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    <span>Your card has not been charged</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="inline-block bg-gray-200 text-gray-800 rounded-full p-1 mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                        </svg>
                                    </span>
                                    <span>The items remain in your shopping cart for your convenience</span>
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link href="/cart" className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-lg text-center transition duration-200">
                                Return to Cart
                            </Link>
                            <Link href="/products" className="flex-1 bg-white border border-amber-600 text-amber-600 hover:bg-amber-50 font-medium py-3 px-6 rounded-lg text-center transition duration-200">
                                Continue Shopping
                            </Link>
                        </div>

                        <div className="pt-6 border-t border-gray-200">
                            <p className="text-center text-gray-600">
                                Need help? <Link href="/contact" className="text-amber-700 hover:underline">Contact our support team</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}