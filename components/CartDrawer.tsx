"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export default function CartDrawer() {
  const router = useRouter();
  const {
    items,
    itemCount,
    subtotal,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
  } = useCart();

  const itemLabel = itemCount === 1 ? "item" : "items";

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={closeDrawer}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-gray-100 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {itemCount} {itemLabel}
                </p>
              </div>
              <button
                onClick={closeDrawer}
                className="text-gray-400 hover:text-gray-700 transition-all duration-200"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              <AnimatePresence mode="wait">
                {items.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="h-full flex flex-col items-center justify-center text-center gap-4"
                  >
                    <ShoppingCart size={48} className="text-gray-300" />
                    <div>
                      <p className="text-gray-700 font-semibold">Your cart is empty</p>
                      <p className="text-sm text-gray-500">Find something you love.</p>
                    </div>
                    <button
                      onClick={closeDrawer}
                      className="px-5 py-2 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-100 transition-all duration-200"
                    >
                      Continue Shopping
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="items"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 py-4 border-b border-gray-100"
                      >
                        <img
                          src={item.product.image ?? "https://placehold.co/200x200.png"}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-xl object-cover bg-gray-50"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">
                            {item.product.name}
                          </p>
                          {item.product.tag && (
                            <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-[#91A57D]/10 text-[#91A57D]">
                              {item.product.tag}
                            </span>
                          )}
                          <p className="text-sm font-bold text-[#91A57D] mt-2">
                            {formatPrice(Number(item.product.price))}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="w-7 h-7 rounded-full border border-gray-200 text-gray-700 hover:bg-[#91A57D] hover:text-white transition-all duration-200"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="text-sm font-semibold w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="w-7 h-7 rounded-full border border-gray-200 text-gray-700 hover:bg-[#91A57D] hover:text-white transition-all duration-200"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-gray-400 hover:text-red-400 transition-all duration-200 ml-2"
                            aria-label="Remove item"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="border-t border-gray-100 px-6 py-6 bg-white">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-700">Subtotal</span>
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <button
                onClick={() => {
                  router.push("/cart");
                  closeDrawer();
                }}
                className="w-full rounded-full border border-[#91A57D] text-[#91A57D] py-3 font-semibold hover:bg-[#91A57D]/10 transition-all duration-200"
              >
                View Cart
              </button>
              <button
                onClick={() => {
                  router.push("/checkout");
                  closeDrawer();
                }}
                className="w-full rounded-full bg-[#91A57D] text-white py-3 font-semibold mt-2 hover:bg-[#7e916c] transition-all duration-200"
              >
                Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
