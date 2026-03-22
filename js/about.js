import "./common.js";
import { getMessages, setDocumentMeta } from "./i18n.js";

document.addEventListener("DOMContentLoaded", () => {
  const { about } = getMessages();
  setDocumentMeta(about.meta);
  const markdown = document.querySelector(".markdown-body");
  if (markdown) markdown.innerHTML = about.body;
});
