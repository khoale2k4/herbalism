import React, { useCallback, useEffect, useState } from "react";
import NewProductComponent from "./Product";
import ImageHoverComponent from "../Item/Item";
import { ProductOperation } from "@/lib/main";

type Item = {
    title: string;
    images: string[];
    price: number;
    slug: string;
}

const ListItems = ({ ids }: { ids: string[] }) => {
    const [items, setItems] = useState<Item[]>([]);
    const [newProduct, setNewProduct] = useState<Item | null>(null); // Sản phẩm mới
    const [loading, setLoading] = useState<boolean>(true); // Trạng thái loading
    const productOp = new ProductOperation();

    const fetchItem = useCallback(async () => {
        setLoading(true); // Bắt đầu load
        try {
            const results = await Promise.all(
                ids.map(async (itemId: string) => {
                    const response = await productOp.getById(itemId);
                    if (response.success) {
                        const order = response.data;
                        return {
                            title: order.name,
                            price: order.price,
                            images: order.images.map((image: any) => image.url),
                            slug: order.slug,
                        };
                    }
                    return null;
                })
            );
            const newProductResponse = await productOp.getNewest();
            if (newProductResponse.success) {
                const product = newProductResponse.data;
                setNewProduct({
                    title: product.name,
                    price: product.price,
                    images: product.images.map((image: any) => image.url),
                    slug: product.slug,
                });
            }

            // Lọc ra item hợp lệ
            const validItems = results.filter((item): item is Item => item !== null);
            setItems(validItems);
        } catch (error) {
            console.error("Lỗi khi fetch items:", error);
        } finally {
            setLoading(false); // Dữ liệu đã load xong
        }
    }, [ids]);

    useEffect(() => {
        fetchItem()
    }, [ids]);

    // Skeleton Loader
    const renderSkeleton = (index: number) => {
        return (
            <div key={`ske-${index}`} className="min-w-[250px] p-4 bg-gray-200 animate-pulse rounded-lg">
                <div className="h-40 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
            </div>
        );
    };

    return (
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-6 pb-4 px-4">
            <div className="w-full lg:w-1/3">
                {loading && newProduct !== undefined? renderSkeleton(-1) : <NewProductComponent imageUrl={newProduct?.images[0] ?? ""} name={newProduct?.title ?? ""}/>}
            </div>

            <div className="w-full lg:w-2/3 overflow-x-auto scroll-smooth p-2">
                <div className="flex space-x-4 min-w-max">
                    {loading
                        ? Array(5).fill(0).map((_, index) => renderSkeleton(index))
                        : items.map((item: Item) => {
                            if(newProduct?.slug === item.slug) return null; 
                            return (
                                <div key={item.title}
                                    onClick={() => window.open(`/shop/${item.slug}`, "_self")}
                                    className="min-w-[250px]">
                                    <ImageHoverComponent images={item.images} price={item.price} title={item.title} />
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default ListItems;
