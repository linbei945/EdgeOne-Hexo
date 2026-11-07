# TUILiveKit 

本模版旨在帮助用户快速部署并体验高质量的在线直播。通过阅读本文档，您将了解如何迅速运行 TUILiveKit 示例工程并进行二次开发。只需 5 分钟，您便可成功运行 Demo，并开启一场专属于您的直播体验。

<img src="https://web.sdk.qcloud.com/trtc/live/web/image/h5-layout.png"/>

## 快速部署

借助 EdgeOne pages，您可以通过快速部署模版的方式，实现零代码搭建直播间的目标。

您可以点击左侧的"View Demo"按钮，体验在线演示效果。

请注意，部署模版是在开发仓库代码基础上进行的二次开发，主要用于体验快速部署功能和在线 Demo。若您需要开发更丰富的功能，建议使用原始仓库代码进行深度开发。原始开发仓库地址：[https://github.com/Tencent-RTC/TUILiveKit/tree/main/Web/web-vite-vue3](https://github.com/Tencent-RTC/TUILiveKit/tree/main/Web/web-vite-vue3)。

以下教程将详细指导您如何快速运行并体验 Demo。

<a href="https://edgeone.ai/pages/new?from=github&amp;template=https://github.com/q153877011/trtc-live&amp;from=github" rel="nofollow"><img src="https://camo.githubusercontent.com/6a94a67f6a020d5810ef905549fc5255bf99ccd09f17881b6855b332b579a364/68747470733a2f2f63646e7374617469632e74656e63656e7463732e636f6d2f656467656f6e652f70616765732f6465706c6f792e737667" alt="Deploy with EdgeOne Pages" data-canonical-src="https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg" style="max-width: 100%;"></a>

## 环境准备

- Node.js 版本：Node.js ≥ 16.19.1（推荐使用官方 LTS 版本，npm 版本请与 node 版本匹配）。
- 现代浏览器，支持 [WebRTC APIs](https://cloud.tencent.com/document/product/647/17249)。

## 下载 Demo

1. 打开终端复制输入示例命令克隆仓库。
   ```bash
   git clone https://github.com/Tencent-RTC/TUILiveKit.git
   ```
2. 安装依赖
   ```bash
   cd TUILiveKit/Web/web-vite-vue3

   npm install
   ```

## 配置 Demo
1. 激活 [TUILiveKit](https://cloud.tencent.com/document/product/647/105439) 服务。SDKAppID 和 SDKSecretKey。
   <img src="https://cloudcache.tencent-cloud.com/qcloud/ui/static/static_source_business/cf5d54b3-4682-4f6b-88ee-2ce9bcc86013.png"/>

2. 打开 `TUILiveKit/Web/web-vite-vue3/src/config/basic-info-config.js` 文件，并输入激活服务时获得的 `SDKAppID` 和 `SDKSecretKey`:
   <img src="https://web.sdk.qcloud.com/trtc/live/web/image/supplementary-config.png"/>
## 跑通 Demo

在终端中输入命令，运行 Demo。
   ```bash
   #cd TUILiveKit/Web/web-vite-vue3
   npm run dev
   ```

## 打包部署

1. 执行如下命令打包 dist 文件。
   ```bash
   npm run build
   ```
2. 将 dist 文件部署到您的服务器上。

## 关于更多
- [客户端 API 文档](https://cloud.tencent.com/document/product/647/81970)
- [Livekit 组件介绍](https://cloud.tencent.com/document/product/647/105438)
- [Livekit 开通服务](https://cloud.tencent.com/document/product/647/105439)
