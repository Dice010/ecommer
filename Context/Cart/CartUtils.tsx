import { CartItems } from "@/types/Cart";
import { Coupon } from "@/types/Discount";
import { mockProducts } from "@/lib/mock-data/Product/mockProduct";
import { mockCoupons } from "@/lib/mock-data/mockDiscount";

export function sumPriceCart(cart: CartItems[]): number {
  return cart.reduce((total, currentItem) => {
    const itemPrice = currentItem.product.sellPrice * currentItem.quantity;
    return total + itemPrice;
  }, 0);
}

export const countCart = (cart: CartItems[]) =>
  cart.reduce((total, currentItem) => total + currentItem.quantity, 0);
export const countDiscount = (discount: Coupon[]) => discount.length;

export function isCartItemsExists(cart: CartItems[], id: string): boolean {
  return cart.some((item) => item.product.id === id);
}

export function isDiscountExists(discount: Coupon[], code: string): boolean {
  return discount.some((item) => code in item);
}

export function priceAftertDiscount(
  totalPrice: number,
  discount: Coupon[],
): number {
  const Minus = discount.reduce((totalDiscount, currentTtem) => {
    const detailCoupon = Object.values(currentTtem)[0];

    if (!detailCoupon || detailCoupon.type !== "FixedAmount") {
      return totalDiscount;
    }
    return totalDiscount + detailCoupon.value;
  }, 0);
  const Percent = discount.reduce((totalPercent, currentItem) => {
    const detailCoupon = Object.values(currentItem)[0];

    if (!detailCoupon || detailCoupon.type !== "Percentage") {
      return totalPercent;
    }

    const couponRemainingRate = 1 - detailCoupon.value / 100;

    return totalPercent * couponRemainingRate;
  }, 1);

  const newPrice = Math.max(0, (totalPrice - Minus) * Percent);
  return newPrice;
}

export function addCartItem(cart: CartItems[], id: string) {
  if (isCartItemsExists(cart, id)) {
    return cart.map((item) =>
      item.product.id === id ? { ...item, quantity: item.quantity + 1 } : item,
    );
  }

  const newProduct = mockProducts.find((mockItems) => mockItems.id === id);

  if (!newProduct) throw new Error("Sản phẩm không tồn tại.");

  return [
    ...cart,
    {
      product: newProduct,
      quantity: 1,
    },
  ];
}

export function removeCartItem(cart: CartItems[], id: string) {
  const newCart = cart
    .map((item) => {
      if (item.product.id === id && item.quantity > 0) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      } else {
        return item;
      }
    })
    .filter((item) => item.quantity > 0);

  return newCart;
}

export function addDiscount(discount: Coupon[], code: string) {
  if (isDiscountExists(discount, code)) throw new Error("Mã đã được áp dụng.");
  if (!mockCoupons[code]) throw new Error("Mã không tồn tại.");

  const newDiscount: Coupon = { [code]: mockCoupons[code] };
  return [...discount, newDiscount];
}

export function removeDiscount(discount: Coupon[], code: string) {
  if (!isDiscountExists(discount, code)) throw new Error("Mã chưa tồn tại.");

  const newDiscount = discount.filter((item) => !(code in item));
  return newDiscount;
}
