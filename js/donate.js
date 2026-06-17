import "./common.js";
import { detectLocale, setDocumentMeta } from "./i18n.js";

const DONATE_COPY = {
  zh: {
    meta: {
      title: "捐赠 | TrashVPN",
      description: "支持 TrashVPN 的免费服务与持续维护。",
    },
    title: "捐赠",
    note: "如果 TrashVPN 对你有帮助，可以通过下面的 USDT 地址支持项目维护。",
    intro: "捐赠完全自愿，不会解锁额外功能，也不会影响免费服务的使用资格。请务必确认网络类型后再转账，转错网络可能无法找回。",
    warning: "请只向以上地址转入对应网络的 USDT。区块链转账通常不可撤销，转账前请仔细核对地址和网络。",
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
    note: "If TrashVPN is useful to you, you can support project maintenance through the USDT addresses below.",
    intro: "Donations are completely voluntary. They do not unlock extra features or change eligibility for the free service. Please confirm the network before sending funds; transfers on the wrong network may be unrecoverable.",
    warning: "Only send USDT on the matching network to the addresses above. Blockchain transfers are usually irreversible, so check the address and network carefully before sending.",
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
    note: "اگر TrashVPN برای شما مفید است، می‌توانید از طریق آدرس‌های USDT زیر از نگهداری پروژه حمایت کنید.",
    intro: "حمایت مالی کاملاً اختیاری است. این کار قابلیت اضافه‌ای باز نمی‌کند و روی امکان استفاده از سرویس رایگان اثری ندارد. لطفاً قبل از انتقال، شبکه را دقیق بررسی کنید؛ انتقال روی شبکه اشتباه ممکن است قابل بازگشت نباشد.",
    warning: "فقط USDT همان شبکه را به آدرس‌های بالا ارسال کنید. انتقال‌های بلاکچین معمولاً برگشت‌ناپذیر هستند، بنابراین قبل از ارسال آدرس و شبکه را با دقت بررسی کنید.",
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
  document.querySelector("[data-donate-note]")?.replaceChildren(copy.note);
  document.querySelector("[data-donate-intro]")?.replaceChildren(copy.intro);
  document.querySelector("[data-donate-warning]")?.replaceChildren(copy.warning);
  document.querySelector("[data-donate-back]")?.replaceChildren(copy.back);
  initCopyButtons(copy);
}

document.addEventListener("DOMContentLoaded", applyDonateCopy);
