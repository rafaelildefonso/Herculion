// Script para integração do formulário de interesse com pedidos do usuário

document.addEventListener('DOMContentLoaded', function () {

  const currentUser = JSON.parse(localStorage.getItem('herculionCurrentUser'));
  
  // Preencher o campo de mensagem com o nome do carro, se vier na URL
  const urlParams = new URLSearchParams(window.location.search);
  const carName = urlParams.get('car');
  const carId = urlParams.get('id');
  if (!currentUser && (carName | carId)) {
    // Se não estiver logado, redirecionar para a página de login
    window.location.href = 'cadastro.html';
    return;
  }

  if (carName) {
    // Opcional: preencher a mensagem ou adicionar campo oculto
    const mensagem = document.getElementById('mensagem');
    if (mensagem && mensagem.value.trim() === '') {
      mensagem.value = `Tenho interesse no modelo: ${carName}`;
    }
  }

  // Interceptar o envio do formulário
  const form = document.querySelector('.contato-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {

  const urlParams = new URLSearchParams(window.location.search);
  const carId = urlParams.get('id');
  if (!carId) return; // Se não veio de um carro, segue fluxo normal

    // Previne o envio padrão para processar antes de sair da página
    e.preventDefault();

    // Buscar usuário logado
    const user = JSON.parse(localStorage.getItem('herculionCurrentUser'));
    if (!user) return;

    // Buscar lista de usuários
    const users = JSON.parse(localStorage.getItem('herculionUsers')) || [];
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex === -1) return;

    // Montar objeto do pedido (apenas id do carro)
    const orderId = 'HRC' + Date.now().toString().slice(-6);
    const newOrder = {
      id: orderId,
      carId: carId,
      orderDate: new Date().toISOString().split('T')[0],
      status: 'reservado',
      paymentMethod: 'A definir',
      paymentStatus: 'pendente'
    };
    if (!users[userIndex].orders) users[userIndex].orders = [];
    users[userIndex].orders.unshift(newOrder);
    localStorage.setItem('herculionUsers', JSON.stringify(users));
    localStorage.setItem('herculionCurrentUser', JSON.stringify(users[userIndex]));
    // Redireciona para Meus Pedidos
    window.location.href = 'pedidos.html';
  });
});
