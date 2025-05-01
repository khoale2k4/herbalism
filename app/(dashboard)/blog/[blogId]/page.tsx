// app/(dashboard)/blog/[blogId]/page.tsx

import { ArticleOperation } from "@/lib/main";
import { Metadata } from "next";
import BlogPage from "../components/Article";

type Params = Promise<{ blogId: string }>;
type PageProps = { params: Promise<{ blogId: string }>};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const articleOp = new ArticleOperation();
    const param = await params;
    const response = await articleOp.getById(param.blogId);
    if (response.success) {
        const blog = response.data;
        return {
            title: `${blog.title} | Herbalism`,
            description: blog.shortDescription || 'Sản phẩm thảo dược từ thiên nhiên...',
        };
    }
    return {
        title: 'Blog | Herbalism',
        description: 'Tìm hiểu thêm về công dụng của các loại thảo dược, mẹo sống khỏe và xu hướng chăm sóc sức khỏe tự nhiên qua các bài viết của Herbalism.',
    };
}

export default async function Page({ params }: { params: Params }) {
    const { blogId } = await params;
    return <BlogPage blogId={blogId} />;
}