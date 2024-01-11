export interface Product {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  sku: string;
  rating: number;
  stock: number;
}

export interface PaginatedProductResponse {
  data: Product[];
  count: number;
  page: number;
  limit: number;
}
