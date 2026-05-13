export type Product = {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  image: string | null;
  tag: string | null;
  rating: number;
  reviews: string;
  has_3d: boolean;
  created_at: string;
};

export type CartItem = {
  id: string;
  session_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  product?: Product;
};

export type CartItemWithProduct = CartItem & {
  product: Product;
};

export type Order = {
  id: string;
  session_id: string;
  full_name: string;
  email: string;
  phone: string | null;
  address: string;
  city: string;
  province: string;
  zip_code: string;
  notes: string | null;
  subtotal: number;
  shipping_fee: number;
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  created_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  product_image: string | null;
  quantity: number;
  unit_price: number;
  subtotal: number;
};

export type OrderWithItems = Order & {
  order_items: OrderItem[];
};

export type CheckoutFormData = {
  full_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  zip_code: string;
  notes: string;
};
