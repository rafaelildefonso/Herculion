// Grade de Carros - Herculion

document.addEventListener('DOMContentLoaded', function() {
    // Referência ao container da grade de carros
    const carGrid = document.getElementById('carGrid');
    
    // Verifica se o container existe
    if (!carGrid) return;
    
    // Função para formatar o preço
    function formatPrice(price) {
        // Se o preço já contém 'R$', retorna como está
        if (price.includes('R$')) return price;
        
        // Se for um número, formata como moeda
        const number = parseFloat(price);
        if (!isNaN(number)) {
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
            }).format(number);
        }
        
        // Se não for possível formatar, retorna o valor original
        return price;
    }
    
    // Função para criar o HTML de um carro
    function createCarCard(car) {
        return `
            <div class="car-card">
                <div class="car-image-container">
                    <img src="${car.imagem}" alt="${car.nome}" class="car-image">
                    ${car.novo ? '<span class="car-badge">Novo</span>' : ''}
                    ${car.destaque ? '<span class="car-badge" style="top: 3.5rem; background: linear-gradient(135deg, #ff4d4d, #cc0000);">Destaque</span>' : ''}
                </div>
                <div class="car-details">
                    <h3 class="car-name">${car.nome}</h3>
                    <div class="car-specs">
                        <div class="spec">
                            <i class="fas fa-calendar-alt"></i>
                            <span>${car.ano}</span>
                        </div>
                        <div class="spec">
                            <i class="fas fa-tachometer-alt"></i>
                            <span>${car.potencia || 'N/A'}</span>
                        </div>
                        <div class="spec">
                            <i class="fas fa-palette"></i>
                            <span>${car.cor || 'N/A'}</span>
                        </div>
                    </div>
                    <div class="car-price">${formatPrice(car.preco)}</div>
                    <p class="car-description">${car.descricao || 'Um veículo de alto desempenho que combina luxo e tecnologia de ponta.'}</p>
                    <a href="${car.route || '#'}" class="car-link">Ver Detalhes <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        `;
    }
    
    // Função para carregar os carros
    function loadCars() {
        // Tenta obter os carros do arquivo busca.js
        if (typeof todosCarros !== 'undefined' && Array.isArray(todosCarros)) {
            renderCars(todosCarros);
        } else {
            // Se não encontrar a variável, tenta carregar via fetch
            fetchCarData();
        }
    }
    
    // Função para buscar dados dos carros via API (se necessário)
    async function fetchCarData() {
        try {
            const response = await fetch('js/busca.js');
            const text = await response.text();
            
            // Extrai o array de carros do texto do arquivo
            const match = text.match(/const todosCarros = (\[.*?\]);/s);
            if (match && match[1]) {
                const carData = JSON.parse(match[1]);
                renderCars(carData);
            } else {
                console.error('Não foi possível extrair os dados dos carros');
                showErrorMessage();
            }
        } catch (error) {
            console.error('Erro ao carregar os carros:', error);
            showErrorMessage();
        }
    }
    
    // Função para exibir mensagem de erro
    function showErrorMessage() {
        carGrid.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Não foi possível carregar os veículos no momento. Por favor, tente novamente mais tarde.</p>
            </div>
        `;
    }
    
    // Função para renderizar os carros na grade
    function renderCars(cars) {
        if (!cars || !Array.isArray(cars) || cars.length === 0) {
            showErrorMessage();
            return;
        }
        
        // Ordena os carros: destaques primeiro, depois os mais recentes
        const sortedCars = [...cars].sort((a, b) => {
            if (a.destaque && !b.destaque) return -1;
            if (!a.destaque && b.destaque) return 1;
            return (b.ano || 0) - (a.ano || 0);
        });
        
        // Limpa a grade
        carGrid.innerHTML = '';
        
        // Adiciona cada carro à grade
        sortedCars.forEach(car => {
            const carElement = document.createElement('div');
            carElement.innerHTML = createCarCard(car);
            carGrid.appendChild(carElement.firstElementChild);
        });
    }
    
    // Inicializa o carregamento dos carros
    loadCars();
    
    // Adiciona evento de clique para os links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Adiciona classe ao body quando a página é carregada
window.addEventListener('load', function() {
    document.body.classList.add('page-loaded');
});
