import { formatPrice } from "@/app/utils/format-currency";
import { Product } from "@/types/product";
import { Leaf, Package } from "lucide-react";
import { FiStar } from "react-icons/fi";

type ProductCardProps = {
    product: Product;
    viewMode: "grid" | "list";
    onClick(id: string): void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode, onClick }) => {
    if (viewMode === "list") {
        return (
            <div
                className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow hover:cursor-pointer"
                onClick={() => onClick(product.slug.toString())}
            >
                <div className="w-24 h-24 flex-shrink-0">
                    {product.images && product.images.length ? <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-md transition-transform duration-300 hover:scale-105"
                    /> : <div className="h-full w-full flex items-center justify-center text-gray-400">
                        <Package className="h-8 w-8" />
                    </div>}
                </div>
                <div className="flex-grow">
                    <h3 className="font-medium text-gray-800 line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.type.name}</p>
                    <div className="flex items-center mt-1">
                        <FiStar className="text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-600">{product.rate}</span>
                    </div>
                </div>
                <div className="text-base font-semibold text-[#3e4f3d] whitespace-nowrap">
                    {formatPrice(product.price)}
                </div>
            </div>
        );
    }

    return (
        <div
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow hover:cursor-pointer"
            onClick={() => onClick(product.slug.toString())}
        >
            <div className="aspect-square bg-gray-100">
                {product.images && product.images.length ? <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="object-cover rounded-md transition-transform duration-300 hover:scale-105"
                /> : <div className="h-full w-full flex items-center justify-center text-gray-400">
                    <Leaf className="h-40 w-40" />
                </div>}
            </div>
            <div className="p-4">
                <h3 className="font-medium text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-1">{product.type.name}</p>
                <div className="text-base font-semibold text-[#3e4f3d] mb-2 whitespace-nowrap">
                    {formatPrice(product.price)}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                    <FiStar className="text-yellow-400 mr-1" />
                    {product.rate}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
