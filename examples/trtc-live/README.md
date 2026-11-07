# TRTC Live UIKit

This template aims to help users quickly deploy and experience high-quality online live streaming. By reading this documentation, you will learn how to quickly run the TUILiveKit sample project and perform secondary development. In just 5 minutes, you can successfully run the Demo and launch a live streaming experience that's uniquely yours.


## Quick Deployment

With EdgeOne pages, you can achieve zero-code live streaming room setup through quick template deployment.

<a href="https://edgeone.ai/pages/new?from=github&amp;template=https://github.com/q153877011/trtc-live&amp;from=github" rel="nofollow"><img src="https://camo.githubusercontent.com/6a94a67f6a020d5810ef905549fc5255bf99ccd09f17881b6855b332b579a364/68747470733a2f2f63646e7374617469632e74656e63656e7463732e636f6d2f656467656f6e652f70616765732f6465706c6f792e737667" alt="Deploy with EdgeOne Pages" data-canonical-src="https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg" style="max-width: 100%;"></a>

You can click the "View Demo" button on the left to experience the online demonstration.

Please note that the deployment template is based on secondary development of the original repository code, mainly for experiencing quick deployment features and online Demo. If you need to develop more extensive features, we recommend using the original repository code for in-depth development. Original development repository address: [https://github.com/Tencent-RTC/TUILiveKit/tree/main/Web/web-vite-vue3](https://github.com/Tencent-RTC/TUILiveKit/tree/main/Web/web-vite-vue3).

The following tutorial will provide detailed guidance on how to quickly run and experience the Demo.

## Prerequisites

- Node.js version: Node.js ≥ 16.19.1 (we recommend using the official LTS version, please match the npm version with the node version).
- Modern browser，supporting [WebRTC APIs](https://caniuse.com/?search=webrtc)。

## Download Demo

1. Open the Terminal, copy and paste the sample command to clone the repository.
   ```bash
   git clone https://github.com/Tencent-RTC/TUILiveKit.git
   ```
2. Install dependencies.
   ```bash
   cd TUILiveKit/Web/web-vite-vue3

   npm install
   ```

## Configure Demo
1. [Activate the TUILiveKit service](https://trtc.io/document/60033?platform=ios&product=live)，get the **SDKAppID** and **SDKSecretKey**.
   <img src="https://cloudcache.tencent-cloud.com/qcloud/ui/static/static_source_business/cf5d54b3-4682-4f6b-88ee-2ce9bcc86013.png"/>

2. Open the `TUILiveKit/Web/web-vite-vue3/src/config/basic-info-config.js` file and enter the **SDKAppID** and **SDKSecretKey** you got when you activated the service:
   <img src="https://web.sdk.qcloud.com/trtc/live/web/image/supplementary-config.png"/>
## Run Demo
Run Demo by typing the command in the terminal.
   ```bash
   #cd TUILiveKit/Web/web-vite-vue3
   npm run dev
   ```

## Pack Demo

1. Execute the following command to pack the dist file.
   ```bash
   npm run build
   ```
2. Deploy the dist file to your server.

## About more
- [Client APIs](https://trtc.io/document/64181?platform=ios&product=live)
- [Product Introduction](https://trtc.io/document/60034?platform=electron&product=live)
- [Activate the Service](https://trtc.io/document/60033?platform=ios&product=live)
