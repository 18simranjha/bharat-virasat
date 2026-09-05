// BharatVirasat Premium - Advanced Features
// Personalized heritage exploration with smart recommendations

class BharatVirasat {
  constructor() {
    this.heritageData = window.heritageData || [];
    this.filteredData = [...this.heritageData];
    this.userPreferences = this.loadPreferences();
    this.localReviews = this.loadLocalReviews();
    this.darkMode = localStorage.getItem('darkMode') === 'true';
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
    document.querySelector('.dark-toggle').textContent = this.darkMode ? '☀️' : '🌙';
  }

  // ===== EVENT LISTENERS =====
  setupEventListeners() {
    // Filter buttons
    const categoryButtons = document.querySelectorAll('.category-filter');
    categoryButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        categoryButtons.forEach(b => b.classList.remove('active'));
        e.target.closest('button').classList.add('active');
        this.applyFilters();
      });
    });

    // Zone filters
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

    // Time input
    const timeInput = document.getElementById('exploration-time');
    if (timeInput) {
      timeInput.addEventListener('change', () => this.applyFilters());
    }

    // Interest checkboxes
    const interestCheckboxes = document.querySelectorAll('.interest-filter');
    interestCheckboxes.forEach(cb => {
      cb.addEventListener('change', () => this.applyFilters());
    });

    // Search functionality
    const searchInput = document.querySelector('input[placeholder*="Search"]');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
    }

    // Explore buttons
    const exploreButtons = document.querySelectorAll('.explore-btn');
    exploreButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const cardTitle = e.target.closest('.card')?.querySelector('.card-title')?.textContent;
        this.showDetailModal(cardTitle);
      });
    });
  }

  // ===== FILTERING & SEARCH =====
  applyFilters() {
    this.filteredData = [...this.heritageData];

    // Category filter
    const activeCategory = document.querySelector('.category-filter.active');
    if (activeCategory?.dataset.filter) {
      const categories = activeCategory.dataset.filter.split(',');
      this.filteredData = this.filteredData.filter(site =>
        categories.includes(site.category)
      );
    }

    // Zone filter
    const activeZone = document.querySelector('.zone-filter.active');
    const selectedZone = document.querySelector('.zone-select')?.value || activeZone?.dataset.filter;
    if (selectedZone) {
      this.filteredData = this.filteredData.filter(site =>
        site.zone === selectedZone
      );
    }

    // Time-based filter
    const timeInput = document.getElementById('exploration-time');
    if (timeInput && timeInput.value) {
      const hours = parseInt(timeInput.value);
      // Filter sites suitable for this time duration
      this.filteredData = this.filteredData.filter(site => {
        const minTime = site.minVisitTime || 1;
        return minTime <= hours;
      });
    }

    // Interest-based filter
    const selectedInterests = Array.from(document.querySelectorAll('.interest-filter:checked'))
      .map(cb => cb.value);

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
        return selectedInterests.some(interest =>
          siteKeywords.includes(interest.toLowerCase())
        );
      });
    }

    this.renderCards();
    this.updateStats();
    this.savePreferences();
  }

  handleSearch(query) {
    const lowerQuery = query.toLowerCase();
    this.filteredData = this.heritageData.filter(site =>
      site.name.toLowerCase().includes(lowerQuery) ||
      site.state.toLowerCase().includes(lowerQuery) ||
      (site.category && site.category.toLowerCase().includes(lowerQuery)) ||
      (site.description && site.description.toLowerCase().includes(lowerQuery))
    );
    this.renderCards();
  }

  // ===== RENDERING =====
  renderCards() {
    const container = document.querySelector('.sites-container');
    if (!container) return;

    if (this.filteredData.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
          <p style="font-size: 1.2rem; color: #666;">No heritage sites match this combination yet.</p>
          <button type="button" class="btn btn-primary clear-filters-btn" style="margin-top: 1rem;">Show All Heritage Sites</button>
        </div>
      `;
      container.querySelector('.clear-filters-btn').addEventListener('click', () => this.clearFilters());
      return;
    }

    container.innerHTML = this.filteredData.map((site, idx) => this.createCard(site, idx)).join('');
    this.attachCardListeners();
  }

  clearFilters() {
    document.querySelectorAll('.category-filter, .zone-filter').forEach(button => {
      button.classList.toggle('active', button.dataset.filter === '');
    });
    const regionSelect = document.querySelector('.zone-select');
    if (regionSelect) regionSelect.value = '';
    document.querySelectorAll('.interest-filter').forEach(checkbox => {
      checkbox.checked = false;
    });
    const timeInput = document.getElementById('exploration-time');
    if (timeInput) timeInput.value = '';
    this.applyFilters();
  }

  createCard(site, idx) {
    const badge = this.getRecommendationBadge(site);
    const visitTime = site.minVisitTime || 2;
    const description = site.description || site.shortSummary || 'Discover this heritage site of India.';
    const image = site.image || site.coverImage;

    return `
      <div class="card" style="animation-delay: ${idx * 0.1}s">
        <div class="card-image">
          <img src="${image || 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22%3E%3Crect fill=%22%232c3e50%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2230%22 fill=%22%23d4af37%22 text-anchor=%22middle%22 dy=%22.3em%22%3E%F0%9F%8F%9B%EF%B8%8F Heritage%3C/text%3E%3C/svg%3E'}" onerror="this.onerror=null;this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22%3E%3Crect fill=%22%232c3e50%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2230%22 fill=%22%23d4af37%22 text-anchor=%22middle%22 dy=%22.3em%22%3E%F0%9F%8F%9B%EF%B8%8F Heritage%3C/text%3E%3C/svg%3E'" alt="${site.name}">
          <div class="card-badge">${badge}</div>
        </div>
        <div class="card-content">
          <h3 class="card-title">${site.name}</h3>
          <p class="card-subtitle">${site.subtitle || site.state} • ${site.year || site.yearBuilt || 'Historic'}</p>
          <p class="card-description">${description.substring(0, 120)}...</p>
          <div class="card-meta">
            <span class="meta-item">🕐 ${visitTime}h+ visit</span>
            <span class="meta-item">📍 ${site.zone || 'India'}</span>
            <span class="meta-item">⭐ ${(Math.random() * 2 + 3.5).toFixed(1)}</span>
          </div>
          <div class="card-footer">
            <button class="explore-btn">Learn More</button>
            <button class="audio-btn audio-site-btn" data-site-id="${site.id}">🔊 Listen</button>
          </div>
        </div>
      </div>
    `;
  }

  getRecommendationBadge(site) {
    const badges = ['✨ Featured', '🔥 Popular', '🎯 Recommended', '⭐ Top Rated', '💎 Premium'];
    const hash = site.name.charCodeAt(0) % badges.length;
    return badges[hash];
  }

  attachCardListeners() {
    document.querySelectorAll('.audio-site-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const site = this.heritageData.find(item => item.id === btn.dataset.siteId);
        if (site) window.playHeritageAudio(site);
      });
    });
    document.querySelectorAll('.explore-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        const title = card.querySelector('.card-title').textContent;
        const site = this.heritageData.find(s => s.name === title);
        this.showDetailModal(site);
      });
    });
  }

  // ===== MODALS =====
  showDetailModal(site) {
    if (typeof site === 'string') {
      site = this.heritageData.find(s => s.name === site);
    }

    if (!site) return;

    const modal = document.getElementById('detail-modal');
    if (!modal) return;

    const content = modal.querySelector('.modal-content');
    const description = site.shortSummary || site.description || `${site.name} is a heritage site in ${site.location || site.state}, India.`;
    const images = Array.isArray(site.gallery) && site.gallery.length
      ? site.gallery
      : [site.coverImage || site.image];
    const sideImage = site.coverImage
      ? site.coverImage.replace(/(\.[^.]+)$/, '-side$1')
      : '';
    const fallbackImage = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450"><rect width="800" height="450" fill="#2c3e50"/><text x="400" y="225" fill="#d4af37" font-size="34" text-anchor="middle" dominant-baseline="middle">${site.name}</text></svg>`)}`;
    const imageList = [...new Set([...images, sideImage].filter(Boolean))];
    const sourceLinks = [];
    if (site.unescoStatus?.toLowerCase().includes('unesco')) {
      sourceLinks.push('<a href="https://whc.unesco.org/en/list/" target="_blank" rel="noopener">UNESCO World Heritage Centre</a>');
    }
    sourceLinks.push('<a href="https://asi.nic.in/" target="_blank" rel="noopener">Archaeological Survey of India (ASI)</a>');
    content.innerHTML = `
      <div class="modal-header">
        <div>
          <h2>${site.name}</h2>
          <p style="color: #888; margin-top: 0.3rem;">${site.location || site.state} • ${site.yearBuilt || 'Historic site'}</p>
        </div>
        <button class="modal-close">&times;</button>
      </div>
      <div style="padding: 1rem 0;">
        <h3 style="color: var(--primary); margin-bottom: 0.75rem;">🖼️ Image Gallery</h3>
        <div class="site-gallery">
          ${(imageList.length ? imageList : [fallbackImage]).map((image, index) => `<img class="${index === imageList.length - 1 && sideImage ? 'optional-side-image' : ''}" src="${image}" alt="${site.name} ${index === imageList.length - 1 && sideImage ? 'side view' : 'gallery view'}" onerror="${index === imageList.length - 1 && sideImage ? 'this.remove()' : `this.onerror=null;this.src='${fallbackImage}'`}">`).join('')}
        </div>

        <div class="audio-guide-panel">
          <h3>🎧 Audio Guide</h3>
          <p>Choose a voice style, then listen to this site's story.</p>
          <select class="audio-voice-select" aria-label="Choose narrator voice">
            <option value="">Default device voice</option>
          </select>
          <select class="audio-style-select" aria-label="Choose audio guide voice">
            <option value="storyteller">Calm storyteller</option>
            <option value="documentary">Documentary narrator</option>
            <option value="local">Warm local guide</option>
            <option value="kids">Curious young explorer</option>
          </select>
          <button class="btn btn-secondary modal-audio-btn" type="button">▶ Play audio guide</button>
          <button class="btn btn-secondary mood-audio-btn" type="button">✨ Heritage mood</button>
        </div>
        
        <h3 style="color: var(--primary); margin-bottom: 0.5rem;">📖 About</h3>
        <p style="line-height: 1.6; margin-bottom: 1.5rem;">${description}</p>
        <p style="font-size: 0.9rem; color: #666; margin-bottom: 1.5rem;">${site.unescoStatus || 'Indian heritage site'} • ${site.architecturalStyle || site.category || 'Cultural heritage'}</p>

        <div class="ticket-panel">
          <strong>🎟️ Ticket details</strong>
          <p>${site.ticketPrice || 'Check the official ASI or site authority ticket portal before travel.'}</p>
          <small>Prices, closures and visitor rules can change. Verify on the official UNESCO/ASI or local authority website.</small>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
          <div style="background: rgba(212,175,55,0.1); padding: 1rem; border-radius: 8px;">
            <p style="font-size: 0.9rem; color: #888;">🕐 Visit Duration</p>
            <p style="font-size: 1.3rem; font-weight: 700;">${site.minVisitTime || 2}-3 hours</p>
          </div>
          <div style="background: rgba(212,175,55,0.1); padding: 1rem; border-radius: 8px;">
            <p style="font-size: 0.9rem; color: #888;">📍 Location</p>
            <p style="font-size: 1.3rem; font-weight: 700;">${site.zone || site.state}</p>
          </div>
        </div>

        <h3 style="color: var(--primary); margin-bottom: 0.5rem;">🎯 Why Visit</h3>
        <ul style="margin-bottom: 1.5rem; line-height: 1.8;">
          ${(site.fastFacts || []).slice(0, 3).map(fact => `<li>✓ ${fact}</li>`).join('')}
          <li>✓ ${site.category || 'Historic Monument'}</li>
          <li>✓ Best time: ${site.bestTimeToVisit || 'Check official visitor information'}</li>
        </ul>

        <p style="font-size: 0.9rem; margin-bottom: 1rem;"><strong>Sources:</strong> ${sourceLinks.join(' • ')}</p>
        <div class="review-panel">
          <h3 style="color: var(--primary); margin-bottom: 0.5rem;">⭐ Visitor Reviews</h3>
          <p class="review-note">Community experiences are separate from the curated facts above. Please verify dates, prices, and access with official sources.</p>
          <div class="review-list">${this.renderReviews(site.id)}</div>
          <form class="review-form" data-site-id="${this.escapeHTML(site.id)}">
            <label>Your name <input name="name" maxlength="40" required autocomplete="name"></label>
            <label>Rating
              <select name="rating" required>
                <option value="">Choose stars</option>
                <option value="5">★★★★★</option><option value="4">★★★★</option>
                <option value="3">★★★</option><option value="2">★★</option><option value="1">★</option>
              </select>
            </label>
            <label>Your experience <textarea name="review" maxlength="500" required placeholder="Share a helpful visit tip or experience"></textarea></label>
            <button class="btn btn-secondary" type="submit">Post Review</button>
            <small class="review-status" aria-live="polite">Reviews are moderated by validation and stored on this site's server.</small>
          </form>
        </div>

        <button class="btn btn-primary" style="width: 100%;" onclick="window.open('https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.name + ', ' + (site.location || site.state))}', '_blank', 'noopener')">
          📍 Open Directions
        </button>
      </div>
    `;

    modal.classList.add('active');
    const audioText = site.audioNarration || `${site.name}. ${description} ${site.fastFacts?.join(' ') || ''}`;
    const voiceSelect = modal.querySelector('.audio-voice-select');
    window.populateAudioVoices(voiceSelect);
    modal.querySelector('.modal-audio-btn').addEventListener('click', () => {
      window.playHeritageAudio({ ...site, audioNarration: audioText }, modal.querySelector('.audio-style-select').value, voiceSelect.value);
    });
    modal.querySelector('.mood-audio-btn').addEventListener('click', () => {
      window.playHeritageAudio({ ...site, audioNarration: audioText }, 'mood');
    });
    modal.querySelector('.modal-close').addEventListener('click', () => {
      modal.classList.remove('active');
    });
    modal.querySelector('.review-form').addEventListener('submit', (event) => {
      event.preventDefault();
      this.submitReview(site.id, new FormData(event.currentTarget), event.currentTarget);
    });
    this.loadRemoteReviews(site.id, modal.querySelector('.review-list'));
  }

  escapeHTML(value) {
    return String(value).replace(/[&<>'"]/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[character]));
  }

  loadLocalReviews() {
    try {
      return JSON.parse(localStorage.getItem('bharat-reviews') || '{}');
    } catch (error) {
      return {};
    }
  }

  renderReviews(siteId) {
    const reviews = this.localReviews[siteId] || [];
    if (!reviews.length) return '<p class="review-empty">No reviews yet. Be the first to share a useful visit tip.</p>';
    return reviews.slice(-10).reverse().map(review => `
      <article class="review-item">
        <strong>${this.escapeHTML(review.name)}</strong>
        <span>${'★'.repeat(Number(review.rating))}${'☆'.repeat(5 - Number(review.rating))}</span>
        <p>${this.escapeHTML(review.review)}</p>
      </article>
    `).join('');
  }

  async loadRemoteReviews(siteId, reviewList) {
    try {
      const response = await fetch(`/api/reviews?siteId=${encodeURIComponent(siteId)}`);
      if (!response.ok) return;
      const result = await response.json();
      this.localReviews[siteId] = Array.isArray(result.reviews) ? result.reviews.slice(-10) : [];
      if (reviewList.isConnected) reviewList.innerHTML = this.renderReviews(siteId);
    } catch (error) {
      // Direct file opens have no API origin; local reviews remain available.
    }
  }

  async submitReview(siteId, formData, form) {
    const status = form.querySelector('.review-status');
    const payload = {
      siteId,
      name: String(formData.get('name') || '').trim(),
      rating: Number(formData.get('rating')),
      review: String(formData.get('review') || '').trim()
    };
    if (!payload.name || !payload.review || !Number.isInteger(payload.rating) || payload.rating < 1 || payload.rating > 5 || payload.review.length > 500) {
      status.textContent = 'Please add a name, choose 1-5 stars, and keep the review under 500 characters.';
      return;
    }
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('Review service unavailable');
      const result = await response.json();
      this.localReviews[siteId] = [...(this.localReviews[siteId] || []), result.review].slice(-10);
      status.textContent = 'Thanks. Your review is now visible to visitors using this site.';
    } catch (error) {
      this.localReviews[siteId] = [...(this.localReviews[siteId] || []), { ...payload, createdAt: new Date().toISOString() }].slice(-10);
      localStorage.setItem('bharat-reviews', JSON.stringify(this.localReviews));
      status.textContent = 'Saved on this browser. Start the site server to share it with other visitors.';
    }
    form.reset();
    form.closest('.review-panel').querySelector('.review-list').innerHTML = this.renderReviews(siteId);
  }

  // ===== STATISTICS =====
  updateStats() {
    const totalSites = this.heritageData.length;
    const unescoSites = this.heritageData.filter(site => site.unescoStatus?.toLowerCase().includes('unesco world heritage site')).length;
    const listedSites = this.filteredData.length;
    const uniqueZones = [...new Set(this.heritageData.map(s => s.zone))].length;
    const uniqueCategories = [...new Set(this.heritageData.map(s => s.category))].length;

    const statsHtml = `
      <div class="stat-card">
        <div class="stat-number">${totalSites}</div>
        <div class="stat-label">Heritage Sites</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${unescoSites}</div>
        <div class="stat-label">UNESCO World Heritage Sites</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${uniqueZones}</div>
        <div class="stat-label">Cultural Zones</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${uniqueCategories}</div>
        <div class="stat-label">Site Categories</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${listedSites}</div>
        <div class="stat-label">Matching Your Filters</div>
      </div>
    `;

    const statsContainer = document.querySelector('.stats');
    if (statsContainer) {
      statsContainer.innerHTML = statsHtml;
    }
  }

  // ===== PREFERENCES =====
  savePreferences() {
    this.userPreferences = {
      interests: Array.from(document.querySelectorAll('.interest-filter:checked')).map(cb => cb.value),
      zone: document.querySelector('.zone-filter.active')?.textContent,
      category: document.querySelector('.category-filter.active')?.textContent,
      time: document.getElementById('exploration-time')?.value
    };
    localStorage.setItem('bharat-preferences', JSON.stringify(this.userPreferences));
  }

  loadPreferences() {
    try {
      return JSON.parse(localStorage.getItem('bharat-preferences') || '{}');
    } catch (error) {
      return {};
    }
  }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  window.bharat = new BharatVirasat();
});

// ===== TEXT-TO-SPEECH =====
window.speak = (text) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  }
};

window.populateAudioVoices = (select) => {
  if (!select || !('speechSynthesis' in window)) return;
  const voices = window.speechSynthesis.getVoices().filter(voice => voice.lang.startsWith('en'));
  select.innerHTML = '<option value="">Default device voice</option>' + voices.map(voice =>
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

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
  // Cmd/Ctrl + K for search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    document.querySelector('input[placeholder*="Search"]')?.focus();
  }
  // Esc to close modal
  if (e.key === 'Escape') {
    document.getElementById('detail-modal')?.classList.remove('active');
  }
});