export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  storeId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}