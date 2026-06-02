export type Product = {
  id: number;
  name: string;
  description: string;
  sellPrice: number;
  ingredients: ProductItemDetail[];
  category: category[];
  imageUrl: string;
  isActive: boolean;
  productLink: string;
};

export type ProductItemDetail = {
  item: items;
  quantity: number;
};

export type items = {
  id: number;
  name: string;
  description: string;
  cost: number;
  stock: number;
  category: category[];
  imageUrl: string;
  isActive: boolean;
  itemLink: string;
};

export type category = {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  categoryLink: string;
};
