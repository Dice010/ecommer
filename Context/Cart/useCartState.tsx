"use client";
import { useReducer, useEffect } from "react";
import { CartItems } from "@/types/Cart";
import { Coupon } from "@/types/Discount";
import { useAuth } from "@/Context/Auth/useAuthContext";
import { Customer } from "@/types/Users";
import {
  countCart,
  sumPriceCart,
  priceAftertDiscount,
  addCartItem,
  removeCartItem,
  addDiscount,
  removeDiscount,
} from "./CartUtils";

export type IState = {
  cart: CartItems[];
  count: number;
  discount: Coupon[];
  totalPrice: number;
};

export type Action =
  | { type: "ADD_CART"; payload: string }
  | { type: "REMOVE_CART"; payload: string }
  | { type: "ADD_DISCOUNT"; payload: string }
  | { type: "REMOVE_DISCOUNT"; payload: string }
  | { type: "CHECK_OUT" }
  | { type: "SET_CART"; payload: CartItems[] };

// Helper kiểm tra Customer
function isCustomer(user: unknown): user is Customer {
  return user != null && typeof user === "object" && "cart" in user;
}

function reducer(state: IState, action: Action): IState {
  switch (action.type) {
    case "SET_CART": {
      const cart = action.payload;
      return {
        ...state,
        cart,
        count: countCart(cart),
        totalPrice: priceAftertDiscount(sumPriceCart(cart), state.discount),
      };
    }
    case "ADD_CART": {
      const newCart = addCartItem(state.cart, action.payload);
      return {
        ...state,
        cart: newCart,
        count: countCart(newCart),
        totalPrice: priceAftertDiscount(sumPriceCart(newCart), state.discount),
      };
    }
    case "REMOVE_CART": {
      const newCart = removeCartItem(state.cart, action.payload);
      return {
        ...state,
        cart: newCart,
        count: countCart(newCart),
        totalPrice: priceAftertDiscount(sumPriceCart(newCart), state.discount),
      };
    }
    case "ADD_DISCOUNT": {
      const newDiscount = addDiscount(state.discount, action.payload);
      return {
        ...state,
        discount: newDiscount,
        totalPrice: priceAftertDiscount(sumPriceCart(state.cart), newDiscount),
      };
    }
    case "REMOVE_DISCOUNT": {
      const newDiscount = removeDiscount(state.discount, action.payload);
      return {
        ...state,
        discount: newDiscount,
        totalPrice: priceAftertDiscount(sumPriceCart(state.cart), newDiscount),
      };
    }
    case "CHECK_OUT":
      return { cart: [], count: 0, discount: [], totalPrice: 0 };
    default:
      return state;
  }
}

// Hook chính
export function useCartState() {
  const { user } = useAuth();

  // Khởi tạo ban đầu
  const initialCart: CartItems[] = isCustomer(user) ? user.cart : [];
  const initialState: IState = {
    cart: initialCart,
    count: countCart(initialCart),
    discount: [],
    totalPrice: priceAftertDiscount(sumPriceCart(initialCart), []),
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // Đồng bộ giỏ hàng khi user thay đổi (đã đăng nhập xong)
  useEffect(() => {
    if (isCustomer(user)) {
      dispatch({ type: "SET_CART", payload: user.cart });
    }
  }, [user]);

  return { state, dispatch };
}
