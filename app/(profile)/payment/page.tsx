'use client';
import { formatPrice } from "@/app/utils/format-currency";
import { OrderOperation } from "@/lib/main";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentQR() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const orderOp = new OrderOperation();

    const [formData, setFormData] = useState<{
        price?: number;
        trackingNumber?: string;
    }>({

    });

    // "totalPrice": "357000.00",
    // "shippingFee": "30000.00",
    // "trackingNumber": "ORDER_0000035_20250514",
    const fetchOrder = async () => {
        const response = await orderOp.getByTrackingNumber(orderId ?? "");
        if (response.success) {
            const order = response.data;
            setFormData({
                price: Number(order.shippingFee) + Number(order.totalPrice),
                trackingNumber: order.trackingNumber
            })
        }
    }

    useEffect(() => {
        fetchOrder();
    }, [orderId]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                    QR Payment
                </h2>
                <p className="text-center text-gray-600 mb-6">
                    Scan the QR code below with your banking app to proceed with payment
                </p>

                <div className="flex justify-center mb-6">
                    <Image
                        src="/img/qr-payment.png"
                        alt="QR Code"
                        width={200}
                        height={200}
                        className="rounded-xl border border-gray-300"
                    />
                </div>

                <div className="text-sm text-gray-700 bg-gray-100 rounded-lg p-4">
                    <p><strong>Receiver:</strong> LE PHUC THINH</p>
                    <p><strong>Bank:</strong> Vietcombank (VCB)</p>
                    <p><strong>Account:</strong> 0501000166665</p>
                    <p><strong>Amount:</strong> {formData.price ? formatPrice(formData.price) : ". . ."}</p>
                    <p><strong>Content:</strong> Thanh toan don hang #{formData.trackingNumber}</p>
                </div>

                <div className="mt-6 text-center text-gray-500 text-xs">
                    <p>After payment, the system will verify and notify you automatically.</p>
                </div>
            </div>
        </div>
    );
}
