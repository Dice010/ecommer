import { mockProducts } from "@/lib/mock-data/Product/mockProduct";
import { mockItems } from "@/lib/mock-data/Product/mockItems";
import { ProductDetail, itemsDetail } from "@/types/Product";
import {
  removeItem,
  removeProduct,
  updateItem,
  updateProduct,
  createNewItem,
  createNewProduct,
  pushItem,
  pushProduct,
} from "./WarehouseUtils";
import { useReducer } from "react";

type ActionProduct =
  | { type: "CREATE_PRODUCT"; newProduct: Omit<ProductDetail, "id"> }
  | {
      type: "UPDATE_PRODUCT";
      newProduct: Omit<ProductDetail, "id">;
      oldId: string;
    }
  | { type: "REMOVE_PRODUCT"; id: string };

type ActionItem =
  | { type: "CREATE_ITEM"; newItem: Omit<itemsDetail, "id"> }
  | { type: "UPDATE_ITEM"; newItem: Omit<itemsDetail, "id">; oldId: string }
  | { type: "REMOVE_ITEM"; id: string };

export function useProductReducer() {
  function productReducer(state: ProductDetail[], action: ActionProduct) {
    switch (action.type) {
      case "CREATE_PRODUCT": {
        const nextState = [...state];
        const newProduct = createNewProduct(nextState, action.newProduct);
        pushProduct(nextState, newProduct);
        return nextState;
      }
      case "CREATE_PRODUCT": {
        const nextState = [...state];
        const newProduct = createNewProduct(nextState, action.newProduct);
        pushProduct(nextState, newProduct);
        return nextState;
      }
      case "UPDATE_PRODUCT": {
        const nextState = [...state];
        updateProduct(nextState, action.newProduct, action.oldId);
        return nextState;
      }
      case "REMOVE_PRODUCT": {
        const nextState = [...state];
        removeProduct(nextState, action.id);
        return nextState;
      }
      default:
        throw new Error("Hành động không hợp lệ.");
    }
  }

  const [DB, dispatch] = useReducer(productReducer, mockProducts);

  return { DB, dispatch } as const;
}


export function useItemReducer() {
  function itemReducer(state: itemsDetail[], action: ActionItem) {
    switch (action.type) {
      case "CREATE_ITEM": {
        const nextState = [...state];
        const newItem = createNewItem(nextState, action.newItem);
        pushItem(nextState, newItem);
        return nextState;
      }
      case "UPDATE_ITEM": {
        const nextState = [...state];
        updateItem(nextState, action.newItem, action.oldId);
        return nextState;
      }
      case "REMOVE_ITEM": {
        const nextState = [...state];
        removeItem(nextState, action.id);
        return nextState;
      }
      default:
        throw new Error("Hành động không hợp lệ.");
    }
  }

  const [DB, dispatch] = useReducer(itemReducer, mockItems);

  return { DB, dispatch } as const;
}
