# Backend Trello

Đây là backend cho ứng dụng web Trello. Nó cung cấp các API và dịch vụ để quản lý bảng, danh sách và thẻ, giúp tạo ra trải nghiệm quản lý công việc cộng tác.

## Tính năng

- API RESTful để quản lý bảng, danh sách và thẻ.
- Tích hợp MongoDB để lưu trữ dữ liệu.
- Kiến trúc module và dễ mở rộng.
- Cấu hình dựa trên môi trường.

## Yêu cầu

- Node.js >= 18.x
- MongoDB

## Hướng dẫn cài đặt

1. Clone repository:
   ```bash
   git clone https://github.com/aquaman0403/trello-api.git
   ```

2. Cài đặt các thư viện phụ thuộc:
   ```bash
   npm install
   # Hoặc sử dụng yarn:
   yarn install
   ```

3. Cấu hình biến môi trường:
   - Sao chép file `.env` và cập nhật các giá trị cần thiết:
     ```bash
     cp .env.example .env
     ```

4. Khởi động server phát triển:
   ```bash
   npm run dev
   # Hoặc sử dụng yarn:
   yarn dev
   ```

5. Build cho môi trường production:
   ```bash
   npm run build
   # Hoặc sử dụng yarn:
   yarn build
   ```

6. Chạy server production:
   ```bash
   npm run production
   # Hoặc sử dụng yarn:
   yarn production
   ```

## Cấu trúc thư mục

- `src/config`: Các file cấu hình (ví dụ: MongoDB, môi trường, CORS).
- `src/controllers`: Các controller API.
- `src/middlewares`: Các hàm middleware.
- `src/models`: Các model cơ sở dữ liệu.
- `src/providers`: Các service provider.
- `src/routes`: Các route API.
- `src/sockets`: Các handler cho Socket.io.
- `src/utils`: Các hàm tiện ích.

## Scripts

- `npm run dev` / `yarn dev`: Khởi động server phát triển với hot-reloading.
- `npm run build` / `yarn build`: Build dự án cho môi trường production.
- `npm run production` / `yarn production`: Chạy server production.
- `npm run lint` / `yarn lint`: Kiểm tra codebase bằng ESLint.

## Giấy phép

Dự án này được cấp phép theo giấy phép MIT.
