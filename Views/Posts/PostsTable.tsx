"use client";

import { DataTable } from "@/components/DataTable/DataTable";
import { useState } from "react";
import ArticleEditorPopup, { ArticleFormData } from "./CreatePost";
import { ArticleOperation } from "@/lib/main";

export type Post = {
    id: string;
    title: string;
    createdAt: string;
    category: {
        name: string;
    };
    author: {
        name: string;
    }
};

export default function PostsPage({ posts }: { posts: Post[] }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const articleOp = new ArticleOperation();

    const handleSubmit = async (articleData: ArticleFormData) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(articleData.content, 'text/html');
        const images = Array.from(doc.querySelectorAll('img'));

        for (const img of images) {
            const src = img.getAttribute('src') || '';
            if (src.startsWith('data:image')) {
                const blob = await (await fetch(src)).blob();
                const file = new File([blob], 'image.png', { type: blob.type });
                const url = await articleOp.uploadImage(file);

                if (url.success) {
                    img.setAttribute('src', url.data);
                }
            }
        }

        const updatedContent = doc.body.innerHTML;

        const finalData = {
            ...articleData,
            content: updatedContent,
        };

        const titleImageUrls = await Promise.all(
            articleData.images.map(async (image) => {
                if (image.file) {
                    const url = await articleOp.uploadImage(image.file);
                    if (url.success) return url.data;
                }
                return null; // hoặc có thể lọc sau
            })
        );
        const filteredImageUrls = titleImageUrls.filter(Boolean) as string[];

        console.log('Final article data (after image upload):', finalData);
        const resposne = await articleOp.create(finalData.title, finalData.content, articleData.shortDescription, filteredImageUrls, articleData.category);
    };

    return (
        <div className="p-6">
            <DataTable
                columns={[
                    { title: "Tiêu đề", render: (p) => p.title },
                    { title: "Danh mục", render: (p) => p.category.name },
                    {
                        title: "Ngày đăng", render: (p) => {
                            const date = new Date(p.createdAt);
                            return date.toLocaleDateString('vi-VN');
                        }
                    },
                ]}
                data={posts}
                searchable={true}
                searchFields={["title"]}
                rowKey={(post) => post.id}
                pagination={true}
                itemsPerPage={10}
                selectable="none"
                onSelectionChange={(selected) => console.log("Selected posts:", selected)}
                actions={
                    <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        onClick={() => setIsPopupOpen(true)}>
                        Viết bài mới
                    </button>
                }
                onRowClick={(post) => console.log("Row clicked:", post)}
                className="p-4 bg-white rounded-lg shadow"
                onEdit={(post => console.log('Edit post:', post))}
                onDelete={(post) => console.log('Delete post:', post)}
            />
            {isPopupOpen && <ArticleEditorPopup
                onClose={() => setIsPopupOpen(false)}
                onSubmit={handleSubmit}
            />}
        </div>
    );
}
