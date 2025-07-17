// Busca dinâmica Herculion

// Dados dos carros (vendidos.json)
const todosCarros = [
  {
    "id": "bugatti-chiron",
    "nome": "Bugatti Chiron",
    "marca": "Bugatti",
    "modelo": "Chiron",
    "ano": 2024,
    "preco": "R$ 15M",
    "cor": "Preto",
    "potencia": "1.500 HP",
    "imagem": "assets/images/bugatti_chiron.png",
    "destaque": true,
    "novo": true,
    "descricao": "A velocidade redefinida. Luxo, exclusividade e performance incomparável."
  },
  {
    "id": "lamborghini-urus",
    "nome": "Lamborghini Urus",
    "marca": "Lamborghini",
    "modelo": "Urus",
    "ano": 2024,
    "preco": "R$ 2.5M",
    "cor": "Branco",
    "potencia": "650 HP",
    "imagem": "assets/images/lamborghini_urus.png",
    "destaque": false,
    "novo": false,
    "descricao": "O SUV mais rápido do mundo, unindo esportividade e luxo."
  },
  {
    "id": "porsche-911",
    "nome": "Porsche 911 Turbo S",
    "marca": "Porsche",
    "modelo": "911 Turbo S",
    "ano": 2023,
    "preco": "R$ 1.2M",
    "cor": "Prata",
    "potencia": "650 HP",
    "imagem": "assets/images/porsche_911.png",
    "destaque": false,
    "novo": false,
    "descricao": "O esportivo definitivo, tradição e inovação em cada detalhe."
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
    "imagem": "assets/images/ferrari_roma.png",
    "destaque": true,
    "novo": false,
    "descricao": "Cupê, esportivo que combina elegância clássica com tecnologia de ponta. Ferrari em sua essência."
  },
  {
    "id": "mclaren-720s",
    "nome": "McLaren 720S",
    "marca": "McLaren",
    "modelo": "720S",
    "ano": 2021,
    "preco": "R$ 3.8M",
    "cor": "Laranja",
    "potencia": "720 HP",
    "imagem": "assets/images/mclaren_720s.png",
    "destaque": false,
    "novo": false,
    "descricao": "Design arrojado, leveza e potência britânica."
  }
];

let carrosFiltrados = [...todosCarros];
let paginaAtual = 1;
const porPagina = 6;

function scrollParaResultados() {
  const secaoResultados = document.querySelector('.resultados-section');
  if (secaoResultados) {
    secaoResultados.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function aplicarFiltros() {
  const texto = document.querySelector('.busca-input').value.trim().toLowerCase();
  const marca = document.querySelectorAll('.filtro-select')[0].value;
  const preco = document.querySelectorAll('.filtro-select')[1].value;
  const ano = document.querySelectorAll('.filtro-select')[2].value;
  const cor = document.querySelectorAll('.filtro-select')[3].value;

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
    return matchTexto && matchMarca && matchPreco && matchAno && matchCor;
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
      <div class="resultado-item reveal reveal-visible">
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
      </div>
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
}

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
      scrollParaResultados();
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