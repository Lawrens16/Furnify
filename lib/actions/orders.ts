"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import type {
  CartItemWithProduct,
  CheckoutFormData,
  OrderWithItems,
} from "@/types/database";

export async function placeOrder(
  sessionId: string,
  formData: CheckoutFormData,
  cartItems: CartItemWithProduct[],
): Promise<{ orderId: string } | { error: string }> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const subtotal = cartItems.reduce((sum, item) => {
    const unitPrice = Number(item.product.price);
    return sum + unitPrice * item.quantity;
  }, 0);

  const shippingFee = 0;
  const total = subtotal + shippingFee;

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      session_id: sessionId,
      full_name: formData.full_name,
      email: formData.email,
      phone: formData.phone?.trim() ? formData.phone.trim() : null,
      address: formData.address,
      city: formData.city,
      province: formData.province,
      zip_code: formData.zip_code,
      notes: formData.notes?.trim() ? formData.notes.trim() : null,
      subtotal,
      shipping_fee: shippingFee,
      total,
    })
    .select("id")
    .single();

  if (orderError || !order) {
    console.error("placeOrder order insert error:", orderError);
    return { error: "Failed to create order." };
  }

  const orderItems = cartItems.map((item) => {
    const unitPrice = Number(item.product.price);

    return {
      order_id: order.id,
      product_id: item.product.id,
      product_name: item.product.name,
      product_image: item.product.image,
      quantity: item.quantity,
      unit_price: unitPrice,
      subtotal: unitPrice * item.quantity,
    };
  });

  const { error: orderItemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (orderItemsError) {
    console.error("placeOrder order_items insert error:", orderItemsError);
    return { error: "Failed to create order items." };
  }

  return { orderId: order.id };
}

export async function getOrderById(
  orderId: string,
): Promise<OrderWithItems | null> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (orderError || !order) {
    console.error("getOrderById order error:", orderError);
    return null;
  }

  const { data: orderItems, error: orderItemsError } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", orderId);

  if (orderItemsError) {
    console.error("getOrderById order_items error:", orderItemsError);
    return null;
  }

  return {
    ...order,
    order_items: orderItems ?? [],
  } as OrderWithItems;
}
