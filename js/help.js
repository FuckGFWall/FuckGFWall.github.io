import "./common.js";

document.addEventListener("DOMContentLoaded", () => {
  const articles = [...document.querySelectorAll(".help-article")];
  const links = [...document.querySelectorAll(".help-nav a[href^='#']")];
  if (!articles.length || !links.length) return;

  const defaultId = articles[0].id;
  const articleIds = new Set(articles.map((article) => article.id));

  const selectArticle = (id, updateHash = false) => {
    const selectedId = articleIds.has(id) ? id : defaultId;
    articles.forEach((article) => {
      article.hidden = article.id !== selectedId;
    });
    links.forEach((link) => {
      const selected = link.hash === `#${selectedId}`;
      link.classList.toggle("is-active", selected);
      if (selected) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
    if (updateHash) history.pushState(null, "", `#${selectedId}`);
  };

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      selectArticle(link.hash.slice(1), true);
    });
  });

  window.addEventListener("hashchange", () => selectArticle(location.hash.slice(1)));
  selectArticle(location.hash.slice(1));
});
