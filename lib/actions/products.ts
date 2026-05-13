"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import type { Product } from "@/types/database";

export async function getProducts(): Promise<Product[]> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("getProducts error:", error);
    return [];
  }

  return data ?? [];
}

export async function getProductById(id: string): Promise<Product | null> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("getProductById error:", error);
    return null;
  }

  return data ?? null;
}
