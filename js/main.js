import "./common.js";
import { detectLocale, getMessages, setDocumentMeta } from "./i18n.js";

const EXTRA_HOME_CONTENT = {
  zh: {
    guideTitle: "第一次使用 TrashVPN",
    guideIntro: "从官方下载到建立连接，了解几个关键步骤，可以更安全、更清楚地使用客户端。",
    guideCards: [
      ["确认官方下载", "只从本网站提供的入口下载安装包。安装前可以核对来源，并在需要时校验下载文件。"],
      ["选择合适节点", "客户端会获取可用节点。连接延迟和可用性可能随地区、运营商、时间和网络拥堵变化。"],
      ["了解使用边界", "免费节点适合一般网络访问；涉及私人资料、重要账号或支付时，请优先选择可信网络。"],
    ],
    safetyTitle: "下载前的安全清单",
    safetyIntro: "软件来源与权限判断同样重要。下载安装前，建议先完成这些检查。",
    safetyItems: [
      "确认网页域名和下载地址属于 TrashVPN 官方渠道。",
      "Windows 安装包出现未知发布者提示时，先阅读帮助页中的安全说明。",
      "Android 安装 APK 前，确认安装包来源，并仅在你主动安装更新时开放相应权限。",
      "不要通过不明链接输入账号、验证码、支付信息或其它敏感内容。",
    ],
    faqTitle: "常见问题",
    faqIntro: "关于支持平台、连接情况与安全信息的快速说明。",
    faq: [
      ["目前支持哪些客户端？", "目前可下载 Android 与 Windows 客户端。iOS 与 macOS 版本尚未提供，请以下载页公布的信息为准。"],
      ["TrashVPN 是否收费？", "当前提供的客户端与可用节点无需付费。我们不会通过网页要求你为激活、解封或会员服务支付费用。"],
      ["为什么连接速度或可用性会变化？", "节点状态会受本地网络、线路拥堵、节点负载和地理位置影响。状态页提供服务负载的概览供参考。"],
      ["在哪里查看隐私和开源信息？", "下载页提供 Android 与 iOS 客户端的隐私政策和开源许可证入口；页脚可查看网站自身的政策条款。"],
    ],
  },
  en: {
    guideTitle: "Getting Started with TrashVPN",
    guideIntro: "From obtaining the official client to making a connection, a few basic steps help you use the app more safely and with clearer expectations.",
    guideCards: [
      ["Get the Official Download", "Obtain installers only through links published on this website. Check the source before installing and verify downloaded files when needed."],
      ["Choose a Suitable Node", "The client retrieves available nodes. Latency and availability may change with your region, network provider, time of day, and congestion."],
      ["Use It Responsibly", "Free nodes can suit ordinary network access. For private data, important accounts, or payments, prefer a network and protection you trust."],
    ],
    safetyTitle: "Safety Checklist Before Downloading",
    safetyIntro: "Software origin and permission decisions matter. Before installing a client, consider these checks.",
    safetyItems: [
      "Confirm that the website domain and download address belong to official TrashVPN channels.",
      "If Windows reports an unknown publisher, read the security guidance on the Help page before proceeding.",
      "Before installing an Android APK, confirm its source and allow installation permission only when you choose to install an update.",
      "Never enter account credentials, verification codes, payment details, or other sensitive information through an unfamiliar link.",
    ],
    faqTitle: "Frequently Asked Questions",
    faqIntro: "Quick answers about available platforms, connection behavior, and safety information.",
    faq: [
      ["Which client platforms are supported now?", "Android and Windows clients are currently available for download. iOS and macOS versions have not been released; refer to the Download page for current availability."],
      ["Does TrashVPN charge a fee?", "The currently offered clients and available nodes do not require payment. We will not ask for payment on a web page for activation, account unblocking, or membership."],
      ["Why can connection speed or availability change?", "Node conditions vary with local networks, route congestion, service load, and location. The Status page offers an approximate service-load overview for reference."],
      ["Where can I read privacy and open-source notices?", "The Download page links to Android and iOS client privacy policies and open-source license notices. Website-specific policies are available through the footer."],
    ],
  },
  fa: {
    guideTitle: "شروع کار با TrashVPN",
    guideIntro: "از دریافت نسخه رسمی تا برقراری اتصال، دانستن چند گام ساده کمک می‌کند برنامه را آگاهانه‌تر و امن‌تر استفاده کنید.",
    guideCards: [
      ["دانلود رسمی را دریافت کنید", "فایل نصب را فقط از لینک‌های منتشرشده در این وب‌سایت دریافت کنید. پیش از نصب منبع فایل را بررسی کنید و در صورت نیاز فایل را اعتبارسنجی کنید."],
      ["یک نود مناسب انتخاب کنید", "برنامه فهرست نودهای در دسترس را دریافت می‌کند. تأخیر و دسترس‌پذیری ممکن است با منطقه، اپراتور، زمان و شلوغی شبکه تغییر کند."],
      ["با آگاهی استفاده کنید", "نودهای رایگان برای دسترسی عادی مناسب‌اند؛ برای اطلاعات خصوصی، حساب‌های مهم یا پرداخت از شبکه و حفاظت قابل اعتماد استفاده کنید."],
    ],
    safetyTitle: "فهرست بررسی ایمنی پیش از دانلود",
    safetyIntro: "منبع نرم‌افزار و تصمیم‌های مربوط به مجوزها مهم هستند. پیش از نصب این موارد را بررسی کنید.",
    safetyItems: [
      "تأیید کنید دامنه وب‌سایت و آدرس دانلود به کانال رسمی TrashVPN تعلق دارند.",
      "اگر Windows هشدار ناشر ناشناس نشان داد، پیش از ادامه راهنمای امنیتی صفحه راهنما را بخوانید.",
      "پیش از نصب APK در Android، منبع آن را تأیید کنید و مجوز نصب را فقط زمانی بدهید که خودتان نصب به‌روزرسانی را انتخاب کرده‌اید.",
      "اطلاعات ورود، کد تأیید، اطلاعات پرداخت یا محتوای حساس را از طریق لینک ناآشنا وارد نکنید.",
    ],
    faqTitle: "پرسش‌های متداول",
    faqIntro: "پاسخ‌های کوتاه درباره پلتفرم‌های موجود، وضعیت اتصال و اطلاعات ایمنی.",
    faq: [
      ["اکنون کدام نسخه‌ها پشتیبانی می‌شوند؟", "در حال حاضر نسخه‌های Android و Windows برای دانلود در دسترس هستند. نسخه‌های iOS و macOS هنوز منتشر نشده‌اند؛ اطلاعات روز را در صفحه دانلود ببینید."],
      ["آیا TrashVPN هزینه دارد؟", "نسخه‌ها و نودهای فعلی بدون پرداخت ارائه می‌شوند. ما در وب‌سایت برای فعال‌سازی، رفع محدودیت یا عضویت از شما درخواست پرداخت نمی‌کنیم."],
      ["چرا سرعت یا دسترس‌پذیری اتصال تغییر می‌کند؟", "شرایط نود به شبکه محلی، شلوغی مسیر، بار سرویس و موقعیت جغرافیایی وابسته است. صفحه وضعیت نمایی تقریبی از بار سرویس ارائه می‌کند."],
      ["اطلاعات حریم خصوصی و متن‌باز را کجا ببینم؟", "صفحه دانلود به سیاست حریم خصوصی و مجوزهای متن‌باز نسخه‌های Android و iOS پیوند دارد. سیاست‌های خود وب‌سایت در پاورقی در دسترس است."],
    ],
  },
};

function applyAdditionalContent() {
  const content = EXTRA_HOME_CONTENT[detectLocale()] || EXTRA_HOME_CONTENT.en;
  document.querySelector("[data-guide-title]")?.replaceChildren(content.guideTitle);
  document.querySelector("[data-guide-intro]")?.replaceChildren(content.guideIntro);
  document.querySelectorAll("[data-guide-card-title]").forEach((element, index) => {
    element.textContent = content.guideCards[index]?.[0] || "";
  });
  document.querySelectorAll("[data-guide-card-text]").forEach((element, index) => {
    element.textContent = content.guideCards[index]?.[1] || "";
  });
  document.querySelector("[data-safety-title]")?.replaceChildren(content.safetyTitle);
  document.querySelector("[data-safety-intro]")?.replaceChildren(content.safetyIntro);
  const safetyItems = document.querySelector("[data-safety-items]");
  if (safetyItems) safetyItems.innerHTML = content.safetyItems.map((item) => `<li>${item}</li>`).join("");
  document.querySelector("[data-faq-title]")?.replaceChildren(content.faqTitle);
  document.querySelector("[data-faq-intro]")?.replaceChildren(content.faqIntro);
  document.querySelectorAll("[data-faq-question]").forEach((element, index) => {
    element.textContent = content.faq[index]?.[0] || "";
  });
  document.querySelectorAll("[data-faq-answer]").forEach((element, index) => {
    element.textContent = content.faq[index]?.[1] || "";
  });
}

function applyHomeTranslations() {
  const { home } = getMessages();
  setDocumentMeta(home.meta);
  const heroImage = document.querySelector(".hero__media");
  if (heroImage) heroImage.alt = home.hero.iconAlt;
  const heroTitle = document.querySelector(".hero .section__title");
  const heroNote = document.querySelector(".hero .note");
  if (heroTitle) heroTitle.textContent = home.hero.title;
  if (heroNote) heroNote.textContent = home.hero.note;
  const otherVersionsLink = document.querySelector("[data-other-versions]");
  if (otherVersionsLink) otherVersionsLink.textContent = home.hero.otherVersions;

  const titles = document.querySelectorAll("main .section__title");
  if (titles[1]) titles[1].textContent = home.sections.freeTitle;
  if (titles[2]) titles[2].textContent = home.sections.cfTitle;
  if (titles[3]) titles[3].textContent = home.sections.globeTitle;
  if (titles[4]) titles[4].textContent = home.sections.speedTitle;
  if (titles[5]) titles[5].textContent = home.sections.whyTitle;

  const notes = document.querySelectorAll("main .note");
  if (notes[1]) notes[1].textContent = home.sections.cfText;
  if (notes[2]) notes[2].innerHTML = `${home.sections.globePrefix}<span class="highlight">330</span>${home.sections.globeMiddle}<span class="highlight">125</span>${home.sections.globeSuffix}`;
  if (notes[3]) notes[3].textContent = home.sections.whyNote;

  const sectionParagraphs = document.querySelectorAll("main section p:not(.note):not(.gauge__label)");
  if (sectionParagraphs[0]) sectionParagraphs[0].textContent = home.sections.freeText;
  if (sectionParagraphs[1]) sectionParagraphs[1].textContent = home.sections.speedText;

  const gaugeSvg = document.querySelector("[data-speed-gauge] svg");
  if (gaugeSvg) gaugeSvg.setAttribute("aria-label", home.sections.gauge);
  const whyImage = document.querySelector(".why__background img");
  if (whyImage) whyImage.alt = home.sections.whyAlt;

  const cardTitles = document.querySelectorAll(".why-card__title");
  if (cardTitles[0]) cardTitles[0].textContent = home.cards.ipTitle;
  if (cardTitles[1]) cardTitles[1].textContent = home.cards.weakTitle;
  const lists = document.querySelectorAll(".why-card__list");
  if (lists[0]) lists[0].innerHTML = home.cards.ip.map((item) => `<li>${item}</li>`).join("");
  if (lists[1]) lists[1].innerHTML = home.cards.weak.map((item) => `<li>${item}</li>`).join("");
  applyAdditionalContent();
}

function prefersReducedMotion() { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; }
function initGauge() {
  const gauge = document.querySelector("[data-speed-gauge]"); if (!gauge) return;
  const pointer = gauge.querySelector("[data-gauge-pointer]"); const label = gauge.querySelector("[data-gauge-value]");
  const target = Number(gauge.getAttribute("data-target") || "100"); const reduceMotion = prefersReducedMotion();
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max); let jitterTimer = null;
  const setGauge = (value) => { const v = clamp(value, 0, 600); const angle = -100 + (v / 600) * 200; pointer.style.transform = `rotate(${angle}deg)`; if (label) label.textContent = `${Math.round(v)} Mbps`; };
  const startJitter = () => { if (reduceMotion || jitterTimer) return; jitterTimer = window.setInterval(() => setGauge(450 + Math.random() * 50), 260); };
  if (reduceMotion) { setGauge(target); return; }
  let animated = false;
  const animate = () => { if (animated) return; animated = true; const start = performance.now(); const frame = (now) => { const progress = Math.min((now - start) / 50, 1); const eased = 1 - Math.pow(1 - progress, 3); setGauge(target * eased); if (progress < 1) requestAnimationFrame(frame); else setTimeout(startJitter, 160); }; requestAnimationFrame(frame); };
  if ("IntersectionObserver" in window) { const observer = new IntersectionObserver((entries, obs) => { entries.forEach((entry) => { if (entry.isIntersecting) { animate(); obs.disconnect(); } }); }, { threshold: 0.5 }); observer.observe(gauge); } else animate();
}

const TESTFLIGHT_URL = "https://testflight.apple.com/join/YBg8gqaQ";
const DOWNLOAD_LINKS = { android: { href: "https://download.itmanager.top/TrashVPN-1.0.8.apk", download: "TrashVPN.apk" }, windows: { href: "https://download.itmanager.top/TrashVPN-Setup-1.2-x64.exe" }, ios: { href: TESTFLIGHT_URL, label: "iOS（TestFlight）" }, macos: { href: TESTFLIGHT_URL, label: "macOS（TestFlight）" } };
function detectSupportedPlatform() { const platform = `${navigator.userAgentData?.platform || ""} ${navigator.platform || ""}`.toLowerCase(); const userAgent = (navigator.userAgent || "").toLowerCase(); const source = `${platform} ${userAgent}`; const maxTouchPoints = navigator.maxTouchPoints || 0; if (source.includes("android")) return "android"; if (source.includes("iphone") || source.includes("ipad") || source.includes("ipod")) return "ios"; if ((platform.includes("mac") || userAgent.includes("macintosh")) && maxTouchPoints > 1) return "ios"; if (source.includes("mac os") || source.includes("macintosh") || platform.includes("mac")) return "macos"; if (source.includes("windows") || source.includes("win32") || source.includes("win64")) return "windows"; return null; }
function initDownloadButton() {
  const { home } = getMessages(); const button = document.querySelector("[data-download-button]"); if (!(button instanceof HTMLAnchorElement)) return;
  const otherVersionsLink = document.querySelector("[data-other-versions]"); const defaultHref = button.dataset.defaultHref || "download.html"; const platform = detectSupportedPlatform();
  if (!platform || !DOWNLOAD_LINKS[platform]) { button.href = defaultHref; button.textContent = home.hero.downloadNow; button.removeAttribute("download"); otherVersionsLink?.setAttribute("hidden", "hidden"); return; }
  button.href = DOWNLOAD_LINKS[platform].href; button.textContent = DOWNLOAD_LINKS[platform].label || home.downloads[platform]; DOWNLOAD_LINKS[platform].download ? button.setAttribute("download", DOWNLOAD_LINKS[platform].download) : button.removeAttribute("download"); otherVersionsLink?.removeAttribute("hidden");
}

function initWhyCards() {
  const cards = document.querySelectorAll(".why-card"); const background = document.querySelector(".why__background"); if (!cards.length && !background) return;
  if (!("IntersectionObserver" in window)) { cards.forEach((card) => card.classList.add("is-visible")); background?.classList.add("is-visible"); return; }
  const observer = new IntersectionObserver((entries, obs) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); obs.unobserve(entry.target); } }); }, { threshold: 0.2 });
  cards.forEach((card, index) => { card.style.transitionDelay = `${index * 80}ms`; observer.observe(card); }); if (background) observer.observe(background);
}

document.addEventListener("DOMContentLoaded", () => { applyHomeTranslations(); initDownloadButton(); initGauge(); initWhyCards(); });
