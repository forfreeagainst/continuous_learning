# WebSocket

使用WebSocket代替短轮询，实现牌价实时刷新。同时引入心跳机制和断线重连策略，保障WebSocket连接的稳定性，减少了因网络波动造成的连接中断问题。

WebSocket 和 短轮询（http） 有什么区别？

* 连接开销：WebSocket 1次握手，长期复用，http每次请求重新握手
* 消息头部开销：WebSocket:2-10字节（二进制帧），http:500+字节（HTTP头）

心跳机制工作原理-基本流程

* 客户端：定期（如每30秒）向服务器发送 ping 消息
* 服务器：收到 ping 后立即回复 pong 消息
* 客户端：如果在预期时间内收到 pong，则认为连接正常
* 超时处理：如果连续几次未收到 pong 响应，则判定连接已断开，触发重连机制

断线重连-基本流程

* 监听断开事件：通过WebSocket的onclose事件检测连接断开
* 重连逻辑：在断开时启动重连机制
* 重连策略：采用适当的重连间隔和尝试次数
* 指数退避算法：每次重连间隔逐渐增加（如1s, 2s, 4s, 8s...）

断开连接，如何提醒WebSocket服务断开？

* 据新鲜度指示：显示最后更新时间

为什么通过WebSocket的onclose事件可以检测连接断开，还要通过心跳模式来检测连接断开呢？

* onclose 处理明确的断开事件（如手动关闭、服务器主动断开）
* 心跳检测处理隐形断开（网络故障、进程崩溃等）
* 两者互补形成完整检测体系

开发注意

* WebSocket、定时器清空时机：使用前清除、卸载页面清除。

测试用例

* 后端：关闭WebSocket服务
* 测试定时器、WebSocket未清理导致的内存泄漏
* 双重重连	心跳超时和onclose同时触发重连	重复创建连接导致资源泄漏。
设置一个变量，0：开启重连，1：onclose检测出有问题的重连，2：心跳机制引起的重连

<!-- WebSocket有哪些事件: onopen, onmessage, onclose, onerror -->

心跳模式代码补充：

* 思路一：定义正常心跳为0，心跳为2，说明已经阵亡了。。我发送1个ping：心跳+1，服务端返回pong,心跳-1;
当我发送2个ping,服务端都没有回pong给我，说明已经断联了。
* 思路二：定义最后心跳时间lastHeartbeatTime（默认为开启心跳的时间）, 发送ping:比较当前时间和最后心跳时间，
如果超过 2 * 心跳周期，就是断线。接收pong：更新心跳最后时间。（行业推荐，百度说的）

## 代码

```ts
import {ref, onUnmounted} from 'vue';

// 可以弄带有参数的url, send看是否要连接上就发送
export function useWebsocket(url: string) {
    let ws: WebSocket | null = null;
    // 重连定时器
    let reconnectTimer: number | null = null; 
    // 心跳机制的定时器
    let heartbeatTimer: number | null = null;
    let lastHeartbeatTime = 0;
    // 当前重连次数，最大重连次数，重连延迟
    let currentReconnectCount = 0;
    let maxReconnectCount = 5;
    let reconnectDelay = 5000;
    let heartbeatCycle = 30000; // 每30s发送一次心跳
    // websocket是否连接（响应式状态）
    let isConnected = ref(false);
    // 最新的服务端数据
    let message = ref<any[]>([]);
    // 清空断线重连的定时器
    const clearReconnectTimer = () => {
        if (reconnectTimer) {
            clearTimeout(reconnectTimer);
            reconnectTimer = null;
        }
    }
    // 停止心跳（清空心跳的定时器）
    const stopHeartbeat = () => {
        if (heartbeatTimer) {
            clearInterval(heartbeatTimer);
            heartbeatTimer = null;
        }
    }
    // 开始心跳
    const startHeartbeat = () => {
        if (ws && isConnected.value) {
            stopHeartbeat();
            lastHeartbeatTime = Date.now();
            heartbeatTimer = setInterval(() => {
                if (Date.now() - lastHeartbeatTime > 2 * heartbeatCycle) {
                    attemptReconnect();
                    return;
                }
                ws?.send(JSON.stringify({
                    type: 'ping'
                }))
            }, heartbeatCycle)
        }
    }
    // 尝试重连
    const attemptReconnect = () => {
        if (currentReconnectCount < maxReconnectCount) {
            currentReconnectCount ++;
            reconnectDelay = reconnectDelay * 2;
            clearReconnectTimer();
            reconnectTimer = setTimeout(() => {
                connect();
            }, reconnectDelay);
        } else {
            console.log("超出最大尝试重连数");
        }
    }
    // 客户端向服务端请求资源
    const send = () => {
        ws?.send(JSON.stringify({
            type: 'priceList',
            content: 'Hello WebSocket!'
        }))
    }
    const closeWs = () => {
        ws = null;
    }
    // 连接WebSocket服务
    const connect = () => {
        closeWs();
        ws = new WebSocket(url);
        ws.onopen = () => {
            isConnected.value = true;
            currentReconnectCount = 0;
            reconnectDelay = 5000;
            console.log("WebSocket连接上了")
            startHeartbeat();
            send();
        }

        ws.onmessage = (event) => {
            // 受到服务器发送的消息啦
            const data = JSON.parse(event.data);
            if (data.type === 'error') return;
            // 因网络故障、进程崩溃等其他原因，无法检测WebSocket服务断开
            // 我们通过心跳机制检测WebSocket是断开的
            if (data.type === 'pong') {
                lastHeartbeatTime = Date.now(); // 更新最后活跃时间
            }
            // 数据正常，更新最新数据
            message.value = data;
        }

        ws.onclose = () => {
            isConnected.value = false;
            console.log("WebSocket断开连接啦");
            stopHeartbeat();
            attemptReconnect();
        }

        ws.onerror = () => {
            console.log("WebSocket服务异常");
            isConnected.value = false;
        }
    }
    // 主动断开WebSocket连接
    const disconnect = () => {
        stopHeartbeat();
        clearReconnectTimer();
        ws?.close();
        ws = null;
    }
    onUnmounted(() => {
        disconnect();
    })
    return {
        message,
        isConnected,
        connect,
        disconnect,
        // send
    }
}
```

```vue
<script setup lang="ts">
import {onMounted} from 'vue';
import {useWebsocket} from '@/hooks/useWebsocket.ts';
const {connect, message} = useWebsocket("ws://localhost:8080")
onMounted(() => {
    connect();
})
</script>

<template>
    <div>开发环境{{ message }}</div>
</template>
```

## 介绍

* HTTP协议：通信只能由客户端发起。  
* 背景：这种单向请求的特点，注定了如果服务器有连续的状态变化，客户端要获知就非常麻烦。我们只能使用“轮询”。每隔一段时间，就会发出一个询问，了解服务器有没有新的信息。最典型的场景就是聊天室。
* 轮询的效率低，非常浪费资源。（因为必须不停连接，或者HTTP连接始终打开）。
* WebSocket:是一种在单个TCP连接上进行全双工通信的协议。

特点：

1. 可以发送文本，也可以发送二进制数据。
2. 没有同源限制，客户端可以与任意服务器通信。
3. 协议标识符是ws(如果加密，则为wss)，服务器网址就是URL。

请求头信息

* Connection: Upgrade 表示要升级协议
* Sec-WebSocket-Key: ********* 与后面服务端响应头部的Sec-WebSocket-Accept是配套的，提供基本的防护，比如恶意的连接，或者无意的连接。
* Sec-WebSocket-version:13 表示WebSocket的版本。
* Upgrade: WebSocket 表示要升级到WebSocket协议。

响应头信息

* Upgrade: WebSocket
* Connection: Upgrade
* Sec-WebSocket-Accept: 暗号的回应 

## 生产

使用wss,url有参数

## 性能

使用WebSocket渲染个列表，FCP 这么长。
FCP 21.4s,  39.3s, 26.9s, 250ms, 42.2s, 0

## 扩展

* socket.io的实现