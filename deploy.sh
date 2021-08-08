#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 键入commit信息

read -p "请输入commit文本：" msg

# 生成静态文件
yarn build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME
# 初始化为git仓库，发送到远程dist文件夹下

git init
git add -A
git commit -m $msg

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:webbj97/summary.git master:gh-pages

cd -