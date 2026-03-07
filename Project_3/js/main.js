const menuBtn = document.getElementById("menu-btn");
const siteNav = document.getElementById("site-nav");
const siteHeader = document.querySelector(".site-header");
const galleryGrid = document.querySelector(".gallery-grid");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");

// Keeps the mobile overlay menu pinned directly under the header
function syncMenuPanelOffset() {
  if (!siteHeader) return;
  if (window.innerWidth > 960) {
    siteNav.style.top = "";
    siteNav.style.maxHeight = "";
    return;
  }

  const headerBottom = Math.ceil(siteHeader.getBoundingClientRect().bottom);
  const menuTop = headerBottom + 8;
  siteNav.style.top = `${menuTop}px`;
  siteNav.style.maxHeight = `calc(100vh - ${menuTop + 10}px)`;
}

function setupMobileMenu() {
  if (!menuBtn || !siteNav) return;

  menuBtn.addEventListener("click", () => {
    syncMenuPanelOffset();
    const isOpen = siteNav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// One-time reveal animation for section panels and cards
function setupFadeIns() {
  const targets = document.querySelectorAll(".fade-in");
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  targets.forEach((el) => observer.observe(el));
}

function setupRegionCardFadeIns() {
  const regionCards = document.querySelectorAll(
    "#wallachia .info-card, #transylvania .info-card, #moldova .info-card"
  );

  regionCards.forEach((card, idx) => {
    card.classList.add("fade-in");
    card.style.transitionDelay = `${(idx % 4) * 0.08}s`;
  });
}

// Subtle desktop-only parallax offset for region images
function setupSubtleParallax() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const targets = Array.from(
    document.querySelectorAll("#wallachia .region-gallery img, #transylvania .region-gallery img, #moldova .region-gallery img")
  );
  if (!targets.length) return;

  targets.forEach((img) => img.classList.add("parallax-target"));

  let ticking = false;

  const update = () => {
    if (window.innerWidth <= 960) {
      targets.forEach((img) => img.style.removeProperty("--parallax-y"));
      ticking = false;
      return;
    }

    const mid = window.innerHeight * 0.5;
    targets.forEach((img) => {
      const rect = img.getBoundingClientRect();
      const delta = (mid - rect.top) * 0.04;
      const clamped = Math.max(-14, Math.min(14, delta));
      img.style.setProperty("--parallax-y", `${clamped.toFixed(2)}px`);
    });
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
}

function openLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt || "Gallery image";
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

// Click image to open, click backdrop/X/Escape to close
function setupGalleryLightbox() {
  if (!galleryGrid || !lightbox || !lightboxImage || !lightboxClose) return;

  galleryGrid.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLImageElement)) return;
    openLightbox(target.src, target.alt);
  });

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("open")) {
      closeLightbox();
    }
  });
}

if (typeof initWeatherWidget === "function") {
  initWeatherWidget();
}

syncMenuPanelOffset();
window.addEventListener("resize", syncMenuPanelOffset);
setupMobileMenu();
setupRegionCardFadeIns();
setupFadeIns();
setupGalleryLightbox();
setupSubtleParallax();
