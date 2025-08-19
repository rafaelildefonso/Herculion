// Verificar se o usuário está logado
const checkLoggedInUser = () => {
  return JSON.parse(localStorage.getItem('herculionCurrentUser'));
};

// Função para formatar a data
const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
};

document.addEventListener('DOMContentLoaded', () => {
  const ordersGrid = document.querySelector('.orders-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const userNameElement = document.getElementById('user-name');
  const logoutBtn = document.getElementById('logout-btn');

  // Verificar se o usuário está logado
  const currentUser = checkLoggedInUser();
  
  if (!currentUser) {
    // Se não estiver logado, redirecionar para a página de login
    window.location.href = 'cadastro.html';
    return;
  }

  // Exibir o nome do usuário
  if (userNameElement) {
    userNameElement.textContent = currentUser.fullName;
  }

  // Configurar o botão de logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('herculionCurrentUser');
      window.location.href = 'index.html';
    });
  }

  // Obter os pedidos do usuário ou um array vazio se não houver pedidos
  const userOrders = currentUser.orders || [];

  const renderOrders = (filter = 'all') => {
    ordersGrid.innerHTML = '<p>Carregando pedidos...</p>';
    const filteredOrders = userOrders.filter(order => filter === 'all' || order.status === filter);

    if (filteredOrders.length === 0) {
        ordersGrid.innerHTML = `<p class="no-orders-msg">Nenhum pedido encontrado para este status.</p>`;
        return;
    }

    ordersGrid.innerHTML = '';
    filteredOrders.forEach(order => {
      if (typeof todosCarros !== 'undefined' && Array.isArray(todosCarros)) {
      // Buscar dados do carro pelo id salvo no pedido
      const carro = todosCarros.find(c => c.id === order.carId);
      if (!carro) return;
      const orderCard = document.createElement('a');
      orderCard.href = carro.route || '#';
      orderCard.className = 'order-card';
      const formattedPrice = carro.preco || '';
      orderCard.innerHTML = `
        <div class="order-card-image">
          <img src="${carro.imagem}" alt="${carro.nome}" onerror="this.src='assets/images/car-placeholder.jpg'">
          ${carro.novo ? '<span class="new-badge">Novo</span>' : ''}
        </div>
        <div class="order-card-content">
          <div class="order-card-header">
            <h3 class="order-car-name">${carro.nome}</h3>
            <span class="order-status status-${order.status}">
              ${order.status === 'processando' ? 'Em Processamento' : 
                order.status === 'entregue' ? 'Entregue' : 
                order.status === 'cancelado' ? 'Cancelado' : 
                'Reservado'}
            </span>
          </div>
          <div class="order-details">
            <p><i class="fas fa-hashtag"></i> <strong>Pedido:</strong> #${order.id}</p>
            <p><i class="far fa-calendar-alt"></i> <strong>Data:</strong> ${formatDate(order.orderDate)}</p>
            <p><i class="fas fa-tags"></i> <strong>Valor:</strong> ${formattedPrice}</p>
            ${order.paymentMethod ? `<p><i class="fas fa-credit-card"></i> <strong>Pagamento:</strong> ${order.paymentMethod}</p>` : ''}
          </div>
          <div class="order-card-footer">
            <a href="${carro.route || '#'}" class="details-btn">Ver Detalhes <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>
      `;
      ordersGrid.appendChild(orderCard);
    }
    });

    gsap.from('.order-card', {
      duration: 0.8,
      opacity: 0,
      y: 50,
      stagger: 0.1,
      ease: 'power3.out'
    });
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const status = btn.getAttribute('data-status');
      renderOrders(status);
    });
  });

  // Renderização inicial
  if (userOrders.length === 0) {
    ordersGrid.innerHTML = `
      <div class="no-orders">
        <i class="fas fa-car"></i>
        <h3>Você ainda não possui pedidos</h3>
        <p>Explore nossa coleção de veículos de luxo e faça seu primeiro pedido.</p>
        <a href="grade-carros.html" class="cta-button">Ver Modelos</a>
      </div>
    `;
  } else {
    renderOrders();
  }
});
