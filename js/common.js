const SITE_ROUTES = [
  { href: "index.html", label: "主界面" },
  { href: "download.html", label: "下载" },
  { href: "about.html", label: "关于" },
];

const SOCIAL_LINKS = [
  {
    href: "https://www.youtube.com/@TrashVPN",
    label: "YouTube",
    icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.6 7.2s-.2-1.5-.8-2.2c-.7-.8-1.5-.8-1.9-.9-2.6-.2-6.5-.2-6.5-.2h-.1s-3.9 0-6.5.2c-.4 0-1.2.1-1.9.9-.6.7-.8 2.2-.8 2.2S3 9 3 10.8v1.5c0 1.8.2 3.6.2 3.6s.2 1.5.8 2.2c.7.8 1.6.7 2 .8 1.5.1 6.3.2 6.3.2s3.9 0 6.5-.2c.4 0 1.2-.1 1.9-.9.6-.7.8-2.2.8-2.2s.2-1.8.2-3.6v-1.5c0-1.8-.2-3.6-.2-3.6ZM9.9 14.9V9.4l5.1 2.7-5.1 2.8Z"/></svg>`,
  },
  {
    href: "https://x.com/trashvpn",
    label: "X",
    icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.98 3.5h-3.2l-4.07 5.6-4.6-5.6H3.03l7.2 8.66-6.5 8.34h3.18l4.43-6.07 5 6.07h6.27l-7.7-9.42 6.07-7.58ZM17.22 19l-2.98-3.63-1.5-1.84-4.95 6.47H5.9l5.26-6.69.18-.23L6.48 5.02h2.25l3.12 3.83 1.53 1.88 4.3-5.71h1.9l-4.78 5.97-.2.24 4.72 5.77h-2.31Z"/></svg>`,
  },
  {
    href: "https://t.me/+eJ2kUZ3kUJ9jZmNl",
    label: "Telegram",
    icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.8 4.2c-.5-.4-1.3-.4-2-.2l-16 6.1c-.7.3-1.1.8-1.1 1.4 0 .6.4 1.1 1.1 1.3l3.9 1.2 1.5 4.7c.2.6.7 1 1.4 1h.1c.6 0 1.1-.3 1.4-.8l2.1-3.4 4.1 3.3c.3.2.6.3 1 .3.3 0 .6-.1.9-.2.5-.3.8-.7.9-1.3l2.1-10.9c.2-.8-.1-1.5-.6-1.9Zm-2.7 1.4-8.5 7.2c-.2.1-.3.4-.3.6l.4 3-1.2-3.6c-.1-.2-.3-.4-.6-.5l-3.4-1.1 13.6-5.6Z"/></svg>`,
  },
  {
    href: "https://github.com/FuckGFWall",
    label: "GitHub",
    icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.4 6.9 9.8.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.4-3.4-1.4-.4-1.1-1-1.4-1-1.4-.8-.6.1-.6.1-.6.9.1 1.3.9 1.3.9.8 1.4 2.1 1 2.6.8.1-.6.3-1 .6-1.3-2.2-.3-4.4-1.1-4.4-4.9 0-1.1.4-2 .9-2.7-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.8 1 .8-.2 1.7-.3 2.6-.3s1.8.1 2.6.3c2-1.3 2.8-1 2.8-1 .5 1.3.2 2.3.1 2.6.6.7.9 1.6.9 2.7 0 3.8-2.3 4.6-4.4 4.9.3.3.7.9.7 1.8v2.6c0 .3.2.6.7.5 4-1.4 6.9-5.3 6.9-9.8C22 6.6 17.5 2 12 2Z"/></svg>`,
  },
];

const SOCIAL_REL = "noopener noreferrer";

function resolveActiveHref() {
  const pageKey = document.body?.dataset?.page;
  if (pageKey) {
    if (pageKey === "home" || pageKey === "index") return "index.html";
    return `${pageKey}.html`;
  }
  const path = window.location.pathname.toLowerCase();
  if (path.endsWith("download.html")) return "download.html";
  if (path.endsWith("about.html")) return "about.html";
  return "index.html";
}

function isHomeRoute() {
  const activeHref = resolveActiveHref();
  return activeHref === "index.html";
}

function buildHeader() {
  const activeHref = resolveActiveHref();
  return `
    <div class="container site-header__inner">
      <a class="site-logo" href="index.html">
        <img src="assests/icon.PNG" alt="TrashVPN 图标">
        <span>TrashVPN</span>
      </a>
      <button class="nav-toggle" type="button" aria-label="展开菜单">
        <span class="nav-toggle__icon"></span>
      </button>
      <nav class="site-nav" aria-label="主导航">
        <ul class="site-nav__list">
          ${SITE_ROUTES.map((route) => {
            const active = route.href.toLowerCase() === activeHref;
            const isActive = active ? " is-active" : "";
            const ariaCurrent = isActive ? ' aria-current="page"' : "";
            return `<li><a class="site-nav__link${isActive}" href="${route.href}"${ariaCurrent}>${route.label}</a></li>`;
          }).join("")}
        </ul>
      </nav>
    </div>
  `;
}

function buildFooter() {
  return `
    <div class="container footer__inner">
      <div class="social-links" aria-label="社交媒体">
        ${SOCIAL_LINKS.map(
          (link) => `
            <a class="social-link" href="${link.href}" target="_blank" rel="${SOCIAL_REL}" aria-label="${link.label}">
              ${link.icon}
            </a>
          `
        ).join("")}
      </div>
      <p class="footer__copy">© ${new Date().getFullYear()} TrashVPN 保留所有权利。</p>
    </div>
  `;
}

function initNavigation() {
  const header = document.querySelector("#site-header");
  const footer = document.querySelector("#site-footer");

  if (header) {
    header.classList.add("site-header");
    header.innerHTML = buildHeader();
  }

  if (footer) {
    footer.classList.add("footer");
    footer.innerHTML = buildFooter();
  }

  const toggleButton = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (toggleButton && nav) {
    toggleButton.setAttribute("aria-expanded", "false");
    toggleButton.addEventListener("click", () => {
      document.body.classList.toggle("nav-open");
      const expanded = document.body.classList.contains("nav-open");
      toggleButton.setAttribute("aria-expanded", expanded);
    });

    nav.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.matches(".site-nav__link")) {
        document.body.classList.remove("nav-open");
        toggleButton.setAttribute("aria-expanded", "false");
        if (isHomeRoute() && target.getAttribute("href") === "index.html") {
          event.preventDefault();
          const main = document.querySelector("#main");
          main?.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  }
}

function initScrollAnimations() {
  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  if (!revealElements.length || "IntersectionObserver" in window === false) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initScrollAnimations();
});

export { initScrollAnimations };
