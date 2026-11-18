# TrashVPN 官网

TrashVPN（垃圾VPN）的静态产品门户，介绍免费客户端、每周更新节点及服务使用说明。站点采用纯 HTML、CSS 与 JavaScript，无需构建，支持中文、English 与 فارسی（RTL），可直接部署于 GitHub Pages。

## 目录结构

- `index.html`：产品主页（旋转的网络地球、功能亮点、平台入口、使用说明、常见问题）
- `download.html`：客户端下载页与平台隐私、开源文档入口
- `help.html`：帮助中心，支持文章深链接
- `policy.html`、`donate.html`：网站政策与自愿捐赠
- `css/styles.css`：全局样式、响应式、动画与组件样式
- `js/common.js`：响应式导航、语言切换、页脚与滚动动画
- `js/main.js`：主页文案、三语翻译与设备下载识别
- `js/download.js`：下载页文案与平台说明
- `js/globe.js`：地球自转、数据中心与连线动画
- `assests/`：品牌图标、地球静态预览与 SVG 图标集（保留原目录拼写）
- `CNAME`：Cloudflare 自定义域名占位

## 本地预览

> 纯静态站点，可使用任意静态服务器或 VS Code Live Server 预览。以下以 `npx serve` 为例：

```bash
npm install -g serve
serve .
```

在浏览器打开终端输出的本地地址，即可查看动画与响应式效果。

## 部署到 GitHub Pages

1. 将代码推送至 GitHub 仓库 `FuckGFWall/FuckGFWall.github.io`。
2. 在仓库设置（Settings）→ Pages 中，Source 选择 `Deploy from a branch`。
3. Branch 选择 `main`（或默认分支），目录选 `/ (root)`。
4. 保存后等待 GitHub Pages 构建完成，访问 `https://fuckgfwall.github.io/` 验证。

### 使用 Cloudflare 绑定自定义域名

1. 在 Cloudflare 控制台添加目标域名并开启代理。
2. DNS 中新增 CNAME 记录指向 `fuckgfwall.github.io`。
3. 将本项目根目录 `CNAME` 文件改为实际域名（单行），提交并推送。
4. 待 DNS 生效后，通过 Cloudflare Page Rules/SSL 设置完成 HTTPS。

## 自定义说明

- 主页结构在 `index.html` 中维护，三语文案在 `js/main.js` 的 `COPY` 中维护。
- 地球陆地采样来自公共领域的 [Natural Earth 1:110m Land v5.1.2](https://github.com/nvkelso/natural-earth-vector/blob/v5.1.2/geojson/ne_110m_land.geojson)。数据中心和连线用于示意。
- 下载链接位于 `download.html` 及 `js/main.js` 的 `DOWNLOAD_LINKS`，更新版本时需同步修改。
- 帮助文章在 `js/help.js` 中维护；页脚与社交链接位于 `js/common.js`。
- 若需调整动画、配色或断点，可统一修改 `css/styles.css`。

## 许可

项目采用公共许可证（可自行替换），欢迎在保留“TrashVPN”定位的前提下二次开发。
