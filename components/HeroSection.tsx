"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Truck, Headset, ShieldCheck, Box } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="w-full px-4 md:px-8 pb-12 pt-4 bg-[#e8e7e3]">
      {/* Hero Container */}
      <div className="relative w-full rounded-t-[3rem] rounded-bl-[4rem] rounded-br-3xl bg-[#91A57D] overflow-hidden min-h-[600px] flex flex-col items-center justify-between text-white shadow-xl">
        
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter w-full max-w-4xl mx-auto leading-tight drop-shadow-md">
            Discover Your Perfect Space
          </h1>
        </motion.div>

        {/* Sofa Placeholder */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-5xl px-4 mt-8 flex-1 flex items-end justify-center z-0"
        >
          <img
            src="https://placehold.co/1200x600.png"
            alt="Modern sofa"
            className="w-full object-cover object-bottom shadow-2xl rounded-t-3xl"
          />
        </motion.div>

        {/* Floating Card: Furniture Design Ideas */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="absolute left-8 bottom-32 md:bottom-48 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl w-64 text-gray-900 border border-white/20"
        >
          <div className="flex items-center gap-2 mb-2 text-[#91A57D]">
            <Box size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">3D View Available</span>
          </div>
          <h3 className="font-bold text-lg mb-2">Furniture Design Ideas</h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            Explore our curated collections of modern interiors.
          </p>
          <button className="flex items-center gap-2 text-[#91A57D] font-semibold text-sm hover:underline group">
            Shop Now <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

      </div>

      {/* Feature Bar */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto px-4">
        {[
          { icon: <ShoppingBag size={24} />, text: "Easy For Shopping" },
          { icon: <Truck size={24} />, text: "Fast & Free Shipping" },
          { icon: <Headset size={24} />, text: "24/7 Support" },
          { icon: <ShieldCheck size={24} />, text: "Money Back Guarantee" },
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 + idx * 0.1 }}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm text-center hover:shadow-md transition-shadow cursor-default"
          >
            <div className="text-[#91A57D] mb-3 bg-[#e8e7e3] p-3 rounded-full">
              {feature.icon}
            </div>
            <p className="font-semibold text-gray-800 text-sm md:text-base">{feature.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}