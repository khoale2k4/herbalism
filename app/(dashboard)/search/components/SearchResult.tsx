'use client';

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import Link from 'next/link';
import { ArticleOperation, ProductOperation } from '@/lib/main';
import { formatPrice } from '@/app/utils/format-currency';
import { useLanguage } from '@/hooks/useLanguage';

export default function SearchPage() {
    const searchParams = useSearchParams();
    const keyword = searchParams.get('keyword') || '';
    const { t } = useLanguage();
    const productOp = new ProductOperation();
    const articleOp = new ArticleOperation();
    const [articles, setArticles] = useState<Article[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');

    const fetchResults = async () => {
        setLoading(true);
        try {
            const [productResponse, articleResponse] = await Promise.all([
                productOp.keywordSearch(keyword),
                articleOp.keywordSearch(keyword),
            ]);

            if (productResponse.success) {
                setProducts(productResponse.data);
            }

            if (articleResponse.success) {
                setArticles(articleResponse.data);
            }
        } catch (error) {
            console.error("Error fetching search results:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResults();
    }, [keyword]);

    const totalResults = articles.length + products.length;

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Header */}
            <div className="bg-[#f2f2f2] rounded-xl p-8 mb-8 shadow-sm">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {t.searchPage.result} "{keyword}"
                </h1>
                <p className="text-gray-600">
                    {t.searchPage.found1} {totalResults} {t.searchPage.found2}
                </p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
                <button
                    onClick={() => setActiveTab('all')}
                    className={`py-3 px-6 font-medium text-sm ${activeTab === 'all'
                        ? 'border-b-2 border-[#3e4f3d] text-[#3e4f3d]'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    {t.searchPage.all} ({totalResults})
                </button>
                <button
                    onClick={() => setActiveTab('articles')}
                    className={`py-3 px-6 font-medium text-sm ${activeTab === 'articles'
                        ? 'border-b-2 border-[#3e4f3d] text-[#3e4f3d]'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    {t.searchPage.article} ({articles.length})
                </button>
                <button
                    onClick={() => setActiveTab('products')}
                    className={`py-3 px-6 font-medium text-sm ${activeTab === 'products'
                        ? 'border-b-2 border-[#3e4f3d] text-[#3e4f3d]'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    {t.searchPage.product} ({products.length})
                </button>
            </div>

            {/* Loading state */}
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3e4f3d]"></div>
                </div>
            ) : (
                <>
                    {/* Results */}
                    {totalResults === 0 ? (
                        <div className="text-center py-16">
                            <div className="mb-4">
                                <svg
                                    className="mx-auto h-16 w-16 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-medium text-gray-900 mb-1">{t.searchPage.noResult}</h3>
                            <p className="text-gray-500 mb-6">{t.searchPage.retry}</p>
                            <Link
                                href="/"
                                className="inline-flex items-center text-white bg-[#3e4f3d] hover:bg-blue-700 px-5 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                {t.common.home}
                            </Link>
                        </div>
                    ) : (
                        <>
                            {/* Articles Section - show if activeTab is 'all' or 'articles' */}
                            {(activeTab === 'all' || activeTab === 'articles') && articles.length > 0 && (
                                <section className="mb-12">
                                    {activeTab === 'all' && (
                                        <div className="flex justify-between items-center mb-6">
                                            <h2 className="text-2xl font-semibold text-gray-800">{t.searchPage.article}</h2>
                                            {articles.length > 3 && (
                                                <Link
                                                    href="#"
                                                    onClick={() => setActiveTab('articles')}
                                                    className="text-[#3e4f3d] hover:text-blue-800 font-medium text-sm flex items-center"
                                                >
                                                    {t.searchPage.seeAll}
                                                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </Link>
                                            )}
                                        </div>
                                    )}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {(activeTab === 'all' ? articles.slice(0, 3) : articles).map((article) => (
                                            <ArticleCard key={article.id} article={article} />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Products Section - show if activeTab is 'all' or 'products' */}
                            {(activeTab === 'all' || activeTab === 'products') && products.length > 0 && (
                                <section>
                                    {activeTab === 'all' && (
                                        <div className="flex justify-between items-center mb-6">
                                            <h2 className="text-2xl font-semibold text-gray-800">{t.searchPage.product}</h2>
                                            {products.length > 4 && (
                                                <Link
                                                    href="#"
                                                    onClick={() => setActiveTab('products')}
                                                    className="text-[#3e4f3d] hover:text-blue-800 font-medium text-sm flex items-center"
                                                >
                                                    {t.searchPage.seeAll}
                                                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </Link>
                                            )}
                                        </div>
                                    )}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {(activeTab === 'all' ? products.slice(0, 4) : products).map((product) => (
                                            <ProductCard key={product.id} product={product} />
                                        ))}
                                    </div>
                                </section>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
}

function ArticleCard({ article }: { article: Article }) {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full group">
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {article.categories && (
                    <span className="absolute top-3 left-3 bg-[#3e4f3d] text-white px-2 py-1 rounded-md text-xs font-medium">
                        {article.categories}
                    </span>
                )}
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(article.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#3e4f3d] transition-colors">
                    {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">{article.shortDescription}</p>
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <span className="text-sm text-gray-500 flex items-center">
                        <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 mr-2">
                            {article.author ? article.author.name.charAt(0).toUpperCase() : 'A'}
                        </span>
                        {article.author.name}
                    </span>
                    <Link
                        href={`/blog/${article.id}`}
                        className="hover:text-[#3e4f3d] text-[#7d8b40] text-sm font-medium flex items-center"
                    >
                        Đọc tiếp
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}

function ProductCard({ product }: { product: Product }) {
    const mainImage = product.images && product.images.length > 0 ? product.images[0]?.url : '/img/placeholder.png';

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full group">
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={mainImage}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-center mb-2">
                    <div className="flex items-center text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(product.rate) ? 'text-yellow-500' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                        <span className="ml-1 text-xs font-medium text-gray-600">
                            ({product.rate.toFixed(1)})
                        </span>
                    </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#3e4f3d] transition-colors">
                    {product.name}
                </h3>
                <div className="mt-auto pt-3 flex justify-between items-center">
                    <div>
                        <span className="text-lg font-medium text-gray-900">
                            {formatPrice(product.price)}
                        </span>
                    </div>
                    <Link
                        href={`/shop/${product.slug}`}
                        className="hover:bg-[#3e4f3d] bg-[#7d8b40] text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Xem
                    </Link>
                </div>
            </div>
        </div>
    );
}