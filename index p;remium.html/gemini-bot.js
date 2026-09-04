/**
 * BHARAT VIRASAT - Gemini Cultural Sage AI Chatbot
 * Powered by Gemini 2.0 Flash Cultural Knowledge Engine
 */

class GeminiCulturalSage {
  constructor() {
    this.history = [];
    this.isTyping = false;
    this.synth = window.speechSynthesis;
    this.recognition = null;
    this.isListening = false;
    this.initSpeechRecognition();
    this.setupKnowledgeEngine();
  }

  initSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRec();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-IN';

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const inputField = document.getElementById('gemini-chat-input');
        if (inputField) {
          inputField.value = transcript;
          this.handleSendMessage();
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
        const micBtn = document.getElementById('gemini-mic-btn');
        if (micBtn) micBtn.classList.remove('listening');
      };

      this.recognition.onerror = () => {
        this.isListening = false;
        const micBtn = document.getElementById('gemini-mic-btn');
        if (micBtn) micBtn.classList.remove('listening');
      };
    }
  }

  toggleVoiceInput() {
    if (!this.recognition) {
      alert("Voice input is not supported in this browser. Please type your message.");
      return;
    }
    const micBtn = document.getElementById('gemini-mic-btn');
    if (this.isListening) {
      this.recognition.stop();
      this.isListening = false;
      if (micBtn) micBtn.classList.remove('listening');
    } else {
      try {
        this.recognition.start();
        this.isListening = true;
        if (micBtn) micBtn.classList.add('listening');
      } catch (e) {
        console.error("Speech recognition error:", e);
      }
    }
  }

  setupKnowledgeEngine() {
    this.heritageData = window.heritageData || [];
    this.knowledgeBase = [
      {
        keywords: ["taj", "mahal", "mumtaz", "shah jahan", "agra", "marble", "pietra dura"],
        response: `🏛️ **Taj Mahal Architectural Marvels & Secrets**
- **Symmetry & Geometry**: Built between 1631–1648 CE by Emperor Shah Jahan in memory of Mumtaz Mahal. It possesses near-perfect bilateral symmetry, with the only asymmetrical element being Shah Jahan's own cenotaph placed beside Mumtaz's.
- **Earthquake-Proof Design**: The four 40-meter minarets were deliberately engineered to lean slightly outward so that in the event of an earthquake, they would fall away from the sacred central dome.
- **Deep Timber Well Foundation**: It sits upon a complex network of deep mahogany and sal wood wells fed by the Yamuna River moisture to keep the wood robust and prevent decay.
- **Optical Illusion**: As you walk away through the main gateway (Darwaza-i-Rauza), the Taj Mahal appears to grow larger rather than smaller!
💡 *Tip: Best visited during sunrise for a serene golden glow or on a full moon night.*`
      },
      {
        keywords: ["hampi", "vittala", "stone chariot", "musical pillar", "vijayanagara", "krishnadevaraya"],
        response: `🛕 **Hampi & Vijayanagara Splendors**
- **Stone Chariot**: Dedicated to Garuda, the carrier of Lord Vishnu. The wheels were originally designed to rotate freely on their axles! (Featured on the Indian ₹50 note).
- **Acoustic / Musical Pillars**: The 56 musical pillars in the Ranga Mantapa produce resonant bell-like tones when tapped. British archaeologists once cut two pillars open to find secret mechanisms, only to discover they were solid monolithic granite!
- **Historical Magnitude**: In 1500 CE, Vijayanagara was the second largest city on Earth after Beijing and traded pearls, rubies, and diamonds by the kilo along its 1-km long bazaar streets.
💡 *Tip: Rent a bicycle or moped to explore the massive 4,100-hectare boulder landscape over 2-3 days.*`
      },
      {
        keywords: ["konark", "sun temple", "sundial", "wheel", "black pagoda", "narasimhadeva", "puri"],
        response: `☀️ **Sun Temple Konark: Astronomical Engineering**
- **Giant Time Machine**: Designed as a colossal 24-wheeled chariot pulled by 7 horses. Each wheel has 8 major spokes (representing 8 *prahars* or 3-hour intervals) and 8 minor spokes.
- **Reading Time**: By placing a thumb or finger at the center of the axle spoke and observing where the shadow falls, you can tell the exact local time down to 1.5 minutes!
- **Magnetic Navigational Legend**: According to European sailors, the temple originally featured a heavy lodestone magnetic crown that affected ship compasses off the Bay of Bengal, earning it the name *The Black Pagoda*.
💡 *Tip: Visit in December during the Konark Dance Festival when classical dancers perform against the illuminated stone backdrop.*`
      },
      {
        keywords: ["ajanta", "ellora", "kailash", "kailasa", "cave", "monolith", "fresco"],
        response: `⛰️ **Ajanta & Ellora: The Monolithic Masterpieces**
- **Kailasa Temple (Cave 16, Ellora)**: The world's largest monolithic rock excavation. Carved vertically downwards from the top of the cliff, removing over 200,000 tonnes of basalt rock without scaffolds.
- **Ajanta Buddhist Murals**: 30 caves carved between 2nd Century BCE and 5th Century CE. The murals were created using natural plant and mineral pigments (like lapis lazuli and red ochre) mixed with glue, illuminated using brass mirror sunlight reflection.
- **Interfaith Harmony**: Ellora features 34 caves celebrating Buddhist, Hindu, and Jain traditions side by side in mutual artistic reverence.
💡 *Tip: Ajanta is closed on Mondays; Ellora is closed on Tuesdays. Take an ASI authorized guide.*`
      },
      {
        keywords: ["brihadisvara", "thanjavur", "chola", "raja raja", "vimana", "big temple"],
        response: `👑 **Brihadisvara Temple: Chola Imperial Genius**
- **80-Tonne Monolithic Capstone**: The apex dome (*Kumbam*) weighs over 80 tonnes and was elevated 66 meters high using an engineering earthen ramp stretching over 6 kilometers.
- **No Granite in 60 km Radius**: Despite being built entirely of interlocked hard granite blocks, there is no natural granite quarry anywhere near Thanjavur—all stones were transported via river barges and elephant convoys.
- **Interlocking Technology**: Built without mortar or cement; the stone blocks hold together through precision puzzle-cut interlocking joints that have survived multiple major earthquakes for over 1,000 years!
💡 *Tip: Witness the temple during sunset when the golden granite glows intensely.*`
      },
      {
        keywords: ["khajuraho", "kandariya", "erotic", "chandela", "shikhara", "madhya pradesh"],
        response: `✨ **Khajuraho: Celebration of Dharma, Artha, Kama & Moksha**
- **Misconception Cleared**: Only 10% of Khajuraho's carvings represent sensual themes; 90% depict royal processions, music, dance, daily agrarian life, war, and spiritual meditation.
- **Architectural Harmony**: The Kandariya Mahadeva Temple is modeled after Mount Kailash with 84 rising mini-shikharas creating a visual rhythm resembling Himalayan mountain peaks.
- **Nagara Style Peak**: Built by the Chandela Rajput dynasty from fine sandstone joined by mortise and tenon joints without mortar.
💡 *Tip: Attend the light and sound show narrated by Amitabh Bachchan in the western group of temples.*`
      },
      {
        keywords: ["nalanda", "university", "library", "manuscript", "dharmaganja", "aryabhata", "buddhist"],
        response: `📜 **Nalanda Mahavihara: The Beacon of Ancient Wisdom**
- **World's First Great Residential University**: Established in the 5th century CE, it accommodated over 10,000 scholars and 2,000 international faculty from China, Korea, Japan, Tibet, and Persia.
- **The Burning of 9 Million Texts**: The nine-story library complex *Dharmaganja* held over 9 million handwritten birch-bark and palm-leaf manuscripts covering mathematics, medicine (Ayurveda), astronomy, logic, and philosophy.
- **Rigorous Admission**: Only 2 out of 10 applicants passed the strict oral examination conducted by the gatekeeper (*Dwarapala*) at the university entrance!
💡 *Tip: Combine your visit with Rajgir and the Nalanda Archaeological Museum.*`
      },
      {
        keywords: ["rani ki vav", "stepwell", "patan", "gujarat", "100", "solanki"],
        response: `💧 **Rani ki Vav: The Subterranean Inverted Temple**
- **Subterranean Architecture**: Designed as an inverted 7-story temple descending deep into Mother Earth, built in 1063 CE by Queen Udayamati in memory of King Bhima I.
- **Over 500 Vishnu Sculptures**: Features breathtaking carvings of Lord Vishnu's Dashavatara (ten incarnations), celestial Apsaras, and intricate Maru-Gurjara lattice work.
- **Preserved for 800 Years**: It remained completely buried under Saraswati river silt until ASI systematically excavated and restored it in the 1980s.
💡 *Tip: Pull out an Indian ₹100 note to compare the intricate motif printed on the currency!*`
      },
      {
        keywords: ["golden temple", "amritsar", "harmandir", "langar", "sikh", "sarovar"],
        response: `🕊️ **Sri Harmandir Sahib: Humility & Universal Brotherhood**
- **Open to All Four Directions**: Built with four entrances facing North, South, East, and West, welcoming people of every faith, gender, and social status.
- **World's Largest Free Kitchen**: The Langar serves over 100,000 fresh, hygienic vegetarian meals every single day around the clock, operated entirely by volunteers (*sevadars*).
- **Gilded Majesty**: Maharaja Ranjit Singh adorned the upper sanctum with 500 kilograms of 24-karat gold plating in 1830.
💡 *Tip: Visit at 4:00 AM for the Palki Sahib ceremony or at night when the golden sanctum reflects in the holy Amrit Sarovar.*`
      },
      {
        keywords: ["qutub", "minar", "iron pillar", "rust", "delhi sultanate", "mehrauli"],
        response: `🗼 **Qutub Minar Complex & The Rustless Iron Pillar**
- **Tallest Brick Minaret**: At 72.5 meters high with 379 spiral steps, Qutub Minar combines red sandstone and white marble with exquisite Quranic calligraphy.
- **Metallurgical Miracle of Gupta Iron Pillar**: Standing in the courtyard for over 1,600 years without rusting! Modern scientists found that ancient Indian metallurgists created a passive protective layer of crystalline iron hydrogen phosphate (*misawite*).
💡 *Tip: Beautifully illuminated after sunset; best combined with Mehrauli Archaeological Park.*`
      },
  {
    keywords: ["shaniwarwada", "peshwa", "pune", "maratha", "bajirao"],
    response: `🏰 **Shaniwarwada Fort: The Peshwa Seat in Pune**
- **Maratha Power Centre**: Built in 1732 by Peshwa Bajirao I, Shaniwarwada became the political heart of the Maratha Empire and the residence of the Peshwas.
- **Fortified Palace**: The complex combined massive defensive gates with richly decorated halls, courtyards, fountains, and carved wooden palace interiors.
- **Historic Memory**: The Delhi Gate, Nagarkhana, and surviving foundations still show the scale of the original palace-city.
💡 *Tip: Visit in the late afternoon and stay for the evening light-and-sound presentation when available.*`
  },
  {
    keywords: ["maharashtra tour", "mumbai heritage", "pune heritage", "maharashtra itinerary", "maharashtra circuit"],
    response: `🗺️ **Maharashtra Heritage Test Tour**
- **Day 1 - South Mumbai**: CSMT, Fort, Victorian Gothic and Art Deco buildings, then Gateway of India.
- **Day 2 - Island or forest caves**: Take the ferry to Elephanta, or visit Kanheri Caves inside Sanjay Gandhi National Park.
- **Day 3 - Pune**: Shaniwarwada, Lal Mahal, Dagdusheth area and Aga Khan Palace.
- **Days 4-5 - Chhatrapati Sambhajinagar**: Ajanta as one day; Ellora, Daulatabad and Bibi Ka Maqbara as another.

Always check ASI ticket rates, weekly closures, monsoon access, ferry timing and local travel time before booking.`
  },
      {
        keywords: ["itinerary", "plan", "visit", "trip", "tour", "travel", "best time"],
        response: `🗺️ **Golden Heritage Travel Itineraries for India**

**1. The Classic Golden Triangle (5–7 Days)**
- *Delhi*: Qutub Minar, Red Fort, Humayun's Tomb.
- *Agra*: Taj Mahal (sunrise), Agra Fort, Fatehpur Sikri.
- *Jaipur*: Amer Fort, City Palace, Jantar Mantar, Hawa Mahal.

**2. South Indian Temple Grand Tour (7–9 Days)**
- *Karnataka*: Hampi ruins & Badami-Pattadakal caves.
- *Tamil Nadu*: Brihadisvara Temple (Thanjavur), Meenakshi Temple (Madurai), Mahabalipuram shore temples.

**3. Western Heritage & Rock-Cut Wonders (4–5 Days)**
- *Maharashtra*: Ajanta Caves (Mondays closed) & Ellora Kailasa Temple (Tuesdays closed).
- *Gujarat*: Rani ki Vav (Patan) & Sun Temple Modhera.

💡 *Would you like me to tailor a specific budget, family, or solo itinerary for any region?*`
      },
      {
        keywords: ["unesco", "list", "how many", "criteria", "india unesco"],
        response: `🏛️ **India's UNESCO World Heritage Overview**
- India is home to **42 UNESCO World Heritage Sites** (34 Cultural, 7 Natural, and 1 Mixed - Khangchendzonga National Park), ranking India **6th in the world**!
- Recent additions include the *Sacred Ensembles of the Hoysalas* (Belur, Halebidu, Somnathapura) and *Santiniketan* (Rabindranath Tagore's ashram university).
- In addition, India has over **50 sites on the UNESCO Tentative List** and 15 Intangible Cultural Heritage practices (like Kumbh Mela, Yoga, Vedic Chanting, and Durga Puja).
💡 *Ask me about any specific site to discover its untold history!*`
      }
    ];
  }

  getGeminiResponse(userQuery) {
    const q = userQuery.toLowerCase().trim();

    // Direct greetings
    if (/^(hi|hello|hey|namaste|pranam|greetings|start)/i.test(q)) {
      return `Namaste! 🙏 I am **Gemini Cultural Sage**, your AI guide to India's timeless heritage and cultural wonders.

I can help you with:
- 🏛️ **Deep Architectural Secrets & History** of any monument
- 📜 **Untold Legends & Dynastic Chronicles** (Cholas, Guptas, Mughals, Rajputs, Vijayanagara)
- 🗺️ **Personalized Travel Itineraries & Visiting Tips**
- 🔬 **Ancient Indian Science & Engineering** (Konark sundial, rustless Iron Pillar, acoustic pillars)

What heritage marvel would you like to explore today?`;
    }

    // Check specific heritage sites in our database
    for (const site of this.heritageData) {
      if (q.includes(site.name.toLowerCase()) || q.includes(site.id) || q.includes(site.location.toLowerCase()) || q.includes(site.state.toLowerCase())) {
        return `🏛️ **${site.name} (${site.hindiName})**
*${site.unescoStatus} • ${site.location}*

${site.shortSummary}

**Key Highlights & Marvels:**
${site.fastFacts.map(f => `• ${f}`).join('\n')}

**Travel & Visit Insights:**
- 🗓️ **Best Season:** ${site.bestTimeToVisit}
- ⏰ **Timings:** ${site.visitingHours}
- 🎟️ **Tickets:** ${site.ticketPrice}
- 👑 **Built By:** ${site.builtBy} (${site.era})

💬 *Want to know more about its hidden secrets, photography spots, or nearby cultural attractions? Just ask!*`;
      }
    }

    // Match keyword database
    for (const item of this.knowledgeBase) {
      const matchCount = item.keywords.filter(k => q.includes(k)).length;
      if (matchCount > 0) {
        return item.response;
      }
    }

    const likelySite = this.heritageData.find(site =>
      q.includes(site.name.toLowerCase().split(' ')[0]) ||
      q.includes(site.location.toLowerCase().split(',')[0].trim())
    );
    if (likelySite) {
      return `🏛️ **${likelySite.name}**
${likelySite.unescoStatus} • ${likelySite.location}

${likelySite.shortSummary}

**What to look for:**
${(likelySite.fastFacts || []).map(fact => `- ${fact}`).join('\n')}

**Visit:** ${likelySite.bestTimeToVisit}. ${likelySite.visitingHours}`;
    }

    // Contextual fallback response with intelligent heritage suggestions
    return `✨ **Gemini Cultural Insight**

Thank you for your question about **"${userQuery}"**. 

India's heritage spans over 5,000 years of civilization, embracing:
- **Architectural Traditions**: Nagara (North), Dravidian (South), Vesara (Deccan), Indo-Islamic, and Buddhist Rock-Cut rock shelters.
- **Master Builders**: Great patron dynasties like the Mauryas, Guptas, Cholas, Pandyas, Chalukyas, Chandelas, Rajputs, Mughals, and Marathas.
- **Living Traditions**: Over 15 UNESCO Intangible Cultural Heritage treasures including Vedic chanting, Kutiyattam, and Kalbelia folk dance.

💡 **Suggested Questions you can ask me:**
1. *"Tell me the secrets of the Konark Sun Temple sundial"*
2. *"How was Brihadisvara Temple built with an 80-ton dome?"*
3. *"Why do the Vittala temple pillars in Hampi make musical notes?"*
4. *"Plan a 4-day heritage tour of Rajasthan"*`;
  }

  async handleSendMessage() {
    const input = document.getElementById('gemini-chat-input');
    if (!input) return;
    const text = input.value.trim();
    if (!text || this.isTyping) return;

    input.value = '';
    this.addMessageToUI('user', text);
    this.showTypingIndicator();

    try {
      const botResponse = await this.getApiResponse(text);
      this.removeTypingIndicator();
      this.addMessageToUI('gemini', botResponse);
    } catch (error) {
      console.warn('Gemini server unavailable; using local knowledge:', error);
      this.removeTypingIndicator();
      this.addMessageToUI('gemini', this.getGeminiResponse(text));
    }
  }

  async getApiResponse(message) {
    const apiBase = window.BHARAT_API_BASE || '';
    const response = await fetch(`${apiBase}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    const result = await response.json();
    if (!response.ok || !result.answer) {
      throw new Error(result.error || 'Gemini server request failed.');
    }
    return result.answer;
  }

  askDirectly(query) {
    openGeminiDrawer();
    const input = document.getElementById('gemini-chat-input');
    if (input) {
      input.value = query;
      this.handleSendMessage();
    }
  }

  showTypingIndicator() {
    this.isTyping = true;
    const messagesContainer = document.getElementById('gemini-messages');
    if (!messagesContainer) return;

    const typingEl = document.createElement('div');
    typingEl.id = 'gemini-typing-indicator';
    typingEl.className = 'chat-message gemini-msg typing-msg';
    typingEl.innerHTML = `
      <div class="msg-avatar">✨</div>
      <div class="msg-content">
        <div class="typing-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    messagesContainer.appendChild(typingEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  removeTypingIndicator() {
    this.isTyping = false;
    const typingEl = document.getElementById('gemini-typing-indicator');
    if (typingEl) typingEl.remove();
  }

  addMessageToUI(sender, text) {
    const messagesContainer = document.getElementById('gemini-messages');
    if (!messagesContainer) return;

    const msgEl = document.createElement('div');
    msgEl.className = `chat-message ${sender === 'user' ? 'user-msg' : 'gemini-msg'}`;

    const formattedText = this.formatMarkdown(text);
    const avatar = sender === 'user' ? '👤' : '✨';

    msgEl.innerHTML = `
      <div class="msg-avatar">${avatar}</div>
      <div class="msg-content">
        ${formattedText}
        ${sender === 'gemini' ? `
          <div class="msg-actions">
            <button class="msg-action-btn speak-msg-btn" title="Read Aloud" onclick="geminiBot.speakText('${this.escapeForSpeech(text)}')">
              🔊 Listen
            </button>
            <button class="msg-action-btn copy-msg-btn" title="Copy Text" onclick="geminiBot.copyText(this)">
              📋 Copy
            </button>
          </div>
        ` : ''}
      </div>
    `;

    messagesContainer.appendChild(msgEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  formatMarkdown(text) {
    let formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/^### (.*$)/gim, '<h4>$1</h4>')
      .replace(/^## (.*$)/gim, '<h3>$1</h3>')
      .replace(/^# (.*$)/gim, '<h2>$1</h2>')
      .replace(/^\- (.*$)/gim, '<li>$1</li>')
      .replace(/^\• (.*$)/gim, '<li>$1</li>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');

    // Wrap li groups in ul
    formatted = formatted.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
    return formatted;
  }

  escapeForSpeech(text) {
    return text.replace(/[*#_`]/g, '').replace(/'/g, "\\'").replace(/"/g, '&quot;').replace(/\n/g, ' ');
  }

  speakText(cleanText) {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-Speech is not supported in this browser.");
      return;
    }
    this.synth.cancel();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    this.synth.speak(utterance);
  }

  copyText(btn) {
    const content = btn.closest('.msg-content').innerText.replace(/🔊 Listen|📋 Copy/g, '').trim();
    navigator.clipboard.writeText(content).then(() => {
      btn.innerText = '✅ Copied!';
      setTimeout(() => btn.innerText = '📋 Copy', 2000);
    });
  }
}

// Global instance
let geminiBot = null;

function openGeminiDrawer() {
  const drawer = document.getElementById('gemini-chat-drawer');
  const backdrop = document.getElementById('gemini-drawer-backdrop');
  if (drawer) drawer.classList.add('active');
  if (backdrop) backdrop.classList.add('active');
  const input = document.getElementById('gemini-chat-input');
  if (input) input.focus();
}

document.addEventListener('DOMContentLoaded', () => {
  geminiBot = new GeminiCulturalSage();
  const input = document.getElementById('gemini-chat-input');
  document.getElementById('gemini-send-btn')?.addEventListener('click', () => geminiBot.handleSendMessage());
  document.getElementById('gemini-mic-btn')?.addEventListener('click', () => geminiBot.toggleVoiceInput());
  document.getElementById('gemini-close-btn')?.addEventListener('click', closeGeminiDrawer);
  document.getElementById('gemini-drawer-backdrop')?.addEventListener('click', closeGeminiDrawer);
  input?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') geminiBot.handleSendMessage();
  });
  geminiBot.addMessageToUI('gemini', 'Namaste! Ask me about any of the heritage sites in Bharat Virasat.');
});

function closeGeminiDrawer() {
  const drawer = document.getElementById('gemini-chat-drawer');
  const backdrop = document.getElementById('gemini-drawer-backdrop');
  if (drawer) drawer.classList.remove('active');
  if (backdrop) backdrop.classList.remove('active');
}