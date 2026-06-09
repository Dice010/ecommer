export type ProductDetail = ProductCard & {
  description: string;
  ingredients: ProductItemDetail[];
  category: category[];
};

export type ProductCard = {
  id: string;
  name: string;
  imageUrl?: string;
  sellPrice: number;
  productLink: string;
};

export type ProductItemDetail = {
  item: itemsDetail;
  quantity: number;
};

export type itemsDetail = ItemCard & {
  description: string;
  cost: number;
  category: category[];
};

export type ItemCard = {
  id: string;
  name: string;
  stock: number;
  itemLink: string;
  imageUrl?: string;
};

export type category = {
  id: string;
  name: string;
  description: string;
  categoryLink: string;
};
