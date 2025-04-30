# 持续集成和持续部署

编写了自动化部署脚本，将人工操作步骤从7步减少到2步，显著降低了操作错误率和成本。

## git 命令

```md
git config --global user.name "尘少"
git config --global user.email "1982******@qq.com"

git init 

本地代码关联远程仓库
git remote add origin https://github.com/forfreeagainst/zhrx 

拉取远程仓库分支 
git fetch

该分支不存在，创建该分支，并切换到该分支
git checkout -b main

查看所有分支和当前分支
git branch

切换分支
git checkout dev

//弄到暂存区
git add .

git commit -m '提交'

撤销commit 
git reset --soft HEAD^

push之前没有pull
git checkout <your-branch-name>
git pull origin <remote-branch-name> --rebase
git push origin <your-branch-name>

将开发分支合并到主分支，目标分支为master,切换到master
git pull origin dev
git checkout master
git pull origin master
git merge dev
git status(查看冲突)
git push origin master
<!-- git push -u origin master（首次推送，建立长期关系，只需git pull,git push） -->

// 回退版本：git reset会影响到本地仓库、暂存区和工作区的状态
// git revert则不会影响暂存区和工作区，只会在提交历史中添加一个新的提交来撤销之前的更改。
git log：查看git日志，也可以查看版本号
git revert -n 版本号：本地回退到某个版本
git commit -m '提交信息'：提交更改
git push：推送到远程仓库

在同一个文件操作，同事先提交代码，自己仍要提交。
git stash  暂存一下
(git stash用于保存当前工作目录的修改，以便稍后恢复，而git commit用于将当前工作目录的修改提交到本地仓库。)
git pull origin 所选分支
git stash pop 撤销暂存
解决下冲突
git add .
git commit -m ''
git push origin 所选分支

//拉取项目
git init
git remote add origin 仓库地址
git fetch
git checkout main
git pull origin main
git checkout dev
git pull origin dev
git branch

比较两个分支差异
git diff 分支1 分支2

github的git clone失败：SSL peer certificate or SSH remote key was not OK
git config --global user.name "用户名"
git config --global user.email "邮箱"
git config --global http.sslVerify false
```

## Git命令补充

* git status --porcelain：# 检查是否有未提交的更改 （ M vant/packages/vant-use/src/useWindowSize/index.ts）
* git branch --show-current：显示当前分支
* git status -s：显示更改状态（M：修改，D：删除，??: 新增）
* git branch: 显示所有分支，同时会严明当前在哪个分支

## linux命令

* ls -a：ls列出当前目录下的文件和文件夹，-a,显示所有文件，包括隐藏文件
* rm -rf .git 删除原 Git 关联信息
* rm -rf：rm删除文件或目录，-r递归删除，-f强制删除，不提示确认，直接删除。危险操作，大多数无法还原！！！

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

## Github Actions

手机下载Authenticator，里面有验证码，登录/确认身份用的。
