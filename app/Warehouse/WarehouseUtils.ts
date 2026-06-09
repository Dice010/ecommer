import { ProductDetail, itemsDetail } from "@/types/Product";

export function formatIdProduct(id: string): string {
  const cleanId = id.trim().toLowerCase();
  const match = cleanId.match(/\d+/);
  if (match) {
    const num = parseInt(match[0], 10);
    // Vẫn giữ tính năng format nếu bạn thích thêm số 0 ở đầu cho các ID mới
    // return `prod-${num.toString().padStart(2, "0")}`;
    return `prod-${num.toString()}`;
  }
  throw new Error("Lỗi định dạng ID.");
}

export function formatIdItem(id: string): string {
  const cleanId = id.trim().toLowerCase();
  const match = cleanId.match(/\d+/);
  if (match) {
    const num = parseInt(match[0], 10);
    return `item-${num.toString()}`;
  }
  throw new Error("Lỗi định dạng ID.");
}

export function autoProductIdIncrease(DB: ProductDetail[]): string {
  if (!DB || DB.length === 0) {
    return "1";
  }
  const ids = DB.map((product) => {
    const part = product.id.split("-");
    const num = Number(part[1]);
    return isNaN(num) ? 0 : num;
  });
  const maxId = Math.max(...ids);
  const nextId = maxId + 1;
  const newId = nextId.toString();
  return formatIdProduct(newId);
}

export function autoItemIdIncrease(DB: itemsDetail[]): string {
  if (!DB || DB.length === 0) {
    return "1";
  }
  const ids = DB.map((item) => {
    const part = item.id.split("-");
    const num = Number(part[1]);
    return isNaN(num) ? 0 : num;
  });
  const maxId = Math.max(...ids);
  const nextId = maxId + 1;
  const newId = nextId.toString();
  return formatIdItem(newId);
}

export function createNewProduct(
  DB: ProductDetail[],
  newProduct: Omit<ProductDetail, "id">,
): ProductDetail {
  return {
    id: autoProductIdIncrease(DB),
    ...newProduct,
  };
}

export function createNewItem(
  DB: itemsDetail[],
  newItem: Omit<itemsDetail, "id">,
): itemsDetail {
  return {
    id: autoItemIdIncrease(DB),
    ...newItem,
  };
}

export function pushProduct(DB: ProductDetail[], newProduct: ProductDetail) {
  DB.push(newProduct);
}

export function pushItem(DB: itemsDetail[], newItem: itemsDetail) {
  DB.push(newItem);
}

export function updateProduct(
  DB: ProductDetail[],
  newProduct: Omit<ProductDetail, "id">,
  oldId: string,
): void {
  const index = DB.findIndex((product) => product.id === oldId);
  if (index === -1) {
    throw new Error("Sản phẩm bạn đang tìm không tồn tại.");
  }
  DB[index] = {
    ...newProduct,
    id: oldId,
  };
}

export function updateItem(
  DB: itemsDetail[],
  newItem: Omit<itemsDetail, "id">,
  oldId: string,
): void {
  const index = DB.findIndex((item) => item.id === oldId);
  if (index === -1) {
    throw new Error("Mặt hàng bạn đang tìm không tồn tại.");
  }
  DB[index] = {
    ...newItem,
    id: oldId,
  };
}

export function removeProduct(DB: ProductDetail[], id: string) {
  const index = DB.findIndex((product) => product.id === id);
  if (index < 0) {
    throw new Error("Sản phẩm bạn muốn xóa không tồn tại.");
  }
  DB.splice(index, 1);
}

export function removeItem(DB: itemsDetail[], id: string) {
  const index = DB.findIndex((item) => item.id === id);
  if (index < 0) {
    throw new Error("Mặt hàng bạn muốn xóa không tồn tại.");
  }
  DB.splice(index, 1);
}

export function findProduct(DB: ProductDetail[], id: string): ProductDetail {
  const targetProduct = DB.find((product) => product.id === id);
  if (!targetProduct) throw new Error("Sản phẩm bạn đang tìm không tồn tại.");
  return targetProduct;
}

export function findItem(DB: itemsDetail[], id: string): itemsDetail {
  const targetItem = DB.find((item) => item.id === id);
  if (!targetItem) throw new Error("Nguyên liệu bạn đang tìm không tồn tại.");
  return targetItem;
}
