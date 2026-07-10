const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

const updateHeader = () => {
  header?.classList.toggle("scrolled", window.scrollY > 16);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const closeNav = () => {
  navToggle?.setAttribute("aria-expanded", "false");
  navToggle?.setAttribute("aria-label", "メニューを開く");
  nav?.classList.remove("open");
  document.body.classList.remove("nav-open");
};

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "メニューを開く" : "メニューを閉じる");
  nav?.classList.toggle("open", !isOpen);
  document.body.classList.toggle("nav-open", !isOpen);
});

nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeNav();
});

const appTabs = [...document.querySelectorAll("[data-app-tab]")];
const appPanels = [...document.querySelectorAll("[data-app-panel]")];

appTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const selected = tab.dataset.appTab;

    appTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    appPanels.forEach((panel) => {
      panel.hidden = panel.dataset.appPanel !== selected;
    });
  });
});

const revealItems = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px" },
  );

  revealItems.forEach((item) => observer.observe(item));
}
