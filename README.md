# Kiểm Thử Tự Động Website Saucedemo Bằng Cypress

---

## Giới thiệu Dự Án

Dự án thực hiện **kiểm thử tự động (Automation Testing)** toàn diện cho website **Saucedemo** – một nền tảng thương mại điện tử demo được phát triển bởi Sauce Labs. 

Website Saucedemo được sử dụng rộng rãi trong cộng đồng kiểm thử phần mềm nhờ có nhiều loại user đặc biệt (problem_user, performance_glitch_user, visual_user, locked_out_user…) giúp mô phỏng các tình huống thực tế.

**Mục tiêu chính:**
- Xây dựng bộ test case hoàn chỉnh dựa trên SRS và Use Case.
- Triển khai kiểm thử tự động bằng **Cypress**.
- Áp dụng các kỹ thuật: **Black-box Testing**, **White-box Testing**, **System Testing** và **End-to-End Testing**.
- Đạt tỷ lệ Pass **100%** cho tất cả các module.

---

## Các Chức Năng Được Kiểm Thử

### 1. Login Module (`login.cy.js`)
- Đăng nhập thành công với `standard_user`
- Kiểm tra 6 loại user (standard, locked_out, problem, performance_glitch, error, visual)
- Xử lý lỗi: sai mật khẩu, thiếu username/password, đóng thông báo lỗi

### 2. Products Module (`products.cy.js`)
- Hiển thị danh sách sản phẩm
- Xem chi tiết sản phẩm
- Thêm/xóa sản phẩm vào giỏ hàng
- Kiểm tra thông tin name, price, description

### 3. Shopping Cart Module (`shopping-cart.cy.js`)
- Xem giỏ hàng trống & có sản phẩm
- Thêm nhiều sản phẩm
- Xóa sản phẩm đơn lẻ & xóa tất cả
- Cập nhật badge số lượng
- Tiếp tục mua sắm

### 4. Checkout Module (`checkout.cy.js`)
- Nhập thông tin cá nhân
- Validation form (thiếu First Name, Last Name, Postal Code)
- Xem tóm tắt đơn hàng, tổng tiền, thuế
- Hoàn tất thanh toán thành công
- Quay lại từ trang checkout

### 5. Logout Module (`logout.cy.js`)
- Đăng xuất thành công
- Đăng nhập lại sau khi logout
- Kiểm tra giỏ hàng sau logout

### 6. Full Flow Module (`full-flow.cy.js`)
- Luồng nghiệp vụ hoàn chỉnh: Login → Xem sản phẩm → Thêm giỏ hàng → Checkout → Finish

### 7. Special Users Module (`special-users.cy.js`)
- Kiểm tra hành vi của các user đặc biệt
- Xử lý timeout cho `performance_glitch_user`
- Kiểm tra giao diện với `problem_user` và `visual_user`

---

## Công Nghệ & Môi Trường

- **Framework**: Cypress 15.17
- **Ngôn ngữ**: JavaScript
- **Runtime**: Node.js 18+
- **Browser**: Google Chrome (latest)
- **IDE**: Visual Studio Code
- **Version Control**: Git & GitHub

---

## Hướng Dẫn Cài Đặt & Chạy Test

### 1. Clone repository
Bash
```
git clone https://github.com/dunggdinh/Software_Testing.git
cd Software_Testing
```
### 2. Cài đặt dependencies

Bash
```
npm install
```

### 3. Chạy Cypress
Bash

```
# Mở giao diện Test Runner (khuyến nghị)
npx cypress open
```

## Bài Học Kinh Nghiệm & Hướng Phát Triển
Đã thực hiện:

* Quy trình kiểm thử chuyên nghiệp (SRS → Test Plan → Test Case → Automation)

* Sử dụng thành thạo Cypress

* Kiểm thử validation form và user đặc biệt

Hướng phát triển tương lai:

* Tích hợp CI/CD (GitHub Actions)

* Thêm API Testing

* Performance Testing (JMeter / K6)

* Security Testing (OWASP)

* Tích hợp báo cáo Allure / Mochawesome

## Ghi Chú

* Dự án tập trung chủ yếu vào UI/E2E Testing.

* Website Saucedemo là môi trường demo nên không kiểm thử bảo mật nâng cao.

* Code được viết theo best practices của Cypress (Page Object chưa áp dụng).

* Để tìm hiểu sâu hơn về dự án, bạn có thể tham khảo các tài liệu chi tiết sau:

| Thư mục | Nội dung | Định dạng |
| :--- | :--- | :--- |
| **[slide/](./slide)** | Slide thuyết trình, tổng quan dự án và các điểm nhấn chính. | PPTX |
| **[report/](./report)** | Báo cáo chi tiết về phương pháp, quá trình thực hiện và kết quả. | DOCX |
