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
    totalPrice: string;
    trackingNumber: string | null;
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
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

const OrdersPage = () => {
    const orderOp = new OrderOperation();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<OrderStatus | ''>('');
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

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
        'completed': { text: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200' },
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
            'completed': <CheckCircle2 className="h-5 w-5 text-green-500" />,
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

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading orders...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="text-center py-12 text-red-500">
                    <XCircle className="mx-auto h-12 w-12" />
                    <h3 className="mt-2 text-lg font-medium">Error loading orders</h3>
                    <p className="mt-1 text-sm">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Orders</h1>
                    <p className="text-gray-500 mt-1">View and manage your orders</p>
                </div>
                <button className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <Undo2 className="mr-2 h-4 w-4" />
                    Order History
                </button>
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
                        placeholder="Search orders or products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                </div>

                {/* Status Filter */}
                <div className="relative">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as OrderStatus | '')}
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                    >
                        <option value="">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                {/* Sort Order */}
                <div className="relative">
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>
                </div>
            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
                    <Package className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No orders found</h3>
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
                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Clear filters
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
                                        <h3 className="font-medium text-gray-900">Order #{order.trackingNumber}</h3>
                                        <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-6">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status].text} ${statusColors[order.status].bg}`}>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </span>
                                    <span className="text-lg font-semibold text-gray-900">
                                        {formatPrice(order.totalPrice)}
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
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Order Items */}
                                        <div>
                                            <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
                                            <div className="space-y-3">
                                                {order.orderDetails.map((item, index) => (
                                                    <div key={index} className="flex items-start">
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
                                            <h4 className="font-medium text-gray-900 mb-3">Order Summary</h4>
                                            <div className="bg-gray-50 p-4 rounded-md">
                                                <div className="grid grid-cols-2 gap-y-2 text-sm">
                                                    <div className="text-gray-500">Subtotal</div>
                                                    <div className="text-right">{formatPrice(
                                                        (order.orderDetails.reduce((sum, item) => {
                                                            const price = Number(item.price_at_order) || 0;
                                                            const quantity = Number(item.num) || 0;
                                                            return sum + (price * quantity);
                                                        }, 0)
                                                        ).toString()
                                                    )}
                                                    </div>

                                                    <div className="text-gray-500">Shipping</div>
                                                    <div className="text-right">{formatPrice(
                                                        (Number(order.totalPrice) -
                                                            order.orderDetails.reduce((sum, item) => {
                                                                const price = Number(item.price_at_order) || 0;
                                                                const quantity = Number(item.num) || 0;
                                                                return sum + (price * quantity);
                                                            }, 0)
                                                        ).toString()
                                                    )}</div>

                                                    <div className="font-medium text-gray-900 mt-2">Total</div>
                                                    <div className="font-medium text-gray-900 text-right mt-2">
                                                        {formatPrice(order.totalPrice)}
                                                    </div>
                                                </div>

                                                <div className="mt-4 pt-4 border-t border-gray-200">
                                                    <h5 className="text-sm font-medium text-gray-900 mb-2">Customer Information</h5>
                                                    <div className="text-sm text-gray-500 space-y-1">
                                                        <p>Name: {order.customer.name}</p>
                                                        <p>Email: {order.customer.mail}</p>
                                                    </div>
                                                </div>

                                                {order.trackingNumber && (
                                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                                        <h5 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                                                            <MapPin className="h-4 w-4 mr-1" />
                                                            Shipping Address
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

                                    {order.status === 'completed' && (<div className="mt-6 pt-6 border-t border-gray-200 flex justify-end space-x-3">
                                        {/* <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                            View Invoice
                                        </button> */}

                                        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                                            Buy Again
                                        </button>
                                    </div>)}
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