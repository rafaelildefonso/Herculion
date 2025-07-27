// Verificar se o usuário está logado
const checkLoggedInUser = () => {
  return JSON.parse(localStorage.getItem('herculionCurrentUser'));
};

// Função para formatar a data
const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

// Função para processar a solicitação do carro
const processCarRequest = (user, car) => {
  // Criar um ID único para o pedido
  const orderId = 'HRC' + Date.now().toString().slice(-6);
  
  // Criar o objeto do pedido
  const newOrder = {
    id: orderId,
    carName: car.name,
    image: car.image,
    orderDate: formatDate(new Date()),
    price: car.price.replace(/[^\d,]/g, '').replace(',', '.'),
    status: 'processando',
    carLink: car.link,
    paymentMethod: 'A definir',
    paymentStatus: 'pendente'
  };
  
  // Obter a lista de usuários atual
  const users = JSON.parse(localStorage.getItem('herculionUsers')) || [];
  
  // Encontrar o índice do usuário atual
  const userIndex = users.findIndex(u => u.id === user.id);
  
  if (userIndex !== -1) {
    // Adicionar o pedido ao usuário
    if (!users[userIndex].orders) {
      users[userIndex].orders = [];
    }
    
    users[userIndex].orders.unshift(newOrder); // Adiciona no início do array
    
    // Atualizar o usuário no Local Storage
    localStorage.setItem('herculionUsers', JSON.stringify(users));
    
    // Atualizar o usuário logado
    localStorage.setItem('herculionCurrentUser', JSON.stringify(users[userIndex]));
    
    // Mostrar mensagem de sucesso
    showSuccessMessage(car.name);
  }
};

// Função para exibir mensagem de sucesso
const showSuccessMessage = (carName) => {
  // Criar elemento de mensagem
  const message = document.createElement('div');
  message.className = 'request-success-message';
  message.innerHTML = `
    <div class="message-content">
      <i class="fas fa-check-circle"></i>
      <p>Solicitação enviada com sucesso para <strong>${carName}</strong>!</p>
    </div>
    <a href="pedidos.html" class="view-orders-btn">Ver Meus Pedidos</a>
  `;
  
  // Adicionar ao corpo do documento
  document.body.appendChild(message);
  
  // Animar a entrada
  setTimeout(() => {
    message.style.bottom = '20px';
  }, 100);
  
  // Remover após alguns segundos
  setTimeout(() => {
    message.style.bottom = '-100px';
    setTimeout(() => {
      message.remove();
    }, 500);
  }, 5000);
};
