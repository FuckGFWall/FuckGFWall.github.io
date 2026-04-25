import "./common.js";
import { getMessages, setDocumentMeta } from "./i18n.js";

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

const DOWNLOAD_LINKS = { android: { href: "https://download.itmanager.top/TrashVPN-1.0.5.apk", download: "TrashVPN.apk" }, windows: { href: "https://download.itmanager.top/TrashVPN-Setup-1.2-x64.exe" } };
function detectSupportedPlatform() { const s = `${navigator.userAgentData?.platform || ""} ${navigator.platform || ""} ${navigator.userAgent || ""}`.toLowerCase(); if (s.includes("android")) return "android"; if (s.includes("windows") || s.includes("win32") || s.includes("win64")) return "windows"; return null; }
function initDownloadButton() {
  const { home } = getMessages(); const button = document.querySelector("[data-download-button]"); if (!(button instanceof HTMLAnchorElement)) return;
  const otherVersionsLink = document.querySelector("[data-other-versions]"); const defaultHref = button.dataset.defaultHref || "download.html"; const platform = detectSupportedPlatform();
  if (!platform || !DOWNLOAD_LINKS[platform]) { button.href = defaultHref; button.textContent = home.hero.downloadNow; button.removeAttribute("download"); otherVersionsLink?.setAttribute("hidden", "hidden"); return; }
  button.href = DOWNLOAD_LINKS[platform].href; button.textContent = home.downloads[platform]; DOWNLOAD_LINKS[platform].download ? button.setAttribute("download", DOWNLOAD_LINKS[platform].download) : button.removeAttribute("download"); otherVersionsLink?.removeAttribute("hidden");
}

function initWhyCards() {
  const cards = document.querySelectorAll(".why-card"); const background = document.querySelector(".why__background"); if (!cards.length && !background) return;
  if (!("IntersectionObserver" in window)) { cards.forEach((card) => card.classList.add("is-visible")); background?.classList.add("is-visible"); return; }
  const observer = new IntersectionObserver((entries, obs) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); obs.unobserve(entry.target); } }); }, { threshold: 0.2 });
  cards.forEach((card, index) => { card.style.transitionDelay = `${index * 80}ms`; observer.observe(card); }); if (background) observer.observe(background);
}

document.addEventListener("DOMContentLoaded", () => { applyHomeTranslations(); initDownloadButton(); initGauge(); initWhyCards(); });
