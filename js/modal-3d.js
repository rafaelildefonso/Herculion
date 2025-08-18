/* Modal 3D reutilizável
   - Cria um botão flutuante "Ver em 3D" nas páginas de carros
   - Abre um modal em tela cheia com um iframe do Sketchfab
   - Ao fechar, remove completamente o modal e o iframe do DOM para liberar memória
   - O modal é independente e não interfere no layout existente
*/
(function () {
  'use strict';

  // URL base do modelo 3D - o ID será inserido dinamicamente
  const SKETCHFAB_BASE_URL = "https://sketchfab.com/models/{{model_id}}/embed?api_version=1.5.1&api_id=1_api-frame&annotations_visible=0&autospin=0.1&autostart=1&camera=0&double_click=0&internal=1&max_texture_size=1024&preload=1&scrollwheel=0&sound_enable=0&transparent=1&ui_animations=0&ui_annotations=0&ui_ar=1&ui_ar_help=0&ui_color=white&ui_fadeout=0&ui_fullscreen=0&ui_help=0&ui_infos=0&ui_inspector=0&ui_settings=0&ui_stop=0&ui_theatre=0&ui_vr=0&ui_watermark=0&dnt=1";
  // Função para obter o ID do modelo da página atual
  function getModelId() {
    return document.body.getAttribute('data-model-3d') || ''; // ID padrão se não especificado
  }

  // Gerar URL completa com o ID do modelo
  function getModelUrl() {
    const modelId = getModelId();
    if(modelId === '') return '';
    return SKETCHFAB_BASE_URL.replace('{{model_id}}', modelId);
  }

  function createOverlay(url) {
    // Overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal3d-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Visualização 3D do carro');

    // Container interno
    const container = document.createElement('div');
    container.className = 'modal3d-container';

    // Botão de fechar
    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal3d-close';
    closeBtn.setAttribute('aria-label', 'Fechar');
    closeBtn.type = 'button';
    closeBtn.textContent = '×';

    // Iframe
    const iframe = document.createElement('iframe');
    iframe.setAttribute('data-v-efb8fe40', '');
    iframe.className = 'modal3d-frame';
    iframe.src = url; // usar exatamente a URL especificada
    iframe.allow = 'autoplay; fullscreen; xr-spatial-tracking';
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('mozallowfullscreen', 'true');
    iframe.setAttribute('webkitallowfullscreen', 'true');
    iframe.setAttribute('xr-spatial-tracking', 'true');
    iframe.setAttribute('execution-while-out-of-viewport', 'true');
    iframe.setAttribute('execution-while-not-rendered', 'true');
    iframe.setAttribute('web-share', 'true');
    iframe.title = 'Modelo 3D do carro';
    iframe.frameborder = '0';

    // Montagem
    container.appendChild(iframe);
    container.appendChild(closeBtn);
    overlay.appendChild(container);

    // Interações
    function removeOverlay() {
      // Remove listeners para evitar vazamentos
      closeBtn.removeEventListener('click', removeOverlay);
      overlay.removeEventListener('click', onOverlayClick);
      document.removeEventListener('keydown', onKeyDown);
      // Remove nó do DOM
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      // Libera scroll do body
      document.body.classList.remove('modal3d-no-scroll');
    }

    function onOverlayClick(e) {
      // Fecha apenas se clicar fora do conteúdo (no fundo escuro)
      if (e.target === overlay) {
        removeOverlay();
      }
    }

    function onKeyDown(e) {
      if (e.key === 'Escape') removeOverlay();
    }

    closeBtn.addEventListener('click', removeOverlay);
    overlay.addEventListener('click', onOverlayClick);
    document.addEventListener('keydown', onKeyDown);

    return { overlay, removeOverlay };
  }

  function openModal3D(customUrl) {
    const url = typeof customUrl === 'string' && customUrl.trim() ? customUrl : getModelUrl();
    const { overlay } = createOverlay(url);
    document.body.appendChild(overlay);
    document.body.classList.add('modal3d-no-scroll');
  }

  function createFloatingButton() {
    const btn = document.createElement('button');
    btn.className = 'modal3d-open-btn';
    btn.type = 'button';
    btn.textContent = 'Ver em 3D';
    btn.addEventListener('click', function () {
      openModal3D(); // usa a URL padrão exigida
    });

    // Inserir perto do final do body para não afetar fluxo
    document.body.appendChild(btn);
  }

  // Expor API mínima global para reutilização manual, se necessário
  window.Herculion3DModal = {
    open: openModal3D
  };

  // Inicialização automática: criar botão flutuante apenas nas páginas de carro
  document.addEventListener('DOMContentLoaded', function() {
    try {
      if (window.location.pathname.includes('/carros/') && getModelId() !== '') {
        createFloatingButton();
      }
    } catch (error) {
      console.error('Erro ao inicializar o botão 3D:', error);
    }
  });
})();
