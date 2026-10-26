    /* 1. DADOS DO CATÁLOGO COMUNITÁRIO */
    const catalogData = [
      {
        id: 'acai',
        title: 'Açaí',
        price: 'R$ 22,00/litro',
        rawPrice: 22.00,
        category: 'Alimentos',
        image: './assets/alimento-acai.svg',
        isFavorite: true
      },
      {
        id: 'chocolate',
        title: 'Chocolate artesanal 70%',
        price: 'R$ 19,00',
        rawPrice: 19.00,
        category: 'Alimentos',
        image: './assets/alimento-chocolate.svg',
        isFavorite: false
      },
      {
        id: 'manicoba',
        title: 'Maniçoba',
        price: 'R$ 30,00',
        rawPrice: 30.00,
        category: 'Alimentos',
        image: './assets/alimento-manicoba.svg',
        isFavorite: false
      },
      {
        id: 'pato-tucupi',
        title: 'Pato no tucupi',
        price: 'R$ 42,00',
        rawPrice: 42.00,
        category: 'Alimentos',
        image: './assets/alimento-pato-tucupi.svg',
        isFavorite: false
      },
      {
        id: 'peixe-frito',
        title: 'Peixe frito amazônico',
        price: 'R$ 35,00',
        rawPrice: 35.00,
        category: 'Alimentos',
        image: './assets/alimento-peixe-frito.svg',
        isFavorite: false
      },
      {
        id: 'cestaria',
        title: 'Cestaria de fibra',
        price: 'R$ 45,00',
        rawPrice: 45.00,
        category: 'Artesanato',
        image: './assets/artesanato-cestaria.svg',
        isFavorite: false
      },
      {
        id: 'ceramica-marajoara',
        title: 'Cerâmica decorativa marajoara',
        price: 'R$ 65,00',
        rawPrice: 65.00,
        category: 'Artesanato',
        image: './assets/artesanato-ceramica.svg',
        isFavorite: false
      },
      {
        id: 'biojoia-sementes',
        title: 'Colar de sementes amazônicas',
        price: 'R$ 38,00',
        rawPrice: 38.00,
        category: 'Artesanato',
        image: './assets/artesanato-biojoia.svg',
        isFavorite: false
      },
      {
        id: 'bolsa-fibra',
        title: 'Bolsa de fibra trançada',
        price: 'R$ 75,00',
        rawPrice: 75.00,
        category: 'Artesanato',
        image: './assets/artesanato-bolsa.svg',
        isFavorite: false
      },
      {
        id: 'andiroba',
        title: 'Óleo vegetal de andiroba',
        price: 'R$ 28,00',
        rawPrice: 28.00,
        category: 'Plantas',
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=500&q=80',
        isFavorite: true
      },
      {
        id: 'jambu',
        title: 'Jambu amazônico',
        price: 'R$ 12,00',
        rawPrice: 12.00,
        category: 'Plantas',
        image: './assets/plantas-jambu.svg',
        isFavorite: false
      },
      {
        id: 'alfavaca',
        title: 'Muda de alfavaca',
        price: 'R$ 15,00',
        rawPrice: 15.00,
        category: 'Plantas',
        image: './assets/plantas-alfavaca.svg',
        isFavorite: false
      },
      {
        id: 'chicoria-para',
        title: 'Chicória-do-Pará',
        price: 'R$ 10,00',
        rawPrice: 10.00,
        category: 'Plantas',
        image: './assets/plantas-chicoria-para.svg',
        isFavorite: false
      },
      {
        id: 'visita-fabrica-beju',
        title: 'Pacote de turismo: visitação à fábrica Beju',
        price: 'Valor sob consulta',
        category: 'TBC',
        image: './assets/turismo-comunidade-ribeirinha.svg',
        isFavorite: false,
        isInquiry: true
      }
    ];

    const communityContacts = [
      {
        name: 'Ana Clara Souza',
        role: 'Agente comunitária',
        phone: '551199999000x',
        photo: './assets/contatos/ana-clara.svg'
      },
      {
        name: 'João Pedro Lima',
        role: 'Produtor de açaí',
        phone: '551199999000x',
        photo: './assets/contatos/joao-pedro.svg'
      },
      {
        name: 'Francisca Almeida',
        role: 'Parteira tradicional',
        phone: '551199999000x',
        photo: './assets/contatos/francisca.svg'
      },
      {
        name: 'Mateus Oliveira',
        role: 'Jovem comunicador',
        phone: '551199999000x',
        photo: './assets/contatos/mateus.svg'
      },
      {
        name: 'Rita Nascimento',
        role: 'Artesã da comunidade',
        phone: '551199999000x',
        photo: './assets/contatos/rita.svg'
      }
    ];

    /* 2. ESTADO GLOBAL */
    let currentUser = null;
    let currentScreen = 'screen-terms';
    let screenHistory = [];
    let currentCategory = 'Todos';
    let cart = [];
    let remainingSpots = 20;

    /* 3. NAVEGAÇÃO */
    function ensureBackButtonForScreen(screenId) {
      const target = document.getElementById(screenId);
      if (!target || screenId === 'screen-home' || screenId === 'screen-terms') return;

      const existingBackButton = target.querySelector('.screen-back-btn');
      if (existingBackButton) return;

      const backButton = document.createElement('button');
      backButton.type = 'button';
      backButton.className = 'screen-back-btn self-start mb-2 w-9 h-9 rounded-2xl border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 transition shadow-xs';
      backButton.setAttribute('aria-label', 'Voltar');
      backButton.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      `;
      backButton.addEventListener('click', goBackHistory);
      target.insertBefore(backButton, target.firstChild);
    }

    function navigateTo(screenId, params = {}) {
      const target = document.getElementById(screenId);
      if (!target) return;

      document.querySelectorAll('.screen-view').forEach(view => view.classList.remove('active'));
      target.classList.add('active');
      ensureBackButtonForScreen(screenId);

      if (screenHistory[screenHistory.length - 1] !== screenId) {
        screenHistory.push(screenId);
      }
      currentScreen = screenId;
      document.getElementById('appScrollArea').scrollTop = 0;

      updateBottomNav(screenId);

      if (screenId === 'screen-community') {
        renderCommunityChannels();
      }

      // Sincronizar botões da régua superior
      document.querySelectorAll('.nav-tab-btn').forEach(btn => {
        if (btn.getAttribute('data-screen') === screenId) {
          btn.classList.add('bg-emerald-600', 'text-white');
          btn.classList.remove('bg-[#1c3328]');
        } else {
          btn.classList.remove('bg-emerald-600', 'text-white');
          btn.classList.add('bg-[#1c3328]');
        }
      });
    }

    function goBackHistory() {
      if (screenHistory.length > 1) {
        screenHistory.pop();
        const prev = screenHistory[screenHistory.length - 1];
        navigateTo(prev);
      } else {
        navigateTo('screen-home');
      }
    }

    function updateBottomNav(screenId) {
      const bottomBar = document.getElementById('bottomBar');
      if (screenId === 'screen-terms') {
        bottomBar.style.display = 'none';
      } else {
        bottomBar.style.display = 'flex';
      }

      document.querySelectorAll('.bnav-btn').forEach(btn => {
        if (btn.getAttribute('data-nav') === screenId) {
          btn.classList.add('text-[#0E7A4A]');
          btn.classList.remove('text-slate-400');
        } else {
          btn.classList.remove('text-[#0E7A4A]');
          btn.classList.add('text-slate-400');
        }
      });
    }

    function updateUserUI() {
      if (!currentUser) return;
      document.getElementById('homeWelcomeName').textContent = `Olá, ${currentUser.name}!`;
      document.getElementById('homeWelcomeComm').textContent = `Comunidade: ${currentUser.community}`;
    }

    function sair() {
      try {
        localStorage.removeItem('app_comunitario_user');
        localStorage.removeItem('app_comunitario_terms_accepted');
        localStorage.removeItem('app_comunitario_pending_user');
      } catch (error) {
        console.warn('Não foi possível limpar a sessão do usuário.', error);
      }
      window.location.replace('./index.html');
    }

    function logoutOrReset() {
      sair();
    }

    /* 5. TERMOS DE CONSENTIMENTO */
    function handleTermsCheck(checkbox) {
      const btn = document.getElementById('btnEnterTerms');
      if (checkbox.checked) {
        btn.classList.remove('opacity-60', 'cursor-not-allowed');
      } else {
        btn.classList.add('opacity-60');
      }
    }

    function confirmTermsAndEnter() {
      const isChecked = document.getElementById('termsCheckbox').checked;
      if (!isChecked) {
        showToast('Por favor, marque a caixa de concordância.');
        return;
      }
      let consentSaved = true;
      try {
        localStorage.setItem('app_comunitario_terms_accepted', 'true');
      } catch (error) {
        consentSaved = false;
        console.warn('O navegador não salvou o consentimento; ele poderá ser solicitado novamente.', error);
      }
      navigateTo('screen-home');
      showToast(consentSaved
        ? 'Termos aceitos. Bem-vinda!'
        : 'Termos aceitos. O consentimento poderá ser solicitado novamente.');
    }

    function openTermsModal() {
      openGenericModal(
        'Resumo Completo de Salvaguardas',
        `<p><strong>Lei Geral de Proteção de Dados (13.709/2018):</strong> Garantia de que seus dados cadastrais são restritos ao apoio das atividades comunitárias e nunca vendidos a terceiros.</p>
         <p><strong>Lei 13.123/2015 (Patrimônio Genético e CTA):</strong> Proteção intransigente dos saberes tradicionais associados à biodiversidade das parteiras, agricultoras e extrativistas locais.</p>`
      );
    }

    /* 6. CATÁLOGO DE PRODUTOS E FILTROS (IMAGEM 8) */
    function renderCatalog(items) {
      const grid = document.getElementById('catalogGrid');
      grid.innerHTML = '';

      if (items.length === 0) {
        grid.innerHTML = '<p class="col-span-2 text-center text-slate-400 py-6 text-xs">Nenhum produto encontrado.</p>';
        return;
      }

      items.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-2xs flex flex-col justify-between group';

        const heartIcon = prod.isFavorite 
          ? `<svg class="w-4 h-4 text-[#E52D5A]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`
          : `<svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>`;

        card.innerHTML = `
          <div class="relative h-28 w-full bg-slate-100 overflow-hidden">
            <img src="${prod.image}" alt="${prod.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
            <button onclick="toggleFavorite('${prod.id}')" class="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/95 flex items-center justify-center shadow-xs">
              ${heartIcon}
            </button>
          </div>
          <div class="p-2.5 flex flex-col justify-between flex-1">
            <div>
              <h4 class="font-extrabold text-xs text-slate-900 leading-snug line-clamp-2">${prod.title}</h4>
              <p class="font-extrabold text-[#0E7A4A] text-xs mt-1">${prod.price}</p>
            </div>
            <button onclick="${prod.isInquiry ? 'showTourismPackageDetails()' : `addToCart('${prod.id}')`}" class="mt-2 w-full py-1.5 bg-[#0E7A4A] hover:bg-[#0A5C37] text-white rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              <span>${prod.isInquiry ? 'Ver detalhes' : 'Adicionar'}</span>
            </button>
          </div>
        `;
        grid.appendChild(card);
      });
    }

    function showTourismPackageDetails() {
      openGenericModal(
        'Pacote de turismo — fábrica Beju',
        '<p>Conheça a fábrica Beju em uma visita turística comunitária.</p><p>Consulte a comunidade sobre valores, datas e disponibilidade.</p>'
      );
    }

    function setCategoryFilter(cat) {
      currentCategory = cat;
      document.querySelectorAll('.cat-pill').forEach(btn => {
        if (btn.getAttribute('data-cat') === cat) {
          btn.className = 'cat-pill px-3 py-1.5 rounded-full font-bold bg-[#0E7A4A] text-white shrink-0';
        } else {
          btn.className = 'cat-pill px-3 py-1.5 rounded-full font-medium bg-slate-100 text-slate-700 shrink-0';
        }
      });
      filterCatalogItems();
    }

    function filterCatalogItems() {
      const query = document.getElementById('catalogSearch').value.toLowerCase().trim();
      let filtered = catalogData;

      if (currentCategory !== 'Todos') {
        filtered = filtered.filter(p => p.category === currentCategory);
      }
      if (query) {
        filtered = filtered.filter(p => p.title.toLowerCase().includes(query));
      }
      renderCatalog(filtered);
    }

    function toggleFavorite(id) {
      const prod = catalogData.find(p => p.id === id);
      if (prod) {
        prod.isFavorite = !prod.isFavorite;
        filterCatalogItems();
        showToast(prod.isFavorite ? 'Item favoritado!' : 'Removido dos favoritos.');
      }
    }

    /* 7. CARRINHO DE COMPRAS */
    function addToCart(prodId) {
      const prod = catalogData.find(p => p.id === prodId);
      if (!prod) return;

      const exist = cart.find(i => i.id === prodId);
      if (exist) {
        exist.qty += 1;
      } else {
        cart.push({ ...prod, qty: 1 });
      }
      updateCartState();
      showToast(`"${prod.title}" adicionado ao cesto!`);
    }

    function updateCartState() {
      const badge = document.getElementById('headerCartCount');
      const totalCount = cart.reduce((acc, cur) => acc + cur.qty, 0);
      badge.textContent = totalCount;
      renderCartItems();
    }

    function renderCartItems() {
      const list = document.getElementById('cartItemsList');
      const totalEl = document.getElementById('cartTotalPrice');
      list.innerHTML = '';

      if (cart.length === 0) {
        list.innerHTML = '<p class="text-center text-slate-400 py-10">Cesto vazio.</p>';
        totalEl.textContent = 'R$ 0,00';
        return;
      }

      let total = 0;
      cart.forEach(item => {
        total += item.rawPrice * item.qty;
        const row = document.createElement('div');
        row.className = 'flex items-center justify-between p-2.5 bg-slate-50 rounded-2xl border border-slate-200';
        row.innerHTML = `
          <div>
            <p class="font-bold text-slate-900">${item.title}</p>
            <p class="text-[10px] text-[#0E7A4A] font-semibold">R$ ${item.rawPrice.toFixed(2).replace('.', ',')} &times; ${item.qty}</p>
          </div>
          <div class="flex items-center gap-1.5">
            <button onclick="changeCartQty('${item.id}', -1)" class="w-6 h-6 bg-slate-200 rounded-lg text-slate-700 font-bold">-</button>
            <span class="text-xs font-bold px-1">${item.qty}</span>
            <button onclick="changeCartQty('${item.id}', 1)" class="w-6 h-6 bg-slate-200 rounded-lg text-slate-700 font-bold">+</button>
          </div>
        `;
        list.appendChild(row);
      });

      totalEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    function changeCartQty(id, delta) {
      const item = cart.find(i => i.id === id);
      if (!item) return;
      item.qty += delta;
      if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== id);
      }
      updateCartState();
    }

    function toggleCartDrawer() {
      const drawer = document.getElementById('cartDrawer');
      const backdrop = document.getElementById('cartBackdrop');
      const isOpen = !drawer.classList.contains('translate-x-full');

      if (isOpen) {
        drawer.classList.add('translate-x-full');
        backdrop.classList.add('opacity-0', 'pointer-events-none');
      } else {
        renderCartItems();
        drawer.classList.remove('translate-x-full');
        backdrop.classList.remove('opacity-0', 'pointer-events-none');
      }
    }

    function checkoutCart() {
      if (cart.length === 0) {
        showToast('Adicione produtos antes de finalizar.');
        return;
      }
      cart = [];
      updateCartState();
      toggleCartDrawer();
      showToast('Pedido comunitário enviado à cooperativa!');
    }

    /* 8. MENTORIAS E MODAIS */
    function openMentorshipQuestionModal() {
      document.getElementById('modalMentorship').classList.remove('opacity-0', 'pointer-events-none');
    }

    function closeMentorshipModal() {
      document.getElementById('modalMentorship').classList.add('opacity-0', 'pointer-events-none');
      document.getElementById('mentorTopicInput').value = '';
      document.getElementById('mentorDetailInput').value = '';
    }

    function saveMentorshipRecord(e) {
      e.preventDefault();
      const topic = document.getElementById('mentorTopicInput').value.trim();
      const detail = document.getElementById('mentorDetailInput').value.trim();
      if (!topic || !detail) return;

      const record = {
        id: Date.now(),
        topic,
        detail,
        date: new Date().toLocaleDateString('pt-BR')
      };

      const existing = JSON.parse(localStorage.getItem('mentorship_notes') || '[]');
      existing.unshift(record);
      localStorage.setItem('mentorship_notes', JSON.stringify(existing));

      closeMentorshipModal();
      showToast('Dúvida registrada para a mentoria de 05/11!');
    }

    function openMentorshipDetail(title, date) {
      openGenericModal(
        `${date} - ${title}`,
        `<p><strong>Responsável sugerido:</strong> SEBRAE, incubadora e cooperativa territorial.</p>
         <p>Encontro focado no fortalecimento das práticas comunitárias, levantamento de gargalos e sustentabilidade financeira familiar.</p>`
      );
    }

    /* 9. ATIVIDADE DAS BENZEDEIRAS */
    function handleParticipateBenzedeiras() {
      const btn = document.getElementById('btnParticipateWorkshop');
      const spotsEl = document.getElementById('spotsBadgeCount');
      const isEnrolled = localStorage.getItem('enrolled_benzedeiras');

      if (isEnrolled) {
        showToast('Você já está inscrita nesta atividade!');
        return;
      }

      if (remainingSpots > 0) {
        remainingSpots--;
        spotsEl.textContent = remainingSpots;
        localStorage.setItem('enrolled_benzedeiras', 'true');
        btn.textContent = 'Inscrição confirmada ✓';
        btn.classList.add('bg-slate-700');
        showToast('Inscrição confirmada para 29/10 às 16h!');
      }
    }

    /* 10. COMUNIDADE E CANAIS */
    function renderCommunityChannels() {
      const contactsList = document.getElementById('communityContactsList');
      contactsList.innerHTML = '';

      communityContacts.forEach(contact => {
        const message = encodeURIComponent(`Olá, ${contact.name}! Encontrei seu contato no app da comunidade.`);
        const card = document.createElement('div');
        card.className = 'flex items-center gap-3 p-2.5 bg-white rounded-xl border border-slate-200/70';

        const photo = document.createElement('img');
        photo.src = contact.photo;
        photo.alt = `Retrato ilustrado de ${contact.name}`;
        photo.className = 'w-12 h-12 rounded-full object-cover shrink-0';

        const details = document.createElement('div');
        details.className = 'min-w-0 flex-1';
        details.innerHTML = `
          <p class="font-bold text-slate-800 text-xs truncate"></p>
          <p class="text-[10px] text-slate-500"></p>
          <p class="text-[10px] text-slate-400"></p>
        `;
        details.children[0].textContent = contact.name;
        details.children[1].textContent = contact.role;
        details.children[2].textContent = contact.phone;

        const whatsappLink = document.createElement('a');
        whatsappLink.href = `https://wa.me/${contact.phone}?text=${message}`;
        whatsappLink.target = '_blank';
        whatsappLink.rel = 'noopener noreferrer';
        whatsappLink.setAttribute('aria-label', `Conversar com ${contact.name} pelo WhatsApp`);
        whatsappLink.className = 'shrink-0 px-2.5 py-2 bg-[#25D366] hover:bg-[#1fbd5b] text-white text-[10px] font-bold rounded-lg transition';
        whatsappLink.textContent = 'WhatsApp';

        card.append(photo, details, whatsappLink);
        contactsList.appendChild(card);
      });
    }

    /* 11. MODAIS INFORMATIVOS */
    function openBusinessProfileModal() {
      const user = currentUser || { name: 'Maria da Silva', community: 'Vila Nova do Rio' };
      openGenericModal(
        'Perfil do Meu Negócio',
        `<p><strong>Empreendedora:</strong> ${user.name}</p>
         <p><strong>Comunidade:</strong> ${user.community}</p>
         <p><strong>Ramo:</strong> Polpas de Açaí e Derivados Agroecológicos</p>
         <p><strong>Fase de Incubação:</strong> Nível 2 - Ficha Técnica e Custos</p>`
      );
    }

    function openLegalDocumentsModal() {
      openGenericModal(
        'Documentos e Orientações Legais',
        `<p>&bull; <strong>DAP / CAF Pronaf:</strong> Ativa e regularizada.</p>
         <p>&bull; <strong>Boas Práticas de Manipulação:</strong> Certificado comunitário emitido.</p>
         <p>&bull; <strong>Termo de Salvaguarda:</strong> Em conformidade com a Lei 13.123/2015.</p>`
      );
    }

    function openSupportModal() {
      openGenericModal(
        'Rede de Apoio Oficial',
        `<p><strong>UBS do território:</strong> Atendimento básico, pré-natal e vacinação na comunidade.</p>
         <p><strong>CAPS e RAPS:</strong> Apoio psicossocial especializado e escuta humanizada.</p>
         <p><strong>Emergências:</strong> SAMU 192 &bull; CVV 188 (Apoio emocional 24h gratuito).</p>`
      );
    }

    function playSupportItem(type) {
      if (type === 'audio') {
        showToast('Reproduzindo áudio comunitário: Respiração e acalanto...');
      } else if (type === 'video') {
        showToast('Abrindo vídeo: Cuidado e cultivo de ervas medicinais...');
      } else {
        openGenericModal(
          'Cartilha Digital Ilustrada',
          `<p><strong>Guia de Plantas Medicinais da Amazônia</strong></p>
           <p>Conhecimentos sobre o uso seguro de andiroba, copaíba, mastruz e erva-cidreira cultivadas nos quintais agroecológicos.</p>`
        );
      }
    }

    function openInfoModalGuide(title) {
      openGenericModal(
        title,
        `<p>Orientações práticas de cuidado e respeito às tradições locais. Todas as memórias e conhecimentos compartilhados respeitam o consentimento da comunidade.</p>`
      );
    }

    function openGenericModal(title, htmlContent) {
      document.getElementById('genericModalTitle').textContent = title;
      document.getElementById('genericModalContent').innerHTML = htmlContent;
      document.getElementById('modalGeneric').classList.remove('opacity-0', 'pointer-events-none');
    }

    function showHealthComingSoon() {
      openGenericModal(
        'Nenhuma atividade registrada',
        '<p>Não há atividades registradas no momento.</p>'
      );
    }

    function closeGenericModal() {
      document.getElementById('modalGeneric').classList.add('opacity-0', 'pointer-events-none');
    }

    /* 12. ALTERNÂNCIA MODO NOTEBOOK / SMARTPHONE */
    let isNotebook = false;
    function toggleNotebookMode() {
      isNotebook = !isNotebook;
      const body = document.body;
      const label = document.getElementById('notebookBtnLabel');

      if (isNotebook) {
        body.classList.add('mode-notebook-active');
        label.textContent = 'Modo Smartphone';
        showToast('Visualização Notebook ativada');
      } else {
        body.classList.remove('mode-notebook-active');
        label.textContent = 'Modo Notebook';
        showToast('Visualização Smartphone ativada');
      }
    }

    /* 13. TOAST */
    let toastTimer = null;
    function showToast(msg) {
      const toast = document.getElementById('appToast');
      document.getElementById('toastText').textContent = msg;
      toast.classList.remove('opacity-0', 'pointer-events-none');

      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.add('opacity-0', 'pointer-events-none');
      }, 2600);
    }

    /* 14. INICIALIZAÇÃO */
    window.addEventListener('DOMContentLoaded', () => {
      const sessionValue = new URLSearchParams(window.location.hash.slice(1)).get('session');
      let sessionUser = null;

      if (sessionValue) {
        try {
          const parsedUser = JSON.parse(sessionValue);
          if (typeof parsedUser.name === 'string' && typeof parsedUser.community === 'string') {
            sessionUser = parsedUser;
          }
        } catch (error) {
          console.warn('Os dados de sessão recebidos pelo link são inválidos.', error);
        }
      }

      let savedUser = null;
      try {
        savedUser = localStorage.getItem('app_comunitario_user');
      } catch (error) {
        console.warn('O navegador bloqueou a leitura da sessão salva; usando os dados recebidos no acesso.', error);
      }

      if (!sessionUser && !savedUser) {
        window.location.replace('./index.html');
        return;
      }

      try {
        currentUser = sessionUser || JSON.parse(savedUser);
      } catch (error) {
        try {
          localStorage.removeItem('app_comunitario_user');
        } catch (storageError) {
          console.warn('Não foi possível limpar a sessão inválida armazenada.', storageError);
        }
        window.location.replace('./index.html');
        return;
      }

      if (sessionUser) {
        try {
          localStorage.setItem('app_comunitario_user', JSON.stringify(currentUser));
        } catch (error) {
          console.warn('A sessão não poderá ser mantida após recarregar esta página neste navegador.', error);
        }
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }

      updateUserUI();

      let pendingUser = null;
      try {
        pendingUser = JSON.parse(localStorage.getItem('app_comunitario_pending_user') || 'null');
      } catch (error) {
        console.warn('Não foi possível ler o cadastro pendente.', error);
      }

      if (pendingUser && currentUser && currentUser.name === pendingUser.name && currentUser.community === pendingUser.community) {
        try {
          localStorage.removeItem('app_comunitario_pending_user');
        } catch (error) {
          console.warn('Não foi possível limpar o cadastro pendente.', error);
        }
      }

      let termsAccepted = false;
      try {
        termsAccepted = localStorage.getItem('app_comunitario_terms_accepted') === 'true';
      } catch (error) {
        console.warn('O navegador bloqueou a leitura do consentimento salvo.', error);
      }

      if (pendingUser && !termsAccepted) {
        navigateTo('screen-terms');
      } else {
        navigateTo(termsAccepted ? 'screen-home' : 'screen-terms');
      }
      renderCatalog(catalogData);
    });
