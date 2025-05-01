import { Metadata } from "next";
import ProductDetail from "../ProductDetail";
import { useSearchParams } from "next/navigation";
import { ProductOperation } from "@/lib/main";

// export const metadata = {
//     title: 'Product | Herbalism',
//     description: 'Xem danh sách các sản phẩm thảo dược thiên nhiên giúp cải thiện sức khỏe, tăng cường miễn dịch và giảm căng thẳng.',
// };

type Props = {
    params: Promise<{ productId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const productOp = new ProductOperation();
    const param = await params;
    const response = await productOp.getById(param.productId);
    if (response.success) {
        const product = response.data;
        return {
            title: `${product.name} | Herbalism`,
            description: product.shortDescription || 'Sản phẩm thảo dược từ thiên nhiên...',
        };
    }
    return {
        title: 'Product | Herbalism',
        description: 'Xem danh sách các sản phẩm thảo dược thiên nhiên giúp cải thiện sức khỏe, tăng cường miễn dịch và giảm căng thẳng.',
    };
}

export default async function Main({ params }: Props) {
    const param = await params;
    return <ProductDetail productId={param.productId}/>
}