---
layout:     post
title:      "用参数自定义优选cloudflare官方IP"
subtitle:   "\"\""
date:       2024-07-25
author:     "Leo"
header-img: "img/in post img/2024-08-06-CloudflareST/title.png"
catalog: true
tags:
---


# 链接
## 项目地址：
**<a href="https://github.com/XIU2/CloudflareSpeedTest/releases" target="_blank">https://github.com/XIU2/CloudflareSpeedTest/releases</a>**    
## 参数：  
    -cfcolo HKG,SJC,SFO,NRT,DEL,BLR,TPE,KHH,ICN,SIN,LHR,AMS  
        匹配指定地区，会强制切换为 HTTPing模式（因为要访问网页获得地址信息）；地区名为机场3字码，英文逗号分隔，支持小写，支持 Cloudflare、AWS CloudFront ；(默认 所有地区)  
    -tp 8080  
        指定测速端口；延迟测速/下载测速时使用的端口；(默认 443 端口)    
    -p 10  
        显示结果数量；测速后直接显示指定数量的结果，为 0 时不显示结果直接退出；(默认 10 个)  
    -f ip.txt  
        指定优选的IP段数据文件；如路径含有空格请加上引号；支持其他 CDN IP段；(默认 ip.txt，只含ipv4)  
    -f ipv6.txt  
        优选ipv6  
    -dd  
        禁用下载测速；禁用后结果会按延迟排序 (默认按下载速度排序)；(默认 启用)  
    -n 200  
        延迟测试线程；越多延迟测试越快，性能弱的设备 (如路由器) 请勿太高；(默认 200 最多 1000)  
    -t 4  
        延迟测速次数；单个 IP 延迟测试的次数；(默认 4 次)  
    -dn 10  
        下载测速数量；延迟测速并排序后，从最低延迟起下载测速的数量；(默认 10 个)  
    -dt 10  
        下载测速时间；单个 IP 下载测速最长时间，不能太短；(默认 10 秒)  
    -url https://cf.xiu2.xyz/url  
        指定测速地址；HTTPing模式延迟测试/所有下载测速时使用的地址，默认地址不保证可用性，建议自建  
    -httping  
        切换测速模式；延迟测试模式改为 HTTPing，所用测试地址为 [-url] 参数；(默认 TCPing)  
        注意：HTTPing 本质上也算一种网络扫描行为，因此如果你在服务器上面运行，需要降低并发(-n)，否则可能会被一些严格的商家暂停服务  
        如果你遇到 HTTPing模式 首次测速可用 IP 数量正常，后续测速越来越低甚至直接为0，但停一段时间后又恢复了的情况，那么可能是被运营商、Cloudflare CDN 认为你在网络扫描而触发临时限制机制，过一会儿就恢复了，建议降低并发(-n)减少这种情况的发生  
    -httping-code 200  
        有效状态代码；HTTPing 延迟测速时网页返回的有效 HTTP 状态码，仅限一个；(默认 200 301 302)  
    -tl 200  
        平均延迟上限；只输出低于指定平均延迟的 IP；(默认 9999 ms)  
    -tll 40  
        平均延迟下限；只输出高于指定平均延迟的 IP；(默认 0 ms)  
    -tlr 0.2  
        丢包几率上限；只输出低于/等于指定丢包率的 IP，范围 0.00~1.00，0 过滤掉任何丢包的 IP；(默认 1.00)  
    -sl 5  
        下载速度下限；只输出高于指定下载速度的 IP，凑够指定数量 [-dn] 才会停止测速；(默认 0.00 MB/s)  
    -ip 1.1.1.1,2.2.2.2/24,2606:4700::/32  
        指定IP段数据；直接通过参数指定要测速的 IP 段数据，英文逗号分隔；(默认 空)  
    -o result.csv  
        写入结果文件；如路径含有空格请加上引号；值为空时不写入文件 [-o ""]；(默认 result.csv)  
    -allip  
        测速全部的IPv4数据段；不能测速全部IPv6数据段，因为其数量是以亿为单位的，而且其中只有一小部分是正在使用的，全部测速猴年马月才能测完？(默认 每个 /24 段随机测速一个IP)  
    -v  
        打印程序版本 + 检查版本更新  
    -h  
        打印帮助说明  
  
## 机场3字码：  
所有cloudflare机场3字码：**<a href="https://www.cloudflarestatus.com" target="_blank">https://www.cloudflarestatus.com</a>**   
浏览器中按**ctrl+f**可查找页面内容，搜索需要的国家即可       
常用：  
- 美国：SJC,SFO
- 日本：NRT
- 香港：HKG
- 印度：DEL,BLR
- 台湾：TPE,KHH
- 韩国：ICN
- 新加坡：SIN
- 英国：LHR
- 荷兰：AMS

--- 

# 项目地址：
**<a href="https://github.com/XIU2/CloudflareSpeedTest/releases" target="_blank">https://github.com/XIU2/CloudflareSpeedTest/releases</a>**         
选**CloudflareST_windows_amd64**下载并解压    
# 直接优选：   
双击运行**CloudflareST.exe**,会先进行延时测试，再从延时最低的10个IP进行下载测速，最后按下载速度排序来输出   
# 带参数优选：    
cmd：   
1.进入文件夹：法一：在文件夹地址栏输入cmd，回车  
法二：在cmd输入**cd 文件夹地址**（如cd C:/user/download/CloudflareST_windows_amd64)，地址不要加引号   
2.输入**CloudflareST.exe+空格+参数**（如CloudflareST.exe -tp 8080），多个参数间用空格隔开（如CloudflareST.exe -tp 8080 -dd）  
powershell：   
1.进入文件夹：法一：在文件夹空白处右键，选在此处运行终端  
法二：在powershell同样输入**cd 文件夹地址**   
2.输入**./CloudflareST.exe+空格+参数**，即把cmd中的**Cloudflare.exe**前面加上**./**，其它一样  
**[参数见：链接-参数](https://fuckgfwall.github.io/2024/07/25/CloudflareST/#%E5%8F%82%E6%95%B0)**   
**[指定地区优选中用到的机场3字码见：链接-机场3字码](https://fuckgfwall.github.io/2024/07/25/CloudflareST/#%E6%9C%BA%E5%9C%BA3%E5%AD%97%E7%A0%81)**  


