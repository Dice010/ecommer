import { Coupon, DetailCoupon } from "@/types/Discount";

type Code = string;

export function formatCouponId(id: string): string {
  const cleanId = id.trim().toLowerCase();
  const match = cleanId.match(/\d+/);

  if (match) {
    const num = parseInt(match[0], 10);
    return `coup-${num.toString().padStart(2, "0")}`;
  }

  throw new Error("Lỗi định dạng ID. ID phải chứa số.");
}

export function autoIdIncrease(DB: Coupon): string {
  const coupons = Object.values(DB);

  if (coupons.length === 0) {
    return formatCouponId("1");
  }

  const ids = coupons.map((coupon) => {
    const part = coupon.id.split("-");
    const num = Number(part[1]);
    return isNaN(num) ? 0 : num;
  });

  const maxId = Math.max(...ids);
  const nextId = maxId + 1;

  return formatCouponId(nextId.toString());
}

export function pushCoupon(DB: Coupon, code: Code, coupon: DetailCoupon): void {
  const formattedId = formatCouponId(coupon.id);
  DB[code] = {
    ...coupon,
    id: formattedId,
  };
}

export function findCoupon(DB: Coupon, code: Code): DetailCoupon {
  const targetCoupon = DB[code];

  if (!targetCoupon) {
    throw new Error("Mã giảm giá bạn đang tìm không tồn tại.");
  }

  return targetCoupon;
}

export function createNewCoupon(
  DB: Coupon,
  newCoupon: Omit<DetailCoupon, "id">,
): DetailCoupon {
  return {
    id: autoIdIncrease(DB),
    ...newCoupon,
  };
}

export function updateCoupon(
  DB: Coupon,
  code: Code,
  updatedData: Omit<DetailCoupon, "id">,
): void {
  if (!DB[code]) {
    throw new Error("Mã giảm giá bạn muốn cập nhật không tồn tại.");
  }

  DB[code] = {
    ...DB[code],
    ...updatedData,
  };
}

export function removeCoupon(DB: Coupon, code: Code): void {
  if (!DB[code]) {
    throw new Error("Mã giảm giá bạn muốn xóa không tồn tại.");
  }

  delete DB[code];
}
