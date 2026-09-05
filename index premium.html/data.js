/**
 * BHARAT VIRASAT - Indian Heritage & Cultural Sites Database
 * Curated for Smart India Hackathon (SIH) & UNESCO Heritage Portal
 */

const HERITAGE_SITES = [
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    hindiName: "ताज महल",
    location: "Agra, Uttar Pradesh",
    state: "Uttar Pradesh",
    zone: "North",
    category: "Monuments",
    era: "Mughal (17th Century)",
    yearBuilt: "1631–1648 CE",
    builtBy: "Emperor Shah Jahan",
    architecturalStyle: "Indo-Islamic & Mughal Architecture",
    unescoStatus: "UNESCO World Heritage Site (1983)",
    rating: 4.9,
    reviewsCount: 145000,
    coverImage: "../images/taj mahal.jpg",
    gallery: [
      "../images/taj mahal.jpg",
      "../images/taj mahal.jpg"
    ],
    shortSummary: "An ivory-white marble mausoleum on the right bank of river Yamuna, celebrated globally as the jewel of Muslim art in India and a universally admired masterpiece of love and symmetry.",
    fastFacts: [
      "Built using pure white Makrana marble from Rajasthan inlaid with 28 types of precious stones (Pietra Dura).",
      "The four minarets are tilted slightly outwards to protect the central dome in case of an earthquake.",
      "Changes its hue throughout the day: pinkish in morning, milky white in evening, and golden under moonlight."
    ],
    audioNarration: "The Taj Mahal, commissioned by Mughal Emperor Shah Jahan in 1631 in memory of his beloved wife Mumtaz Mahal, stands as an eternal symbol of love. Its perfect symmetrical design, reflective pools, and intricate marble inlay work represent the zenith of Indo-Islamic architectural brilliance.",
    bestTimeToVisit: "October to March (Sunrise or Sunset)",
    visitingHours: "Sunrise to Sunset (Closed on Fridays)",
    ticketPrice: "₹50 (Indians), ₹1100 (Foreign Tourists)",
    tags: ["UNESCO", "Wonder of the World", "Mughal", "Marble", "Symmetry"]
  },
  {
    id: "hampi-monuments",
    name: "Group of Monuments at Hampi",
    hindiName: "हम्पी के स्मारक",
    location: "Vijayanagara, Karnataka",
    state: "Karnataka",
    zone: "South",
    category: "Monuments",
    era: "Vijayanagara Empire (14th–16th Century)",
    yearBuilt: "1336–1565 CE",
    builtBy: "Harihara I, Bukka Raya I & King Krishnadevaraya",
    architecturalStyle: "Dravidian & Vijayanagara Architecture",
    unescoStatus: "UNESCO World Heritage Site (1986)",
    rating: 4.8,
    reviewsCount: 42000,
    coverImage: "../images/Group of Monuments at Hampi.jpg",
    gallery: [
      "../images/Group of Monuments at Hampi.jpg",
      "../images/Group of Monuments at Hampi.jpg"
    ],
    shortSummary: "The spectacular ruins of the capital of the Vijayanagara Empire, set amidst boulder-strewn hills along the Tungabhadra River, renowned for monolithic stone chariots and musical pillars.",
    fastFacts: [
      "The Vittala Temple's iconic Stone Chariot is featured on the Indian ₹50 banknote.",
      "The pillars in the Vittala temple's Ranga Mantapa emit distinct musical notes when gently tapped (Sa-Re-Ga-Ma).",
      "In the 15th century, Hampi was the world's second-largest medieval city after Beijing."
    ],
    audioNarration: "Hampi was the prosperous capital of the mighty Vijayanagara Empire. Spanning over 4,100 hectares, it hosts more than 1,600 surviving monuments, including the Virupaksha Temple, royal enclosures, and the world-famous Stone Chariot.",
    bestTimeToVisit: "November to February (Hampi Utsav in November)",
    visitingHours: "6:00 AM to 6:00 PM Daily",
    ticketPrice: "₹40 (Indians), ₹600 (Foreigners)",
    tags: ["UNESCO", "Vijayanagara", "Stone Chariot", "Musical Pillars", "Ancient City"]
  },
  {
    id: "konark-sun-temple",
    name: "Sun Temple, Konark",
    hindiName: "कोणार्क सूर्य मंदिर",
    location: "Puri District, Odisha",
    state: "Odisha",
    zone: "East",
    category: "Temples & Sacred",
    era: "Eastern Ganga Dynasty (13th Century)",
    yearBuilt: "1250 CE",
    builtBy: "King Narasimhadeva I",
    architecturalStyle: "Kalinga Architectural Style",
    unescoStatus: "UNESCO World Heritage Site (1984)",
    rating: 4.8,
    reviewsCount: 38000,
    coverImage: "../images/Sun Temple, Konark.jpg",
    gallery: [
      "../images/Sun Temple, Konark.jpg",
      "../images/Sun Temple, Konark.jpg"
    ],
    shortSummary: "A colossal 13th-century chariot of the Sun God Surya carved from stone, featuring 24 intricately sculpted wheels that function as precise astronomical sundials pulled by 7 spirited horses.",
    fastFacts: [
      "The 24 wheels of the chariot act as exact sundials, calculating time down to minutes using the shadow of the spokes.",
      "Known as the 'Black Pagoda' by European sailors because its dark tower served as a magnetic navigational landmark.",
      "The 7 horses symbolize the seven days of the week and the seven colors of the visible light spectrum."
    ],
    audioNarration: "The Sun Temple at Konark represents the pinnacle of Kalinga architecture. Conceived as a gigantic celestial chariot for Surya the Sun God, its 24 wheels and energetic stone horses demonstrate extraordinary mastery of astronomy and sculpting.",
    bestTimeToVisit: "September to March (Konark Dance Festival in December)",
    visitingHours: "6:00 AM to 8:00 PM Daily",
    ticketPrice: "₹40 (Indians), ₹600 (Foreigners)",
    tags: ["UNESCO", "Kalinga", "Sundial", "Sun God", "Astronomy"]
  },
  {
    id: "ajanta-ellora-caves",
    name: "Ajanta & Ellora Caves",
    hindiName: "अजंता और एलोरा की गुफाएं",
    location: "Chhatrapati Sambhajinagar, Maharashtra",
    state: "Maharashtra",
    zone: "West",
    category: "Caves & Rock-Cut",
    era: "2nd Century BCE – 10th Century CE",
    yearBuilt: "200 BCE – 1000 CE",
    builtBy: "Satavahana, Vakataka & Rashtrakuta Dynasties",
    architecturalStyle: "Ancient Indian Rock-Cut Architecture",
    unescoStatus: "UNESCO World Heritage Site (1983)",
    rating: 4.9,
    reviewsCount: 56000,
    coverImage: "../images/Ajanta & Ellora Caves.jpg",
    gallery: [
      "../images/Ajanta & Ellora Caves.jpg",
      "../images/Ajanta & Ellora Caves.jpg"
    ],
    shortSummary: "Rock-hewn sanctuaries of extraordinary artistic achievement, featuring Ajanta's masterly Buddhist fresco murals and Ellora's Kailasa Temple—the world's largest monolithic structure carved top-down from a single cliff.",
    fastFacts: [
      "Cave 16 (Kailash Temple) was excavated vertically from the top down, removing over 200,000 tonnes of basalt rock with simple chisels.",
      "Ajanta contains 30 Buddhist caves with tempera murals that have survived over 2,000 years with radiant natural pigments.",
      "Ellora harmoniously unites 34 caves representing Buddhism, Hinduism, and Jainism side by side."
    ],
    audioNarration: "The Ajanta and Ellora caves in Maharashtra stand as triumphs of ancient engineering and art. Ajanta's caves preserve the finest surviving classical Indian Buddhist paintings, while Ellora's monolithic Kailasa Temple was carved entirely out of a single mountain cliff from top to bottom.",
    bestTimeToVisit: "June to March (Ajanta closed Mondays, Ellora closed Tuesdays)",
    visitingHours: "9:00 AM to 5:30 PM",
    ticketPrice: "₹40 (Indians), ₹600 (Foreigners)",
    tags: ["UNESCO", "Rock-Cut", "Monolithic", "Kailash Temple", "Murals"]
  },
  {
    id: "brihadisvara-temple",
    name: "Brihadisvara Temple (Big Temple)",
    hindiName: "बृहदेश्वर मन्दिर",
    location: "Thanjavur, Tamil Nadu",
    state: "Tamil Nadu",
    zone: "South",
    category: "Temples & Sacred",
    era: "Chola Dynasty (11th Century)",
    yearBuilt: "1010 CE",
    builtBy: "Emperor Raja Raja Chola I",
    architecturalStyle: "Dravidian Chola Architecture",
    unescoStatus: "UNESCO World Heritage Site (1987)",
    rating: 4.9,
    reviewsCount: 62000,
    coverImage: "../images/Brihadisvara Temple (Big Temple).jpg",
    gallery: [
      "../images/Brihadisvara Temple (Big Temple).jpg",
      "../images/Brihadisvara Temple (Big Temple).jpg"
    ],
    shortSummary: "A granite marvel celebrating the zenith of Chola imperial glory, dominated by a 66-meter high Vimana crowned by an 80-tonne monolithic stone capstone raised without modern machinery.",
    fastFacts: [
      "Built entirely of granite in a region with no natural granite deposits within a 60-kilometer radius.",
      "The Kumbam (apex dome) weighs 81.3 tonnes and was rolled to the top using a 6-km long inclined earthen ramp.",
      "Houses one of India's largest monolithic Nandi statues (20 tonnes) carved from a single boulder."
    ],
    audioNarration: "Consecrated in 1010 CE by the great emperor Raja Raja Chola I, Brihadisvara Temple is one of the grandest achievements of Dravidian temple architecture. Its soaring granite tower and magnificent bronze sculptures exemplify Chola power and spiritual devotion.",
    bestTimeToVisit: "October to March",
    visitingHours: "6:00 AM – 12:30 PM, 4:00 PM – 8:30 PM",
    ticketPrice: "Free Entry (Protected by ASI)",
    tags: ["UNESCO", "Chola Dynasty", "Granite", "Dravidian", "Great Living Chola Temples"]
  },
  {
    id: "khajuraho-monuments",
    name: "Khajuraho Group of Monuments",
    hindiName: "खजुराहो स्मारक समूह",
    location: "Chhatarpur District, Madhya Pradesh",
    state: "Madhya Pradesh",
    zone: "Central",
    category: "Temples & Sacred",
    era: "Chandela Dynasty (10th–11th Century)",
    yearBuilt: "950–1050 CE",
    builtBy: "Chandela Kings (Yashovarman & Dhanga)",
    architecturalStyle: "Nagara (Kandariya Style) Architecture",
    unescoStatus: "UNESCO World Heritage Site (1986)",
    rating: 4.7,
    reviewsCount: 31000,
    coverImage: "../images/Khajuraho Group of Monuments.jpg",
    gallery: [
      "../images/Khajuraho Group of Monuments.jpg",
      "../images/Khajuraho Group of Monuments.jpg"
    ],
    shortSummary: "Exquisite sandstone temples celebrated worldwide for their graceful Nagara-style spires and intricate sculptures depicting spiritual harmony, daily life, celestial nymphs, and human intimacy.",
    fastFacts: [
      "Only around 10% of the exterior carvings are erotic; the remaining 90% portray deities, musicians, battles, and everyday medieval Indian life.",
      "Originally comprised 85 temples spread across 20 sq km, of which 25 remarkably preserved temples survive today.",
      "The Kandariya Mahadeva Temple is the largest, representing Mount Kailash with 84 miniature shikhara spires."
    ],
    audioNarration: "The temples of Khajuraho, built during the Chandela dynasty between 950 and 1050 CE, are renowned for their sublime Nagara architecture and harmonious depiction of Dharma, Artha, Kama, and Moksha in sandstone.",
    bestTimeToVisit: "October to March (Khajuraho Dance Festival in February)",
    visitingHours: "Sunrise to Sunset Daily",
    ticketPrice: "₹40 (Indians), ₹600 (Foreigners)",
    tags: ["UNESCO", "Chandela", "Nagara", "Sandstone", "Kandariya Mahadeva"]
  },
  {
    id: "qutub-minar",
    name: "Qutub Minar & Its Monuments",
    hindiName: "क़ुतुब मीनार",
    location: "Mehrauli, New Delhi",
    state: "Delhi",
    zone: "North",
    category: "Monuments",
    era: "Delhi Sultanate (12th–14th Century)",
    yearBuilt: "1199–1220 CE",
    builtBy: "Qutb-ud-din Aibak & Shams-ud-din Iltutmish",
    architecturalStyle: "Indo-Islamic Architecture",
    unescoStatus: "UNESCO World Heritage Site (1993)",
    rating: 4.7,
    reviewsCount: 98000,
    coverImage: "../images/Qutub Minar & Its Monuments.jpg",
    gallery: [
      "../images/Qutub Minar & Its Monuments.jpg",
      "../images/Qutub Minar & Its Monuments.jpg"
    ],
    shortSummary: "The world's tallest brick minaret at 72.5 meters, surrounded by ancient ruins including the mysterious 1,600-year-old rust-resistant Gupta Iron Pillar.",
    fastFacts: [
      "Constructed using fluted red sandstone and marble with 379 spiral steps leading to the summit.",
      "The courtyard features the famous 4th-century Iron Pillar of Chandragupta II, which has not rusted despite 1,600 years of open monsoon exposure.",
      "Features calligraphic inscriptions from the Holy Quran carved in delicate Naskh and Kufic scripts."
    ],
    audioNarration: "Rising 72.5 meters high into the Delhi skyline, the Qutub Minar was initiated in 1199 by Qutb-ud-din Aibak to mark the victory of the Delhi Sultanate. The complex also houses the Alai Darwaza gate and the metallurgical miracle of the rustless Gupta Iron Pillar.",
    bestTimeToVisit: "October to March",
    visitingHours: "7:00 AM to 9:00 PM Daily",
    ticketPrice: "₹40 (Indians), ₹600 (Foreigners)",
    tags: ["UNESCO", "Delhi Sultanate", "Brick Minaret", "Iron Pillar", "Medieval"]
  },
  {
    id: "amber-fort-jaipur",
    name: "Amer Fort & Hill Forts of Rajasthan",
    hindiName: "आमेर का क़िला, जयपुर",
    location: "Jaipur, Rajasthan",
    state: "Rajasthan",
    zone: "North",
    category: "Forts & Palaces",
    era: "Kachhwaha Rajput (16th Century)",
    yearBuilt: "1592 CE",
    builtBy: "Raja Man Singh I",
    architecturalStyle: "Rajput & Mughal Fusion Architecture",
    unescoStatus: "UNESCO World Heritage Site (2013)",
    rating: 4.8,
    reviewsCount: 110000,
    coverImage: "../images/Amer Fort & Hill Forts of Rajasthan.jpg",
    gallery: [
      "../images/Amer Fort & Hill Forts of Rajasthan.jpg",
      "../images/Amer Fort & Hill Forts of Rajasthan.jpg"
    ],
    shortSummary: "A majestic hilltop fortress overlooking Maota Lake, famous for its artistic Hindu elements, opulent courtyards, and the glittering Sheesh Mahal (Palace of Mirrors).",
    fastFacts: [
      "The Sheesh Mahal is inlaid with thousands of convex Belgian glass mirrors such that a single candle illuminates the entire hall.",
      "Connected to Jaigarh Fort via subterranean secret escape tunnels beneath the Cheel ka Teela hills.",
      "One of the six Hill Forts of Rajasthan collectively inscribed as UNESCO World Heritage."
    ],
    audioNarration: "Perched high on the rugged Aravalli hills, Amer Fort in Jaipur was founded in 1592 by Raja Man Singh. Blending Rajput grandeur with Mughal elegance, its marble pavilions, Diwan-e-Aam, and breathtaking mirror palace represent the height of royal Rajasthani opulence.",
    bestTimeToVisit: "October to March (Light & Sound show in evening)",
    visitingHours: "8:00 AM to 5:30 PM, 6:30 PM to 9:15 PM (Night view)",
    ticketPrice: "₹100 (Indians), ₹500 (Foreigners)",
    tags: ["UNESCO", "Rajput", "Sheesh Mahal", "Hill Fort", "Jaipur"]
  },
  {
    id: "nalanda-university",
    name: "Archaeological Site of Nalanda Mahavihara",
    hindiName: "नालंदा महाविहार",
    location: "Nalanda District, Bihar",
    state: "Bihar",
    zone: "East",
    category: "Ancient Universities",
    era: "Gupta & Pala Dynasties (5th–12th Century)",
    yearBuilt: "427 CE",
    builtBy: "Emperor Kumaragupta I (Gupta Empire)",
    architecturalStyle: "Ancient Buddhist Monastic Architecture",
    unescoStatus: "UNESCO World Heritage Site (2016)",
    rating: 4.7,
    reviewsCount: 22000,
    coverImage: "../images/Archaeological Site of Nalanda Mahavihara.jpg",
    gallery: [
      "../images/Archaeological Site of Nalanda Mahavihara.jpg",
      "../images/Archaeological Site of Nalanda Mahavihara.jpg"
    ],
    shortSummary: "The world's premier residential ancient university, housing over 10,000 scholars and 2,000 teachers from across Asia before its famed 9-million manuscript library was destroyed.",
    fastFacts: [
      "The library complex, Dharmaganja ('Treasury of Truth'), housed 9 million handwritten manuscripts and burned for 3 months.",
      "Attracted eminent global scholars like Xuanzang (Hiuen Tsang) and Aryabhata who studied astronomy, mathematics, logic, and philosophy.",
      "Spread over 30 acres of excavated red-brick stupas, viharas (monasteries), and meditation cells."
    ],
    audioNarration: "Nalanda Mahavihara was the ancient world's most prestigious seat of higher learning, flourishing for over 700 years from the 5th to the 12th century. Its red-brick ruins testify to an era when India was the philosophical and intellectual beacon of the Asian continent.",
    bestTimeToVisit: "October to March",
    visitingHours: "9:00 AM to 5:00 PM Daily",
    ticketPrice: "₹40 (Indians), ₹600 (Foreigners)",
    tags: ["UNESCO", "Ancient University", "Gupta Empire", "Buddhism", "Aryabhata"]
  },
  {
    id: "rani-ki-vav",
    name: "Rani ki Vav (The Queen's Stepwell)",
    hindiName: "रानी की वाव, पाटन",
    location: "Patan, Gujarat",
    state: "Gujarat",
    zone: "West",
    category: "Monuments",
    era: "Chaulukya / Solanki Dynasty (11th Century)",
    yearBuilt: "1063 CE",
    builtBy: "Queen Udayamati in memory of King Bhima I",
    architecturalStyle: "Maru-Gurjara Architectural Style",
    unescoStatus: "UNESCO World Heritage Site (2014)",
    rating: 4.8,
    reviewsCount: 29000,
    coverImage: "../images/Rani ki Vav (The Queen's Stepwell).jpg",
    gallery: [
      "../images/Rani ki Vav (The Queen's Stepwell).jpg"
    ],
    shortSummary: "An inverted underground subterranean temple celebrating water sanctity, descending seven terraced levels with over 500 principal sculptures of Lord Vishnu's avatars.",
    fastFacts: [
      "Depicted on the reverse of the new Indian ₹100 banknote.",
      "Designed as an inverted temple highlighting the sacred sanctity of water in arid western India.",
      "Buried under silt for over 800 years by the Saraswati River before being excavated intact by ASI in the 1980s."
    ],
    audioNarration: "Built in 1063 CE by Queen Udayamati of the Solanki dynasty, Rani ki Vav in Patan is an exceptional subterranean stepwell. With seven levels of pillared galleries and over 500 masterly sculptures of the Dashavatara, it transforms utilitarian water harvesting into divine temple art.",
    bestTimeToVisit: "November to February",
    visitingHours: "8:00 AM to 6:00 PM Daily",
    ticketPrice: "₹40 (Indians), ₹600 (Foreigners)",
    tags: ["UNESCO", "Stepwell", "Solanki", "₹100 Note", "Vishnu Avatars"]
  },
  {
    id: "meenakshi-temple",
    name: "Meenakshi Amman Temple",
    hindiName: "मीनाक्षी अम्मन मन्दिर",
    location: "Madurai, Tamil Nadu",
    state: "Tamil Nadu",
    zone: "South",
    category: "Temples & Sacred",
    era: "Pandyan & Nayak Dynasties (6th–17th Century)",
    yearBuilt: "Rebuilt 1623–1655 CE",
    builtBy: "King Tirumala Nayaka & Pandyan Rulers",
    architecturalStyle: "Dravidian Temple Architecture",
    unescoStatus: "Nominated UNESCO Tentative List",
    rating: 4.9,
    reviewsCount: 95000,
    coverImage: "../images/Meenakshi Amman Temple.jpg",
    gallery: [
      "../images/Meenakshi Amman Temple.jpg"
    ],
    shortSummary: "A living spiritual city centered around Goddess Meenakshi, renowned for its 14 towering, vibrant multi-colored gopurams and the celebrated Hall of Thousand Musical Pillars.",
    fastFacts: [
      "The temple complex houses over 33,000 sculptures on its 14 towering pyramidal gopurams.",
      "The Hall of Thousand Pillars contains 985 uniquely carved granite pillars, each carved from single stones with distinct mythological motifs.",
      "Attracts over 50,000 pilgrims daily and over a million during the annual 10-day Chithirai Festival."
    ],
    audioNarration: "Located in the ancient 2,500-year-old city of Madurai, Meenakshi Amman Temple is a masterpiece of Dravidian living heritage. Dedicated to Goddess Parvati in the form of Meenakshi and Lord Shiva as Sundareswarar, its towering gopurams dominate the skyline with thousands of painted mythological figures.",
    bestTimeToVisit: "October to March",
    visitingHours: "5:00 AM – 12:30 PM, 4:00 PM – 10:00 PM",
    ticketPrice: "Free (Special darshan ₹50–₹100)",
    tags: ["Living Heritage", "Dravidian", "Madurai", "Gopuram", "Thousand Pillars"]
  },
  {
    id: "kaziranga-national-park",
    name: "Kaziranga Cultural & Eco Heritage",
    hindiName: "काजीरंगा राष्ट्रीय उद्यान",
    location: "Golaghat & Nagaon, Assam",
    state: "Assam",
    zone: "Northeast",
    category: "Natural & Eco-Heritage",
    era: "Ancient Ahom Kingdom & Modern Sanctuary",
    yearBuilt: "Declared Reserve in 1905 CE",
    builtBy: "Preservation initiated by Lady Curzon",
    architecturalStyle: "Brahmaputra Floodplain Ecosystem & Ahom Folk Culture",
    unescoStatus: "UNESCO World Heritage Site (1985)",
    rating: 4.8,
    reviewsCount: 34000,
    coverImage: "../images/Kaziranga Cultural & Eco Heritage.jpg",
    gallery: [
      "../images/Kaziranga Cultural & Eco Heritage.jpg"
    ]
  }
];

const ADDITIONAL_HERITAGE_SITES = [
  ["shaniwarwada", "Shaniwarwada Fort", "Pune, Maharashtra", "Maharashtra", "West", "Forts & Palaces", "National cultural landmark", "The fortified palace complex built in 1732 as the seat of the Peshwas of the Maratha Empire.", "Delhi Gate, Nagarkhana, carved teak work, and the historic Peshwa court.", "October to February"],
  ["red-fort", "Red Fort Complex", "Delhi", "Delhi", "North", "Monuments", "UNESCO World Heritage Site (2007)", "The red sandstone fort-palace built by Shah Jahan as the heart of Shahjahanabad.", "Mughal architecture and the historic Diwan-i-Khas.", "October to March"],
  ["humayuns-tomb", "Humayun's Tomb", "New Delhi", "Delhi", "North", "Monuments", "UNESCO World Heritage Site (1993)", "The grand garden tomb that introduced major Mughal architectural ideas to India.", "Charbagh gardens and the double dome.", "October to March"],
  ["fatehpur-sikri", "Fatehpur Sikri", "Agra District, Uttar Pradesh", "Uttar Pradesh", "North", "Monuments", "UNESCO World Heritage Site (1986)", "A planned Mughal city built by Emperor Akbar and celebrated for its red sandstone buildings.", "Buland Darwaza, Panch Mahal, and Jama Masjid.", "October to March"],
  ["agra-fort", "Agra Fort", "Agra, Uttar Pradesh", "Uttar Pradesh", "North", "Forts & Palaces", "UNESCO World Heritage Site (1983)", "A powerful riverside fort and imperial residence of the Mughal emperors.", "Akbari fortifications and Shah Jahani marble palaces.", "October to March"],
  ["mahabalipuram", "Group of Monuments at Mahabalipuram", "Mahabalipuram, Tamil Nadu", "Tamil Nadu", "South", "Temples & Sacred", "UNESCO World Heritage Site (1984)", "Pallava monuments carved from granite beside the Bay of Bengal.", "Shore Temple, Pancha Rathas, and Arjuna's Penance.", "November to February"],
  ["great-chola-temples", "Great Living Chola Temples", "Thanjavur and Gangaikonda Cholapuram", "Tamil Nadu", "South", "Temples & Sacred", "UNESCO World Heritage Site (1987, 2004)", "A group of monumental Chola temples that preserve living South Indian traditions.", "Dravidian towers, granite sculpture, and Chola bronze art.", "October to March"],
  ["pattadakal", "Group of Monuments at Pattadakal", "Bagalkot, Karnataka", "Karnataka", "South", "Temples & Sacred", "UNESCO World Heritage Site (1987)", "A Chalukyan temple complex where northern and southern architectural styles meet.", "Virupaksha Temple and experimental temple plans.", "October to February"],
  ["churches-goa", "Churches and Convents of Goa", "Old Goa, Goa", "Goa", "West", "Monuments", "UNESCO World Heritage Site (1986)", "Historic churches that reflect Portuguese influence and the spread of Christianity in Asia.", "Basilica of Bom Jesus and the Se Cathedral.", "November to February"],
  ["elephanta-caves", "Elephanta Caves", "Mumbai Harbour, Maharashtra", "Maharashtra", "West", "Caves & Rock-Cut", "UNESCO World Heritage Site (1987)", "Basalt cave temples dedicated mainly to Shiva on Elephanta Island.", "The Trimurti and large rock-cut mandapas.", "November to February"],
  ["chhatrapati-shivaji-terminus", "Chhatrapati Shivaji Terminus", "Mumbai, Maharashtra", "Maharashtra", "West", "Monuments", "UNESCO World Heritage Site (2004)", "A landmark railway terminus blending Victorian Gothic and traditional Indian forms.", "Stone domes, pointed arches, and detailed railway architecture.", "November to February"],
  ["victorian-art-deco-mumbai", "Victorian Gothic and Art Deco Ensembles of Mumbai", "Mumbai, Maharashtra", "Maharashtra", "West", "Monuments", "UNESCO World Heritage Site (2018)", "A cityscape showing Mumbai's transition from colonial Gothic buildings to Art Deco design.", "Oval Maidan views and the Art Deco Marine Drive curve.", "November to February"],
  ["sanchi", "Buddhist Monuments at Sanchi", "Raisen, Madhya Pradesh", "Madhya Pradesh", "Central", "Temples & Sacred", "UNESCO World Heritage Site (1989)", "One of India's oldest surviving Buddhist sanctuary landscapes.", "The Great Stupa gateways and Ashokan history.", "October to March"],
  ["bhimbetka", "Rock Shelters of Bhimbetka", "Raisen, Madhya Pradesh", "Madhya Pradesh", "Central", "Caves & Rock-Cut", "UNESCO World Heritage Site (2003)", "Natural rock shelters containing paintings from prehistoric and historic communities.", "Layered paintings, shelters, and ancient human settlement evidence.", "October to March"],
  ["champaner-pavagadh", "Champaner-Pavagadh Archaeological Park", "Panchmahal, Gujarat", "Gujarat", "West", "Monuments", "UNESCO World Heritage Site (2004)", "A cultural landscape combining a hilltop pilgrimage site with a medieval city.", "Jama Masjid, stepwells, fortifications, and Pavagadh hill.", "October to February"],
  ["modhera-sun-temple", "Sun Temple, Modhera", "Mehsana, Gujarat", "Gujarat", "West", "Temples & Sacred", "UNESCO Tentative List", "An 11th-century Solanki temple aligned with the sun and framed by a ritual tank.", "Surya shrine, stepped tank, and sculpted pavilions.", "October to February"],
  ["victoria-memorial", "Victoria Memorial", "Kolkata, West Bengal", "West Bengal", "East", "Monuments", "National cultural landmark", "A white-marble memorial and museum surrounded by gardens in central Kolkata.", "Indo-Saracenic design and colonial-era collections.", "October to March"],
  ["sundarbans", "Sundarbans National Park", "West Bengal", "West Bengal", "East", "Natural & Eco-Heritage", "UNESCO World Heritage Site (1987)", "The world's largest mangrove forest and a vital habitat for the Bengal tiger.", "Mangrove channels, tidal ecology, and wildlife safaris.", "November to February"],
  ["manas", "Manas Wildlife Sanctuary", "Assam", "Assam", "Northeast", "Natural & Eco-Heritage", "UNESCO World Heritage Site (1985)", "A Himalayan foothill sanctuary known for grasslands, forests, and rare wildlife.", "Golden langur, wild water buffalo, and river landscapes.", "November to April"],
  ["western-ghats", "Western Ghats", "Western India", "Multiple states", "West", "Natural & Eco-Heritage", "UNESCO World Heritage Site (2012)", "A chain of biodiversity hotspots running along India's western edge.", "Rainforests, endemic species, and dramatic mountain escarpments.", "October to May"],
  ["nanda-devi", "Nanda Devi and Valley of Flowers National Parks", "Uttarakhand Himalaya", "Uttarakhand", "North", "Natural & Eco-Heritage", "UNESCO World Heritage Site (1988, 2005)", "High Himalayan protected landscapes filled with alpine meadows and rare species.", "Valley of Flowers blooms and Nanda Devi mountain scenery.", "July to September"],
  ["keoladeo", "Keoladeo National Park", "Bharatpur, Rajasthan", "Rajasthan", "North", "Natural & Eco-Heritage", "UNESCO World Heritage Site (1985)", "A managed wetland and major winter refuge for migratory birds.", "Birdwatching trails, painted storks, and seasonal wetlands.", "October to March"],
  ["khangchendzonga", "Khangchendzonga National Park", "Sikkim Himalaya", "Sikkim", "Northeast", "Natural & Eco-Heritage", "UNESCO Mixed World Heritage Site (2016)", "A sacred Himalayan landscape combining high mountains, forests, and living traditions.", "Mount Khangchendzonga and diverse alpine ecosystems.", "October to May"],
  ["ramappa", "Kakatiya Rudreshwara (Ramappa) Temple", "Palampet, Telangana", "Telangana", "South", "Temples & Sacred", "UNESCO World Heritage Site (2021)", "A Kakatiya temple known for detailed sculpture and lightweight floating bricks.", "Star-shaped plan, dance sculptures, and carved granite pillars.", "October to March"],
  ["dholavira", "Dholavira: A Harappan City", "Kutch, Gujarat", "Gujarat", "West", "Archaeological Sites", "UNESCO World Heritage Site (2021)", "A remarkably planned Indus Valley city with reservoirs, streets, and ceremonial spaces.", "Ancient water management and Harappan urban planning.", "October to March"],
  ["santiniketan", "Santiniketan", "Birbhum, West Bengal", "West Bengal", "East", "Living Heritage", "UNESCO World Heritage Site (2023)", "The educational and cultural community founded by Rabindranath Tagore.", "Open-air learning, art, music, and Visva-Bharati traditions.", "October to March"],
  ["hoysala-temples", "Sacred Ensembles of the Hoysalas", "Belur, Halebidu and Somnathapura, Karnataka", "Karnataka", "South", "Temples & Sacred", "UNESCO World Heritage Site (2023)", "Hoysala temples covered in intricate soapstone sculpture and precise architectural detail.", "Star-shaped plans, narrative friezes, and polished stone carving.", "October to February"],
  ["jaipur-city", "The Walled City of Jaipur", "Jaipur, Rajasthan", "Rajasthan", "North", "Historic Cities", "UNESCO World Heritage Site (2019)", "A planned historic city designed around trade, craft, astronomy, and royal life.", "Grid planning, pink facades, bazaars, and Jantar Mantar.", "October to March"],
  ["ahmedabad-city", "Historic City of Ahmadabad", "Ahmedabad, Gujarat", "Gujarat", "West", "Historic Cities", "UNESCO World Heritage Site (2017)", "A historic walled city shaped by houses, mosques, markets, and community neighbourhoods.", "Pol houses, carved wooden facades, and old city streets.", "October to February"],
  ["lucknow-heritage", "Lucknow Historic Imambaras", "Lucknow, Uttar Pradesh", "Uttar Pradesh", "North", "Monuments", "National cultural landmark", "A group of Awadhi monuments known for grand halls, gateways, and refined craft traditions.", "Bara Imambara, Bhool Bhulaiya, and Rumi Darwaza.", "October to March"],
  ["badami-caves", "Badami Cave Temples", "Badami, Karnataka", "Karnataka", "South", "Caves & Rock-Cut", "National cultural landmark", "Rock-cut temples carved into red sandstone cliffs above an ancient lake town.", "Chalukyan sculpture and Hindu, Jain, and Buddhist imagery.", "October to February"]
];

const HERITAGE_IMAGE_FILES = {
  "shaniwarwada": "Shaniwarwada Fort.jpg",
  "red-fort": "Red Fort Complex.jpg",
  "humayuns-tomb": "Humayun's Tomb.jpg",
  "fatehpur-sikri": "Fatehpur Sikri.jpg",
  "agra-fort": "Agra Fort.jpg",
  "mahabalipuram": "Group of Monuments at Mahabalipuram.jpg",
  "great-chola-temples": "Great Living Chola Temples.jpg",
  "pattadakal": "Group of Monuments at Pattadakal.jpg",
  "churches-goa": "Churches and Convents of Goa.jpg",
  "elephanta-caves": "Elephanta Caves.jpg",
  "chhatrapati-shivaji-terminus": "Chhatrapati Shivaji Terminus.jpg",
  "victorian-art-deco-mumbai": "Victorian Gothic and Art Deco Ensembles of Mumbai.jpg",
  "sanchi": "Buddhist Monuments at Sanchi.jpg",
  "bhimbetka": "Rock Shelters of Bhimbetka.jpg",
  "champaner-pavagadh": "Champaner-Pavagadh Archaeological Park.jpg",
  "modhera-sun-temple": "Sun Temple, Modhera.jpg",
  "victoria-memorial": "Victoria Memorial.jpg",
  "sundarbans": "Sundarbans National Park.jpg",
  "manas": "Manas Wildlife Sanctuary.jpg",
  "western-ghats": "Western Ghats.jpg",
  "nanda-devi": "Nanda Devi and Valley of Flowers National Parks.jpg",
  "keoladeo": "Keoladeo National Park.jpg",
  "khangchendzonga": "Khangchendzonga National Park.jpg",
  "ramappa": "Kakatiya Rudreshwara (Ramappa) Temple.jpg",
  "dholavira": "Dholavira A Harappan City.jpg",
  "santiniketan": "Santiniketan.jpg",
  "hoysala-temples": "Sacred Ensembles of the Hoysalas.jpg",
  "jaipur-city": "The Walled City of Jaipur.jpg",
  "ahmedabad-city": "Historic City of Ahmadabad.jpg",
  "lucknow-heritage": "Lucknow Historic Imambaras.jpg",
  "badami-caves": "Badami Cave Temples.jpg"
};

for (const [id, name, location, state, zone, category, unescoStatus, shortSummary, highlight, bestTimeToVisit] of ADDITIONAL_HERITAGE_SITES) {
  const imageFile = HERITAGE_IMAGE_FILES[id];
  HERITAGE_SITES.push({
    id,
    name,
    hindiName: name,
    location,
    state,
    zone,
    category,
    era: "Historic Indian heritage",
    yearBuilt: "Multiple historic periods",
    builtBy: "Regional dynasties and communities",
    unescoStatus,
    shortSummary,
    fastFacts: [highlight],
    bestTimeToVisit,
    visitingHours: "Check official visitor information before travelling",
    ticketPrice: "Check official ticket information before travelling",
    tags: [category, state, "India"],
    coverImage: imageFile ? `../images/${imageFile}` : "",
    gallery: imageFile ? [`../images/${imageFile}`] : []
  });
}

window.heritageData = HERITAGE_SITES;