export interface Store {
  id: string;
  name: string;
  ownerId: string;
  address: string;
  createdAt: string;
}

export interface Sale {
  id: string;
  storeId: string;
  sellerId: string;
  products: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  createdAt: string;
}

export interface Analytics {
  totalSales: number;
  totalRevenue: number;
  topProducts: {
    productId: string;
    name: string;
    quantity: number;
    revenue: number;
  }[];
  salesByDate: {
    date: string;
    sales: number;
    revenue: number;
  }[];
}