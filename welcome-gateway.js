/**
 * 🌸 BHARAT VIRASAT — SWAGATAM ROYAL WELCOME GATEWAY
 * An enchanting, joyful welcome experience that connects visitors emotionally
 * to India's living legends and hooks them into deep exploration.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'bv_welcome_passport';

  const ARCHETYPES = [
    {
      id: 'sacred-seeker',
      icon: '🕉️',
      title: 'Sacred Seeker',
      tagline: 'Temples, Ghats & Sacred Geometry',
      secretRiddle: 'In Varanasi, the Manikarnika Ghat fire has burned unbroken for over 3,000 years, older than history itself.',
      recommendedDeck: 'Brihadisvara Temple & Kashi Ghats'
    },
    {
      id: 'citadel-knight',
      icon: '⚔️',
      title: 'Fortress Knight',
      tagline: 'Mighty Bastions & Unconquered Forts',
      secretRiddle: 'Kumbhalgarh Fort in Rajasthan boasts a 36-kilometer continuous wall—second only to the Great Wall of China!',
      recommendedDeck: 'Amer Fort & Mehrangarh'
    },
    {
      id: 'stone-sculptor',
      icon: '🏛️',
      title: 'Master Architect',
      tagline: 'Rock-Cut Marvels & Intricate Pillars',
      secretRiddle: 'The musical pillars of Vittala Temple in Hampi produce resonant musical frequencies when lightly struck.',
      recommendedDeck: 'Ellora Kailasa Temple & Hampi'
    },
    {
      id: 'folk-wanderer',
      icon: '🌿',
      title: 'Living Lore Nomad',
      tagline: 'Living Root Bridges & Folk Mysticism',
      secretRiddle: 'In Meghalaya, Khasi tribes weave Ficus elastica roots across torrential rivers into living bridges that grow stronger with age.',
      recommendedDeck: 'Meghalaya Living Roots & Majuli'
    }
  ];

  let audioCtx = null;

  document.addEventListener('DOMContentLoaded', initWelcomeGateway);

  function initWelcomeGateway() {
    createWelcomeModal();
    setupWelcomeHeaderTrigger();

    // Check if first-time visitor or user clicks open
    const savedPassport = getSavedPassport();
    if (!savedPassport) {
      setTimeout(() => openWelcomeModal(), 600);
    } else {
      updateHeaderBadge(savedPassport);
    }
  }

  function getSavedPassport() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  function savePassport(passport) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(passport));
      updateHeaderBadge(passport);
    } catch (e) {
      console.warn('Could not save passport:', e);
    }
  }

  function updateHeaderBadge(passport) {
    const trigger = document.getElementById('swagatam-trigger-btn');
    if (trigger) {
      trigger.innerHTML = `🌸 ${passport.archetypeIcon || '🏛️'} Passport`;
      trigger.title = `Explorer: ${passport.archetypeTitle || 'Traveler'}`;
    }
  }

  function playWelcomeChime() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!audioCtx) audioCtx = new AudioContext();

      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Auspicious harmonized chime)
      freqs.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + i * 0.08);

        gain.gain.setValueAtTime(0.001, audioCtx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + i * 0.08 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + i * 0.08 + 1.2);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(audioCtx.currentTime + i * 0.08);
        osc.stop(audioCtx.currentTime + i * 0.08 + 1.2);
      });
    } catch (e) {
      // Audio context policy safe ignore
    }
  }

  function createWelcomeModal() {
    const existing = document.getElementById('welcome-gateway-modal');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'welcome-gateway-modal';
    overlay.className = 'swagatam-modal-overlay';
    overlay.setAttribute('aria-hidden', 'true');

    overlay.innerHTML = `
      <div class="swagatam-card" role="dialog" aria-modal="true" aria-labelledby="swagatam-heading">
        <button class="swagatam-close-btn" id="swagatam-close" aria-label="Close welcome window">&times;</button>
        
        <!-- Auspicious Marigold Petals Animation Layer -->
        <div class="swagatam-petal-layer" aria-hidden="true">
          <span class="petal p1">🌸</span>
          <span class="petal p2">🌼</span>
          <span class="petal p3">✨</span>
          <span class="petal p4">🌸</span>
          <span class="petal p5">🪔</span>
        </div>

        <div class="swagatam-header">
          <div class="swagatam-emblem">🪔</div>
          <span class="swagatam-sub">ATITHI DEVO BHAVA • अतिथि देवो भवः</span>
          <h2 id="swagatam-heading">Swagatam to Bharat Virasat</h2>
          <p class="swagatam-intro">
            Welcome, honored voyager. Step into 5,000 years of living legends, golden citadels, rock-cut marvels, and whisperings of timeless wisdom.
          </p>
        </div>

        <!-- STAGE 1: PERSONA CHOOSER -->
        <div id="swagatam-step-choose" class="swagatam-step active">
          <h3 class="swagatam-prompt">What calls your soul across India today?</h3>
          <div class="swagatam-archetype-grid">
            ${ARCHETYPES.map((arch, idx) => `
              <button type="button" class="swagatam-arch-btn" data-arch-idx="${idx}">
                <div class="arch-icon">${arch.icon}</div>
                <div class="arch-name">${arch.title}</div>
                <div class="arch-desc">${arch.tagline}</div>
              </button>
            `).join('')}
          </div>
          <p class="swagatam-skip-note">Select an archetype to stamp your Royal Heritage Passport and unlock today's secret legend.</p>
        </div>

        <!-- STAGE 2: ROYAL PASSPORT UNLOCKED -->
        <div id="swagatam-step-passport" class="swagatam-step" style="display: none;">
          <div class="royal-passport-container">
            <div class="passport-seal">
              <span class="seal-icon">🏛️</span>
              <span class="seal-text">BHARAT VIRASAT • ROYAL EXPLORER</span>
            </div>
            <div class="passport-body">
              <div class="passport-title-row">
                <div>
                  <div class="passport-badge-label">OFFICIAL HERITAGE PASSPORT</div>
                  <h3 id="passport-persona-title" class="passport-name">Sacred Seeker</h3>
                </div>
                <div id="passport-persona-icon" class="passport-big-icon">🕉️</div>
              </div>

              <div class="passport-secret-box">
                <div class="secret-tag">📜 UNLOCKED CULTURAL SECRET</div>
                <p id="passport-secret-text" class="secret-text"></p>
              </div>

              <div class="passport-actions">
                <button type="button" class="btn btn-primary" id="swagatam-start-80days">
                  🗺️ Explore 80-Day Odyssey
                </button>
                <button type="button" class="btn btn-secondary" id="swagatam-open-scanner">
                  📷 Scan Monument Photo
                </button>
                <button type="button" class="btn btn-secondary" id="swagatam-enter-site">
                  ✨ Enter Heritage Archive
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    `;

    document.body.appendChild(overlay);

    // Bind event handlers
    const closeBtn = document.getElementById('swagatam-close');
    if (closeBtn) closeBtn.addEventListener('click', closeWelcomeModal);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeWelcomeModal();
    });

    const archButtons = overlay.querySelectorAll('.swagatam-arch-btn');
    archButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-arch-idx'), 10);
        selectArchetype(idx);
      });
    });

    const enterBtn = document.getElementById('swagatam-enter-site');
    if (enterBtn) enterBtn.addEventListener('click', closeWelcomeModal);

    const btn80 = document.getElementById('swagatam-start-80days');
    if (btn80) {
      btn80.addEventListener('click', () => {
        closeWelcomeModal();
        const target = document.getElementById('eighty-days-section');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    }

    const btnScan = document.getElementById('swagatam-open-scanner');
    if (btnScan) {
      btnScan.addEventListener('click', () => {
        closeWelcomeModal();
        if (window.openDrishtiScanner) {
          window.openDrishtiScanner();
        } else {
          const scannerSec = document.getElementById('drishti-scanner-section');
          if (scannerSec) scannerSec.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  function selectArchetype(idx) {
    const arch = ARCHETYPES[idx];
    if (!arch) return;

    playWelcomeChime();

    const passport = {
      archetypeId: arch.id,
      archetypeTitle: arch.title,
      archetypeIcon: arch.icon,
      unlockedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      secret: arch.secretRiddle
    };

    savePassport(passport);

    // Switch view to Royal Passport
    const chooseStep = document.getElementById('swagatam-step-choose');
    const passStep = document.getElementById('swagatam-step-passport');
    const titleEl = document.getElementById('passport-persona-title');
    const iconEl = document.getElementById('passport-persona-icon');
    const secretEl = document.getElementById('passport-secret-text');

    if (titleEl) titleEl.textContent = arch.title;
    if (iconEl) iconEl.textContent = arch.icon;
    if (secretEl) secretEl.textContent = arch.secretRiddle;

    if (chooseStep) chooseStep.style.display = 'none';
    if (passStep) {
      passStep.style.display = 'block';
      passStep.classList.add('passport-stamp-animation');
    }
  }

  function openWelcomeModal() {
    const overlay = document.getElementById('welcome-gateway-modal');
    if (!overlay) return;

    const saved = getSavedPassport();
    const chooseStep = document.getElementById('swagatam-step-choose');
    const passStep = document.getElementById('swagatam-step-passport');

    if (saved) {
      // Display passport directly if already unlocked
      const titleEl = document.getElementById('passport-persona-title');
      const iconEl = document.getElementById('passport-persona-icon');
      const secretEl = document.getElementById('passport-secret-text');
      if (titleEl) titleEl.textContent = saved.archetypeTitle;
      if (iconEl) iconEl.textContent = saved.archetypeIcon;
      if (secretEl) secretEl.textContent = saved.secret;

      if (chooseStep) chooseStep.style.display = 'none';
      if (passStep) passStep.style.display = 'block';
    } else {
      if (chooseStep) chooseStep.style.display = 'block';
      if (passStep) passStep.style.display = 'none';
    }

    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeWelcomeModal() {
    const overlay = document.getElementById('welcome-gateway-modal');
    if (!overlay) return;
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function setupWelcomeHeaderTrigger() {
    const headerActions = document.querySelector('.header-controls');
    if (!headerActions) return;

    if (!document.getElementById('swagatam-trigger-btn')) {
      const btn = document.createElement('button');
      btn.id = 'swagatam-trigger-btn';
      btn.className = 'header-action-btn';
      btn.type = 'button';
      btn.style.borderColor = 'rgba(212, 175, 55, 0.6)';
      btn.style.color = '#d4af37';
      btn.style.fontWeight = '600';
      btn.innerHTML = '🌸 Swagatam';
      btn.addEventListener('click', openWelcomeModal);

      // Prepend to header controls
      headerActions.prepend(btn);
    }
  }

  // Export functions to global scope
  window.openWelcomeGateway = openWelcomeModal;
  window.closeWelcomeGateway = closeWelcomeModal;

})();
