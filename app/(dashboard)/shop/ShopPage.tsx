"use client";
import { FC, useEffect, useRef, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import Sidebar from "./components/SideBar";
import TopBar from "./components/TopBar";
import Image from 'next/image';
import ProductsList from "./components/Products";
import { useLanguage } from "@/hooks/useLanguage";
import { ProductOperation } from "@/lib/main";
import { Product } from "@/types/product";
import ImageBanner, { ImageBannerProps } from "@/components/Banner/imageBanner";

type Props = {};
const ShopPage: FC<Props> = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOption, setSortOption] = useState<string>("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const productOp = new ProductOperation()
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);

  const ibProps1: ImageBannerProps = {
    title: t.homeVideoBanner1.title,
    description: t.homeVideoBanner1.description1,
    imageUrl: "/img/herbalism-02.jpg",
    button: t.homeVideoBanner1.button,
    description2: t.homeVideoBanner1.description2,
    imagePos: "right",
    onClick: () => {
    }
  }

  const sortOptions = [
    { value: "featured", label: t.shop.featured },
    { value: "price_low", label: t.shop.price_low },
    { value: "price_high", label: t.shop.price_high },
    { value: "rating", label: t.shop.rating },
    { value: "newest", label: t.shop.newest },
  ];

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rate - a.rate;
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  const filteredProducts = sortedProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.type.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await productOp.getAll();
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [searchQuery])

  return (
    <div className="flex flex-col w-full">
      <ImageBanner {...ibProps1} />
      <div className="flex flex-col w-full bg-[#fdf8f7]">
        {/* <TopBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} setSortOption={setSortOption} viewMode={viewMode} showSidebar={showSidebar} sortOption={sortOption} sortOptions={sortOptions} toggleSidebar={toggleSidebar} setViewMode={setViewMode} /> */}
        {isLoading ?
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3e4f3d]"></div>
          </div> :
          <ProductsList filteredProducts={filteredProducts} setSearchQuery={setSearchQuery} showSidebar={showSidebar} viewMode={viewMode} />
        }
      </div>
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

export default ShopPage;
