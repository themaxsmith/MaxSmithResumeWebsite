// Small progressive enhancements. The page works without this file.
(() => {
  // Email is assembled here so the address isn't sitting in the HTML for scrapers.
  const address = ["themaxsmith", "icloud.com"].join("@");
  for (const link of document.querySelectorAll(".js-email")) {
    link.href = "mailto:" + address;
    const text = link.querySelector(".email-text");
    if (text) text.textContent = address;
  }

  const year = document.querySelector(".js-year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Paddles for the photo row: step two photos at a time, disabled at either end.
  const gallery = document.querySelector(".gallery");
  const paddles = document.querySelector(".paddles");
  if (gallery && paddles) {
    const [prev, next] = paddles.querySelectorAll(".paddle");
    const step = () => {
      const li = gallery.querySelector("li");
      return li ? (li.getBoundingClientRect().width + 12) * 2 : gallery.clientWidth * 0.8;
    };
    const sync = () => {
      const max = gallery.scrollWidth - gallery.clientWidth - 2;
      paddles.hidden = max <= 0;
      prev.disabled = gallery.scrollLeft <= 2;
      next.disabled = gallery.scrollLeft >= max;
    };
    paddles.addEventListener("click", (e) => {
      const b = e.target.closest(".paddle");
      if (b) gallery.scrollBy({ left: step() * Number(b.dataset.dir), behavior: "smooth" });
    });
    gallery.addEventListener("scroll", sync, { passive: true });
    addEventListener("resize", sync);
    sync();
  }
})();
