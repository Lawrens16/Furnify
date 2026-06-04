// Local cart stored in localStorage — used for Shop and Build items.
// DB cart (CartContext items) remains for BestSellers/catalog items only.

export type LocalCartItem = {
  id: string;
  type: "shop" | "build";
  name: string;
  price: number;
  image?: string;
  quantity: number;
  // Build-only fields
  config?: {
    shape: string;
    fabric: string;
    fabricColor: string;
    legs: string;
  };
};

const KEY = "furnify_local_cart";

export function getLocalCart(): LocalCartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as LocalCartItem[]) : [];
  } catch {
    return [];
  }
}

export function saveLocalCart(items: LocalCartItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function addLocalShopItem(
  name: string,
  price: number,
  image: string,
): LocalCartItem[] {
  const items = getLocalCart();
  const existing = items.find((i) => i.type === "shop" && i.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    items.push({
      id: crypto.randomUUID(),
      type: "shop",
      name,
      price,
      image,
      quantity: 1,
    });
  }
  saveLocalCart(items);
  return items;
}

export function addLocalBuildItem(
  shape: string,
  fabric: string,
  fabricColor: string,
  legs: string,
  price: number,
): LocalCartItem[] {
  const items = getLocalCart();
  // Same config → increment; different config → new entry
  const existing = items.find(
    (i) =>
      i.type === "build" &&
      i.config?.shape === shape &&
      i.config?.fabric === fabric &&
      i.config?.legs === legs,
  );
  if (existing) {
    existing.quantity += 1;
  } else {
    items.push({
      id: crypto.randomUUID(),
      type: "build",
      name: `Custom ${shape}`,
      price,
      quantity: 1,
      config: { shape, fabric, fabricColor, legs },
    });
  }
  saveLocalCart(items);
  return items;
}

export function updateLocalItemQuantity(
  id: string,
  quantity: number,
): LocalCartItem[] {
  let items = getLocalCart();
  if (quantity <= 0) {
    items = items.filter((i) => i.id !== id);
  } else {
    const item = items.find((i) => i.id === id);
    if (item) item.quantity = quantity;
  }
  saveLocalCart(items);
  return items;
}

export function removeLocalItem(id: string): LocalCartItem[] {
  const items = getLocalCart().filter((i) => i.id !== id);
  saveLocalCart(items);
  return items;
}

export function clearLocalCart(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
