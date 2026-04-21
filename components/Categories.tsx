"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Categories() {
  const categories = [
    {
      title: "Table",
      count: "1200+ Items",
      types: ["Dining Table", "Coffee Table", "Side Table"],
      image: "https://placehold.co/300x300.png",
      link: "#",
    },
    {
      title: "Chairs",
      count: "800+ Items",
      types: ["Armchair", "Lounge Chair", "Dining Chair"],
      image: "https://placehold.co/300x300.png",
      link: "#",
    },
    {
      title: "Light",
      count: "500+ Items",
      types: ["Floor Lamp", "Pendant Light", "Table Lamp"],
      image: "https://placehold.co/300x300.png",
      link: "#",
    },
  ];

  return (
    <section className="w-full px-4 md:px-8 py-16 bg-[#e8e7e3]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4 md:mb-0 w-full md:w-1/2">
            Explore <br /> Top Categories
          </h2>
          <p className="text-gray-600 md:w-1/3 leading-relaxed">
            Discover a wide variety of furniture designed specifically for modern and minimalist styles. Find pieces that define your space.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {/* 30% Offer Box */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="rounded-[2.5rem] bg-[#91A57D] text-white p-8 flex flex-col justify-center items-center shadow-lg transform transition-all cursor-pointer min-h-[300px]"
          >
            <h3 className="text-4xl lg:text-5xl font-extrabold mb-4 text-center">30% <br /> OFFER</h3>
            <p className="opacity-90 font-medium tracking-wide uppercase text-sm">On Select Items</p>
          </motion.div>

          {/* Category Cards */}
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8 }}
              className="bg-white rounded-[2.5rem] p-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all h-full"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-1">{cat.title}</h4>
                  <p className="text-sm font-medium text-[#91A57D] bg-[#91A57D]/10 inline-block px-3 py-1 rounded-full">{cat.count}</p>
                </div>
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-24 h-24 object-cover rounded-2xl shadow-sm bg-gray-100"
                />
              </div>

              <div className="flex flex-col gap-2 mb-6 flex-1">
                {cat.types.map((type, tIdx) => (
                  <span key={tIdx} className="text-gray-500 text-sm font-medium flex items-center gap-2 before:w-1.5 before:h-1.5 before:bg-gray-300 before:rounded-full">
                    {type}
                  </span>
                ))}
              </div>

              <a href={cat.link} className="flex items-center gap-2 text-gray-800 font-semibold text-sm hover:text-[#91A57D] group w-max">
                View All <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}