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
          <p>TrashVPN 是由独立开发者维护的免费 VPN / 网络代理软件，现支持 <strong>Windows、Android、iOS 和 macOS</strong>。</p>
          <p>软件通过 Cloudflare 网络提供连接，因此节点地区、速度和可用性可能受路由、运营商线路、账户资源和目标网站规则影响，不能保证固定地区或稳定速度。</p>
          <p>TrashVPN 适合临时查资料、轻量访问和测试连接。请从官网获取客户端，不要将其用于违法、攻击、欺诈或传输敏感信息。</p>
        `,
      },
      {
        id: "country-availability",
        title: "为什么可提供的国家这么少",
        html: `
          <p>很多人看到“节点国家”时会以为它和 VPS 一样：服务器买在哪个国家，出口就固定在哪个国家。但 Cloudflare 节点却并不是这样。同一个节点，在不同运营商、不同城市、不同时间段，甚至同一地区的不同宽带线路下，都可能被 Cloudflare 分配到不同国家的数据中心。</p>
          <p>因为 Cloudflare 会综合判断用户的物理距离、附近数据中心数量、各地区服务器当前负载、线路质量以及自身调度策略，然后决定你的连接进入哪个国家的数据中心。</p>
          <p>所以同一个节点，你落地到哪个国家，全世界就只有你自己知道。软件内标注的国家只是个装饰品，让软件看上去更美观。</p>
          <div class="help-callout">因此，增加国家的数量没有任何意义。</div>

          <p></p>

          <p>除了外层 IP，连接中一部分流量使用的是内层 IP，也就是 <strong>proxy IP</strong>。proxy IP 会从韩国、新加坡、日本、美国这四个地区随机分配给用户。访问使用 Cloudflare CDN 的网站时，使用的是 proxy IP；访问其它网站时，则为外层 IP。</p>
        `,
      },
      {
        id: "usage-limit",
        title: "会有限额吗",
        html: `
          <p>会。TrashVPN 使用的部分 Cloudflare 账户资源存在限额，每天<strong>北京时间 8 点</strong>重置。达到限额后，相关节点可能暂时不可用。</p>
          <p>一个账户可能由多位用户共享，因此达到限额不一定是个人使用过多。遇到节点失败或速度下降时，可以稍后重试、重新获取节点，或在客户端重新优选。</p>
          <p>此外，个人使用量也有限制。手机端和 macOS 端，可以通过观看广告获取额外使用量；Windows 端达到限额后，等待十分钟即可在客户端手动重置使用量。</p>
          <p>如果需要长期、稳定且可预测的专用线路，免费节点可能并不适合；它更适合临时查资料、轻量访问和测试连接。</p>
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
          <p>推荐只从官网和官方下载域名获取客户端。对于 Android APK，安装前请确认包名、签名来源和页面地址；对于 Windows EXE 或 ZIP，请尽量保存下载来源并在需要时计算 SHA-256 校验值。</p>
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
          <p>TrashVPN is a free VPN / network proxy maintained by an independent developer. It currently supports <strong>Windows, Android, iOS, and macOS</strong>.</p>
          <p>The app connects through the Cloudflare network, so region, speed, and availability may be affected by routing, ISP lines, account resources, and target-site rules. A fixed region or stable speed cannot be guaranteed.</p>
          <p>TrashVPN is intended for temporary research, lightweight access, and connection testing. Download clients from the official website, and do not use the app for illegal activity, attacks, fraud, or transmitting sensitive information.</p>
        `,
      },
      {
        id: "country-availability",
        title: "Why are there so few countries available?",
        html: `
          <p>Many people assume that a “node country” works like a VPS: the country where the server is purchased permanently determines its exit country. Cloudflare nodes do not work this way. The same node may be assigned by Cloudflare to data centers in different countries depending on the ISP, city, time period, and even the broadband line used within the same region.</p>
          <p>Cloudflare evaluates the user's physical distance, the number of nearby data centers, current server loads in each region, line quality, and its own scheduling policies before deciding which country's data center will handle the connection.</p>
          <p>Therefore, for the same node, only you can know which country your connection actually lands in. The country shown in the app is merely decorative and makes the interface look better.</p>
          <div class="help-callout">Therefore, increasing the number of countries serves no purpose.</div>

          <p></p>

          <p>In addition to the outer IP, part of the connection traffic uses an inner IP, also known as the <strong>proxy IP</strong>. The proxy IP is randomly assigned from South Korea, Singapore, Japan, or the United States. Websites using Cloudflare CDN are accessed through the proxy IP; other websites use the outer IP.</p>
        `,
      },
      {
        id: "usage-limit",
        title: "Are there usage limits?",
        html: `
          <p>Yes. Some Cloudflare account resources used by TrashVPN have quotas that reset daily at <strong>08:00 Beijing time</strong>. When a quota is reached, related nodes may become temporarily unavailable.</p>
          <p>An account may be shared by multiple users, so reaching a quota does not necessarily mean that you personally used too much. If a node fails or slows down, try again later, refresh the node list, or run optimization in the client.</p>
          <p>There is also a personal usage limit. On mobile and macOS, you can watch ads to obtain additional usage. On Windows, wait ten minutes after reaching the limit, then manually reset your usage in the client.</p>
          <p>If you need long-term, stable, predictable dedicated connectivity, free nodes may not be suitable. They are better for temporary research, lightweight access, and connection testing.</p>
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
          <p>Only download clients from the official website and official download domain. For Android APKs, check the package source and page address before installation; for Windows EXE or ZIP files, keep the download source and calculate SHA-256 checksums when needed.</p>
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
          <p>TrashVPN یک VPN / پراکسی شبکه رایگان است که توسط یک توسعه‌دهنده مستقل نگهداری می‌شود و اکنون از <strong>Windows، Android، iOS و macOS</strong> پشتیبانی می‌کند.</p>
          <p>اتصال برنامه از شبکه Cloudflare عبور می‌کند؛ بنابراین منطقه، سرعت و دسترسی ممکن است تحت تأثیر مسیریابی، خطوط اپراتور، منابع حساب و قوانین وب‌سایت مقصد قرار بگیرد. منطقه ثابت یا سرعت پایدار تضمین نمی‌شود.</p>
          <p>TrashVPN برای بررسی موقت، دسترسی سبک و آزمایش اتصال مناسب است. کلاینت‌ها را از وب‌سایت رسمی دریافت کنید و از برنامه برای فعالیت غیرقانونی، حمله، کلاهبرداری یا انتقال اطلاعات حساس استفاده نکنید.</p>
        `,
      },
      {
        id: "country-availability",
        title: "چرا کشورهای قابل انتخاب کم هستند؟",
        html: `
          <p>بسیاری از افراد با دیدن «کشور نود» تصور می‌کنند که مانند VPS است: کشوری که سرور در آن خریداری شده، کشور خروجی را برای همیشه تعیین می‌کند. اما نودهای Cloudflare این‌گونه کار نمی‌کنند. یک نود واحد ممکن است بسته به اپراتور اینترنت، شهر، بازه زمانی و حتی خط پهن‌باند متفاوت در همان منطقه، از سوی Cloudflare به مراکز داده کشورهای مختلف اختصاص داده شود.</p>
          <p>Cloudflare فاصله فیزیکی کاربر، تعداد مراکز داده نزدیک، بار فعلی سرورها در هر منطقه، کیفیت خط و سیاست‌های زمان‌بندی خود را به‌طور هم‌زمان ارزیابی می‌کند و سپس تصمیم می‌گیرد اتصال شما وارد مرکز داده کدام کشور شود.</p>
          <p>بنابراین برای یک نود یکسان، فقط خود شما می‌دانید اتصال واقعاً در کدام کشور فرود می‌آید. کشوری که داخل برنامه نوشته شده صرفاً جنبه تزئینی دارد و ظاهر برنامه را زیباتر می‌کند.</p>
          <div class="help-callout">بنابراین افزایش تعداد کشورها هیچ معنایی ندارد.</div>

          <p></p>

          <p>علاوه بر IP بیرونی، بخشی از ترافیک اتصال از IP داخلی، یعنی <strong>proxy IP</strong>، استفاده می‌کند. proxy IP به‌صورت تصادفی از کره جنوبی، سنگاپور، ژاپن یا ایالات متحده به کاربر اختصاص داده می‌شود. برای وب‌سایت‌هایی که از Cloudflare CDN استفاده می‌کنند، proxy IP به کار می‌رود؛ برای سایر وب‌سایت‌ها، IP بیرونی استفاده می‌شود.</p>
        `,
      },
      {
        id: "usage-limit",
        title: "آیا محدودیت مصرف وجود دارد؟",
        html: `
          <p>بله. بخشی از منابع حساب Cloudflare مورد استفاده TrashVPN دارای محدودیت هستند و هر روز ساعت <strong>۸ صبح به وقت پکن</strong> بازنشانی می‌شوند. پس از رسیدن به محدودیت، نودهای مرتبط ممکن است موقتاً در دسترس نباشند.</p>
          <p>ممکن است یک حساب بین چند کاربر مشترک باشد؛ بنابراین رسیدن به سقف لزوماً به معنی مصرف زیاد شخصی شما نیست. اگر نودی قطع یا کند شد، بعداً دوباره تلاش کنید، فهرست نودها را تازه‌سازی کنید یا در برنامه دوباره بهینه‌سازی کنید.</p>
          <p>محدودیت مصرف شخصی نیز وجود دارد. در نسخه‌های موبایل و macOS، می‌توانید با تماشای تبلیغات مصرف اضافی دریافت کنید. در Windows، پس از رسیدن به محدودیت ده دقیقه صبر کنید و سپس مصرف را به‌صورت دستی در کلاینت بازنشانی کنید.</p>
          <p>اگر به اتصال اختصاصی، پایدار و قابل پیش‌بینی نیاز دارید، نودهای رایگان مناسب نیستند؛ این نودها بیشتر برای بررسی موقت، دسترسی سبک و آزمایش اتصال هستند.</p>
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
          <p>کلاینت‌ها را فقط از وب‌سایت رسمی و دامنه رسمی دانلود دریافت کنید. برای APK اندروید، قبل از نصب منبع بسته و آدرس صفحه را بررسی کنید؛ برای فایل EXE یا ZIP ویندوز، منبع دانلود را نگه دارید و در صورت نیاز SHA-256 را محاسبه کنید.</p>
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
