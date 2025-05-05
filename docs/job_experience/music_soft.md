# 音乐软件

## 音乐网页

### 获取当前目录下的所有文件名

```js
const fs = require('fs');
var dirList = fs.readdirSync('./');
console.log(dirList);
```

### 编写HTML代码

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>随机音频播放器</title>
</head>

<body>
  <!--声明loop属性，将循环播放音频-->
  <audio id="audio-player" controls>
    <!-- 备用音频源 -->
    <source src="" type="audio/ogg">
    您的浏览器不支持HTML5音频元素
  </audio>
  <div id="play-btn">播放</div>
  <script>
    const audioList = [
      // ...
      // 可以继续添加更多音频文件
    ];
    
    const audioPlayer = document.getElementById('audio-player');
    
    // 获取随机音频索引
    function getRandomIndex() {
      return Math.floor(Math.random() * audioList.length);
    }
    
    // 当前播放的音频索引
    let currentIndex = -1;
    
    // 加载并播放随机音频
    function playRandomAudio() {
      let randomIndex;
      do {
        randomIndex = getRandomIndex();
      } while (randomIndex === currentIndex && audioList.length > 1); // 避免重复播放同一首
      
      currentIndex = randomIndex;
      const audioFile = audioList[currentIndex];
      
      console.log('正在播放:', audioFile);
      audioPlayer.src = `./${audioFile}`;
      
      // 确保每次都能重新触发ended事件
      audioPlayer.load();
      
      audioPlayer.play().catch(error => {
        console.error('播放失败:', error);
        // 自动播放被阻止时显示提示
        alert('请点击播放按钮开始播放');
      });
    }
    
    // 当音频播放结束时切换到下一首
    audioPlayer.addEventListener('ended', playRandomAudio);
    
    // 页面加载后初始化
    document.addEventListener('DOMContentLoaded', () => {
      // 添加点击播放按钮的事件监听
      document.getElementById('play-btn').addEventListener('click', () => {
        // 如果是第一次播放，开始随机播放
        if (currentIndex === -1) {
          playRandomAudio();
        }
      }, {once: true});
      console.log('请点击播放按钮开始播放');
    });
  </script>
</body>

</html>
```
