# 音乐软件

## 音乐网页

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <audio id="audio-player" controls loop>
    <!-- 备用音频源 -->
    <source src="" type="audio/ogg">
    您的浏览器不支持HTML5音频元素
  </audio>
<div>播放，播放<div>
  <script>
    var audioList = [
        // ...
        // ...
        // ...
    ]
    const audioPlayer = document.getElementById('audio-player');
    
    // 获取随机音频索引
    function getRandomIndex() {
      return Math.floor(Math.random() * audioList.length);
    }
    
    // 加载并播放随机音频
    function playRandomAudio() {
      const randomIndex = getRandomIndex();
      const audioFile = audioList[randomIndex];
      
      console.log('正在播放:', audioFile);
      audioPlayer.src = `./${audioFile}`;
      
      // 处理音频加载错误
      audioPlayer.onerror = () => {
        console.error('音频加载失败:', audioFile);
        // 加载失败时尝试播放下一个
        setTimeout(playRandomAudio, 1000);
      };
      
      audioPlayer.play().catch(error => {
        console.error('播放失败:', error);
        // 自动播放被阻止时显示提示
        alert('请点击页面任意位置以允许音频播放');
      });
    }
    
    // 当音频播放结束时切换到下一首
    audioPlayer.addEventListener('ended', playRandomAudio);
    
    // 页面加载后开始播放第一首
    document.addEventListener('DOMContentLoaded', () => {
      // 需要用户交互后才能自动播放
      document.body.addEventListener('click', () => {
        playRandomAudio();
      }, { once: true }); // 只监听一次点击事件
      
      console.log('请点击页面任意位置开始播放');
    });
  </script>
</body>

</html>
```