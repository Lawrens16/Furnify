"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/ui/footer-section";
import { getOrderById } from "@/lib/actions/orders";
import type { OrderWithItems } from "@/types/database";

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export default function OrderSuccessPage() {
  const params = useParams();
  const [order, setOrder] = useState<OrderWithItems | null>(null);

  useEffect(() => {
    const loadOrder = async () => {
      const orderId = params.orderId as string | undefined;
      if (!orderId) {
        return;
      }

      const data = await getOrderById(orderId);
      setOrder(data);
    };

    loadOrder();
  }, [params.orderId]);

  return (
    <main className="min-h-screen bg-[#e8e7e3] text-gray-900 font-sans selection:bg-[#91A57D] selection:text-white">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-24 h-24 bg-[#91A57D] rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <CheckCircle size={48} className="text-white" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Order Confirmed!
          </h1>

          {order ? (
            <>
              <p className="text-lg text-gray-600 mb-1">
                Thank you, {order.full_name}!
              </p>
              <p className="text-sm text-gray-400 mb-10">
                Order #{order.id.slice(0, 8).toUpperCase()}
              </p>

              <div className="bg-white rounded-3xl shadow-md p-8 text-left mb-8">
                <h2 className="text-lg font-bold mb-4">Items Ordered</h2>
                {order.order_items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">
                        {item.product_name}
                      </p>
                      <p className="text-sm text-gray-400">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="font-bold text-[#91A57D]">
                      {formatPrice(Number(item.subtotal))}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-100">
                  <span>Total</span>
                  <span>{formatPrice(Number(order.total))}</span>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-sm p-8 text-left mb-10">
                <h2 className="text-lg font-bold mb-4">Delivery Details</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">
                      Name
                    </p>
                    <p className="font-semibold text-gray-900">
                      {order.full_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">
                      Email
                    </p>
                    <p className="font-semibold text-gray-900">
                      {order.email}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">
                      Address
                    </p>
                    <p className="font-semibold text-gray-900">
                      {order.address}, {order.city}, {order.province} {order.zip_code}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="bg-[#91A57D] text-white rounded-full px-8 py-4 font-semibold hover:bg-[#7e916c] transition-all duration-200"
                >
                  Continue Shopping
                </Link>
                <Link
                  href="/"
                  className="border-2 border-[#91A57D] text-[#91A57D] rounded-full px-8 py-4 font-semibold hover:bg-[#91A57D]/10 transition-all duration-200"
                >
                  Back to Home
                </Link>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Loading your order...</p>
          )}
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
