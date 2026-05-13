"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function FloatingCart() {
  const { itemCount } = useCart();

  return (
    <Link
      href="/cart"
      aria-label="Open cart"
      className="fixed bottom-8 right-8 z-50"
    >
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#91A57D] text-white shadow-xl hover:bg-[#7a8c69] hover:scale-110 transition-all duration-300">
        <ShoppingCart size={22} />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </span>
    </Link>
  );
}
