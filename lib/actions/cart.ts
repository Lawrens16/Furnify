"use client";

import { createClient } from "@/utils/supabase/client";
import type { CartItem, CartItemWithProduct, Product } from "@/types/database";

type CartItemRow = CartItem & {
  products?: Product | null;
};

export async function getCartItems(
  sessionId: string,
): Promise<CartItemWithProduct[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("cart_items")
    .select("*, products(*)")
    .eq("session_id", sessionId);

  if (error) {
    console.error("getCartItems error:", error);
    return [];
  }

  return (data as CartItemRow[] | null | undefined)?.map((item) => {
    const { products, ...cartItem } = item;

    return {
      ...cartItem,
      product: products as Product,
    } as CartItemWithProduct;
  }) ?? [];
}

export async function addToCart(
  sessionId: string,
  productId: string,
): Promise<void> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("session_id", sessionId)
    .eq("product_id", productId)
    .maybeSingle();

  if (error) {
    console.error("addToCart lookup error:", error);
    return;
  }

  if (data) {
    const { error: updateError } = await supabase
      .from("cart_items")
      .update({ quantity: data.quantity + 1 })
      .eq("id", data.id);

    if (updateError) {
      console.error("addToCart update error:", updateError);
    }

    return;
  }

  const { error: insertError } = await supabase.from("cart_items").insert({
    session_id: sessionId,
    product_id: productId,
    quantity: 1,
  });

  if (insertError) {
    console.error("addToCart insert error:", insertError);
  }
}

export async function updateCartItemQuantity(
  sessionId: string,
  productId: string,
  quantity: number,
): Promise<void> {
  if (quantity <= 0) {
    await removeFromCart(sessionId, productId);
    return;
  }

  const supabase = createClient();
  const { error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("session_id", sessionId)
    .eq("product_id", productId);

  if (error) {
    console.error("updateCartItemQuantity error:", error);
  }
}

export async function removeFromCart(
  sessionId: string,
  productId: string,
): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("session_id", sessionId)
    .eq("product_id", productId);

  if (error) {
    console.error("removeFromCart error:", error);
  }
}

export async function clearCart(sessionId: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("session_id", sessionId);

  if (error) {
    console.error("clearCart error:", error);
  }
}
