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

  // Local time in Mountain View, updated on the minute.
  const clock = document.querySelector(".clock");
  if (clock) {
    const format = new Intl.DateTimeFormat("en-US", {
      hour: "numeric", minute: "2-digit", timeZone: "America/Los_Angeles", timeZoneName: "short",
    });
    const tick = () => {
      clock.textContent = format.format(new Date());
      setTimeout(tick, 60000 - (Date.now() % 60000) + 50);
    };
    tick();
  }
})();
