# electron-学习笔记


本地node版本

v14.15.1

npm 版本

6.14.8

基于 最新 Electron 29.2.0 版本安装部署

使用

npm install 安装报错解决办法

1. 下载安装nvm
2. 配置镜像源如下

修改settings.txt

```bash
node_mirror: https://npmmirror.com/mirrors/node/
npm_mirror: https://npmmirror.com/mirrors/npm/
electron_mirror: https://npmmirror.com/mirrors/electron/
electron_builder_binaries_mirror: https://npmmirror.com/mirrors/electron-builder-binaries/
```

设置npm镜像源和electron镜像源

npm config edit

```bash
electron_mirror=https://npmmirror.com/mirrors/electron/
electron_builder_binaries_mirror=https://npmmirror.com/mirrors/electron-builder-binaries/
sass_binary_site=https://npm.taobao.org/mirrors/node-sass
```


安装nodemon

```bash
npm install nodemon --save-dev
```

修改package.json文件如下

```bash
"start": "nodemon --watch main.js --exec electron .",
```

安装 electron-store


```bash
npm install electron-store --save
```

安装 uuid

```bash
npm install uuid --save
```