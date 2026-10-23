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

  // Print the whole résumé, including the collapsed roles.
  let opened = [];
  addEventListener("beforeprint", () => {
    opened = [...document.querySelectorAll("details:not([open])")];
    opened.forEach((d) => (d.open = true));
  });
  addEventListener("afterprint", () => opened.forEach((d) => (d.open = false)));
})();
