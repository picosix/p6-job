# Giới thiệu về project

Với project này, mình tập trung giới thiệu một số vấn đề sau

* NodeJS
* NodeJS với TypeScript
* MongoDB
* Docker
* Deploy code

## Tại sao là NodeJS?

Bởi vì mình muốn giảm thời gian học của mình lại. Mình luôn có cảm giác là mình không hề có đủ thời gian để làm mọi việc :D Đó là lý do mà mình muốn có thể code vừa backend vừa fronted bằng javascript. Học một ngôn ngữ, mình làm được cả hai.

Bởi vì nó phổ biến. Mặc dù nó không hoàn thiện, nhưng nó được nhiều người sử dụng. Tài liệu, hướng dẫn dồi dào. Cộng đồng to lớn.

Bởi vì mình muốn làm việc với javascript. Lý do này thì khỏi cần giải thích. Mỗi ngôn ngữ có ưu điểm và nhược điểm riêng (giống với người con gái mà bạn yêu <3). Mình chấp nhận những nhược điểm của javascript để sử dụng những ưu điểm của nó.

## Tại sao là Typescript?

Trong quá trình sử dụng javascript, mình nhận thấy một trong những bug khó debug nhất là truyền sai kiểu dữ liệu dẫn đến javascript sẽ thực hiện coercion. Do đó mình luôn phải kiểm tra kiểu dữ liệu mà mình sử dụng, lần này qua lần khác, project này đến project khác. Mà miễn một việc mình làm hai lần thì mình sẽ tìm giải pháp để làm chỉ một và một lần :D Thế là mình tìm ra được Typescript với `static typing`

## Tại sao là MongoDB?

Các bạn nên đọc qua bài này [NoSQL Databases Pros And Cons]((https://www.mongodb.com/scale/nosql-databases-pros-and-cons). Với mình thì mình muốn xây dự một platform riêng để sử dụng, vì lẽ đó mình muốn mọi thứ có thể dễ dàng kế thừa và mở rộng :D Cho nên mình nhắm đến ưu điểm `Flexible Data Model` của `MongoDB`.

## Tại sao là Docker

Mình dùng Docker như công cụ để đóng gói môi trường làm việc. Nó giúp mình giúp người khác thiết lập môi trưòng làm việc nhanh, dễ hơn. Lúc deploy đôi khi chỉ đơn giản là `$ docker pull __IMAGE__` và mọi thứ sẽ luôn sẵn sàng. Tiết kiệm kha khá thời gian của mình, của ngưòi khác, và có thể là của bạn :)
