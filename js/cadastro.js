document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const fullName = document.getElementById('fullName');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const terms = document.getElementById('terms');

  // Adiciona a classe 'js-loaded' para iniciar animações
  document.body.classList.add('js-loaded');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simula o envio do formulário
      showSuccessMessage();
    }
  });

  const validateForm = () => {
    let isValid = true;
    isValid &= validateField(fullName, (value) => value.trim() !== '', 'O nome completo é obrigatório.');
    isValid &= validateField(email, (value) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value), 'Por favor, insira um e-mail válido.');
    isValid &= validateField(password, (value) => value.length >= 8, 'A senha deve ter no mínimo 8 caracteres.');
    isValid &= validateField(confirmPassword, (value) => value === password.value, 'As senhas não correspondem.');
    isValid &= validateField(terms, (value) => terms.checked, 'Você deve aceitar os termos de serviço.');
    return isValid;
  };

  const validateField = (field, validationFn, errorMessage) => {
    const value = field.type === 'checkbox' ? field.checked : field.value;
    const formGroup = field.closest('.form-group, .form-group-checkbox');
    const errorContainer = formGroup.querySelector('.error-message');

    if (!validationFn(value)) {
      formGroup.classList.add('error');
      errorContainer.textContent = errorMessage;
      return false;
    } else {
      formGroup.classList.remove('error');
      errorContainer.textContent = '';
      return true;
    }
  };

  // Validação em tempo real ao sair do campo
  [fullName, email, password, confirmPassword].forEach(field => {
    field.addEventListener('blur', () => {
      validateField(field, () => true, ''); // Apenas para limpar o erro se corrigido
      if (field === fullName) validateField(fullName, (value) => value.trim() !== '', 'O nome completo é obrigatório.');
      if (field === email) validateField(email, (value) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value), 'Por favor, insira um e-mail válido.');
      if (field === password) validateField(password, (value) => value.length >= 8, 'A senha deve ter no mínimo 8 caracteres.');
      if (field === confirmPassword) validateField(confirmPassword, (value) => value === password.value, 'As senhas não correspondem.');
    });
  });

  terms.addEventListener('change', () => {
    validateField(terms, (value) => terms.checked, 'Você deve aceitar os termos de serviço.');
  });

  const showSuccessMessage = () => {
    const formWrapper = document.querySelector('.registration-form-wrapper');
    formWrapper.innerHTML = `
      <div class="form-success">
        <i class="fas fa-check-circle"></i>
        <h2>Cadastro Realizado!</h2>
        <p>Sua conta exclusiva foi criada com sucesso. Bem-vindo à Herculion.</p>
        <a href="index.html" class="cta-button">Página Inicial</a>
      </div>
    `;
    gsap.from('.form-success', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' });
  };

  // Efeito de cursor personalizado
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');

  if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
      gsap.to(cursor, { duration: 0.2, x: e.clientX, y: e.clientY });
      gsap.to(cursorFollower, { duration: 0.6, x: e.clientX, y: e.clientY });
    });

    const hoverElements = document.querySelectorAll('a, button, input[type="checkbox"]');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 1.5 });
        gsap.to(cursorFollower, { scale: 1.5, opacity: 0.5 });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1 });
        gsap.to(cursorFollower, { scale: 1, opacity: 1 });
      });
    });
  }
  
  // Inicialização do menu mobile
  const menuButton = document.querySelector('.menu-button');
  const closeButton = document.querySelector('.close-btn');
  const sideMenu = document.getElementById('side-menu');

  if (menuButton && sideMenu) {
    menuButton.addEventListener('click', () => {
      sideMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeButton && sideMenu) {
    closeButton.addEventListener('click', () => {
      sideMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Fecha o menu ao clicar em um link
  const menuLinks = document.querySelectorAll('.side-menu a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      sideMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
});
