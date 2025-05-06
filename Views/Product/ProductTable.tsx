"use client";

import { DataTable } from "@/components/DataTable/DataTable";
import AddProductPopup, { ProductFormData } from "./AddContent";
import { useState } from "react";
import { ProductOperation } from "@/lib/main";

export type Product = {
    id: number;
    name: string;
    price: number;
    totalStock: number;
    category: string;
    createdAt: string;
};

export default function ProductPage({ products }: { products: Product[] }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const productOp = new ProductOperation();
    const [notification, setNotification] = useState<{
        type: 'success' | 'error';
        message: string;
    } | null>(null);

    const handleSubmitProduct = async (productData: ProductFormData) => {
        const productImageUrls = await Promise.all(
            productData.images.map(async (image) => {
                if (image.file) {
                    const url = await productOp.uploadImage(image.file);
                    if (url.success) return url.data;
                }
                return null; // hoặc có thể lọc sau
            })
        );
        const filteredImageUrls = productImageUrls.filter(Boolean) as string[];
        const { size_stock, options, ...restProductData } = productData;
        let response;
        if (selectedProductId !== null) {
            response = await productOp.update(selectedProductId, {
                id: restProductData.id,
                content: restProductData.content,
                name: restProductData.name,
                tabs: restProductData.tabs,
                images: filteredImageUrls,
                product_form: productData.options[1].selectedValue,
                product_type: productData.options[0].selectedValue,
                wellness_need: productData.options[2].selectedValue,
                size_stock: productData.size_stock,
            })
        } else {
            response = await productOp.create({
                ...restProductData,
                images: filteredImageUrls,
                product_form: productData.options[1].selectedValue,
                product_type: productData.options[0].selectedValue,
                wellness_need: productData.options[2].selectedValue,
                size_stock: productData.size_stock,
            })
        }
        if (response.success) {
            setNotification({
                type: 'success',
                message: "Cập nhật thành công!"
            });
        } else {
            setNotification({
                type: 'error',
                message: "Cập nhật không thành công"
            });
        }
        setTimeout(() => {
            setNotification(null);
        }, 5000);
        setIsPopupOpen(false);
    };
    return (
        <div className="p-6">
            {notification && (
                <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                    } text-white animate-fade-in-down`}>
                    <div className="flex items-center">
                        {notification.type === 'success' ? (
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        )}
                        <span>{notification.message}</span>
                    </div>
                </div>
            )}
            <DataTable
                columns={[
                    { title: "Tên sản phẩm", render: (p) => p.name },
                    { title: "Giá", render: (p) => `${p.price.toLocaleString()}₫` },
                    { title: "Số lượng tồn", render: (p) => p.totalStock },
                    { title: "Danh mục", render: (p) => p.category },
                ]}
                data={products}
                selectable="none"
                onSelectionChange={(selectedProducts) => {
                    console.log('Selected products:', selectedProducts);
                }}
                searchable={true}
                searchFields={['name', 'category']}
                pagination={true}
                rowKey={(product) => product.id}
                itemsPerPage={10}
                actions={
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => setIsPopupOpen(true)}>
                        Thêm sản phẩm
                    </button>
                }
                onRowClick={(product => {
                    setSelectedProductId(product.id.toString());
                    setIsPopupOpen(true);
                })}
                className="p-4 bg-white rounded-lg shadow"
                // onEdit={(productId => {
                //     setSelectedProductId(productId.toString());
                //     setIsPopupOpen(true);
                // })}
                onDelete={(product) => console.log('Delete product:', product)}
            />
            {isPopupOpen &&
                <AddProductPopup
                    onClose={() => setIsPopupOpen(false)}
                    onSubmit={handleSubmitProduct}
                    initialProductId={selectedProductId ? selectedProductId : undefined}
                />}
        </div>
    );
}
