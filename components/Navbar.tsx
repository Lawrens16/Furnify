"use client";

import { Search, Heart, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

export default function Navbar() {
  const { itemCount, openDrawer } = useCart();

  return (
    <>
      <nav className="w-full h-20 flex items-center justify-between px-8 bg-[#e8e7e3]">
        <div className="flex items-center gap-12">
          <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900">
            Furnify
          </Link>
          <div className="hidden md:flex gap-3 text-sm font-medium text-gray-700">
            <Link href="/" className="px-4 py-2 rounded-full bg-white/70 hover:bg-white text-gray-700 hover:text-[#91A57D] transition-colors shadow-sm">Home</Link>
            <Link href="/shop" className="px-4 py-2 rounded-full bg-white/70 hover:bg-white text-gray-700 hover:text-[#91A57D] transition-colors shadow-sm">Shop</Link>
            <Link href="/build" className="px-4 py-2 rounded-full bg-white/70 hover:bg-white text-gray-700 hover:text-[#91A57D] transition-colors shadow-sm">Build</Link>
            <Link href="/about" className="px-4 py-2 rounded-full bg-white/70 hover:bg-white text-gray-700 hover:text-[#91A57D] transition-colors shadow-sm">About Us</Link>
            <Link href="/contact" className="px-4 py-2 rounded-full bg-white/70 hover:bg-white text-gray-700 hover:text-[#91A57D] transition-colors shadow-sm">Contact Us</Link>
            
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-700 hover:text-[#91A57D] transition-all duration-200 p-2">
            <Search size={20} />
          </button>
          
          <button
            onClick={openDrawer}
            className="text-gray-700 hover:text-[#91A57D] transition-all duration-200 p-2 relative"
            aria-label="Open cart"
          >
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-[#91A57D] text-white text-xs rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
          
        </div>
      </nav>
      <CartDrawer />
    </>
  );
}