import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-amber-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-amber-200">
          <div className="bg-green-700 p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-6">
              <CheckCircle className="text-white" size={48} />
            </div>
            <h1 className="text-3xl font-serif font-bold text-white mb-2">Payment Successful</h1>
            <p className="text-lg text-green-100">Thank you for your purchase!</p>
          </div>

          <div className="p-8 space-y-6">
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h2 className="text-xl font-semibold text-green-800 mb-4">Order Details</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Order Number</p>
                  <p className="font-medium">#1747323607119</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{new Date().toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-medium">$49.99</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-medium">Credit Card</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
              <h2 className="text-xl font-semibold text-amber-800 mb-4">What's Next?</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="inline-block bg-amber-100 text-amber-800 rounded-full p-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span>You'll receive an order confirmation email shortly</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-amber-100 text-amber-800 rounded-full p-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span>Your order will be processed within 24 hours</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-amber-100 text-amber-800 rounded-full p-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span>Shipping details will be sent to your email once dispatched</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/orders" className="flex-1 bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-6 rounded-lg text-center transition duration-200">
                View Order Details
              </Link>
              <Link href="/shop" className="flex-1 bg-white border border-green-700 text-green-700 hover:bg-green-50 font-medium py-3 px-6 rounded-lg text-center transition duration-200">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}