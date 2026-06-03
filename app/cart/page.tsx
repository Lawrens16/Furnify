"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export default function CartPage() {
  const router = useRouter();
  const { items, itemCount, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <main className="min-h-screen bg-[#e8e7e3] text-gray-900 font-sans selection:bg-[#91A57D] selection:text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-wrap items-center gap-4 mb-10">
          <h1 className="text-4xl font-bold">Your Cart</h1>
          <span className="text-sm bg-white rounded-full px-4 py-2 shadow-sm">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>
        </div>

        <AnimatePresence mode="wait">
          {items.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex flex-col items-center justify-center text-center py-20"
            >
              <ShoppingCart size={64} className="text-gray-300 mb-6" />
              <p className="text-2xl font-semibold text-gray-500 mb-6">
                Your cart is empty
              </p>
              <Link
                href="/"
                className="bg-[#91A57D] hover:bg-[#7e916c] text-white rounded-full px-8 py-4 font-semibold transition-all duration-200"
              >
                Explore Our Collection
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="filled"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:grid lg:grid-cols-3 lg:gap-12"
            >
              <div className="lg:col-span-2">
                <h2 className="text-xl font-bold mb-6">Cart Items</h2>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl p-6 mb-4 shadow-sm flex flex-col sm:flex-row gap-6"
                  >
                    <img
                      src={item.product.image ?? "https://placehold.co/200x200.png"}
                      alt={item.product.name}
                      className="w-full sm:w-32 h-32 rounded-2xl object-cover bg-gray-50 flex-shrink-0"
                    />
                    <div className="flex-1 flex flex-col">
                      {item.product.tag && (
                        <span className="text-xs font-bold bg-[#91A57D]/10 text-[#91A57D] px-3 py-1 rounded-full inline-block mb-2">
                          {item.product.tag}
                        </span>
                      )}
                      <h3 className="text-xl font-bold text-gray-900">
                        {item.product.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-2xl font-bold text-gray-900">
                          {formatPrice(Number(item.product.price))}
                        </span>
                        {item.product.original_price && (
                          <span className="line-through text-gray-400 text-base">
                            {formatPrice(Number(item.product.original_price))}
                          </span>
                        )}
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-6">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="w-9 h-9 rounded-full border-2 border-[#91A57D] text-[#91A57D] hover:bg-[#91A57D] hover:text-white font-bold transition-all duration-200"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="text-lg font-semibold mx-4">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="w-9 h-9 rounded-full border-2 border-[#91A57D] text-[#91A57D] hover:bg-[#91A57D] hover:text-white font-bold transition-all duration-200"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xl font-bold text-[#91A57D]">
                            {formatPrice(
                              Number(item.product.price) * item.quantity,
                            )}
                          </span>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-gray-400 hover:text-red-400 transition-all duration-200 ml-4"
                            aria-label="Remove item"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-white rounded-3xl shadow-md p-8">
                  <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-sm text-gray-400">
                      Calculated at checkout
                    </span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-gray-900 font-semibold">
                      Estimated Total
                    </span>
                    <span className="text-[#91A57D] font-bold text-lg">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <button
                    onClick={() => router.push("/checkout")}
                    className="w-full mt-6 bg-[#91A57D] hover:bg-[#7e916c] text-white font-semibold py-4 rounded-full transition-all duration-200"
                  >
                    Proceed to Checkout 
                  </button>
                  <button
                    onClick={() => router.push("/")}
                    className="w-full mt-4 text-gray-500 hover:text-[#91A57D] text-sm underline-offset-2 hover:underline transition-all duration-200"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </main>
  );
}
