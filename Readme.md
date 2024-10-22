# Hệ thống Xác thực với JWT, Short Token, Long Token và MFA

Dự án này triển khai hệ thống xác thực sử dụng JWT để kiểm soát truy cập, hỗ trợ short token (token ngắn hạn) và long token (token dài hạn), đồng thời tích hợp xác thực đa yếu tố (MFA) nhằm tăng cường bảo mật. Trong quy trình đăng nhập, người dùng nhập email và mật khẩu, sau đó nhận OTP qua email. Người dùng chỉ hoàn tất đăng nhập khi nhập mã OTP hợp lệ.

## Tính năng

- **Đăng nhập với JWT và MFA**: Người dùng xác thực thông qua email và mật khẩu. Sau đó, hệ thống gửi mã OTP qua email. Người dùng nhập OTP hợp lệ để hoàn tất đăng nhập. Khi đăng nhập thành công, hệ thống sẽ tạo ra token truy cập (access token) ngắn hạn và token làm mới (refresh token) dài hạn.
- **Quản lý token**: Token (cả access và refresh token) được lưu trữ trong cơ sở dữ liệu và có thể bị thu hồi khi cần thiết.
- **Thu hồi token**: Các token có thể bị thu hồi (ví dụ, khi người dùng đăng xuất hoặc làm mới) để ngăn chặn việc sử dụng lại.
- **Làm mới token**: Khi token truy cập hết hạn, người dùng có thể nhận token mới bằng cách gửi refresh token hợp lệ.

## Mục lục

- [Cài đặt](#cài-đặt)
- [Biến môi trường](#biến-môi-trường)
- [Các endpoint](#các-endpoint)

## Cài đặt

1. Clone repository về máy:
   ```bash
   git clone https://github.com/sontiktok/test-eranin.git
   ```
2. Điều hướng đến thư mục dự án và cài đặt các phụ thuộc:
   ```bash
   cd test-eranin
   npm install
   ```
3. Tạo tệp .env trong thư mục gốc của dự án với các biến môi trường sau (điều chỉnh các giá trị cho phù hợp):

   ```bash
   PORT=

   DB_NAME=
   DB_USER=
   DB_PASSWORD=
   DB_HOST=
   DB_PORT=

   REFRESH_SECRET=
   JWT_SECRET=

   EXPIRE_IN_REFRESH_TOKEN=
   EXPIRE_IN_ACCESS_TOKEN=

   USER=
   PASSWORD=
   ```
