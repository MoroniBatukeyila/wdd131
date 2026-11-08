const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");
const menuIcon = menuToggle.querySelector("span");

function setMenuOpen(isOpen) {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu",
  );
  menuIcon.textContent = isOpen ? "×" : "☰";
  primaryNav.classList.toggle("is-open", isOpen);
}

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isExpanded);
});

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent =
  `Last modified: ${new Date(document.lastModified).toLocaleString()}`;

const filters = document.querySelectorAll(".primary-nav a[data-filter]");
const templeFigures = document.querySelectorAll(".temple-gallery figure");

filters.forEach((link) => {
  link.addEventListener("click", () => {
    const filter = link.dataset.filter;

    templeFigures.forEach((figure) => {
      const year = Number(figure.dataset.year);
      const matches =
        filter === "all" ||
        (filter === "old" && year < 1900) ||
        (filter === "new" && year >= 2000) ||
        (filter === "large" && figure.dataset.size === "large") ||
        (filter === "small" && figure.dataset.size === "small");

      figure.hidden = !matches;
    });

    filters.forEach((item) => item.removeAttribute("aria-current"));
    link.setAttribute("aria-current", "page");
    setMenuOpen(false);
  });
});
