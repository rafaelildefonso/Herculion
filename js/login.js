// Verificar se o usuário já está logado
const checkLoggedInUser = () => {
  return JSON.parse(localStorage.getItem('herculionCurrentUser'));
};

// Função para exibir mensagens de erro
const showError = (input, message) => {
  const formGroup = input.closest('.form-group');
  const errorElement = formGroup.querySelector('.error-message');
  formGroup.classList.add('error');
  errorElement.textContent = message;
  errorElement.style.display = 'block';
  
  // Adicionar classe de shake para feedback visual
  formGroup.classList.add('shake');
  setTimeout(() => {
    formGroup.classList.remove('shake');
  }, 500);
};

// Função para limpar erros
const clearError = (input) => {
  const formGroup = input.closest('.form-group');
  const errorElement = formGroup.querySelector('.error-message');
  formGroup.classList.remove('error');
  errorElement.textContent = '';
  errorElement.style.display = 'none';
};

// Função para validar e-mail
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

// Função para inicializar o menu mobile
const initMobileMenu = () => {
  const menuButton = document.querySelector('.menu-button');
  const closeButton = document.querySelector('.close-btn');
  const sideMenu = document.getElementById('side-menu');
  const menuLinks = document.querySelectorAll('.side-nav a');
  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  document.body.appendChild(overlay);

  const openMenu = () => {
    sideMenu.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscapeKey);
  };

  const closeMenu = () => {
    sideMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleEscapeKey);
  };

  const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  };

  // Abrir menu
  if (menuButton) {
    menuButton.addEventListener('click', openMenu);
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-controls', 'side-menu');
    menuButton.setAttribute('aria-label', 'Abrir menu de navegação');
  }

  // Fechar menu
  if (closeButton) {
    closeButton.addEventListener('click', closeMenu);
    closeButton.setAttribute('aria-label', 'Fechar menu de navegação');
  }

  // Fechar ao clicar em um link
  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Fechar ao clicar no overlay
  overlay.addEventListener('click', closeMenu);

  // Atualizar atributo aria-expanded
  if (menuButton && sideMenu) {
    menuButton.addEventListener('click', () => {
      const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', !isExpanded);
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Se já estiver logado, redirecionar para a página de pedidos
  if (checkLoggedInUser()) {
    window.location.href = 'pedidos.html';
    return;
  }

  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const rememberCheckbox = document.getElementById('remember');
  const showPasswordToggle = document.querySelector('.show-password');

  // Inicializar menu mobile
  initMobileMenu();

  // Verificar se há credenciais salvas
  const savedEmail = localStorage.getItem('herculionSavedEmail');
  const savedPassword = localStorage.getItem('herculionSavedPassword');
  
  if (savedEmail && savedPassword) {
    emailInput.value = savedEmail;
    passwordInput.value = savedPassword;
    rememberCheckbox.checked = true;
    
    // Adicionar classe para manter o label no topo
    if (emailInput.value) emailInput.dispatchEvent(new Event('input'));
    if (passwordInput.value) passwordInput.dispatchEvent(new Event('input'));
  }

  // Validação em tempo real
  emailInput.addEventListener('input', () => {
    clearError(emailInput);
  });

  passwordInput.addEventListener('input', () => {
    clearError(passwordInput);
  });

  // Alternar visibilidade da senha
  if (showPasswordToggle) {
    showPasswordToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      showPasswordToggle.classList.toggle('fa-eye');
      showPasswordToggle.classList.toggle('fa-eye-slash');
    });
  }

  // Submissão do formulário
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const remember = rememberCheckbox.checked;
    
    // Validação
    let isValid = true;
    
    // Validar e-mail
    if (!email) {
      showError(emailInput, 'Por favor, insira seu e-mail.');
      isValid = false;
    } else if (!validateEmail(email)) {
      showError(emailInput, 'Por favor, insira um e-mail válido.');
      isValid = false;
    }
    
    // Validar senha
    if (!password) {
      showError(passwordInput, 'Por favor, insira sua senha.');
      isValid = false;
    } else if (password.length < 6) {
      showError(passwordInput, 'A senha deve ter pelo menos 6 caracteres.');
      isValid = false;
    }
    
    if (!isValid) return;
    
    // Simular carregamento
    const submitButton = loginForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Entrando...';
    
    // Simular atraso de rede
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Verificar credenciais
      const users = JSON.parse(localStorage.getItem('herculionUsers')) || [];
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Salvar sessão do usuário
        localStorage.setItem('herculionCurrentUser', JSON.stringify(user));
        
        // Salvar credenciais se "Lembrar de mim" estiver marcado
        if (remember) {
          localStorage.setItem('herculionSavedEmail', email);
          localStorage.setItem('herculionSavedPassword', password);
        } else {
          localStorage.removeItem('herculionSavedEmail');
          localStorage.removeItem('herculionSavedPassword');
        }
        
        // Feedback visual de sucesso
        submitButton.innerHTML = '<i class="fas fa-check"></i> Login realizado!';
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Redirecionar para a página de pedidos
        window.location.href = 'pedidos.html';
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      showError(emailInput, 'E-mail ou senha incorretos.');
      showError(passwordInput, '');
      submitButton.innerHTML = originalButtonText;
      submitButton.disabled = false;
    }
  });

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

// Função de logout
function logout() {
  localStorage.removeItem('herculionCurrentUser');
  window.location.href = 'index.html';
}
