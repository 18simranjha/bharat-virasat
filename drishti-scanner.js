/**
 * 📷 BHARAT VIRASAT — DRISHTI AI HERITAGE SITE SCANNER
 * Multimodal visual intelligence that identifies Indian monuments, forts, rock-caves,
 * and temples from photographs with ASI verification & architectural secrets.
 */

(function () {
  'use strict';

  let videoStream = null;

  document.addEventListener('DOMContentLoaded', initDrishtiScanner);

  function initDrishtiScanner() {
    createScannerModal();
    setupHeaderScannerButton();
  }

  function setupHeaderScannerButton() {
    const headerControls = document.querySelector('.header-controls');
    if (!headerControls) return;

    if (!document.getElementById('header-scanner-trigger-btn')) {
      const btn = document.createElement('button');
      btn.id = 'header-scanner-trigger-btn';
      btn.className = 'header-action-btn';
      btn.type = 'button';
      btn.style.borderColor = 'rgba(230, 126, 34, 0.7)';
      btn.style.color = '#e67e22';
      btn.style.fontWeight = '600';
      btn.innerHTML = '📷 Scan Site';
      btn.addEventListener('click', openScannerModal);

      // Insert before AI Chat button
      const aiBtn = document.getElementById('ai-chat-btn');
      if (aiBtn) {
        headerControls.insertBefore(btn, aiBtn);
      } else {
        headerControls.appendChild(btn);
      }
    }
  }

  function createScannerModal() {
    const existing = document.getElementById('drishti-scanner-modal');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'drishti-scanner-modal';
    overlay.className = 'scanner-modal-overlay';
    overlay.setAttribute('aria-hidden', 'true');

    overlay.innerHTML = `
      <div class="scanner-card" role="dialog" aria-modal="true" aria-labelledby="scanner-modal-title">
        <button type="button" class="scanner-close-btn" id="scanner-modal-close" aria-label="Close scanner">&times;</button>
        
        <div class="scanner-header">
          <div class="scanner-badge">📷 MULTIMODAL HERITAGE VISION</div>
          <h2 id="scanner-modal-title">Drishti AI Heritage Scanner</h2>
          <p class="scanner-sub">Snap or upload a photo of an Indian monument, temple, or fort for an AI-generated heritage overview. Verify ticketing, access, and protection details with official sources.</p>
        </div>

        <!-- UPLOAD & CAMERA ZONE -->
        <div class="scanner-dropzone-wrapper" id="scanner-dropzone">
          <input type="file" id="scanner-file-input" accept="image/jpeg,image/png,image/webp" style="display: none;">
          
          <div class="scanner-preview-box" id="scanner-preview-container" style="display: none;">
            <img id="scanner-preview-img" alt="Scanned monument preview">
            <div class="scanner-laser-line" id="scanner-laser"></div>
            <div class="scanner-hud-corners"></div>
          </div>

          <!-- Video live camera stream -->
          <div class="scanner-camera-box" id="scanner-camera-container" style="display: none;">
            <video id="scanner-video" autoplay playsinline></video>
            <div class="scanner-laser-line"></div>
            <button type="button" class="btn btn-primary btn-sm camera-snap-btn" id="camera-capture-btn">📸 Capture Photo</button>
          </div>

          <div class="dropzone-idle" id="dropzone-idle-content">
            <div class="dropzone-icon">🏛️</div>
            <div class="dropzone-text">
              <strong>Drag & Drop monument photo here</strong>
              <span>or browse from your device (JPG, PNG, WebP)</span>
            </div>
            <div class="dropzone-btns">
              <button type="button" class="btn btn-primary btn-sm" id="scanner-browse-btn">📁 Upload Photo</button>
              <button type="button" class="btn btn-secondary btn-sm" id="scanner-camera-toggle-btn">📹 Use Camera</button>
            </div>
          </div>
        </div>

        <!-- SCANNING SPINNER STATUS -->
        <div class="scanner-status-box" id="scanner-status" style="display: none;">
          <div class="scanner-spinner"></div>
          <span id="scanner-status-text">Scanning architectural features via Gemini Vision...</span>
        </div>

        <!-- RESULTS DOSSIER PANEL -->
        <div class="scanner-results-panel" id="scanner-results-dossier" style="display: none;">
          <div class="dossier-card">
            <div class="dossier-header-row">
              <div>
                <span class="dossier-dynasty-badge" id="res-dynasty">Mughal Era</span>
                <h3 class="dossier-title" id="res-title">Taj Mahal</h3>
                <span class="dossier-hindi" id="res-hindi">ताज महल</span>
              </div>
              <div class="dossier-asi-seal" id="res-asi-seal">
                <span class="seal-icon">🛡️</span>
                <span>AI-ASSISTED · VERIFY DETAILS</span>
              </div>
            </div>

            <div class="dossier-meta-grid">
              <div class="meta-item">
                <span class="label">📍 Location:</span>
                <span class="val" id="res-location">Agra, Uttar Pradesh</span>
              </div>
              <div class="meta-item">
                <span class="label">🏛️ Architecture:</span>
                <span class="val" id="res-style">Indo-Islamic & Makrana Marble</span>
              </div>
              <div class="meta-item">
                <span class="label">🎟️ Ticket (verify officially):</span>
                <span class="val" id="res-ticket">₹50 (Indians), ₹1100 (Foreigners)</span>
              </div>
              <div class="meta-item">
                <span class="label">🗓️ Best Time:</span>
                <span class="val" id="res-time">October to March (Sunrise)</span>
              </div>
            </div>

            <div class="dossier-summary-box">
              <p id="res-summary">Summary text...</p>
            </div>

            <div class="dossier-secrets-box">
              <div class="secrets-head">🔍 ARCHITECTURAL SECRETS & MARVELS</div>
              <ul id="res-secrets-list"></ul>
            </div>

            <!-- ACTION BUTTONS -->
            <div class="dossier-actions">
              <button type="button" class="btn btn-primary btn-sm" id="res-play-dadi-btn">
                👵 Hear Dadi's Story
              </button>
              <button type="button" class="btn btn-secondary btn-sm" id="res-view-3d-btn">
                ✨ View in 3D Deck
              </button>
              <button type="button" class="btn btn-secondary btn-sm" id="res-ask-ai-btn">
                💬 Ask Guide
              </button>
              <button type="button" class="btn btn-secondary btn-sm" id="res-reset-scan-btn">
                🔄 Scan Another
              </button>
            </div>
          </div>
        </div>

      </div>
    `;

    document.body.appendChild(overlay);

    // Bind event handlers
    const closeBtn = document.getElementById('scanner-modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeScannerModal);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeScannerModal();
    });

    const fileInput = document.getElementById('scanner-file-input');
    const browseBtn = document.getElementById('scanner-browse-btn');
    if (browseBtn && fileInput) {
      browseBtn.addEventListener('click', () => fileInput.click());
    }

    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          processImageFile(e.target.files[0]);
        }
      });
    }

    // Drag and Drop
    const dropzone = document.getElementById('scanner-dropzone');
    if (dropzone) {
      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('drag-active');
      });
      dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('drag-active');
      });
      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('drag-active');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          processImageFile(e.dataTransfer.files[0]);
        }
      });
    }

    // Camera Toggle
    const cameraToggleBtn = document.getElementById('scanner-camera-toggle-btn');
    if (cameraToggleBtn) cameraToggleBtn.addEventListener('click', startCamera);

    const cameraCaptureBtn = document.getElementById('camera-capture-btn');
    if (cameraCaptureBtn) cameraCaptureBtn.addEventListener('click', captureCameraPhoto);

    const resetScanBtn = document.getElementById('res-reset-scan-btn');
    if (resetScanBtn) resetScanBtn.addEventListener('click', resetScannerUI);
  }

  function openScannerModal() {
    const modal = document.getElementById('drishti-scanner-modal');
    if (!modal) return;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeScannerModal() {
    stopCamera();
    const modal = document.getElementById('drishti-scanner-modal');
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function startCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      if (typeof window.showToast === 'function') {
        window.showToast('Camera is not supported on this browser or requires HTTPS.', 'error');
      } else {
        alert('Camera access is not supported on this browser or requires HTTPS.');
      }
      return;
    }

    const videoEl = document.getElementById('scanner-video');
    const cameraContainer = document.getElementById('scanner-camera-container');
    const idleContent = document.getElementById('dropzone-idle-content');

    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        videoStream = stream;
        if (videoEl) videoEl.srcObject = stream;
        if (idleContent) idleContent.style.display = 'none';
        if (cameraContainer) cameraContainer.style.display = 'block';
        if (typeof window.showToast === 'function') {
          window.showToast('📷 Camera initialized. Center monument and tap Capture.', 'info');
        }
      })
      .catch(err => {
        console.warn('Camera access denied:', err);
        if (typeof window.showToast === 'function') {
          window.showToast('Camera permission denied. Please upload a photo instead.', 'error');
        } else {
          alert('Could not access camera. Please upload an image file instead.');
        }
      });
  }

  function stopCamera() {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
      videoStream = null;
    }
    const cameraContainer = document.getElementById('scanner-camera-container');
    if (cameraContainer) cameraContainer.style.display = 'none';
  }

  function captureCameraPhoto() {
    const videoEl = document.getElementById('scanner-video');
    if (!videoEl) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoEl.videoWidth || 640;
    canvas.height = videoEl.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);

    stopCamera();

    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    displayPreview(dataUrl);
    analyzeImagePayload(dataUrl);
  }

  function processImageFile(file) {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPEG, PNG, WebP).');
      return;
    }
    if (file.size > 6 * 1024 * 1024) {
      alert('Please choose an image smaller than 6 MB.');
      return;
    }

    stopCamera();

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      displayPreview(dataUrl);
      analyzeImagePayload(dataUrl);
    };
    reader.readAsDataURL(file);
  }

  function displayPreview(dataUrl) {
    const previewContainer = document.getElementById('scanner-preview-container');
    const previewImg = document.getElementById('scanner-preview-img');
    const idleContent = document.getElementById('dropzone-idle-content');
    const laser = document.getElementById('scanner-laser');

    if (idleContent) idleContent.style.display = 'none';
    if (previewImg) previewImg.src = dataUrl;
    if (previewContainer) previewContainer.style.display = 'block';
    if (laser) laser.style.display = 'block';
  }

  function resetScannerUI() {
    stopCamera();
    const previewContainer = document.getElementById('scanner-preview-container');
    const idleContent = document.getElementById('dropzone-idle-content');
    const resultsPanel = document.getElementById('scanner-results-dossier');
    const statusBox = document.getElementById('scanner-status');

    if (previewContainer) previewContainer.style.display = 'none';
    if (idleContent) idleContent.style.display = 'block';
    if (resultsPanel) resultsPanel.style.display = 'none';
    if (statusBox) statusBox.style.display = 'none';
  }

  function analyzeImagePayload(dataUrl) {
    const statusBox = document.getElementById('scanner-status');
    const resultsPanel = document.getElementById('scanner-results-dossier');

    if (statusBox) statusBox.style.display = 'flex';
    if (resultsPanel) resultsPanel.style.display = 'none';

    const apiBase = window.BHARAT_API_BASE || '';
    const scanUrl = `${apiBase}/api/scan-heritage`;

    // Attempt backend Gemini Vision call
    fetch(scanUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64: dataUrl })
    })
      .then(async res => {
        const result = await res.json();
        if (!res.ok) throw new Error(result.error || `HTTP error ${res.status}`);
        if (!result.monument_name) throw new Error('The scanner returned an invalid result. Please try another photo.');
        return result;
      })
      .then(dossier => {
        displayDossier(dossier);
      })
      .catch(err => {
        console.error('Heritage scan failed:', err);
        showScanError(err.message || 'The heritage scanner is unavailable. Please try again later.');
      });
  }

  function showScanError(message) {
    const statusBox = document.getElementById('scanner-status');
    const statusText = document.getElementById('scanner-status-text');
    const laser = document.getElementById('scanner-laser');
    if (statusBox) statusBox.style.display = 'flex';
    if (statusText) statusText.textContent = message;
    if (laser) laser.style.display = 'none';
  }

  function displayDossier(dossier) {
    const statusBox = document.getElementById('scanner-status');
    const resultsPanel = document.getElementById('scanner-results-dossier');
    const laser = document.getElementById('scanner-laser');

    if (statusBox) statusBox.style.display = 'none';
    if (laser) laser.style.display = 'none';
    if (resultsPanel) resultsPanel.style.display = 'block';

    if (typeof window.showToast === 'function' && dossier.monument_name) {
      window.showToast(`✨ Identified: ${dossier.monument_name}`, 'success');
    }

    const titleEl = document.getElementById('res-title');
    const hindiEl = document.getElementById('res-hindi');
    const dynastyEl = document.getElementById('res-dynasty');
    const locEl = document.getElementById('res-location');
    const styleEl = document.getElementById('res-style');
    const ticketEl = document.getElementById('res-ticket');
    const timeEl = document.getElementById('res-time');
    const summaryEl = document.getElementById('res-summary');
    const secretsList = document.getElementById('res-secrets-list');

    if (titleEl) titleEl.textContent = dossier.monument_name || 'Heritage Monument';
    if (hindiEl) hindiEl.textContent = dossier.hindi_name || '';
    if (dynastyEl) dynastyEl.textContent = dossier.era_dynasty || 'Historical Landmark';
    if (locEl) locEl.textContent = `${dossier.city || ''}, ${dossier.state || ''}`;
    if (styleEl) styleEl.textContent = dossier.architectural_style || 'Indian Classical';
    if (ticketEl) ticketEl.textContent = dossier.ticket_pricing || 'Official ASI Rates Apply';
    if (timeEl) timeEl.textContent = dossier.best_time_to_visit || 'Morning hours recommended';
    if (summaryEl) summaryEl.textContent = dossier.summary || '';

    if (secretsList) {
      const secrets = dossier.architectural_secrets || [];
      secretsList.replaceChildren(...secrets.map(secret => {
        const item = document.createElement('li');
        item.textContent = secret;
        return item;
      }));
    }

    // Bind action buttons
    const playDadiBtn = document.getElementById('res-play-dadi-btn');
    if (playDadiBtn) {
      playDadiBtn.onclick = () => {
        closeScannerModal();
        if (window.playDadiMaaStory) {
          window.playDadiMaaStory(dossier.monument_name, dossier.summary);
        }
      };
    }

    const askAiBtn = document.getElementById('res-ask-ai-btn');
    if (askAiBtn) {
      askAiBtn.onclick = () => {
        closeScannerModal();
        const chatInput = document.getElementById('gemini-chat-input');
        const chatBtn = document.getElementById('ai-chat-btn');
        if (chatBtn) chatBtn.click();
        if (chatInput) {
          chatInput.value = `I just scanned a photo of ${dossier.monument_name}! What are the most intriguing folklore stories about this monument?`;
          const sendBtn = document.getElementById('gemini-send-btn');
          if (sendBtn) sendBtn.click();
        }
      };
    }

    const view3dBtn = document.getElementById('res-view-3d-btn');
    if (view3dBtn) {
      view3dBtn.onclick = () => {
        closeScannerModal();
        const discoverSec = document.getElementById('discover');
        if (discoverSec) discoverSec.scrollIntoView({ behavior: 'smooth' });
      };
    }
  }

  // Export
  window.openDrishtiScanner = openScannerModal;
  window.closeDrishtiScanner = closeScannerModal;

})();
