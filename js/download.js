import "./common.js";
import { detectLocale, getMessages, setDocumentMeta } from "./i18n.js";

const DOWNLOAD_DETAILS = {
  zh: {
    guideTitle: "下载与安装说明",
    guideIntro: "请选择与你的设备匹配的客户端，并在安装前确认下载来源与系统提示。",
    cards: [
      ["Android 客户端", "下载 APK 后，可由系统安装器完成安装。如果系统要求允许安装未知来源应用，请仅在你主动安装本次官方下载文件时授权。"],
      ["Windows 客户端", "下载 Windows 安装文件后按安装向导操作。如系统显示发布者或安全提示，请先确认文件来自官方链接。"],
      ["尚未发布的平台", "iOS 与 macOS 客户端目前尚未提供下载。请关注本页面，避免从非官方渠道下载安装文件。"],
    ],
    resourcesTitle: "客户端政策与开源信息",
    resourcesIntro: "在安装或使用客户端前，你可以阅读对应平台的隐私政策与开源许可证说明。",
    links: {
      androidPrivacy: "安卓版隐私政策",
      androidLicense: "安卓版开源许可证",
      iosPrivacy: "iOS 版隐私政策",
      iosLicense: "iOS 版开源许可证",
    },
  },
  en: {
    guideTitle: "Download and Installation Guidance",
    guideIntro: "Choose the client that matches your device and confirm the download source and system prompts before installing.",
    cards: [
      ["Android Client", "After downloading the APK, complete installation through the system installer. If Android asks to allow installation from an unknown source, grant it only while you intentionally install this official download."],
      ["Windows Client", "After downloading the Windows installer, follow the installation wizard. If the system shows publisher or security prompts, verify that the file came from the official link before proceeding."],
      ["Platforms Not Yet Released", "iOS and macOS clients are not currently available for download. Please check this page for updates and avoid files distributed through unofficial channels."],
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
    guideIntro: "نسخه متناسب با دستگاه خود را انتخاب کنید و پیش از نصب، منبع دانلود و پیام‌های سیستم را بررسی کنید.",
    cards: [
      ["نسخه Android", "پس از دانلود APK، نصب را با نصب‌کننده سیستم انجام دهید. اگر Android برای نصب از منبع ناشناس اجازه خواست، فقط هنگامی اجازه دهید که خودتان همین فایل رسمی را نصب می‌کنید."],
      ["نسخه Windows", "پس از دریافت فایل نصب Windows، مراحل نصب را دنبال کنید. اگر سیستم پیام امنیتی یا ناشر نمایش داد، پیش از ادامه مطمئن شوید فایل از لینک رسمی دریافت شده است."],
      ["پلتفرم‌های منتشرنشده", "در حال حاضر نسخه‌های iOS و macOS برای دانلود موجود نیستند. برای خبرهای جدید این صفحه را بررسی کنید و از دریافت فایل از کانال‌های غیررسمی خودداری کنید."],
    ],
    resourcesTitle: "سیاست‌ها و اطلاعیه‌های متن‌باز برنامه",
    resourcesIntro: "پیش از نصب یا استفاده از برنامه، می‌توانید سیاست حریم خصوصی و اطلاعیه مجوزهای متن‌باز پلتفرم مربوط را بخوانید.",
    links: {
      androidPrivacy: "سیاست حریم خصوصی Android",
      androidLicense: "مجوزهای متن‌باز Android",
      iosPrivacy: "سیاست حریم خصوصی iOS",
      iosLicense: "مجوزهای متن‌باز iOS",
    },
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const { download } = getMessages();
  const details = DOWNLOAD_DETAILS[detectLocale()] || DOWNLOAD_DETAILS.en;
  setDocumentMeta(download.meta);
  const heroImage = document.querySelector(".hero__media");
  const heroTitle = document.querySelector(".hero .section__title");
  const heroNote = document.querySelector(".hero .note");
  if (heroImage) heroImage.alt = download.hero.iconAlt;
  if (heroTitle) heroTitle.textContent = download.hero.title;
  if (heroNote) heroNote.textContent = download.hero.note;
  const labels = document.querySelectorAll(".download-grid__label");
  if (labels[0]) labels[0].innerHTML = `<del>${download.items.ios}</del>`;
  if (labels[1]) labels[1].textContent = download.items.android;
  if (labels[2]) labels[2].textContent = download.items.windows;
  if (labels[3]) labels[3].innerHTML = `<del>${download.items.macos}</del>`;
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
});
