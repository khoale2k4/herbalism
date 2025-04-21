import ArticleCard from "./ArticleCard";

const ArticleRowList = ({ articles, title }: { articles: Article[], title: string }) => {
    return (
        <div className=" bg-[#fdf8f7]">
            <section className="p-6 max-w-7xl mx-auto">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-3xl font-bold mb-6">{title}</h2>
                    {/* <a
                        href="/herbal-wisdom"
                        className="inline-block px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    >
                        VIEW ALL ARTICLES
                    </a> */}
                </div>
                <div className="relative">
                    <div className="overflow-x-auto scrollbar-hide pb-4">
                        <div className="flex space-x-6 inline-flex">
                            {articles.map(article => (
                                <ArticleCard key={article.id} article={article} />
                            ))}
                        </div>
                    </div>

                    <div className="pointer-events-none absolute inset-y-0 right-0 w-16"></div>
                </div>
            </section>
        </div>
    );
};

export default ArticleRowList;