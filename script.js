document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. LÓGICA DEL CARRUSEL (INICIO Y GALERÍA)
       ========================================== */
    const track = document.getElementById('carouselTrack');
    
    if (track) {
        const slides = Array.from(track.children);
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        const dotsNav = document.getElementById('carouselDots');

        let currentIndex = 0;
        let autoPlayTimer;

        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => moveToSlide(index));
            if (dotsNav) dotsNav.appendChild(dot);
        });

        const dots = dotsNav ? Array.from(dotsNav.children) : [];

        function moveToSlide(index) {
            if (index < 0) {
                currentIndex = slides.length - 1;
            } else if (index >= slides.length) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }

            track.style.transform = `translateX(-${currentIndex * 100}%)`;

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });

            resetAutoPlay();
        }

        if (nextBtn) nextBtn.addEventListener('click', () => moveToSlide(currentIndex + 1));
        if (prevBtn) prevBtn.addEventListener('click', () => moveToSlide(currentIndex - 1));

        function startAutoPlay() {
            autoPlayTimer = setInterval(() => {
                moveToSlide(currentIndex + 1);
            }, 6000);
        }

        function resetAutoPlay() {
            clearInterval(autoPlayTimer);
            startAutoPlay();
        }

        startAutoPlay();
    }

    /* ==========================================
       2. LÓGICA DEL BUSCADOR DE SERVICIOS
       ========================================== */
    const searchInput = document.getElementById('serviceSearchInput');
    const serviceCards = document.querySelectorAll('.service-detail-card');
    const noResultsMsg = document.getElementById('noResultsMessage');
    const clearSearchBtn = document.getElementById('clearSearchBtn');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            let visibleCount = 0;

            serviceCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('.service-card-text').textContent.toLowerCase();
                const tags = card.getAttribute('data-tags') ? card.getAttribute('data-tags').toLowerCase() : '';

                if (title.includes(searchTerm) || description.includes(searchTerm) || tags.includes(searchTerm)) {
                    card.style.display = 'flex';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            if (noResultsMsg) {
                noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
            }
        });

        if (clearSearchBtn) {
            clearSearchBtn.addEventListener('click', () => {
                searchInput.value = '';
                serviceCards.forEach(card => card.style.display = 'flex');
                if (noResultsMsg) noResultsMsg.style.display = 'none';
            });
        }
    }

    /* ==========================================
       3. LÓGICA DEL POPUP MODAL DE WHATSAPP
       ========================================== */
    const wsModal = document.getElementById('wsModal');
    const closeWsModalBtn = document.getElementById('closeWsModal');

    function openModal() {
        if (wsModal) wsModal.classList.add('active');
    }

    function closeModal() {
        if (wsModal) wsModal.classList.remove('active');
    }

    // Vincula todos los botones de la página que abren WhatsApp
    document.querySelectorAll('.btn-whatsapp, #openWsModal, #openWsModalCta').forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    if (closeWsModalBtn) closeWsModalBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (e.target === wsModal) {
            closeModal();
        }
    });
});