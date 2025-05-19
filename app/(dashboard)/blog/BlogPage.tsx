"use client";
import HeroImage from "@/components/Hero/Hero";
import ProductFeatures from "@/components/ProductFeatures/ProductFeatures";
import { FC, useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import ArticleRowList from "./components/ArticleRowList";
import Image from 'next/image';
import { useLanguage } from "@/hooks/useLanguage";
import { ArticleOperation } from "@/lib/main";
import Loading from "./read/loading";

type Title = {
  title: string;
  articles: Article[];
};

const BlogPage: FC = () => {
  const { t } = useLanguage();
  const articleOp = new ArticleOperation();
  const [titles, setTitles] = useState<Title[]>([]);

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
      {titles.length === 0 ? (
        <div className="text-center text-gray-500 py-10 bg-[#fdf8f7]"><Loading/></div>
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