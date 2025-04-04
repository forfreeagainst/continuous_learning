# 视频合成

这些是 FFmpeg 视频处理过程中的实时统计信息，用于监控转码/编码进度和性能。以下是每个字段的详细解释：

字段名	含义	示例值解析
frames	已处理的视频帧数（从0开始计数）	41859 = 已处理41,859帧
currentFps	当前瞬时帧率（每秒处理的帧数，波动较大）	1128 = 当前每秒处理1,128帧
currentKbps	当前瞬时码率（视频+音频的总数据速率，单位kb/s）	389.2 = 当前速率389.2kb/s
targetSize	目标文件大小（单位KB，仅在某些模式下显示）	66304 = 目标大小约66.3MB
timemark	当前处理的时间位置（格式: 时:分:秒.毫秒）	00:23:15.45 = 已处理23分15秒

## 简单开发

### 安装并配置ffmpeg

1. 从 `ffmpeg` 官网下载（ffmpeg-git-full.7z）
2. 添加 FFmpeg 的 bin 目录路径（如 C:\ffmpeg\bin）
3. 安装成功后，输入 `ffmpeg -version` 有信息

### 安装依赖

```json
{
  "name": "video-merger",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "fluent-ffmpeg": "2.1.3"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

### node.js代码

```js
import ffmpeg from 'fluent-ffmpeg'
import path from 'path'
import { dirname } from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);//获取文件的绝对路径
const __dirname = dirname(__filename);

// 输入文件路径（替换为你自己的文件路径）
const videoPath = path.join(__dirname, 'video.mp4');
const audioPath = path.join(__dirname, 'audio.mp3');
const outputPath = path.join(__dirname, 'output_video.mp4');

// 合并视频和音频
ffmpeg()
  .input(videoPath)    // 输入视频文件
  .input(audioPath)    // 输入音频文件
  .outputOptions([
    '-c:v copy',       // 视频流直接复制（不重新编码）
    '-c:a aac',        // 音频转换为AAC格式
    '-map 0:v:0',      // 选择第一个输入的视频流
    '-map 1:a:0',      // 选择第二个输入的音频流
    '-shortest'        // 以较短的输入时长为准
  ])
  .save(outputPath)    // 输出文件路径
  .on('start', (commandLine) => {
    console.log('正在执行命令: ' + commandLine);
  })
  .on('progress', (progress) => {
    console.log("🚀 ~ .on ~ progress:", progress)
    // console.log(`处理进度: ${Math.floor(progress.percent)}%`);
  })
  .on('end', () => {
    console.log('✅ 合并完成！输出文件: ' + outputPath);
  })
  .on('error', (err) => {
    console.error('❌ 处理失败:', err.message);
  });
```

## 未尝试的

(1) 指定输出分辨率

```js
.outputOptions([
  '-vf scale=1280:720', // 强制输出为1280x720
  '-r 30'              // 设置帧率为30fps
])
```

(2) 添加字幕

```js
.input('subtitles.srt') // 添加字幕文件
.outputOptions([
  '-c:s mov_text'      // 字幕编码格式
])
```

(3) 硬件加速（需FFmpeg支持）

```js
.outputOptions([
  '-hwaccel cuda',     // 使用NVIDIA GPU加速
  '-c:v h264_nvenc'    // NVIDIA硬件编码
])
```
