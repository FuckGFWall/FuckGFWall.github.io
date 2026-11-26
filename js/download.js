import "./common.js";
import { detectLocale, getMessages, setDocumentMeta } from "./i18n.js";
import { detectSupportedPlatform } from "./platform.js";

const DOWNLOAD_DETAILS = {
  zh: {
    guideTitle: "下载与安装说明",
    actions: { ios: "通过 TestFlight 安装", android: "下载 APK", windowsExe: "exe安装版", windowsZip: "zip便携版", macos: "通过 TestFlight 安装" },
    statuses: { ios: "暂不可用", macos: "暂不可用" },
    guideIntro: "请选择与你的设备匹配的客户端，并在安装前确认下载来源与系统提示。",
    cards: [
      ["Android 客户端", "Android 1.0.0 需要 Android 8.0 或更高版本。新版与旧版包名不同，将作为独立应用安装，不会覆盖旧版或自动迁移数据。下载 APK 后，请通过系统安装器安装，并仅在主动安装官方文件时允许未知来源安装。"],
      ["Windows 客户端", "EXE 版可按向导安装；ZIP 版解压后运行程序。EXE 使用自签名证书，Windows 可能显示安全警告，请核对下载来源。"],
      ["iOS 与 macOS 客户端", "先下载 TestFlight 这个 App，然后点击上方下载按钮跳转安装。"],
    ],
    resourcesTitle: "客户端政策与开源信息",
    resourcesIntro: "在安装或使用客户端前，你可以阅读对应平台的隐私政策与开源许可证说明。",
    links: {
      androidPrivacy: "安卓版隐私政策",
      androidLicense: "安卓版开源许可证",
      iosPrivacy: "iOS 版隐私政策",
      iosTerms: "iOS 版使用条款",
      iosLicense: "iOS 版开源许可证",
    },
  },
  en: {
    guideTitle: "Download and Installation Guidance",
    actions: { ios: "Install via TestFlight", android: "Download APK", windowsExe: "EXE Installer", windowsZip: "Portable ZIP", macos: "Install via TestFlight" },
    statuses: { ios: "Temporarily unavailable", macos: "Temporarily unavailable" },
    guideIntro: "Choose the client that matches your device and confirm the download source and system prompts before installing.",
    cards: [
      ["Android Client", "Android 1.0.0 requires Android 8.0 or later. Its package name differs from the old version, so it installs separately and does not replace the old app or automatically migrate its data. Install the APK through the system installer and allow unknown-source installation only when intentionally installing this official file."],
      ["Windows Client", "Use the EXE installer, or extract the portable ZIP and run the application. The EXE uses a self-signed certificate, so Windows may show a security warning; verify the download source."],
      ["iOS and macOS Clients", "First download the TestFlight app, then click the download button above to open the installation link."],
    ],
    resourcesTitle: "Client Policies and Open-Source Notices",
    resourcesIntro: "Before installing or using a client, you can review the privacy policy and open-source license notice for the corresponding platform.",
    links: {
      androidPrivacy: "Android Privacy Policy",
      androidLicense: "Android Open Source Licenses",
      iosPrivacy: "iOS Privacy Policy",
      iosTerms: "iOS Terms of Use",
      iosLicense: "iOS Open Source Licenses",
    },
  },
  fa: {
    guideTitle: "راهنمای دانلود و نصب",
    actions: { ios: "نصب با TestFlight", android: "دانلود APK", windowsExe: "نصب EXE", windowsZip: "ZIP قابل حمل", macos: "نصب با TestFlight" },
    statuses: { ios: "موقتاً در دسترس نیست", macos: "موقتاً در دسترس نیست" },
    guideIntro: "نسخه متناسب با دستگاه خود را انتخاب کنید و پیش از نصب، منبع دانلود و پیام‌های سیستم را بررسی کنید.",
    cards: [
      ["نسخه Android", "نسخه Android 1.0.0 به Android 8.0 یا بالاتر نیاز دارد. نام بسته آن با نسخه قبلی متفاوت است؛ بنابراین جداگانه نصب می‌شود و جایگزین برنامه قبلی نمی‌شود یا داده‌های آن را به‌طور خودکار منتقل نمی‌کند. فایل APK را با نصب‌کننده سیستم نصب کنید و فقط هنگام نصب عمدی این فایل رسمی، نصب از منابع ناشناس را مجاز کنید."],
      ["نسخه Windows", "نسخه EXE را نصب کنید یا فایل ZIP قابل حمل را استخراج کرده و برنامه را اجرا کنید. EXE از گواهی خودامضا استفاده می‌کند و ممکن است Windows هشدار امنیتی نشان دهد؛ منبع دانلود را بررسی کنید."],
      ["نسخه‌های iOS و macOS", "ابتدا برنامه TestFlight را دانلود کنید، سپس روی دکمه دانلود در بالا بزنید تا به صفحه نصب هدایت شوید."],
    ],
    resourcesTitle: "سیاست‌ها و اطلاعیه‌های متن‌باز برنامه",
    resourcesIntro: "پیش از نصب یا استفاده از برنامه، می‌توانید سیاست حریم خصوصی و اطلاعیه مجوزهای متن‌باز پلتفرم مربوط را بخوانید.",
    links: {
      androidPrivacy: "سیاست حریم خصوصی Android",
      androidLicense: "مجوزهای متن‌باز Android",
      iosPrivacy: "سیاست حریم خصوصی iOS",
      iosTerms: "شرایط استفاده iOS",
      iosLicense: "مجوزهای متن‌باز iOS",
    },
  },
};

function highlightDeviceDownload() {
  const platform = detectSupportedPlatform();
  const card = platform && document.getElementById(platform);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!card || reducedMotion.matches) return;

  const play = () => {
    if (reducedMotion.matches) return;
    card.insertAdjacentHTML("beforeend", `
      <svg class="download-glow" aria-hidden="true">
        <rect class="download-glow__tail" width="100%" height="100%" rx="13" pathLength="100" />
        <rect class="download-glow__beam" width="100%" height="100%" rx="13" pathLength="100" />
        <rect class="download-glow__tip" width="100%" height="100%" rx="13" pathLength="100" />
      </svg>`);
    const glow = card.lastElementChild;
    const removeGlow = () => glow.remove();
    glow.addEventListener("animationend", removeGlow, { once: true });
    glow.addEventListener("animationcancel", removeGlow, { once: true });
  };
  if (!("IntersectionObserver" in window)) {
    play();
    return;
  }
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.intersectionRatio < 0.35) return;
    observer.disconnect();
    play();
  }, { threshold: 0.35 });
  observer.observe(card);
}

document.addEventListener("DOMContentLoaded", () => {
  const { download } = getMessages();
  const details = DOWNLOAD_DETAILS[detectLocale()] || DOWNLOAD_DETAILS.en;
  setDocumentMeta(download.meta);
  document.querySelectorAll("[data-platform-action]").forEach((element) => {
    element.textContent = details.actions[element.dataset.platformAction];
  });
  document.querySelectorAll("[data-platform-status]").forEach((element) => {
    element.textContent = details.statuses[element.dataset.platformStatus] || "";
  });
  const heroImage = document.querySelector(".hero__media");
  const heroTitle = document.querySelector(".hero .section__title");
  const heroNote = document.querySelector(".hero .note");
  if (heroImage) heroImage.alt = download.hero.iconAlt;
  if (heroTitle) heroTitle.textContent = download.hero.title;
  if (heroNote) heroNote.textContent = download.hero.note;
  const labels = document.querySelectorAll(".download-grid__label");
  if (labels[0]) labels[0].textContent = download.items.ios;
  if (labels[1]) labels[1].textContent = download.items.android;
  if (labels[2]) labels[2].textContent = download.items.windows;
  if (labels[3]) labels[3].textContent = download.items.macos;
  document.querySelector("[data-download-guide-title]")?.replaceChildren(details.guideTitle);
  document.querySelector("[data-download-guide-intro]")?.replaceChildren(details.guideIntro);
  document.querySelectorAll("[data-download-card-title]").forEach((element, index) => {
    element.textContent = details.cards[index]?.[0] || "";
  });
  document.querySelectorAll("[data-download-card-text]").forEach((element, index) => {
    element.textContent = details.cards[index]?.[1] || "";
  });
  document.querySelector("[data-download-resources-title]")?.replaceChildren(details.resourcesTitle);
  document.querySelector("[data-download-resources-intro]")?.replaceChildren(details.resourcesIntro);
  document.querySelector("[data-download-link='android-privacy']")?.replaceChildren(details.links.androidPrivacy);
  document.querySelector("[data-download-link='android-license']")?.replaceChildren(details.links.androidLicense);
  document.querySelector("[data-download-link='ios-privacy']")?.replaceChildren(details.links.iosPrivacy);
  document.querySelector("[data-download-link='ios-terms']")?.replaceChildren(details.links.iosTerms);
  document.querySelector("[data-download-link='ios-license']")?.replaceChildren(details.links.iosLicense);
  highlightDeviceDownload();
});
