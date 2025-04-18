import { CartOperation, OrderOperation } from "@/lib/main";
import { X, Plus, Minus, ShoppingBag, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export type ItemInCart = {
    id: string;
    name: string;
    image: string;
    price: number;
    size: string;
    num: number;
};

type Props = {
    activeMenu: string | null;
    setActiveMenu: (menu: string | null) => void;
    cartItems: ItemInCart[];
    addItemQuantity?: (id: string, size: string, quantity: number) => void;
    removeItem?: (id: string) => void;
    fetchData: () => void;
    fee?: number;
};

export default function CartSidebar({
    activeMenu,
    setActiveMenu,
    cartItems,
    fetchData = () => { },
    fee
}: Props) {
    const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const cartOp = new CartOperation();

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.num, 0);
    const shippingFee = fee ?? 30000;
    const total = subtotal + shippingFee;
    const router = useRouter();

    const handleClickProduct = (id: string) => {
        router.push(`/product?productId=${id}`);
    }

    const addItemQuantity = async (id: string, size: string, quantity: number) => {
        const response = await cartOp.addToCart({
            productId: id,
            num: quantity,
            size,
        });
    }

    const handleQuantityChange = async (productid: string, size: string, num: number) => {
        const item = cartItems.find(item => item.id === productid);
        if (item) {
            await addItemQuantity(productid, size, num);
        }
        fetchData();
    };

    const handleRemoveItem = async (id: string, size: string) => {
        const item = cartItems.find(item => item.id === id);
        if (item) {
            await addItemQuantity(id, size, -1000000);
        }
        fetchData();
    };

    return (
        <div
            className={`fixed top-0 right-0 w-full md:w-96 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${activeMenu === "cart" ? "translate-x-0" : "translate-x-full"
                }`}
        >
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b">
                    <div className="flex items-center gap-2">
                        <ShoppingBag size={20} className="text-green-600" />
                        <h3 className="text-lg font-semibold">Giỏ hàng của bạn</h3>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                            {cartItems.length}
                        </span>
                    </div>
                    <button
                        onClick={() => setActiveMenu(null)}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Cart items */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {cartItems.length > 0 ? (
                        <ul className="space-y-6">
                            {cartItems.map((item) => (
                                <li key={item.id + item.size} className="flex gap-4 relative">
                                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0" onClick={() => handleClickProduct(item.id)}>
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <h4 className="text-sm font-medium line-clamp-1" onClick={() => handleClickProduct(item.id)}>{item.name}</h4>
                                            <button
                                                onClick={() => handleRemoveItem(item.id, item.size)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash size={16} />
                                            </button>
                                        </div>
                                        {item.size && (
                                            <p className="text-xs text-gray-500 mt-1">Size: {item.size}</p>
                                        )}
                                        <p className="text-sm font-medium text-green-600 mt-1">
                                            {formatter.format(item.price)}
                                        </p>

                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center border rounded-md">
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, item.size, -1)}
                                                    className="px-2 py-1 text-gray-500 hover:text-green-600 transition-colors"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="px-2 text-sm">{item.num}</span>
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, item.size, 1)}
                                                    className="px-2 py-1 text-gray-500 hover:text-green-600 transition-colors"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <p className="text-sm font-medium">
                                                {formatter.format(item.price * item.num)}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full py-12">
                            <div className="bg-gray-100 p-4 rounded-full mb-4">
                                <ShoppingBag size={32} className="text-gray-400" />
                            </div>
                            <p className="text-gray-500 mb-2">Giỏ hàng của bạn đang trống</p>
                            <p className="text-gray-400 text-sm text-center mb-6">
                                Hãy thêm một vài sản phẩm và quay lại đây nhé
                            </p>
                            <button
                                onClick={() => setActiveMenu(null)}
                                className="text-green-600 border border-green-600 px-4 py-2 rounded-md hover:bg-green-50 transition-colors text-sm font-medium"
                            >
                                Tiếp tục mua sắm
                            </button>
                        </div>
                    )}
                </div>

                {/* Summary */}
                {cartItems.length > 0 && (
                    <div className="border-t px-6 py-4 bg-gray-50">
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Tạm tính</span>
                                <span>{formatter.format(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Phí vận chuyển</span>
                                <span>
                                    {shippingFee === 0
                                        ? "Miễn phí"
                                        : formatter.format(shippingFee)}
                                </span>
                            </div>
                            <div className="pt-2 border-t mt-2">
                                <div className="flex justify-between">
                                    <span className="font-medium">Tổng cộng</span>
                                    <span className="font-medium text-green-600">
                                        {formatter.format(total)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <button className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors font-medium">
                                Thanh toán ngay
                            </button>
                            <button
                                onClick={() => setActiveMenu(null)}
                                className="w-full bg-white text-green-600 border border-green-600 py-2 rounded-md hover:bg-green-50 transition-colors text-sm"
                            >
                                Tiếp tục mua sắm
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}