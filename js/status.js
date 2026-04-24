import "./common.js";
import { getMessages, setDocumentMeta } from "./i18n.js";

const API_PATH = "/api/cloudflare-usage/summary";
const LOCAL_API_BASE = "http://127.0.0.1:8000";
const PRODUCTION_API_BASE = "https://trashvpn.itmanager.top";
const RANGE_LABELS = {
  zh: ["0-1\u4e07", "1\u4e07-2\u4e07", "2\u4e07-3\u4e07", "3\u4e07-4\u4e07", "4\u4e07-5\u4e07", "5\u4e07-6\u4e07", "6\u4e07-7\u4e07", "7\u4e07-8\u4e07", "8\u4e07-9\u4e07", "9\u4e07-10\u4e07", "10\u4e07+"],
  en: ["0-10k", "10k-20k", "20k-30k", "30k-40k", "40k-50k", "50k-60k", "60k-70k", "70k-80k", "80k-90k", "90k-100k", "100k+"],
  fa: ["\u06f0-\u06f1\u06f0\u0647\u0632\u0627\u0631", "\u06f1\u06f0-\u06f2\u06f0\u0647\u0632\u0627\u0631", "\u06f2\u06f0-\u06f3\u06f0\u0647\u0632\u0627\u0631", "\u06f3\u06f0-\u06f4\u06f0\u0647\u0632\u0627\u0631", "\u06f4\u06f0-\u06f5\u06f0\u0647\u0632\u0627\u0631", "\u06f5\u06f0-\u06f6\u06f0\u0647\u0632\u0627\u0631", "\u06f6\u06f0-\u06f7\u06f0\u0647\u0632\u0627\u0631", "\u06f7\u06f0-\u06f8\u06f0\u0647\u0632\u0627\u0631", "\u06f8\u06f0-\u06f9\u06f0\u0647\u0632\u0627\u0631", "\u06f9\u06f0-\u06f1\u06f0\u06f0\u0647\u0632\u0627\u0631", "\u06f1\u06f0\u06f0\u0647\u0632\u0627\u0631+"],
};

function getStatusMessages() {
  const messages = getMessages();
  return messages.status || {
    meta: { title: "Status | TrashVPN", description: "View TrashVPN service load." },
    hero: { iconAlt: "TrashVPN app icon", title: "Service Status", note: "View current service load." },
    loadTitle: "Overall load",
    loading: "Loading...",
    loaded: "Updated just now",
    failed: "Failed to load status. Please try again later.",
    averagePrefix: "Average requests",
    chartLabel: "Request distribution chart",
  };
}

function getApiBase() {
  const hostname = window.location.hostname;
  if (!hostname || hostname === "localhost" || hostname === "127.0.0.1") {
    return LOCAL_API_BASE;
  }
  return PRODUCTION_API_BASE;
}

function getLocaleKey() {
  const locale = document.body?.dataset?.locale || "en";
  if (locale.startsWith("zh")) return "zh";
  if (locale.startsWith("fa")) return "fa";
  return "en";
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getLoadColor(progress) {
  const clamped = clamp(progress, 0, 1);
  const hue = 120 - clamped * 120;
  const lightness = 48 - clamped * 8;
  return `hsl(${hue} 82% ${lightness}%)`;
}

function normalizeDistribution(distribution) {
  const source = Array.isArray(distribution) ? distribution : [];
  return Array.from({ length: 11 }, (_, index) => Number(source[index]?.percentage) || 0);
}

function applyStaticText() {
  const status = getStatusMessages();
  setDocumentMeta(status.meta);

  const title = document.querySelector("[data-status-title]");
  const note = document.querySelector("[data-status-note]");
  const eyebrow = document.querySelector("[data-status-eyebrow]");
  const message = document.querySelector("[data-status-message]");
  const chart = document.querySelector("[data-usage-chart]");
  const meter = document.querySelector("[data-load-meter]");

  if (title) title.textContent = status.hero.title;
  if (note) note.textContent = status.hero.note;
  if (eyebrow) eyebrow.textContent = status.loadTitle;
  if (message) message.textContent = status.loading;
  if (chart) chart.setAttribute("aria-label", status.chartLabel);
  if (meter) meter.setAttribute("aria-label", status.loadTitle);
}

function renderChart(percentages) {
  const chart = document.querySelector("[data-usage-chart]");
  if (!chart) return;

  const labels = RANGE_LABELS[getLocaleKey()] || RANGE_LABELS.en;
  chart.innerHTML = labels.map((label, index) => {
    const percentage = clamp(percentages[index] || 0, 0, 100);
    const dangerClass = index === labels.length - 1 ? " usage-chart__bar--danger" : "";
    return `
      <div class="usage-chart__item">
        <div class="usage-chart__bar-wrap">
          <div class="usage-chart__bar${dangerClass}" style="--target-height: ${percentage}%" data-percentage="${percentage}"></div>
        </div>
        <div class="usage-chart__label">${label}</div>
      </div>
    `;
  }).join("");

  requestAnimationFrame(() => {
    chart.querySelectorAll(".usage-chart__bar").forEach((bar) => {
      if (Number(bar.dataset.percentage || "0") > 0) {
        bar.classList.add("is-visible");
      }
    });
  });
}

function renderLoad(averageUsage) {
  const average = Number(averageUsage) || 0;
  const progress = clamp(average / 100000, 0, 1);
  const color = getLoadColor(progress);

  const loadBar = document.querySelector("[data-load-bar]");
  if (loadBar) {
    loadBar.style.setProperty("--load-color", color);
    loadBar.style.width = "0%";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        loadBar.style.width = `${progress * 100}%`;
      });
    });
  }
}

async function loadStatus() {
  const status = getStatusMessages();
  const message = document.querySelector("[data-status-message]");
  try {
    const response = await fetch(`${getApiBase()}${API_PATH}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    renderLoad(data.average_usage);
    renderChart(normalizeDistribution(data.distribution));
    if (message) message.textContent = status.loaded;
  } catch (error) {
    console.error("Failed to load status", error);
    renderLoad(0);
    renderChart(normalizeDistribution([]));
    if (message) message.textContent = status.failed;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  applyStaticText();
  loadStatus();
});
