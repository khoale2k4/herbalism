import { Metadata } from "next";
import ProductDetail from "../components/ProductDetail";
import { ProductOperation } from "@/lib/main";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const productOp = new ProductOperation();
    const param = await params;
    const response = await productOp.getById(param.slug);
    
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
    // console.log(param.productId);
    return <ProductDetail slug={param.slug} />;
}