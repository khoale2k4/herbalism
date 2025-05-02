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
  const handleClickProduct = (id: string) => {
    router.push(`/product/${id}`);
  }

  return (<div className="container mx-auto py-6 px-4">
    <div className="flex flex-col md:flex-row gap-6">
      {/* {showSidebar && (
        <div className="w-full md:w-72 flex-shrink-0">
          <Sidebar />
        </div>
      )} */}

      {/* Product Listing */}
      <div className="flex-grow">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{t.shop.shopOurProducts}</h1>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t.shop.noProductsFound}</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-green-600 hover:text-green-800"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className={viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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