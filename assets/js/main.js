"use strict";

(() => {
  const config = window.PROJECT_CONFIG || {};
  const safeUrl = (value) => {
    if (typeof value !== "string" || !value.trim()) return null;
    try {
      const url = new URL(value, document.baseURI);
      return ["http:", "https:", "file:"].includes(url.protocol) ? url.href : null;
    } catch { return null; }
  };

  const codeUrl = safeUrl(config.codeUrl);
  if (codeUrl) {
    const link = document.createElement("a");
    link.href = codeUrl;
    link.className = "button button-outline";
    link.textContent = "Code ↗";
    link.target = "_blank";
    link.rel = "noopener";
    document.getElementById("code-link")?.replaceWith(link);
  }

  const updateSectionStatus = (section) => {
    const total = section.querySelectorAll("[data-video]").length;
    const ready = section.querySelectorAll("[data-video][data-ready]").length;
    section.querySelector(".status-pill").textContent = ready === 0
      ? "Videos coming soon" : ready === total ? "Video demonstrations" : `${ready} of ${total} videos available`;
  };

  document.querySelectorAll("[data-video]").forEach((card) => {
    const item = (config.videos || {})[card.dataset.video];
    const src = safeUrl(item?.src);
    if (!src) return;
    const stage = card.querySelector(".video-stage");
    const placeholder = stage.querySelector(".video-placeholder");
    const message = placeholder.querySelector("span:last-child");
    message.textContent = "Loading video…";
    const video = document.createElement("video");
    video.controls = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.setAttribute("aria-label", placeholder.querySelector("strong").textContent + " driving demonstration");
    const poster = safeUrl(item.poster);
    if (poster) video.poster = poster;
    video.hidden = true;
    video.addEventListener("loadedmetadata", () => {
      if (video.videoWidth && video.videoHeight) {
        stage.style.aspectRatio = `${video.videoWidth} / ${video.videoHeight}`;
      }
      video.hidden = false;
      placeholder.hidden = true;
      card.dataset.ready = "true";
      updateSectionStatus(card.closest("section"));
    });
    video.addEventListener("error", () => {
      video.hidden = true;
      placeholder.hidden = false;
      message.textContent = "Video unavailable. Please check back later.";
      delete card.dataset.ready;
      updateSectionStatus(card.closest("section"));
    });
    video.src = src;
    stage.append(video);
  });

})();
