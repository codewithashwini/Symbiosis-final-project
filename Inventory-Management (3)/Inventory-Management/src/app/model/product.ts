export interface Product {
  id?: number;  // Optional for when adding a new product, it will be generated by the database
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  sku: string;
  category: string;
}