const INDIAN_STATES_AND_UTS = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
  'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

const STATE_GUIDES = {
  Maharashtra: {
    title: 'Maharashtra Heritage Circuit',
    intro: 'A practical route through UNESCO, ASI and major historic places across Maharashtra.',
    source: 'UNESCO World Heritage Centre and Archaeological Survey of India. Confirm opening hours and ticket rules before travel.',
    tour: '3-day test tour: Day 1 South Mumbai (CSMT, Fort, Art Deco and Gateway ferry); Day 2 Elephanta or Kanheri; Day 3 Pune (Shaniwarwada, Lal Mahal and Aga Khan Palace). Add 2 days for Ajanta, Ellora and Daulatabad.',
    sites: [
      {
        name: 'Ajanta Caves',
        authority: 'UNESCO World Heritage Site and ASI protected monument',
        location: 'Aurangabad District, Maharashtra',
        time: '4-5 hours',
        ticket: 'ASI ticket; Indian and foreign visitor rates vary. Check the official ASI ticket portal.',
        nearby: 'Ellora Caves, Bibi Ka Maqbara, Daulatabad Fort',
        route: 'Plan Ajanta as a separate day from Aurangabad/Chhatrapati Sambhajinagar; the caves are about 2.5-3 hours from Ellora.',
        map: 'Ajanta Caves Maharashtra'
      },
      {
        name: 'Ellora Caves',
        authority: 'UNESCO World Heritage Site and ASI protected monument',
        location: 'Verul, Maharashtra',
        time: '3-4 hours',
        ticket: 'ASI ticket; rates and weekly closure can change. Check the official ASI ticket portal.',
        nearby: 'Daulatabad Fort, Bibi Ka Maqbara, Grishneshwar Temple',
        route: 'Combine with Daulatabad Fort and Grishneshwar in one full day from Chhatrapati Sambhajinagar.',
        map: 'Ellora Caves Maharashtra'
      },
      {
        name: 'Elephanta Caves',
        authority: 'UNESCO World Heritage Site and ASI protected monument',
        location: 'Elephanta Island, Mumbai Harbour',
        time: '3-4 hours including ferry',
        ticket: 'Ferry fare plus ASI monument ticket; rates vary by operator and visitor category.',
        nearby: 'Gateway of India, Colaba Causeway, Chhatrapati Shivaji Maharaj Vastu Sangrahalaya',
        route: 'Start at Gateway of India in the morning; allow ferry waiting time and avoid rough-weather days.',
        map: 'Elephanta Caves Maharashtra'
      },
      {
        name: 'Chhatrapati Shivaji Maharaj Terminus',
        authority: 'UNESCO World Heritage Site; historic railway building',
        location: 'Fort, Mumbai',
        time: '1-2 hours',
        ticket: 'Exterior viewing is generally free; heritage interior tours may require a separate ticket or booking.',
        nearby: 'Crawford Market, St. Xavier\'s College, Gateway of India, Kala Ghoda',
        route: 'Pair with the South Mumbai heritage walk and Victorian Gothic buildings around Fort and Kala Ghoda.',
        map: 'Chhatrapati Shivaji Maharaj Terminus'
      },
      {
        name: 'Victorian Gothic and Art Deco Ensembles',
        authority: 'UNESCO World Heritage Site; public urban heritage precinct',
        location: 'Fort, Oval Maidan and Marine Drive, Mumbai',
        time: '2-3 hours',
        ticket: 'Public streets and viewpoints are free; guided heritage walks may charge a fee.',
        nearby: 'Oval Maidan, Marine Drive, Kala Ghoda, CSMVS Museum',
        route: 'Walk from CSMT through Fort and Oval Maidan, then continue to Kala Ghoda and Marine Drive.',
        map: 'Victorian Gothic Art Deco Mumbai'
      },
      {
        name: 'Shaniwarwada Fort',
        authority: 'ASI protected historic monument and major Maratha heritage site',
        location: 'Shaniwar Peth, Pune',
        time: '1.5-2 hours',
        ticket: 'ASI ticket; Indian and foreign visitor rates can change. Check the official ASI ticket portal.',
        nearby: 'Lal Mahal, Dagdusheth Halwai Ganpati, Vishrambaug Wada, Pataleshwar Cave Temple',
        route: 'Use Pune old-city walking circuit: Shaniwarwada, Lal Mahal, Dagdusheth and Vishrambaug Wada.',
        map: 'Shaniwarwada Pune'
      },
      {
        name: 'Daulatabad (Devagiri) Fort',
        authority: 'ASI protected historic monument',
        location: 'Daulatabad, near Chhatrapati Sambhajinagar',
        time: '2-3 hours',
        ticket: 'ASI ticket; check the official ASI ticket portal for current rates.',
        nearby: 'Ellora Caves, Grishneshwar Temple, Bibi Ka Maqbara',
        route: 'Visit between Ellora and the city; start early because the climb includes steep sections.',
        map: 'Daulatabad Fort Maharashtra'
      },
      {
        name: 'Bibi Ka Maqbara',
        authority: 'ASI protected Mughal-period monument',
        location: 'Chhatrapati Sambhajinagar, Maharashtra',
        time: '1-1.5 hours',
        ticket: 'ASI ticket; rates can change by visitor category.',
        nearby: 'Aurangabad Caves, Panchakki, Daulatabad Fort',
        route: 'Pair with Aurangabad Caves and Panchakki for a half-day city heritage circuit.',
        map: 'Bibi Ka Maqbara'
      },
      {
        name: 'Kanheri Caves',
        authority: 'ASI protected Buddhist rock-cut monument',
        location: 'Sanjay Gandhi National Park, Mumbai',
        time: '3-5 hours',
        ticket: 'National park entry plus applicable monument/vehicle charges.',
        nearby: 'Sanjay Gandhi National Park, Tulsi Lake, Mumbai suburban heritage',
        route: 'Reserve a large part of the day; park entry and local transport add travel time.',
        map: 'Kanheri Caves Mumbai'
      },
      {
        name: 'Raigad Fort',
        authority: 'ASI protected Maratha historic monument',
        location: 'Raigad District, Maharashtra',
        time: '5-7 hours',
        ticket: 'Fort entry and ropeway charges, if used, are separate and may change.',
        nearby: 'Mahad, Raigad ropeway, Jagadishwar Temple and the Takmak Tok viewpoint',
        route: 'Plan a full day from Pune or Mumbai; check monsoon access and ropeway status.',
        map: 'Raigad Fort Maharashtra'
      },
      {
        name: 'Aga Khan Palace',
        authority: 'National memorial and historic protected site',
        location: 'Pune, Maharashtra',
        time: '1.5-2 hours',
        ticket: 'Museum entry ticket; verify current Indian and foreign visitor rates.',
        nearby: 'Koregaon Park, Pataleshwar Cave Temple, Shaniwarwada',
        route: 'Combine with Pune city sites in a morning-to-evening heritage plan.',
        map: 'Aga Khan Palace Pune'
      }
    ]
  },
  Rajasthan: {
    title: 'Rajasthan Heritage Circuit',
    intro: 'Begin with Jaipur, Agra-facing routes and the Hill Forts of Rajasthan.',
    source: 'UNESCO World Heritage Centre and ASI. Confirm local ticket and guide rules.',
    sites: [
      { name: 'The Walled City of Jaipur', authority: 'UNESCO World Heritage Site', location: 'Jaipur, Rajasthan', time: '1-2 days', ticket: 'Individual monuments use separate tickets.', nearby: 'Amer Fort, Jantar Mantar, Hawa Mahal, City Palace', route: 'Start with the old city, then spend a separate morning at Amer Fort.', map: 'Jaipur Rajasthan' },
      { name: 'Keoladeo National Park', authority: 'UNESCO World Heritage Site', location: 'Bharatpur, Rajasthan', time: '4-6 hours', ticket: 'Park entry and vehicle/cycle-rickshaw charges vary by season.', nearby: 'Bharatpur Palace, Deeg Palace, Agra', route: 'Combine with Agra as a wildlife and Mughal heritage extension.', map: 'Keoladeo National Park' }
    ]
  },
  Karnataka: {
    title: 'Karnataka Heritage Circuit',
    intro: 'A route across Hampi, Pattadakal, Badami and Hoysala architecture.',
    source: 'UNESCO World Heritage Centre and ASI. Confirm monument closures and tickets.',
    sites: [
      { name: 'Hampi', authority: 'UNESCO World Heritage Site', location: 'Vijayanagara, Karnataka', time: '2-3 days', ticket: 'Selected monuments use ASI tickets; many ruins are open landscapes.', nearby: 'Anegundi, Tungabhadra Dam, Badami', route: 'Use Hampi Bazaar, Royal Centre and Vittala Temple as three separate route zones.', map: 'Hampi Karnataka' },
      { name: 'Pattadakal and Badami', authority: 'UNESCO site at Pattadakal; ASI protected monuments', location: 'Bagalkot and Badami, Karnataka', time: '2 days', ticket: 'ASI monument tickets apply at selected sites.', nearby: 'Aihole, Mahakuta, Banashankari Temple', route: 'Stay in Badami and visit Badami caves, Pattadakal and Aihole in a loop.', map: 'Pattadakal Karnataka' }
    ]
  }
};

function renderStateGuide(stateName) {
  const guide = STATE_GUIDES[stateName] || createDataDrivenGuide(stateName);
  const container = document.getElementById('state-guide-results');
  if (!container || !guide) return;

  container.innerHTML = `
    <div class="state-guide-heading">
      <h3>${guide.title}</h3>
      <p>${guide.intro}</p>
      <p class="tour-plan"><strong>🗺️ Sample tour:</strong> ${guide.tour || 'Build each day around one main heritage cluster and verify travel time before booking.'}</p>
      <small>${guide.source}</small>
    </div>
    <div class="state-site-list">
      ${guide.sites.length ? guide.sites.map(site => `
        <article class="state-site-item">
          <h4>${site.name}</h4>
          <p class="state-site-meta">${site.authority} • ${site.location}</p>
          <p><strong>Time:</strong> ${site.time} &nbsp; <strong>Tickets:</strong> ${site.ticket}</p>
          <p><strong>Nearby:</strong> ${site.nearby}</p>
          <p><strong>Route:</strong> ${site.route}</p>
          <button class="btn btn-secondary state-map-btn" data-map="${site.map}">Open location</button>
        </article>
      `).join('') : '<p class="state-empty">No records are currently indexed for this state. Search the national heritage cards above and check the official ASI state circle for the latest additions.</p>'}
    </div>
  `;

  container.querySelectorAll('.state-map-btn').forEach(button => {
    button.addEventListener('click', () => {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(button.dataset.map)}`, '_blank', 'noopener');
    });
  });
}

function createDataDrivenGuide(stateName) {
  const sites = (window.heritageData || []).filter(site => site.state === stateName);
  return {
    title: `${stateName} Heritage Guide`,
    intro: `Explore the ${sites.length} heritage record${sites.length === 1 ? '' : 's'} currently indexed for ${stateName}.`,
    tour: sites.length ? `Suggested plan: spend ${Math.min(sites.length, 3)} day${sites.length === 1 ? '' : 's'} visiting the main sites, grouping nearby places together and checking official opening times before travel.` : 'Use the national site cards above to discover nearby regions while this state guide is expanded.',
    source: 'Use UNESCO World Heritage Centre and the Archaeological Survey of India for current status, tickets, closures and conservation notices.',
    sites: sites.map(site => ({
      name: site.name,
      authority: site.unescoStatus || 'Check ASI state circle listing',
      location: site.location || site.state,
      time: `${site.minVisitTime || 2}-${(site.minVisitTime || 2) + 2} hours`,
      ticket: site.ticketPrice || 'Check the official ASI or local authority ticket portal.',
      nearby: 'Search the location above for nearby museums, markets and cultural sites.',
      route: `Start from ${site.location || stateName}; verify local transport, weather and visitor restrictions.`,
      map: `${site.name}, ${site.location || stateName}`
    }))
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('state-guide-select');
  if (!selector) return;
  selector.innerHTML = INDIAN_STATES_AND_UTS.map(state => `<option value="${state}">${state}</option>`).join('');
  selector.value = 'Maharashtra';
  selector.addEventListener('change', () => renderStateGuide(selector.value));
  renderStateGuide(selector.value);
});
