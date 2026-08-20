(function () {
  "use strict";

  var targets = document.querySelectorAll(
    ".feature-card, .region-chip, .step-card, .faq-item, .showcase-item, .section-head"
  );
  if (!targets.length) return;

  if (
    !("IntersectionObserver" in window) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    // No support / user disabled motion — CSS fallback rule (html.no-reveal-js)
    // keeps everything visible without needing scroll-triggered classes.
    document.documentElement.classList.add("no-reveal-js");
    return;
  }

  // Stagger siblings within the same grid/list by setting --reveal-i,
  // capped so a long list (eg region-grid) doesn't end in a multi-second
  // delay for the last items.
  var counters = new WeakMap();
  targets.forEach(function (el) {
    var parent = el.parentElement;
    var i = counters.get(parent) || 0;
    el.style.setProperty("--reveal-i", i % 8);
    counters.set(parent, i + 1);
  });

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  targets.forEach(function (el) { io.observe(el); });
})();
