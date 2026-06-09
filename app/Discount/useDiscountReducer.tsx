// \hooks\useDiscountReducer.tsx hoặc đường dẫn hiện tại của bạn
import { useReducer } from "react";
import { Code, Coupon, DetailCoupon } from "@/types/Discount";
import { mockCoupons } from "@/lib/mock-data/mockDiscount";
import { createNewCoupon, updateCoupon, removeCoupon } from "./DiscountUtils";

type Action =
  | { type: "CREATE_COUPON"; code: Code; newCoupon: Omit<DetailCoupon, "id"> }
  | { type: "UPDATE_COUPON"; code: Code; updatedData: Omit<DetailCoupon, "id"> }
  | { type: "REMOVE_COUPON"; code: Code };

function couponReducer(state: Coupon, action: Action): Coupon {
  const nextState = { ...state }; 

  switch (action.type) {
    case "CREATE_COUPON": {
      if (nextState[action.code]) {
        throw new Error("Mã coupon này đã tồn tại!");
      }
      nextState[action.code] = createNewCoupon(nextState, action.newCoupon);
      return nextState;
    }
    case "UPDATE_COUPON": {
      updateCoupon(nextState, action.code, action.updatedData);
      return nextState;
    }
    case "REMOVE_COUPON": {
      removeCoupon(nextState, action.code);
      return nextState;
    }
    default:
      return state;
  }
}

export function useCouponReducer() {
  const [DB, dispatch] = useReducer(couponReducer, mockCoupons);
  return { DB, dispatch } as const;
}