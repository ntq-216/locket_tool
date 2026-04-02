// ========= ID Mapping (Giữ nguyên logic của Quân) ========= //
const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

// =========    Phần cố định - Cấu hình bởi Quân (HUST)    ========= // 
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"], 
    obj = JSON.parse($response.body);

// Thông báo định danh khi soi Log
obj.Attention = "Chúc mừng Quân (HUST)! Script bypass đã hoạt động thành công.";

// Cấu trúc gói đăng ký (Subscription)
var ntq216 = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2024-07-28T01:04:18Z",
  purchase_date: "2024-07-28T01:04:17Z",
  store: "app_store"
};

// Cấu trúc quyền lợi (Entitlement)
var hust2026 = {
  grace_period_expires_date: null,
  purchase_date: "2024-07-28T01:04:17Z",
  product_identifier: "com.ntq216.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z"
};

const match = Object.keys(mapping).find(e => ua.includes(e));

if (match) {
  let [entitlement, product] = mapping[match];
  if (product) {
    hust2026.product_identifier = product;
    obj.subscriber.subscriptions[product] = ntq216;
  } else {
    obj.subscriber.subscriptions["com.ntq216.premium.yearly"] = ntq216;
  }
  obj.subscriber.entitlements[entitlement] = hust2026;
} else {
  // Mặc định mở khóa Pro cho các app khác dùng RevenueCat
  obj.subscriber.subscriptions["com.ntq216.premium.yearly"] = ntq216;
  obj.subscriber.entitlements.pro = hust2026;
}

$done({ body: JSON.stringify(obj) });
