/**

 * Clean Locket Gold Script for Quân

 * Mục tiêu: Bypass RevenueCat check cho Locket Gold

 */



// 1. Lấy dữ liệu phản hồi từ server

let body = $response.body;

if (!body) $done({}); 



let obj = JSON.parse(body);



// 2. Cấu trúc chuẩn của một gói đăng ký Premium

const premiumInfo = {

  "is_sandbox": false,

  "ownership_type": "PURCHASED",

  "billing_issues_detected_at": null,

  "period_type": "normal",

  "expires_date": "2099-12-31T23:59:59Z",

  "grace_period_expires_date": null,

  "unsubscribe_detected_at": null,

  "original_purchase_date": "2024-01-01T00:00:00Z",

  "purchase_date": "2024-01-01T00:00:00Z",

  "store": "app_store"

};



const entitlementInfo = {

  "grace_period_expires_date": null,

  "purchase_date": "2024-01-01T00:00:00Z",

  "product_identifier": "lu.star7.Locket.premium.yearly",

  "expires_date": "2099-12-31T23:59:59Z"

};



// 3. Tiến hành "tiêm" dữ liệu vào object

if (obj.subscriber) {

  // Mở khóa quyền lợi (Entitlements)

  obj.subscriber.entitlements = {

    "Gold": entitlementInfo,

    "pro": entitlementInfo

  };

  

  // Mở khóa danh sách đăng ký (Subscriptions)

  obj.subscriber.subscriptions = {

    "lu.star7.Locket.premium.yearly": premiumInfo

  };

}



// 4. Trả dữ liệu đã sửa về cho app

$done({ body: JSON.stringify(obj) });
