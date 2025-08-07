gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// create the scrollSmoother before your scrollTriggers
ScrollSmoother.create({
  smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
  effects: true, // looks for data-speed and data-lag attributes on elements
  smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
});

// Sistema de scroll suave sem remover o scroll nativo
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    this.setupSmoothLinks();
    this.setupKeyboardScroll();
    this.setupMouseScroll();
  }

  setupSmoothLinks() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          const targetPosition = target.offsetTop - 100;
          this.smoothScrollTo(targetPosition);
        }
      });
    });
  }

  setupKeyboardScroll() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        this.smoothScrollBy(200);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        this.smoothScrollBy(-200);
      }
    });
  }

  setupMouseScroll() {
    let isScrolling = false;
    let scrollTimeout;
    window.addEventListener("scroll", () => {
      if (!isScrolling) {
        isScrolling = true;
        document.body.classList.add("is-scrolling");
      }
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        document.body.classList.remove("is-scrolling");
      }, 150);
    });
  }

  smoothScrollTo(targetY) {
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    const duration = 1000;
    let start = null;
    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = this.easeInOutCubic(timeElapsed, startY, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);
  }

  smoothScrollBy(distance) {
    const startY = window.pageYOffset;
    const targetY = startY + distance;
    this.smoothScrollTo(targetY);
  }

  easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
  }
}

// Arquivo para interatividade do site Herculion
document.addEventListener("DOMContentLoaded", () => {
  new SmoothScroll();

  const menuButton = document.querySelector(".menu-button");
  const closeButton = document.querySelector("#close-btn");
  const sideMenu = document.querySelector("#side-menu");
  const header = document.querySelector(".header");
  const body = document.body;

  function openMenu() {
    sideMenu.classList.add("open");
    body.classList.add("no-scroll");
  }

  function closeMenu() {
    sideMenu.classList.remove("open");
    body.classList.remove("no-scroll");
  }

  menuButton.addEventListener("click", openMenu);
  closeButton.addEventListener("click", closeMenu);
  sideMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (
      !sideMenu.contains(event.target) &&
      !menuButton.contains(event.target) &&
      sideMenu.classList.contains("open")
    ) {
      closeMenu();
    }
  });

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
  });

  // --- Lógica do Carrossel com Swiper.js ---
  const cars = [
    {
      id: "lamborghini-urus",
      mainImage: "assets/images/carros/lamborghini_urus.png",
      bgText: "assets/images/urus_nome.png",
      alt: "Lamborghini Urus",
      size: {
        car: { width: "auto", height: "75%", maxHeight: "400px" },
        text: {
          width: "55%",
          maxWidth: "55%",
          height: "100%",
          position: { top: "0%", left: "0", transform: "translate(0%, -10%)" },
        },
      },
      route: "carros/lamborghini-urus.html",
    },
    {
      id: "bugatti-chiron",
      mainImage: "assets/images/carros/bugatti_chiron.png",
      bgText: "assets/images/chiron_nome.png",
      alt: "Bugatti Chiron",
      size: {
        car: { width: "auto", height: "85%", maxHeight: "350px" },
        text: {
          width: "50%",
          maxWidth: "40%",
          height: "40%",
          position: { top: "0", left: "0", transform: "translate(0%, 30%)" },
        },
      },
      route: "carros/bugatti-chiron.html",
    },
    {
      id: "porsche-911",
      mainImage: "assets/images/carros/porsche_911.png",
      bgText: "assets/images/911_nome.png",
      alt: "Porsche 911",
      size: {
        car: { width: "auto", height: "65%", maxHeight: "380px" },
        text: {
          width: "25%",
          maxWidth: "25%",
          height: "auto",
          position: { top: "40%", left: "0%", transform: "translate(0%, 80%)" },
        },
      },
      route: "carros/porsche-911.html",
    },
    {
      id: "ferrari-roma",
      mainImage: "assets/images/carros/ferrari_roma.png",
      bgText: "assets/images/roma_nome.png",
      alt: "Ferrari Roma",
      size: {
        car: { width: "auto", height: "65%", maxHeight: "380px" },
        text: {
          width: "25%",
          maxWidth: "25%",
          height: "auto",
          position: { top: "40%", left: "0%", transform: "translate(0%, 10%)" },
        },
      },
      route: "carros/ferrari-roma.html",
    },
    {
      id: "mclaren-720s",
      mainImage: "assets/images/carros/mclaren_720s.png",
      bgText: "assets/images/720s_nome.png",
      alt: "Mclaren 720s",
      size: {
        car: { width: "auto", height: "65%", maxHeight: "380px" },
        text: {
          width: "40%",
          maxWidth: "40%",
          height: "auto",
          position: { top: "40%", left: "0%", transform: "translate(0, 35%)" },
        },
      },
      route: "carros/mclaren-720s.html",
    },
  ];

  function applyResponsiveSizes(car, element, type) {
    const screenWidth = window.innerWidth;
    let sizeConfig = car.size[type];
    let adjustments = {};

    if (screenWidth <= 480) {
      adjustments =
        type === "car"
          ? { maxHeight: "200px" }
          : {
              maxWidth: "300px",
              maxHeight: "400px",
              position: { ...sizeConfig.position, top: "25%" },
            };
    } else if (screenWidth <= 768) {
      adjustments =
        type === "car"
          ? { maxHeight: "250px" }
          : {
              maxWidth: "450px",
              maxHeight: "500px",
              position: { ...sizeConfig.position, top: "20%" },
            };
    } else if (screenWidth <= 992) {
      adjustments =
        type === "car"
          ? { maxHeight: "300px" }
          : {
              maxWidth: "600px",
              maxHeight: "600px",
              position: { ...sizeConfig.position, top: "18%" },
            };
    } else if (screenWidth <= 1200) {
      adjustments =
        type === "car"
          ? { maxHeight: "350px" }
          : {
              maxWidth: "750px",
              maxHeight: "700px",
              position: { ...sizeConfig.position, top: "15%" },
            };
    }

    const finalConfig = { ...sizeConfig, ...adjustments };
    const { position, ...styles } = finalConfig;
    Object.assign(element.style, styles);
    if (position && type === "text") {
      Object.assign(element.style, position);
    }
  }

  function updateCarDetails(swiper) {
    const currentCar = cars[swiper.realIndex];
    const bgTextContainer = document.querySelector(
      ".car-background-text-container"
    );

    // Limpa o container de fundo
    bgTextContainer.innerHTML = "";

    // Adiciona a imagem de fundo do título do carro atual
    if (currentCar.bgText) {
      const bgImage = document.createElement("img");
      bgImage.src = currentCar.bgText;
      bgImage.alt = currentCar.alt + " background text";
      bgImage.className = "car-bg-text";

      // Aplica estilos específicos para cada carro, se definidos
      if (currentCar.size && currentCar.size.text) {
        const textStyle = currentCar.size.text;
        Object.assign(bgImage.style, {
          width: textStyle.width || "auto",
          height: textStyle.height || "auto",
          maxWidth: textStyle.maxWidth || "none",
          maxHeight: textStyle.maxHeight || "none",
          top: textStyle.position?.top || "50%",
          left: textStyle.position?.left || "50%",
          transform: textStyle.position?.transform || "translate(-50%, -50%)",
          opacity: "0.7",
        });
      }

      bgTextContainer.appendChild(bgImage);
    }

    const activeSlide = swiper.slides[swiper.activeIndex];
    const mainCarEl = activeSlide.querySelector("img");
    if (mainCarEl) applyResponsiveSizes(currentCar, mainCarEl, "car");

    const currentBgText = bgTextContainer.querySelector("img");
    if (currentBgText) {
      currentBgText.style.opacity = "0";
      setTimeout(() => {
        bgTextContainer.innerHTML = `<img src="${currentCar.bgText}" alt="${currentCar.alt} text" style="opacity: 0;">`;
        const newBgText = bgTextContainer.querySelector("img");
        if (newBgText) {
          applyResponsiveSizes(currentCar, newBgText, "text");
          newBgText.onload = () => {
            newBgText.style.opacity = "1";
          };
          if (newBgText.complete) newBgText.style.opacity = "1";
        }
      }, 300);
    } else {
      bgTextContainer.innerHTML = `<img src="${currentCar.bgText}" alt="${currentCar.alt} text">`;
      const newBgText = bgTextContainer.querySelector("img");
      if (newBgText) applyResponsiveSizes(currentCar, newBgText, "text");
    }
  }

  function initCarousel() {
    const swiperWrapper = document.querySelector(".swiper-wrapper");
    if (!swiperWrapper) return;

    // Limpa o wrapper antes de adicionar novos slides
    swiperWrapper.innerHTML = "";

    // Adiciona os slides dos carros
    cars.forEach((car) => {
      const slide = document.createElement("a");
      slide.className = "swiper-slide";
      slide.href = car.route;
      slide.innerHTML = `
        <div class="slide-content">
          <img src="${car.mainImage}" alt="${car.alt}">
        </div>
      `;
      swiperWrapper.appendChild(slide);
    });

    // Inicializa o Swiper
    const swiper = new Swiper(".car-swiper", {
      effect: "coverflow",
      grabCursor: false,
      centeredSlides: true,
      slidesPerView: "auto",
      loop: true,
      speed: 800,
      coverflowEffect: {
        rotate: 0,
        stretch: -200,
        depth: 200,
        modifier: 2,
        slideShadows: false,
      },
      navigation: {
        nextEl: ".slider-button.next",
        prevEl: ".slider-button.prev",
      },
      on: {
        init: function () {
          updateCarDetails(this);
        },
        slideChange: function () {
          updateCarDetails(this);
        },
      },
    });

    // Atualiza os tamanhos ao redimensionar a janela
    window.addEventListener("resize", () => {
      swiper.update();
      updateCarDetails(swiper);
    });
  }

  initCarousel();
});

// === EFEITOS DE SCROLL (index + quem somos) ===
document.addEventListener("DOMContentLoaded", () => {
  const revealSelectors = [
    ".reveal",
    ".reveal-gold",
    ".reveal-line",
    ".reveal-zoom",
    ".reveal-count",
  ];
  const reveals = document.querySelectorAll(revealSelectors.join(","));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          if (entry.target.classList.contains("reveal-count")) {
            animateCount(entry.target);
          }
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  reveals.forEach((el) => observer.observe(el));

  const carShowcase = document.querySelector(".car-showcase");
  if (carShowcase) {
    window.addEventListener("scroll", () => {
      const rect = carShowcase.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        const scrollPercent =
          (windowHeight - rect.top) / (windowHeight + rect.height);
        carShowcase.style.backgroundPosition = `center ${
          40 + scrollPercent * 20
        }%`;
      }
    });
  }
});

function animateCount(el) {
  const target = parseInt(
    el.getAttribute("data-count") || el.textContent.replace(/\D/g, "")
  );
  if (isNaN(target)) return;
  let start = 0;
  const duration = 1200;
  const step = (timestamp, startTime) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = value.toLocaleString();
    if (progress < 1) {
      requestAnimationFrame((ts) => step(ts, startTime));
    } else {
      el.textContent = target.toLocaleString();
    }
  };
  requestAnimationFrame(step);
}
