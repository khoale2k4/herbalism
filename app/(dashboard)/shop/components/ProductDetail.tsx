"use client";

import { useEffect, useState, useMemo } from "react";
import parse from 'html-react-parser';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, ChevronDown, ChevronUp, Minus, Plus, Leaf } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { CartOperation, CommentOperation, ProductOperation } from "@/lib/main";
import { Product, Size_Stock } from "@/types/product";
import Image from "next/image";
import { comment } from "postcss";
import NotFoundPage from "@/app/not-found";
import CustomLoadingElement from "@/app/loading";
import { getTokenFromCookie } from "@/app/utils/token";
import RelatedProducts from "@/components/RelatedProducts";
import { useCurrency } from "@/hooks/useCurrency";
import { formatPrice } from "@/app/utils/format-currency";
import { BlogContent, processContent } from "../../blog/components/BlogContent";
import { addProductToLocalCart } from "@/app/utils/localCart";
import { useNotification } from "@/app/Providers/Notification";
import { useCartStore } from "@/lib/stores/cartStore";

interface Review {
    id: string;
    name: string;
    rating: number;
    comment: string;
    date: string;
}

interface Tab {
    id: string;
    label: string;
    content: string;
}

export async function generateStaticParams() {
    const productOp = new ProductOperation();
    const products = await productOp.getAll();

    return products.data.map((product: Product) => ({
        slug: product.slug,
    }));
}

export default function ProductDetail({ slug }: { slug: string }) {
    const { t } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    const [product, setProduct] = useState<Product | null>(null);
    const [suggestProducts, setSuggestProducts] = useState<Product[]>([]);
    const [tabs, setTabs] = useState<Tab[]>([]);
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [showSizeGuide, setShowSizeGuide] = useState(false);
    const [expandedTabs, setExpandedTabs] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState(0);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviews, setReviews] = useState<Review[]>([]);
    const addToCart = useCartStore((state) => state.addToCart);
    const resetCartAnimation = useCartStore((state) => state.resetCartAnimation);
    const [newReview, setNewReview] = useState({
        name: "",
        rating: 5,
        comment: ""
    });
    const productOp = new ProductOperation();
    const commentOp = new CommentOperation();
    const cartOp = new CartOperation();
    const [isCommented, setIsCommented] = useState(false);
    const { showNotification } = useNotification();

    function sortSizeStock(sizeStockArray: Size_Stock[]): Size_Stock[] {
        const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

        return sizeStockArray.sort((a, b) => {
            const aSize = a.size.toUpperCase();
            const bSize = b.size.toUpperCase();

            const aIndex = sizeOrder.indexOf(aSize);
            const bIndex = sizeOrder.indexOf(bSize);

            if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
            if (aIndex !== -1) return -1;
            if (bIndex !== -1) return 1;

            const aNum = parseFloat(aSize);
            const bNum = parseFloat(bSize);

            if (!isNaN(aNum) && !isNaN(bNum)) {
                return aNum - bNum;
            }

            // Fallback theo chữ cái
            return aSize.localeCompare(bSize);
        });
    }


    const handleAddToCart = async (e: React.MouseEvent) => {
        try {
            const token = getTokenFromCookie();
            setAdding(true);
            if (!token) {
                addProductToLocalCart({
                    id: product?.id ?? "",
                    num: quantity,
                    size: selectedSize,
                    product: {
                        id: product?.id ?? "",
                        images: product?.images ?? [],
                        slug: product?.slug ?? "",
                        name: product?.name ?? "",
                        price: product?.size_stock.find(st => st.size === selectedSize)?.price ?? 0
                    }
                });
                showNotification({
                    type: 'success',
                    message: t.product.addedToCartSuccess
                });

                addToCart(product);

                setTimeout(() => {
                    resetCartAnimation();
                }, 500);
            } else {
                const response = await cartOp.addToCart({
                    productId: product?.id ?? "",
                    num: quantity,
                    size: selectedSize
                }, token);

                if (response.success) {
                    showNotification({
                        type: 'success',
                        message: t.product.addedToCartSuccess
                    });
                    addToCart(product);

                    setTimeout(() => {
                        resetCartAnimation();
                    }, 500);
                } else {
                    showNotification({
                        type: 'error',
                        message: t.product.addToCartError
                    });
                }
            }
        } catch (error) {
            showNotification({
                type: 'error',
                message: t.product.addToCartError + error
            });
        } finally {
            setAdding(false);
        }
    };

    const selectedSizeStock = useMemo(() => {
        return product?.size_stock.find(s => s.size === selectedSize);
    }, [product, selectedSize]);

    const toggleTab = (tabId: string) => {
        setExpandedTabs(prev =>
            prev.includes(tabId)
                ? prev.filter(id => id !== tabId)
                : [...prev, tabId]
        );
    };

    const handleQuantityChange = (value: number) => {
        if (!selectedSizeStock) return;
        const newValue = Math.max(1, Math.min(value, selectedSizeStock.stock));
        setQuantity(newValue);
    };

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const review: Review = {
            id: Date.now().toString(),
            ...newReview,
            date: new Date().toLocaleDateString('vi-VN')
        };
        setReviews([review, ...reviews]);
        setNewReview({
            name: "",
            rating: 5,
            comment: ""
        });
        setShowReviewForm(false);
        const token = getTokenFromCookie();
        const resposne = await commentOp.createComment({
            productId: product?.id ?? "",
            content: newReview.comment,
            rate: newReview.rating
        }, token);
        if (resposne.success) {
            setIsCommented(true);
        }
    };

    const fetchProduct = async () => {
        if (!slug) return;

        setLoading(true);
        try {
            const response = await productOp.getBySlug(slug);
            if (response.success) {
                setProduct(response.data);

                if (response.data.size_stock.length > 0) {
                    setSelectedSize(sortSizeStock(response.data.size_stock)[0].size);
                }

                const transformedTabs = response.data.tabs.map((tab: any, index: any) => ({
                    id: `tab-${index}`,
                    label: tab.name,
                    content: tab.description
                }));
                setTabs(transformedTabs);
                const transformedReviews = response.data.comments.map((review: any) => ({
                    id: review.id,
                    name: review.customer?.name ?? "Anonymous",
                    rating: review.customer ? review.rate : null,
                    comment: review.content,
                    date: new Date(review.createdAt).toLocaleDateString('vi-VN')
                }));
                setReviews(transformedReviews);
                const token = getTokenFromCookie();
                if (!token) {
                    setIsCommented(false);
                    return;
                } else {
                    const commentResponse = await commentOp.checkComment(response.data?.id ?? "", token);
                    setIsCommented(commentResponse.data !== null);
                }
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSuggested = async () => {
        const response = await productOp.getSuggested();
        if (response.success) {
            setSuggestProducts(response.data);
        }
    }

    useEffect(() => {
        fetchProduct();
        fetchSuggested();
    }, [slug]);

    if (loading) return <CustomLoadingElement />;
    if (!product) return <NotFoundPage />;

    return (
        <div className="w-full bg-[#fdf8f7] min-h-screen"
        >
            <div className="max-w-7xl mx-auto px-4 py-10">
                <nav className="text-sm text-gray-500 mb-6">
                    <ol className="flex space-x-2">
                        <li><a href="/" className="hover:text-[#3e4f3d]">{t.common.home}</a></li>
                        <li>/</li>
                        <li><a href="/shop" className="hover:text-[#3e4f3d]">{t.common.products}</a></li>
                        <li>/</li>
                        <li className="text-gray-800 font-medium">{product.name}</li>
                    </ol>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        {product.images && product.images.length > 0 ? <div className="bg-gray-50 rounded-xl overflow-hidden">
                            <img
                                src={product.images[selectedImage]?.url || '/placeholder.jpg'}
                                alt={product.name}
                                className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                            /></div> : <div className="h-full w-full flex items-center justify-center text-gray-400">
                            <Leaf className="h-40 w-40" />
                        </div>}

                        <div className="flex space-x-4 overflow-x-auto pb-2">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`flex-shrink-0 h-20 w-20 rounded-md overflow-hidden border-2 ${selectedImage === idx ? 'border-[#3e4f3d]' : 'border-transparent'}`}
                                >
                                    <img
                                        src={img.url}
                                        alt={`${product.name} ${idx + 1}`}
                                        className="h-full w-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                            <div className="flex items-center mt-2 space-x-2">
                                <div className="flex text-yellow-500">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            size={18}
                                            fill={star <= Math.floor(product.rate) ? "currentColor" : "none"}
                                            className={star <= Math.floor(product.rate) ? "" : "stroke-yellow-500"}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600">
                                    {product.rate}/5 ({(reviews.filter((review: Review) => review.rating !== null)).length} {t.product.rating})
                                </span>
                            </div>
                        </div>

                        <div className="text-2xl font-bold text-[#3e4f3d]">
                            {formatPrice((selectedSizeStock?.price || product.price) * quantity)}
                        </div>

                        <BlogContent>
                            <div
                                className="prose max-w-none "
                                dangerouslySetInnerHTML={{ __html: product.content }}
                            />
                        </BlogContent>
                        {/* <p className="text-gray-700 leading-relaxed">
                            
                            {product.content}
                        </p> */}

                        <hr className="my-6" />

                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <button
                                        className="text-sm text-[#3e4f3d] hover:underline"
                                        onClick={() => setShowSizeGuide(!showSizeGuide)}
                                    >
                                        {t.product.sizeTable}
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    {sortSizeStock(product.size_stock).map((sizeStock) => (
                                        <button
                                            key={sizeStock.size}
                                            className={`h-10 px-4 border rounded-md flex items-center justify-center font-medium 
      ${selectedSize === sizeStock.size
                                                    ? 'border-[#3e4f3d] bg-white text-[#3e4f3d]'
                                                    : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}
                                            onClick={() => setSelectedSize(sizeStock.size)}
                                        >
                                            {sizeStock.size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => handleQuantityChange(quantity - 1)}
                                        className="h-10 w-10 border border-gray-300 rounded-l-md flex items-center justify-center hover:bg-gray-50"
                                        disabled={quantity <= 1}
                                    >
                                        <Minus size={16} className={quantity <= 1 ? "text-gray-300" : "text-gray-600"} />
                                    </button>
                                    <input
                                        type="number"
                                        min={1}
                                        max={selectedSizeStock?.stock}
                                        value={quantity}
                                        onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                                        className="h-10 w-16 bg-[#fdf8f7] border-y border-gray-300 text-center focus:outline-none"
                                    />
                                    <button
                                        onClick={() => handleQuantityChange(quantity + 1)}
                                        className="h-10 w-10 border border-gray-300 rounded-r-md flex items-center justify-center hover:bg-gray-50"
                                        disabled={quantity >= (selectedSizeStock?.stock || 0)}
                                    >
                                        <Plus size={16} className={quantity >= (selectedSizeStock?.stock || 0) ? "text-gray-300" : "text-gray-600"} />
                                    </button>
                                    <span className="ml-4 text-sm text-gray-500">
                                        {Number(selectedSizeStock?.stock) === 0 ? t.product.outOfOrder : t.product.productLeft + ":" + Number(selectedSizeStock?.stock || 0).toFixed(0)}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <button
                                    disabled={adding || quantity > (selectedSizeStock?.stock || 0)}
                                    className={`flex-1 bg-[#3e4f3d] hover:bg-[#747c61] text-white py-3 rounded-md font-medium flex items-center justify-center ${adding || quantity > (selectedSizeStock?.stock || 0) ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    onClick={(e) => handleAddToCart(e)}
                                >
                                    {
                                        adding ?
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg> :
                                            <ShoppingCart size={18} className="mr-2" />
                                    }
                                    {t.product.addCart}
                                </button>
                                {/* <button className="w-12 h-12 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50">
                                <Heart size={20} className="text-gray-600" />
                            </button> */}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <Truck size={18} className="text-[#3e4f3d]" />
                                    <span>{t.product.freeShipping}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <Shield size={18} className="text-[#3e4f3d]" />
                                    <span>{t.product.quality}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <RotateCcw size={18} className="text-[#3e4f3d]" />
                                    <span>{t.product.refundIn30Days}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 border-t pt-8">
                    <h2 className="text-2xl font-bold mb-6">{t.product.productDetail}</h2>
                    <div className="space-y-4">
                        {tabs.map((tab) => (
                            <div key={tab.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                                <button
                                    className="w-full flex justify-between items-center p-4 font-medium text-gray-800 hover:bg-gray-50"
                                    onClick={() => toggleTab(tab.id)}
                                >
                                    <span>{tab.label}</span>
                                    {expandedTabs.includes(tab.id) ? (
                                        <ChevronUp size={18} />
                                    ) : (
                                        <ChevronDown size={18} />
                                    )}
                                </button>
                                <div className={`duration-300 ease-in-out overflow-hidden ${expandedTabs.includes(tab.id) ? 'max-h-400' : 'max-h-0'}`}>
                                    <div
                                        className={`p-4 text-gray-700 border-t bg-gray-50 transition-max-height`}>
                                        {/* <p className="leading-relaxed whitespace-pre-line">{tab.content}</p> */}
                                        <BlogContent>
                                            {processContent(tab.content)}
                                        </BlogContent>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-16 border-t pt-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">{t.product.customerReiviews}</h2>
                        {!isCommented && <button
                            className="px-4 py-2 border border-[#3e4f3d] text-[#3e4f3d] rounded-md hover:bg-green-50"
                            onClick={() => setShowReviewForm(true)}
                        >
                            {t.product.writeAReview}
                        </button>}
                    </div>

                    {showReviewForm && (
                        <div className="bg-gray-50 p-6 rounded-lg mb-8">
                            <h3 className="text-lg font-medium mb-4">{t.product.writeAReview}</h3>
                            <form onSubmit={handleReviewSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.product.rating} *</label>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setNewReview({ ...newReview, rating: star })}
                                            >
                                                <Star
                                                    size={24}
                                                    fill={star <= newReview.rating ? "currentColor" : "none"}
                                                    className={`${star <= newReview.rating ? "text-yellow-500" : "text-gray-300"} mx-1`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.product.comment} *</label>
                                    <textarea
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        required
                                        value={newReview.comment}
                                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                    />
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        className="px-4 py-2 border border-gray-300 rounded-md"
                                        onClick={() => setShowReviewForm(false)}
                                    >
                                        {t.product.cancel}
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-[#3e4f3d] text-white rounded-md hover:bg-[#747c61]"
                                    >
                                        {t.product.submit}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="space-y-6">
                        {reviews.length === 0 ? (
                            <p className="text-gray-600">{t.product.noReview}</p>
                        ) : (
                            reviews.map((review) => (
                                <div key={review.id} className="border-b pb-6">
                                    <div className="flex justify-between mb-2">
                                        <div>
                                            {review.rating && <div className="flex text-yellow-500 mb-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        size={16}
                                                        fill={star <= review.rating ? "currentColor" : "none"}
                                                        className={star <= review.rating ? "" : "stroke-yellow-500"}
                                                    />
                                                ))}
                                            </div>}
                                            <h4 className="font-medium">{review.name}</h4>
                                        </div>
                                        <span className="text-sm text-gray-500">{review.date}</span>
                                    </div>
                                    <p className="mt-2 text-gray-700">{review.comment}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="mt-16 pt-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">{t.product.relatedProducts}</h2>
                    </div>
                    <RelatedProducts products={suggestProducts} />
                </div>

            </div>
            <img
                src="/img/footer-image.png"
                alt="Footer Image"
                width={1920}
                height={400}
                className="w-full h-auto object-cover"
            />
        </div >
    );
}