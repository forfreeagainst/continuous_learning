# websocket

## 介绍

* HTTP协议：通信只能由客户端发起。
* 背景：这种单向请求的特点，注定了如果服务器有连续的状态变化，客户端要获知就非常麻烦。我们只能使用“轮询”。每隔一段时间，就会发出一个询问，了解服务器有没有新的信息。最典型的场景就是聊天室。
* 轮询的效率低，非常浪费资源。（因为必须不停连接，或者HTTP连接始终打开）。
* Websocket:是一种在单个TCP连接上进行全双工通信的协议。

特点：

1. 可以发送文本，也可以发送二进制数据。
2. 没有同源限制，客户端可以与任意服务器通信。
3. 协议标识符是ws(如果加密，则为wss)，服务器网址就是URL。

请求头信息

* Connection: Upgrade 表示要升级协议
* Sec-Websocket-Key: ********* 与后面服务端响应头部的Sec-Websocket-Accept是配套的，提供基本的防护，比如恶意的连接，或者无意的连接。
* Sec-Websocket-version:13 表示websocket的版本。
* Upgrade: websocket 表示要升级到websocket协议。

响应头信息

* Upgrade: websocket
* Connection: Upgrade
* Sec-Websocket-Accept: 暗号的回应 

## 实践

使用websocket渲染个列表，FCP 这么长。
FCP 21.4s,  39.3s, 26.9s, 250ms, 42.2s, 0

## 面试

### websocket 和 短轮询（http） 有什么区别？

http 需要 客户端 主动地向 服务端发送请求。

### 心跳机制和断线重连

## 传参方式

* 连接时传参（通过 URL 查询字符串）
* 通信时传参（通过消息协议）

### 连接时传参

```js
// 前端连接时传参
const userId = "123";
const token = "abc";
const socket = new WebSocket(`ws://example.com/chat?userId=${userId}&token=${token}`);

// 后端获取参数（Node.js 示例）
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws, request) => {
  const url = new URL(request.url, `ws://${request.headers.host}`);
  const userId = url.searchParams.get('userId'); // "123"
  const token = url.searchParams.get('token');   // "abc"
});
```

注意事项：

* 参数会明文暴露在 URL 中，敏感数据需加密或改用其他方式（如通信时传参）。
* 适用于身份验证等一次性参数。

### 通信时传参

建立连接后，通过 send() 发送结构化数据（通常用 JSON 或 二进制数据）：

```js
// 前端发送消息
const message = {
  type: "join_room",
  roomId: "room1",
  data: { username: "Alice" }
};
socket.send(JSON.stringify(message));

// 后端解析消息（Node.js 示例）
ws.on('message', (data) => {
  const msg = JSON.parse(data);
  if (msg.type === "join_room") {
    console.log(msg.roomId); // "room1"
  }
});
```

关键注意事项

安全性：

* 敏感参数避免通过 URL 传递，改用通信时加密传输。
* 始终验证客户端传来的参数（防 XSS/注入）。

协议设计：

* 推荐使用 JSON 结构，包含 type/action 字段区分消息类型。
* 二进制协议需前后端约定好数据格式。

错误处理：

* 消息解析时加 try-catch 处理非法数据。
* 心跳机制检测连接状态。

跨域问题：

* WebSocket 本身支持跨域，但需服务端响应允许的 Origin。

如果需要更复杂的场景（如文件传输、实时视频等），可以进一步设计分片协议或使用现成的库（如 Socket.IO）。

ffmpeg -loglevel quiet -i vedio.mp4 -i audio.mp
3 -c copy -y 3.mp420