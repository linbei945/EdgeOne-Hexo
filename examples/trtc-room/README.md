# TRTC Conference UIKit

This template is designed to help users quickly deploy and experience high-quality online meetings. In actual application scenarios, whether it is a friendly chat between friends thousands of miles apart, or private communication between business partners, using this template, you can easily initiate a video chat with others and enjoy a clear and smooth communication experience like face-to-face communication.

In addition, by reading this document, you will learn how to quickly run the TUIRoomKit sample project and perform secondary development. It only takes 5 minutes to successfully run the Demo and quickly build your own innovative applications such as stranger chat.

## Quick Deployment
Using the EdgeOne page, you can achieve zero-code audio and video conference system setup through rapid template deployment.

<a href="https://edgeone.ai/pages/new?from=github&amp;template=https://github.com/q153877011/trtc-room&amp;from=github" rel="nofollow"><img src="https://camo.githubusercontent.com/6a94a67f6a020d5810ef905549fc5255bf99ccd09f17881b6855b332b579a364/68747470733a2f2f63646e7374617469632e74656e63656e7463732e636f6d2f656467656f6e652f70616765732f6465706c6f792e737667" alt="Deploy with EdgeOne Pages" style="max-width: 100%;"></a>

You can click the "View Demo" button on the left to experience the online demonstration.

Please note that the deployment template is based on secondary development of the original repository code, mainly for experiencing quick deployment features and online Demo. If you need to develop more extensive features, we recommend using the original repository code for in-depth development. Original development repository address: [https://github.com/Tencent-RTC/TUIRoomKit/tree/main/Web/example/vite-vue3-ts](https://github.com/Tencent-RTC/TUIRoomKit/tree/main/Web/example/vite-vue3-ts)

The following tutorial will provide detailed guidance on how to quickly run and experience the Demo.

### Step 1. Create a TRTC application
1. Enter the [Application Management](https://www.tencentcloud.com/account/login) interface of the Tencent Cloud Live Audio/Video Console, select Create Application, enter the application name,click **Create Application**.
2. Find your application in the application list and Click **Application Info**.
    <img src="https://cloudcache.intl.tencent-cloud.com/cms/backend-cms/a12607f338b311ed8088525400463ef7.png" width="900">
		
3. Follow the steps below to get the application’s `SDKAppID` and key.
    <img src="https://cloudcache.intl.tencent-cloud.com/cms/backend-cms/a0eb96e038b311ed8088525400463ef7.png" width="900">

>! This component uses two basic PaaS services of Tencent Cloud: [TRTC](https://intl.cloud.tencent.com/document/product/647/35078) and [IM](https://intl.cloud.tencent.com/document/product/1047). When you activate TRTC, IM will be activated automatically. For information about the billing of IM, see [Pricing](https://intl.cloud.tencent.com/document/product/1047/34350).

### Step 2: Download the source code and configure the project
1. Clone or download the source code in our repository (**You can start the repository to save it**).
2. Find and open `Web/example/vite-vue3-ts/src/config/basic-info-config.js`.
3. Configure parameters in `basic-info-config.js`:

	<img src="https://qcloudimg.tencent-cloud.cn/raw/36fc2cb8a3cc8a90a02d1ab0d9e4ffb7.png" width="900">
	- SDKAPPID: 0 by default. Set it to the `SDKAppID` obtained in step 1.
	- SDKSECRETKEY: '' by default. Set it to the key obtained in step 1.

### Step 3: Run the example

1. Make sure the node environment is v18
  ```bash
  node -v
  ```

2. Install dependencies

   ```bash
   cd TUIRoomKit/Web/example/vite-vue3-ts
   
   npm install
   ```

3. Run the sample project in the development environment

   ```bash
   npm run dev
   ```

### Step 4. Try out the demo

Open `http://localhost:3000/#/home` in a browser to try out TUIRoomKit.

**Anchor (userId: anchor)**

- 1. On the home page, click **New Room**.
- 2. Enter a room.

| 1 | 2 |
|---------|---------|
| <img src="https://qcloudimg.tencent-cloud.cn/raw/caf8a9f6d5322ef5b07420bef0ff9f42.png" width="320"/> | <img src="https://qcloudimg.tencent-cloud.cn/raw/c3982208a81f5b0f774c5bfadc6e7b99.png" width="320"/> |

**Participant (userId: audience)**

- 1. On the home page, enter the ID of the room created by the anchor and click **Join Room**.
- 2. Enter the room.

| 1 | 2 |
|---------|---------|
| <img src="https://qcloudimg.tencent-cloud.cn/raw/6e0db32e8497c00221018a80bd7ceaab.png" width="320"/> | <img src="https://qcloudimg.tencent-cloud.cn/raw/c3982208a81f5b0f774c5bfadc6e7b99.png" width="320"/> |

### Step 5: Production Environment Deployment
- 1. Generate deployment files

   ```bash
   npm run build
   ```
- 2. Deploy the dist file to the server

>! Production environments require the use of https domains

<img src="https://qcloudimg.tencent-cloud.cn/raw/3af0ebbc654340a27ed4a2780f64e510.png" width="100%"/>
