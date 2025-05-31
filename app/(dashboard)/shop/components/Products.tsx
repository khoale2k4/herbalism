import { useLanguage } from "@/hooks/useLanguage";
import ProductCard from "./ProductCard";
import Sidebar from "./SideBar";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";

type Props = {
  showSidebar: boolean;
  filteredProducts: Product[];
  setSearchQuery: (query: string) => void;
  viewMode: "grid" | "list";
}

const ProductsList = ({ showSidebar, filteredProducts, setSearchQuery, viewMode }: Props) => {
  const router = useRouter();
  const { t } = useLanguage();
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const handleClickProduct = (slug: string) => {
    router.push(`/shop/${slug}`);
  }

  return (<div className="container mx-auto py-6 px-4">
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-grow">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{t.shop.shopOurProducts}</h1>

        {filteredProducts.length === 0 ? (
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
            <h3 className="text-xl font-medium text-gray-900 mb-1">{t.shop.noProductsFound}</h3>
          </div>
        ) : (
          <div className={viewMode === "grid"
            ? "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12"
            : "space-y-6"
          }>
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
                onClick={handleClickProduct}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  </div>);
}

export default ProductsList;