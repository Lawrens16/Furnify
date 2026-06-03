"use client";

import { ShoppingCart, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { getProducts } from "@/lib/actions/products";
import { normalizeProductName } from "@/lib/utils";
import type { Product } from "@/types/database";

type ProductType = {
  title: string;
  category: string;
  price: string;
  image: string;
  size: string;
  build: string;
  color: string;
  desc: string;
};

export default function ShopPage() {
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [catalogProducts, setCatalogProducts] = useState<Product[]>([]);
  const [isCatalogLoading, setIsCatalogLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const categories = ["All", "Sofa", "Table", "Chair", "Bed", "Lamp", "Modern Furniture", "Interior"];

  const products: ProductType[] = [
    { title: "Modern Green Sofa", category: "Sofa", price: "$450", image: "/product_img/green-sofa.jpg", size: "85\"W x 35\"D x 32\"H", build: "Velvet Upholstery, Wood Frame", color: "Sage Green", desc: "A luxurious statement piece that brings both comfort and aesthetic appeal to any modern living space." },
    { title: "Minimalist Oak Table", category: "Table", price: "$320", image: "/product_img/oak_table.jpg", size: "72\"L x 36\"W x 30\"H", build: "Solid Oak, Metal Base", color: "Natural Oak", desc: "Clean lines and sturdy construction make this dining table perfect for both casual meals and formal gatherings." },
    { title: "Ergonomic Chair", category: "Chair", price: "$150", image: "/product_img/ergonomic.jpg", size: "26\"W x 26\"D x 42\"H", build: "Mesh Back, Aluminum Base", color: "Matte Black", desc: "Designed for all-day support with adjustable lumbar support and breathable mesh material." },
    { title: "King Size Bed", category: "Bed", price: "$850", image: "/product_img/king_bed.jpg", size: "80\"W x 84\"L x 45\"H", build: "Upholstered Headboard, Pine Woods", color: "Beige", desc: "Experience premium comfort wrapped in a sleek silhouette, making it the perfect centerpiece for your bedroom." },
    { title: "Nordic Floor Lamp", category: "Lamp", price: "$90", image: "/product_img/floor_lamp.jpg", size: "15\"Base x 65\"H", build: "Brass Stem, Frosted Glass", color: "Brushed Brass", desc: "Soft, ambient lighting meets Scandinavian simplicity. A beautiful accent piece for any dark corner." },
    { title: "Abstract Bookshelf", category: "Modern Furniture", price: "$280", image: "/product_img/bookshelf.jpg", size: "48\"W x 12\"D x 60\"H", build: "Engineered Wood, Steel", color: "Walnut & Black", desc: "A unique geometric display shelf to house your favorite books, plants, and keepsakes." },
    { title: "Boho Ceramic Vase", category: "Interior", price: "$40", image: "/product_img/vase.jpg", size: "8\"Diameter x 14\"H", build: "Handcrafted Ceramic", color: "Terracotta", desc: "Ideal for dry flower arrangements or standing beautifully on its own as sculptural decor." },
    { title: "Leather Recliner", category: "Sofa", price: "$600", image: "/product_img/leather.jpg", size: "32\"W x 38\"D x 40\"H", build: "Top Grain Leather, Steel Mechanism", color: "Cognac Brown", desc: "Plush, deep-seated comfort meets the timeless luxury of genuine top-grain leather." },
    { title: "Glass Coffee Table", category: "Table", price: "$200", image: "/product_img/coffee_table.jpg", size: "40\"Diameter x 16\"H", build: "Tempered Glass, Chrome", color: "Clear / Silver", desc: "Opens up your living room visually, thanks to its transparent surface and airy metallic base." },
  ];

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      const data = await getProducts();
      if (isMounted) {
        setCatalogProducts(data);
        setIsCatalogLoading(false);
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2000);

    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, [toastMessage]);

  const catalogByName = useMemo(() => {
    const map = new Map<string, Product>();
    catalogProducts.forEach((product) => {
      map.set(normalizeProductName(product.name), product);
    });
    return map;
  }, [catalogProducts]);

  const resolveCatalogProduct = (product: ProductType) =>
    catalogByName.get(normalizeProductName(product.title)) ?? null;

  const handleAddToCart = async (product: ProductType) => {
    if (isCatalogLoading) {
      setToastMessage("Loading products...");
      return;
    }

    const catalogProduct = resolveCatalogProduct(product);
    if (!catalogProduct) {
      setToastMessage("This item isn't available yet.");
      return;
    }

    await addItem(catalogProduct);
    setToastMessage("Added to cart!");
  };

  const selectedCatalogProduct = selectedProduct
    ? resolveCatalogProduct(selectedProduct)
    : null;

  return (
    <div className="w-full">
      <div className="pt-12 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Our Collection
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-8">
            Browse our collection designed for modern and minimalist styles. Find pieces that define your space.
          </p>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm ${
                  activeCategory === cat 
                    ? "bg-[#91A57D] text-white shadow-md transform -translate-y-0.5" 
                    : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent hover:border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, idx) => {
            const catalogProduct = resolveCatalogProduct(product);
            const isDisabled = isCatalogLoading || !catalogProduct;

            return (
              <div 
                key={idx} 
                onClick={() => setSelectedProduct(product)}
                className="group cursor-pointer bg-white rounded-[2rem] p-4 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col"
              >
                <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-6 bg-[#f1ede7]">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                </div>
                <div className="px-2 pb-2 flex justify-between items-end flex-1">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{product.title}</h3>
                    <p className="text-lg font-semibold text-[#91A57D]">{product.price}</p>
                  </div>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      handleAddToCart(product);
                    }}
                    disabled={isDisabled}
                    aria-disabled={isDisabled}
                    aria-label="Add to cart"
                    title={isDisabled ? "Unavailable" : "Add to cart"}
                    className="w-12 h-12 rounded-full bg-[#f4f3f0] flex items-center justify-center group-hover:bg-[#91A57D] group-hover:text-white transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart size={20} className="transform group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-gray-400">No products found for this category.</h3>
          </div>
        )}
      </div>

      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-3xl shadow-2xl relative flex flex-col md:flex-row gap-8 overflow-y-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProduct(null)} 
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors z-10"
              >
                <X size={20} />
              </button>

            {/* Modal Image */}
            <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-auto rounded-2xl overflow-hidden bg-[#f1ede7] flex-shrink-0">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.title} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Content */}
            <div className="flex flex-col justify-center w-full md:w-1/2">
              <div className="mb-2">
                <span className="text-sm font-bold uppercase tracking-wider text-[#91A57D]">
                  {selectedProduct.category}
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mt-1 mb-2">
                  {selectedProduct.title}
                </h2>
                <p className="text-2xl font-semibold text-gray-700 mb-6">
                  {selectedProduct.price}
                </p>
              </div>

              <p className="text-gray-600 text-base mb-8 leading-relaxed">
                {selectedProduct.desc}
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                  <span className="font-semibold text-gray-900 w-20">Size</span>
                  <span className="text-gray-600">{selectedProduct.size}</span>
                </div>
                <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                  <span className="font-semibold text-gray-900 w-20">Build</span>
                  <span className="text-gray-600">{selectedProduct.build}</span>
                </div>
                <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                  <span className="font-semibold text-gray-900 w-20">Color</span>
                  <span className="text-gray-600">{selectedProduct.color}</span>
                </div>
              </div>

              <button
                onClick={() => handleAddToCart(selectedProduct)}
                disabled={
                  isCatalogLoading ||
                  !selectedCatalogProduct
                }
                aria-disabled={
                  isCatalogLoading ||
                  !selectedCatalogProduct
                }
                className="w-full bg-[#91A57D] hover:bg-[#7a8d67] text-white py-4 rounded-xl font-bold text-lg shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={22} />
                Add to Cart
              </button>
            </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-[#91A57D] text-white px-5 py-3 rounded-2xl shadow-xl"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}