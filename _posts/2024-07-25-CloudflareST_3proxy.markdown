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



<iframe width="560" height="315" src="https://www.youtube.com/embed/i1LNGHy9uzU?si=3MD9WlPT6ClhERq1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>  

# 链接  
项目地址：*<a href="https://github.com/FuckGFWall/CloudflareST_3proxy/releases" target="_blank">https://github.com/FuckGFWall/CloudflareST_3proxy/releases</a>*  
Proxy SwitchyOmega浏览器拓展：  
edge：*[https://microsoftedge.microsoft.com/addons/detail/proxy-switchyomega/fdbloeknjpnloaggplaobopplkdhnikc](https://microsoftedge.microsoft.com/addons/detail/proxy-switchyomega/fdbloeknjpnloaggplaobopplkdhnikc )*  
chrome：*[https://chromewebstore.google.com/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif](https://chromewebstore.google.com/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif)*    

---

# 软件安装
下载并解压：*[https://github.com/FuckGFWall/CloudflareST_3proxy/releases](https://github.com/FuckGFWall/CloudflareST_3proxy/releases)*  
![1.jpg](/img/in post img/2024-07-25-CloudflareST_3proxy/1.jpg)  
运行**cfst_3proxy.bat**，脚本会先优选ip，再自动替换代理服务器的ip  
![2.jpg](/img/in post img/2024-07-25-CloudflareST_3proxy/2.jpg)  
出现**完成**即说明替换成功，且隔段时间就要再次运行脚本进行优选，以确保使用的是最快的ip   
   
软件使用：  
- 安装服务：打开**3proxy**文件夹，双击**安装服务.bat**  
在弹出的提示中选**yes**  
![3.jpg](/img/in post img/2024-07-25-CloudflareST_3proxy/3.jpg)   
- 停止服务：不要去任务管理器结束任务，双击**停止.bat**（否则会报错）     
- 启动服务：双击**启动服务.bat**，且软件会开机自启动，重启电脑后不用再启动一次了  
![7.jpg](/img/in post img/2024-07-25-CloudflareST_3proxy/7.jpg)  
出现**3proxy.exe**即说明启动成功  
- 卸载服务：先确保服务正在运行再双击**卸载服务.bat**（否则会报错）， 最后删掉文件夹  
- 如果报错，请重启电脑  
# 拓展安装与设置
先确保3proxy已正常运行   
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
# 注意   
1.只能代理托管到cloudflare的网站，不能访问其它外网. 所以使用后要及时关掉  
2.默认开启国内外分流，国内网站会直连  
3.直接修改3proxy.cfg后要重启服务（双击**重启.bat**）才能应用   
   

