// technē — interactions
(function () {
  "use strict";

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav__toggle");
  const nav = document.querySelector(".nav");

  // sticky header style on scroll
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // slide-in drawer
  if (toggle && nav) {
    // backdrop
    const overlay = document.createElement("div");
    overlay.className = "nav-overlay";
    document.body.appendChild(overlay);

    const setOpen = (open) => {
      nav.classList.toggle("is-open", open);
      toggle.classList.toggle("is-open", open);
      overlay.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
      document.body.style.overflow = open ? "hidden" : "";
    };

    toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
    overlay.addEventListener("click", () => setOpen(false));
    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) setOpen(false);
    });
  }

  // staggered reveal for gallery items (sequential fade-up)
  document.querySelectorAll(".gallery-grid").forEach((grid) => {
    Array.prototype.forEach.call(grid.children, (el, i) => {
      el.style.transitionDelay = (i % 8) * 0.09 + "s";
    });
  });

  // scroll reveal
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  // gallery filter
  const filters = document.querySelectorAll(".gallery-filter button");
  const items = document.querySelectorAll(".gallery-item");
  if (filters.length) {
    filters.forEach((btn) =>
      btn.addEventListener("click", () => {
        filters.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        const f = btn.dataset.filter;
        items.forEach((it) => {
          const show = f === "all" || it.dataset.cat === f;
          it.style.display = show ? "" : "none";
        });
      })
    );
  }

  // footer year
  const y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
