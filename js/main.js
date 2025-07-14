// Arquivo para interatividade do site Herculion
document.addEventListener('DOMContentLoaded', () => {
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

  // Efeito de scroll no header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Lógica do Carrossel ---
  const cars = [
    {
      mainImage: 'assets/images/v13_16.png',
      bgText: 'assets/images/urus_nome.png',
      textWidth: "100px",
      alt: 'Lamborghini Urus'
    },
    {
      mainImage: 'assets/images/v14_22.png',
      bgText: 'assets/images/chiron_nome.png',
      textWidth: "100px",
      alt: 'Bugatti Chiron'
    },
    {
      mainImage: 'assets/images/v15_23.png',
      bgText: 'assets/images/911_nome.png',
      textWidth: "100px",
      alt: 'Porsche 911'
    }
  ];

  const carImagesContainer = document.querySelector('.car-images-container');
  const mainCarEl = document.querySelector('.main-car');
  const leftCarEl = document.querySelector('.side-car.left');
  const rightCarEl = document.querySelector('.side-car.right');
  const bgTextContainer = document.querySelector('.car-background-text-container');
  const prevButton = document.querySelector('.slider-button.prev');
  const nextButton = document.querySelector('.slider-button.next');

  let currentIndex = 0;
  let isAnimating = false;
  const animationDuration = 600; // ms, deve ser igual à transição do CSS

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

    // Atualiza o texto de fundo
    bgTextContainer.style.opacity = '0';
    setTimeout(() => {
      bgTextContainer.innerHTML = `<img src="${cars[currentIndex].bgText}" alt="${cars[currentIndex].alt} text">`;
      bgTextContainer.style.opacity = '0.45';
    }, animationDuration / 2);
  }

  function slide(direction) {
    if (isAnimating) return;
    isAnimating = true;

    // Determina o próximo índice ANTES da animação
    const totalCars = cars.length;
    let nextIndex;
    
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % totalCars;
      // Prepara o próximo carro à direita
      rightCarEl.style.display = 'block';
      leftCarEl.style.display = 'none';
      rightCarEl.src = cars[nextIndex].mainImage;
      rightCarEl.alt = cars[nextIndex].alt;
    } else {
      nextIndex = (currentIndex - 1 + totalCars) % totalCars;
      // Prepara o carro anterior à esquerda
      leftCarEl.style.display = 'block';
      rightCarEl.style.display = 'none';
      leftCarEl.src = cars[nextIndex].mainImage;
      leftCarEl.alt = cars[nextIndex].alt;
    }

    // Adiciona a classe de animação
    carImagesContainer.classList.add(`slide-${direction}`);

    // Após a animação, atualiza o estado
    setTimeout(() => {
      // Atualiza o índice atual
      currentIndex = nextIndex;
      
      // Atualiza as imagens para o novo estado
      updateCarouselSources();
      
      // Remove a classe de animação
      carImagesContainer.classList.remove(`slide-${direction}`);
      
      // Reseta os estilos
      leftCarEl.style.display = '';
      rightCarEl.style.display = '';
      
      isAnimating = false;
    }, animationDuration);
  }

  prevButton.addEventListener('click', () => slide('prev'));
  nextButton.addEventListener('click', () => slide('next'));

  updateCarouselSources(); // Inicia o carrossel
}); 