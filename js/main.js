import "./common.js";
import { initNetworkGlobe } from "./globe.js";
import { detectLocale, setDocumentMeta } from "./i18n.js";

const COPY = {
  zh: {
    metaTitle: "TrashVPN · 让连接更简单",
    metaDescription: "TrashVPN 免费网络连接工具，支持 Android、Windows、iOS 与 macOS，节点每周更新。选择你的设备，轻松开始探索。",
    title: "把世界，", titleAccent: "连接得更简单。",
    description: "全平台支持的第三方 Cloudflare WARP 客户端。",
    allPlatforms: "查看所有平台", devices: "在你的设备上，随时出发",
    visualGlobal: "世界，就在眼前", visualCaption: "数据中心与连线示意", explore: "向下探索",
    factFreeUnit: " / 订阅", factFree: "免费使用，简单直接", factPlatformsUnit: " 大平台",
    factWeeklyTitle: "每周更新", factWeekly: "持续发现可用节点", factNetwork: "依托全球边缘网络",
    featuresTitle: "好用的连接，不必很复杂。", featuresIntro: "把精力留给你在意的事，剩下的，交给简单好用的工具。",
    aboutLink: "了解 TrashVPN",
    freeTitle: "免费，是起点也是坚持。", freeText: "没有订阅套餐，也没有付费升级。客户端下载与现有节点均可免费使用。",
    networkTitle: "连接世界的另一种方式。", networkText: "依托 Cloudflare 边缘网络建立连接，让远方的信息，也有机会近在眼前。",
    refreshTitle: "每周更新，多一份可能。", refreshText: "节点每周更新。在客户端重新优选，为当前网络找到更合适的连接。",
    platformTitle: "不管在哪块屏幕，", platformTitleEnd: "都能开启探索。",
    platformIntro: "从口袋里的手机，到桌面上的电脑。选择你的平台，即刻开始。",
    downloadCenter: "前往下载中心", androidMeta: "APK 安装包", windowsMeta: "适用于 x64 设备",
    honestTitle: "名字可以随意，", honestTitleEnd: "说明必须认真。",
    honestIntro: "我们坚持免费，也坦诚它的边界。了解这些，再开始你的连接。",
    limitsLink: "了解使用限额与说明", ipTitle: "IP 地址与地区",
    ipText: "出口 IP 可能变化，地区识别也可能与预期不同。部分有地区限制的服务可能无法使用，IP 跳变也可能触发风控。",
    qualityTitle: "节点质量与优选", qualityText: "速度与可用性会受网络、路由和共享账户限额影响。切换网络或连接变慢时，可以在客户端重新优选。",
    faqTitle: "你可能还想知道。", faqIntro: "关于 TrashVPN 的几个常见问题。", helpLink: "访问帮助中心",
    faqQuestion0: "目前支持哪些客户端？", faqAnswer0: "目前提供 Android、Windows、iOS 与 macOS 客户端。你可以在下载中心找到对应平台的官方下载入口。",
    faqQuestion1: "TrashVPN 是否收费？", faqAnswer1: "当前提供的客户端与可用节点无需付费。我们不会要求你为激活、解封或会员服务支付费用。",
    faqQuestion2: "为什么连接速度或可用性会变化？", faqAnswer2: "节点状态会受本地网络、线路拥堵、节点负载和地理位置影响。共享账户资源也有限额，详情可查看帮助中心。",
    faqQuestion3: "在哪里查看隐私和开源信息？", faqAnswer3: "下载中心提供 Android 与 iOS 客户端的隐私政策和开源许可证入口；页脚可查看网站自身的政策条款。",
    closingTitle: "下一次探索，从这里开始。", closingIntro: "选择你的设备，让世界离你更近一点。", closingButton: "获取 TrashVPN",
    pauseMotion: "暂停动画", resumeMotion: "继续动画",
    download: "免费下载", downloadFor: "下载 {platform} 版",
  },
  en: {
    metaTitle: "TrashVPN · A simpler connection",
    metaDescription: "A free connection tool for Android, Windows, iOS and macOS. Fresh nodes every week. Choose your device and start exploring.",
    title: "More world.", titleAccent: "Less complexity.",
    description: "A third-party Cloudflare WARP client for all major platforms.",
    allPlatforms: "All platforms", devices: "Your device. Your next discovery.",
    visualGlobal: "A world within reach", visualCaption: "Illustration of data centers and routes", explore: "Discover more",
    factFreeUnit: " / subscription", factFree: "Free, plain and simple", factPlatformsUnit: " platforms",
    factWeeklyTitle: "Weekly refresh", factWeekly: "Discover available nodes", factNetwork: "Built on a global edge network",
    featuresTitle: "Good connections. Less complication.", featuresIntro: "Save your attention for what matters. Keep your tools simple.",
    aboutLink: "Meet TrashVPN",
    freeTitle: "Free, from the very start.", freeText: "No subscription tiers or paid upgrades. The clients and currently available nodes are free to use.",
    networkTitle: "Another way to reach the world.", networkText: "Connect through the Cloudflare edge network and bring more of the world's information within reach.",
    refreshTitle: "Fresh nodes. New possibilities.", refreshText: "Nodes are refreshed every week. Run optimization in the client to find a better fit for your current network.",
    platformTitle: "Different screens.", platformTitleEnd: "The same curiosity.",
    platformIntro: "From the phone in your pocket to the computer on your desk. Choose your platform and get started.",
    downloadCenter: "Visit the download center", androidMeta: "APK installer", windowsMeta: "For x64 devices",
    honestTitle: "A playful name.", honestTitleEnd: "An honest explanation.",
    honestIntro: "We keep it free and stay open about its limits. Know what to expect before you connect.",
    limitsLink: "Read about quotas and availability", ipTitle: "IP addresses and regions",
    ipText: "Exit IPs and detected regions may change. Some region-restricted services may be unavailable, and IP changes can trigger account checks.",
    qualityTitle: "Node quality and optimization", qualityText: "Speed and availability depend on networks, routing and shared account quotas. Re-optimize in the client after switching networks or noticing a slowdown.",
    faqTitle: "A few good questions.", faqIntro: "Things you may want to know about TrashVPN.", helpLink: "Visit the help center",
    faqQuestion0: "Which platforms are supported?", faqAnswer0: "Clients are available for Android, Windows, iOS and macOS. Find the official link for your platform in the download center.",
    faqQuestion1: "Does TrashVPN charge a fee?", faqAnswer1: "The current clients and available nodes are free. We will not ask for payments for activation, account unblocking or membership.",
    faqQuestion2: "Why can speed or availability change?", faqAnswer2: "Local networks, route congestion, node load and location can affect your connection. Shared accounts also have quotas. See the help center for details.",
    faqQuestion3: "Where are the privacy and open-source notices?", faqAnswer3: "The download center links to Android and iOS privacy policies and open-source licenses. Website policies are linked in the footer.",
    closingTitle: "Your next discovery starts here.", closingIntro: "Choose your device. Bring the world a little closer.", closingButton: "Get TrashVPN",
    pauseMotion: "Pause animation", resumeMotion: "Resume animation",
    download: "Download free", downloadFor: "Get it for {platform}",
  },
  fa: {
    metaTitle: "TrashVPN · ارتباطی ساده‌تر",
    metaDescription: "ابزار اتصال رایگان برای Android، Windows، iOS و macOS با نودهای به‌روز هفتگی. دستگاه خود را انتخاب کنید و شروع کنید.",
    title: "دنیایی گسترده‌تر،", titleAccent: "ارتباطی ساده‌تر.",
    description: "یک کلاینت شخص ثالث Cloudflare WARP برای همه پلتفرم‌های اصلی.",
    allPlatforms: "همه پلتفرم‌ها", devices: "روی دستگاه شما، آماده کشف",
    visualGlobal: "جهان در دسترس شما", visualCaption: "نمای مفهومی مراکز داده و مسیرها", explore: "بیشتر بدانید",
    factFreeUnit: " / اشتراک", factFree: "رایگان و ساده", factPlatformsUnit: " پلتفرم",
    factWeeklyTitle: "به‌روزرسانی هفتگی", factWeekly: "کشف نودهای در دسترس", factNetwork: "بر پایه شبکه لبه جهانی",
    featuresTitle: "اتصال خوب، بدون پیچیدگی.", featuresIntro: "توجه خود را برای چیزهای مهم نگه دارید و ابزارهای ساده انتخاب کنید.",
    aboutLink: "آشنایی با TrashVPN",
    freeTitle: "رایگان، از همان ابتدا.", freeText: "بدون طرح اشتراک یا ارتقای پولی. برنامه‌ها و نودهای فعلی رایگان هستند.",
    networkTitle: "راهی دیگر برای رسیدن به جهان.", networkText: "با تکیه بر شبکه لبه Cloudflare متصل شوید و اطلاعات بیشتری از جهان را در دسترس داشته باشید.",
    refreshTitle: "نودهای تازه، فرصت‌های تازه.", refreshText: "نودها هر هفته به‌روز می‌شوند. با بهینه‌سازی در برنامه، نود مناسب‌تری برای شبکه فعلی خود پیدا کنید.",
    platformTitle: "صفحه‌های متفاوت،", platformTitleEnd: "کنجکاوی یکسان.",
    platformIntro: "از گوشی در جیب شما تا رایانه روی میز. پلتفرم خود را انتخاب کنید و شروع کنید.",
    downloadCenter: "مرکز دانلود", androidMeta: "فایل نصب APK", windowsMeta: "برای دستگاه‌های x64",
    honestTitle: "نامی شوخ‌طبع،", honestTitleEnd: "توضیحی صادقانه.",
    honestIntro: "رایگان می‌مانیم و محدودیت‌ها را شفاف بیان می‌کنیم. پیش از اتصال، بدانید چه انتظاری داشته باشید.",
    limitsLink: "سهمیه و دسترس‌پذیری", ipTitle: "آدرس IP و منطقه",
    ipText: "IP خروجی و منطقه شناسایی‌شده ممکن است تغییر کند. برخی سرویس‌های محدود به منطقه در دسترس نیستند و تغییر IP می‌تواند بررسی حساب را فعال کند.",
    qualityTitle: "کیفیت نود و بهینه‌سازی", qualityText: "سرعت و دسترس‌پذیری به شبکه، مسیریابی و سهمیه حساب‌های مشترک وابسته است. پس از تغییر شبکه یا افت سرعت، در برنامه دوباره بهینه‌سازی کنید.",
    faqTitle: "چند پرسش کاربردی.", faqIntro: "چیزهایی که شاید بخواهید درباره TrashVPN بدانید.", helpLink: "مرکز راهنما",
    faqQuestion0: "کدام پلتفرم‌ها پشتیبانی می‌شوند؟", faqAnswer0: "برنامه برای Android، Windows، iOS و macOS در دسترس است. پیوند رسمی دستگاه خود را در مرکز دانلود پیدا کنید.",
    faqQuestion1: "آیا TrashVPN هزینه دارد؟", faqAnswer1: "برنامه‌ها و نودهای فعلی رایگان هستند. برای فعال‌سازی، رفع محدودیت حساب یا عضویت از شما پول نمی‌خواهیم.",
    faqQuestion2: "چرا سرعت یا دسترس‌پذیری تغییر می‌کند؟", faqAnswer2: "شبکه محلی، شلوغی مسیر، بار نود و موقعیت روی اتصال اثر دارند. حساب‌های مشترک هم سهمیه دارند. برای جزئیات، مرکز راهنما را ببینید.",
    faqQuestion3: "اطلاعیه‌های حریم خصوصی و متن‌باز کجاست؟", faqAnswer3: "مرکز دانلود به سیاست‌های حریم خصوصی و مجوزهای متن‌باز Android و iOS پیوند دارد. سیاست‌های وب‌سایت در پاورقی هستند.",
    closingTitle: "کشف بعدی شما از اینجا شروع می‌شود.", closingIntro: "دستگاه خود را انتخاب کنید و جهان را کمی نزدیک‌تر بیاورید.", closingButton: "دریافت TrashVPN",
    pauseMotion: "توقف پویانمایی", resumeMotion: "ادامه پویانمایی",
    download: "دانلود رایگان", downloadFor: "دریافت برای {platform}",
  },
};

const TESTFLIGHT_URL = "https://testflight.apple.com/join/YBg8gqaQ";
const DOWNLOAD_LINKS = {
  android: { href: "https://download.itmanager.top/TrashVPN-1.1.5-2.apk", download: "TrashVPN.apk", name: "Android" },
  windows: { href: "https://download.itmanager.top/TrashVPN-Setup-1.6-x64-1.exe", name: "Windows" },
  ios: { href: TESTFLIGHT_URL, name: "iOS" },
  macos: { href: TESTFLIGHT_URL, name: "macOS" },
};

function detectSupportedPlatform() {
  const platform = `${navigator.userAgentData?.platform || ""} ${navigator.platform || ""}`.toLowerCase();
  const userAgent = (navigator.userAgent || "").toLowerCase();
  const source = `${platform} ${userAgent}`;
  if (source.includes("android")) return "android";
  if (/iphone|ipad|ipod/.test(source)) return "ios";
  if (source.includes("mac") && navigator.maxTouchPoints > 1) return "ios";
  if (source.includes("mac")) return "macos";
  if (/windows|win32|win64/.test(source)) return "windows";
  return null;
}

function initDownloadButton(copy) {
  const button = document.querySelector("[data-download-button]");
  const label = button?.querySelector("[data-download-label]");
  if (!(button instanceof HTMLAnchorElement) || !label) return;
  const target = DOWNLOAD_LINKS[detectSupportedPlatform()];
  if (!target) {
    button.href = button.dataset.defaultHref || "download.html";
    label.textContent = copy.download;
    return;
  }
  button.href = target.href;
  label.textContent = copy.downloadFor.replace("{platform}", target.name);
  if (target.download) button.setAttribute("download", target.download);
}

document.addEventListener("DOMContentLoaded", () => {
  const copy = COPY[detectLocale()] || COPY.en;
  setDocumentMeta({ title: copy.metaTitle, description: copy.metaDescription });
  document.querySelectorAll("[data-home-copy]").forEach((element) => {
    const value = copy[element.dataset.homeCopy];
    if (typeof value === "string") element.textContent = value;
  });
  initDownloadButton(copy);
  initNetworkGlobe({ pause: copy.pauseMotion, resume: copy.resumeMotion });
});
