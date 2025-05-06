"use client";

import { DataTable } from "@/components/DataTable/DataTable";
import OrderDetailPopup from "./Details";
import { useState } from "react";

export type Order = {
    id: number;
    customerName: string;
    trackingNumber: string;
    createdAt: string;
    total: number;
    status: "pending" | "processing" | "completed" | "cancelled";
    numberOfItems: number;
    items: {
        productId: number;
        productName: string;
        size: string;
        quantity: number;
        price_at_order: number;
        price: number;
    }[];
};

export default function OrdersPage({orders} : {orders: Order[]}) {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleRowClick = (order: Order) => {
        setSelectedOrder(order);
        setIsPopupOpen(true);
    };
    return (
        <div className="p-6">
            <DataTable
                columns={[
                    { title: "Khách hàng", render: (o) => o.customerName },
                    { title: "Ngày đặt", render: (o) => {
                        const date = new Date(o.createdAt);
                        return date.toLocaleDateString('vi-VN');
                    } },
                    { title: "Tổng tiền", render: (o) => `${o.total.toLocaleString()}₫` },
                    { title: "Trạng thái", render: (o) => o.status },
                    { title: "Số lượng sản phẩm", render: (o) => o.numberOfItems },
                    // { title: "Chi tiết", render: (o) => o.items.map(item => item.productName).join(", ") },
                ]}
                data={orders}
                searchable={true}
                searchFields={["customerName", "status"]}
                rowKey={(order) => order.id}
                pagination={true}
                itemsPerPage={10}
                selectable="none"
                onSelectionChange={(selected) => console.log("Selected orders:", selected)}
                onRowClick={(order) => handleRowClick(order)}
                className="p-4 bg-white rounded-lg shadow"
            />
            <OrderDetailPopup
                order={selectedOrder}
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
            />
        </div>
    );
}
