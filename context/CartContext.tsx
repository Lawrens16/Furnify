"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartItemWithProduct, Product } from "@/types/database";
import {
  addToCart,
  clearCart,
  getCartItems,
  removeFromCart,
  updateCartItemQuantity,
} from "@/lib/actions/cart";

type CartState = {
  items: CartItemWithProduct[];
  itemCount: number;
  subtotal: number;
  sessionId: string;
  isLoading: boolean;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (product: Product) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearItems: () => Promise<void>;
};

const CartContext = createContext<CartState | undefined>(undefined);

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") {
    return "";
  }

  const stored = window.localStorage.getItem("furnify_session_id");
  if (stored) {
    return stored;
  }

  const newId = window.crypto.randomUUID();
  window.localStorage.setItem("furnify_session_id", newId);
  return newId;
}

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<CartItemWithProduct[]>([]);
  const [sessionId, setSessionId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const refreshCart = useCallback(async (activeSessionId: string) => {
    setIsLoading(true);
    const cartItems = await getCartItems(activeSessionId);
    setItems(cartItems);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    let isActive = true;

    const initialize = async () => {
      const activeSessionId = getOrCreateSessionId();
      if (!activeSessionId) {
        return;
      }

      if (isActive) {
        setSessionId(activeSessionId);
      }

      await refreshCart(activeSessionId);
    };

    initialize();

    return () => {
      isActive = false;
    };
  }, [refreshCart]);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const ensureSessionId = useCallback(() => {
    const activeSessionId = sessionId || getOrCreateSessionId();
    if (!sessionId && activeSessionId) {
      setSessionId(activeSessionId);
    }
    return activeSessionId;
  }, [sessionId]);

  const addItem = useCallback(
    async (product: Product) => {
      const activeSessionId = ensureSessionId();
      if (!activeSessionId) {
        return;
      }

      await addToCart(activeSessionId, product.id);
      await refreshCart(activeSessionId);
    },
    [ensureSessionId, refreshCart],
  );

  const removeItem = useCallback(
    async (productId: string) => {
      const activeSessionId = ensureSessionId();
      if (!activeSessionId) {
        return;
      }

      await removeFromCart(activeSessionId, productId);
      await refreshCart(activeSessionId);
    },
    [ensureSessionId, refreshCart],
  );

  const updateQuantity = useCallback(
    async (productId: string, quantity: number) => {
      const activeSessionId = ensureSessionId();
      if (!activeSessionId) {
        return;
      }

      await updateCartItemQuantity(activeSessionId, productId, quantity);
      await refreshCart(activeSessionId);
    },
    [ensureSessionId, refreshCart],
  );

  const clearItems = useCallback(async () => {
    const activeSessionId = ensureSessionId();
    if (!activeSessionId) {
      return;
    }

    await clearCart(activeSessionId);
    await refreshCart(activeSessionId);
  }, [ensureSessionId, refreshCart]);

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) => total + Number(item.product.price) * item.quantity,
        0,
      ),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      sessionId,
      isLoading,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
      addItem,
      removeItem,
      updateQuantity,
      clearItems,
    }),
    [
      items,
      itemCount,
      subtotal,
      sessionId,
      isLoading,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
      addItem,
      removeItem,
      updateQuantity,
      clearItems,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartState {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
