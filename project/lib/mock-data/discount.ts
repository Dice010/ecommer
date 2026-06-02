import { Coupon, Voucher } from "@/types/Discount";
import { mockCustomers } from "./Auth/Customer";

// 1. MOCK DATA CHO COUPON (Mã giảm giá nhập tay tại giỏ hàng)
export const mockCoupons: Coupon[] = [
  {
    id: 1,
    code: "FLORISTNEW",
    name: "Chào Bạn Mới",
    description: "Giảm 10% cho đơn hàng đầu tiên, tối đa 50k từ đơn 150k",
    type: "Percentage",
    value: 10,
    minOrderValue: 150000,
    maxDiscountAmount: 50000,
    usageLimit: 200,
    usedCount: 45,
    limitPerCustomer: 1,
    startDate: "2026-01-01T00:00:00Z",
    endDate: "2026-12-31T23:59:59Z",
    status: "Active",
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: 2,
    code: "VALENTINE2026",
    name: "Mùa Yêu Thương",
    description: "Giảm thẳng 100k cho các đơn hàng cao cấp dịp Lễ Tình Nhân",
    type: "FixedAmount",
    value: 100000,
    minOrderValue: 500000,
    usageLimit: 100,
    usedCount: 100, // Đã dùng hết lượt
    limitPerCustomer: 1,
    startDate: "2026-02-01T00:00:00Z",
    endDate: "2026-02-15T23:59:59Z",
    status: "Expired", // Trạng thái hết hạn theo thời gian và lượt dùng
    createdAt: "2026-02-01T00:00:00Z",
  },
  {
    id: 3,
    code: "XUAN2026",
    name: "Lộc Xuân Đầu Năm",
    description: "Giảm 15% tổng đơn hàng không giới hạn mức giảm tối đa",
    type: "Percentage",
    value: 15,
    minOrderValue: 200000,
    usageLimit: 50,
    usedCount: 12,
    limitPerCustomer: 2,
    startDate: "2026-01-20T00:00:00Z",
    endDate: "2026-02-28T23:59:59Z",
    status: "Expired", // Đã hết hạn theo thời gian thực tế (Hiện tại là tháng 6/2026)
    createdAt: "2026-01-15T00:00:00Z",
  },
  {
    id: 4,
    code: "STAFFAWARD",
    name: "Ưu Đãi Nội Bộ",
    description: "Mã giảm giá 50k cho nhân viên cửa hàng thử nghiệm hệ thống",
    type: "FixedAmount",
    value: 50000,
    usageLimit: 10,
    usedCount: 2,
    limitPerCustomer: 5,
    startDate: "2026-05-01T00:00:00Z",
    endDate: "2026-07-01T23:59:59Z",
    status: "Disabled", // Admin chủ động tắt mã này không cho dùng nữa
    createdAt: "2026-05-01T00:00:00Z",
  },
  {
    id: 5,
    code: "TRIANHE",
    name: "Rực Rỡ Nắng Hè",
    description: "Giảm 8% cho tất cả đơn hàng thuộc danh mục Hoa Theo Mùa",
    type: "Percentage",
    value: 8,
    minOrderValue: 0,
    maxDiscountAmount: 30000,
    usageLimit: 500,
    usedCount: 88,
    limitPerCustomer: 1,
    startDate: "2026-05-15T00:00:00Z",
    endDate: "2026-08-31T23:59:59Z",
    status: "Active",
    createdAt: "2026-05-15T00:00:00Z",
  },
];

// 2. MOCK DATA CHO VOUCHER (Phiếu mua hàng / Thẻ quà tặng)
export const mockVouchers: Voucher[] = [
  {
    id: 201,
    voucherCode: "VCH-HUNG-99K",
    title: "Voucher Sinh Nhật Khách Hàng Tuấn Hùng",
    worthAmount: 99000,
    isAccumulative: false, // Không cho cộng dồn với voucher khác
    allowPartialPayment: false, // Không tiêu hết không trả lại tiền thừa
    customerId: mockCustomers[0].id, // Định danh cho Khách hàng Nguyễn Tuấn Hùng (ID: 1001)
    isUsed: false,
    expiryDate: "2026-06-30T23:59:59Z", // Còn hạn tới cuối tháng 6
    status: "Active",
    createdAt: "2026-06-01T00:00:00Z",
  },
  {
    id: 202,
    voucherCode: "VCH-LAN-50K",
    title: "Voucher Đền Bù Sự Cố Giao Hàng Chậm",
    worthAmount: 50000,
    isAccumulative: true, // Cho phép cộng dồn nhiều voucher dạng này để thanh toán
    allowPartialPayment: true, // Cho phép trừ dần (ví dụ mua đơn 30k thì voucher còn 20k)
    customerId: mockCustomers[1].id, // Thuộc về Phan Thị Ngọc Lan (ID: 1002)
    isUsed: true, // Đã sử dụng
    usedAt: "2026-05-25T14:30:00Z",
    expiryDate: "2026-06-25T23:59:59Z",
    status: "Expired", // Hệ thống tự chuyển trạng thái do 'isUsed: true' hoặc quá hạn
    createdAt: "2026-05-20T08:00:00Z",
  },
  {
    id: 203,
    voucherCode: "VCH-GIFT-200K",
    title: "Thẻ Quà Tặng Sự Kiện Khai Trương",
    worthAmount: 200000,
    isAccumulative: true,
    allowPartialPayment: false,
    customerId: null, // Voucher tự do ai có code cũng xài được, chưa bị ai gom
    isUsed: false,
    expiryDate: "2026-08-01T23:59:59Z",
    status: "Active",
    createdAt: "2026-05-01T09:00:00Z",
  },
  {
    id: 204,
    voucherCode: "VCH-CUONG-500K",
    title: "Voucher Tri Ân Khách Hàng VIP VIP",
    worthAmount: 500000,
    isAccumulative: false,
    allowPartialPayment: true,
    customerId: mockCustomers[2].id, // Thuộc về Hoàng Vinh Cường (ID: 1003)
    isUsed: false,
    expiryDate: "2026-03-01T23:59:59Z",
    status: "Expired", // Đã hết hạn sử dụng vào tháng 3
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: 205,
    voucherCode: "VCH-CAM-TEST",
    title: "Voucher Test Thu Hồi Hệ Thống",
    worthAmount: 100000,
    isAccumulative: false,
    allowPartialPayment: false,
    customerId: mockCustomers[3].id, // Thuộc về Đặng Thúy Vy (ID: 1004)
    isUsed: false,
    expiryDate: "2026-12-31T23:59:59Z",
    status: "Disabled", // Bị khóa từ phía Admin do nghi ngờ gian lận
    createdAt: "2026-05-28T10:00:00Z",
  },
  {
    id: 206,
    voucherCode: "FREE-FLOWER-50K",
    title: "Phiếu Quà Tặng Sự Kiện Chợ Hoa Hè 2026",
    worthAmount: 50000,
    isAccumulative: true, // Cho phép người dùng gom nhiều mã tự do dạng này để cộng dồn thanh toán
    allowPartialPayment: false, // Phải tiêu hết trong 1 lần mua
    customerId: null, // Voucher tự do công khai
    isUsed: false,
    expiryDate: "2026-08-31T23:59:59Z", // Còn hạn dài
    status: "Active",
    createdAt: "2026-06-01T08:00:00Z",
  },
  {
    id: 207,
    voucherCode: "FLORIST-GIFT-100K",
    title: "Voucher Tự Do Tri Ân Cồng Đồng Yêu Hoa",
    worthAmount: 100000,
    isAccumulative: false,
    allowPartialPayment: true, // Cho phép dùng trước một phần tiền, phần còn lại lưu lại xài tiếp
    customerId: null, // Voucher tự do công khai
    isUsed: false,
    expiryDate: "2026-07-15T23:59:59Z",
    status: "Active",
    createdAt: "2026-06-02T10:00:00Z",
  },
  {
    id: 208,
    voucherCode: "FREE-MIDYEAR-200K",
    title: "Voucher Tự Do Xả Kho Giữa Năm",
    worthAmount: 200000,
    isAccumulative: false,
    allowPartialPayment: false,
    customerId: null,
    isUsed: true, // Kịch bản test: Một khách hàng vãng lai nào đó đã nhanh tay nhập mã này rồi
    usedAt: "2026-06-02T09:15:00Z",
    expiryDate: "2026-06-30T23:59:59Z",
    status: "Expired", // Đã đổi sang trạng thái không thể dùng được nữa vì đã bị sử dụng
    createdAt: "2026-05-25T00:00:00Z",
  },
  {
    id: 209,
    voucherCode: "FLORIST-CHILL-30K",
    title: "Voucher Tặng Kèm Khi Đọc Tin Tức Cuối Tuần",
    worthAmount: 30000,
    isAccumulative: true,
    allowPartialPayment: false,
    customerId: null,
    isUsed: false,
    expiryDate: "2026-05-31T23:59:59Z", // Quá hạn (Hiện tại là tháng 6/2026)
    status: "Expired",
    createdAt: "2026-05-01T00:00:00Z",
  },
  {
    id: 210,
    voucherCode: "FREE-BUG-500K",
    title: "Voucher Do Hệ Thống Tạo Nhầm (Test Hủy)",
    worthAmount: 500000,
    isAccumulative: true,
    allowPartialPayment: true,
    customerId: null,
    isUsed: false,
    expiryDate: "2026-12-31T23:59:59Z",
    status: "Disabled", // Kịch bản test: Mã lỗi mệnh giá cao, Admin đã kịp thời khóa lại
    createdAt: "2026-06-02T06:00:00Z",
  },
];
