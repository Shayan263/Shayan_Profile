(() => {
  "use strict";
  const CONSENT_KEY = "shayanPortfolioAnalyticsConsent";
  const CONSENT_VERSION = 2;
  function readConsent() {
    try {
      const value = JSON.parse(localStorage.getItem(CONSENT_KEY) || "null");
      if (!value || value.version !== CONSENT_VERSION || (value.analytics !== true && value.analytics !== false)) return null;
      return value;
    } catch (_) { return null; }
  }
  let sessionConsent = readConsent();
  function analyticsAllowed() { return Boolean(sessionConsent && sessionConsent.analytics === true); }
  function removeAnalyticsIdentifier() { try { localStorage.removeItem("shayanPortfolioVisitorId"); } catch (_) {} }
  if (!analyticsAllowed()) removeAnalyticsIdentifier();
  function stopOptionalAnalytics() {
    removeAnalyticsIdentifier();
    window.dispatchEvent(new CustomEvent("privacy-analytics-disabled"));
  }
  function hideBanner() { const banner = document.getElementById("privacy-consent-banner"); if (banner) banner.remove(); }
  function renderStatus() {
    const button = document.getElementById("privacy-settings-button");
    if (button) button.textContent = analyticsAllowed() ? "Privacy settings (analytics on)" : "Privacy settings (analytics off)";
  }
  function saveConsent(analytics) {
    sessionConsent = { version: CONSENT_VERSION, analytics: Boolean(analytics), updatedAt: new Date().toISOString() };
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify(sessionConsent)); } catch (_) {}
    if (!analytics) stopOptionalAnalytics();
    window.dispatchEvent(new CustomEvent("privacy-consent-changed", { detail: { analytics: Boolean(analytics) } }));
    renderStatus();
    hideBanner();
  }
  function ensureStyles() {
    if (document.getElementById("privacy-consent-styles")) return;
    const style = document.createElement("style");
    style.id = "privacy-consent-styles";
    style.textContent = [
      "#privacy-consent-banner{position:fixed;z-index:99999;inset:auto 1rem 1rem 1rem;max-width:52rem;margin-inline:auto;padding:1rem;border:1px solid var(--border);border-radius:1rem;background:var(--surface);color:var(--text);box-shadow:0 8px 32px #0003;font:inherit}",
      "#privacy-consent-banner h2{font-size:1.1rem;margin:.1rem 0 .4rem}",
      "#privacy-consent-banner p{margin:.25rem 0 .75rem;line-height:1.5}",
      "#privacy-consent-banner .privacy-actions{display:flex;flex-wrap:wrap;gap:.5rem}",
      "#privacy-consent-banner button,#privacy-settings-button{min-height:44px;padding:.65rem .9rem;border:1px solid var(--border-strong);border-radius:.5rem;background:var(--surface-2);color:var(--text);font:inherit;cursor:pointer}",
      "#privacy-consent-banner button:focus-visible,#privacy-settings-button:focus-visible{outline:3px solid var(--accent);outline-offset:3px}",
      "#privacy-settings-button{margin:.25rem}",
      "@media(max-width:520px){#privacy-consent-banner{inset:auto .5rem .5rem .5rem}#privacy-consent-banner .privacy-actions{display:grid;grid-template-columns:1fr}}",
      "@media(prefers-reduced-motion:reduce){#privacy-consent-banner *{scroll-behavior:auto!important;animation:none!important;transition:none!important}}"
    ].join("");
    document.head.appendChild(style);
  }
  function showBanner(force) {
    ensureStyles();
    if (!force && sessionConsent) { renderStatus(); return; }
    hideBanner();
    const banner = document.createElement("section");
    banner.id = "privacy-consent-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-modal", "false");
    banner.setAttribute("aria-labelledby", "privacy-consent-title");
    banner.setAttribute("aria-describedby", "privacy-consent-description");
    const title = document.createElement("h2");
    title.id = "privacy-consent-title";
    title.textContent = "Your privacy choices";
    const description = document.createElement("p");
    description.id = "privacy-consent-description";
    description.textContent = "Optional analytics measure portfolio visits and interactions. They stay off unless you opt in. Your visitor-category choice is separate and optional.";
    const links = document.createElement("p");
    const privacy = document.createElement("a");
    privacy.href = "privacy.html";
    privacy.textContent = "Privacy Policy";
    const cookies = document.createElement("a");
    cookies.href = "cookie-policy.html";
    cookies.textContent = "Cookie Policy";
    links.append(privacy, document.createTextNode(" · "), cookies);
    const actions = document.createElement("div");
    actions.className = "privacy-actions";
    const accept = document.createElement("button");
    accept.type = "button";
    accept.textContent = "Accept analytics";
    accept.addEventListener("click", () => saveConsent(true));
    const reject = document.createElement("button");
    reject.type = "button";
    reject.textContent = "Reject analytics";
    reject.addEventListener("click", () => saveConsent(false));
    const continueButton = document.createElement("button");
    continueButton.type = "button";
    continueButton.textContent = "Continue without analytics";
    continueButton.addEventListener("click", () => saveConsent(false));
    actions.append(accept, reject, continueButton);
    banner.append(title, description, links, actions);
    document.body.appendChild(banner);
    accept.focus();
  }
  function installSettingsButton() {
    let button = document.getElementById("privacy-settings-button");
    if (!button) {
      button = document.createElement("button");
      button.type = "button";
      button.id = "privacy-settings-button";
      const footer = document.querySelector("footer");
      if (footer) footer.appendChild(button);
      else document.body.appendChild(button);
    }
    button.addEventListener("click", () => showBanner(true));
    renderStatus();
  }
  window.ShayanPrivacy = Object.freeze({
    analyticsAllowed,
    getConsent: () => sessionConsent,
    openSettings: () => showBanner(true)
  });
  document.addEventListener("DOMContentLoaded", () => {
    installSettingsButton();
    if (!sessionConsent) showBanner(false);
  });
})();
