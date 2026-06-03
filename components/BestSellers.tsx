"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Box, Heart, ShoppingCart, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { getProducts } from "@/lib/actions/products";
import type { Product } from "@/types/database";

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export default function BestSellers() {
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      const data = await getProducts();
      if (isMounted) {
        setProducts(data);
        setIsLoading(false);
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const handleAddToCart = async (product: Product) => {
    await addItem(product);
    setShowToast(true);

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  return (
    <section className="w-full px-4 md:px-8 py-16 bg-[#e8e7e3]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 w-full md:w-auto">
            Best Selling Products
          </h2>
          <div className="hidden md:block">
            <button className="bg-transparent border border-gray-400 text-gray-800 hover:bg-gray-100 font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 flex items-center gap-2 group">
              View All <span className="group-hover:translate-x-1 transition-transform">-&gt;</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20 items-stretch">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="bg-gray-200/70 rounded-3xl h-96 animate-pulse"
                />
              ))
            : products.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-3xl p-4 md:p-6 shadow-sm hover:shadow-xl transition-all relative flex flex-col group overflow-hidden"
                >
                  <div className="relative w-full aspect-square md:h-80 bg-gray-50 rounded-2xl overflow-hidden mb-6 flex items-center justify-center">
                    <img
                      src={product.image ?? "https://placehold.co/400x400.png"}
                      alt={product.name}
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute top-4 left-4 flex gap-2">
                      {product.tag && (
                        <span className="bg-white/90 backdrop-blur-md text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                          {product.tag}
                        </span>
                      )}
                      {product.has_3d && (
                        <div
                          className="bg-[#91A57D] text-white text-xs font-bold p-1 rounded-full flex items-center justify-center w-6 h-6 shadow-md"
                          title="3D View Available"
                        >
                          <Box size={14} />
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm transition-all duration-200 z-10"
                      aria-label="Toggle wishlist"
                    >
                      <Heart
                        size={20}
                        className={
                          wishlistIds.includes(product.id)
                            ? "text-red-500"
                            : "text-gray-500"
                        }
                        fill={
                          wishlistIds.includes(product.id)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity flex items-center justify-center duration-300">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="pointer-events-auto bg-white text-gray-900 font-semibold px-6 py-3 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-200 shadow-xl hover:bg-gray-100"
                      >
                        <ShoppingCart size={18} /> Add to Cart
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col h-full">
                    <div className="flex items-center gap-1 text-yellow-500 mb-2">
                      <Star fill="currentColor" size={16} />
                      <span className="text-sm font-semibold text-gray-800">
                        {product.rating}
                      </span>
                      <span className="text-xs text-gray-500 ml-1">
                        ({product.reviews})
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="mt-auto flex items-center gap-3">
                      <span className="text-2xl font-bold text-gray-900 border-2 border-transparent">
                        {formatPrice(Number(product.price))}
                      </span>
                      {product.original_price && (
                        <span className="text-base text-gray-400 font-medium line-through">
                          {formatPrice(Number(product.original_price))}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>

        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 right-6 z-50 bg-[#91A57D] text-white px-5 py-3 rounded-2xl shadow-xl"
            >
              Added to cart!
            </motion.div>
          )}
        </AnimatePresence>

        

      </div>
    </section>
  );
}