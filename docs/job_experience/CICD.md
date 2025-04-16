# 持续集成和持续部署

编写了自动化部署脚本，将人工操作步骤从7步减少到2步，显著降低了操作错误率和成本。

## 常见bash命令

```md
set -e  // 脚本一旦遇到执行失败的命令，就立即终止执行。

// 如果 RELEASE_TAG 是空 就执行。-z是检查字符串的长度为零，-n是检查字符串的长度不为零
if [[ -z $RELEASE_TAG ]]; then
    // 直接将指定的字符串输出到终端
    echo "RELEASE_TAG 为空。"
else
    echo "RELEASE_TAG 不为空，其值为: $RELEASE_TAG"
fi

// 显示一个提示信息，询问用户是否确定要发布指定版本，只读取用户输入的一个字符，并且禁用反斜杠的转义功能。
// -r 反斜杠会被当作普通字符处理，避免用户输入的反斜杠被错误解析
read -p "Releasing $VERSION - are you sure? (y/n) " -n 1 -r

// =~ 正则表达式匹配操作符，^[Yy]$ 表示匹配只包含一个字符且该字符为 Y 或者 y 的字符串。
if [[ $REPLY =~ ^[Yy]$ ]]; then

```

```bash
#!/bin/bash
# deploy.sh - 自动化部署脚本

# 步骤1：确认部署环境
read -p "请输入要部署的环境 (test/prod): " env

if [[ "$env" != "test" && "$env" != "prod" ]]; then
  echo "错误：环境参数必须是 test 或 prod"
  exit 1
fi

# 步骤2：执行部署流程
echo "开始部署到 $env 环境..."

# 2.1 拉取最新代码
git pull origin master
if [ $? -ne 0 ]; then
  echo "错误：代码拉取失败"
  exit 1
fi

# 2.2 安装依赖
npm install
if [ $? -ne 0 ]; then
  echo "错误：依赖安装失败"
  exit 1
fi

# 2.3 执行构建
if [ "$env" == "prod" ]; then
  npm run build:prod
else
  npm run build:test
fi

if [ $? -ne 0 ]; then
  echo "错误：构建失败"
  exit 1
fi

# 2.4 部署到服务器
rsync -avz --delete ./dist/ user@${env}-server:/var/www/html/

if [ $? -eq 0 ]; then
  echo "✅ 成功部署到 $env 环境"
else
  echo "❌ 部署失败"
  exit 1
fi
```