## Append A

## Lỗi ENOSPC

Bất cứ khi nào bạn gặp mã lỗi `ENOSPC` thì bạn nên chạy câu lệnh sau

```shell
$ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

Tóm tắt là ở level IO của hệ thống linux có giới hạn số watcher - cái mà `nodemon` sử dụng để biết những file nào được thay đổi. Lỗi ở trên xảy ra khi số watcher vượt quá giới hạn.

Tham khảo

* https://github.com/facebook/jest/issues/3254#issuecomment-297214395
* https://stackoverflow.com/questions/22475849/node-js-error-enospc/32600959#32600959
