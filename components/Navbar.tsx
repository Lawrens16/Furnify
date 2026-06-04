"use client";

import { Search, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

// Products the search can surface (mirrors the shop catalogue)
const SEARCHABLE = [
  { title: "Modern Green Sofa",    href: "/shop", category: "Sofa" },
  { title: "Minimalist Oak Table", href: "/shop", category: "Table" },
  { title: "Ergonomic Chair",      href: "/shop", category: "Chair" },
  { title: "King Size Bed",        href: "/shop", category: "Bed" },
  { title: "Nordic Floor Lamp",    href: "/shop", category: "Lamp" },
  { title: "Abstract Bookshelf",   href: "/shop", category: "Modern Furniture" },
  { title: "Boho Ceramic Vase",    href: "/shop", category: "Interior" },
  { title: "Leather Recliner",     href: "/shop", category: "Sofa" },
  { title: "Glass Coffee Table",   href: "/shop", category: "Table" },
  { title: "Custom Builder",       href: "/build", category: "Build" },
];

export default function Navbar() {
  const { itemCount, openDrawer } = useCart();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim().length > 0
    ? SEARCHABLE.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // Focus input when overlay opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [searchOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSelect = (href: string) => {
    setSearchOpen(false);
    router.push(href);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) handleSelect(results[0].href);
  };

  return (
    <>
      <nav className="w-full h-20 flex items-center justify-between px-8 bg-[#e8e7e3]">
        <div className="flex items-center gap-12">
          <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900">
            Furnify
          </Link>
          <div className="hidden md:flex gap-3 text-sm font-medium text-gray-700">
            <Link href="/"       className="px-4 py-2 rounded-full bg-white/70 hover:bg-white text-gray-700 hover:text-[#91A57D] transition-colors shadow-sm">Home</Link>
            <Link href="/shop"   className="px-4 py-2 rounded-full bg-white/70 hover:bg-white text-gray-700 hover:text-[#91A57D] transition-colors shadow-sm">Shop</Link>
            <Link href="/build"  className="px-4 py-2 rounded-full bg-white/70 hover:bg-white text-gray-700 hover:text-[#91A57D] transition-colors shadow-sm">Build</Link>
            <Link href="/about"  className="px-4 py-2 rounded-full bg-white/70 hover:bg-white text-gray-700 hover:text-[#91A57D] transition-colors shadow-sm">About Us</Link>
            <Link href="/contact" className="px-4 py-2 rounded-full bg-white/70 hover:bg-white text-gray-700 hover:text-[#91A57D] transition-colors shadow-sm">Contact Us</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setSearchOpen(true)}
            className="text-gray-700 hover:text-[#91A57D] transition-all duration-200 p-2"
            aria-label="Open search"
          >
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

      {/* ── Search Overlay ── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            key="search-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Input row */}
              <form onSubmit={handleSubmit} className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                <Search size={20} className="text-gray-400 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, categories…"
                  className="flex-1 text-gray-900 text-base placeholder-gray-400 outline-none bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                  aria-label="Close search"
                >
                  <X size={18} />
                </button>
              </form>

              {/* Results */}
              {query.trim().length > 0 && (
                <ul className="max-h-72 overflow-y-auto py-2">
                  {results.length > 0 ? (
                    results.map((item) => (
                      <li key={item.title}>
                        <button
                          onClick={() => handleSelect(item.href)}
                          className="w-full flex items-center gap-4 px-5 py-3 hover:bg-[#91A57D]/8 transition-colors text-left group"
                        >
                          <div className="w-8 h-8 rounded-full bg-[#91A57D]/10 flex items-center justify-center flex-shrink-0">
                            <Search size={14} className="text-[#91A57D]" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 group-hover:text-[#91A57D] transition-colors">
                              {item.title}
                            </p>
                            <p className="text-xs text-gray-400">{item.category}</p>
                          </div>
                        </button>
                      </li>
                    ))
                  ) : (
                    <li className="px-5 py-6 text-center text-gray-400 text-sm">
                      No results for &ldquo;{query}&rdquo;
                    </li>
                  )}
                </ul>
              )}

              {/* Quick links when empty */}
              {query.trim().length === 0 && (
                <div className="px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Quick links</p>
                  <div className="flex flex-wrap gap-2">
                    {["Shop", "Build", "Sofa", "Table", "Chair", "Bed"].map((label) => (
                      <button
                        key={label}
                        onClick={() => setQuery(label)}
                        className="px-4 py-1.5 rounded-full bg-gray-100 hover:bg-[#91A57D] hover:text-white text-sm text-gray-600 transition-colors"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}