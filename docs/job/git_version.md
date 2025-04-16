# git 版本管理

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
