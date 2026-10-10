/**
 * 🛡️ RakshaSetu — Zero-Friction Emergency Response & Tourist Safety Grid
 * Integrated module for Bharat Virasat Heritage Explorer
 */

(function () {
  'use strict';

  // State variables
  let rakshaMap = null;
  let userMarker = null;
  let userAccuracyCircle = null;
  let currentPosition = null;

  // Audio & Siren state
  let audioCtx = null;
  let sirenOsc = null;
  let sirenGain = null;
  let sirenInterval = null;
  let isSirenActive = false;

  // Fake Call state
  let fakeCallAudio = null;
  let fakeCallTimer = null;
  let fakeCallSeconds = 0;
  let ringInterval = null;

  // Initialize once DOM is ready
  document.addEventListener('DOMContentLoaded', initRakshaSetu);

  function initRakshaSetu() {
    setupEventListeners();
    initLocationAndMap();
  }

  function setupEventListeners() {
    // SOS Trigger
    const sosBtn = document.getElementById('raksha-sos-trigger-btn');
    if (sosBtn) {
      sosBtn.addEventListener('click', triggerSOS);
    }

    // Siren Toggle
    const sirenBtn = document.getElementById('raksha-siren-toggle-btn');
    if (sirenBtn) {
      sirenBtn.addEventListener('click', toggleSiren);
    }

    // Fake Call Buttons
    const openFakeCallBtn = document.getElementById('raksha-fakecall-open-btn');
    if (openFakeCallBtn) {
      openFakeCallBtn.addEventListener('click', openFakeCall);
    }

    const acceptCallBtn = document.getElementById('raksha-fakecall-accept-btn');
    if (acceptCallBtn) {
      acceptCallBtn.addEventListener('click', acceptFakeCall);
    }

    const declineCallBtn = document.getElementById('raksha-fakecall-decline-btn');
    if (declineCallBtn) {
      declineCallBtn.addEventListener('click', closeFakeCall);
    }

    const hangupCallBtn = document.getElementById('raksha-fakecall-hangup-btn');
    if (hangupCallBtn) {
      hangupCallBtn.addEventListener('click', closeFakeCall);
    }

    // Recenter Map
    const recenterBtn = document.getElementById('raksha-recenter-btn');
    if (recenterBtn) {
      recenterBtn.addEventListener('click', () => {
        acquireLiveLocation(true);
      });
    }

    // Copy coords button
    const copyCoordsBtn = document.getElementById('raksha-copy-coords-btn');
    if (copyCoordsBtn) {
      copyCoordsBtn.addEventListener('click', copyCoordinates);
    }
  }

  /* ==========================================================================
     📍 GEOLOCATION & LEAFLET MAP
     ========================================================================== */

  function initLocationAndMap() {
    acquireLiveLocation(false);
  }

  function acquireLiveLocation(shouldPan) {
    const statusText = document.getElementById('raksha-telemetry-status');
    if (statusText) {
      statusText.innerHTML = '<span class="raksha-pulse-dot"></span> Acquiring high-precision GPS lock...';
    }

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          currentPosition = pos.coords;
          const accuracy = Math.round(pos.coords.accuracy || 0);

          updateTelemetryUI(pos.coords.latitude, pos.coords.longitude, accuracy);
          renderOrUpdateMap(pos.coords.latitude, pos.coords.longitude, accuracy, shouldPan);
        },
        () => {
          currentPosition = null;
          updateLocationUnavailable();
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
      );
    } else {
      currentPosition = null;
      updateLocationUnavailable();
    }
  }

  function updateTelemetryUI(lat, lon, accuracy) {
    const latSpan = document.getElementById('raksha-lat-val');
    const lonSpan = document.getElementById('raksha-lon-val');
    const accSpan = document.getElementById('raksha-acc-val');
    const statusText = document.getElementById('raksha-telemetry-status');

    if (latSpan) latSpan.textContent = `${lat.toFixed(5)}°`;
    if (lonSpan) lonSpan.textContent = `${lon.toFixed(5)}°`;
    if (accSpan) accSpan.textContent = `±${accuracy}m precision`;
    if (statusText) statusText.textContent = 'Live device location shown; nearby services are not verified here.';
  }

  function updateLocationUnavailable() {
    const statusText = document.getElementById('raksha-telemetry-status');
    const latSpan = document.getElementById('raksha-lat-val');
    const lonSpan = document.getElementById('raksha-lon-val');
    const accSpan = document.getElementById('raksha-acc-val');
    if (latSpan) latSpan.textContent = 'Unavailable';
    if (lonSpan) lonSpan.textContent = 'Unavailable';
    if (accSpan) accSpan.textContent = 'Unavailable';
    if (statusText) statusText.textContent = 'Location unavailable. Allow location access and refresh GPS.';
    if (rakshaMap) {
      rakshaMap.remove();
      rakshaMap = null;
      userMarker = null;
      userAccuracyCircle = null;
    }
  }

  function renderOrUpdateMap(lat, lon, accuracy, shouldPan) {
    const mapContainer = document.getElementById('raksha-map');
    if (!mapContainer || typeof L === 'undefined') return;

    if (!rakshaMap) {
      // Create map instance
      rakshaMap = L.map('raksha-map', {
        zoomControl: true,
        attributionControl: false
      }).setView([lat, lon], 14);

      // OpenStreetMap with clean modern tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(rakshaMap);

      // Add attribution in small neat footer
      L.control.attribution({ position: 'bottomright' }).addAttribution('© OSM | RakshaSetu Grid').addTo(rakshaMap);

      // Custom pulsing user icon
      const userIcon = L.divIcon({
        className: 'raksha-user-marker-wrap',
        html: '<div class="raksha-user-marker-ring"></div><div class="raksha-user-marker-core"></div>',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      userMarker = L.marker([lat, lon], { icon: userIcon }).addTo(rakshaMap)
        .bindPopup('<div style="font-family: sans-serif; font-size: 13px;"><strong>🔵 Your device location</strong><br>Check the displayed accuracy before sharing.</div>');

      userAccuracyCircle = L.circle([lat, lon], {
        radius: accuracy,
        color: '#38bdf8',
        fillColor: '#38bdf8',
        fillOpacity: 0.15,
        weight: 1
      }).addTo(rakshaMap);

      // Force recalculate size when section scrolls into view
      setTimeout(() => {
        rakshaMap.invalidateSize();
      }, 400);
    } else {
      if (userMarker) userMarker.setLatLng([lat, lon]);
      if (userAccuracyCircle) {
        userAccuracyCircle.setLatLng([lat, lon]);
        userAccuracyCircle.setRadius(accuracy);
      }
      if (shouldPan) {
        rakshaMap.setView([lat, lon], 15, { animate: true });
      }
    }
  }

  /* ==========================================================================
     🚨 EMERGENCY LOCATION SHARING
     ========================================================================== */

  function triggerSOS() {
    const sosBtn = document.getElementById('raksha-sos-trigger-btn');
    const resultBox = document.getElementById('raksha-sos-result-box');
    const outputDetails = document.getElementById('raksha-sos-output-details');

    if (!resultBox || !sosBtn) return;

    sosBtn.disabled = true;
    sosBtn.classList.add('raksha-sos-transmitting');
    resultBox.style.display = 'block';
    resultBox.classList.add('raksha-transmitting-card');

    if (outputDetails) {
      outputDetails.innerHTML = `
        <p>Getting your current location to prepare call and sharing links. Nothing is sent automatically.</p>
      `;
    }

    playAlertTone(750, 200);
    if (!navigator.geolocation) {
      currentPosition = null;
      updateLocationUnavailable();
      renderSOSUnavailable();
      resetSOSButton(sosBtn);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        currentPosition = pos.coords;
        renderSOSPrepared(pos.coords.latitude, pos.coords.longitude);
        resetSOSButton(sosBtn);
      },
      () => {
        currentPosition = null;
        updateLocationUnavailable();
        renderSOSUnavailable();
        resetSOSButton(sosBtn);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  }

  function resetSOSButton(sosBtn) {
    sosBtn.disabled = false;
    sosBtn.classList.remove('raksha-sos-transmitting');
    document.getElementById('raksha-sos-result-box')?.classList.remove('raksha-transmitting-card');
  }

  function renderSOSUnavailable() {
    const outputDetails = document.getElementById('raksha-sos-output-details');
    if (outputDetails) {
      outputDetails.innerHTML = `
        <div class="raksha-sos-success-panel">
          <strong>Location unavailable. No alert was sent.</strong>
          <p>If you need immediate help, call <a href="tel:112">112</a> directly.</p>
        </div>
      `;
    }
  }

  function renderSOSPrepared(lat, lon) {
    const mapsUrl = `https://www.google.com/maps?q=${lat},${lon}`;
    const timestamp = new Date().toLocaleTimeString('en-IN', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    if (typeof window.showToast === 'function') {
      window.showToast('Location sharing options are ready. Choose how to contact someone.', 'info', 5500);
    }
    const outputDetails = document.getElementById('raksha-sos-output-details');
    if (!outputDetails) return;

    const locationMessage = `I need help. My location: ${mapsUrl} (location accuracy: approximately ${Math.round(currentPosition.accuracy || 0)}m).`;
    const smsMessage = encodeURIComponent(locationMessage);
    const whatsappMessage = encodeURIComponent(`Emergency: I need help. My location: ${mapsUrl}. Time: ${timestamp}.`);

    outputDetails.innerHTML = `
      <div class="raksha-sos-success-panel">
        <div class="raksha-sos-badge-row">
          <span class="raksha-alert-pill">READY TO SHARE</span>
          <span class="raksha-time-pill">⏰ ${timestamp}</span>
        </div>

        <h4 style="margin: 0.5rem 0; font-size: 1.05rem; color: #f87171;">No emergency service or contact has been notified.</h4>
        <p style="font-size: 0.85rem; color: #cbd5e1; margin-bottom: 0.75rem;">Choose an option below to contact help. Calls, SMS, and WhatsApp depend on your device, network, and configured apps.</p>
        <p style="font-size: 0.85rem; color: #cbd5e1; margin-bottom: 0.75rem;">
          GPS Coordinates: <strong>${lat.toFixed(5)}°, ${lon.toFixed(5)}°</strong>
        </p>

        <div class="raksha-action-pill-row">
          <a href="${mapsUrl}" target="_blank" rel="noopener" class="raksha-pill-btn raksha-btn-maps">
            🗺️ Open Live GPS in Google Maps
          </a>
          <a href="sms:112?body=${smsMessage}" class="raksha-pill-btn raksha-btn-sms">
            💬 Open SMS to 112
          </a>
          <a href="https://wa.me/?text=${whatsappMessage}" target="_blank" rel="noopener" class="raksha-pill-btn raksha-btn-wa">
            📲 Share via WhatsApp
          </a>
          <a href="tel:112" class="raksha-pill-btn raksha-btn-call">
            📞 Direct Call 112 (National ERSS)
          </a>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     🔊 HIGH-DECIBEL DISTRESS SIREN (Web Audio API)
     ========================================================================== */

  function toggleSiren() {
    if (!isSirenActive) {
      startSiren();
    } else {
      stopSiren();
    }
  }

  function startSiren() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();

      sirenOsc = audioCtx.createOscillator();
      sirenGain = audioCtx.createGain();

      sirenOsc.type = 'sawtooth';
      sirenOsc.frequency.setValueAtTime(750, audioCtx.currentTime);

      // Volume envelope
      sirenGain.gain.setValueAtTime(0.3, audioCtx.currentTime);

      sirenOsc.connect(sirenGain);
      sirenGain.connect(audioCtx.destination);
      sirenOsc.start();

      // Sweep frequency up and down every 350ms
      let highTone = false;
      sirenInterval = setInterval(() => {
        if (!audioCtx || !sirenOsc) return;
        const targetFreq = highTone ? 750 : 1250;
        sirenOsc.frequency.linearRampToValueAtTime(targetFreq, audioCtx.currentTime + 0.3);
        highTone = !highTone;
      }, 350);

      isSirenActive = true;

      // Update button state
      const sirenBtn = document.getElementById('raksha-siren-toggle-btn');
      if (sirenBtn) {
        sirenBtn.innerHTML = '🛑 <strong>STOP DISTRESS SIREN</strong>';
        sirenBtn.classList.add('raksha-siren-active');
      }

      // Visual strobe
      const strobe = document.getElementById('raksha-visual-strobe');
      if (strobe) strobe.classList.add('raksha-strobe-flashing');

    } catch (e) {
      console.error('AudioContext error for siren:', e);
      alert('Audio error: Could not activate siren in this browser session.');
    }
  }

  function stopSiren() {
    if (sirenInterval) {
      clearInterval(sirenInterval);
      sirenInterval = null;
    }
    if (sirenOsc) {
      try {
        sirenOsc.stop();
        sirenOsc.disconnect();
      } catch (e) {}
      sirenOsc = null;
    }
    if (audioCtx) {
      try {
        audioCtx.close();
      } catch (e) {}
      audioCtx = null;
    }

    isSirenActive = false;

    const sirenBtn = document.getElementById('raksha-siren-toggle-btn');
    if (sirenBtn) {
      sirenBtn.innerHTML = '🔊 <strong>Activate High-Decibel Siren</strong>';
      sirenBtn.classList.remove('raksha-siren-active');
    }

    const strobe = document.getElementById('raksha-visual-strobe');
    if (strobe) strobe.classList.remove('raksha-strobe-flashing');
  }

  /* ==========================================================================
     📞 TACTICAL FAKE CALL SIMULATOR
     ========================================================================== */

  function openFakeCall() {
    const modal = document.getElementById('raksha-fakecall-modal');
    const incomingScreen = document.getElementById('raksha-fakecall-incoming');
    const connectedScreen = document.getElementById('raksha-fakecall-connected');

    if (!modal) return;

    modal.style.display = 'flex';
    if (incomingScreen) incomingScreen.style.display = 'flex';
    if (connectedScreen) connectedScreen.style.display = 'none';

    fakeCallSeconds = 0;
    startFakeRingtone();
  }

  function startFakeRingtone() {
    stopFakeRingtone();
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      fakeCallAudio = new AudioContext();

      // Standard telecom ring cycle: 2 sec ring, 3 sec pause
      let ringCycle = () => {
        if (!fakeCallAudio) return;
        const osc1 = fakeCallAudio.createOscillator();
        const osc2 = fakeCallAudio.createOscillator();
        const gain = fakeCallAudio.createGain();

        osc1.frequency.setValueAtTime(440, fakeCallAudio.currentTime);
        osc2.frequency.setValueAtTime(480, fakeCallAudio.currentTime);

        gain.gain.setValueAtTime(0.12, fakeCallAudio.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, fakeCallAudio.currentTime + 1.8);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(fakeCallAudio.destination);

        osc1.start();
        osc2.start();
        osc1.stop(fakeCallAudio.currentTime + 1.8);
        osc2.stop(fakeCallAudio.currentTime + 1.8);
      };

      ringCycle();
      ringInterval = setInterval(ringCycle, 3500);
    } catch (e) {
      console.warn('Fake call audio failed:', e);
    }
  }

  function stopFakeRingtone() {
    if (ringInterval) {
      clearInterval(ringInterval);
      ringInterval = null;
    }
    if (fakeCallAudio) {
      try {
        fakeCallAudio.close();
      } catch (e) {}
      fakeCallAudio = null;
    }
  }

  function acceptFakeCall() {
    stopFakeRingtone();

    const incomingScreen = document.getElementById('raksha-fakecall-incoming');
    const connectedScreen = document.getElementById('raksha-fakecall-connected');
    const timerElem = document.getElementById('raksha-fakecall-timer');

    if (incomingScreen) incomingScreen.style.display = 'none';
    if (connectedScreen) connectedScreen.style.display = 'flex';

    fakeCallSeconds = 0;
    if (fakeCallTimer) clearInterval(fakeCallTimer);

    fakeCallTimer = setInterval(() => {
      fakeCallSeconds++;
      const mins = String(Math.floor(fakeCallSeconds / 60)).padStart(2, '0');
      const secs = String(fakeCallSeconds % 60).padStart(2, '0');
      if (timerElem) timerElem.textContent = `${mins}:${secs}`;
    }, 1000);
  }

  function closeFakeCall() {
    stopFakeRingtone();
    if (fakeCallTimer) {
      clearInterval(fakeCallTimer);
      fakeCallTimer = null;
    }

    const modal = document.getElementById('raksha-fakecall-modal');
    if (modal) modal.style.display = 'none';
  }

  /* ==========================================================================
     HELPER UTILITIES
     ========================================================================== */

  function playAlertTone(freq, durationMs) {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (durationMs / 1000));

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + (durationMs / 1000));
    } catch (e) {}
  }

  function copyCoordinates() {
    if (!currentPosition) {
      if (typeof window.showToast === 'function') {
        window.showToast('Current location is unavailable. Refresh GPS and allow location access.', 'error');
      }
      return;
    }
    const text = `${currentPosition.latitude.toFixed(6)}, ${currentPosition.longitude.toFixed(6)}`;
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('raksha-copy-coords-btn');
      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = '✅ Copied!';
        setTimeout(() => { btn.innerHTML = orig; }, 2000);
      }
      if (typeof window.showToast === 'function') {
        window.showToast('📍 Device coordinates copied to clipboard.', 'success');
      }
    }).catch(() => {
      if (typeof window.showToast === 'function') {
        window.showToast(`Coordinates: ${text}`, 'info');
      }
    });
  }

  // Expose methods to global scope if needed
  window.RakshaSetu = {
    triggerSOS,
    toggleSiren,
    openFakeCall,
    closeFakeCall,
    acceptFakeCall,
    recenter: () => acquireLiveLocation(true)
  };

})();
