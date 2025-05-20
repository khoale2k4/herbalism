"use client";
import HeroImage from "@/components/Hero/Hero";
import ProductFeatures from "@/components/ProductFeatures/ProductFeatures";
import { FC, useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import ArticleRowList from "./components/ArticleRowList";
import Image from 'next/image';
import { useLanguage } from "@/hooks/useLanguage";
import { ArticleOperation } from "@/lib/main";

type Title = {
  title: string;
  articles: Article[];
};

const BlogPage: FC = () => {
  const { t } = useLanguage();
  const articleOp = new ArticleOperation();
  const [titles, setTitles] = useState<Title[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const headingHeroProps = {
    images: [
      "/img/artisan-teas.png",
      "/img/blogs.png",
      "/img/blog_1.png",
    ],
    // img_url: '/img/blogs.png',
    h1_content: t.blog.title,
    p_content: [t.blog.description],
    button_text: t.blog.readMore,
    onClick: () => { }
  };

  const blogProps_1 = {
    img_url: "/img/blog_1.png",
    bg_color: "#e2f0d5",
    title: t.blog.valuesDrivenBusiness.title,
    description: t.blog.valuesDrivenBusiness.excerpt,
    button_text: t.blog.valuesDrivenBusiness.readMore,
    onClick: () => { }
  };

  const fetchArticles = async (): Promise<Title[]> => {
    setIsLoading(true);
    try {
      const response = await articleOp.getAll();
      if (!response || !response.success) console.error("API failed");

      const categoryMap = new Map<string, Article[]>();
      response.data.forEach((article: any) => {
        const categoryName = article.category?.name || 'Khác';
        const articleData: Article = {
          id: article.id,
          title: article.title,
          shortDescription: article.shortDescription || '',
          author: article.author?.name || 'Không rõ',
          createdAt: article.createdAt,
          imageUrl: article.imageUrl,
          categories: categoryName
        };

        if (!categoryMap.has(categoryName)) {
          categoryMap.set(categoryName, []);
        }
        categoryMap.get(categoryName)?.push(articleData);
      });

      const titles: Title[] = [];
      categoryMap.forEach((articles, title) => {
        const sortedArticles = [...articles].sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        const formattedArticles = sortedArticles.map(article => ({
          ...article,
          date: new Date(article.createdAt).toLocaleDateString()
        }));
        titles.push({ title, articles: formattedArticles });
      });

      return titles;
    } catch (err) {
      console.error("fetchArticles error:", err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  if (!t?.blog) return null;

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const fetchedTitles = await fetchArticles();
        setTitles(fetchedTitles);
      } catch (error) {
        console.error("Failed to load articles:", error);
      }
    };

    loadArticles();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <HeroImage {...headingHeroProps} />
      <ProductFeatures {...blogProps_1} />
      {isLoading ? <div className="text-center text-gray-500 py-10 bg-[#fdf8f7]">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3e4f3d]"></div>
        </div>
      </div> : titles.length === 0 ? (
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
          <h3 className="text-xl font-medium text-gray-900 mb-1">{t.blog.noBlogFound}</h3>
        </div>
      ) : (
        titles.map((title, index) => (
          <ArticleRowList
            key={`${title.title}-${index}`}
            title={title.title}
            articles={title.articles}
          />
        ))
      )}
      <img
        src="/img/footer-image.png"
        alt="Footer Image"
        width={1920}
        height={400}
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default BlogPage;