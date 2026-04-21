"use client";

import { motion } from "framer-motion";
import { Star, Heart, Link, TypeIcon as typeButton, ShoppingCart, Box } from "lucide-react";
import Image from "next/image";

export default function BestSellers() {
  const products = [
    {
      id: 1,
      name: "Modern Lounge Chair",
      rating: 5.0,
      reviews: "120+",
      originalPrice: "$399.00",
      price: "$299.00",
      image: "https://placehold.co/400x500.png",
      tag: "Sale",
    },
    {
      id: 2,
      name: "Minimalist Sofa",
      rating: 4.8,
      reviews: "95+",
      originalPrice: "$899.00",
      price: "$750.00",
      image: "https://placehold.co/400x400.png",
      tag: "Best Seller",
    },
    {
      id: 3,
      name: "Industrial Floor Lamp",
      rating: 4.9,
      reviews: "210+",
      originalPrice: "$150.00",
      price: "$120.00",
      image: "https://placehold.co/300x500.png",
      tag: "New",
    },
  ];

  return (
    <section className="w-full px-4 md:px-8 py-16 bg-[#e8e7e3]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 w-full md:w-auto">
            Best Selling Products
          </h2>
          <div className="hidden md:block">
            <button className="bg-transparent border border-gray-400 text-gray-800 hover:bg-gray-100 font-semibold text-sm px-6 py-3 rounded-full transition-colors flex items-center gap-2 group">
              View All <span className="group-hover:translate-x-1 transition-transform">-&gt;</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20 items-stretch">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl p-4 md:p-6 shadow-sm hover:shadow-xl transition-all relative flex flex-col group overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-square md:h-80 bg-gray-50 rounded-2xl overflow-hidden mb-6 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                />

                {/* Tags */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-white/90 backdrop-blur-md text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {product.tag}
                  </span>
                  <div className="bg-[#91A57D] text-white text-xs font-bold p-1 rounded-full flex items-center justify-center w-6 h-6 shadow-md" title="3D View Available">
                    <Box size={14} />
                  </div>
                </div>

                {/* Heart Button */}
                <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm text-gray-500 hover:text-red-500 hover:scale-110 transition-all z-10">
                  <Heart size={20} />
                </button>

                {/* Hover Add to Cart */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity flex items-center justify-center duration-300">
                  <button className="pointer-events-auto bg-white text-gray-900 font-semibold px-6 py-3 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all shadow-xl hover:bg-gray-100">
                    <ShoppingCart size={18} /> Add to Cart
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex-1 flex flex-col h-full">
                <div className="flex items-center gap-1 text-yellow-500 mb-2">
                  <Star fill="currentColor" size={16} />
                  <span className="text-sm font-semibold text-gray-800">{product.rating}</span>
                  <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2 line-clamp-1">{product.name}</h3>
                <div className="mt-auto flex items-center gap-3">
                  <span className="text-2xl font-bold text-gray-900 border-2 border-transparent">{product.price}</span>
                  <span className="text-base text-gray-400 font-medium line-through">{product.originalPrice}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Super Sale Banner */}
        <div className="w-full bg-[#91A57D] rounded-3xl md:rounded-[4rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between text-white shadow-2xl relative overflow-hidden">
          {/* Subtle bg Decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4 pointer-events-none"></div>

          <div className="md:w-1/2 z-10 w-full mb-10 md:mb-0">
            <span className="uppercase tracking-widest text-sm font-bold text-white/80 mb-4 block">Limited Time Offer</span>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">Super Sale <br /> Up To 50% Off</h2>
            
            {/* Countdown */}
            <div className="flex gap-4 md:gap-6 mb-8 text-center text-gray-900 font-bold">
              <div className="bg-white px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl shadow-xl w-16 md:w-24">
                <span className="text-2xl md:text-3xl block text-[#91A57D]">05</span>
                <span className="text-xs md:text-sm text-gray-500 uppercase">Days</span>
              </div>
              <div className="bg-white px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl shadow-xl w-16 md:w-24">
                <span className="text-2xl md:text-3xl block text-[#91A57D]">12</span>
                <span className="text-xs md:text-sm text-gray-500 uppercase">Hrs</span>
              </div>
              <div className="bg-white px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl shadow-xl w-16 md:w-24">
                <span className="text-2xl md:text-3xl block text-[#91A57D]">45</span>
                <span className="text-xs md:text-sm text-gray-500 uppercase">Mins</span>
              </div>
              <div className="bg-white px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl shadow-xl w-16 md:w-24">
                <span className="text-2xl md:text-3xl block text-[#91A57D]">20</span>
                <span className="text-xs md:text-sm text-gray-500 uppercase">Secs</span>
              </div>
            </div>

            <button className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-4 rounded-full transition-colors w-full md:w-auto shadow-lg hover:shadow-xl hover:-translate-y-1 transform">
              Shop Now
            </button>
          </div>

          <div className="md:w-1/2 z-10 w-full flex justify-center md:justify-end relative">
             <div className="absolute top-4 right-4 bg-[#e8e7e3] text-[#91A57D] p-3 rounded-full flex items-center justify-center shadow-lg z-20" title="3D View Available">
                <Box size={24} />
             </div>
             <img src="https://placehold.co/800x600.png" alt="Super Sale Sofa" className="w-full max-w-lg object-cover rounded-2xl md:rounded-3xl shadow-2xl skew-y-3 md:skew-y-2 hover:skew-y-0 transition-transform duration-500" />
          </div>
        </div>

      </div>
    </section>
  );
}