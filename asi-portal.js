/**
 * 🏛️ BHARAT VIRASAT — ARCHAEOLOGICAL SURVEY OF INDIA (ASI) OFFICIAL VERIFICATION PORTAL
 * Displays authentic ASI gazette notifications, circle administration, ticketing slabs,
 * conservation status, and direct links to the official government e-ticketing portal.
 */

(function () {
  'use strict';

  // ASI Circles across India
  const ASI_CIRCLES = {
    'Delhi': { circle: 'Delhi Circle', office: 'Red Fort Complex, Delhi', helpline: '011-23272427' },
    'Agra': { circle: 'Agra Circle', office: '22, Mall Road, Agra', helpline: '0562-2227261' },
    'Bhopal': { circle: 'Bhopal Circle', office: 'GTB Complex, TT Nagar, Bhopal', helpline: '0755-2777178' },
    'Dharwad': { circle: 'Dharwad Circle', office: 'Behind Hampi Kannada Univ, Kamalapura', helpline: '08394-241561' },
    'Chennai': { circle: 'Chennai Circle', office: 'Fort St. George, Chennai', helpline: '044-25670396' },
    'Bhubaneswar': { circle: 'Bhubaneswar Circle', office: 'Toshali Bhavan, Satyanagar, Bhubaneswar', helpline: '0674-2571825' },
    'Aurangabad': { circle: 'Aurangabad Circle', office: 'Bibi Ka Maqbara, Chhatrapati Sambhajinagar', helpline: '0240-2400588' },
    'Patna': { circle: 'Patna Circle', office: 'J.C. Road, Anta Ghat, Patna', helpline: '0612-2300085' },
    'Kolkata': { circle: 'Kolkata Circle', office: 'Currency Building, BBD Bagh, Kolkata', helpline: '033-22485542' },
    'Jaipur': { circle: 'Jaipur Circle', office: 'Block 3, Shiksha Sankul, JLN Marg, Jaipur', helpline: '0141-2703810' }
  };

  document.addEventListener('DOMContentLoaded', initASIPortal);

  function initASIPortal() {
    createASIDetailsModal();
    setupASIHeaderTrigger();
  }

  function setupASIHeaderTrigger() {
    const nav = document.querySelector('.chapter-nav');
    if (!nav) return;

    if (!document.getElementById('nav-asi-portal-link')) {
      const a = document.createElement('a');
      a.id = 'nav-asi-portal-link';
      a.href = '#asi-portal';
      a.innerHTML = '🏛️ ASI Verified';
      a.addEventListener('click', (e) => {
        e.preventDefault();
        openASIDetailsModal({
          name: 'Archaeological Survey of India (ASI)',
          location: 'National Registry, New Delhi',
          asiCircle: 'Directorate General, Archaeological Survey of India',
          gazetteId: 'AMASR-ACT-1958-SEC-3',
          ticketIndian: '₹25 – ₹50',
          ticketForeigner: '₹300 – ₹1,100',
          rules: [
            'Centrally Protected Monuments governed by AMASR Act 1958 & Rules 2011.',
            'Children under 15 years enter FREE across all ASI monuments in India.',
            'Drone photography strictly prohibited without written clearance from DGCA and ASI.',
            'Commercial filmmaking and tripod filming require prior ASI permission.',
            'Maintain silence inside sanctums and never touch carved frescoes or stone murals.'
          ],
          conservationNote: 'Regular chemical preservation, structural restoration of masonry, and environmental buffer zone enforcement.'
        });
      });
      nav.appendChild(a);
    }
  }

  function createASIDetailsModal() {
    const existing = document.getElementById('asi-dossier-modal');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'asi-dossier-modal';
    overlay.className = 'asi-modal-overlay';
    overlay.setAttribute('aria-hidden', 'true');

    overlay.innerHTML = `
      <div class="asi-card" role="dialog" aria-modal="true" aria-labelledby="asi-modal-title">
        <button type="button" class="asi-close-btn" id="asi-modal-close" aria-label="Close ASI Dossier">&times;</button>
        
        <div class="asi-header">
          <div class="asi-emblem-seal">
            <span class="seal-icon">🏛️</span>
            <span class="seal-text">GOVERNMENT OF INDIA • ARCHAEOLOGICAL SURVEY OF INDIA</span>
          </div>
          <div class="asi-badge-tag">MONUMENT OF NATIONAL IMPORTANCE</div>
          <h2 id="asi-modal-title">Official ASI Site Dossier</h2>
          <p class="asi-gazette" id="asi-gazette-no">Statutory Notification No: AMASR/ASI/1958/CENTRAL</p>
        </div>

        <div class="asi-body">
          <!-- ADMIN & CIRCLE -->
          <div class="asi-grid-row">
            <div class="asi-info-block">
              <span class="block-label">Governing ASI Circle:</span>
              <span class="block-val" id="asi-circle-val">Agra Circle, Uttar Pradesh</span>
            </div>
            <div class="asi-info-block">
              <span class="block-label">Circle Helpline:</span>
              <span class="block-val"><a id="asi-helpline-link" href="tel:01123272427" style="color: #38bdf8; text-decoration: none; font-weight: 700;">📞 011-23272427</a></span>
            </div>
            <div class="asi-info-block">
              <span class="block-label">Conservation Category:</span>
              <span class="block-val" id="asi-category-val">Category 1 (Supreme World Heritage Protection)</span>
            </div>
          </div>

          <!-- OFFICIAL TICKETING MATRIX -->
          <div class="asi-ticket-table-wrapper">
            <div class="table-title">🎟️ OFFICIAL TICKETING & ENTRY SLABS</div>
            <table class="asi-table">
              <thead>
                <tr>
                  <th>Visitor Category</th>
                  <th>Standard Rate</th>
                  <th>Remarks / Identity Proof</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>🇮🇳 Indian Citizens</td>
                  <td id="asi-rate-indian">₹50</td>
                  <td>Valid Govt ID (Aadhaar / Voter ID / Passport)</td>
                </tr>
                <tr>
                  <td>🌏 SAARC & BIMSTEC Citizens</td>
                  <td id="asi-rate-saarc">₹50</td>
                  <td>Passport of SAARC/BIMSTEC country</td>
                </tr>
                <tr>
                  <td>🌍 Foreign Nationals</td>
                  <td id="asi-rate-foreign">₹1,100</td>
                  <td>International Passport</td>
                </tr>
                <tr>
                  <td>👶 Children under 15 Years</td>
                  <td>FREE (₹0)</td>
                  <td>Age verification proof at turnstile</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- RULES & REGULATIONS -->
          <div class="asi-regulations-box">
            <div class="reg-title">⚠️ ASI MONUMENT PRESERVATION RULES & VISITING CODES</div>
            <ul id="asi-rules-list">
              <li>Smoking, open flames, and plastic waste strictly prohibited within 200m buffer zone.</li>
              <li>Drones and aerial photography strictly prohibited without written ASI & DGCA permits.</li>
              <li>Footwear must be removed or shoe covers used inside sanctum areas.</li>
              <li>Do not lean against, deface, or carve graffiti on stone or marble surfaces.</li>
            </ul>
          </div>

          <!-- CONSERVATION STATUS -->
          <div class="asi-conservation-box">
            <span class="con-title">🛡️ Ongoing Conservation & Chemical Cleaning Status:</span>
            <p id="asi-conservation-text">
              Active scientific monitoring by ASI Science Branch. Sandstone masonry consolidation and biological growth removal in progress.
            </p>
          </div>

          <!-- ACTIONS -->
          <div class="asi-actions-row">
            <a href="https://asi.payumoney.com/" target="_blank" rel="noopener noreferrer" class="btn btn-primary" id="asi-official-portal-btn">
              🎟️ Book on Official ASI Portal (Govt of India) ↗
            </a>
            <button type="button" class="btn btn-secondary" id="asi-close-modal-btn">
              Close Dossier
            </button>
          </div>
        </div>

      </div>
    `;

    document.body.appendChild(overlay);

    const closeBtn = document.getElementById('asi-modal-close');
    const closeBtn2 = document.getElementById('asi-close-modal-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeASIDetailsModal);
    if (closeBtn2) closeBtn2.addEventListener('click', closeASIDetailsModal);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeASIDetailsModal();
    });
  }

  function openASIDetailsModal(siteData) {
    const modal = document.getElementById('asi-dossier-modal');
    if (!modal) return;

    const titleEl = document.getElementById('asi-modal-title');
    const gazetteEl = document.getElementById('asi-gazette-no');
    const circleEl = document.getElementById('asi-circle-val');
    const indianEl = document.getElementById('asi-rate-indian');
    const saarcEl = document.getElementById('asi-rate-saarc');
    const foreignEl = document.getElementById('asi-rate-foreign');
    const rulesList = document.getElementById('asi-rules-list');
    const conText = document.getElementById('asi-conservation-text');

    if (siteData) {
      if (titleEl) titleEl.textContent = `${siteData.name || 'Heritage Monument'} — ASI Dossier`;
      if (gazetteEl) gazetteEl.textContent = `Statutory Notification: ${siteData.gazetteId || 'AMASR-ACT-1958/NOTIF-742'}`;
      if (circleEl) circleEl.textContent = siteData.asiCircle || `${siteData.state || 'National'} Circle, ASI`;
      if (indianEl) indianEl.textContent = siteData.ticketIndian || '₹25 – ₹50';
      if (saarcEl) saarcEl.textContent = siteData.ticketIndian || '₹25 – ₹50';
      if (foreignEl) foreignEl.textContent = siteData.ticketForeigner || '₹300 – ₹1,100';
      if (conText && siteData.conservationNote) conText.textContent = siteData.conservationNote;

      const helplineLink = document.getElementById('asi-helpline-link');
      if (helplineLink) {
        let phone = '011-23272427';
        const searchStr = `${siteData.asiCircle || ''} ${siteData.state || ''} ${siteData.location || ''} ${siteData.name || ''}`;
        for (const [key, info] of Object.entries(ASI_CIRCLES)) {
          if (searchStr.toLowerCase().includes(key.toLowerCase())) {
            phone = info.helpline;
            break;
          }
        }
        const cleanPhone = phone.replace(/[^0-9]/g, '');
        helplineLink.href = `tel:${cleanPhone}`;
        helplineLink.textContent = `📞 ${phone}`;
      }

      if (rulesList && siteData.rules) {
        rulesList.innerHTML = siteData.rules.map(r => `<li>${r}</li>`).join('');
      }
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeASIDetailsModal() {
    const modal = document.getElementById('asi-dossier-modal');
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  window.openASIDossier = openASIDetailsModal;
  window.closeASIDossier = closeASIDetailsModal;

})();
