import { applyDocumentLanguage, detectLocale, getMessages, setStoredLocale } from "./i18n.js";

const SOCIAL_LINKS = [
  { href: "https://www.youtube.com/@TrashVPN", label: "YouTube", icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.6 7.2s-.2-1.5-.8-2.2c-.7-.8-1.5-.8-1.9-.9-2.6-.2-6.5-.2-6.5-.2h-.1s-3.9 0-6.5.2c-.4 0-1.2.1-1.9.9-.6.7-.8 2.2-.8 2.2S3 9 3 10.8v1.5c0 1.8.2 3.6.2 3.6s.2 1.5.8 2.2c.7.8 1.6.7 2 .8 1.5.1 6.3.2 6.3.2s3.9 0 6.5-.2c.4 0 1.2-.1 1.9-.9.6-.7.8-2.2.8-2.2s.2-1.8.2-3.6v-1.5c0-1.8-.2-3.6-.2-3.6ZM9.9 14.9V9.4l5.1 2.7-5.1 2.8Z"/></svg>` },
  { href: "https://x.com/trashvpn", label: "X", icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.98 3.5h-3.2l-4.07 5.6-4.6-5.6H3.03l7.2 8.66-6.5 8.34h3.18l4.43-6.07 5 6.07h6.27l-7.7-9.42 6.07-7.58ZM17.22 19l-2.98-3.63-1.5-1.84-4.95 6.47H5.9l5.26-6.69.18-.23L6.48 5.02h2.25l3.12 3.83 1.53 1.88 4.3-5.71h1.9l-4.78 5.97-.2.24 4.72 5.77h-2.31Z"/></svg>` },
  { href: "https://t.me/+eJ2kUZ3kUJ9jZmNl", label: "Telegram", icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.8 4.2c-.5-.4-1.3-.4-2-.2l-16 6.1c-.7.3-1.1.8-1.1 1.4 0 .6.4 1.1 1.1 1.3l3.9 1.2 1.5 4.7c.2.6.7 1 1.4 1h.1c.6 0 1.1-.3 1.4-.8l2.1-3.4 4.1 3.3c.3.2.6.3 1 .3.3 0 .6-.1.9-.2.5-.3.8-.7.9-1.3l2.1-10.9c.2-.8-.1-1.5-.6-1.9Zm-2.7 1.4-8.5 7.2c-.2.1-.3.4-.3.6l.4 3-1.2-3.6c-.1-.2-.3-.4-.6-.5l-3.4-1.1 13.6-5.6Z"/></svg>` },
  { href: "https://github.com/FuckGFWall", label: "GitHub", icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.4 6.9 9.8.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.4-3.4-1.4-.4-1.1-1-1.4-1-1.4-.8-.6.1-.6.1-.6.9.1 1.3.9 1.3.9.8 1.4 2.1 1 2.6.8.1-.6.3-1 .6-1.3-2.2-.3-4.4-1.1-4.4-4.9 0-1.1.5-2 .9-2.7-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.8 1 .8-.2 1.7-.3 2.6-.3s1.8.1 2.6.3c2-1.3 2.8-1 2.8-1 .5 1.3.2 2.3.1 2.6.6.7.9 1.6.9 2.7 0 3.8-2.3 4.6-4.4 4.9.3.3.7.9.7 1.8v2.6c0 .3.2.6.7.5 4-1.4 6.9-5.3 6.9-9.8C22 6.6 17.5 2 12 2Z"/></svg>` },
];
const SOCIAL_REL = "noopener noreferrer";
const POLICY_LINKS = [
  { href: "policy.html#cookie-policy", label: { zh: "Cookie 政策", en: "Cookie Policy", fa: "سیاست کوکی" } },
  { href: "policy.html#privacy-policy", label: { zh: "隐私政策", en: "Privacy Policy", fa: "سیاست حریم خصوصی" } },
  { href: "policy.html#terms-of-service", label: { zh: "服务条款", en: "Terms of Service", fa: "شرایط خدمات" } },
  { href: "policy.html#contact-us", label: { zh: "联系我们", en: "Contact Us", fa: "تماس با ما" } },
  { href: "donate.html", label: { zh: "捐赠", en: "Donate", fa: "حمایت مالی" } },
];
const SHARED_COPY = {
  zh: { download: "免费下载", close: "收起菜单", skip: "跳到主要内容", product: "产品", resources: "政策与支持", community: "保持联系", tagline: "少一点繁琐，多一点自由。\n让每一次日常探索，轻松开始。", donate: "支持这个免费项目 ↗" },
  en: { download: "Get TrashVPN", close: "Close menu", skip: "Skip to content", product: "Product", resources: "Policies & support", community: "Stay in the loop", tagline: "Less friction. More freedom.\nA simpler start to your everyday exploration.", donate: "Support the free project ↗" },
  fa: { download: "دانلود رایگان", close: "بستن منو", skip: "رفتن به محتوای اصلی", product: "محصول", resources: "سیاست‌ها و پشتیبانی", community: "در ارتباط بمانید", tagline: "دردسر کمتر، آزادی بیشتر.\nشروعی ساده‌تر برای کشف روزمره.", donate: "حمایت از این پروژه رایگان ↗" },
};
const LANGUAGE_OPTIONS = [
  { code: "zh", label: "中文", lang: "zh-CN", prompt: "选择语言" },
  { code: "en", label: "English", prompt: "Choose language" },
  { code: "fa", label: "فارسی", prompt: "انتخاب زبان" },
];
const getSharedCopy = () => SHARED_COPY[detectLocale()] || SHARED_COPY.en;

function buildLogo() {
  return '<a class="site-logo" href="index.html"><img src="assests/icon.PNG" alt="" width="35" height="35"><span>Trash<span class="site-logo__vpn">VPN</span></span></a>';
}

function buildLanguageSwitcher() {
  if (document.body.dataset.fixedLocale) return "";
  const current = detectLocale();
  const selected = LANGUAGE_OPTIONS.find((option) => option.code === current);
  return `<div class="language-switcher">
    <details class="language-picker">
      <summary class="language-trigger" aria-label="${selected.prompt} · ${selected.label}"><svg class="icon" aria-hidden="true"><use href="assests/icons.svg#globe"></use></svg><span lang="${selected.lang || selected.code}">${selected.label}</span><svg class="language-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></summary>
      <ul class="language-options">${LANGUAGE_OPTIONS.map((option) => `<li><button type="button" lang="${option.lang || option.code}" data-language="${option.code}"${option.code === current ? ' aria-current="true"' : ""}><span>${option.label}</span>${option.code === current ? '<svg class="language-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>' : ""}</button></li>`).join("")}</ul>
    </details>
  </div>`;
}

function buildHeader() {
  const { common } = getMessages();
  const copy = getSharedCopy();
  const routes = [
    { page: "home", href: "index.html", label: common.nav.home },
    { page: "download", href: "download.html", label: common.nav.download },
    { page: "help", href: "help.html", label: common.nav.about },
  ];
  return `<div class="container site-header__inner">
    ${buildLogo()}
    <button class="nav-toggle" type="button" aria-label="${common.menuLabel}" aria-expanded="false" aria-controls="site-navigation"><span class="nav-toggle__icon" aria-hidden="true"></span></button>
    <div class="site-header__panel" id="site-navigation"><div class="site-header__reveal"><div class="site-header__actions">
      <nav class="site-nav" aria-label="${common.navLabel}"><ul class="site-nav__list">${routes.map((route) => {
        const active = route.page === document.body.dataset.page;
        return `<li><a class="site-nav__link${active ? " is-active" : ""}" href="${route.href}"${active ? ' aria-current="page"' : ""}>${route.label}</a></li>`;
      }).join("")}</ul></nav>
      ${buildLanguageSwitcher()}
      <a class="primary-button header-download" href="download.html"><span>${copy.download}</span><svg class="icon" aria-hidden="true"><use href="assests/icons.svg#arrow-up"></use></svg></a>
    </div></div></div>
  </div>`;
}

function buildFooter() {
  const { common } = getMessages();
  const copy = getSharedCopy();
  const locale = detectLocale();
  return `<div class="container">
    <div class="footer__top">
      <div class="footer__brand">${buildLogo()}<p class="footer__tagline">${copy.tagline.split("\n").join("<br>")}</p></div>
      <nav class="footer__column" aria-label="${copy.product}"><h2>${copy.product}</h2><a href="download.html">${common.nav.download}</a><a href="help.html">${common.nav.about}</a></nav>
      <nav class="footer__column" aria-label="${copy.resources}"><h2>${copy.resources}</h2>${POLICY_LINKS.filter((link) => link.href !== "donate.html").map((link) => `<a href="${link.href}">${link.label[locale] || link.label.en}</a>`).join("")}</nav>
      <div class="footer__column footer__community"><h2>${copy.community}</h2><div class="social-links" aria-label="${common.socialLabel}">${SOCIAL_LINKS.map((link) => `<a class="social-link" href="${link.href}" target="_blank" rel="${SOCIAL_REL}" aria-label="${link.label}">${link.icon}</a>`).join("")}</div><a class="footer__support" href="donate.html">${copy.donate}</a></div>
    </div>
    <div class="footer__bottom"><p class="footer__copy">${common.footer.replace("{year}", new Date().getFullYear())}</p></div>
  </div>`;
}

function initNavigation() {
  const header = document.querySelector("#site-header");
  const footer = document.querySelector("#site-footer");
  const copy = getSharedCopy();
  if (header) { header.classList.add("site-header"); header.innerHTML = buildHeader(); }
  if (footer) { footer.classList.add("footer"); footer.innerHTML = buildFooter(); }
  const main = document.querySelector("#main");
  if (main) {
    main.setAttribute("tabindex", "-1");
    const skipLink = document.createElement("a");
    skipLink.className = "skip-link";
    skipLink.href = "#main";
    skipLink.textContent = copy.skip;
    document.body.prepend(skipLink);
  }

  const toggle = header?.querySelector(".nav-toggle");
  const panel = header?.querySelector("#site-navigation");
  const languagePicker = header?.querySelector(".language-picker");
  const mobileMenu = window.matchMedia("(max-width: 900px)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const closeLanguagePicker = () => {
    if (languagePicker) languagePicker.open = false;
  };
  const setMenuOpen = (open) => {
    document.body.classList.toggle("nav-open", open);
    toggle?.setAttribute("aria-expanded", String(open));
    toggle?.setAttribute("aria-label", open ? copy.close : getMessages().common.menuLabel);
    if (panel) panel.inert = mobileMenu.matches && !open;
    if (!open) closeLanguagePicker();
  };
  setMenuOpen(false);
  toggle?.addEventListener("click", () => setMenuOpen(!document.body.classList.contains("nav-open")));
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (languagePicker?.open) {
      languagePicker.open = false;
      languagePicker.querySelector("summary")?.focus();
    } else if (document.body.classList.contains("nav-open")) {
      setMenuOpen(false);
      toggle?.focus();
    }
  });
  document.addEventListener("pointerdown", (event) => {
    if (!(event.target instanceof Node)) return;
    if (!header?.contains(event.target)) setMenuOpen(false);
    else if (languagePicker?.open && !languagePicker.contains(event.target) && !toggle?.contains(event.target)) {
      closeLanguagePicker();
    }
  });
  mobileMenu.addEventListener("change", () => setMenuOpen(false));
  header?.querySelector(".site-nav")?.addEventListener("click", (event) => {
    const link = event.target instanceof Element ? event.target.closest("a") : null;
    if (!link) return;
    setMenuOpen(false);
    if (document.body.dataset.page === "home" && link.getAttribute("href") === "index.html") {
      event.preventDefault();
      main?.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth" });
    }
  });
  languagePicker?.addEventListener("click", (event) => {
    const option = event.target instanceof Element ? event.target.closest("[data-language]") : null;
    if (!option) return;
    const { language } = option.dataset;
    setStoredLocale(language);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", language);
    if (url.href === window.location.href) window.location.reload();
    else window.location.href = url.href;
  });
}

function initScrollAnimations() {
  const elements = document.querySelectorAll(".reveal-on-scroll");
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      delete entry.target.dataset.revealPending;
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.05 });
  elements.forEach((element) => {
    // Initial content stays visible. Only offscreen sections opt into a reveal.
    if (element.getBoundingClientRect().top > window.innerHeight) {
      element.dataset.revealPending = "";
      observer.observe(element);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyDocumentLanguage();
  initNavigation();
  initScrollAnimations();
});
export { initScrollAnimations };
