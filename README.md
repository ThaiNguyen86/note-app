# ĐỒ ÁN NHẬP MÔN MÃ HÓA MẬT MÃ- ĐỀ TÀI: ỨNG DỤNG CHIA SẺ GHI CHÚ

### LỜI GIỚI THIỆU
Đây là đồ án 2 môn Nhập môn Mã hóa Mật mã lớp CQ2022/22, được thực hiện bởi nhóm 4 thành viên, dưới sự hướng dẫn của thầy Ngô Đình Hy

#### Thành viên nhóm
|STT|Tên thành viên|MSSV|
|:-:|:-:|:-:|
|1|[Nguyễn Thanh Thái](https://github.com/ThaiNguyen86)|22120330|
|2|[Long Văn Thắng](https://github.com/hoangvu09)|22120331|
|3|[Đoàn Minh Thuận](https://github.com/DoanMinhThuan)|22120359|
|4|[Đỗ Hữu Thức](https://github.com/thucdo08)|22120362|

### THÔNG TIN CƠ BẢN
Đồ án đã sử dụng các công cụ/ngôn ngữ sau trong suốt quá trình thực hiện:
* Front-end: HTML, CSS và Javascript, Reactjs.
* Back-end: Javascript trên môi trường NodeJS (framework Express).
* Cơ sở dữ liệu: Mongodb.
* *Bảo mật*:
  - AES Encryption
  - JWT Token
  - End-to-End Encryption (E2EE)
  - ...

### CÁCH CHẠY PROJECT TRÊN LOCAL PC
Sau khi tải project từ github về máy tính cá nhân, ta cần thực hiện 1 số thao tác sau để có thể khởi chạy project:
* Đảm bảo máy đã cài đặt nodeJS.
* Bước 1: Trong Command prompt, sử dụng lệnh cd để tới folder của project.
* Bước 2: Mở 2 Command prompt, sử dụng lệnh cd lần lượt tới tới folder của server và client: 
* Bước 3: Trong 2 Command prompt của client và server, lần lượt sử dụng lệnh `npm i` để cài đặt các module cần thiết cho chương trình.
* Bước 4: Trong Command prompt, sử dụng lệnh `npm run dev` để server và client được khởi chạy, truy cập (http://localhost:5173/) để xem kết quả.

### MỘT SỐ CHỨC NĂNG CƠ BẢN CỦA ĐỒ ÁN (CURRENT STATUS)
* Đăng kí/Đăng nhập tài khoản.
* Xác thực người dùng 
* Mã hóa/ giải mã ghi chú
* Giao diện điều khiển chương trình(Liệt kê ghi chú cá nhân, xóa ghi chú khỏi hệ thống...)
* Chia sẻ ghi chú
* Giới hạn thời gian và số lần truy cập ghi chú đã chia sẻ


### CÁC DỰ ĐỊNH PHÁT TRIỂN TIẾP THEO (FUTURE PLAN)
* Chỉnh sửa giao diện cho thân thiện với người dùng hơn (hiển thị nhiều thông tin hơn) và tăng tính tiện lợi.
* Cải thiện chức năng mã hóa
* Hỗ trợ đa định dạng ghi chú
* Hoàn thiện tính năng phân quyền.
* Nghiên cứu và tích hợp công nghệ mới (Tích hợp blockchain, Áp dụng AI...)

  ## Link đồ án
[GitHub Repository - Note App](https://github.com/ThaiNguyen86/note-app/tree/main)
