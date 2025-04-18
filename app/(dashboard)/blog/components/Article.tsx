'use client';

import Image from "next/image";
import { notFound, useSearchParams } from "next/navigation";
import Link from "next/link";
import { BlogContent, processContent } from "./BlogContent";
import { use, useEffect, useState } from "react";
import { blogPosts } from "@/data/blogs";
import Loading from "@/app/loading";
import { ArticleOperation } from "@/lib/main";
import { BlogPost } from "@/types/blog";



export default function BlogPage() {
    const searchParams = useSearchParams()
    const blogId = searchParams.get('blogId')
    // const blog = blogPosts['2'];
    // const blog = blogPosts[blogId as string];
    const articleOp = new ArticleOperation();
    const [loading, setLoading] = useState(false);
    const [blog, setBlog] = useState<BlogPost | null>(null);

    const fetchArticle = async () => {
        if (!blogId) return;
        setLoading(true);
        console.log("blogId", blogId as string);
        const response = await articleOp.getById(blogId as string);
        console.log(response.data);
        setBlog(response.data);
        setLoading(false);
    }

    useEffect(() => {
        fetchArticle();
    }, [blogId]);

    if (loading || !blog) return <Loading />;

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Phần đầu bài viết */}
            <header className="mb-12">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                    {blog.title}
                </h1>

                {blog.imageUrl && (
                    <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
                        <img
                            src={blog.imageUrl}
                            alt={blog.title}
                            width={1200}
                            height={630}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                )}

                <div className="flex items-center text-gray-600 dark:text-gray-400 space-x-6">
                    <span className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {blog.author.name}
                    </span>
                    <span className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {
                            new Date(blog.createdAt).toLocaleDateString('vi-VN')
                        }
                    </span>
                </div>
            </header>

            <BlogContent>
                <div
                    className="prose max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />
            </BlogContent>



            {/* Bài viết liên quan */}
            {/* <section className="mt-16">
                <h2 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white">
                    Bài viết liên quan
                </h2>
                <div className="grid gap-8 sm:grid-cols-2">
                    {Object.entries(blogPosts)
                        .filter(([id]) => id !== (blogId as string))
                        .map(([id, post]) => (
                            <Link href={`/blog/${id}`} key={id} className="group">
                                <article className="h-full bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                                    {post.titleImg && (
                                        <div className="relative h-48 overflow-hidden">
                                            <Image
                                                src={post.titleImg}
                                                alt={post.title}
                                                width={600}
                                                height={400}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{post.date}</p>
                                    </div>
                                </article>
                            </Link>
                        ))}
                </div>
            </section> */}
        </div>
    );
}