# bash

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
