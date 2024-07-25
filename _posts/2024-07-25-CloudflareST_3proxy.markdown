---
layout:     post
title:      "一键优选ip并用本地服务器代理cloudflare CDN网站"
subtitle:   "\"\""
date:       2024-07-25
author:     "Leo"
header-img: "img/in post img/2024-07-25-CloudflareST_3proxy/title.png"
catalog: true
tags:
---


# 视频链接  [视频教程](https://www.youtube.com/watch?v=wJfDWZFUo1c)
项目地址：*[https://github.com/FuckGFWall/CloudflareST_3proxy/releases](https://github.com/FuckGFWall/CloudflareST_3proxy/releases)*  
Proxy SwitchyOmega浏览器拓展：  
edge：*[https://microsoftedge.microsoft.com/addons/detail/proxy-switchyomega/fdbloeknjpnloaggplaobopplkdhnikc](https://microsoftedge.microsoft.com/addons/detail/proxy-switchyomega/fdbloeknjpnloaggplaobopplkdhnikc )*  
chrome：*[https://chromewebstore.google.com/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif](https://chromewebstore.google.com/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif)*    
# 软件安装
下载并解压：*[https://github.com/FuckGFWall/CloudflareST_3proxy/releases](https://github.com/FuckGFWall/CloudflareST_3proxy/releases)*  
![1.jpg](/img/in post img/2024-07-25-CloudflareST_3proxy/1.jpg)  
运行**cfst_3proxy.bat**，脚本会先优选ip，再自动替换代理服务器的ip  
![2.jpg](/img/in post img/2024-07-25-CloudflareST_3proxy/2.jpg)  
打开**3proxy**文件夹，双击**安装服务.bat**  
在弹出的提示中选**yes**  
![3.jpg](/img/in post img/2024-07-25-CloudflareST_3proxy/3.jpg)  
使用方法:  
- 停止服务：不要去任务管理器结束任务，双击**停止.bat**  
- 启动服务：双击**启动服务.bat**  
- 卸载服务：先确保服务正在运行再双击**卸载服务.bat**（否则会报错）， 最后删掉文件夹  
如果报错，请重启电脑  
# 拓展安装与设置
Proxy SwitchyOmega浏览器拓展：  
edge：*[https://microsoftedge.microsoft.com/addons/detail/proxy-switchyomega/fdbloeknjpnloaggplaobopplkdhnikc](https://microsoftedge.microsoft.com/addons/detail/proxy-switchyomega/fdbloeknjpnloaggplaobopplkdhnikc )*  
chrome：*[https://chromewebstore.google.com/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif](https://chromewebstore.google.com/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif)*    
拓展设置：  
1. 点左侧**proxy**  
2. server改为**127.0.0.1**，port改为**2088**  
3. 点左下角**apply changes**  
![4.jpg](/img/in post img/2024-07-25-CloudflareST_3proxy/4.jpg)  
开启代理：点击拓展图标，选**proxy**
![5.jpg](/img/in post img/2024-07-25-CloudflareST_3proxy/5.jpg)  
关闭代理：点击拓展图标，选**system proxy**
![6.jpg](/img/in post img/2024-07-25-CloudflareST_3proxy/6.jpg)  
