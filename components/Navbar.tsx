"use client";

import { Search, Heart, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
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
          <Link href="/blog" className="px-4 py-2 rounded-full bg-white/70 hover:bg-white text-gray-700 hover:text-[#91A57D] transition-colors shadow-sm">Blog</Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-gray-700 hover:text-[#91A57D] transition-colors p-2">
          <Search size={20} />
        </button>
        <button className="text-gray-700 hover:text-[#91A57D] transition-colors p-2">
          <Heart size={20} />
        </button>
        <button className="text-gray-700 hover:text-[#91A57D] transition-colors p-2 relative">
          <ShoppingCart size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="ml-2">
          <img
            src="https://placehold.co/40x40.png"
            alt="User avatar"
            className="w-10 h-10 rounded-full object-cover border-2 border-transparent hover:border-[#91A57D] transition-colors cursor-pointer"
          />
        </div>
      </div>
    </nav>
  );
}