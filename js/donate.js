import "./common.js";
import { detectLocale, setDocumentMeta } from "./i18n.js";

const DONATE_COPY = {
  zh: {
    meta: {
      title: "捐赠 | TrashVPN",
      description: "支持 TrashVPN 的免费服务与持续维护。",
    },
    title: "捐赠",
    back: "返回主页",
    copy: "复制",
    copied: "已复制",
    copyFailed: "复制失败",
  },
  en: {
    meta: {
      title: "Donate | TrashVPN",
      description: "Support TrashVPN's free service and ongoing maintenance.",
    },
    title: "Donate",
    back: "Back to Home",
    copy: "Copy",
    copied: "Copied",
    copyFailed: "Copy failed",
  },
  fa: {
    meta: {
      title: "حمایت مالی | TrashVPN",
      description: "از سرویس رایگان و نگهداری مداوم TrashVPN حمایت کنید.",
    },
    title: "حمایت مالی",
    back: "بازگشت به خانه",
    copy: "کپی",
    copied: "کپی شد",
    copyFailed: "کپی نشد",
  },
};

function copyText(text) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }
  const input = document.createElement("textarea");
  input.value = text;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.append(input);
  input.select();
  const ok = document.execCommand("copy");
  input.remove();
  return ok ? Promise.resolve() : Promise.reject(new Error("Copy command failed"));
}

function initCopyButtons(copy) {
  document.querySelectorAll("[data-copy-address]").forEach((button) => {
    if (!(button instanceof HTMLButtonElement)) return;
    button.textContent = copy.copy;
    button.addEventListener("click", async () => {
      const address = button.dataset.copyAddress;
      if (!address) return;
      try {
        await copyText(address);
        button.textContent = copy.copied;
        window.setTimeout(() => {
          button.textContent = copy.copy;
        }, 1400);
      } catch {
        button.textContent = copy.copyFailed;
        window.setTimeout(() => {
          button.textContent = copy.copy;
        }, 1800);
      }
    });
  });
}

function applyDonateCopy() {
  const copy = DONATE_COPY[detectLocale()] || DONATE_COPY.en;
  setDocumentMeta(copy.meta);
  document.querySelector("[data-donate-title]")?.replaceChildren(copy.title);
  document.querySelector("[data-donate-back]")?.replaceChildren(copy.back);
  initCopyButtons(copy);
}

document.addEventListener("DOMContentLoaded", applyDonateCopy);
