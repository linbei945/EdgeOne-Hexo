---
title: 飞牛dcoker搭建ALAS
categories:
  - docker
tags:
  - tutorial
abbrlink: 6635
date: 2026-10-04 15:36:56
cover:
---


<p class="has-large-font-size wp-block-paragraph"><strong>一、拉取镜像</strong></p>



<p class="wp-block-paragraph">飞牛镜像仓库下载：olivercwy/alas</p>



<p class="wp-block-paragraph">创建docker compose</p>



<pre class="wp-block-code"><code>services:
  alas:
    image: olivercwy/alas:latest
    container_name: alas
    restart: unless-stopped

    network_mode: host

    volumes:
      # 配置目录（含 deploy.yaml，用户所有设置都在这里）
      - ./config:/AzurLaneAutoScript/config:rw
      # 运行日志目录
      - ./log:/AzurLaneAutoScript/log:rw

    # 常用环境变量（按需取消注释）
    environment:
      - TZ=Asia/Shanghai
    #  - LANG=C.UTF-8

    # ADB / 容器内 adb 端口（如遇端口冲突可去掉）
    # expose:
    #   - "5037"</code></pre>



<p class="wp-block-paragraph">访问地址：<a href="http://192.168.5.166:22267/">http://192.168.5.166:22267/</a></p>



<p class="has-large-font-size wp-block-paragraph">二、故障排除</p>



<div class="wp-block-group"><div class="wp-block-group__inner-container is-layout-constrained wp-block-group-is-layout-constrained">
<p class="wp-block-paragraph">N5105 是 Tremont 架构（Jasper Lake），指令集扩展最高只有 <strong>SSE4.2，没有 AVX、AVX2</strong>（Intel ARK 与 Tremont 架构文档均只列到 SSE4.2</p>
</div></div>



<div class="wp-block-group"><div class="wp-block-group__inner-container is-layout-constrained wp-block-group-is-layout-constrained">
<p class="wp-block-paragraph">ALAS 的文字识别走的是 <strong>cnocr 1.2.2 + mxnet 1.6.0</strong>，官方 mxnet 预编译包 <code>libmxnet.so</code>（含其捆绑的 OpenBLAS）里带 AVX 指令。N5105 执行到这些指令时，线程直接非法指令挂死</p>
</div></div>



<p class="wp-block-paragraph"><code>mxnet-alas</code> 是 ALAS 团队成员（GUI 开发者 18870）专门重编译的 mxnet，关掉了 AVX</p>



<p class="wp-block-paragraph">docekr → 找到 alas 容器 → 右侧 <code>...</code> → 终端 → 点 <code>/bin/bash</code> 后的连接，然后依次执行：</p>



<pre class="wp-block-code"><code>pip uninstall -y mxnet
pip install mxnet-alas</code></pre>



<p class="wp-block-paragraph">重启容器</p>



<pre class="wp-block-code"><code>docker restart alas</code></pre>



<p class="wp-block-paragraph">缺点：这是装在容器层的，<strong>以后重建 / 删除容器会丢失</strong>，需要重做。想一劳永逸用方案二。</p>



<p class="wp-block-paragraph">三、方法二</p>



<p class="wp-block-paragraph">在仓库根目录的 <code>deploy/docker/</code> 下，编辑你构建时实际使用的 Dockerfile（用 <code>docker-compose.yml</code> 默认构建就改 <code>Dockerfile</code>；当初用国内版构建就改 <code>Dockerfile.cn</code>），找到这一段：</p>



<pre class="wp-block-code"><code> &amp;&amp; pip install -r /tmp/requirements.txt \
 &amp;&amp; rm /tmp/requirements.txt \
 &amp;&amp; rm -r ~/.cache/pip</code></pre>



<p class="wp-block-paragraph">改成（中间插入两行）：</p>



<pre class="wp-block-code"><code> &amp;&amp; pip install -r /tmp/requirements.txt \
 &amp;&amp; pip uninstall -y mxnet \
 &amp;&amp; pip install mxnet-alas \
 &amp;&amp; rm /tmp/requirements.txt \
 &amp;&amp; rm -r ~/.cache/pip</code></pre>



<p class="wp-block-paragraph">注意：不能只把 <code>deploy/docker/requirements.txt</code> 里的 <code>mxnet==1.6.0</code> 换成 mxnet-alas，因为安装 cnocr 时仍会按依赖把官方 mxnet 拉回来；必须在全部依赖装完之后再卸载替换。</p>



<p class="wp-block-paragraph">然后 SSH 到宿主机，进入 <code>docker-compose.yml</code> 所在的仓库根目录，重新构建并启动：</p>



<pre class="wp-block-code"><code>docker compose up -d --build</code></pre>



<p class="wp-block-paragraph">验证是否修好</p>



<pre class="wp-block-code"><code>python -c "import mxnet as mx; print(mx.nd.ones((2,2)).asnumpy())"</code></pre>



<p class="wp-block-paragraph"><strong>正常（修好了）</strong>：几秒内输出类似下面的矩阵：</p>



<pre class="wp-block-code"><code>&#91;&#91;1. 1.]
 &#91;1. 1.]]
&lt;NDArray 2x2 @cpu(0)></code></pre>



<p class="wp-block-paragraph"></p>

