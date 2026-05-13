"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/ui/footer-section";
import { useCart } from "@/context/CartContext";
import { placeOrder } from "@/lib/actions/orders";
import type { CheckoutFormData } from "@/types/database";

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

const initialFormData: CheckoutFormData = {
  full_name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  province: "",
  zip_code: "",
  notes: "",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, sessionId, clearItems, isLoading } = useCart();
  const [formData, setFormData] = useState<CheckoutFormData>(initialFormData);
  const [errors, setErrors] = useState<
    Partial<Record<keyof CheckoutFormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isLoading && items.length === 0) {
      router.replace("/cart");
    }
  }, [isLoading, items.length, router]);

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2000);

    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, [toastMessage]);

  const orderTotal = useMemo(() => subtotal, [subtotal]);

  const validateForm = () => {
    const nextErrors: Partial<Record<keyof CheckoutFormData, string>> = {};
    const requiredFields: Array<keyof CheckoutFormData> = [
      "full_name",
      "email",
      "address",
      "city",
      "province",
      "zip_code",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        nextErrors[field] = "This field is required.";
      }
    });

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Please enter a valid email.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (
    field: keyof CheckoutFormData,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const result = await placeOrder(sessionId, formData, items);

    if ("error" in result) {
      setToastMessage(result.error);
      setIsSubmitting(false);
      return;
    }

    await clearItems();
    router.push(`/checkout/success/${result.orderId}`);
  };

  return (
    <main className="min-h-screen bg-[#e8e7e3] text-gray-900 font-sans selection:bg-[#91A57D] selection:text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-6">
        <p className="text-sm text-gray-400">Cart  Checkout</p>
        <h1 className="text-4xl font-bold mt-2">Checkout</h1>
      </div>

      <div className="lg:grid lg:grid-cols-5 lg:gap-12 max-w-7xl mx-auto px-4 md:px-8 pb-16">
        <div className="lg:col-span-3">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit();
            }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-sm mb-6">
              <h2 className="text-xl font-bold mb-6">Contact Information</h2>

              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={formData.full_name}
                onChange={(event) =>
                  handleChange("full_name", event.target.value)
                }
                className={`w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#91A57D] focus:border-transparent ${
                  errors.full_name
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-200"
                }`}
              />
              {errors.full_name && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.full_name}
                </p>
              )}

              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 mt-6">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(event) => handleChange("email", event.target.value)}
                className={`w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#91A57D] focus:border-transparent ${
                  errors.email
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-200"
                }`}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}

              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 mt-6">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(event) => handleChange("phone", event.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#91A57D] focus:border-transparent"
              />
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm mb-6">
              <h2 className="text-xl font-bold mb-6">Shipping Address</h2>

              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Street Address
              </label>
              <input
                type="text"
                placeholder="123 Main St"
                value={formData.address}
                onChange={(event) => handleChange("address", event.target.value)}
                className={`w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#91A57D] focus:border-transparent ${
                  errors.address
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-200"
                }`}
              />
              {errors.address && (
                <p className="text-red-400 text-xs mt-1">{errors.address}</p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(event) =>
                      handleChange("city", event.target.value)
                    }
                    className={`w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#91A57D] focus:border-transparent ${
                      errors.city
                        ? "border-red-400 focus:ring-red-400"
                        : "border-gray-200"
                    }`}
                  />
                  {errors.city && (
                    <p className="text-red-400 text-xs mt-1">{errors.city}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Province / State
                  </label>
                  <input
                    type="text"
                    value={formData.province}
                    onChange={(event) =>
                      handleChange("province", event.target.value)
                    }
                    className={`w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#91A57D] focus:border-transparent ${
                      errors.province
                        ? "border-red-400 focus:ring-red-400"
                        : "border-gray-200"
                    }`}
                  />
                  {errors.province && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.province}
                    </p>
                  )}
                </div>
              </div>

              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 mt-6">
                ZIP / Postal Code
              </label>
              <input
                type="text"
                value={formData.zip_code}
                onChange={(event) =>
                  handleChange("zip_code", event.target.value)
                }
                className={`w-full px-4 py-3 rounded-xl border bg-gray-50 text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#91A57D] focus:border-transparent ${
                  errors.zip_code
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-200"
                }`}
              />
              {errors.zip_code && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.zip_code}
                </p>
              )}
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm mb-6">
              <h2 className="text-xl font-bold mb-6">Additional Notes</h2>
              <textarea
                rows={4}
                placeholder="Special delivery instructions..."
                value={formData.notes}
                onChange={(event) => handleChange("notes", event.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#91A57D] focus:border-transparent resize-none"
              />
            </div>
          </form>
        </div>

        <div className="lg:col-span-2">
          <div className="sticky top-24 bg-white rounded-3xl shadow-md p-8">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 py-3 border-b border-gray-50"
                >
                  <img
                    src={item.product.image ?? "https://placehold.co/100x100.png"}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-xl object-cover bg-gray-50"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-gray-900 ml-auto">
                    {formatPrice(Number(item.product.price) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <hr className="mt-4 mb-4 border-gray-100" />

            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total</span>
              <span className="text-[#91A57D]">
                {formatPrice(orderTotal)}
              </span>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 mb-6 flex items-center gap-3">
              <Lock size={18} className="text-gray-400" />
              <span className="text-sm text-gray-400">
                Payment method coming soon
              </span>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-[#91A57D] hover:bg-[#7e916c] text-white font-semibold py-4 rounded-full transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center justify-center gap-3">
                  <span className="h-5 w-5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  Placing Order...
                </span>
              ) : (
                "Place Order"
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-[#91A57D] text-white px-5 py-3 rounded-2xl shadow-xl"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
