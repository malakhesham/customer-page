export type Review = { user: string; rating: number; comment: string; date?: string };

export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  images?: string[];
  category?: string;
  vendor?: string;
  rating?: number;
  stock?: number;
  specs?: Record<string, any>;
  reviews?: Review[];
  viewers?: number;
  approved?: boolean;
  sku?: string;
  shipping?: any;
};
