// Sistema de scroll suave sem remover o scroll nativo
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    // Configurar scroll suave para links internos
    this.setupSmoothLinks();
    
    // Configurar scroll suave para teclado
    this.setupKeyboardScroll();
    
    // Adicionar suavidade ao scroll do mouse
    this.setupMouseScroll();
  }

  setupSmoothLinks() {
    // Links de navegação suave
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          const targetPosition = target.offsetTop - 100; // Offset para o header
          this.smoothScrollTo(targetPosition);
        }
      });
    });
  }

  setupKeyboardScroll() {
    // Scroll com teclado mais suave
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        this.smoothScrollBy(200);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        this.smoothScrollBy(-200);
      }
    });
  }

  setupMouseScroll() {
    // Adicionar suavidade ao scroll do mouse
    let isScrolling = false;
    let scrollTimeout;

    window.addEventListener('scroll', () => {
      if (!isScrolling) {
        isScrolling = true;
        document.body.classList.add('is-scrolling');
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        document.body.classList.remove('is-scrolling');
      }, 150);
    });
  }

  smoothScrollTo(targetY) {
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    const duration = 1000; // 1 segundo
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
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
  }
}

// Inicializar scroll suave
let smoothScroll;

// Arquivo para interatividade do site Herculion
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar scroll suave
  smoothScroll = new SmoothScroll();
  
  const menuButton = document.querySelector('.menu-button');
  const closeButton = document.querySelector('#close-btn');
  const sideMenu = document.querySelector('#side-menu');
  const header = document.querySelector('.header');
  const body = document.body;

  function openMenu() {
    sideMenu.classList.add('open');
    body.classList.add('no-scroll');
  }

  function closeMenu() {
    sideMenu.classList.remove('open');
    body.classList.remove('no-scroll');
  }

  // Abrir menu
  menuButton.addEventListener('click', openMenu);

  // Fechar menu
  closeButton.addEventListener('click', closeMenu);

  // Fechar ao clicar em um link (para navegação na página)
  sideMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Fechar ao clicar fora do menu
  document.addEventListener('click', (event) => {
    const isClickInsideMenu = sideMenu.contains(event.target);
    const isClickOnMenuButton = menuButton.contains(event.target);

    if (!isClickInsideMenu && !isClickOnMenuButton && sideMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  // Efeito de scroll no header (volta ao sistema nativo)
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Função helper para criar configurações de carro personalizadas
  function createCarConfig(mainImage, bgText, alt, carSize, textSize, textPosition) {
    return {
      mainImage,
      bgText,
      textWidth: "100px",
      alt,
      size: {
        car: carSize,
        text: {
          ...textSize,
          position: textPosition
        }
      }
    };
  }

  // Exemplo de como usar a função helper:
  // const urusConfig = createCarConfig(
  //   'assets/images/v13_16.png',
  //   'assets/images/urus_nome.png',
  //   'Lamborghini Urus',
  //   { width: 'auto', height: '50%', maxHeight: '400px' },
  //   { width: '100%', maxWidth: '100%', height: '700px', maxHeight: '700px' },
  //   { top: '10%', left: '50%', transform: 'translate(-50%, -50%)' }
  // );

  // --- Lógica do Carrossel ---
  // Dados dos carros do carrossel (carousel-cars.json)
  let cars = [
    {
      id: "lamborghini-urus",
      mainImage: "assets/images/v13_16.png",
      bgText: "assets/images/urus_nome.png",
      textWidth: "100px",
      alt: "Lamborghini Urus",
      brand: "Lamborghini",
      model: "Urus",
      year: 2024,
      price: "R$ 2.5M",
      description: "O SUV mais rápido do mundo",
      size: {
        car: { width: "auto", height: "50%", maxHeight: "400px" },
        text: {
          width: "100%", maxWidth: "100%", height: "700px", maxHeight: "700px",
          position: { top: "10%", left: "50%", transform: "translate(-50%, -50%)" }
        }
      }
    },
    {
      id: "bugatti-chiron",
      mainImage: "assets/images/v14_22.png",
      bgText: "assets/images/chiron_nome.png",
      textWidth: "100px",
      alt: "Bugatti Chiron",
      brand: "Bugatti",
      model: "Chiron",
      year: 2024,
      price: "R$ 15M",
      description: "A velocidade redefinida",
      size: {
        car: { width: "auto", height: "75%", maxHeight: "450px" },
        text: {
          width: "100%", maxWidth: "700px", height: "auto", maxHeight: "800px",
          position: { top: "15%", left: "50%", transform: "translate(-50%, -50%)" }
        }
      }
    },
    {
      id: "porsche-911",
      mainImage: "assets/images/v15_23.png",
      bgText: "assets/images/911_nome.png",
      textWidth: "100px",
      alt: "Porsche 911",
      brand: "Porsche",
      model: "911",
      year: 2024,
      price: "R$ 1.2M",
      description: "O esportivo definitivo",
      size: {
        car: { width: "auto", height: "65%", maxHeight: "380px" },
        text: {
          width: "100%", maxWidth: "350px", height: "auto", maxHeight: "300px",
          position: { top: "40%", left: "50%", transform: "translate(-50%, -50%)" }
        }
      }
    }
  ];

  // Função para carregar carros vendidos (estoque)
  async function loadVendidos() {
    try {
      const response = await fetch('json/vendidos.json');
      if (!response.ok) throw new Error('Erro ao carregar estoque de carros');
      const vendidos = await response.json();
      return vendidos;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  const carImagesContainer = document.querySelector('.car-images-container');
  const mainCarEl = document.querySelector('.main-car');
  const leftCarEl = document.querySelector('.side-car.left');
  const rightCarEl = document.querySelector('.side-car.right');
  const bgTextContainer = document.querySelector('.car-background-text-container');
  const prevButton = document.querySelector('.slider-button.prev');
  const nextButton = document.querySelector('.slider-button.next');

  let currentIndex = 0;
  let isAnimating = false;
  const animationDuration = 600;

  // Função para aplicar tamanhos e posicionamento responsivos
  function applyResponsiveSizes(car, element, type) {
    const screenWidth = window.innerWidth;
    let sizeConfig = car.size[type];
    
    // Ajusta tamanhos baseado na tela
    if (screenWidth <= 480) {
      if (type === 'car') {
        sizeConfig = { ...sizeConfig, maxHeight: '200px' };
      } else if (type === 'text') {
        sizeConfig = { 
          ...sizeConfig, 
          maxWidth: '300px',
          maxHeight: '400px',
          position: {
            ...sizeConfig.position,
            top: '25%'
          }
        };
      }
    } else if (screenWidth <= 768) {
      if (type === 'car') {
        sizeConfig = { ...sizeConfig, maxHeight: '250px' };
      } else if (type === 'text') {
        sizeConfig = { 
          ...sizeConfig, 
          maxWidth: '450px',
          maxHeight: '500px',
          position: {
            ...sizeConfig.position,
            top: '20%'
          }
        };
      }
    } else if (screenWidth <= 992) {
      if (type === 'car') {
        sizeConfig = { ...sizeConfig, maxHeight: '300px' };
      } else if (type === 'text') {
        sizeConfig = { 
          ...sizeConfig, 
          maxWidth: '600px',
          maxHeight: '600px',
          position: {
            ...sizeConfig.position,
            top: '18%'
          }
        };
      }
    } else if (screenWidth <= 1200) {
      if (type === 'car') {
        sizeConfig = { ...sizeConfig, maxHeight: '350px' };
      } else if (type === 'text') {
        sizeConfig = { 
          ...sizeConfig, 
          maxWidth: '750px',
          maxHeight: '700px',
          position: {
            ...sizeConfig.position,
            top: '15%'
          }
        };
      }
    }
    
    // Aplica os estilos
    if (sizeConfig) {
      const { position, ...styles } = sizeConfig;
      Object.assign(element.style, styles);
      
      if (position && type === 'text') {
        Object.assign(element.style, position);
      }
    }
  }

  function updateCarouselSources() {
    const totalCars = cars.length;
    const prevIndex = (currentIndex - 1 + totalCars) % totalCars;
    const nextIndex = (currentIndex + 1) % totalCars;

    // Atualiza as imagens dos carros
    mainCarEl.src = cars[currentIndex].mainImage;
    mainCarEl.alt = cars[currentIndex].alt;
    leftCarEl.src = cars[prevIndex].mainImage;
    leftCarEl.alt = cars[prevIndex].alt;
    rightCarEl.src = cars[nextIndex].mainImage;
    rightCarEl.alt = cars[nextIndex].alt;

    // Aplica os tamanhos personalizados do carro atual
    const currentCar = cars[currentIndex];
    if (currentCar.size) {
      if (currentCar.size.car) {
        applyResponsiveSizes(currentCar, mainCarEl, 'car');
      }
      
      if (currentCar.size.text) {
        const bgTextImg = bgTextContainer.querySelector('img');
        if (bgTextImg && currentCar.size.text) {
          applyResponsiveSizes(currentCar, bgTextImg, 'text');
        }
      }
    }

    // Atualiza o texto de fundo com transição suave
    const currentBgText = bgTextContainer.querySelector('img');
    if (currentBgText) {
      currentBgText.style.opacity = '0';
      setTimeout(() => {
        bgTextContainer.innerHTML = `<img src="${cars[currentIndex].bgText}" alt="${cars[currentIndex].alt} text" style="opacity: 0;">`;
        const newBgText = bgTextContainer.querySelector('img');
        if (newBgText) {
          if (currentCar.size && currentCar.size.text) {
            applyResponsiveSizes(currentCar, newBgText, 'text');
          }
          
          newBgText.onload = () => {
            newBgText.style.opacity = '1';
          };
          if (newBgText.complete) {
            newBgText.style.opacity = '1';
          }
        }
      }, 300);
    } else {
      bgTextContainer.innerHTML = `<img src="${cars[currentIndex].bgText}" alt="${cars[currentIndex].alt} text">`;
      const newBgText = bgTextContainer.querySelector('img');
      if (newBgText && currentCar.size && currentCar.size.text) {
        applyResponsiveSizes(currentCar, newBgText, 'text');
      }
    }
  }

  function slide(direction) {
    if (isAnimating) return;
    isAnimating = true;

    const totalCars = cars.length;
    let nextIndex;
    
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % totalCars;
    } else {
      nextIndex = (currentIndex - 1 + totalCars) % totalCars;
    }

    // Adiciona a classe de animação
    carImagesContainer.classList.add(`slide-${direction}`);

    // Após a animação, atualiza o estado
    setTimeout(() => {
      currentIndex = nextIndex;
      updateCarouselSources();
      carImagesContainer.classList.remove(`slide-${direction}`);
      isAnimating = false;
    }, animationDuration);
  }

  prevButton.addEventListener('click', () => slide('prev'));
  nextButton.addEventListener('click', () => slide('next'));

  // Listener para redimensionamento da janela
  window.addEventListener('resize', () => {
    const currentCar = cars[currentIndex];
    if (currentCar && currentCar.size) {
      if (currentCar.size.car) {
        applyResponsiveSizes(currentCar, mainCarEl, 'car');
      }
      const bgTextImg = bgTextContainer.querySelector('img');
      if (bgTextImg && currentCar.size.text) {
        applyResponsiveSizes(currentCar, bgTextImg, 'text');
      }
    }
  });

  // Substituir loadCarouselCars() por updateCarouselSources() na inicialização
  updateCarouselSources();
}); 

// === EFEITOS DE SCROLL (index + quem somos) ===
document.addEventListener('DOMContentLoaded', () => {
  // Fade-in/slide-up e variantes
  const revealSelectors = ['.reveal', '.reveal-gold', '.reveal-line', '.reveal-zoom', '.reveal-count'];
  const reveals = document.querySelectorAll(revealSelectors.join(','));
  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        // Animação de contagem para números
        if (entry.target.classList.contains('reveal-count')) {
          animateCount(entry.target);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach(el => observer.observe(el));

  // Parallax leve no fundo do carrossel
  const carShowcase = document.querySelector('.car-showcase');
  if (carShowcase) {
    window.addEventListener('scroll', () => {
      const rect = carShowcase.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calcula o deslocamento proporcional ao scroll
        const scrollPercent = (windowHeight - rect.top) / (windowHeight + rect.height);
        carShowcase.style.backgroundPosition = `center ${40 + scrollPercent * 20}%`;
      }
    });
  }
});

// Função para animar contagem de números
function animateCount(el) {
  const target = parseInt(el.getAttribute('data-count') || el.textContent.replace(/\D/g, ''));
  if (!target || isNaN(target)) return;
  let start = 0;
  const duration = 1200;
  const step = (timestamp, startTime) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = value.toLocaleString();
    if (progress < 1) {
      requestAnimationFrame(ts => step(ts, startTime));
    } else {
      el.textContent = target.toLocaleString();
    }
  };
  requestAnimationFrame(step);
} 