import React, { useState } from 'react';
import {
    Package,
    Clock,
    CheckCircle2,
    XCircle,
    Search,
    Filter,
    ArrowUpDown,
    ChevronDown,
    ChevronRight,
    Truck,
    CreditCard,
    Undo2
} from 'lucide-react';

// Mock Order Data (replace with actual API data)
const mockOrders = [
    {
        id: 'ORD-2024-001',
        date: '2024-03-15',
        status: 'Completed',
        total: 129.99,
        items: [
            { name: 'Herbal Immunity Blend', quantity: 2, price: 49.99, image: '/products/herbal-blend.jpg' },
            { name: 'Stress Relief Tincture', quantity: 1, price: 29.99, image: '/products/tincture.jpg' }
        ],
        shipping: {
            method: 'Standard',
            tracking: 'UPS-123456789',
            estimatedDelivery: '2024-03-20'
        },
        paymentMethod: 'Visa •••• 4242'
    },
    {
        id: 'ORD-2024-002',
        date: '2024-02-28',
        status: 'Shipped',
        total: 89.97,
        items: [
            { name: 'Sleep Support Capsules', quantity: 1, price: 59.99, image: '/products/capsules.jpg' },
            { name: 'Digestive Health Tea', quantity: 1, price: 29.98, image: '/products/tea.jpg' }
        ],
        shipping: {
            method: 'Express',
            tracking: 'FEDEX-987654321',
            estimatedDelivery: '2024-03-05'
        },
        paymentMethod: 'Mastercard •••• 5555'
    },
    {
        id: 'ORD-2024-003',
        date: '2024-01-15',
        status: 'Cancelled',
        total: 45.99,
        items: [
            { name: 'Energy Boost Supplement', quantity: 1, price: 45.99, image: '/products/supplement.jpg' }
        ],
        shipping: null,
        paymentMethod: 'PayPal'
    },
    {
        id: 'ORD-2024-004',
        date: '2024-04-01',
        status: 'Processing',
        total: 75.98,
        items: [
            { name: 'Detox Cleansing Powder', quantity: 1, price: 39.99, image: '/products/powder.jpg' },
            { name: 'Skin Care Balm', quantity: 1, price: 35.99, image: '/products/balm.jpg' }
        ],
        shipping: null,
        paymentMethod: 'Amex •••• 1234'
    }
];

// Status Color Mapping
const statusColors = {
    'Completed': { text: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200' },
    'Shipped': { text: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200' },
    'Cancelled': { text: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' },
    'Processing': { text: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-200' }
};

// Order Status Icon Component
const OrderStatusIcon = ({ status }: { status: 'Completed' | 'Shipped' | 'Cancelled' | 'Processing' }) => {
    const iconMap = {
        'Completed': <CheckCircle2 className="h-5 w-5 text-green-500" />,
        'Shipped': <Truck className="h-5 w-5 text-blue-500" />,
        'Cancelled': <XCircle className="h-5 w-5 text-red-500" />,
        'Processing': <Clock className="h-5 w-5 text-yellow-500" />
    };

    return iconMap[status] || <Clock className="h-5 w-5 text-gray-500" />;
};

const OrdersPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [sortOrder, setSortOrder] = useState('newest');
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

    // Filtering and Sorting Logic
    const filteredOrders = mockOrders
        .filter(order =>
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.items.some(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        .filter(order =>
            filterStatus ? order.status === filterStatus : true
        )
        .sort((a, b) => {
            if (sortOrder === 'newest') {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            }
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });

    const toggleOrderExpansion = (orderId: string) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    const formatDate = (dateString: string) => {
        const options = { year: "numeric" as const, month: "short" as const, day: "numeric" as const };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

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
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                    >
                        <option value="">All Statuses</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>

                {/* Sort Order */}
                <div className="relative">
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
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
                            className={`border rounded-lg overflow-hidden ${statusColors[order.status as keyof typeof statusColors].border} transition-all duration-200`}
                        >
                            <div
                                className={`p-4 cursor-pointer ${statusColors[order.status as keyof typeof statusColors].bg} flex justify-between items-center`}
                                onClick={() => toggleOrderExpansion(order.id)}
                            >
                                <div className="flex items-center space-x-4">
                                    <OrderStatusIcon status={order.status as 'Completed' | 'Shipped' | 'Cancelled' | 'Processing'} />
                                    <div>
                                        <h3 className="font-medium text-gray-900">{order.id}</h3>
                                        <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-6">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status as keyof typeof statusColors].text} ${statusColors[order.status as keyof typeof statusColors].bg}`}>
                                        {order.status}
                                    </span>
                                    <span className="text-lg font-semibold text-gray-900">${order.total.toFixed(2)}</span>
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
                                                {order.items.map((item, index) => (
                                                    <div key={index} className="flex items-start">
                                                        <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden bg-gray-100">
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="h-full w-full object-cover object-center"
                                                            />
                                                        </div>
                                                        <div className="ml-4 flex-1">
                                                            <h5 className="text-sm font-medium text-gray-900">{item.name}</h5>
                                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                        </div>
                                                        <div className="ml-4 text-sm font-medium text-gray-900">
                                                            ${(item.price * item.quantity).toFixed(2)}
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
                                                    <div className="text-right">${order.total.toFixed(2)}</div>

                                                    <div className="text-gray-500">Shipping</div>
                                                    <div className="text-right">$0.00</div>

                                                    <div className="text-gray-500">Tax</div>
                                                    <div className="text-right">$0.00</div>

                                                    <div className="font-medium text-gray-900 mt-2">Total</div>
                                                    <div className="font-medium text-gray-900 text-right mt-2">${order.total.toFixed(2)}</div>
                                                </div>

                                                <div className="mt-4 pt-4 border-t border-gray-200">
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <CreditCard className="h-4 w-4 mr-2" />
                                                        {order.paymentMethod}
                                                    </div>
                                                </div>

                                                {order.shipping && (
                                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                                        <h5 className="text-sm font-medium text-gray-900 mb-2">Shipping Information</h5>
                                                        <div className="text-sm text-gray-500 space-y-1">
                                                            <p>Method: {order.shipping.method}</p>
                                                            <p>Tracking: {order.shipping.tracking}</p>
                                                            <p>Estimated Delivery: {formatDate(order.shipping.estimatedDelivery)}</p>
                                                        </div>
                                                        <button className="mt-3 inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                                            Track Package
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end space-x-3">
                                        <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                            View Invoice
                                        </button>
                                        {order.status === 'Completed' && (
                                            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                                                Buy Again
                                            </button>
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