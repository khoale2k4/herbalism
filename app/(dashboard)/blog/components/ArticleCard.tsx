import { useRouter } from "next/navigation";


const ArticleCard = ({ article }: { article: Article }) => {
    const router = useRouter();
  
    const handleClick = () => {
        router.push(`/blog/read?blogId=${article.id}`);
    };
    
    return (
        <div className="bg-white border rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg w-[350px] hover:cursor-pointer"
            onClick={handleClick}>
            <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-48 object-cover hover:scale-105 transition-transform"
            />
            <div className="p-4">
                <p className="text-sm text-gray-500 mb-2">{article.categories}</p>
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-gray-700 mt-2 line-clamp-3">{article.description}</p>
                <div className="flex justify-between items-center mt-4">
                    <p className="text-xs text-gray-400">
                        {article.author}
                    </p>
                    <p className="text-xs text-gray-400">
                        {article.date}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;