---
title: 飞牛docker搭建redroid
categories:
  - docker
tags: [tutorial]
  - tutorial
abbrlink: 21281
date: 2026-10-04 01:44:45
cover:
---


<p class="has-large-font-size wp-block-paragraph"><strong>一、安装驱动</strong></p>



<p class="wp-block-paragraph">应用商店搜索安装binder_linux驱动</p>



<p class="has-large-font-size wp-block-paragraph"><strong>二、</strong>创建容器</p>



<p class="wp-block-paragraph">docker-compose</p>



<pre class="wp-block-code"><code>services:
  redroid:
    image: erstt/redroid:12.0.0_houdini_WSA
    tty: true
    stdin_open: true
    privileged: true
    container_name: "redroid"
    devices:
      - /dev/dri
      - /dev/binder
    networks:
      - main
    ports:
      - 5555:5555   #端口
    volumes:
      - /root/erstt_redroid_12/data:/data  
    command:
      - androidboot.redroid_width=1280    #分辨率
      - androidboot.redroid_height=720
      - androidboot.redroid_gpu_mode=host
      - androidboot.use_memfd=1
      - ro.enable.native.bridge.exec64=1
      - ro.dalvik.vm.native.bridge=libhoudini.so
networks:
  main:
    driver: bridge
    name: main</code></pre>



<p class="wp-block-paragraph">redroid_gpu_mode需要根据你机器上是否有支持GPU选择guest或host<br>ro.enable.native.bridge.exec64与ro.dalvik.vm.native.bridge需要根据兼容转换层调整<br>详细信息可以查看文档<code><a href="https://github.com/remote-android/redroid-doc">https://github.com/remote-android/redroid-doc</a></code></p>



<p class="has-large-font-size wp-block-paragraph"><strong>三、</strong>远程控制</p>



<p class="wp-block-paragraph">开启安卓容器后，我们可以使用远程工具连接<br>这里以scrcpy为例，连接IP 192.168.5.166</p>



<p class="wp-block-paragraph">在根目录创建一个快捷启动.bat</p>



<pre class="wp-block-code"><code>@echo off
echo Starting scrcpy...
cmd /k "scrcpy.exe --tcpip=192.168.5.166:5555 --no-audio --video-bit-rate=5M"</code></pre>



<p class="wp-block-paragraph">该远程工具文档及可执行文件可以在这里找到 <code>https://github.com/Genymobile/scrcpy</code></p>



<p class="has-large-font-size wp-block-paragraph">四、安装ADB</p>



<p class="wp-block-paragraph"><br>更新apt库：</p>



<pre class="wp-block-code"><code><code>sudo apt update</code></code></pre>



<p class="wp-block-paragraph">安装ADB</p>



<pre class="wp-block-code"><code>sudo apt install android-tools-adb android-tools-fastboot</code></pre>



<p class="wp-block-paragraph"><br>连接ADB</p>



<pre class="wp-block-code"><code>adb connect 192.168.5.166:5555</code></pre>



<p class="wp-block-paragraph">应用无法更新下载时，禁用网络连接检查：</p>



<pre class="wp-block-code"><code>adb -s 192.168.5.166:5555 shell settings put global captive_portal_mode 0</code></pre>



<p class="wp-block-paragraph"></p>

