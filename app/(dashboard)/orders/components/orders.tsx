import React, { useState, useEffect } from 'react';
import {
    Package,
    Clock,
    CheckCircle2,
    XCircle,
    Search,
    Truck,
    CreditCard,
    Undo2,
    ChevronDown,
    ChevronRight,
    MapPin
} from 'lucide-react';
import { OrderOperation } from '@/lib/main';
import { getTokenFromCookie } from '@/app/utils/token';
import { getOrders } from '@/app/utils/localOrder';
import { useLanguage } from '@/hooks/useLanguage';

// Types
type OrderStatus = 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled';

interface Address {
    id: string;
    customerId: string;
    firstName: string;
    lastName: string;
    address: string;
    country: string;
    apartment: string;
    city: string;
    province: string;
    zipCode: string;
    createdAt: string;
    updatedAt: string;
}

interface Order {
    id: string;
    customerId: string;
    addressId: string | null;
    totalPrice: number;
    trackingNumber: string | null;
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
    shippingFee: number;
    customer: {
        id: string;
        name: string;
        mail: string;
    };
    orderDetails: {
        id: string;
        orderId: string;
        productId: string;
        size: string;
        num: number;
        price_at_order: string;
        product: {
            id: string;
            name: string;
            price: string;
        };
    }[];
    address: Address;
}

// Confirmation Modal Component
const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText,
    cancelText,
    confirmColor = 'bg-green-600 hover:bg-green-700',
}: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    confirmColor?: string;
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">{message}</p>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-lg">
                    <button
                        type="button"
                        className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${confirmColor} text-base font-medium text-white focus:outline-none sm:ml-3 sm:w-auto sm:text-sm`}
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                    <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={onClose}
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    );
};

const OrdersPage = () => {
    const orderOp = new OrderOperation();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<OrderStatus | ''>('');
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

    // State for confirmation modals
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const token = getTokenFromCookie();
                if (!token) {
                    const orderIds = getOrders();
                    const orders = await Promise.all(
                        orderIds.map(async (id: string) => {
                            const response = await orderOp.getById(id);
                            if (response.success) {
                                return response.data;
                            }
                            return null;
                        })
                    );

                    const filteredOrders = orders.filter((order): order is Order => order !== null);
                    setOrders(filteredOrders);
                } else {
                    const response = await orderOp.getMy(token);

                    if (response.success) {
                        setOrders(response.data);
                    } else {
                        setError(response.message || 'Failed to fetch orders');
                    }
                }
            } catch (err) {
                setError('An error occurred while fetching orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const statusColors = {
        'pending': { text: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-200' },
        'processing': { text: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200' },
        'shipped': { text: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200' },
        'completed': { text: 'text-[#3e4f3d]', bg: 'bg-green-50', border: 'border-[#3e4f3d]' },
        'cancelled': { text: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' }
    };

    const formatAddress = (address: Address) => {
        const parts = [
            address.apartment,
            address.address,
            address.city,
            address.province,
            address.zipCode,
            address.country
        ].filter(Boolean);
        return parts.join(', ');
    };

    const OrderStatusIcon = ({ status }: { status: OrderStatus }) => {
        const iconMap = {
            'completed': <CheckCircle2 className="h-5 w-5 text-[#3e4f3d]" />,
            'shipped': <Truck className="h-5 w-5 text-blue-500" />,
            'cancelled': <XCircle className="h-5 w-5 text-red-500" />,
            'processing': <Clock className="h-5 w-5 text-blue-500" />,
            'pending': <Clock className="h-5 w-5 text-yellow-500" />
        };

        return iconMap[status] || <Clock className="h-5 w-5 text-gray-500" />;
    };

    const filteredOrders = orders
        .filter(order =>
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.orderDetails.some(item =>
                item.product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        .filter(order =>
            filterStatus ? order.status === filterStatus : true
        )
        .sort((a, b) => {
            if (sortOrder === 'newest') {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        });

    const toggleOrderExpansion = (orderId: string) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    const formatDate = (dateString: string) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, undefined);
    };

    const formatPrice = (price: string) => {
        return parseFloat(price).toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND'
        });
    };

    const handleOpenCancelModal = (order: Order) => {
        setSelectedOrder(order);
        setShowCancelModal(true);
    };

    const handleOpenConfirmModal = (order: Order) => {
        setSelectedOrder(order);
        setShowConfirmModal(true);
    };

    const handleCancelOrder = async () => {
        if (!selectedOrder) return;

        setIsProcessing(true);
        try {
            const response = await orderOp.updateStatus('confirmCancelled', selectedOrder.id);
            if (response.success) {
                // Update the order status in the local state
                setOrders(orders.map(order =>
                    order.id === selectedOrder.id ? { ...order, status: 'cancelled' } : order
                ));
            }
        } finally {
            setIsProcessing(false);
            setShowCancelModal(false);
            setSelectedOrder(null);
        }
    };

    const handleConfirmOrder = async () => {
        if (!selectedOrder) return;

        setIsProcessing(true);
        try {
            const response = await orderOp.updateStatus('confirmDelivered', selectedOrder.id);
            if (response.success) {
                // Update the order status in the local state
                setOrders(orders.map(order =>
                    order.id === selectedOrder.id ? { ...order, status: 'completed' } : order
                ));
            }
        } finally {
            setIsProcessing(false);
            setShowConfirmModal(false);
            setSelectedOrder(null);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4 text-gray-600">{t.orders.loadingOrders}</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="text-center py-12 text-red-500">
                    <XCircle className="mx-auto h-12 w-12" />
                    <h3 className="mt-2 text-lg font-medium">{t.orders.errorLoadOrders}</h3>
                    <p className="mt-1 text-sm">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Cancel Order Confirmation Modal */}
            <ConfirmationModal
                isOpen={showCancelModal}
                onClose={() => setShowCancelModal(false)}
                onConfirm={handleCancelOrder}
                title={t.orders.cancelOrder.title}
                message={t.orders.cancelOrder.message}
                confirmText={isProcessing ? t.orders.processing : t.orders.cancelOrder.confirm}
                cancelText={t.orders.cancelOrder.cancel}
                confirmColor="bg-red-600 hover:bg-red-700"
            />

            {/* Confirm Order Received Modal */}
            <ConfirmationModal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={handleConfirmOrder}
                title={t.orders.receiveOrder.title}
                message={t.orders.receiveOrder.message}
                confirmText={isProcessing ? t.orders.processing : t.orders.receiveOrder.confirm}
                cancelText={t.orders.receiveOrder.cancel}
            />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{t.orders.title}</h1>
                    <p className="text-gray-500 mt-1">{t.orders.description}</p>
                </div>
                {/* <button className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <Undo2 className="mr-2 h-4 w-4" />
                    {t.orders.orderHistory}
                </button> */}
            </div>

            {/* Search and Filter Section */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search Input */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder={t.orders.searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3e4f3d] focus:border-[#3e4f3d] sm:text-sm"
                    />
                </div>

                {/* Status Filter */}
                <div className="relative">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as OrderStatus | '')}
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3e4f3d] focus:border-[#3e4f3d] sm:text-sm rounded-md"
                    >
                        <option value="">{t.orders.status.all}</option>
                        <option value="pending">{t.orders.status.pending}</option>
                        <option value="processing">{t.orders.status.processing}</option>
                        <option value="shipped">{t.orders.status.shipped}</option>
                        <option value="completed">{t.orders.status.completed}</option>
                        <option value="cancelled">{t.orders.status.cancelled}</option>
                    </select>
                </div>

                {/* Sort Order */}
                <div className="relative">
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3e4f3d] focus:border-[#3e4f3d] sm:text-sm rounded-md"
                    >
                        <option value="newest">{t.orders.newest}</option>
                        <option value="oldest">{t.orders.oldest}</option>
                    </select>
                </div>
            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
                    <Package className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">{t.orders.noOrders}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {searchTerm || filterStatus ?
                            "Try adjusting your search or filter criteria" :
                            "You haven't placed any orders yet"}
                    </p>
                    {(searchTerm || filterStatus) && (
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setFilterStatus('');
                            }}
                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#7d8b40] hover:bg-[#6e7a34] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3e4f3d]"
                        >
                            {t.orders.clearFilter}
                        </button>
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredOrders.map(order => (
                        <div
                            key={order.id}
                            className={`border rounded-lg overflow-hidden ${statusColors[order.status].border} transition-all duration-200`}
                        >
                            <div
                                className={`p-4 cursor-pointer ${statusColors[order.status].bg} flex justify-between items-center`}
                                onClick={() => toggleOrderExpansion(order.id)}
                            >
                                <div className="flex items-center space-x-4">
                                    <OrderStatusIcon status={order.status} />
                                    <div>
                                        <h3 className="font-medium text-gray-900">{t.orders.orderTracking}{order.trackingNumber}</h3>
                                        <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-6">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status].text} ${statusColors[order.status].bg}`}>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </span>
                                    <span className="text-lg font-semibold text-gray-900">
                                    {formatPrice((Number(order.totalPrice) + Number(order.shippingFee)).toString())}
                                    </span>
                                    {expandedOrder === order.id ? (
                                        <ChevronDown className="h-5 w-5 text-gray-500" />
                                    ) : (
                                        <ChevronRight className="h-5 w-5 text-gray-500" />
                                    )}
                                </div>
                            </div>

                            {expandedOrder === order.id && (
                                <div className="bg-white p-4 border-t">
                                    <div className={`
                                        bg-white border-t
                                        transition-all duration-300 ease-in-out
                                        overflow-hidden
                                        ${expandedOrder === order.id ?
                                            "max-h-[1000px] opacity-100 p-4" :
                                            "max-h-0 opacity-0 p-0 border-t-0"}
                                        `}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Order Items */}
                                            <div>
                                                <h4 className="font-medium text-gray-900 mb-3">{t.orders.items}</h4>
                                                <div className="space-y-3">
                                                    {order.orderDetails.map((item, index) => (
                                                        <div key={index} className="flex items-start"
                                                            style={{
                                                                transitionDelay: expandedOrder === order.id ? `${index * 50}ms` : '0ms',
                                                                opacity: expandedOrder === order.id ? 1 : 0.5
                                                            }}>
                                                            <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden bg-gray-100">
                                                                <div className="h-full w-full flex items-center justify-center text-gray-400">
                                                                    <Package className="h-8 w-8" />
                                                                </div>
                                                            </div>
                                                            <div className="ml-4 flex-1">
                                                                <h5 className="text-sm font-medium text-gray-900">{item.product.name}</h5>
                                                                <p className="text-sm text-gray-500">Size: {item.size}</p>
                                                                <p className="text-sm text-gray-500">Qty: {item.num}</p>
                                                            </div>
                                                            <div className="ml-4 text-sm font-medium text-gray-900">
                                                                {formatPrice(item.price_at_order)}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Order Summary */}
                                            <div>
                                                <h4 className="font-medium text-gray-900 mb-3">{t.orders.orderSummary}</h4>
                                                <div className="bg-gray-50 p-4 rounded-md">
                                                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                                                        <div className="text-gray-500">{t.orders.subtotal}</div>
                                                        <div className="text-right">{formatPrice(order.totalPrice.toString())}
                                                        </div>

                                                        <div className="text-gray-500">{t.orders.shipping}</div>
                                                        <div className="text-right">{formatPrice(order.shippingFee.toString())}</div>

                                                        <div className="font-medium text-gray-900 mt-2">{t.orders.total}</div>
                                                        <div className="font-medium text-gray-900 text-right mt-2">
                                                            {formatPrice((Number(order.totalPrice) + Number(order.shippingFee)).toString())}
                                                        </div>
                                                    </div>

                                                    {order.customer.name !== 'GUEST' && <div className="mt-4 pt-4 border-t border-gray-200">
                                                        <h5 className="text-sm font-medium text-gray-900 mb-2">{t.orders.subtotal}</h5>
                                                        <div className="text-sm text-gray-500 space-y-1">
                                                            <p>{t.orders.name} {order.customer.name}</p>
                                                            <p>{t.orders.email} {order.customer.mail}</p>
                                                        </div>
                                                    </div>}

                                                    {order.trackingNumber && (
                                                        <div className="mt-4 pt-4 border-t border-gray-200">
                                                            <h5 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                                                                <MapPin className="h-4 w-4 mr-1" />
                                                                {t.orders.shippingAddress}
                                                            </h5>
                                                            <div className="text-sm text-gray-500 space-y-1">
                                                                <p>
                                                                    {order.address?.firstName} {order.address?.lastName}
                                                                </p>
                                                                <p>{formatAddress(order.address)}</p>
                                                                {order.trackingNumber && (
                                                                    <p className="mt-2">Tracking: {order.trackingNumber}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {(order.status === 'pending' || order.status === 'processing') && (
                                            <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end space-x-3">
                                                <button
                                                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm 
             text-red-700 bg-red-100 hover:bg-red-200 
             transform transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                                                    onClick={() => handleOpenCancelModal(order)}
                                                >
                                                    {t.orders.cancel}
                                                </button>
                                            </div>
                                        )}

                                        {order.status === 'shipped' && (
                                            <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end space-x-3">
                                                <button
                                                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm 
             text-[#3e4f3d] bg-green-100 hover:bg-green-200 
             transform transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                                                    onClick={() => handleOpenConfirmModal(order)}
                                                >
                                                    {t.orders.received}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrdersPage;