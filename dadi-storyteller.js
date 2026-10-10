/**
 * 👵 BHARAT VIRASAT — DADI MAA KI KAHANIYAAN (GRANDMOTHER'S STORYTELLING VOICE)
 * Warm, nostalgic folkloric audio engine featuring:
 * 1. Fine-tuned grandmother speech synthesis (warm pitch, unhurried tempo, ambient tanpura drone)
 * 2. Custom voice upload & recorder manager ("Add My Own Grandmother's Voice")
 * 3. Animated vintage gramophone & cassette player with synced subtitles
 */

(function () {
  'use strict';

  // Curated Grandmother Folklore Stories
  const DADI_STORIES = [
    {
      id: 'taj-mahal',
      title: 'The Tears of the Yamuna & The Moonlit Dome',
      monument: 'Taj Mahal, Agra',
      hindiIntro: 'अरे मेरे प्यारे बच्चे, इधर बैठो... आज तुम्हें सुनाती हूँ उस सफ़ेद संगमरमर की वो कहानी जो किताबों में कभी नहीं लिखी गई।',
      storyText: 'Arey mere pyaare bachhe, come sit beside me. Look at the Taj Mahal—do you see how its white Makrana marble turns rosy pink at dawn, milky white at midday, and glows like celestial gold when the full moon rises? People say Emperor Shah Jahan wanted to build a black marble reflection across the Yamuna river, connected by a silver bridge. Look closely at the minarets—they tilt slightly outwards by three degrees. Why? So if the earth ever shakes, they will fall away from the sacred dome of Mumtaz Mahal. Such was the boundless devotion of that timeless era.',
      duration: '1:45',
      customAudioUrl: null
    },
    {
      id: 'hampi-monuments',
      title: 'The Singing Pillars & The Boulder Gods of Kishkindha',
      monument: 'Group of Monuments at Hampi',
      hindiIntro: 'सुन मेरी लाडली, हम्पी केवल पत्थरों का शहर नहीं... यह वही किष्किंधा है जहाँ भगवान राम ने सुग्रीव और हनुमान जी से भेंट की थी।',
      storyText: 'Sun mere laadle, listen closely. Long before Vijayanagara was the richest empire on earth, these granite boulders witnessed the Ramayana. Walk into the Vittala Temple and gently stroke the 56 monolithic pillars of the Ranga Mantapa. They are not mere stone—they sing the seven sacred musical notes: Sa, Re, Ga, Ma, Pa, Dha, Ni! The British rulers were so bewildered that they cut two pillars open to look for hidden bells inside, only to find nothing but pure solid granite. Stone carved with devotion can truly sing, my child.',
      duration: '1:55',
      customAudioUrl: null
    },
    {
      id: 'konark-sun-temple',
      title: 'The Boy Architect Dharmapada & The 52-Ton Magnet',
      monument: 'Sun Temple, Konark',
      hindiIntro: 'बेटा, कोणार्क के समुद्र तट पर जब सूर्य की पहली किरण आती है, तो पूरा मंदिर जाग उठता है।',
      storyText: 'Arey bachhe, did you know that the entire Sun Temple is shaped like a colossal chariot with 24 carved stone wheels, pulled by seven spirited horses across the sky? Twelve hundred master sculptors laboured for twelve years, but could not fix the crowning lodestone dome. It was a 12-year-old boy named Dharmapada who climbed the pinnacle and fixed the final stone. Legend whispers that the pinnacle held a 52-ton natural magnet that made the idol float suspended in mid-air, causing maritime compasses of sailing ships to spin in wonder!',
      duration: '2:10',
      customAudioUrl: null
    },
    {
      id: 'ellora-kailasa',
      title: 'The Mountain Carved from the Sky: Kailasa Cave 16',
      monument: 'Ellora Caves, Maharashtra',
      hindiIntro: 'अरे बेटा, दुनिया भर के लोग इमारतें नीचे से ऊपर बनाते हैं, पर हमारे पूर्वजों ने एक पूरा पहाड़ ऊपर से नीचे काट डाला!',
      storyText: 'Arey mere bachhe, marvel at this. Every monument in the world was constructed from the ground up, stone by stone. But our master ancestors at Ellora did the impossible—they started from the peak of a basalt cliff and carved downwards! Two hundred thousand tons of volcanic rock were removed with only hammers and chisels. Not a single mistake was permitted, for you cannot paste back chipped rock. Queen Manikavati had vowed to fast until she saw the temple shikhara, so the royal architect finished the pinnacle first within a week to save her life.',
      duration: '2:05',
      customAudioUrl: null
    },
    {
      id: 'brihadisvara-temple',
      title: 'The Shadowless Vimana of King Raja Raja Chola',
      monument: 'Brihadisvara Temple, Thanjavur',
      hindiIntro: 'सुनो मेरे बच्चे, तंजावुर का यह मंदिर एक हजार साल से बिना किसी चूने या सीमेंट के सीना ताने खड़ा है।',
      storyText: 'Listen closely, my child. Over a thousand years ago, Emperor Raja Raja Chola dreampt of a temple so grand that the sky itself would bow before it. The crowning Kumbam capstone weighs eighty tons—eighty thousand kilograms of single solid granite! There were no cranes in 1010 CE, so they built a six-kilometer inclined earth ramp lined with logs and elephants to roll that giant stone to the top of the 216-foot tower. And even today, during midday, its shadow falls upon its own base, never touching the outer ground.',
      duration: '1:50',
      customAudioUrl: null
    }
  ];

  let currentStoryIndex = 0;
  let isPlaying = false;
  let customAudioEl = null;
  let ambientAudioCtx = null;
  let ambientGainNode = null;
  let currentUtterance = null;
  let playbackRate = 0.85;

  document.addEventListener('DOMContentLoaded', initDadiStoryteller);

  function initDadiStoryteller() {
    createStorytellerWidget();
    createCustomAudioElement();
    setupHeaderDadiTrigger();
  }

  function setupHeaderDadiTrigger() {
    const headerControls = document.querySelector('.header-controls');
    if (!headerControls) return;

    if (!document.getElementById('header-dadi-trigger-btn')) {
      const btn = document.createElement('button');
      btn.id = 'header-dadi-trigger-btn';
      btn.className = 'header-action-btn';
      btn.type = 'button';
      btn.style.borderColor = 'rgba(212, 175, 55, 0.7)';
      btn.style.color = '#d4af37';
      btn.style.fontWeight = '600';
      btn.innerHTML = '👵 Dadi\'s Stories';
      btn.addEventListener('click', () => openStorytellerModal());

      const scanBtn = document.getElementById('header-scanner-trigger-btn');
      if (scanBtn) {
        headerControls.insertBefore(btn, scanBtn);
      } else {
        headerControls.appendChild(btn);
      }
    }
  }

  function createCustomAudioElement() {
    customAudioEl = document.createElement('audio');
    customAudioEl.id = 'dadi-custom-audio-player';
    customAudioEl.style.display = 'none';
    document.body.appendChild(customAudioEl);

    customAudioEl.addEventListener('ended', onAudioFinished);
    customAudioEl.addEventListener('timeupdate', updateAudioProgress);
  }

  function createStorytellerWidget() {
    const existing = document.getElementById('dadi-storyteller-modal');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'dadi-storyteller-modal';
    overlay.className = 'dadi-modal-overlay';
    overlay.setAttribute('aria-hidden', 'true');

    overlay.innerHTML = `
      <div class="dadi-card" role="dialog" aria-modal="true" aria-labelledby="dadi-modal-title">
        <button type="button" class="dadi-close-btn" id="dadi-modal-close" aria-label="Close storyteller">&times;</button>
        
        <!-- VINTAGE GRAMOPHONE / CASSETTE DECK HEADER -->
        <div class="dadi-header">
          <div class="dadi-avatar-box">
            <span class="dadi-avatar-emoji">👵</span>
            <div class="dadi-soundwaves" id="dadi-soundwaves">
              <span></span><span></span><span></span><span></span><span></span>
            </div>
          </div>
          <div>
            <div class="dadi-badge">दादी माँ की अनसुनी कहानियाँ</div>
            <h2 id="dadi-modal-title">Dadi Maa’s Heritage Tales</h2>
            <p class="dadi-sub">Forgotten folklore, hidden miracles, and bedtime legends told in a warm grandmotherly voice.</p>
          </div>
        </div>

        <!-- STORY SELECTOR TABS -->
        <div class="dadi-story-tabs" id="dadi-story-tabs">
          ${DADI_STORIES.map((st, idx) => `
            <button type="button" class="dadi-tab-btn ${idx === 0 ? 'active' : ''}" data-story-idx="${idx}">
              <span class="tab-title">${st.title.split(':')[0]}</span>
              <small class="tab-monu">${st.monument.split(',')[0]}</small>
            </button>
          `).join('')}
        </div>

        <!-- MAIN PLAYER DISK / CASSETTE UI -->
        <div class="dadi-player-box">
          <div class="gramophone-disc-wrapper" id="gramophone-disc">
            <div class="vinyl-groove"></div>
            <div class="vinyl-center-label">
              <span class="label-lotus">🪷</span>
              <span class="label-name">BHARAT VIRASAT</span>
            </div>
            <div class="gramophone-needle" id="gramophone-needle"></div>
          </div>

          <div class="dadi-story-display">
            <div class="story-monument-tag" id="dadi-active-monument">Taj Mahal, Agra</div>
            <h3 class="story-active-title" id="dadi-active-title">The Tears of the Yamuna & The Moonlit Dome</h3>
            <div class="story-hindi-callout" id="dadi-hindi-intro">
              अरे मेरे प्यारे बच्चे, इधर बैठो... आज तुम्हें सुनाती हूँ उस सफ़ेद संगमरमर की वो कहानी जो किताबों में कभी नहीं लिखी गई।
            </div>

            <!-- Scrollable Subtitles / Transcript -->
            <div class="dadi-transcript-box" id="dadi-transcript">
              ${DADI_STORIES[0].storyText}
            </div>

            <!-- Audio Controls Bar -->
            <div class="dadi-controls-bar">
              <button type="button" class="btn btn-primary dadi-play-btn" id="dadi-play-toggle-btn">
                ▶️ Play Dadi's Voice
              </button>
              
              <div class="dadi-rate-selector">
                <label for="dadi-rate-select">Tempo:</label>
                <select id="dadi-rate-select">
                  <option value="0.75">0.75x (Gentle)</option>
                  <option value="0.85" selected>0.85x (Grandma)</option>
                  <option value="1.0">1.0x (Standard)</option>
                </select>
              </div>

              <!-- Ambient Tanpura Toggle -->
              <button type="button" class="btn btn-secondary btn-sm" id="dadi-ambient-toggle" title="Toggle background temple tanpura drone">
                🪕 Tanpura: On
              </button>
            </div>
          </div>
        </div>

        <!-- UPLOAD / RECORD YOUR OWN VOICE SECTION -->
        <div class="dadi-custom-voice-section">
          <div class="custom-voice-header">
            <h4>🎙️ Add Your Own Grandmother’s Voice Recording</h4>
            <p>Upload a personal family voice note (.mp3 / .wav) or record your own narration to replace the synthetic voice.</p>
          </div>
          <div class="custom-voice-actions">
            <input type="file" id="dadi-audio-upload" accept="audio/mp3,audio/wav,audio/m4a,audio/ogg" style="display: none;">
            <button type="button" class="btn btn-secondary btn-sm" id="dadi-upload-btn">
              📁 Upload Audio File
            </button>
            <span id="custom-audio-filename" class="custom-audio-label">Using tuned Dadi Maa synthesis</span>
            <button type="button" class="btn btn-secondary btn-sm" id="dadi-revert-synth" style="display: none;">
              🔄 Reset to Synthesizer
            </button>
          </div>
        </div>

      </div>
    `;

    document.body.appendChild(overlay);

    // Event bindings
    const closeBtn = document.getElementById('dadi-modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeStorytellerModal);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeStorytellerModal();
    });

    const playBtn = document.getElementById('dadi-play-toggle-btn');
    if (playBtn) playBtn.addEventListener('click', togglePlayState);

    const rateSelect = document.getElementById('dadi-rate-select');
    if (rateSelect) {
      rateSelect.addEventListener('change', (e) => {
        playbackRate = parseFloat(e.target.value) || 0.85;
        if (customAudioEl) customAudioEl.playbackRate = playbackRate;
      });
    }

    const ambientBtn = document.getElementById('dadi-ambient-toggle');
    if (ambientBtn) {
      ambientBtn.addEventListener('click', () => {
        if (ambientGainNode) {
          const currentGain = ambientGainNode.gain.value;
          if (currentGain > 0) {
            ambientGainNode.gain.setValueAtTime(0, ambientAudioCtx.currentTime);
            ambientBtn.textContent = '🪕 Tanpura: Off';
          } else {
            ambientGainNode.gain.setValueAtTime(0.04, ambientAudioCtx.currentTime);
            ambientBtn.textContent = '🪕 Tanpura: On';
          }
        }
      });
    }

    // Story tabs
    const tabs = overlay.querySelectorAll('.dadi-tab-btn');
    tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        const idx = parseInt(btn.getAttribute('data-story-idx'), 10);
        selectStory(idx);
      });
    });

    // Custom voice file upload
    const uploadInput = document.getElementById('dadi-audio-upload');
    const uploadBtn = document.getElementById('dadi-upload-btn');
    const revertBtn = document.getElementById('dadi-revert-synth');
    const filenameLabel = document.getElementById('custom-audio-filename');

    if (uploadBtn && uploadInput) {
      uploadBtn.addEventListener('click', () => uploadInput.click());
    }

    if (uploadInput) {
      uploadInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          const objectUrl = URL.createObjectURL(file);
          DADI_STORIES[currentStoryIndex].customAudioUrl = objectUrl;
          if (filenameLabel) filenameLabel.textContent = `Attached: ${file.name}`;
          if (revertBtn) revertBtn.style.display = 'inline-block';
          stopAudio();
        }
      });
    }

    if (revertBtn) {
      revertBtn.addEventListener('click', () => {
        DADI_STORIES[currentStoryIndex].customAudioUrl = null;
        if (filenameLabel) filenameLabel.textContent = 'Using tuned Dadi Maa synthesis';
        revertBtn.style.display = 'none';
        stopAudio();
      });
    }
  }

  function selectStory(idx) {
    stopAudio();
    currentStoryIndex = idx;
    const story = DADI_STORIES[idx];
    if (!story) return;

    const monuEl = document.getElementById('dadi-active-monument');
    const titleEl = document.getElementById('dadi-active-title');
    const hindiEl = document.getElementById('dadi-hindi-intro');
    const transcriptEl = document.getElementById('dadi-transcript');
    const filenameLabel = document.getElementById('custom-audio-filename');
    const revertBtn = document.getElementById('dadi-revert-synth');

    if (monuEl) monuEl.textContent = story.monument;
    if (titleEl) titleEl.textContent = story.title;
    if (hindiEl) hindiEl.textContent = story.hindiIntro;
    if (transcriptEl) transcriptEl.textContent = story.storyText;

    if (story.customAudioUrl) {
      if (filenameLabel) filenameLabel.textContent = 'Using custom uploaded voice track';
      if (revertBtn) revertBtn.style.display = 'inline-block';
    } else {
      if (filenameLabel) filenameLabel.textContent = 'Using tuned Dadi Maa synthesis';
      if (revertBtn) revertBtn.style.display = 'none';
    }
  }

  function startAmbientDrone() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!ambientAudioCtx) ambientAudioCtx = new AudioCtx();

      if (ambientAudioCtx.state === 'suspended') {
        ambientAudioCtx.resume();
      }

      if (!ambientGainNode) {
        ambientGainNode = ambientAudioCtx.createGain();
        ambientGainNode.gain.setValueAtTime(0.04, ambientAudioCtx.currentTime);
        ambientGainNode.connect(ambientAudioCtx.destination);

        // Tanpura Root note (C#3 ~ 138.59 Hz)
        const osc1 = ambientAudioCtx.createOscillator();
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(138.59, ambientAudioCtx.currentTime);

        // 5th Harmonizer note (G#3 ~ 207.65 Hz)
        const osc2 = ambientAudioCtx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(207.65, ambientAudioCtx.currentTime);

        // Gentle low-pass filter to make it warm and soft
        const filter = ambientAudioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(420, ambientAudioCtx.currentTime);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(ambientGainNode);

        osc1.start();
        osc2.start();
      }
    } catch (e) {
      console.warn('Ambient drone audio policy:', e);
    }
  }

  function stopAmbientDrone() {
    if (ambientGainNode && ambientAudioCtx) {
      ambientGainNode.gain.setValueAtTime(0, ambientAudioCtx.currentTime);
    }
  }

  function togglePlayState() {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  }

  function startAudio() {
    const story = DADI_STORIES[currentStoryIndex];
    if (!story) return;

    isPlaying = true;
    updatePlayUI(true);
    startAmbientDrone();

    if (typeof window.showToast === 'function') {
      window.showToast(`👵 Dadi's Tale: "${story.title}"`, 'info');
    }

    if (story.customAudioUrl) {
      // Play custom uploaded file
      customAudioEl.src = story.customAudioUrl;
      customAudioEl.playbackRate = playbackRate;
      customAudioEl.play().catch(e => {
        console.warn('Playback error:', e);
        fallbackToSynth(story);
      });
    } else {
      fallbackToSynth(story);
    }
  }

  function fallbackToSynth(story) {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      stopAudio();
      return;
    }

    window.speechSynthesis.cancel();

    // Prepare complete narration text
    const fullText = `${story.storyText}`;
    currentUtterance = new SpeechSynthesisUtterance(fullText);

    // Warm, elderly grandmother timbre tuning:
    // Slightly lower pitch (0.85) + relaxed, unhurried rate (0.80)
    currentUtterance.pitch = 0.85;
    currentUtterance.rate = playbackRate || 0.82;

    // Pick best Indian English or Hindi female voice
    const voices = window.speechSynthesis.getVoices();
    const grandmaVoice = voices.find(v => 
      (v.lang.includes('IN') || v.lang.includes('hi')) && 
      (v.name.includes('Female') || v.name.includes('Zira') || v.name.includes('Kiran') || v.name.includes('Kalpana') || v.name.includes('India'))
    ) || voices.find(v => v.lang.includes('en-IN')) || voices[0];

    if (grandmaVoice) {
      currentUtterance.voice = grandmaVoice;
    }

    currentUtterance.onend = onAudioFinished;
    currentUtterance.onerror = onAudioFinished;

    window.speechSynthesis.speak(currentUtterance);
  }

  function stopAudio() {
    isPlaying = false;
    updatePlayUI(false);
    stopAmbientDrone();

    if (customAudioEl) {
      customAudioEl.pause();
      customAudioEl.currentTime = 0;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  function onAudioFinished() {
    isPlaying = false;
    updatePlayUI(false);
    stopAmbientDrone();
  }

  function updateAudioProgress() {
    // Time update for custom player
  }

  function updatePlayUI(playing) {
    const playBtn = document.getElementById('dadi-play-toggle-btn');
    const needle = document.getElementById('gramophone-needle');
    const disc = document.getElementById('gramophone-disc');
    const waves = document.getElementById('dadi-soundwaves');

    if (playBtn) {
      playBtn.innerHTML = playing ? '⏸️ Pause Story' : '▶️ Play Dadi\'s Voice';
      playBtn.classList.toggle('playing', playing);
    }
    if (needle) {
      needle.classList.toggle('engaged', playing);
    }
    if (disc) {
      disc.classList.toggle('spinning', playing);
    }
    if (waves) {
      waves.classList.toggle('active', playing);
    }
  }

  function openStorytellerModal(monumentName, customText) {
    const modal = document.getElementById('dadi-storyteller-modal');
    if (!modal) return;

    if (monumentName) {
      const matchedIdx = DADI_STORIES.findIndex(s => 
        s.monument.toLowerCase().includes(monumentName.toLowerCase()) ||
        monumentName.toLowerCase().includes(s.id)
      );
      if (matchedIdx > -1) {
        selectStory(matchedIdx);
      } else if (customText) {
        // Temporarily customize story 0
        DADI_STORIES[0].monument = monumentName;
        DADI_STORIES[0].title = `The Secret Legend of ${monumentName}`;
        DADI_STORIES[0].storyText = `Arey mere pyaare bachhe, aao tumhe sunati hoon ${monumentName} ki anokhi kahani... ${customText}`;
        selectStory(0);
      }
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeStorytellerModal() {
    stopAudio();
    const modal = document.getElementById('dadi-storyteller-modal');
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  window.playDadiMaaStory = function(monumentName, customText) {
    openStorytellerModal(monumentName, customText);
    setTimeout(() => {
      startAudio();
    }, 400);
  };

  window.openDadiStoryteller = openStorytellerModal;
  window.closeDadiStoryteller = closeStorytellerModal;

})();
