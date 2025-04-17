"use client";
import Hero from "@/components/Hero/Hero";
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

  const headingHeroProps = {
    img_url: '/img/blogs.png',
    h1_content: t.blog.title,
    p_content: t.blog.description,
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
    const response = await articleOp.getAll();
    const titles: Title[] = [];

    if (response.success && Array.isArray(response.data)) {
      // Create a map to group articles by category
      const categoryMap = new Map<string, Article[]>();

      response.data.forEach(article => {
        const categoryName = article.category?.name || 'Khác';
        const articleData: Article = {
          id: article.id,
          title: article.title,
          description: article.shortDescription || '',
          author: article.author?.name || 'Không rõ',
          date: article.createdAt, // Keep original date format for sorting
          imageUrl: article.imageUrl,
          categories: categoryName
        };

        if (!categoryMap.has(categoryName)) {
          categoryMap.set(categoryName, []);
        }
        categoryMap.get(categoryName)?.push(articleData);
      });

      // Convert map to array of Title objects
      categoryMap.forEach((articles, title) => {
        // Sort articles by date (newest first)
        const sortedArticles = [...articles].sort((a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        // Format dates after sorting
        const formattedArticles = sortedArticles.map(article => ({
          ...article,
          date: new Date(article.date).toLocaleDateString()
        }));

        titles.push({
          title,
          articles: formattedArticles
        });
      });
    }

    return titles;
  };

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
      <Hero {...headingHeroProps} />
      <ProductFeatures {...blogProps_1} />
      {titles.map((title, index) => (
        <ArticleRowList
          key={`${title.title}-${index}`}
          title={title.title}
          articles={title.articles}
        />
      ))}
      <Image
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