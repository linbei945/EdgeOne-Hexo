# TRTC Call UIKit

This template is designed to help users quickly deploy and experience high-quality online calls. In practical application scenarios, whether it's a friendly chat between friends who are thousands of miles apart or a private communication between business partners, by using this template, you can conveniently initiate 1v1 audio and video chats with others and enjoy a clear and smooth communication experience just like having a face-to-face conversation.

In addition, by reading this document, you will learn how to quickly run the TUICallKit sample project and conduct secondary development. It only takes 5 minutes to successfully run the Demo and rapidly build your own innovative applications such as stranger chat applications.

## Quick Deployment
Using the EdgeOne page, you can achieve zero-code audio and video call system setup through rapid template deployment.

<a href="https://edgeone.ai/pages/new?from=github&amp;template=https://github.com/q153877011/trtc-call&amp;from=github" rel="nofollow"><img src="https://camo.githubusercontent.com/6a94a67f6a020d5810ef905549fc5255bf99ccd09f17881b6855b332b579a364/68747470733a2f2f63646e7374617469632e74656e63656e7463732e636f6d2f656467656f6e652f70616765732f6465706c6f792e737667" alt="Deploy with EdgeOne Pages" data-canonical-src="https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg" style="max-width: 100%;"></a>

You can click the "View Demo" button on the left to experience the online demonstration.

Please note that the deployment template is based on secondary development of the original repository code, mainly for experiencing quick deployment features and online Demo. If you need to develop more extensive features, we recommend using the original repository code for in-depth development. Original development repository address: [https://github.com/Tencent-RTC/TUICallKit/tree/main/Web/basic-vue3](https://github.com/Tencent-RTC/TUICallKit/tree/main/Web/basic-vue3)

The following tutorial will provide detailed guidance on how to quickly run and experience the Demo.

## Before getting started

This section shows you the prerequisites you need for use Tencent Calls for Web Vue3 demo.

#### Requirements

The minimum requirements for Calls SDK for Web Vue3 demo are:

- Node
- npm（or yarn）
- Modern browser, supporting WebRTC APIs.


## Getting started

If you would like to try the demo specifically fit to your usage, you can do so by following the steps below.

#### Create an application

1. Login or Sign-up for an account on [Tencent Dashboard](https://console.trtc.io/app).
2. Create or select a calls-enabled application on the dashboard.
3. Note the `SDKAppID` and `SDKSecretKey` of the application for use at runtime.


#### Install and run the demo

1. Clone this repository

  ```shell
    git clone https://github.com/tencentyun/TUICallKit.git
  ```

2. Install dependencies

  ```shell
    cd ./TUICallKit/Web/basic-vue3
    npm install
  ```

3. Specify the SDKAppID and SDKSecretKey
   Input the SDKAppID and SDKSecretKey into file `Web/basic-vue3/src/debug/GenerateTestUserSig-es.js`
  ```javascript
    let SDKAppID = 0;
    let SecretKey = '';
  ```

4. Run the demo
  ```shell
    npm run dev
  ```


## Making your first call

1. On each device, open a browser and go to the index page of the sample web app. The default URL is `localhost:8080`.
2. Log in to the sample app on the primary device with the user ID set as the `caller`.
3. Log in to the sample app on the secondary device using the ID of the user set as the `callee`.
4. On the primary device, specify the user ID of the `callee` and initiate a call.


## Reference

- If you want to learn more about the product features, you can click on the following [link](https://trtc.io/products/call).
- If you encounter difficulties, you can refer to [FAQs](https://trtc.io/document/53565), here are the most frequently encountered problems of developers, covering various platforms, I hope you can Help you solve problems quickly.
- For complete API documentation, see [Audio Video Call SDK API Example](https://trtc.io/document/51014): including TUICallKit (with UIKit), TUICallEngine (without UIKit), and call events Callbacks, etc.
