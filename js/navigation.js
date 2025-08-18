// Verifica se o usuário está autenticado ao carregar a página
function checkAuth() {
    const publicPages = ['login.html', 'cadastro.html', 'index.html', '', 'auth.html', 'quem-somos.html', 'contato.html', 'grade-carros.html', 'busca.html'];
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Se estiver em uma página pública ou já estiver na página de autenticação, não faz nada
    if (publicPages.includes(currentPage) || currentPage === 'auth.html') {
        return;
    }
    
    // Se tentar acessar uma página restrita sem estar autenticado
    if (typeof auth !== 'undefined' && !auth.isAuthenticated()) {
        // Redireciona para a página de autenticação com o caminho de retorno
        // const returnUrl = encodeURIComponent(window.location.pathname + window.location.search);
        // window.location.href = `auth.html?returnUrl=${returnUrl}`;
    }
}

// Configura os links de navegação
function setupNavigation() {
    // Links do menu principal
    const navLinks = document.querySelectorAll('.nav-link, .side-nav a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Verifica se é um link para a página de pedidos
            if (href === 'pedidos.html') {
                e.preventDefault();
                
                // Verifica se o usuário está autenticado
                if (typeof auth !== 'undefined' && auth.isAuthenticated()) {
                    window.location.href = 'pedidos.html';
                } else {
                    // Redireciona para a página de autenticação com o retorno para pedidos
                    window.location.href = `auth.html?returnUrl=${encodeURIComponent('pedidos.html')}`;
                }
                return;
            }
            
            // Comportamento padrão para links âncora
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const targetPosition = target.offsetTop - 100;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            // Para outros links, o comportamento padrão é mantido
        });
    });
}

// Inicializa a navegação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Carrega o script de autenticação se ainda não estiver carregado
    if (typeof auth === 'undefined') {
        const script = document.createElement('script');
        script.src = 'js/auth.js';
        script.onload = function() {
            checkAuth();
            setupNavigation();
        };
        document.head.appendChild(script);
    } else {
        checkAuth();
        setupNavigation();
    }
});
