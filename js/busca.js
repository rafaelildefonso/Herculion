// Busca dinâmica Herculion

// Dados dos carros (vendidos.json)
const todosCarros = [
  {
    "id": "bugatti-tourbillon",
    "nome": "Bugatti Tourbillon",
    "marca": "Bugatti",
    "modelo": "Tourbillon",
    "ano": 2025,
    "preco": "R$ 50M",
    "cor": "Preto e Azul",
    "potencia": "1800 HP",
    "imagem": "assets/images/carros/bugatti_tourbillon.png",
    "destaque": true,
    "novo": true,
    "descricao": "O Bugatti Tourbillon é o mais novo hipercarro da marca, combinando um motor V16 híbrido com tecnologia de ponta e design inovador.",
    "route": "carros/bugatti-tourbillon.html",
    "categoria": ["esportivo","luxo"]
  },
  {
    "id": "lamborghini-revuelto",
    "nome": "Lamborghini Revuelto",
    "marca": "Lamborghini",
    "modelo": "Revuelto",
    "ano": 2024,
    "preco": "R$ 6.2M",
    "cor": "Laranja",
    "potencia": "1015 HP", 
    "imagem": "assets/images/carros/lamborghini_revuelto.png",
    "destaque": true,
    "novo": true,
    "descricao": "O Revuelto é o primeiro superesportivo V12 híbrido plug-in da Lamborghini, estabelecendo um novo paradigma em performance e design.",
    "route": "carros/lamborghini-revuelto.html",
    "categoria": ["esportivo", "elétrico"]
  },
  {
    "id": "mclaren-720s",
    "nome": "McLaren 720S",
    "marca": "McLaren",
    "modelo": "720S",
    "ano": 2023,
    "preco": "R$ 3.6M",
    "cor": "Laranja",
    "potencia": "720 HP", 
    "imagem": "assets/images/carros/mclaren_720s.png",
    "destaque": false,
    "novo": false,
    "descricao": "O McLaren 720S é uma obra-prima da engenharia, com um chassi de fibra de carbono e um design aerodinâmico impressionante.",
    "route": "carros/mclaren-720s.html",
    "categoria": ["esportivo"]
  },
  {
    "id": "bugatti-chiron",
    "nome": "Bugatti Chiron",
    "marca": "Bugatti",
    "modelo": "Chiron",
    "ano": 2023,
    "preco": "R$ 25M",
    "cor": "Preto e Azul",
    "potencia": "1500 HP", 
    "imagem": "assets/images/carros/bugatti_chiron.png",
    "destaque": false,
    "novo": false,
    "descricao": "O Bugatti Chiron é um ícone de hipercarros, conhecido por sua velocidade máxima alucinante e luxo incomparável.",
    "route": "carros/bugatti-chiron.html",
    "categoria": ["esportivo"]
  },
  {
    "id": "koenigsegg-jesko",
    "nome": "Koenigsegg Jesko",
    "marca": "Koenigsegg",
    "modelo": "Jesko",
    "ano": 2023,
    "preco": "R$ 30M",
    "cor": "Branco",
    "potencia": "1600 HP", 
    "imagem": "assets/images/carros/koenigsegg_jesko.png",
    "destaque": false,
    "novo": false,
    "descricao": "O Koenigsegg Jesko é uma máquina de pista homologada para as ruas, projetada para ser o carro mais rápido do mundo em um circuito.",
    "route": "carros/koenigsegg-jesko.html",
    "categoria": ["esportivo"]
  },
  {
    "id": "pagani-huayra",
    "nome": "Pagani Huayra",
    "marca": "Pagani",
    "modelo": "Huayra",
    "ano": 2022,
    "preco": "R$ 18M",
    "cor": "Fibra de Carbono",
    "potencia": "730 HP", 
    "imagem": "assets/images/carros/pagani_huayra.png",
    "destaque": false,
    "novo": false,
    "descricao": "O Pagani Huayra é uma obra de arte sobre rodas, combinando um design deslumbrante com um desempenho de tirar o fôlego.",
    "route": "carros/pagani-huayra.html",
    "categoria": ["esportivo"]
  },
  {
    "id": "rimac-nevera",
    "nome": "Rimac Nevera",
    "marca": "Rimac",
    "modelo": "Nevera",
    "ano": 2024,
    "preco": "R$ 15M",
    "cor": "Azul Elétrico",
    "potencia": "1914 HP", 
    "imagem": "assets/images/carros/rimac_nevera.png",
    "destaque": true,
    "novo": true,
    "descricao": "O Rimac Nevera é um hipercarro totalmente elétrico que redefine os limites da aceleração e da tecnologia automotiva.",
    "route": "carros/rimac-nevera.html",
    "categoria": ["esportivo", "elétrico"]
  },
  {
    "id": "nissan-gt-r-nismo",
    "nome": "Nissan GT-R Nismo",
    "marca": "Nissan",
    "modelo": "GT-R Nismo",
    "ano": 2024,
    "preco": "R$ 1.5M",
    "cor": "Cinza",
    "potencia": "600 HP", 
    "imagem": "assets/images/carros/nissan_gt_r_nismo.png",
    "destaque": false,
    "novo": true,
    "descricao": "O Nissan GT-R Nismo, também conhecido como 'Godzilla', é um ícone de performance com tração integral e tecnologia de ponta.",
    "route": "carros/nissan-gt-r-nismo.html",
    "categoria": ["esportivo"]
  },
  {
    "id": "audi-r8",
    "nome": "Audi R8",
    "marca": "Audi",
    "modelo": "R8",
    "ano": 2023,
    "preco": "R$ 1.8M",
    "cor": "Branco",
    "potencia": "602 HP", 
    "imagem": "assets/images/carros/audi_r8.png",
    "destaque": false,
    "novo": false,
    "descricao": "Superesportivo conversível com motor V10 e design agressivo, pura emoção ao dirigir.",
    "route": "carros/audi-r8.html",
    "categoria": ["conversível", "esportivo"]
  },
  {
    "id": "rolls-royce-cullinan",
    "nome": "Rolls-Royce Cullinan",
    "marca": "Rolls-Royce",
    "modelo": "Cullinan",
    "ano": 2024,
    "preco": "R$ 7M",
    "cor": "Preto",
    "potencia": "563 HP", 
    "imagem": "assets/images/carros/rolls_royce_cullinan.png",
    "destaque": true,
    "novo": true,
    "descricao": "O SUV de ultra-luxo, combinando a opulência e o conforto inigualáveis da Rolls-Royce com a versatilidade de um SUV.",
    "route": "carros/rolls-royce-cullinan.html",
    "categoria": ["suv", "luxo"]
  },
  {
    "id": "lamborghini-urus",
    "nome": "Lamborghini Urus",
    "marca": "Lamborghini",
    "modelo": "Urus",
    "ano": 2024,
    "preco": "R$ 2.5M",
    "cor": "Laranja",
    "potencia": "650 HP",
    "imagem": "assets/images/carros/lamborghini_urus.png",
    "destaque": false,
    "novo": false,
    "descricao": "O SUV mais rápido do mundo, unindo esportividade e luxo.",
    "route": "carros/lamborghini-urus.html",
    "categoria": ["suv", "esportivo"]
  },
  {
    "id": "porsche-911",
    "nome": "Porsche 911",
    "marca": "Porsche",
    "modelo": "911",
    "ano": 2023,
    "preco": "R$ 1.2M",
    "cor": "Prata",
    "potencia": "650 HP",
    "imagem": "assets/images/carros/porsche_911.png",
    "destaque": false,
    "novo": false,
    "descricao": "O Porsche 911 é um ícone dos esportivos, combinando desempenho, elegância e tecnologia de ponta.",
    "route": "carros/porsche-911.html",
    "categoria": ["esportivo"]
  },
  {
    "id": "ferrari-roma",
    "nome": "Ferrari Roma",
    "marca": "Ferrari",
    "modelo": "Roma",
    "ano": 2022,
    "preco": "R$ 3.9M",
    "cor": "Vermelho",
    "potencia": "611 HP",
    "imagem": "assets/images/carros/ferrari_roma.png",
    "destaque": true,
    "novo": false,
    "descricao": "Cupê, esportivo que combina elegância clássica com tecnologia de ponta. Ferrari em sua essência.",
    "route": "carros/ferrari-roma.html",
    "categoria": ["esportivo"]
  },
  {
    "id": "mercedes-benz-sl",
    "nome": "Mercedes-Benz SL",
    "marca": "Mercedes-Benz",
    "modelo": "SL",
    "ano": 2024,
    "preco": "R$ 1.5M",
    "cor": "Cinza",
    "potencia": "577 HP", 
    "imagem": "assets/images/carros/mercedes_benz_sl.png",
    "destaque": false,
    "novo": true,
    "descricao": "Roadster de luxo, conversível com performance e conforto inigualáveis.",
    "route": "carros/mercedes-benz-sl.html",
    "categoria": ["conversível", "luxo"]
  },
  {
    "id": "cadillac-escalade",
    "nome": "Cadillac Escalade",
    "marca": "Cadillac",
    "modelo": "Escalade",
    "ano": 2024,
    "preco": "R$ 950K",
    "cor": "Preto",
    "potencia": "420 HP", 
    "imagem": "assets/images/carros/cadillac_escalade.png",
    "destaque": true,
    "novo": false,
    "descricao": "SUV icônico que oferece luxo, espaço e tecnologia de ponta.",
    "route": "carros/cadillac-escalade.html",
    "categoria": ["suv", "luxo"]
  }
];

let carrosFiltrados = [...todosCarros];
let paginaAtual = 1;
const porPagina = 6;

function scrollParaResultados() {
  const secaoResultados = document.querySelector('.resultados-section');
  if (secaoResultados) {
    // secaoResultados.scrollIntoView({ behavior: 'smooth', block: 'start' });
    smoother.scrollTo(".resultados-section");
  }
}


function aplicarFiltros() {
  const texto = document.querySelector('.busca-input').value.trim().toLowerCase();
  const marca = document.querySelectorAll('.filtro-select')[0].value;
  const preco = document.querySelectorAll('.filtro-select')[1].value;
  const ano = document.querySelectorAll('.filtro-select')[2].value;
  const cor = document.querySelectorAll('.filtro-select')[3].value;
  const categoriaAtiva = document.querySelector('.filtro-tag.active')?.textContent.toLowerCase();

  carrosFiltrados = todosCarros.filter(carro => {
    let matchTexto = true;
    if (texto) {
      matchTexto = (
        carro.nome.toLowerCase().includes(texto) ||
        carro.marca.toLowerCase().includes(texto) ||
        carro.modelo.toLowerCase().includes(texto) ||
        carro.descricao.toLowerCase().includes(texto) ||
        carro.cor.toLowerCase().includes(texto)
      );
    }
    let matchMarca = !marca || carro.marca.toLowerCase() === marca;
    let matchPreco = true;
    if (preco) {
      const valor = parseFloat(carro.preco.replace('R$', '').replace('M','').replace(',','.'));
      if (preco === '1-5') matchPreco = valor >= 1 && valor <= 5;
      if (preco === '5-10') matchPreco = valor > 5 && valor <= 10;
      if (preco === '10+') matchPreco = valor > 10;
    }
    let matchAno = !ano || carro.ano == ano;
    let matchCor = !cor || carro.cor.toLowerCase() === cor;
    let matchCategoria = !categoriaAtiva || categoriaAtiva === 'todos' || (Array.isArray(carro.categoria) && carro.categoria.includes(categoriaAtiva));
    return matchTexto && matchMarca && matchPreco && matchAno && matchCor && matchCategoria;
  });
  paginaAtual = 1;
  renderResultados();
  atualizarContagem();
  atualizarPaginacao();
  scrollParaResultados();
}

function renderResultados() {
  const grid = document.querySelector('.resultados-grid');
  grid.innerHTML = '';
  if (carrosFiltrados.length === 0) {
    grid.innerHTML = '<p style="color: #fff;">Nenhum carro encontrado.</p>';
    return;
  }
  const inicio = (paginaAtual - 1) * porPagina;
  const fim = inicio + porPagina;
  carrosFiltrados.slice(inicio, fim).forEach(carro => {
    grid.innerHTML += `
      <a href="${carro.route}" class="resultado-item reveal reveal-visible">
        <div class="resultado-imagem">
          <img src="${carro.imagem}" alt="${carro.nome}" />
          ${carro.novo ? '<div class="resultado-badge">Novo</div>' : ''}
        </div>
        <div class="resultado-info">
          <h4 class="resultado-nome">${carro.nome}</h4>
          <p class="resultado-marca">${carro.marca}</p>
          <div class="resultado-detalhes">
            <span><i class="fas fa-calendar"></i> ${carro.ano}</span>
            <span><i class="fas fa-tachometer-alt"></i> ${carro.potencia}</span>
            <span><i class="fas fa-palette"></i> ${carro.cor}</span>
          </div>
          <div class="resultado-preco">
            <span class="preco-valor">${carro.preco}</span>
          </div>
          <button class="btn-detalhes">Ver Detalhes</button>
        </div>
      </a>
    `;
  });
}

function atualizarContagem() {
  document.querySelector('.resultados-count').textContent = `${carrosFiltrados.length} veículo${carrosFiltrados.length === 1 ? '' : 's'} encontrado${carrosFiltrados.length === 1 ? '' : 's'}`;
}

function atualizarPaginacao() {
  const paginacao = document.querySelector('.paginacao');
  if (!paginacao) return;
  paginacao.innerHTML = '';
  const totalPaginas = Math.ceil(carrosFiltrados.length / porPagina);
  const btnPrev = document.createElement('button');
  btnPrev.className = 'pagina-btn prev';
  btnPrev.innerHTML = '<i class="fas fa-chevron-left"></i>';
  btnPrev.disabled = paginaAtual === 1;
  btnPrev.onclick = () => { if (paginaAtual > 1) { paginaAtual--; renderResultados(); atualizarPaginacao(); } };
  paginacao.appendChild(btnPrev);
  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement('button');
    btn.className = 'pagina-btn' + (i === paginaAtual ? ' active' : '');
    btn.textContent = i;
    btn.onclick = () => { paginaAtual = i; renderResultados(); atualizarPaginacao(); };
    paginacao.appendChild(btn);
  }
  const btnNext = document.createElement('button');
  btnNext.className = 'pagina-btn next';
  btnNext.innerHTML = '<i class="fas fa-chevron-right"></i>';
  btnNext.disabled = paginaAtual === totalPaginas || totalPaginas === 0;
  btnNext.onclick = () => { if (paginaAtual < totalPaginas) { paginaAtual++; renderResultados(); atualizarPaginacao(); } };
  paginacao.appendChild(btnNext);

  scrollParaResultados();
}

// Adiciona evento de clique para os filtros de categoria
document.querySelectorAll('.filtro-tag').forEach(tag => {
  tag.addEventListener('click', () => {
    // Remove a classe 'active' de todas as tags
    document.querySelectorAll('.filtro-tag').forEach(t => t.classList.remove('active'));
    // Adiciona a classe 'active' apenas na tag clicada
    tag.classList.add('active');
    // Se clicou em "Todos", limpa o filtro de categoria
    if (tag.textContent.trim().toLowerCase() === 'todos') {
      document.querySelector('.busca-input').value = '';
    }
    // Aplica os filtros
    aplicarFiltros();
    scrollParaResultados();
  });
});

window.addEventListener('DOMContentLoaded', () => {
  renderResultados();
  atualizarContagem();
  atualizarPaginacao();
  // Remover busca automática ao digitar
  // document.querySelector('.busca-input').addEventListener('input', aplicarFiltros);
  // Adicionar busca apenas no submit do formulário
  const buscaForm = document.createElement('form');
  const buscaInputGroup = document.querySelector('.busca-input').parentElement;
  buscaInputGroup.parentElement.replaceChild(buscaForm, buscaInputGroup);
  buscaForm.appendChild(buscaInputGroup);
  buscaForm.addEventListener('submit', function(e) {
    e.preventDefault();
    aplicarFiltros();
    scrollParaResultados();
  });
  document.querySelectorAll('.filtro-select').forEach(sel => sel.addEventListener('change', aplicarFiltros));
  document.querySelector('.btn-aplicar').addEventListener('click', e => { aplicarFiltros(); scrollParaResultados(); });
  document.querySelector('.btn-limpar').addEventListener('click', () => {
    document.querySelectorAll('.filtro-tag').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.filtro-tag').item(0).classList.add('active');
    document.querySelector('.busca-input').value = '';
    document.querySelectorAll('.filtro-select').forEach(sel => sel.value = '');
    aplicarFiltros();
    scrollParaResultados();
  });
  document.querySelectorAll('.filtro-tag').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filtro-tag').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const tipo = this.textContent.trim().toLowerCase();
      if (tipo === 'todos') {
        aplicarFiltros();
      } else {
        document.querySelector('.busca-input').value = tipo;
        aplicarFiltros();
      }
      // scrollParaResultados();
    });
  });
  document.querySelector('.ordenacao-select').addEventListener('change', function() {
    const val = this.value;
    if (val === 'preco-menor') carrosFiltrados.sort((a,b)=>parseFloat(a.preco.replace('R$','').replace('M','').replace(',','.'))-parseFloat(b.preco.replace('R$','').replace('M','').replace(',','.')));
    if (val === 'preco-maior') carrosFiltrados.sort((a,b)=>parseFloat(b.preco.replace('R$','').replace('M','').replace(',','.'))-parseFloat(a.preco.replace('R$','').replace('M','').replace(',','.')));
    if (val === 'ano-recente') carrosFiltrados.sort((a,b)=>b.ano-a.ano);
    if (val === 'nome') carrosFiltrados.sort((a,b)=>a.nome.localeCompare(b.nome));
    if (val === 'relevancia') carrosFiltrados = [...carrosFiltrados];
    paginaAtual = 1;
    renderResultados();
    atualizarPaginacao();
    scrollParaResultados();
  });
});