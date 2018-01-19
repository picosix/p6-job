![PicoSix](./document/static/logo.png)

# p6-job

> Xây dựng dự án thật tế bằng NodeJS, Typescript và GraphQL

## Demo

[Demo](http://job.picosix.info/graphiql?query=query%20%7B%0A%20%20users%20%7B%0A%20%20%20%20_id%0A%20%20%20%20username%0A%20%20%7D%0A%7D)

# Development

- Mongo

```shell
$ docker run -d --restart always --name mongo -p 27017:27017 -v $(pwd)/backup:/backup mongo:3
```

- Nginx Proxy

```shell
$ docker run -d --restart always --name nginx-proxy -p 80:80 -p 443:443 -v $(pwd)/certs:/etc/nginx/certs -v /var/run/docker.sock:/tmp/docker.sock:ro picosix/nginx-proxy
```

- Node

```shell
$ docker run -d -e VIRTUAL_HOST=job.picosix.local --restart always --name p6-job-node -v $(pwd):/app --link mongo:mongo picosix/node yarn start
```

## Documents

0. Note

* [Append A](./document/Append-A.md)

1. [Giới thiệu project](./document/0-introduce-project.md)
2. [Giới thiệu tài liệu học tập](./document/1-introduce-documents.md)

## Mục đích project này gồm

* Mình học Typescript và GraphQL
* Hướng dẫn các bạn học NodeJS, cách deploy một project thực tế lên VPS
* Tạo ra một nơi để mọi người có thể cùng nhau làm việc

## Kết quả mong muốn

Những thành viên tham gia có thể

* Sử dụng NodeJS, Typescript, GraphQL ở mức cơ bản
* Biết cách viết test và test một dự án có nhiều thành viên
* Biết cách deploy project lên VPS

## Lộ trình

1. Tháng đầu tiên - Làm quen với project (@picoxis)

* Viết và cập nhật plan cho project (1 tuần)
* Viết document đơn giản để hướng dẫn mọi người về NodeJS, Typescript, GraphQL (2 tuần)
* Design database, structure của project, ...
* Setup môi trường development
* Trao đổi phương án làm việc, cập nhật thành viên
* Bắt đầu nhận commit, review code

2. Tháng thứ hai - Bắt đầu với backend

* CRUD với quản lý user
* Authentication và Authorization
* Chia task các API còn lại (Post, Employee, Employeer)
* Viết unit test

3. Tháng thứ ba - Bắt đầu với frontend

* Xây dựng trang admin với [Ant Design Pro](https://github.com/ant-design/ant-design-pro)
* Chia task cho các page
* Viết unit test

4. Thời gian còn lại

* Dự trù trễ deadline (haizz, hi vọng không dùng đến nó)
* Thảo luận về các cải tiến
* Hỗ trợ các bạn tự deploy project lên VPS riêng để demo

## Phương tiện sử dụng

* [Github](https://github.com/picosix/p6-job/)
* [Slack](https://picosix.slack.com/)

## Làm thế nào để trở thành một thành viên của project?

* Comment vào issue [Become a contributor](https://github.com/picosix/p6-job/issues/1) với mẫu

```markdown
# Mẫu đăng ký

1. Tên: // Để gọi nhau :D
2. Github account: // Để mình add vào respo
3. Level: // Để xác định xem bạn sẽ làm được những gì
```

* Sử dụng invite link để tham gia Slack: https://join.slack.com/t/picosix/shared_invite/enQtMjk4OTQ5MTc0Njc2LTc0YjBiNzRmNmRmYTI0YTk3YzVkNTcwODE2MTFmMDJiZmEzYzUzNGYwN2EwMDQ2Mjg4MjUwNjZiNmZjODk4OTY

## Yêu cầu

* Với mỗi bạn tham gia, cần làm ít nhất MỘT TASK trong MỘT TUẦN

## Quy tắc

* Với ai vi phạm quy tắc BA LẦN, mình sẽ kích khỏi project (Áp dụng từ tháng **THỨ HAI**)
