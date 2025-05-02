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

type Props = {};
const ShopPage: FC<Props> = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOption, setSortOption] = useState<string>("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const productOp = new ProductOperation()
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);

  // Sample product data
  // const products: Product[] = [
  //   {
  //     id: 1,
  //     name: "Organic Chamomile Tea",
  //     price: 12.99,
  //     category: "Teas",
  //     image: "/products/tea.jpg",
  //     rating: 4.5
  //   },
  //   {
  //     id: 2,
  //     name: "Echinacea Immune Support",
  //     price: 24.99,
  //     category: "Capsules",
  //     image: "/products/capsules.jpg",
  //     rating: 4.2
  //   },
  //   {
  //     id: 3,
  //     name: "Lavender Essential Oil",
  //     price: 18.99,
  //     category: "Liquid",
  //     image: "/products/oil.jpg",
  //     rating: 4.7
  //   },
  //   {
  //     id: 4,
  //     name: "Turmeric & Ginger Powder",
  //     price: 15.99,
  //     category: "Powders",
  //     image: "/products/powder.jpg",
  //     rating: 4.3
  //   },
  //   {
  //     id: 5,
  //     name: "Valerian Root Sleep Aid",
  //     price: 22.99,
  //     category: "Tablets",
  //     image: "/products/tablets.jpg",
  //     rating: 4.1
  //   },
  //   {
  //     id: 6,
  //     name: "Arnica Muscle Relief Balm",
  //     price: 19.99,
  //     category: "Creams",
  //     image: "/products/balm.jpg",
  //     rating: 4.6
  //   },
  // ];

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
    const response = await productOp.getAll();
    if (response.success) {
      setProducts(response.data);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [searchQuery])

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full bg-[#fdf8f7]">
        {/* <TopBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} setSortOption={setSortOption} viewMode={viewMode} showSidebar={showSidebar} sortOption={sortOption} sortOptions={sortOptions} toggleSidebar={toggleSidebar} setViewMode={setViewMode} /> */}
        <ProductsList filteredProducts={filteredProducts} setSearchQuery={setSearchQuery} showSidebar={showSidebar} viewMode={viewMode} />
      </div>
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

export default ShopPage;
