import "./common.js";
import { getMessages, setDocumentMeta } from "./i18n.js";

document.addEventListener("DOMContentLoaded", () => {
  const { download } = getMessages();
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
});
