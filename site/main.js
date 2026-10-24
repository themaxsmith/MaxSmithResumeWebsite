// Small progressive enhancements. The page works without this file.
(() => {
  // Email is assembled here so the address isn't sitting in the HTML for scrapers.
  const address = ["totems.augers-42", "icloud.com"].join("@");  // Hide My Email relay, forwards to Max
  for (const link of document.querySelectorAll(".js-email")) {
    link.href = "mailto:" + address;
    const text = link.querySelector(".email-text");
    if (text) text.textContent = address;
  }
})();
