// components/OrderDetailPopup.tsx
"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Order } from "./OrdersTable";

export default function OrderDetailPopup({
    order,
    isOpen,
    onClose,
}: {
    order: Order | null;
    isOpen: boolean;
    onClose: () => void;
}) {
    if (!order) return null;

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Chi tiết đơn hàng #{order.trackingNumber}
                                </Dialog.Title>

                                <div className="mt-4 space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="font-medium text-gray-700">Khách hàng</h4>
                                            <p>{order.customerName}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-700">Ngày đặt</h4>
                                            <p>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-700">Tổng tiền</h4>
                                            <p>{order.total.toLocaleString()}₫</p>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-700">Trạng thái</h4>
                                            <p className="capitalize">{order.status}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-medium text-gray-700 mb-2">Sản phẩm</h4>
                                        <div className="border rounded-lg overflow-hidden">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Sản phẩm
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Size
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Số lượng
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Giá
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {order.items.map((item) => (
                                                        <tr key={`${item.productId}-${item.size}`}>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                {item.productName}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                {item.size}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                {item.quantity}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                {item.price_at_order.toLocaleString()}₫
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={onClose}
                                    >
                                        Đóng
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}