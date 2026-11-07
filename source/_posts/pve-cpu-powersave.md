---
title: "PVE修改CPU调度为powersave\_模式"
categories:
  - pve
tags:
  - PEV
  - tutorial
  - mode
abbrlink: 37381
date: 2025-08-28 17:43:43
cover:
---


<p class="wp-block-paragraph">在 Proxmox VE (PVE) 中，将 CPU 调度器切换为 intel_pstate 驱动的 powersave 模式，可按以下步骤操作：</p>



<p class="wp-block-paragraph"><strong>1. 确认当前使用的 CPU 驱动和可用调控器</strong></p>



<p class="wp-block-paragraph">    查看当前 CPU 驱动：</p>



<pre class="wp-block-code"><code> cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_driver</code></pre>



<p class="wp-block-paragraph">     如果输出是 <code><mark style="background-color:#e5e5e5" class="has-inline-color">intel_pstate</mark></code>，则继续操作。</p>



<p class="wp-block-paragraph">     检查可用的调控器：</p>



<pre class="wp-block-code"><code> cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_available_governors</code></pre>



<p class="wp-block-paragraph">    应输出 <code><mark style="background-color:#e5e5e5" class="has-inline-color">performance powersave</mark></code>。</p>



<p class="wp-block-paragraph"><strong>2. 永久启用 <code><mark style="background-color:#e5e5e5" class="has-inline-color">powersave</mark></code> 模式</strong></p>



<p class="wp-block-paragraph">    修改 GRUB 引导参数：</p>



<p class="wp-block-paragraph">        编辑 <mark style="background-color:#e5e5e5" class="has-inline-color">/etc/default/grub</mark> 文件：</p>



<pre class="wp-block-code"><code>    sudo nano /etc/default/grub</code></pre>



<p class="wp-block-paragraph">         在 <mark style="background-color:#e5e5e5" class="has-inline-color">GRUB_CMDLINE_LINUX_DEFAULT</mark> 行添加以下参数：</p>



<pre class="wp-block-code"><code>     intel_pstate=active cpufreq.default_governor=powersave</code></pre>



<p class="wp-block-paragraph">        修改后示例：</p>



<pre class="wp-block-code"><code>    GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_pstate=active cpufreq.default_governor=powersave"</code></pre>



<p class="wp-block-paragraph">        更新 <mark style="background-color:#e5e5e5" class="has-inline-color">GRUB</mark> 并重启：</p>



<pre class="wp-block-code"><code>    sudo update-grub
    sudo reboot</code></pre>



<p class="wp-block-paragraph"><strong>3. 验证配置</strong></p>



<p class="wp-block-paragraph">    检查当前调控器</p>



<pre class="wp-block-code"><code>cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor</code></pre>



<p class="wp-block-paragraph">    应输出 <code><mark style="background-color:#e5e5e5" class="has-inline-color">powersave</mark></code>。</p>



<p class="wp-block-paragraph">    确认驱动和模式：</p>



<pre class="wp-block-code"><code>cpupower frequency-info</code></pre>



<p class="wp-block-paragraph">    输出应显示 <mark style="background-color:#e5e5e5" class="has-inline-color">driver: intel_pstate</mark> 和 <mark style="background-color:#e5e5e5" class="has-inline-color">The governor &#8220;powersave&#8221; may decide which speed to use</mark>.</p>



<p class="wp-block-paragraph"><strong>4. 可选：禁用冲突服务</strong></p>



<p class="wp-block-paragraph">    如果系统安装了 <code><mark style="background-color:#e5e5e5" class="has-inline-color">cpufrequtils</mark></code> 或类似工具，可能需修改其配置或禁用：</p>



<pre class="wp-block-code"><code>sudo systemctl disable cpufrequtils</code></pre>



<p class="wp-block-paragraph"><strong>注意事项</strong></p>



<p class="wp-block-paragraph">性能权衡：powersave 模式会优先降低功耗，可能轻微影响 CPU 性能。<br>硬件兼容性：仅适用于 Intel 支持 intel_pstate 的 CPU（通常是 Sandy Bridge 及更新的架构）。<br>备用方法：如果 intel_pstate 未启用，可尝试使用 acpi-cpufreq 驱动的 ondemand 或 schedutil 调控器</p>



<p class="wp-block-paragraph"></p>

