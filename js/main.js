// Arquivo para interatividade do site Herculion
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-button');
  const closeButton = document.querySelector('#close-btn');
  const sideMenu = document.querySelector('#side-menu');
  const header = document.querySelector('.header');

  // Abrir menu
  menuButton.addEventListener('click', () => {
    sideMenu.classList.add('open');
  });

  // Fechar menu
  closeButton.addEventListener('click', () => {
    sideMenu.classList.remove('open');
  });

  // Fechar ao clicar em um link (para navegação na página)
  sideMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      sideMenu.classList.remove('open');
    });
  });

  // Fechar ao clicar fora do menu
  document.addEventListener('click', (event) => {
    const isClickInsideMenu = sideMenu.contains(event.target);
    const isClickOnMenuButton = menuButton.contains(event.target);

    if (!isClickInsideMenu && !isClickOnMenuButton && sideMenu.classList.contains('open')) {
      sideMenu.classList.remove('open');
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
      bgText: 'assets/images/v13_21.png',
      alt: 'Lamborghini Urus'
    },
    {
      mainImage: 'assets/images/v14_22.png',
      bgText: 'https://via.placeholder.com/800x200/000000/000000?text=CHIRON', // Placeholder
      alt: 'Bugatti Chiron'
    },
    {
      mainImage: 'assets/images/v15_23.png',
      bgText: 'https://via.placeholder.com/800x200/000000/000000?text=PORSCHE', // Placeholder
      alt: 'Porsche 911'
    }
  ];

  const mainCarEl = document.querySelector('.main-car');
  const leftCarEl = document.querySelector('.side-car.left');
  const rightCarEl = document.querySelector('.side-car.right');
  const bgTextContainer = document.querySelector('.car-background-text-container');
  const prevButton = document.querySelector('.slider-button.prev');
  const nextButton = document.querySelector('.slider-button.next');

  let currentIndex = 0;

  function updateCarousel(transitionClass = '') {
    const totalCars = cars.length;
    const prevIndex = (currentIndex - 1 + totalCars) % totalCars;
    const nextIndex = (currentIndex + 1) % totalCars;

    // Adiciona classes de transição para efeito de fade
    if (transitionClass) {
      mainCarEl.classList.add(transitionClass);
      leftCarEl.classList.add(transitionClass);
      rightCarEl.classList.add(transitionClass);
      bgTextContainer.classList.add(transitionClass);
    }

    // Espera a transição de fade-out antes de trocar as imagens
    setTimeout(() => {
      mainCarEl.src = cars[currentIndex].mainImage;
      mainCarEl.alt = cars[currentIndex].alt;
      leftCarEl.src = cars[prevIndex].mainImage;
      rightCarEl.src = cars[nextIndex].mainImage;
      
      bgTextContainer.innerHTML = `<img src="${cars[currentIndex].bgText}" alt="${cars[currentIndex].alt} text">`;
      
      // Remove as classes de transição
      if (transitionClass) {
        mainCarEl.classList.remove(transitionClass);
        leftCarEl.classList.remove(transitionClass);
        rightCarEl.classList.remove(transitionClass);
        bgTextContainer.classList.remove(transitionClass);
      }
    }, 300); // Metade da duração da transição do CSS
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % cars.length;
    updateCarousel('fade-out');
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + cars.length) % cars.length;
    updateCarousel('fade-out');
  }

  prevButton.addEventListener('click', prevSlide);
  nextButton.addEventListener('click', nextSlide);

  updateCarousel(); // Inicia o carrossel
});

// Adicionar um pouco de CSS para o efeito de fade no global.css seria bom,
// mas vou adicionar aqui para simplificar.
const style = document.createElement('style');
style.innerHTML = `
  .fade-out {
    opacity: 0 !important;
  }
`;
document.head.appendChild(style); 