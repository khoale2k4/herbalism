import { Product } from "@/types/product";
import { FiStar } from "react-icons/fi";

type ProductCardProps = {
    product: Product;
    viewMode: "grid" | "list";
    onClick(id: string): void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode, onClick }) => {
    if (viewMode === "list") {
        return (
            <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow hover:cursor-pointer" onClick={onClick.bind(null, product.id.toString())}>
                <div className="w-24 h-24 flex-shrink-0">
                    <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-md transition-transform duration-300 hover:scale-105"
                    />
                </div>
                <div className="flex-grow">
                    <h3 className="font-medium text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.type.name}</p>
                    <div className="flex items-center mt-1">
                        <FiStar className="text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-600">{product.rate}</span>
                    </div>
                </div>
                <div className="text-lg font-semibold text-green-600">
                    ${product.price.toFixed(2)}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow hover:cursor-pointer" onClick={onClick.bind(null, product.id.toString())}>
            <div className="aspect-square bg-gray-100">
                <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>
            <div className="p-4">
                <h3 className="font-medium text-gray-800 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{product.type.name}</p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <FiStar className="text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-600">{product.rate}</span>
                    </div>
                    <div className="text-lg font-semibold text-green-600">
                        ${product.price.toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;