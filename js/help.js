import "./common.js";
import { detectLocale, setDocumentMeta } from "./i18n.js";

const UPDATED = "2026-05-23";
const ARTICLES = {
  zh: {
    meta: {
      title: "帮助中心 | TrashVPN",
      description: "TrashVPN 帮助中心：了解软件、节点地区、账户限额、安全提醒与免责声明。",
    },
    hero: {
      title: "帮助中心",
      note: "了解 TrashVPN 的工作方式、可用性说明和使用安全提示。",
      aria: "文章列表",
      updated: "最后更新：",
    },
    articles: [
      {
        id: "about-trashvpn",
        title: "关于 TrashVPN",
        html: `
          <p>TrashVPN 是一个由个人开发者开发和维护的免费 VPN / 网络代理软件。项目最初只是为了让自己在需要查资料、访问开发文档、测试海外服务时有一个低成本工具，后来才逐步整理成 Windows 和 Android 客户端，并把下载入口、说明文档和服务状态页面放到网站上。</p>
          <p>在开发过程中，开发者使用了 Codex 辅助编写、调整与检查部分代码和网页内容。也就是说，Codex 参与了很多重复性工作，例如整理页面结构、补全文案、检查脚本语法、优化响应式布局等；但产品的设计取舍、发布、运营、服务器维护和最终责任仍由开发者本人承担。</p>
          <p>目前 TrashVPN 只支持 <strong>Windows</strong> 和 <strong>Android</strong> 客户端。iOS 和 macOS 入口在下载页面中仅作为占位展示，暂时没有正式版本。你可以在下载页面获取现有安装包，也可以查看对应客户端的隐私政策和开源许可证说明。</p>
          <p>TrashVPN 当前免费提供使用，核心原因不是商业补贴，而是运营成本被压得很低：客户端逻辑尽量简单，节点自动同步，网站也是静态部署，日常维护主要集中在少量后端接口和可用节点上。只要成本仍然可控，软件就会尽量保持免费。</p>
          <p>不过，“免费”不代表“无限承诺”。节点可用性会受 Cloudflare 路由、账户限额、运营商线路、地区网络环境和目标网站规则影响。如果未来节点被大规模封锁，或免费资源无法继续支撑使用量，项目可能会调整策略，例如减少可用节点、暂停服务，或提供额外的付费节点。相关变化会尽量在网站或客户端中提前说明。</p>
          <p>TrashVPN 的定位更接近一个轻量、透明、低成本的网络访问工具，而不是企业级隐私产品或商业加速器。使用前请先了解它的限制：节点地区可能变化，速度不保证稳定，不适合传输敏感信息，也不应该被用于违法、攻击、欺诈或滥用网络资源的行为。</p>
        `,
      },
      {
        id: "country-availability",
        title: "为什么可提供的国家这么少",
        html: `
          <p>TrashVPN 的连接会涉及 Cloudflare 网络。很多人看到“节点国家”时会以为它和传统 VPS 一样：服务器买在哪个国家，出口就固定显示哪个国家。但 Cloudflare 的路由方式并不完全是这样。同一个节点，在不同运营商、不同城市、不同时间段，甚至同一地区的不同宽带线路下，都可能被 Cloudflare 分配到不同的数据中心。</p>
          <p>Cloudflare 会综合判断用户的物理距离、附近数据中心数量、各地区服务器当前负载、线路质量以及自身调度策略，然后决定你的连接最终从哪里进入它的网络。这个过程基本由 Cloudflare 控制，TrashVPN 无法稳定指定外层 IP 一定显示为某个国家。</p>
          <p>这也是为什么可选择国家看起来比较少：如果强行把外层国家写成很多选项，实际体验可能会变成“显示美国，访问时却像新加坡”“显示日本，测速却走香港”。与其做一个看起来很丰富但不可靠的列表，不如把实际能稳定解释的内容写清楚。</p>
          <p>除了外层 IP，连接中还有一层可配置的内层 IP，也就是 <strong>proxy IP</strong>。当前 proxy IP 会从香港、新加坡、日本、美国这四个地区随机分配给用户。访问使用 Cloudflare CDN 的网站时，流量通常更容易体现为 proxy IP；访问其它网站时，则通常更容易体现为外层 IP 的路由结果。</p>
          <p>这会导致一些看起来矛盾的现象：测速网站显示一个地区，社交网站判断成另一个地区，搜索引擎又要求额外验证。这不一定代表软件出错，而是多层网络、CDN、代理 IP、目标网站风控共同作用的结果。</p>
          <div class="help-callout">因此，软件内显示的国家更多是一种连接参考，而不是绝对承诺。选择节点时建议优先看延迟、可用性和你要访问的网站是否正常，而不是只看国家名称。</div>
        `,
      },
      {
        id: "usage-limit",
        title: "会有限额吗",
        html: `
          <p>会。TrashVPN 依赖的部分资源存在 Cloudflare 账户级限额，限额会在每天<strong>北京时间早上 8 点</strong>重置。当某个账户达到限额后，关联到该账户的节点可能会暂时不可用，直到限额重置或客户端重新获取到其它可用节点。</p>
          <p>需要注意的是，一个账户可能会被分配给多位用户共同使用。因此，出现限额并不一定说明是你个人使用过多，也可能是同一账户下其它用户共同消耗造成的。免费服务为了降低成本，不会为每个用户单独准备完整独占资源。</p>
          <p>客户端会每小时获取一次账户使用量信息。当某个账户接近限额时，客户端会尝试重新同步最新节点，尽可能切换到仍然可用的资源。这个过程不是实时计费系统，也不是精确到个人的流量统计，只是用于提高免费节点整体可用性的调度参考。</p>
          <p>如果你发现某个节点突然连接失败、速度显著下降或网页打不开，可以先等待一段时间，或手动重新获取节点。很多时候问题来自账户限额、线路拥堵、Cloudflare 调度变化或目标网站风控，而不是客户端本身损坏。</p>
          <p>你也可以前往<a href="status.html">状态页面</a>查看整体负载的大致分布。状态页显示的是账户请求量范围的统计和平均请求量，用来帮助判断当前服务是否整体繁忙；它不是单个设备、单个 IP 或单个用户的精确账单。</p>
          <p>如果你需要长时间、高稳定性或可预测的专用线路，TrashVPN 当前的免费节点可能并不适合。它更适合临时查资料、轻量访问、测试连接可用性等场景。</p>
        `,
      },
      {
        id: "never-request",
        title: "我们不会要求你做的事",
        html: `
          <p>为了避免仿冒站点、钓鱼页面或诈骗信息，请记住：TrashVPN 不会通过网页、聊天、邮件或下载页面要求你完成与软件功能无关的操作。如果有人声称自己是官方人员，并要求你绕过官网下载、付款或提交敏感信息，请优先将其视为风险。</p>
          <ul>
            <li>不会以“开通服务”“解除限制”“续费”“会员升级”“解锁高速节点”等理由向你收取费用或要求转账。</li>
            <li>不会要求你提交银行卡信息、支付密码、身份证件、短信验证码、邮箱密码、社交账号密码或账户恢复代码。</li>
            <li>不会要求你下载与 TrashVPN 无关的清理工具、破解工具、远程控制软件、浏览器插件或来源不明的证书配置。</li>
            <li>不会私下提供所谓“特殊节点”“内部版本”“免验证版本”，也不会要求你从不明网盘、短链接或第三方聊天文件中下载安装包。</li>
            <li>不会要求你关闭所有安全软件、长期信任未知证书，或把系统代理、DNS、路由器管理密码交给陌生人。</li>
          </ul>
          <p>如果浏览器、系统或安全软件提示风险，请先停止安装，核对下载来源、文件名、域名和校验信息。Windows 版本目前可能因为没有商业代码签名而出现“未知发布者”提示，但这并不意味着任何来源的安装包都可以信任。</p>
          <p>推荐只从官网和官方下载域名获取客户端。对于 Android APK，安装前请确认包名、签名来源和页面地址；对于 Windows MSI，请尽量保存下载来源并在需要时计算 SHA-256 校验值。</p>
          <div class="help-callout help-callout--warning">如果某个页面或联系人提出以上要求，请停止操作，不要提供敏感信息，不要运行未知文件，并尽量回到官网重新获取下载入口。</div>
        `,
      },
      {
        id: "disclaimer",
        title: "免责声明",
        html: `
          <p>TrashVPN 旨在提供网络连接工具与相关信息，帮助用户在合法合规的前提下访问所需网络资源。用户应自行了解并遵守所在国家或地区适用的法律法规、网络服务条款、平台规则以及组织内部网络使用政策。</p>
          <p>请勿将本软件用于违法活动、攻击行为、诈骗、垃圾信息发送、绕过平台风控进行滥用、侵犯他人合法权益，或任何可能损害网络服务、第三方网站、其他用户和公共资源的行为。因用户使用方式导致的后果，应由用户自行承担。</p>
          <p>网络连接速度、节点可用性、出口地区、延迟、目标网站访问效果和账号风险提示，均可能受到运营商线路、Cloudflare 路由策略、节点负载、账户限额、目标网站规则以及本地设备环境影响。TrashVPN 无法保证服务始终可用，也无法保证始终达到某一速度或固定显示某个地区。</p>
          <p>由于项目以低成本方式运营，服务可能会出现维护、临时中断、节点失效、地区变化或接口调整。开发者会尽量修复明显问题，但不承诺提供企业级 SLA、专线质量、专属客服或持续不断的可用资源。</p>
          <p>在下载和安装客户端前，请确认来源为官网公布的下载入口，并自行评估系统警告与安全风险。客户端下载页面提供 Android / iOS 隐私政策与开源许可证入口；网站本身的 Cookie、隐私和服务条款可从页脚的网站政策入口查看。</p>
          <p>继续使用 TrashVPN，即表示你理解免费服务的限制，并同意自行承担因网络环境、平台规则、第三方服务变化或个人使用行为带来的风险。</p>
          <p class="help-article__updated">最后更新：${UPDATED}</p>
        `,
      },
    ],
  },
  en: {
    meta: {
      title: "Help Center | TrashVPN",
      description: "TrashVPN Help Center: learn about the app, available regions, quotas, safety notes, and disclaimers.",
    },
    hero: {
      title: "Help Center",
      note: "Learn how TrashVPN works, what its limitations are, and how to use it more safely.",
      aria: "Article list",
      updated: "Last updated: ",
    },
    articles: [
      {
        id: "about-trashvpn",
        title: "About TrashVPN",
        html: `
          <p>TrashVPN is a free VPN / network proxy app developed and maintained by an independent developer. It started as a low-cost tool for personal needs such as reading technical documentation, checking overseas services, and testing network access. Over time, it was packaged into Windows and Android clients, with a website for downloads, help articles, and service status.</p>
          <p>During development, Codex was used to assist with writing, adjusting, and checking parts of the code and website content. Codex helped with repetitive work such as page structure, copy drafts, syntax checks, and responsive layout improvements. Product decisions, operations, releases, server maintenance, and final responsibility still remain with the developer.</p>
          <p>TrashVPN currently supports <strong>Windows</strong> and <strong>Android</strong>. The iOS and macOS entries on the download page are placeholders only and do not represent released clients. You can download the available installers from the download page and review the privacy policy and open-source license notices for each platform there.</p>
          <p>The service is currently free mainly because operating costs are kept very low. The client is intentionally lightweight, node synchronization is automated, and the website is statically hosted. Most maintenance work is limited to a small backend and available node resources. As long as this remains manageable, the service will try to stay free.</p>
          <p>However, “free” does not mean unlimited guarantees. Availability can be affected by Cloudflare routing, account quotas, ISP lines, regional network conditions, and rules applied by target websites. If resources become too expensive or nodes are widely blocked, the project may reduce available nodes, pause service, or introduce optional paid resources. Any major changes will be announced through the website or app when possible.</p>
          <p>TrashVPN should be understood as a lightweight, transparent, low-cost access tool rather than an enterprise privacy product or commercial accelerator. Before using it, please understand the limits: regions may change, speed is not guaranteed, sensitive information should not be transmitted through it, and it must not be used for illegal activity, attacks, fraud, or abuse of network resources.</p>
        `,
      },
      {
        id: "country-availability",
        title: "Why are there so few countries available?",
        html: `
          <p>TrashVPN connections involve the Cloudflare network. Many users expect a “node country” to behave like a traditional VPS: if the server is purchased in one country, the exit location should always appear there. Cloudflare routing is different. The same node may be routed to different data centers depending on ISP, city, time of day, and even different broadband lines in the same region.</p>
          <p>Cloudflare considers physical distance, nearby data center capacity, current server load, line quality, and its own scheduling strategy before deciding where a connection enters its network. This process is mostly controlled by Cloudflare, so TrashVPN cannot reliably force the outer IP to appear in a specific country.</p>
          <p>This is why the country list is intentionally small. If the app displayed many countries that could not be reliably delivered, users might see “United States” in the app while traffic behaves like Singapore, or select “Japan” while tests show Hong Kong. A smaller, more honest explanation is better than a large but misleading list.</p>
          <p>In addition to the outer IP, there is also a configurable inner IP layer, the <strong>proxy IP</strong>. At present, proxy IPs are randomly assigned from Hong Kong, Singapore, Japan, and the United States. When visiting websites that use Cloudflare CDN, traffic is more likely to reflect the proxy IP; when visiting other websites, the result is more likely to reflect the outer IP routing.</p>
          <p>This can create confusing results: a speed test may show one region, a social app may identify another, and a search engine may request additional verification. That does not always mean the client is broken. It is often the result of multiple network layers, CDN behavior, proxy IPs, and target-site risk systems working together.</p>
          <div class="help-callout">For this reason, the country shown in the app is a practical reference, not an absolute promise. When choosing a node, focus on latency, availability, and whether the sites you need actually work.</div>
        `,
      },
      {
        id: "usage-limit",
        title: "Are there usage limits?",
        html: `
          <p>Yes. Some resources used by TrashVPN are subject to Cloudflare account-level quotas, which reset every day at <strong>08:00 Beijing time</strong>. When an account reaches its quota, nodes associated with that account may become temporarily unavailable until the quota resets or the client obtains other available nodes.</p>
          <p>One account may be shared by multiple users. Therefore, hitting a limit does not necessarily mean you personally used too much traffic. It may be the combined result of other users assigned to the same account. To keep the service free and low-cost, each user does not receive a fully dedicated resource pool.</p>
          <p>The client checks account usage information about once every hour. When an account is close to its limit, the client will try to sync fresh nodes and switch to resources that are still available. This is not a real-time billing system and not a precise personal traffic counter; it is a scheduling reference used to improve the overall availability of free nodes.</p>
          <p>If a node suddenly fails, becomes slow, or cannot open websites, you can wait for a while or manually refresh the node list. In many cases, the cause is account quota, line congestion, Cloudflare scheduling changes, or target-site risk controls rather than a damaged client.</p>
          <p>You can also visit the <a href="status.html">status page</a> to view the approximate overall load distribution. The status page shows account request ranges and average request volume. It is intended to help judge whether the service is generally busy; it is not an exact bill for one device, one IP, or one user.</p>
          <p>If you need long-term, highly stable, predictable dedicated connectivity, the current free nodes may not be the right fit. TrashVPN is better suited for temporary research, lightweight access, and testing whether a route is available.</p>
        `,
      },
      {
        id: "never-request",
        title: "Things we will never ask you to do",
        html: `
          <p>To avoid imitation websites, phishing pages, and scams, remember that TrashVPN will not ask you through a web page, chat, email, or download page to perform actions unrelated to the app. If someone claims to be official support and asks you to bypass the website, pay money, or submit sensitive information, treat it as risky.</p>
          <ul>
            <li>We will not charge you for “activation,” “unblocking,” “renewal,” “membership upgrades,” or “high-speed nodes.”</li>
            <li>We will not ask for bank card information, payment passwords, identity documents, SMS codes, email passwords, social-account passwords, or recovery codes.</li>
            <li>We will not ask you to install unrelated cleaners, cracking tools, remote-control software, browser extensions, or unknown certificate profiles.</li>
            <li>We will not privately provide “special nodes,” “internal builds,” or “verification-free versions,” and we will not ask you to install files from unknown cloud drives, short links, or chat attachments.</li>
            <li>We will not ask you to disable all security software, permanently trust unknown certificates, or hand over system proxy, DNS, or router administration credentials.</li>
          </ul>
          <p>If your browser, operating system, or security software shows a warning, stop first and verify the download source, file name, domain, and checksum information. The current Windows build may show an “unknown publisher” warning because it is not commercially code-signed, but that does not mean installers from any source should be trusted.</p>
          <p>Only download clients from the official website and official download domain. For Android APKs, check the package source and page address before installation; for Windows MSI files, keep the download source and calculate SHA-256 checksums when needed.</p>
          <div class="help-callout help-callout--warning">If a page or contact asks for any of the actions above, stop immediately, do not provide sensitive information, do not run unknown files, and return to the official website for the download link.</div>
        `,
      },
      {
        id: "disclaimer",
        title: "Disclaimer",
        html: `
          <p>TrashVPN is intended to provide a network connection tool and related information for lawful use. Users are responsible for understanding and following the laws and regulations of their country or region, network service terms, platform rules, and any internal network policies that apply to them.</p>
          <p>Do not use this software for illegal activity, attacks, fraud, spam, platform abuse, infringement of others’ rights, or any behavior that may harm network services, third-party websites, other users, or public resources. Consequences caused by how the software is used are the user’s own responsibility.</p>
          <p>Connection speed, node availability, exit region, latency, target-site behavior, and account risk prompts may be affected by ISP routes, Cloudflare routing policy, node load, account quotas, target-site rules, and local device conditions. TrashVPN cannot guarantee that the service will always be available, always reach a certain speed, or always display a fixed region.</p>
          <p>Because the project is operated at low cost, maintenance, temporary interruptions, node failures, region changes, and API adjustments may occur. The developer will try to fix obvious issues, but does not promise enterprise-level SLA, dedicated line quality, dedicated support, or continuously available resources.</p>
          <p>Before downloading and installing a client, confirm that the source is an official download entry and evaluate system warnings and security risks yourself. Android / iOS privacy policy and open-source license links are available below the client cards on the download page; website cookie, privacy, and service terms are available from the footer policy links.</p>
          <p>By continuing to use TrashVPN, you acknowledge the limitations of a free service and agree to bear risks caused by network conditions, platform rules, third-party service changes, or your own usage behavior.</p>
          <p class="help-article__updated">Last updated: ${UPDATED}</p>
        `,
      },
    ],
  },
  fa: {
    meta: {
      title: "مرکز راهنما | TrashVPN",
      description: "مرکز راهنمای TrashVPN: درباره نرم‌افزار، کشورها، محدودیت مصرف، نکات امنیتی و سلب مسئولیت بخوانید.",
    },
    hero: {
      title: "مرکز راهنما",
      note: "با روش کار TrashVPN، محدودیت‌ها و نکات استفاده امن‌تر آشنا شوید.",
      aria: "فهرست مقاله‌ها",
      updated: "آخرین به‌روزرسانی: ",
    },
    articles: [
      {
        id: "about-trashvpn",
        title: "درباره TrashVPN",
        html: `
          <p>TrashVPN یک برنامه رایگان VPN / پراکسی شبکه است که توسط یک توسعه‌دهنده مستقل ساخته و نگهداری می‌شود. این پروژه در ابتدا فقط یک ابزار کم‌هزینه برای نیازهای شخصی بود؛ مثل خواندن مستندات فنی، بررسی سرویس‌های خارج از کشور و آزمایش دسترسی شبکه. بعداً به‌تدریج به کلاینت‌های Windows و Android و یک وب‌سایت برای دانلود، راهنما و وضعیت سرویس تبدیل شد.</p>
          <p>در روند توسعه، از Codex برای کمک به نوشتن، تنظیم و بررسی بخشی از کدها و متن‌های وب‌سایت استفاده شده است. Codex در کارهای تکراری مانند ساختار صفحه، پیش‌نویس متن، بررسی خطای اسکریپت و بهبود نمایش واکنش‌گرا کمک کرده؛ اما تصمیم‌های محصول، انتشار، 운영، نگهداری سرور و مسئولیت نهایی همچنان بر عهده توسعه‌دهنده است.</p>
          <p>در حال حاضر TrashVPN فقط از <strong>Windows</strong> و <strong>Android</strong> پشتیبانی می‌کند. گزینه‌های iOS و macOS در صفحه دانلود فعلاً فقط جایگاه نمایشی هستند و نسخه رسمی منتشرشده محسوب نمی‌شوند. برای دریافت نسخه‌های موجود و مشاهده سیاست حریم خصوصی و مجوزهای متن‌باز هر پلتفرم، به صفحه دانلود مراجعه کنید.</p>
          <p>رایگان بودن سرویس به دلیل حمایت تجاری بزرگ نیست، بلکه به این دلیل است که هزینه اجرا بسیار پایین نگه داشته شده است. کلاینت سبک طراحی شده، همگام‌سازی نودها خودکار است و وب‌سایت به‌صورت ایستا میزبانی می‌شود. نگهداری روزمره بیشتر به چند رابط backend و منابع نود محدود می‌شود. تا زمانی که این هزینه‌ها قابل کنترل باشند، سرویس تلاش می‌کند رایگان بماند.</p>
          <p>با این حال «رایگان» به معنی تضمین نامحدود نیست. در دسترس بودن نودها ممکن است تحت تأثیر مسیریابی Cloudflare، محدودیت حساب، خطوط ارائه‌دهنده اینترنت، شرایط شبکه منطقه‌ای و قوانین وب‌سایت مقصد قرار بگیرد. اگر منابع بسیار گران شوند یا نودها به‌طور گسترده مسدود شوند، پروژه ممکن است تعداد نودها را کاهش دهد، سرویس را موقتاً متوقف کند یا منابع پولی اختیاری ارائه دهد.</p>
          <p>TrashVPN را بهتر است یک ابزار سبک، شفاف و کم‌هزینه برای دسترسی شبکه بدانید، نه یک محصول حریم خصوصی سازمانی یا شتاب‌دهنده تجاری. قبل از استفاده، محدودیت‌ها را درک کنید: کشورها ممکن است تغییر کنند، سرعت تضمین نمی‌شود، برای اطلاعات حساس مناسب نیست و نباید برای فعالیت غیرقانونی، حمله، کلاهبرداری یا سوءاستفاده از منابع شبکه استفاده شود.</p>
        `,
      },
      {
        id: "country-availability",
        title: "چرا کشورهای قابل انتخاب کم هستند؟",
        html: `
          <p>اتصال‌های TrashVPN با شبکه Cloudflare درگیر هستند. بسیاری از کاربران تصور می‌کنند «کشور نود» مثل یک VPS سنتی عمل می‌کند: اگر سرور در یک کشور خریداری شده باشد، خروجی همیشه همان کشور را نشان می‌دهد. اما مسیریابی Cloudflare متفاوت است. یک نود واحد ممکن است بسته به اپراتور اینترنت، شهر، زمان روز و حتی خط اینترنت متفاوت در همان منطقه، به مراکز داده مختلف هدایت شود.</p>
          <p>Cloudflare فاصله فیزیکی، ظرفیت مراکز داده نزدیک، بار فعلی سرورها، کیفیت مسیر و سیاست زمان‌بندی خودش را بررسی می‌کند و سپس تصمیم می‌گیرد اتصال از کجا وارد شبکه شود. این فرایند عمدتاً تحت کنترل Cloudflare است؛ بنابراین TrashVPN نمی‌تواند همیشه کشور IP بیرونی را دقیقاً تعیین کند.</p>
          <p>به همین دلیل فهرست کشورها عمداً کوچک نگه داشته شده است. اگر برنامه کشورهای زیادی نشان دهد که عملاً قابل تضمین نیستند، کاربر ممکن است «ایالات متحده» را انتخاب کند اما رفتار ترافیک شبیه سنگاپور باشد، یا «ژاپن» را ببیند اما تست‌ها هنگ‌کنگ را نشان دهند. توضیح کمتر اما صادقانه، بهتر از فهرست بزرگ و گمراه‌کننده است.</p>
          <p>علاوه بر IP بیرونی، یک لایه داخلی قابل تنظیم نیز وجود دارد که همان <strong>proxy IP</strong> است. در حال حاضر proxy IP به‌صورت تصادفی از هنگ‌کنگ، سنگاپور، ژاپن و ایالات متحده به کاربران اختصاص داده می‌شود. هنگام بازدید از سایت‌هایی که از Cloudflare CDN استفاده می‌کنند، ترافیک بیشتر ممکن است proxy IP را نشان دهد؛ اما برای سایت‌های دیگر، نتیجه معمولاً به مسیریابی IP بیرونی نزدیک‌تر است.</p>
          <p>این موضوع می‌تواند نتایج ظاهراً متناقض ایجاد کند: سایت تست سرعت یک منطقه را نشان دهد، شبکه اجتماعی منطقه دیگری را تشخیص دهد و موتور جستجو تأیید اضافی بخواهد. این همیشه نشانه خرابی کلاینت نیست؛ بلکه معمولاً نتیجه چند لایه شبکه، CDN، proxy IP و سیستم‌های ریسک وب‌سایت مقصد است.</p>
          <div class="help-callout">بنابراین کشور نمایش‌داده‌شده در برنامه یک راهنمای عملی است، نه یک وعده قطعی. هنگام انتخاب نود، تأخیر، پایداری و باز شدن سایت مورد نیازتان مهم‌تر از نام کشور است.</div>
        `,
      },
      {
        id: "usage-limit",
        title: "آیا محدودیت مصرف وجود دارد؟",
        html: `
          <p>بله. بخشی از منابع مورد استفاده TrashVPN دارای محدودیت سطح حساب Cloudflare هستند و این محدودیت هر روز ساعت <strong>۸ صبح به وقت پکن</strong> بازنشانی می‌شود. وقتی یک حساب به سقف مصرف برسد، نودهای مرتبط با آن حساب ممکن است تا زمان بازنشانی یا دریافت نودهای جدید موقتاً غیرقابل استفاده شوند.</p>
          <p>یک حساب ممکن است بین چند کاربر مشترک باشد. بنابراین رسیدن به محدودیت لزوماً به این معنی نیست که شما شخصاً مصرف زیادی داشته‌اید؛ ممکن است نتیجه مصرف مجموع کاربران دیگر همان حساب باشد. برای پایین نگه داشتن هزینه سرویس رایگان، برای هر کاربر منابع کاملاً اختصاصی در نظر گرفته نمی‌شود.</p>
          <p>کلاینت تقریباً هر ساعت یک بار اطلاعات مصرف حساب را دریافت می‌کند. وقتی یک حساب به محدودیت نزدیک شود، کلاینت تلاش می‌کند نودهای تازه را همگام‌سازی کند و در صورت امکان به منابعی که هنوز قابل استفاده هستند تغییر مسیر دهد. این فرایند سیستم صورتحساب لحظه‌ای یا شمارنده دقیق مصرف شخصی نیست؛ فقط یک مرجع زمان‌بندی برای بهتر کردن دسترسی نودهای رایگان است.</p>
          <p>اگر یک نود ناگهان وصل نشد، کند شد یا وب‌سایت‌ها را باز نکرد، کمی صبر کنید یا فهرست نودها را دستی تازه‌سازی کنید. در بسیاری از موارد، علت مشکل محدودیت حساب، شلوغی مسیر، تغییر زمان‌بندی Cloudflare یا کنترل ریسک وب‌سایت مقصد است، نه خرابی خود کلاینت.</p>
          <p>همچنین می‌توانید به <a href="status.html">صفحه وضعیت</a> بروید و توزیع تقریبی بار کلی را ببینید. این صفحه بازه‌های تعداد درخواست و میانگین درخواست‌ها را نشان می‌دهد تا مشخص شود سرویس به‌طور کلی شلوغ است یا نه؛ این یک صورتحساب دقیق برای یک دستگاه، یک IP یا یک کاربر نیست.</p>
          <p>اگر به اتصال طولانی‌مدت، بسیار پایدار و قابل پیش‌بینی نیاز دارید، نودهای رایگان فعلی ممکن است انتخاب مناسبی نباشند. TrashVPN بیشتر برای بررسی موقت، دسترسی سبک و آزمایش در دسترس بودن مسیر مناسب است.</p>
        `,
      },
      {
        id: "never-request",
        title: "کارهایی که هرگز از شما نمی‌خواهیم",
        html: `
          <p>برای جلوگیری از سایت‌های جعلی، صفحات فیشینگ و پیام‌های کلاهبرداری، به یاد داشته باشید TrashVPN از طریق وب‌سایت، چت، ایمیل یا صفحه دانلود از شما نمی‌خواهد کاری نامرتبط با عملکرد برنامه انجام دهید. اگر کسی خود را پشتیبانی رسمی معرفی کرد و از شما خواست از وب‌سایت رسمی عبور کنید، پول پرداخت کنید یا اطلاعات حساس بدهید، آن را پرخطر فرض کنید.</p>
          <ul>
            <li>برای «فعال‌سازی»، «رفع محدودیت»، «تمدید»، «ارتقای عضویت» یا «نود پرسرعت» از شما پول یا انتقال وجه نمی‌خواهیم.</li>
            <li>اطلاعات کارت بانکی، رمز پرداخت، مدارک هویتی، کد پیامک، رمز ایمیل، رمز شبکه اجتماعی یا کد بازیابی حساب را درخواست نمی‌کنیم.</li>
            <li>از شما نمی‌خواهیم پاک‌کننده‌ها، ابزارهای کرک، نرم‌افزار کنترل از راه دور، افزونه مرورگر یا پروفایل گواهی ناشناس نصب کنید.</li>
            <li>به‌صورت خصوصی «نود ویژه»، «نسخه داخلی» یا «نسخه بدون تأیید» ارائه نمی‌کنیم و از شما نمی‌خواهیم فایل‌ها را از فضای ابری ناشناس، لینک کوتاه یا پیوست چت نصب کنید.</li>
            <li>از شما نمی‌خواهیم همه نرم‌افزارهای امنیتی را خاموش کنید، برای همیشه به گواهی ناشناس اعتماد کنید یا اطلاعات پروکسی سیستم، DNS یا رمز مدیریت روتر را به فردی بدهید.</li>
          </ul>
          <p>اگر مرورگر، سیستم‌عامل یا نرم‌افزار امنیتی هشدار داد، ابتدا نصب را متوقف کنید و منبع دانلود، نام فایل، دامنه و اطلاعات checksum را بررسی کنید. نسخه Windows فعلی ممکن است به دلیل نداشتن امضای تجاری پیام «ناشر ناشناس» نشان دهد، اما این به معنی قابل اعتماد بودن فایل از هر منبعی نیست.</p>
          <p>کلاینت‌ها را فقط از وب‌سایت رسمی و دامنه رسمی دانلود دریافت کنید. برای APK اندروید، قبل از نصب منبع بسته و آدرس صفحه را بررسی کنید؛ برای فایل MSI ویندوز، منبع دانلود را نگه دارید و در صورت نیاز SHA-256 را محاسبه کنید.</p>
          <div class="help-callout help-callout--warning">اگر صفحه یا فردی چنین درخواست‌هایی داشت، فوراً متوقف شوید، اطلاعات حساس ندهید، فایل ناشناس اجرا نکنید و برای دریافت لینک دانلود به وب‌سایت رسمی برگردید.</div>
        `,
      },
      {
        id: "disclaimer",
        title: "سلب مسئولیت",
        html: `
          <p>TrashVPN با هدف ارائه ابزار اتصال شبکه و اطلاعات مرتبط برای استفاده قانونی ساخته شده است. کاربران مسئول هستند قوانین و مقررات کشور یا منطقه خود، شرایط سرویس‌های شبکه، قوانین پلتفرم‌ها و سیاست‌های داخلی شبکه سازمانی را که شامل آن‌ها می‌شود بشناسند و رعایت کنند.</p>
          <p>از این نرم‌افزار برای فعالیت غیرقانونی، حمله، کلاهبرداری، ارسال هرزنامه، سوءاستفاده از پلتفرم‌ها، نقض حقوق دیگران یا هر رفتاری که به سرویس‌های شبکه، وب‌سایت‌های ثالث، کاربران دیگر یا منابع عمومی آسیب می‌زند استفاده نکنید. پیامدهای ناشی از شیوه استفاده بر عهده خود کاربر است.</p>
          <p>سرعت اتصال، در دسترس بودن نود، منطقه خروجی، تأخیر، رفتار وب‌سایت مقصد و هشدارهای ریسک حساب ممکن است تحت تأثیر مسیرهای اپراتور اینترنت، سیاست مسیریابی Cloudflare، بار نود، محدودیت حساب، قوانین وب‌سایت مقصد و وضعیت دستگاه محلی باشد. TrashVPN تضمین نمی‌کند سرویس همیشه در دسترس باشد، همیشه به سرعت مشخصی برسد یا همیشه منطقه ثابتی را نمایش دهد.</p>
          <p>از آنجا که پروژه با هزینه پایین اداره می‌شود، ممکن است نگهداری، قطعی موقت، از کار افتادن نود، تغییر منطقه یا تغییر API رخ دهد. توسعه‌دهنده تلاش می‌کند مشکلات آشکار را رفع کند، اما SLA سازمانی، کیفیت خط اختصاصی، پشتیبانی اختصاصی یا منابع همیشه در دسترس وعده داده نمی‌شود.</p>
          <p>قبل از دانلود و نصب کلاینت، مطمئن شوید منبع همان ورودی رسمی دانلود است و هشدارهای سیستم و ریسک‌های امنیتی را خودتان ارزیابی کنید. لینک‌های سیاست حریم خصوصی Android / iOS و مجوزهای متن‌باز زیر کارت‌های کلاینت در صفحه دانلود قرار دارند؛ سیاست کوکی، حریم خصوصی و شرایط سرویس وب‌سایت نیز از لینک‌های پایین صفحه قابل مشاهده است.</p>
          <p>ادامه استفاده از TrashVPN به این معنی است که محدودیت‌های یک سرویس رایگان را درک می‌کنید و ریسک‌های ناشی از شرایط شبکه، قوانین پلتفرم، تغییر سرویس‌های ثالث یا رفتار استفاده خودتان را می‌پذیرید.</p>
          <p class="help-article__updated">آخرین به‌روزرسانی: ${UPDATED}</p>
        `,
      },
    ],
  },
};

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

function renderHelp() {
  const locale = detectLocale();
  const data = ARTICLES[locale] || ARTICLES.en;
  setDocumentMeta(data.meta);

  const title = document.querySelector("[data-help-title]");
  const note = document.querySelector("[data-help-note]");
  const sidebar = document.querySelector("[data-help-sidebar]");
  const nav = document.querySelector("[data-help-nav]");
  const content = document.querySelector("[data-help-content]");
  if (!nav || !content) return;

  if (title) title.textContent = data.hero.title;
  if (note) note.textContent = data.hero.note;
  if (sidebar) sidebar.setAttribute("aria-label", data.hero.aria);

  nav.innerHTML = data.articles.map((article, index) => `<a${index === 0 ? ' class="is-active" aria-current="true"' : ""} href="#${article.id}">${escapeHtml(article.title)}</a>`).join("");
  content.innerHTML = data.articles.map((article, index) => `<article class="help-article" id="${article.id}"${index === 0 ? "" : " hidden"}><h2>${escapeHtml(article.title)}</h2>${article.html}</article>`).join("");

  initArticleSwitcher();
}

function initArticleSwitcher() {
  const articles = [...document.querySelectorAll(".help-article")];
  const links = [...document.querySelectorAll(".help-nav a[href^='#']")];
  if (!articles.length || !links.length) return;

  const defaultId = articles[0].id;
  const articleIds = new Set(articles.map((article) => article.id));

  const selectArticle = (id, updateHash = false) => {
    const selectedId = articleIds.has(id) ? id : defaultId;
    articles.forEach((article) => {
      article.hidden = article.id !== selectedId;
    });
    links.forEach((link) => {
      const selected = link.hash === `#${selectedId}`;
      link.classList.toggle("is-active", selected);
      if (selected) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
    if (updateHash) history.pushState(null, "", `#${selectedId}`);
  };

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      selectArticle(link.hash.slice(1), true);
    });
  });

  window.addEventListener("hashchange", () => selectArticle(location.hash.slice(1)));
  selectArticle(location.hash.slice(1));
}

document.addEventListener("DOMContentLoaded", renderHelp);
