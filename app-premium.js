// BharatVirasat Premium - Advanced Features & 3D Coverflow Decks
// Optimized for seamless multi-device responsiveness and fast interaction

class BharatVirasat {
  constructor() {
    this.heritageData = window.heritageData || [];
    this.filteredData = [...this.heritageData];
    this.userPreferences = this.loadPreferences();
    this.localReviews = this.loadLocalReviews();
    this.darkMode = localStorage.getItem('darkMode') === 'true';
    this.swiperInstances = [];
    this.init();
  }

  init() {
    this.setupDarkMode();
    this.setupEventListeners();
    this.renderCards();
    this.updateStats();
  }

  // ===== DARK MODE =====
  setupDarkMode() {
    const toggle = document.querySelector('.dark-toggle');
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
      if (toggle) toggle.textContent = '☀️';
    }

    if (toggle) {
      toggle.addEventListener('click', () => this.toggleDarkMode());
    }
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', this.darkMode);
    const toggle = document.querySelector('.dark-toggle');
    if (toggle) toggle.textContent = this.darkMode ? '☀️' : '🌙';
  }

  // ===== EVENT LISTENERS =====
  setupEventListeners() {
    // Category filter chips
    const categoryButtons = document.querySelectorAll('.category-filter');
    categoryButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        categoryButtons.forEach(b => b.classList.remove('active'));
        const target = e.target.closest('button');
        target.classList.add('active');
        this.applyFilters();
      });
    });

    // Zone filter chips
    const zoneButtons = document.querySelectorAll('.zone-filter');
    zoneButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        zoneButtons.forEach(b => b.classList.remove('active'));
        const selectedButton = e.target.closest('button');
        selectedButton.classList.add('active');
        const regionSelect = document.querySelector('.zone-select');
        if (regionSelect) regionSelect.value = selectedButton.dataset.filter || '';
        this.applyFilters();
      });
    });

    const regionSelect = document.querySelector('.zone-select');
    if (regionSelect) {
      regionSelect.addEventListener('change', () => {
        zoneButtons.forEach(button => {
          button.classList.toggle('active', (button.dataset.filter || '') === regionSelect.value);
        });
        this.applyFilters();
      });
    }

    // Time budget input
    const timeInput = document.getElementById('exploration-time');
    if (timeInput) {
      timeInput.addEventListener('change', () => this.applyFilters());
    }

    // Interest checkboxes
    const interestCheckboxes = document.querySelectorAll('.interest-filter');
    interestCheckboxes.forEach(cb => {
      cb.addEventListener('change', () => this.applyFilters());
    });

    // Search bar functionality
    const searchInput = document.getElementById('site-search-input') || document.querySelector('input[placeholder*="Search"]');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
    }
  }

  // ===== FILTERING & SEARCH =====
  applyFilters() {
    this.filteredData = [...this.heritageData];

    // Category filter
    const activeCategory = document.querySelector('.category-filter.active');
    if (activeCategory?.dataset.filter) {
      const selected = activeCategory.dataset.filter.toLowerCase();
      this.filteredData = this.filteredData.filter(site => {
        const cat = (site.category || '').toLowerCase();
        return cat.includes(selected);
      });
    }

    // Zone filter
    const activeZone = document.querySelector('.zone-filter.active');
    const selectedZone = document.querySelector('.zone-select')?.value || activeZone?.dataset.filter;
    if (selectedZone) {
      this.filteredData = this.filteredData.filter(site => site.zone === selectedZone);
    }

    // Time-based filter
    const timeInput = document.getElementById('exploration-time');
    if (timeInput && timeInput.value) {
      const hours = parseInt(timeInput.value);
      this.filteredData = this.filteredData.filter(site => (site.minVisitTime || 1) <= hours);
    }

    // Interest checkboxes
    const selectedInterests = Array.from(document.querySelectorAll('.interest-filter:checked'))
      .map(cb => cb.value.toLowerCase());

    if (selectedInterests.length > 0) {
      this.filteredData = this.filteredData.filter(site => {
        const siteKeywords = [
          site.keywords,
          ...(site.tags || []),
          site.category,
          site.architecturalStyle,
          site.shortSummary,
          site.description
        ].filter(Boolean).join(' ').toLowerCase();
        return selectedInterests.some(interest => siteKeywords.includes(interest));
      });
    }

    this.renderCards();
    this.updateStats();
    this.savePreferences();
  }

  handleSearch(query) {
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) {
      this.applyFilters();
      return;
    }
    this.filteredData = this.heritageData.filter(site =>
      (site.name && site.name.toLowerCase().includes(lowerQuery)) ||
      (site.state && site.state.toLowerCase().includes(lowerQuery)) ||
      (site.category && site.category.toLowerCase().includes(lowerQuery)) ||
      (site.description && site.description.toLowerCase().includes(lowerQuery))
    );
    this.renderCards();
  }

  // ===== CATEGORIZATION HELPER =====
  categorizeSites(sites) {
    const decks = [
      {
        id: 'deck-forts',
        title: 'Fortresses, Citadels & Palaces',
        tag: 'Royal Architecture',
        desc: 'Impregnable mountain forts, royal residences, and bastions of ancient dynasties.',
        matcher: (s) => {
          const t = `${s.category || ''} ${s.name || ''} ${s.architecturalStyle || ''}`.toLowerCase();
          return t.includes('fort') || t.includes('palace') || t.includes('mahal') || t.includes('wada') || t.includes('citadel');
        }
      },
      {
        id: 'deck-caves',
        title: 'Rock-Cut Marvels & Caves',
        tag: 'Ancient Sculptures',
        desc: 'Monolithic sanctuaries carved directly out of solid mountain basalt.',
        matcher: (s) => {
          const t = `${s.category || ''} ${s.name || ''} ${s.architecturalStyle || ''}`.toLowerCase();
          return t.includes('cave') || t.includes('rock') || t.includes('sculpture') || t.includes('monolith') || t.includes('stepwell') || t.includes('vav');
        }
      },
      {
        id: 'deck-sacred',
        title: 'Sacred Temples & Timeless Shrines',
        tag: 'Spiritual Artistry',
        desc: 'Architectural mandirs and sanctuaries embodying sacred geometry and spiritual lore.',
        matcher: (s) => {
          const t = `${s.category || ''} ${s.name || ''} ${s.architecturalStyle || ''}`.toLowerCase();
          return t.includes('temple') || t.includes('sacred') || t.includes('shrine') || t.includes('mandir') || t.includes('stupa');
        }
      }
    ];

    const results = [];
    const usedIds = new Set();

    decks.forEach(deck => {
      const matched = sites.filter(s => deck.matcher(s));
      matched.forEach(s => usedIds.add(s.id));
      if (matched.length > 0) {
        results.push({ ...deck, sites: matched });
      }
    });

    // Remainder items into an Explorer Deck
    const remainder = sites.filter(s => !usedIds.has(s.id));
    if (remainder.length > 0) {
      results.push({
        id: 'deck-monuments',
        title: 'Historic Monuments & Landmarks',
        tag: 'Subcontinent Heritage',
        desc: 'Iconic heritage monuments, minarets, and cultural wonders.',
        sites: remainder
      });
    }

    return results;
  }

  // ===== RENDERING 3D COVERFLOW DECKS =====
  renderCards() {
    const container = document.getElementById('decks-container') || document.querySelector('.sites-container');
    if (!container) return;

    // Destroy prior Swiper instances to eliminate memory leaks
    this.swiperInstances.forEach(inst => {
      if (inst && typeof inst.destroy === 'function') inst.destroy(true, true);
    });
    this.swiperInstances = [];

    if (this.filteredData.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 4rem 1rem;">
          <p style="font-size: 1.25rem; color: var(--text-muted);">No heritage marvels found for this criteria.</p>
          <button type="button" class="btn btn-primary clear-filters-btn" style="margin-top: 1.25rem;">Show All Heritage Marvels</button>
        </div>
      `;
      container.querySelector('.clear-filters-btn')?.addEventListener('click', () => this.clearFilters());
      return;
    }

    const decks = this.categorizeSites(this.filteredData);

    container.innerHTML = decks.map(deck => `
      <div class="deck-block" id="block-${deck.id}">
        <div class="deck-header">
          <span class="deck-tag">${deck.tag}</span>
          <h2>${deck.title}</h2>
          <p>${deck.desc}</p>
        </div>
        <div class="swiper-deck-wrapper">
          <div class="swiper swiper-${deck.id}">
            <div class="swiper-wrapper">
              ${deck.sites.map(site => this.createCardSlide(site)).join('')}
            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
        </div>
      </div>
    `).join('');

    this.attachCardListeners();
    this.initSwiperDecks(decks);
  }

  createCardSlide(site) {
    const summary = site.shortSummary || site.description || 'Discover this heritage marvel of India.';
    const image = this.resolveImagePath(site.image || site.coverImage);
    const era = site.yearBuilt || site.era || 'Historic Period';

    return `
      <div class="swiper-slide">
        <button class="gallery-image-button" type="button" data-site-id="${site.id}" aria-label="Inspect ${site.name}">
          <img src="${image || ''}" alt="${site.name}" loading="lazy" onerror="this.onerror=null;this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 560%22%3E%3Crect fill=%22%23143530%22 width=%22400%22 height=%22560%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2228%22 fill=%22%23d4af37%22 text-anchor=%22middle%22 dy=%22.3em%22%3EHeritage Site%3C/text%3E%3C/svg%3E'">
          <span class="gallery-image-hint">View details</span>
        </button>
        <div class="gallery-caption">
          <div>
            <p class="gallery-kicker">${site.state || site.location || 'India'} • ${era}</p>
            <h3>${site.name}</h3>
          </div>
          <p>${summary.substring(0, 110)}${summary.length > 110 ? '...' : ''}</p>
        </div>
      </div>
    `;
  }

  initSwiperDecks(decks) {
    if (typeof Swiper === 'undefined') {
      console.warn("Swiper library is loading or unavailable.");
      return;
    }

    decks.forEach(deck => {
      const selector = `.swiper-${deck.id}`;
      const el = document.querySelector(selector);
      if (!el) return;

      const slideCount = deck.sites.length;

      const swiperInstance = new Swiper(selector, {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        loop: slideCount > 2,
        speed: 550,
        coverflowEffect: {
          rotate: 32,
          stretch: 0,
          depth: 140,
          modifier: 1,
          slideShadows: true,
        },
        pagination: {
          el: `${selector} .swiper-pagination`,
          clickable: true,
        },
        navigation: {
          nextEl: `${selector} .swiper-button-next`,
          prevEl: `${selector} .swiper-button-prev`,
        },
        keyboard: {
          enabled: true,
        }
      });

      this.swiperInstances.push(swiperInstance);
    });
  }

  resolveImagePath(image) {
    if (!image || image.startsWith('data:') || image.startsWith('http')) return image || '';
    return image.replace(/^\.\.\/images\//, 'images/');
  }

  attachCardListeners() {
    const container = document.getElementById('decks-container') || document.querySelector('.sites-container');
    if (!container) return;

    container.querySelectorAll('.gallery-image-button').forEach(btn => {
      btn.addEventListener('click', () => {
        const site = this.heritageData.find(item => item.id === btn.dataset.siteId);
        if (site) this.showDetailModal(site);
      });
    });
  }

  clearFilters() {
    document.querySelectorAll('.category-filter, .zone-filter').forEach(button => {
      button.classList.toggle('active', button.dataset.filter === '');
    });
    const regionSelect = document.querySelector('.zone-select');
    if (regionSelect) regionSelect.value = '';
    document.querySelectorAll('.interest-filter').forEach(cb => { cb.checked = false; });
    const timeInput = document.getElementById('exploration-time');
    if (timeInput) timeInput.value = '';
    const searchInput = document.getElementById('site-search-input') || document.querySelector('input[placeholder*="Search"]');
    if (searchInput) searchInput.value = '';
    this.applyFilters();
  }

  // ===== DETAILS MODAL =====
  showDetailModal(site) {
    if (typeof site === 'string') {
      site = this.heritageData.find(s => s.name === site);
    }
    if (!site) return;

    const modal = document.getElementById('detail-modal');
    if (!modal) return;

    const content = modal.querySelector('.modal-content');
    const description = site.shortSummary || site.description || `${site.name} is an architectural heritage landmark of India.`;
    const images = Array.isArray(site.gallery) && site.gallery.length ? site.gallery : [site.coverImage || site.image];
    const imageList = [...new Set(images.map(img => this.resolveImagePath(img)).filter(Boolean))];

    content.innerHTML = `
      <div class="modal-header">
        <div>
          <h2>${site.name}</h2>
          <p style="color: var(--primary); margin-top: 0.25rem; font-weight: 600;">${site.location || site.state} • ${site.yearBuilt || 'Historic Era'}</p>
        </div>
        <button class="modal-close" aria-label="Close modal">&times;</button>
      </div>
      <div style="padding: 1rem 0;">
        <h3 style="color: var(--primary); margin-bottom: 0.75rem;">🖼️ Image Archive</h3>
        <div class="site-gallery">
          ${imageList.map(img => `<img src="${img}" alt="${site.name}" loading="lazy" onerror="this.remove()">`).join('')}
        </div>

        <div class="audio-guide-panel">
          <h3 style="margin-bottom: 0.4rem;">🎧 Audio Guide</h3>
          <p style="font-size: 0.88rem; margin-bottom: 0.75rem;">Listen to the spoken cultural narrative.</p>
          <select class="audio-voice-select" aria-label="Choose voice"></select>
          <select class="audio-style-select" aria-label="Narration style" style="margin-top: 0.4rem;">
            <option value="storyteller">Calm Storyteller</option>
            <option value="documentary">Documentary Narrator</option>
            <option value="local">Warm Local Guide</option>
            <option value="kids">Curious Young Explorer</option>
          </select>
          <div style="margin-top: 0.8rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button class="btn btn-secondary modal-audio-btn" type="button">▶ Play Story</button>
            <button class="btn btn-secondary mood-audio-btn" type="button">✨ Ambient Mood</button>
          </div>
        </div>

        <h3 style="color: var(--primary); margin-bottom: 0.5rem;">📖 Cultural Significance</h3>
        <p style="line-height: 1.6; margin-bottom: 1.25rem;">${description}</p>

        <div class="ticket-panel">
          <strong>🎟️ Ticketing & Access</strong>
          <p style="margin-top: 0.35rem;">${site.ticketPrice || 'Verify current entry tariffs on the Archaeological Survey of India (ASI) or state portal.'}</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
          <div style="background: rgba(212,175,55,0.08); padding: 1rem; border-radius: 8px; border: 1px solid rgba(212,175,55,0.2);">
            <p style="font-size: 0.85rem; color: var(--text-muted);">🕐 Suggested Time</p>
            <p style="font-size: 1.25rem; font-weight: 700; color: var(--primary);">${site.minVisitTime || 2}-3 Hours</p>
          </div>
          <div style="background: rgba(212,175,55,0.08); padding: 1rem; border-radius: 8px; border: 1px solid rgba(212,175,55,0.2);">
            <p style="font-size: 0.85rem; color: var(--text-muted);">📍 Cultural Zone</p>
            <p style="font-size: 1.25rem; font-weight: 700; color: var(--primary);">${site.zone || site.state}</p>
          </div>
        </div>

        <button class="btn btn-primary" style="width: 100%; justify-content: center;" onclick="window.open('https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.name + ', ' + (site.location || site.state))}', '_blank', 'noopener')">
          📍 Open Live Directions in Maps
        </button>
      </div>
    `;

    modal.classList.add('active');

    // Attach voice & closing listeners
    const voiceSelect = modal.querySelector('.audio-voice-select');
    if (typeof window.populateAudioVoices === 'function') window.populateAudioVoices(voiceSelect);

    modal.querySelector('.modal-audio-btn')?.addEventListener('click', () => {
      const audioText = site.audioNarration || `${site.name}. ${description}`;
      if (typeof window.playHeritageAudio === 'function') {
        window.playHeritageAudio({ ...site, audioNarration: audioText }, modal.querySelector('.audio-style-select')?.value, voiceSelect?.value);
      }
    });

    modal.querySelector('.mood-audio-btn')?.addEventListener('click', () => {
      const audioText = site.audioNarration || `${site.name}. ${description}`;
      if (typeof window.playHeritageAudio === 'function') {
        window.playHeritageAudio({ ...site, audioNarration: audioText }, 'mood');
      }
    });

    modal.querySelector('.modal-close')?.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  // ===== STATS =====
  updateStats() {
    const totalSites = this.heritageData.length;
    const unescoSites = this.heritageData.filter(site => site.unescoStatus?.toLowerCase().includes('unesco')).length;
    const listedSites = this.filteredData.length;
    const uniqueZones = [...new Set(this.heritageData.map(s => s.zone).filter(Boolean))].length;

    const statsContainer = document.querySelector('.stats');
    if (!statsContainer) return;

    statsContainer.innerHTML = `
      <div class="stat-card">
        <div class="stat-number">${totalSites}</div>
        <div class="stat-label">Heritage Landmarks</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${unescoSites}</div>
        <div class="stat-label">UNESCO Listed Sites</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${uniqueZones}</div>
        <div class="stat-label">Cultural Zones</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${listedSites}</div>
        <div class="stat-label">Curated In Decks</div>
      </div>
    `;
  }

  savePreferences() {
    this.userPreferences = {
      interests: Array.from(document.querySelectorAll('.interest-filter:checked')).map(cb => cb.value),
      zone: document.querySelector('.zone-filter.active')?.dataset.filter,
      category: document.querySelector('.category-filter.active')?.dataset.filter,
      time: document.getElementById('exploration-time')?.value
    };
    localStorage.setItem('bharat-preferences', JSON.stringify(this.userPreferences));
  }

  loadPreferences() {
    try {
      return JSON.parse(localStorage.getItem('bharat-preferences') || '{}');
    } catch {
      return {};
    }
  }

  loadLocalReviews() {
    try {
      return JSON.parse(localStorage.getItem('bharat-reviews') || '{}');
    } catch {
      return {};
    }
  }
}

// Global Mount
document.addEventListener('DOMContentLoaded', () => {
  window.bharat = new BharatVirasat();
});

// Text to Speech
window.populateAudioVoices = (select) => {
  if (!select || !('speechSynthesis' in window)) return;
  const voices = window.speechSynthesis.getVoices().filter(voice => voice.lang.startsWith('en'));
  select.innerHTML = '<option value="">Default Device Voice</option>' + voices.map(voice =>
    `<option value="${voice.name.replace(/"/g, '&quot;')}">${voice.name} (${voice.lang})</option>`
  ).join('');
};

if ('speechSynthesis' in window) {
  window.speechSynthesis.addEventListener('voiceschanged', () => {
    window.populateAudioVoices(document.querySelector('.audio-voice-select'));
  });
}

window.playHeritageAudio = (site, style = 'storyteller', voiceName = '') => {
  if (!('speechSynthesis' in window)) return;
  const settings = {
    storyteller: { rate: 0.88, pitch: 1.0 },
    documentary: { rate: 0.98, pitch: 0.85 },
    local: { rate: 0.92, pitch: 1.12 },
    kids: { rate: 1.05, pitch: 1.3 },
    mood: { rate: 0.76, pitch: 0.92 }
  }[style] || { rate: 0.9, pitch: 1 };
  const utterance = new SpeechSynthesisUtterance(site.audioNarration || site.shortSummary || site.name);
  utterance.lang = 'en-IN';
  utterance.rate = settings.rate;
  utterance.pitch = settings.pitch;
  const voice = window.speechSynthesis.getVoices().find(item => item.name === voiceName);
  if (voice) utterance.voice = voice;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};