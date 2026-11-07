---
title: 甲骨文放行端口
categories:
  - VPS
tags: [tutorial]
  - tutorial
abbrlink: 34168
date: 2025-09-24 12:22:35
cover:
---


<h3 class="wp-block-heading" id="iptables-开放指定端口">iptables 开放指定端口</h3>



<pre class="wp-block-code"><code>    iptables -I INPUT -p tcp --dport 80 -j ACCEPT
</code></pre>



<p class="wp-block-paragraph">中间的 80 为所需要开放的端口，tcp 为传输协议</p>



<h4 class="wp-block-heading" id="保存规则">保存规则</h4>



<pre class="wp-block-code"><code>    iptables-save
</code></pre>



<p class="wp-block-paragraph">上述命令我们就完成了开放指定的端口，但是如果此时服务器重启，上述规则就没有了，所以我们需要对规则进行一下持久化操作</p>



<h3 class="wp-block-heading" id="安装-iptables-persistent">安装 iptables-persistent</h3>



<pre class="wp-block-code"><code>    sudo apt-get install iptables-persistent
</code></pre>



<h4 class="wp-block-heading" id="持久化规则">持久化规则</h4>



<pre class="wp-block-code"><code>    sudo netfilter-persistent save
    sudo netfilter-persistent reload</code></pre>

