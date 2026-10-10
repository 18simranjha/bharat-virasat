/**
 * 🗺️ BHARAT VIRASAT — 80-DAY BHARAT DARSHAN EXPEDITION PLANNER
 * "८० दिनों में भारत भ्रमण" — The 80-Day Cultural Odyssey across 28 States & UTs.
 * Complete with interactive Leaflet routing, daily schedules, transit, ASI badges, and culinary tips.
 */

(function () {
  'use strict';

  // 10 Grand Indian Circuits comprising 80 Days of heritage exploration
  const EXPEDITION_CIRCUITS = [
    {
      id: 'c1',
      name: 'Circuit 1: उत्तर भारत धरोहर (Imperial Northern Heritage)',
      days: 'Days 1–8',
      region: 'Delhi, Agra & Mathura',
      color: '#e74c3c'
    },
    {
      id: 'c2',
      name: 'Circuit 2: राजपूताना एवं मरुभूमि (Royal Rajputana & Desert Citadels)',
      days: 'Days 9–17',
      region: 'Rajasthan',
      color: '#e67e22'
    },
    {
      id: 'c3',
      name: 'Circuit 3: पावन गंगा एवं ज्ञान तीर्थ (Sacred Waters & Ancient Wisdom)',
      days: 'Days 18–25',
      region: 'Uttar Pradesh & Bihar',
      color: '#f1c40f'
    },
    {
      id: 'c4',
      name: 'Circuit 4: पूर्व भारत एवं ब्रह्मपुत्र (Eastern Mysticism & Living Roots)',
      days: 'Days 26–34',
      region: 'Bengal, Odisha, Assam & Meghalaya',
      color: '#2ecc71'
    },
    {
      id: 'c5',
      name: 'Circuit 5: मध्य भारत एवं शैलचित्र (Central Heartlands & Rock Art)',
      days: 'Days 35–42',
      region: 'Madhya Pradesh',
      color: '#1abc9c'
    },
    {
      id: 'c6',
      name: 'Circuit 6: मराठा दुर्ग एवं दक्कन गुफाएं (Maratha Bastions & Deccan Caves)',
      days: 'Days 43–50',
      region: 'Maharashtra',
      color: '#3498db'
    },
    {
      id: 'c7',
      name: 'Circuit 7: कोंकण तट एवं गोवा धरोहर (Sun-Kissed Coast & Baroque Enclaves)',
      days: 'Days 51–56',
      region: 'Goa & Coastal Karnataka',
      color: '#9b59b6'
    },
    {
      id: 'c8',
      name: 'Circuit 8: द्रविड़ गोपुरम एवं चोल मंदिर (Dravidian Gopurams & Coastal Cholas)',
      days: 'Days 57–67',
      region: 'Tamil Nadu & Puducherry',
      color: '#e67e22'
    },
    {
      id: 'c9',
      name: 'Circuit 9: केरल एवं बैकवाटर्स (Malabar Spice Coast & Backwaters)',
      days: 'Days 68–74',
      region: 'Kerala',
      color: '#16a085'
    },
    {
      id: 'c10',
      name: 'Circuit 10: देवभूमि हिमालय एवं गंगा उद्गम (Himalayan Heights & Abode of the Gods)',
      days: 'Days 75–80',
      region: 'Uttarakhand & Himalayas',
      color: '#2980b9'
    }
  ];

const EXPEDITION_DAYS = [
    // Circuit 1: Days 1-8
    {
      day: 1,
      circuitId: 'c1',
      title: 'Echoes of Shahjahanabad: Old Delhi Citadels',
      city: 'Delhi',
      state: 'Delhi NCR',
      coords: [28.6562, 77.2410],
      monuments: 'Red Fort (Lal Qila), Jama Masjid, Chandni Chowk',
      schedule: {
        morning: '07:30 AM: Sunrise walk around Chandni Chowk & parathas at Gali Paranthe Wali.',
        afternoon: '11:00 AM: Explore Red Fort (Diwan-i-Khas & Mumtaz Mahal museum).',
        evening: '05:30 PM: Golden hour minaret view at Jama Masjid.'
      },
      transit: 'Delhi Metro Violet Line / Electric Rickshaw',
      cuisine: 'Daulat ki Chaat & Old Delhi Mughlai Biryani',
      budget: '₹1,500 – ₹2,500 / day',
      asiInfo: 'ASI Protected Monument • Circle: Delhi Circle'
    },
    {
      day: 2,
      circuitId: 'c1',
      title: 'Towers of the Delhi Sultanate',
      city: 'South Delhi',
      state: 'Delhi NCR',
      coords: [28.5244, 77.1855],
      monuments: 'Qutub Minar, Iron Pillar of Chandragupta, Alai Darwaza',
      schedule: {
        morning: '08:30 AM: Witness the 1,600-year rust-resistant Gupta Iron Pillar.',
        afternoon: '01:00 PM: Mehrauli Archaeological Park & Jamali Kamali Mosque.',
        evening: '04:30 PM: Sunset photography of the soaring 72.5m Qutub minaret.'
      },
      transit: 'Metro Yellow Line (Qutub Minar Station)',
      cuisine: 'Chole Bhature & Rabri Jalebi',
      budget: '₹1,200 – ₹2,000 / day',
      asiInfo: 'UNESCO World Heritage Site • ASI Ticketing Enabled'
    },
    {
      day: 3,
      circuitId: 'c1',
      title: 'The Charbagh Prototype: Humayun’s Garden Tomb',
      city: 'Nizamuddin, Delhi',
      state: 'Delhi NCR',
      coords: [28.5933, 77.2507],
      monuments: 'Humayun’s Tomb, Isa Khan Tomb, Sunder Nursery',
      schedule: {
        morning: '08:00 AM: Walk the Persian geometry water channels of Humayun’s Tomb.',
        afternoon: '12:30 PM: Sunder Nursery heritage flora pavilions & artisanal lunch.',
        evening: '06:00 PM: Nizamuddin Dargah evening Sufi Qawwali devotional music.'
      },
      transit: 'City Cab or Pink Line Metro',
      cuisine: 'Nihari & Sheermal at Nizamuddin',
      budget: '₹1,500 – ₹3,000 / day',
      asiInfo: 'UNESCO World Heritage Site (1993)'
    },
    {
      day: 4,
      circuitId: 'c1',
      title: 'The Monument of Eternal Love',
      city: 'Agra',
      state: 'Uttar Pradesh',
      coords: [27.1751, 78.0421],
      monuments: 'Taj Mahal, Mehtab Bagh (Moonlight Garden)',
      schedule: {
        morning: '06:00 AM: Sunrise entry to the ivory-white Makrana marble dome.',
        afternoon: '02:00 PM: Observe traditional Pietra Dura marble inlay master craftspeople.',
        evening: '05:45 PM: Sunset silhouette view across the Yamuna from Mehtab Bagh.'
      },
      transit: 'Gatimaan Express (Delhi to Agra - 100 mins)',
      cuisine: 'Agra Petha & Bedmi Puri with spicy aloo sabzi',
      budget: '₹2,000 – ₹4,500 / day',
      asiInfo: 'ASI Flagship Monument • Online E-Ticket Mandatory'
    },
    {
      day: 5,
      circuitId: 'c1',
      title: 'Red Sandstone Might: Agra Fort & Itmad-ud-Daulah',
      city: 'Agra',
      state: 'Uttar Pradesh',
      coords: [27.1795, 78.0211],
      monuments: 'Agra Fort, Sheesh Mahal, Baby Taj (Tomb of I\'timad-ud-Daulah)',
      schedule: {
        morning: '08:30 AM: Tour Musamman Burj where Shah Jahan gazed at the Taj Mahal.',
        afternoon: '01:30 PM: Baby Taj—the delicate Persian jewel box preceding the Taj.',
        evening: '05:00 PM: Sadar Bazaar leather craft and spice street walk.'
      },
      transit: 'Heritage Auto / Local Taxi',
      cuisine: 'Dalmoth namkeen & Kesar Lassi',
      budget: '₹1,500 – ₹2,800 / day',
      asiInfo: 'UNESCO World Heritage Site • Agra Circle'
    },
    {
      day: 6,
      circuitId: 'c1',
      title: 'The Ghost Citadel of Emperor Akbar',
      city: 'Fatehpur Sikri',
      state: 'Uttar Pradesh',
      coords: [27.0945, 77.6679],
      monuments: 'Buland Darwaza, Panch Mahal, Tomb of Salim Chishti',
      schedule: {
        morning: '09:00 AM: Ascend the colossal 54m Buland Darwaza (Gate of Magnificence).',
        afternoon: '01:00 PM: Tie a wish thread at the marble jali screens of Salim Chishti.',
        evening: '04:00 PM: Wander the mysterious 5-tiered Panch Mahal palace of winds.'
      },
      transit: 'Scenic Highway Drive from Agra (37 km)',
      cuisine: 'Fatehpur Sikri Nan-Khatai & Milk pedas',
      budget: '₹1,200 – ₹2,200 / day',
      asiInfo: 'UNESCO World Heritage Site (1986)'
    },
    {
      day: 7,
      circuitId: 'c1',
      title: 'Sacred Groves of Krishna: Mathura & Vrindavan',
      city: 'Mathura & Vrindavan',
      state: 'Uttar Pradesh',
      coords: [27.4924, 77.6737],
      monuments: 'Shri Krishna Janmabhoomi, Banke Bihari Temple, Govind Dev Temple',
      schedule: {
        morning: '07:00 AM: Banke Bihari morning Darshan & musical bhajans.',
        afternoon: '12:00 PM: Red sandstone Govind Dev Ji temple built by Raja Man Singh (1590 CE).',
        evening: '06:30 PM: Yamuna Aarti at Vishram Ghat with floating brass lamps.'
      },
      transit: 'NH19 Express Highway or Intercity Rail',
      cuisine: 'Mathura Ke Pede & Makhan Mishri',
      budget: '₹1,000 – ₹1,800 / day',
      asiInfo: 'ASI Protected Temples & Sacred Heritage Circuit'
    },
    {
      day: 8,
      circuitId: 'c1',
      title: 'Sultanate Tombs & Deeg Water Palaces',
      city: 'Bharatpur & Deeg',
      state: 'Rajasthan',
      coords: [27.4722, 77.3242],
      monuments: 'Deeg Water Palaces (Jal Mahal), Lohagarh Iron Fort',
      schedule: {
        morning: '08:30 AM: Explore the 2,000 water fountains of Maharaja Suraj Mal\'s palace.',
        afternoon: '01:30 PM: Lohagarh Fort—the legendary fort British cannons could not pierce.',
        evening: '05:00 PM: Sunset bird watching at Keoladeo National Park (UNESCO).'
      },
      transit: 'Interstate Road Journey (45 km from Mathura)',
      cuisine: 'Rajasthani Kachori & Malpua',
      budget: '₹1,400 – ₹2,600 / day',
      asiInfo: 'ASI Protected Palaces • AMASR Act'
    },

    // Circuit 2: Days 9-17 (Rajasthan)
    {
      day: 9,
      circuitId: 'c2',
      title: 'The Pink City: Royal Astronomical Observatories',
      city: 'Jaipur',
      state: 'Rajasthan',
      coords: [26.9239, 75.8267],
      monuments: 'Hawa Mahal (Palace of Winds), Jantar Mantar, City Palace',
      schedule: {
        morning: '08:00 AM: Photograph Hawa Mahal\'s 953 honeycomb jharokha windows.',
        afternoon: '11:30 AM: Jantar Mantar—see the world\'s largest stone sundial tell time to 2 seconds.',
        evening: '04:30 PM: Royal costumes & weapon galleries in City Palace.'
      },
      transit: 'Vande Bharat Express (Delhi to Jaipur - 3.5 hrs)',
      cuisine: 'Pyaaz Kachori & Ghevar',
      budget: '₹2,000 – ₹4,000 / day',
      asiInfo: 'UNESCO World Heritage City (2019)'
    },
    {
      day: 10,
      circuitId: 'c2',
      title: 'Golden Hill Bastions: Amer & Jaigarh',
      city: 'Amer, Jaipur',
      state: 'Rajasthan',
      coords: [26.9855, 75.8513],
      monuments: 'Amer Fort, Sheesh Mahal, Jaigarh (Jaivana Cannon)',
      schedule: {
        morning: '08:00 AM: Ascend the cobbled ramparts of Amer Fort into mirror-tiled Sheesh Mahal.',
        afternoon: '01:00 PM: Jaigarh Fort subterranean water reserves & world\'s largest wheeled cannon.',
        evening: '05:30 PM: Nahargarh Fort sunset view across the entire pink city valley.'
      },
      transit: 'Vintage Jeep / Auto Rickshaw',
      cuisine: 'Daal Baati Churma with pure desi ghee',
      budget: '₹2,200 – ₹4,200 / day',
      asiInfo: 'Hill Forts of Rajasthan (UNESCO World Heritage)'
    },
    {
      day: 11,
      circuitId: 'c2',
      title: 'The Blue City: Mighty Mehrangarh Bastion',
      city: 'Jodhpur',
      state: 'Rajasthan',
      coords: [26.2980, 73.0188],
      monuments: 'Mehrangarh Fort, Jaswant Thada, Blue City Alleys',
      schedule: {
        morning: '08:30 AM: Scale the sheer 400-foot clifftop fortress of Rao Jodha.',
        afternoon: '01:30 PM: Jaswant Thada marble cenotaphs that glow translucent in the sun.',
        evening: '05:00 PM: Indigo blue alleyway heritage walk around Navchokiya.'
      },
      transit: 'Intercity Superfast Rail (Jaipur to Jodhpur - 4.5 hrs)',
      cuisine: 'Mirchi Bada, Mawa Kachori & Shahi Samosa',
      budget: '₹1,800 – ₹3,500 / day',
      asiInfo: 'ASI & Mehrangarh Museum Trust Protected'
    },
    {
      day: 12,
      circuitId: 'c2',
      title: 'Cenotaphs of the Marwar Kings & Mandore Gardens',
      city: 'Mandore, Jodhpur',
      state: 'Rajasthan',
      coords: [26.3570, 73.0416],
      monuments: 'Mandore Garden Chhatris, Hall of Heroes, Umaid Bhawan Palace',
      schedule: {
        morning: '09:00 AM: High-spired rock temples and devals of Marwar rulers.',
        afternoon: '01:30 PM: Umaid Bhawan Palace Art Deco museum.',
        evening: '05:30 PM: Clock Tower Sardar Market spices and antique brass hunting.'
      },
      transit: 'Local Taxi or Tuk-Tuk',
      cuisine: 'Gatte ki Sabzi & Bajre ki Roti with garlic chutney',
      budget: '₹1,500 – ₹3,000 / day',
      asiInfo: 'State Archaeology Department Protected'
    },
    {
      day: 13,
      circuitId: 'c2',
      title: 'Sonar Qila: The Living Golden Fort',
      city: 'Jaisalmer',
      state: 'Rajasthan',
      coords: [26.9124, 70.9126],
      monuments: 'Jaisalmer Fort, Patwon ki Haveli, Salim Singh Haveli',
      schedule: {
        morning: '08:00 AM: Walk through the yellow sandstone fortress where 4,000 citizens still reside.',
        afternoon: '12:30 PM: Five-story Patwon ki Haveli with filigree lace-like stone balconies.',
        evening: '05:00 PM: Sunset from Cannon Point overlooking the Thar Desert.'
      },
      transit: 'Desert Express Train (Jodhpur to Jaisalmer - 5 hrs)',
      cuisine: 'Ker Sangri & Ghotua Laddoo',
      budget: '₹2,000 – ₹3,800 / day',
      asiInfo: 'Hill Forts of Rajasthan (UNESCO World Heritage)'
    },
    {
      day: 14,
      circuitId: 'c2',
      title: 'Jain Temples & Sand Dune Folklore',
      city: 'Sam & Kuldhara',
      state: 'Rajasthan',
      coords: [26.8687, 70.5284],
      monuments: 'Jaisalmer Fort Jain Temples, Kuldhara Abandoned Village, Sam Dunes',
      schedule: {
        morning: '08:30 AM: Intricate 12th-century Dilwara-style Jain temples inside the fort.',
        afternoon: '02:00 PM: Explore Kuldhara—the mysterious 200-year abandoned Paliwal Brahmin village.',
        evening: '05:30 PM: Sunset dunes with Manganiyar folk musicians and sarangi melodies.'
      },
      transit: 'Desert Safari Jeep',
      cuisine: 'Campfire Laal Maas or Rajasthani Thali',
      budget: '₹2,500 – ₹5,000 / day',
      asiInfo: 'ASI Protected Monument (Kuldhara)'
    },
    {
      day: 15,
      circuitId: 'c2',
      title: 'The Great Wall of India: Kumbhalgarh Fort',
      city: 'Kumbhalgarh',
      state: 'Rajasthan',
      coords: [25.1479, 73.5873],
      monuments: 'Kumbhalgarh Fort, Badal Mahal (Palace of Clouds)',
      schedule: {
        morning: '09:00 AM: Hike the 36-km fortified wall—the second longest in the world.',
        afternoon: '01:30 PM: Badal Mahal birthplace of the warrior king Maharana Pratap.',
        evening: '06:30 PM: Sound and light show narrating Mewar\'s legendary defiance.'
      },
      transit: 'Scenic Aravalli Mountain Drive',
      cuisine: 'Raab & Makki Dhokla',
      budget: '₹2,000 – ₹3,500 / day',
      asiInfo: 'Hill Forts of Rajasthan (UNESCO World Heritage)'
    },
    {
      day: 16,
      circuitId: 'c2',
      title: 'City of Lakes: Mewar’s Water Palaces',
      city: 'Udaipur',
      state: 'Rajasthan',
      coords: [24.5764, 73.6835],
      monuments: 'City Palace Udaipur, Jag Mandir, Lake Pichola, Saheliyon ki Bari',
      schedule: {
        morning: '08:30 AM: Marble balconies and peacock mosaic courtyards of City Palace.',
        afternoon: '01:00 PM: Saheliyon ki Bari historic fountains designed for royal maidens.',
        evening: '05:30 PM: Sunset boat ride on Lake Pichola past Lake Palace and Jag Mandir.'
      },
      transit: 'Highway Road Trip (85 km from Kumbhalgarh)',
      cuisine: 'Udaipuri Kachori & Mewari Thali',
      budget: '₹2,500 – ₹5,500 / day',
      asiInfo: 'Mewar Heritage Trust & State Protected'
    },
    {
      day: 17,
      circuitId: 'c2',
      title: 'Tower of Victory: The Citadel of Chittorgarh',
      city: 'Chittorgarh',
      state: 'Rajasthan',
      coords: [24.8879, 74.6453],
      monuments: 'Chittorgarh Fort, Vijay Stambh, Kirti Stambh, Padmini Palace',
      schedule: {
        morning: '08:00 AM: Climb the 9-story 37m Vijay Stambh carved with Hindu deities.',
        afternoon: '12:30 PM: Padmini Palace water pavilion and Gaumukh Kund water reservoir.',
        evening: '04:30 PM: Solemn historical walk through the Jauhar grounds of Rajput valor.'
      },
      transit: 'Train or Highway Drive (110 km from Udaipur)',
      cuisine: 'Khatta Meetha Aloo & Sev Tamatar Sabzi',
      budget: '₹1,600 – ₹3,000 / day',
      asiInfo: 'Hill Forts of Rajasthan (UNESCO World Heritage)'
    },

    // Circuit 3: Days 18-25 (Varanasi & Bihar)
    {
      day: 18,
      circuitId: 'c3',
      title: 'Oldest Living City: The Ghats of Kashi',
      city: 'Varanasi',
      state: 'Uttar Pradesh',
      coords: [25.3176, 83.0062],
      monuments: 'Dashashwamedh Ghat, Manikarnika Ghat, Assi Ghat',
      schedule: {
        morning: '05:30 AM: Dawn rowing boat across the 84 stone ghats of River Ganga.',
        afternoon: '12:00 PM: Narrow labyrinth alleys of Vishwanath Gali and silk weaving looms.',
        evening: '06:45 PM: Spectacular Grand Ganga Aarti with multi-tiered brass oil lamps.'
      },
      transit: 'Vande Bharat Express (Delhi/Agra to Varanasi)',
      cuisine: 'Banarasi Tamatar Chaat, Malaiyyo & Banarasi Paan',
      budget: '₹1,500 – ₹3,200 / day',
      asiInfo: 'National Cultural Heritage District'
    },
    {
      day: 19,
      circuitId: 'c3',
      title: 'The Golden Spire of Vishweshwara',
      city: 'Varanasi',
      state: 'Uttar Pradesh',
      coords: [25.3109, 83.0107],
      monuments: 'Kashi Vishwanath Temple, Annapurna Temple, Bharat Kala Bhavan',
      schedule: {
        morning: '06:30 AM: Darshan of the Jyotirlinga through the newly sculpted Heritage Corridor.',
        afternoon: '01:30 PM: BHU Bharat Kala Bhavan collection of Gupta and Chola bronze sculptures.',
        evening: '05:30 PM: Classical sitar and tabla recital at Dhrupad Sansthan on Assi Ghat.'
      },
      transit: 'Walking & E-Rickshaw',
      cuisine: 'Kachori Jalebi breakfast & Thandai with dry fruits',
      budget: '₹1,200 – ₹2,500 / day',
      asiInfo: 'Ministry of Culture & Temple Trust'
    },
    {
      day: 20,
      circuitId: 'c3',
      title: 'Where the Wheel Turned: Sarnath Deer Park',
      city: 'Sarnath',
      state: 'Uttar Pradesh',
      coords: [25.3811, 83.0214],
      monuments: 'Dhamek Stupa, Ashoka Lion Capital (National Emblem), Sarnath Archaeological Museum',
      schedule: {
        morning: '08:30 AM: Circumbulate the 43.6m cylindrical stone Dhamek Stupa (Dhammacakkappavattana).',
        afternoon: '11:30 AM: Stand before the polished original 3rd-century BCE Ashokan Lion Capital.',
        evening: '04:30 PM: Mulagandhakuti Vihara Japanese murals depicting Lord Buddha\'s life.'
      },
      transit: 'City Cab (10 km from Varanasi)',
      cuisine: 'Satvik Thali & Chena sweets',
      budget: '₹1,200 – ₹2,200 / day',
      asiInfo: 'ASI Flagship Museum & Site • Patna Circle'
    },
    {
      day: 21,
      circuitId: 'c3',
      title: 'Under the Bodhi Tree: The Great Awakening',
      city: 'Bodh Gaya',
      state: 'Bihar',
      coords: [24.6961, 84.9913],
      monuments: 'Mahabodhi Temple Complex, Sacred Bodhi Tree, Vajrasana (Diamond Throne)',
      schedule: {
        morning: '06:00 AM: Meditation under the direct descendant of the sacred Bodhi Tree.',
        afternoon: '01:00 PM: Monolithic sandstone Vajrasana installed by Emperor Ashoka.',
        evening: '05:30 PM: Monasteries of Tibet, Bhutan, Thailand and Japan scattered around Bodh Gaya.'
      },
      transit: 'Express Train from Varanasi to Gaya (3.5 hrs)',
      cuisine: 'Gaya Tilkut & Litti Chokha',
      budget: '₹1,400 – ₹2,800 / day',
      asiInfo: 'UNESCO World Heritage Site (2002)'
    },
    {
      day: 22,
      circuitId: 'c3',
      title: 'The World’s First Residential University',
      city: 'Nalanda',
      state: 'Bihar',
      coords: [25.1357, 85.4437],
      monuments: 'Ruins of Nalanda Mahavihara, Sariputta Stupa, Nalanda Archaeological Museum',
      schedule: {
        morning: '09:00 AM: Walk the red-brick classrooms where 10,000 monks studied under Nagarjuna & Aryabhata.',
        afternoon: '01:00 PM: Multi-layered Sariputta Stupa with stucco images of Buddha.',
        evening: '04:30 PM: Xuanzang Memorial Hall dedicated to the 7th-century Chinese traveler.'
      },
      transit: 'Road Drive from Bodh Gaya (75 km)',
      cuisine: 'Silao Ka Khaja (GI Tagged puff pastry)',
      budget: '₹1,200 – ₹2,400 / day',
      asiInfo: 'UNESCO World Heritage Site (2016)'
    },
    {
      day: 23,
      circuitId: 'c3',
      title: 'The Valley of Kings: Rajgir Cyclopean Walls',
      city: 'Rajgir',
      state: 'Bihar',
      coords: [25.0298, 85.4216],
      monuments: 'Griddhakuta (Vulture’s Peak), Cyclopean Wall (40km), Vishwa Shanti Stupa, Bimbisara Jail',
      schedule: {
        morning: '07:30 AM: Ropeway chairlift to the brilliant white Vishwa Shanti Stupa.',
        afternoon: '12:00 PM: Ancient stone-masonry Cyclopean wall built before the Mauryan empire.',
        evening: '04:30 PM: Venuvana bamboo grove donated to Buddha by King Bimbisara.'
      },
      transit: 'Short Transit (15 km from Nalanda)',
      cuisine: 'Sattu Paratha & Balushahi',
      budget: '₹1,000 – ₹2,000 / day',
      asiInfo: 'ASI Protected Monument • AMASR Act'
    },
    {
      day: 24,
      circuitId: 'c3',
      title: 'Ancient Pataliputra: Ashoka’s Pillars & Kumhrar',
      city: 'Patna',
      state: 'Bihar',
      coords: [25.5941, 85.1376],
      monuments: 'Kumhrar 80-Pillared Mauryan Hall, Golghar, Patna Museum (Didarganj Yakshi)',
      schedule: {
        morning: '09:00 AM: Archaeological excavations of Pataliputra\'s Mauryan assembly hall.',
        afternoon: '01:30 PM: Patna Museum to witness the mirror-polished sandstone Didarganj Yakshi (3rd c. BCE).',
        evening: '05:30 PM: Ascend the beehive-shaped Golghar granary for views of the Ganga.'
      },
      transit: 'Intercity Train from Rajgir to Patna (2.5 hrs)',
      cuisine: 'Litti Chokha with smoked sattu & mustard oil',
      budget: '₹1,400 – ₹2,600 / day',
      asiInfo: 'ASI Patna Circle Protected'
    },
    {
      day: 25,
      circuitId: 'c3',
      title: 'Stupa of the Buddha’s Ashes: Vaishali',
      city: 'Vaishali',
      state: 'Bihar',
      coords: [25.9863, 85.1278],
      monuments: 'Ashokan Pillar with Lion Capital, Buddha Relic Stupa, Abhishek Pushkarini',
      schedule: {
        morning: '08:30 AM: Intact single monolithic sandstone Ashokan column beside the brick stupa.',
        afternoon: '01:00 PM: The coronation tank (Abhishek Pushkarini) of the Lichchhavi Republic—world\'s first republic.',
        evening: '04:30 PM: Archaeological museum housing the sacred bone relic casket.'
      },
      transit: 'Highway Drive from Patna across Mahatma Gandhi Setu (55 km)',
      cuisine: 'Vaishali pedas & fresh sugarcane juice',
      budget: '₹1,100 – ₹2,000 / day',
      asiInfo: 'ASI Protected Site • Patna Circle'
    },

    // Circuit 4: Days 26-34 (East & Northeast)
    {
      day: 26,
      circuitId: 'c4',
      title: 'City of Joy: British Raj Marble & Renaissance',
      city: 'Kolkata',
      state: 'West Bengal',
      coords: [22.5448, 88.3426],
      monuments: 'Victoria Memorial, St. Paul’s Cathedral, Indian Museum, Howrah Bridge',
      schedule: {
        morning: '08:30 AM: White Makrana marble architecture of Victoria Memorial.',
        afternoon: '01:00 PM: Indian Museum (founded 1814)—oldest and largest museum in Asia.',
        evening: '05:30 PM: Sunset ferry ride under the cantilever Howrah Bridge on the Hooghly.'
      },
      transit: 'Vande Bharat Express (Patna to Howrah - 6.5 hrs)',
      cuisine: 'Kathi Roll, Rosogolla & Mishti Doi',
      budget: '₹1,800 – ₹3,500 / day',
      asiInfo: 'ASI Kolkata Circle & National Trust'
    },
    {
      day: 27,
      circuitId: 'c4',
      title: 'The Terracotta Temples of Bishnupur',
      city: 'Bishnupur',
      state: 'West Bengal',
      coords: [23.0763, 87.3197],
      monuments: 'Rasmancha, Jor Bangla Temple, Shyamrai Temple',
      schedule: {
        morning: '08:30 AM: Pyramidal tower of Rasmancha built by Malla King Bir Hambir (1600 CE).',
        afternoon: '01:00 PM: Jor Bangla curved-roof Bengali chala terracotta relief panels depicting Mahabharata.',
        evening: '04:30 PM: Baluchari silk saree weaving atelier walk.'
      },
      transit: 'Rupashi Bangla Express from Howrah (3 hrs)',
      cuisine: 'Posto Bora (Poppy seed fritters) & Mecha Sandesh',
      budget: '₹1,300 – ₹2,400 / day',
      asiInfo: 'ASI Protected Terracotta Complex • Kolkata Circle'
    },
    {
      day: 28,
      circuitId: 'c4',
      title: 'The Black Pagoda: Konark Sun Temple',
      city: 'Konark',
      state: 'Odisha',
      coords: [19.8876, 86.0945],
      monuments: 'Sun Temple Konark, Natya Mandap, Chandrabhaga Beach',
      schedule: {
        morning: '06:00 AM: Golden hour sun rays hitting the 24 massive stone wheels of the Sun God\'s chariot.',
        afternoon: '11:30 AM: Study the astronomical sundial wheels that calculate time to minutes.',
        evening: '05:00 PM: Coastal sea breeze at Chandrabhaga beach.'
      },
      transit: 'Howrah-Puri Vande Bharat Express to Bhubaneswar/Puri + coastal cab',
      cuisine: 'Chhena Poda (Caramelized cheese cake) & Dalma',
      budget: '₹1,600 – ₹3,200 / day',
      asiInfo: 'UNESCO World Heritage Site (1984)'
    },
    {
      day: 29,
      circuitId: 'c4',
      title: 'Spiritual Seat of the Lord: Jagannath Puri',
      city: 'Puri',
      state: 'Odisha',
      coords: [19.8049, 85.8179],
      monuments: 'Jagannath Temple (Grand Road & Lion Gate), Gundicha Temple',
      schedule: {
        morning: '06:30 AM: Badadanda (Grand Road) walk to witness the hoisting of the Patitapabana flag.',
        afternoon: '01:00 PM: Experience the Mahaprasad (56 Bhog) cooked in earthern pots over firewood.',
        evening: '05:30 PM: Raghurajpur heritage crafts village (Pattachitra paintings and palm-leaf manuscripts).'
      },
      transit: 'Marine Drive Highway (35 km from Konark)',
      cuisine: 'Abadha Mahaprasad & Khaja',
      budget: '₹1,200 – ₹2,500 / day',
      asiInfo: 'ASI Protected Monument • Bhubaneswar Circle'
    },
    {
      day: 30,
      circuitId: 'c4',
      title: 'City of Temples: Bhubaneswar Kalinga Architecture',
      city: 'Bhubaneswar',
      state: 'Odisha',
      coords: [20.2382, 85.8336],
      monuments: 'Lingaraj Temple, Mukteshvara Temple, Rajarani Temple',
      schedule: {
        morning: '08:00 AM: Gem of Odishan architecture: the torana archway of Mukteshvara Temple.',
        afternoon: '01:00 PM: Warm yellow sandstone erotic and musical sculptures of Rajarani Temple.',
        evening: '05:00 PM: Bindu Sagar sacred lake and ancient water stepwells.'
      },
      transit: 'Intercity Train or Cab (60 km from Puri)',
      cuisine: 'Cuttack Dahi Bara Aloo Dum',
      budget: '₹1,400 – ₹2,600 / day',
      asiInfo: 'ASI Protected National Monument'
    },
    {
      day: 31,
      circuitId: 'c4',
      title: 'Rock-Cut Jaina Caves of Udayagiri & Khandagiri',
      city: 'Bhubaneswar',
      state: 'Odisha',
      coords: [20.2631, 85.7863],
      monuments: 'Hathigumpha (Elephant Cave), Rani Gumpha (Queen’s Cave)',
      schedule: {
        morning: '08:30 AM: 2nd-century BCE Hathigumpha Brahmi inscription of Emperor Kharavela.',
        afternoon: '12:30 PM: Two-storeyed Rani Gumpha royal theatrical courtyards.',
        evening: '05:00 PM: Dhauli Shanti Stupa—where Emperor Ashoka renounced war after the Kalinga war.'
      },
      transit: 'City Auto Rickshaw',
      cuisine: 'Macha Ghanta & Rasabali',
      budget: '₹1,100 – ₹2,200 / day',
      asiInfo: 'ASI Protected Rock Caves'
    },
    {
      day: 32,
      circuitId: 'c4',
      title: 'The Great Brahmaputra River Island: Majuli',
      city: 'Majuli',
      state: 'Assam',
      coords: [26.9536, 94.2045],
      monuments: 'Auniati Satra, Kamalabari Satra, Samaguri Satra (Traditional Mask Making)',
      schedule: {
        morning: '07:30 AM: Roar across the mighty Brahmaputra river on a local wooden ferry.',
        afternoon: '01:00 PM: Watch bamboo and clay mask artisans at Samaguri Satra.',
        evening: '05:30 PM: Gayan-Bayan devotional cymbal-and-drum performance at Kamalabari.'
      },
      transit: 'Ferry from Nimati Ghat, Jorhat',
      cuisine: 'Assamese Thali with Joha rice, fish tenga & pitha',
      budget: '₹1,500 – ₹2,800 / day',
      asiInfo: 'Proposed UNESCO Cultural Island Sanctuary'
    },
    {
      day: 33,
      circuitId: 'c4',
      title: 'Ahom Dynasty Royal Amphitheatres & Temples',
      city: 'Sivasagar',
      state: 'Assam',
      coords: [26.9844, 94.6417],
      monuments: 'Rang Ghar (Royal Pavilion), Talatal Ghar, Sivadol Temple',
      schedule: {
        morning: '08:30 AM: Rang Ghar—Asia\'s oldest surviving sports and cultural amphitheatre (1746 CE).',
        afternoon: '01:00 PM: Seven-story underground labyrinth palace of Talatal Ghar.',
        evening: '04:30 PM: Sivadol—tallest Shiva temple tower in India on the Sivasagar tank.'
      },
      transit: 'Road Journey from Jorhat (55 km)',
      cuisine: 'Duck with white gourd & Khar',
      budget: '₹1,200 – ₹2,200 / day',
      asiInfo: 'ASI Guwahati Circle Protected'
    },
    {
      day: 34,
      circuitId: 'c4',
      title: 'Living Architecture: The Living Root Bridges',
      city: 'Cherrapunji (Sohra)',
      state: 'Meghalaya',
      coords: [25.2702, 91.7323],
      monuments: 'Nongriat Double Decker Living Root Bridge, Nohkalikai Falls',
      schedule: {
        morning: '07:00 AM: Trek through misty rainforests and bamboo groves down the 3,000 stone steps.',
        afternoon: '11:30 AM: Marvel at the biomorphic genius of Khasi tribal root engineers.',
        evening: '05:00 PM: Watch the 340m roaring plunge of Nohkalikai Falls at sunset.'
      },
      transit: 'Mountain SUV from Shillong / Guwahati',
      cuisine: 'Jadoh (Rice cooked with herbs) & Dohneiiong',
      budget: '₹2,000 – ₹4,000 / day',
      asiInfo: 'UNESCO Tentative List Living Heritage'
    },

    // Circuit 5: Days 35-42 (Central Heartlands)
    {
      day: 35,
      circuitId: 'c5',
      title: 'Nagara Symphony in Stone: Western Temples of Khajuraho',
      city: 'Khajuraho',
      state: 'Madhya Pradesh',
      coords: [24.8318, 79.9199],
      monuments: 'Kandariya Mahadeva Temple, Lakshmana Temple, Matangeshvara',
      schedule: {
        morning: '07:30 AM: Kandariya Mahadeva—the zenith of Chandela sandstone temple architecture.',
        afternoon: '01:00 PM: Lakshmana Temple base panels depicting battles, musicians, and everyday joy.',
        evening: '06:30 PM: Light & Sound show narrated in the voice of the temples.'
      },
      transit: 'Vande Bharat Express (Bhopal/Delhi to Khajuraho)',
      cuisine: 'Bundelkhandi Kadhi & Mawa Jalebi',
      budget: '₹1,800 – ₹3,500 / day',
      asiInfo: 'UNESCO World Heritage Site (1986)'
    },
    {
      day: 36,
      circuitId: 'c5',
      title: 'Eastern Temples & Medieval Bundela Palaces',
      city: 'Khajuraho & Orchha',
      state: 'Madhya Pradesh',
      coords: [25.3516, 78.6425],
      monuments: 'Jain Temples (Parshvanatha), Orchha Fort Complex, Jahangir Mahal',
      schedule: {
        morning: '08:30 AM: Parshvanatha Temple with delicate stone sculptures of maidens.',
        afternoon: '02:00 PM: Transit to medieval Orchha along the Betwa river.',
        evening: '05:30 PM: Multi-tiered balconies of Jahangir Mahal blending Bundela and Mughal styles.'
      },
      transit: 'Highway Road Trip (170 km via Jhansi)',
      cuisine: 'Bundelkhandi Thali & Thaggu ke Laddu',
      budget: '₹1,600 – ₹3,200 / day',
      asiInfo: 'ASI & MP State Tourism Heritage Site'
    },
    {
      day: 37,
      circuitId: 'c5',
      title: 'The Lord is King: Ram Raja Temple & Chhatris',
      city: 'Orchha',
      state: 'Madhya Pradesh',
      coords: [25.3506, 78.6433],
      monuments: 'Ram Raja Temple (Guard of Honour), Chaturbhuj Temple, Betwa Chhatris',
      schedule: {
        morning: '08:00 AM: Ram Raja Temple—the only shrine where Lord Ram is worshipped as a reigning King with a police guard of honour.',
        afternoon: '01:30 PM: Climb the soaring spires of Chaturbhuj Temple.',
        evening: '05:30 PM: Sunset reflections of 14 royal cenotaphs across the Betwa River boulders.'
      },
      transit: 'Local Walk & Heritage E-Rickshaw',
      cuisine: 'Bhutte Ka Kees & Poha',
      budget: '₹1,200 – ₹2,400 / day',
      asiInfo: 'Proposed UNESCO Heritage Enclave'
    },
    {
      day: 38,
      circuitId: 'c5',
      title: 'The Great Stupa of Sanchi: Emperor Ashoka’s Gateway',
      city: 'Sanchi',
      state: 'Madhya Pradesh',
      coords: [23.4795, 77.7397],
      monuments: 'Great Stupa 1, Toranas (Four Carved Gateways), Stupa 3, Ashoka Pillar',
      schedule: {
        morning: '08:30 AM: Marvel at the 4 intricately carved stone torana gateways illustrating Jataka tales.',
        afternoon: '01:00 PM: Walk around the 3rd-century BCE hemispherical stone dome.',
        evening: '04:30 PM: Sanchi Archaeological Museum collection of polished sandstone artefacts.'
      },
      transit: 'Train from Jhansi to Bhopal / Sanchi (2.5 hrs)',
      cuisine: 'Indori Poha Jalebi & Dal Bafla',
      budget: '₹1,400 – ₹2,800 / day',
      asiInfo: 'UNESCO World Heritage Site (1989)'
    },
    {
      day: 39,
      circuitId: 'c5',
      title: 'Dawn of Human Art: Bhimbetka Rock Shelters',
      city: 'Bhimbetka',
      state: 'Madhya Pradesh',
      coords: [22.9372, 77.6128],
      monuments: 'Auditorium Cave, Zoo Rock, Paleolithic Rock Shelters',
      schedule: {
        morning: '09:00 AM: Walk through sandstone crags where human ancestors lived 100,000 years ago.',
        afternoon: '01:00 PM: Zoo Rock—view 30,000-year-old red and white mineral pigments depicting bison, tigers, and hunters.',
        evening: '04:30 PM: Bhojpur Shiva Temple housing the massive 7.5ft single-stone rock lingam.'
      },
      transit: 'Highway Drive from Bhopal (45 km)',
      cuisine: 'Sev Tamatar & Jowar Roti',
      budget: '₹1,200 – ₹2,400 / day',
      asiInfo: 'UNESCO World Heritage Site (2003)'
    },
    {
      day: 40,
      circuitId: 'c5',
      title: 'The City of Joy & Eternal Love: Mandu',
      city: 'Mandu',
      state: 'Madhya Pradesh',
      coords: [22.3662, 75.3424],
      monuments: 'Jahaz Mahal (Ship Palace), Hindola Mahal, Baz Bahadur Palace, Rani Roopmati Pavilion',
      schedule: {
        morning: '08:30 AM: Jahaz Mahal—a floating palace perched between two artificial lakes.',
        afternoon: '01:00 PM: 77-degree slanted acoustic walls of Hindola Mahal (Swinging Palace).',
        evening: '05:30 PM: Sunset from Roopmati\'s Pavilion overlooking the sacred Narmada valley.'
      },
      transit: 'Scenic Drive via Indore (95 km)',
      cuisine: 'Indori Garadu & Mandu Baobab fruit juice',
      budget: '₹1,600 – ₹3,200 / day',
      asiInfo: 'ASI Bhopal Circle Protected'
    },
    {
      day: 41,
      circuitId: 'c5',
      title: 'Holy Narmada Ghats & Ahilyabai’s Fortress',
      city: 'Maheshwar',
      state: 'Madhya Pradesh',
      coords: [22.1764, 75.5843],
      monuments: 'Ahilya Fort, Maheshwar Ghats, Narmada River Boating, Maheshwari Saree Looms',
      schedule: {
        morning: '07:00 AM: Peaceful morning bath and prayer along the stone ghats of Queen Ahilyabai Holkar.',
        afternoon: '12:30 PM: Royal Rajwada fort palace museum and weapons gallery.',
        evening: '04:30 PM: Rehwa Society handloom workshop creating world-famous Maheshwari silks.'
      },
      transit: 'Highway Road Trip (40 km from Mandu)',
      cuisine: 'Poha with spicy Indori Sev & Chhena Malpua',
      budget: '₹1,400 – ₹2,800 / day',
      asiInfo: 'Heritage Town Protected Reserve'
    },
    {
      day: 42,
      circuitId: 'c5',
      title: 'City of Mahakal & Time: Ujjain Avantika',
      city: 'Ujjain',
      state: 'Madhya Pradesh',
      coords: [23.1827, 75.7682],
      monuments: 'Mahakaleshwar Jyotirlinga (Bhasma Aarti), Vedh Shala Observatory, Kal Bhairav Temple',
      schedule: {
        morning: '04:00 AM: Sacred early morning Bhasma Aarti at Mahakaleshwar Temple.',
        afternoon: '01:00 PM: 18th-century Vedh Shala (Jantar Mantar) built by Sawai Jai Singh on the Tropic of Cancer.',
        evening: '06:00 PM: Sunset Aarti at Ram Ghat on the sacred Shipra River.'
      },
      transit: 'Highway Drive or Train (130 km from Maheshwar)',
      cuisine: 'Ujjaini Dal Bafla with Churma',
      budget: '₹1,200 – ₹2,400 / day',
      asiInfo: 'Ancient Hindu Cultural Capital'
    },

    // Circuit 6: Days 43-50 (Maharashtra)
    {
      day: 43,
      circuitId: 'c6',
      title: 'Masterpiece of Buddhist Frescoes: Ajanta Caves',
      city: 'Aurangabad / Chhatrapati Sambhajinagar',
      state: 'Maharashtra',
      coords: [20.5519, 75.7033],
      monuments: 'Ajanta Caves 1, 2, 19, 26 (Padmapani Bodhisattva & Reclining Buddha)',
      schedule: {
        morning: '08:30 AM: Enter Cave 1 to see the world-famous Padmapani and Vajrapani painted murals.',
        afternoon: '01:00 PM: Cave 19 rock-cut Chaitya horseshoe window and ribbed barrel vaulted ceiling.',
        evening: '04:30 PM: View the 7-meter colossal Reclining Buddha entering Parinirvana in Cave 26.'
      },
      transit: 'Vande Bharat / Express Train to Aurangabad + Eco Shuttle Bus',
      cuisine: 'Naan Qalia (Heritage spiced mutton with tandoori naan) or Shev Bhaji',
      budget: '₹2,000 – ₹4,000 / day',
      asiInfo: 'UNESCO World Heritage Site (1983)'
    },
    {
      day: 44,
      circuitId: 'c6',
      title: 'Monolithic Miracle: Kailasa Temple at Ellora',
      city: 'Ellora',
      state: 'Maharashtra',
      coords: [20.0268, 75.1793],
      monuments: 'Ellora Cave 16 (Kailasa Temple), Jain Caves (Indra Sabha)',
      schedule: {
        morning: '08:30 AM: Stand inside the single largest monolithic rock excavation in the world—carved top-down from 200,000 tons of basalt rock by Rashtrakuta King Krishna I.',
        afternoon: '01:30 PM: Buddhist Carpenter’s Cave (Visvakarma Cave 10) acoustic hall.',
        evening: '05:00 PM: Two-storeyed Indra Sabha Jain rock carvings (Caves 32-34).'
      },
      transit: 'Local Cab (30 km from Aurangabad)',
      cuisine: 'Pithla Bhakri with Thecha & Solkadhi',
      budget: '₹1,600 – ₹3,200 / day',
      asiInfo: 'UNESCO World Heritage Site (1983)'
    },
    {
      day: 45,
      circuitId: 'c6',
      title: 'The Unconquerable Citadels: Daulatabad & Bibi Ka Maqbara',
      city: 'Aurangabad',
      state: 'Maharashtra',
      coords: [19.9431, 75.2133],
      monuments: 'Devagiri / Daulatabad Fort, Chand Minar, Bibi Ka Maqbara (Dakkani Taj)',
      schedule: {
        morning: '08:30 AM: Traverse the pitch-dark booby-trapped labyrinth (Andhari) of Daulatabad Fort.',
        afternoon: '01:30 PM: Chand Minar 63m victory tower and subterranean moat.',
        evening: '05:00 PM: Bibi Ka Maqbara—Azam Shah\'s 1668 marble tribute to his mother Dilras Banu Begum.'
      },
      transit: 'Local Taxi',
      cuisine: 'Jowar Bhakri & Mango Kulfi',
      budget: '₹1,400 – ₹2,600 / day',
      asiInfo: 'ASI Aurangabad Circle Protected'
    },
    {
      day: 46,
      circuitId: 'c6',
      title: 'Seat of the Peshwas: Shaniwarwada & Sinhagad',
      city: 'Pune',
      state: 'Maharashtra',
      coords: [18.5196, 73.8553],
      monuments: 'Shaniwarwada Fort, Dilli Darwaza, Lal Mahal, Sinhagad Clifftop Bastion',
      schedule: {
        morning: '08:30 AM: Iron-spiked elephant gates and stone foundations of Peshwa Bajirao I\'s palace.',
        afternoon: '01:30 PM: Drive up the mist-covered Sahyadri plateau to Sinhagad (Lion Fort).',
        evening: '05:30 PM: Walk where Tanaji Malusare led the historic battle of 1670.'
      },
      transit: 'Intercity Train / Highway Expressway from Aurangabad (4 hrs)',
      cuisine: 'Puneri Misal Pav, Kanda Bhaji & Mastani ice cream drink',
      budget: '₹1,500 – ₹3,000 / day',
      asiInfo: 'ASI Pune Circle Protected'
    },
    {
      day: 47,
      circuitId: 'c6',
      title: 'Capital of the Maratha Empire: Raigad Fort',
      city: 'Raigad',
      state: 'Maharashtra',
      coords: [18.2346, 73.4444],
      monuments: 'Raigad Fort, Shivaji Maharaj Samadhi, Maha Darwaja, Takmak Tok',
      schedule: {
        morning: '08:00 AM: Ascend the dramatic Sahyadri mountain bastion via cable car or 1,737 stone steps.',
        afternoon: '12:00 PM: Stand in the royal court (Raj Sabha) where Chhatrapati Shivaji Maharaj was crowned in 1674.',
        evening: '04:30 PM: The thrilling clifftop edge of Takmak Tok overlooking Sahyadri valleys.'
      },
      transit: 'Mountain SUV from Pune (130 km)',
      cuisine: 'Zunka Bhakri & Kokani fish curry',
      budget: '₹1,800 – ₹3,500 / day',
      asiInfo: 'ASI Protected Monument of National Importance'
    },
    {
      day: 48,
      circuitId: 'c6',
      title: 'The Great Trimurti: Elephanta Island Rock Caves',
      city: 'Gharapuri / Mumbai',
      state: 'Maharashtra',
      coords: [18.9633, 72.9315],
      monuments: 'Elephanta Cave 1, Sadashiva Trimurti (Creator, Preserver, Destroyer)',
      schedule: {
        morning: '08:30 AM: Scenic 1-hour harbour boat from Gateway of India to Elephanta Island.',
        afternoon: '11:30 AM: Stand before the colossal 6-metre 3-headed Trimurti Shiva sculpture (6th c. CE).',
        evening: '04:30 PM: Return boat as seagulls hover over Mumbai harbour and Taj Mahal Palace hotel.'
      },
      transit: 'Harbour Ferry from Gateway of India',
      cuisine: 'Mumbai Vada Pav, Pav Bhaji & Bun Maska Irani Chai',
      budget: '₹1,500 – ₹3,200 / day',
      asiInfo: 'UNESCO World Heritage Site (1987)'
    },
    {
      day: 49,
      circuitId: 'c6',
      title: 'Victorian Gothic & Art Deco Ensembles of Mumbai',
      city: 'South Mumbai',
      state: 'Maharashtra',
      coords: [18.9400, 72.8353],
      monuments: 'Chhatrapati Shivaji Maharaj Terminus (VT), Bombay High Court, Rajabai Clock Tower',
      schedule: {
        morning: '08:30 AM: High-Victorian Gothic spires and stone gargoyles of CSMT railway station.',
        afternoon: '01:30 PM: Heritage walking tour of Fort area, David Sassoon Library and Asiatic Society.',
        evening: '05:30 PM: Marine Drive promenade to admire the world\'s 2nd-largest Art Deco cluster.'
      },
      transit: 'Heritage Black-and-Yellow Taxi / Mumbai Local Train',
      cuisine: 'Irani Berry Pulao & Caramel Custard at Britannia & Co.',
      budget: '₹2,200 – ₹4,500 / day',
      asiInfo: 'UNESCO World Heritage Site (2018)'
    },
    {
      day: 50,
      circuitId: 'c6',
      title: 'Ancient Monastic Forest: Kanheri Caves',
      city: 'Sanjay Gandhi National Park, Mumbai',
      state: 'Maharashtra',
      coords: [19.2062, 72.9064],
      monuments: 'Kanheri Caves 3 & 34 (109 Buddhist Basalt Rock Caves)',
      schedule: {
        morning: '08:30 AM: Safari through Sanjay Gandhi National Park rainforest into the 1st-c. BCE caves.',
        afternoon: '12:30 PM: Massive 7m Standing Buddhas and ancient rock cisterns supplying drinking water.',
        evening: '04:30 PM: Forest canopy walk and leopard territory observatory.'
      },
      transit: 'Park Shuttle / Electric Bus',
      cuisine: 'Koli seafood fry & Solkadhi',
      budget: '₹1,400 – ₹2,800 / day',
      asiInfo: 'ASI Protected Monument • Mumbai Circle'
    },

    // Circuit 7: Days 51-56 (Goa & Coastal Karnataka)
    {
      day: 51,
      circuitId: 'c7',
      title: 'Rome of the East: Old Goa Churches',
      city: 'Old Goa',
      state: 'Goa',
      coords: [15.5009, 73.9116],
      monuments: 'Basilica of Bom Jesus (St. Francis Xavier Relics), Sé Cathedral',
      schedule: {
        morning: '08:30 AM: Baroque gilded woodwork of Basilica of Bom Jesus constructed in 1605.',
        afternoon: '01:00 PM: Sé Cathedral—one of the largest churches in Asia with the famous Golden Bell.',
        evening: '05:00 PM: Church of St. Francis of Assisi and archaeological museum.'
      },
      transit: 'Konkan Scenic VistaDome Train from Mumbai to Goa',
      cuisine: 'Goan Fish Curry Thali, Bebinca & Kokum soda',
      budget: '₹2,000 – ₹4,200 / day',
      asiInfo: 'UNESCO World Heritage Site (1986)'
    },
    {
      day: 52,
      circuitId: 'c7',
      title: 'Clifftop Forts & Portuguese Lighthouses',
      city: 'Sinquerim & Aguada',
      state: 'Goa',
      coords: [15.4925, 73.7738],
      monuments: 'Fort Aguada, 1864 Aguada Lighthouse, Reis Magos Fort',
      schedule: {
        morning: '08:30 AM: Walk the 17th-century Portuguese fortress water reservoir holding 2 million gallons.',
        afternoon: '01:30 PM: Reis Magos Fort cannon embrasures overlooking the Mandovi estuary.',
        evening: '05:30 PM: Sunset from Sinquerim cliff ramparts over the Arabian Sea.'
      },
      transit: 'Rented Scooter or Taxi',
      cuisine: 'Prawn Balchão & Poi bread',
      budget: '₹1,800 – ₹3,800 / day',
      asiInfo: 'ASI Goa Circle Protected'
    },
    {
      day: 53,
      circuitId: 'c7',
      title: 'Ancient Coastal Sanctum: Gokarna',
      city: 'Gokarna',
      state: 'Karnataka',
      coords: [14.5426, 74.3188],
      monuments: 'Mahabaleshwar Temple (Atmalinga), Kotitirtha Sacred Tank, Om Beach',
      schedule: {
        morning: '07:00 AM: Darshan of the 4th-century CE granite Atmalinga installed by Ravana in legend.',
        afternoon: '01:00 PM: Kotitirtha freshwater tank surrounded by red-tiled traditional priest homes.',
        evening: '05:00 PM: Cliff walk between Kudle Beach and Om Beach shaped naturally like sacred symbol ॐ.'
      },
      transit: 'Konkan Rail / Coastal Drive (140 km from Goa)',
      cuisine: 'Gokarna Gadbad ice cream & South Indian Temple Thali',
      budget: '₹1,400 – ₹2,600 / day',
      asiInfo: 'Historical Coastal Heritage Circuit'
    },
    {
      day: 54,
      circuitId: 'c7',
      title: 'The Great Colossus by the Sea: Murudeshwar',
      city: 'Murudeshwar',
      state: 'Karnataka',
      coords: [14.0941, 74.4899],
      monuments: 'Murudeshwar Shiva Statue (123ft), 20-Storey Raja Gopura, Kanduka Hill',
      schedule: {
        morning: '08:30 AM: Ride the high-speed lift up the 249-foot Raja Gopura for Arabian Sea panoramas.',
        afternoon: '01:00 PM: Walk around the 2nd tallest Shiva statue in the world set against oceanic waves.',
        evening: '05:00 PM: Netrani Island scuba diving waters view from the promontory.'
      },
      transit: 'Scenic Coastal Highway NH66 (55 km from Gokarna)',
      cuisine: 'Mangalorean Kori Rotti & Neer Dosa',
      budget: '₹1,500 – ₹2,800 / day',
      asiInfo: 'Coastal Karnataka Temple Heritage'
    },
    {
      day: 55,
      circuitId: 'c7',
      title: 'Madhvacharya’s Seat: Udupi Krishna Matha',
      city: 'Udupi',
      state: 'Karnataka',
      coords: [13.3409, 74.7421],
      monuments: 'Sri Krishna Matha, Kanakana Kindi (Silver Window), Chandramouleshwara',
      schedule: {
        morning: '07:30 AM: Gaze through the 9-hole silver Kanakana Kindi window where Lord Krishna turned around.',
        afternoon: '12:30 PM: Traditional Bhojana served on fresh banana leaves in the Anna Brahma dining hall.',
        evening: '05:00 PM: Sunset at St. Mary’s Island viewing hexagonal volcanic basalt columns.'
      },
      transit: 'Coastal Rail / Bus (100 km from Murudeshwar)',
      cuisine: 'Authentic Udupi Sambar, Mysore Pak & Filter Coffee',
      budget: '₹1,200 – ₹2,200 / day',
      asiInfo: 'Ancient Dvaita Vedanta Heritage Center'
    },
    {
      day: 56,
      circuitId: 'c7',
      title: 'The Thousand-Pillared Jain Basadi: Moodbidri',
      city: 'Moodbidri & Karkala',
      state: 'Karnataka',
      coords: [13.0722, 74.9961],
      monuments: 'Saavira Kambada Basadi (1,000 Pillars), Karkala Gommateshwara (42ft Monolith)',
      schedule: {
        morning: '08:30 AM: Explore the 1430 CE granite shrine where no two of the 1,000 pillars are carved identically.',
        afternoon: '01:00 PM: Ascend the rocky hill in Karkala to the 590-year-old monolithic Bahubali colossus.',
        evening: '05:00 PM: Drive through betel nut and cashew groves toward the Western Ghats.'
      },
      transit: 'State Highway Drive (35 km from Udupi)',
      cuisine: 'Mangalore Buns & Golibaje',
      budget: '₹1,300 – ₹2,400 / day',
      asiInfo: 'ASI Protected Basadi Complex'
    },

    // Circuit 8: Days 57-64 (Karnataka & Deccan Wonders)
    {
      day: 57,
      circuitId: 'c8',
      title: 'City of Victory: The Boulder Empire of Hampi',
      city: 'Hampi',
      state: 'Karnataka',
      coords: [15.3350, 76.4600],
      monuments: 'Virupaksha Temple, Hemakuta Hill, Hampi Bazaar',
      schedule: {
        morning: '07:00 AM: 160-foot gopuram of Virupaksha Temple, where worship has continued uninterrupted since 7th c.',
        afternoon: '01:00 PM: Inverted pinhole camera shadow effect in the inner sanctum wall.',
        evening: '05:30 PM: Sunset across endless granite boulders and Tungabhadra river from Hemakuta Hill.'
      },
      transit: 'Hampi Express / Vande Bharat to Hospet + Cab',
      cuisine: 'Bisi Bele Bath, Jolada Rotti & Badam Milk',
      budget: '₹1,800 – ₹3,500 / day',
      asiInfo: 'UNESCO World Heritage Site (1986)'
    },
    {
      day: 58,
      circuitId: 'c8',
      title: 'The Musical Chariot: Vittala Temple',
      city: 'Hampi',
      state: 'Karnataka',
      coords: [15.3418, 76.4764],
      monuments: 'Vittala Temple Stone Chariot, Musical Pillars, King’s Balance',
      schedule: {
        morning: '07:30 AM: Iconic monolithic Garuda Stone Chariot featured on the Indian ₹50 banknote.',
        afternoon: '11:30 AM: 56 musical pillars in Ranga Mantapa that resonate with Sa-Re-Ga-Ma frequencies.',
        evening: '04:30 PM: Coracle circular boat ride across the rushing Tungabhadra river currents.'
      },
      transit: 'Electric Eco-Buggy & Bicycle',
      cuisine: 'South Indian Thali with Coconut Chutney & Filter Kaapi',
      budget: '₹1,500 – ₹3,000 / day',
      asiInfo: 'UNESCO World Heritage Site • ASI Dharwad Circle'
    },
    {
      day: 59,
      circuitId: 'c8',
      title: 'The Royal Enclosure & Queen’s Bath',
      city: 'Hampi',
      state: 'Karnataka',
      coords: [15.3218, 76.4697],
      monuments: 'Lotus Mahal, Elephant Stables, Stepped Tank (Pushkarani), Mahanavami Dibba',
      schedule: {
        morning: '08:30 AM: Indo-Islamic vaulted arches of the 11 royal Elephant Stables and Lotus Mahal.',
        afternoon: '01:00 PM: Geometrically symmetrical black schist Stepped Tank with aqueduct water channels.',
        evening: '05:00 PM: Climb the high platform of Mahanavami Dibba where emperors reviewed grand armies.'
      },
      transit: 'Rented Moped / Auto',
      cuisine: 'Benne Dosa & Mysore Filter Coffee',
      budget: '₹1,400 – ₹2,800 / day',
      asiInfo: 'UNESCO World Heritage Monument'
    },
    {
      day: 60,
      circuitId: 'c8',
      title: 'Red Sandstone Canyons: Badami Cave Temples',
      city: 'Badami',
      state: 'Karnataka',
      coords: [15.9189, 75.6766],
      monuments: 'Badami Rock-Cut Caves 1-4 (Nataraja 81 Dance Poses), Agastya Lake, Bhutanatha Temple',
      schedule: {
        morning: '08:00 AM: 18-armed dancing Shiva Nataraja carved into Cave 1 basalt rock (6th c. Chalukya).',
        afternoon: '01:00 PM: Cave 3 colossal relief of Vishnu seated on coiled serpent Adishesha.',
        evening: '05:00 PM: Sunset reflection of the 7th-century Bhutanatha Temple submerged into Agastya lake.'
      },
      transit: 'Highway Road Trip (140 km from Hampi)',
      cuisine: 'Yennegai (Stuffed brinjal curry) & Shenga Chutney',
      budget: '₹1,600 – ₹3,000 / day',
      asiInfo: 'ASI Protected National Monument'
    },
    {
      day: 61,
      circuitId: 'c8',
      title: 'Cradle of Temple Architecture: Pattadakal & Aihole',
      city: 'Pattadakal & Aihole',
      state: 'Karnataka',
      coords: [15.9490, 75.8160],
      monuments: 'Virupaksha Temple Pattadakal, Mallikarjuna Temple, Durga Temple Aihole',
      schedule: {
        morning: '08:30 AM: Pattadakal—where Dravidian and Nagara styles fused harmoniously under Chalukya queens.',
        afternoon: '01:30 PM: Aihole Durga Temple with its rare apsidal Buddhist-chaitya horseshoe plan.',
        evening: '05:00 PM: Ravana Phadi rock-cut cave sculptures.'
      },
      transit: 'Short Cab Drive (22 km from Badami)',
      cuisine: 'Jolada Rotti Oota with buttermilk',
      budget: '₹1,400 – ₹2,600 / day',
      asiInfo: 'UNESCO World Heritage Site (1987)'
    },
    {
      day: 62,
      circuitId: 'c8',
      title: 'Acoustic Marvel of the Adil Shahis: Gol Gumbaz',
      city: 'Vijayapura (Bijapur)',
      state: 'Karnataka',
      coords: [16.8306, 75.7360],
      monuments: 'Gol Gumbaz (Whispering Gallery), Ibrahim Rauza, Malik-e-Maidan (Giant Cannon)',
      schedule: {
        morning: '08:30 AM: Stand beneath the 44-meter unsupported dome—second largest in the world after St. Peter\'s.',
        afternoon: '11:30 AM: Experience the Whispering Gallery where a soft whisper echoes 11 distinct times.',
        evening: '04:30 PM: Ibrahim Rauza—the Taj Mahal of the Deccan with exquisite Persian calligraphy.'
      },
      transit: 'Train or Highway Drive (120 km from Badami)',
      cuisine: 'Jawari Roti & Bijapur Biryani',
      budget: '₹1,400 – ₹2,600 / day',
      asiInfo: 'ASI Dharwad Circle Flagship Monument'
    },
    {
      day: 63,
      circuitId: 'c8',
      title: 'Star-Shaped Symphony: Belur Chennakeshava Temple',
      city: 'Belur',
      state: 'Karnataka',
      coords: [13.1623, 75.8596],
      monuments: 'Chennakeshava Temple, Madanika Bracket Figures, Gravity Pillar',
      schedule: {
        morning: '08:30 AM: Examine the chloritic soapstone star-shaped platform built by Hoysala King Vishnuvardhana (1117 CE).',
        afternoon: '01:00 PM: Marvel at the 42 Madanika dancing maiden bracket figures capturing motion in stone.',
        evening: '05:00 PM: Free-standing 42ft Mahastambha (Gravity Pillar) standing without foundation.'
      },
      transit: 'Train down to Hassan + Cab',
      cuisine: 'Akki Rotti with coconut chutney & Kaapi',
      budget: '₹1,800 – ₹3,400 / day',
      asiInfo: 'Sacred Ensembles of the Hoysalas (UNESCO 2023)'
    },
    {
      day: 64,
      circuitId: 'c8',
      title: 'Intricate Jewel of the Hoysalas: Halebidu',
      city: 'Halebidu',
      state: 'Karnataka',
      coords: [13.2133, 75.9936],
      monuments: 'Hoysaleshwara Temple, Kedareshwara Temple, Monolithic Nandi',
      schedule: {
        morning: '08:30 AM: Endless 200m friezes of 1,248 battle elephants, lions, horses, and celestial dancers.',
        afternoon: '01:00 PM: Monolithic 16-foot polished Nandi bull carved from black potstone.',
        evening: '04:30 PM: Shantaleshwara twin shrine dedicated to Hoysala Queen Shantala Devi.'
      },
      transit: 'Short Highway Run (16 km from Belur)',
      cuisine: 'Hassan Maddur Vada & Filter Coffee',
      budget: '₹1,500 – ₹2,800 / day',
      asiInfo: 'UNESCO World Heritage Site (2023)'
    },

    // Circuit 9: Days 65-73 (Tamil Nadu Temple Trail)
    {
      day: 65,
      circuitId: 'c9',
      title: 'Shoreline Sculptures of the Pallavas: Mahabalipuram',
      city: 'Mamallapuram',
      state: 'Tamil Nadu',
      coords: [12.6269, 80.1927],
      monuments: 'Shore Temple, Arjuna’s Penance (Descent of the Ganga), Pancha Rathas, Krishna’s Butterball',
      schedule: {
        morning: '06:30 AM: Sunrise over the 8th-century granite Shore Temple facing Bay of Bengal surf.',
        afternoon: '11:00 AM: Arjuna\'s Penance—the world\'s largest open-air stone relief carved with 100+ figures.',
        evening: '04:30 PM: Test your strength against the 250-ton gravity-defying Krishna\'s Butterball.'
      },
      transit: 'East Coast Road (ECR) drive from Chennai (50 km)',
      cuisine: 'Chettinad Fish Curry & Fresh Coconut Water',
      budget: '₹1,800 – ₹3,800 / day',
      asiInfo: 'UNESCO World Heritage Site (1984)'
    },
    {
      day: 66,
      circuitId: 'c9',
      title: 'City of Thousand Temples: Kanchipuram',
      city: 'Kanchipuram',
      state: 'Tamil Nadu',
      coords: [12.8342, 79.7036],
      monuments: 'Kailasanathar Temple, Ekambareswarar Temple (3,500-year Mango Tree), Varadharaja Perumal',
      schedule: {
        morning: '08:00 AM: Kailasanathar Temple—the oldest surviving stone temple in Tamil Nadu (Rajasimha Pallava).',
        afternoon: '01:00 PM: Ekambareswarar Temple 192-foot Rajagopuram and Prithvi Lingam (Earth element).',
        evening: '04:30 PM: Kanchipuram pure mulberry silk weaving cooperative master weavers.'
      },
      transit: 'State Highway Drive (65 km from Mahabalipuram)',
      cuisine: 'Kanchipuram Idli (Steamed in Bauhinia leaves with ginger and pepper)',
      budget: '₹1,400 – ₹2,600 / day',
      asiInfo: 'ASI Chennai Circle Protected'
    },
    {
      day: 67,
      circuitId: 'c9',
      title: 'Cosmic Dance of Nataraja: Chidambaram',
      city: 'Chidambaram',
      state: 'Tamil Nadu',
      coords: [11.3994, 79.6934],
      monuments: 'Thillai Nataraja Temple, Golden Roof Sanctum, Chidambara Rahasyam (Akasha Secret)',
      schedule: {
        morning: '07:30 AM: Witness the morning Ruby Nataraja (Ratnasabhapati) puja bathed in holy waters.',
        afternoon: '12:00 PM: Contemplate the Chidambara Rahasyam—the curtain of golden bilva leaves representing empty space (Akasha).',
        evening: '05:30 PM: 108 Bharatnatyam classical dance mudras carved on the towering gopurams.'
      },
      transit: 'Train or Highway Drive (130 km from Kanchipuram)',
      cuisine: 'Chidambaram Kothsu & Pongal',
      budget: '₹1,200 – ₹2,400 / day',
      asiInfo: 'Heritage Saivite Center of India'
    },
    {
      day: 68,
      circuitId: 'c9',
      title: 'The Big Temple: Brihadisvara of Thanjavur',
      city: 'Thanjavur',
      state: 'Tamil Nadu',
      coords: [10.7828, 79.1318],
      monuments: 'Brihadisvara Temple (Peruvudaiyar Kovil), Thanjavur Royal Palace, Saraswathi Mahal Library',
      schedule: {
        morning: '07:00 AM: Gaze up at the 216ft Vimana built by Raja Raja Chola I (1010 CE) with an 80-ton granite capstone.',
        afternoon: '01:00 PM: Saraswathi Mahal Library collection of ancient palm-leaf manuscripts and Chola bronzes.',
        evening: '05:30 PM: Golden hour illuminates the giant 20-ton monolithic Nandi pavilion.'
      },
      transit: 'Intercity Highway Drive (105 km from Chidambaram)',
      cuisine: 'Thanjavur Ashoka Halwa & Kumbakonam Degree Coffee',
      budget: '₹1,600 – ₹3,200 / day',
      asiInfo: 'Great Living Chola Temples (UNESCO World Heritage)'
    },
    {
      day: 69,
      circuitId: 'c9',
      title: 'Chola Naval Triumphs: Gangaikonda Cholapuram & Darasuram',
      city: 'Jayankondam & Kumbakonam',
      state: 'Tamil Nadu',
      coords: [11.2062, 79.4533],
      monuments: 'Gangaikonda Cholapuram, Airavatesvara Temple Darasuram (Musical Stone Steps)',
      schedule: {
        morning: '08:30 AM: Built by Rajendra Chola I to celebrate his victorious naval expedition to the Ganges and Srivijaya (Sumatra).',
        afternoon: '01:30 PM: Airavatesvara Temple in Darasuram—a stone jewel box with delicate miniature chariot carvings.',
        evening: '05:00 PM: Tap the musical stone steps that produce seven swaras.'
      },
      transit: 'Short Circular Drive from Thanjavur (70 km)',
      cuisine: 'Kumbakonam Kadappa & Mysore Pak',
      budget: '₹1,300 – ₹2,500 / day',
      asiInfo: 'Great Living Chola Temples (UNESCO)'
    },
    {
      day: 70,
      circuitId: 'c9',
      title: 'Island Fortress of Ranganatha: Srirangam',
      city: 'Tiruchirappalli (Trichy)',
      state: 'Tamil Nadu',
      coords: [10.8624, 78.6901],
      monuments: 'Sri Ranganathaswamy Temple (21 Gopurams, 7 Enclosures), Rockfort Temple (Ucchi Pillayar)',
      schedule: {
        morning: '07:30 AM: Largest functioning Hindu temple complex in the world spanning 156 acres.',
        afternoon: '01:00 PM: Stand beneath the colossal 239-foot Rajagopuram—one of the tallest in Asia.',
        evening: '05:00 PM: Climb 437 rock-cut steps to the summit of the 272ft Rockfort for Kaveri river views.'
      },
      transit: 'Highway Drive (55 km from Thanjavur)',
      cuisine: 'Trichy Masala Vadai & Filter Coffee',
      budget: '₹1,400 – ₹2,800 / day',
      asiInfo: 'UNESCO Asia-Pacific Award of Excellence'
    },
    {
      day: 71,
      circuitId: 'c9',
      title: 'The City of Nectar: Madurai Meenakshi Sundareswarar',
      city: 'Madurai',
      state: 'Tamil Nadu',
      coords: [9.9195, 78.1193],
      monuments: 'Meenakshi Amman Temple, Hall of Thousand Pillars, Thirumalai Nayakkar Mahal',
      schedule: {
        morning: '07:30 AM: Gaze upon the 14 multi-tiered gopurams encrusted with 33,000 brightly painted mythological sculptures.',
        afternoon: '01:00 PM: Hall of Thousand Pillars with exquisitely carved musical stone pillars and Yali mythical beasts.',
        evening: '09:00 PM: Night palanquin procession carrying Lord Sundareswarar to Meenakshi\'s sanctum.'
      },
      transit: 'Vande Bharat / Highway Drive from Trichy (130 km)',
      cuisine: 'Madurai Bun Parotta, Kari Dosa & Jigarthanda drink',
      budget: '₹1,800 – ₹3,500 / day',
      asiInfo: 'Monumental Heritage Sanctum of the Pandyan Dynasty'
    },
    {
      day: 72,
      circuitId: 'c9',
      title: 'Palaces of the Spice Merchants: Chettinad',
      city: 'Karaikudi / Kanadukathan',
      state: 'Tamil Nadu',
      coords: [10.1764, 78.7844],
      monuments: 'Chettinad Heritage Mansions, Athangudi Tile Factories, Aayiram Jannal Veedu (Thousand Windows House)',
      schedule: {
        morning: '08:30 AM: Tour 19th-century merchant mansions built with Burmese teak, Italian marble, and Belgian mirrors.',
        afternoon: '01:00 PM: Observe artisans creating handmade geometric Athangudi floral tiles using local clay.',
        evening: '05:00 PM: Stroll the palatial streets of Kanadukathan heritage village.'
      },
      transit: 'Highway Drive from Madurai (85 km)',
      cuisine: 'Authentic 18-dish Chettinad Banana Leaf Feast (Chicken Chettinad, Vellai Paniyaram)',
      budget: '₹2,500 – ₹5,000 / day',
      asiInfo: 'Heritage Enclave of Global Merchant Legacy'
    },
    {
      day: 73,
      circuitId: 'c9',
      title: 'The Bridge of Rama: Rameswaram & Dhanushkodi',
      city: 'Rameswaram',
      state: 'Tamil Nadu',
      coords: [9.2876, 79.3129],
      monuments: 'Ramanathaswamy Temple 1,212 Pillar Corridors, Pamban Rail Bridge, Dhanushkodi Ghost Town',
      schedule: {
        morning: '07:00 AM: Walk the longest temple corridor in the world (1,212 carved pillars spanning 6.9 km total).',
        afternoon: '01:30 PM: Drive across the coral spit to Dhanushkodi—the submerged ghost town where Ram Setu begins.',
        evening: '05:30 PM: Watch trains cross the hundred-year-old Pamban cantilever sea bridge.'
      },
      transit: 'Scenic Pamban Sea Highway NH49',
      cuisine: 'Coastal Crab fry & tender coconut',
      budget: '₹1,600 – ₹3,200 / day',
      asiInfo: 'National Coastal Pilgrimage & Heritage Monument'
    },

    // Circuit 10: Days 74-80 (Kerala, Punjab & Himalayas)
    {
      day: 74,
      circuitId: 'c10',
      title: 'Spice Coast Heritage: Fort Kochi & Mattancherry',
      city: 'Kochi',
      state: 'Kerala',
      coords: [9.9656, 76.2421],
      monuments: 'Chinese Fishing Nets, Mattancherry Dutch Palace (Ramayana Murals), Paradesi Synagogue (1568)',
      schedule: {
        morning: '07:30 AM: Watch fishermen hoist the wooden cantilever Chinese fishing nets (Cheena Vala).',
        afternoon: '01:00 PM: Walk Jew Town\'s antique shops and copper-floor Paradesi Synagogue.',
        evening: '06:00 PM: Kathakali dance performance with intricate green-face Chutti makeup ritual.'
      },
      transit: 'Flight / Rail to Kochi',
      cuisine: 'Kerala Sadya, Appam with vegetable stew & Karimeen Pollichathu',
      budget: '₹2,200 – ₹4,500 / day',
      asiInfo: 'ASI Kochi Circle Protected Palace'
    },
    {
      day: 75,
      circuitId: 'c10',
      title: 'The Serene Venice of the East: Alleppey Backwaters',
      city: 'Alappuzha (Alleppey)',
      state: 'Kerala',
      coords: [9.4981, 76.3388],
      monuments: 'Vembanad Lake Heritage Canals, Traditional Kettuvallam Wooden Houseboats',
      schedule: {
        morning: '08:30 AM: Board a traditional coir-bound wooden Kettuvallam houseboat.',
        afternoon: '01:00 PM: Cruise through tranquil backwater lagoons fringed with coconut palms and paddy fields.',
        evening: '05:30 PM: Watch coir rope spinning and toddy tapping along village waterways.'
      },
      transit: 'Houseboat / Canal Ferry',
      cuisine: 'Fresh Pearl Spot fish curry, Red Matta rice & Banana chips',
      budget: '₹3,000 – ₹6,000 / day',
      asiInfo: 'Living Ecological & Agricultural Heritage'
    },
    {
      day: 76,
      circuitId: 'c10',
      title: 'Pool of Nectar: Sri Harmandir Sahib (Golden Temple)',
      city: 'Amritsar',
      state: 'Punjab',
      coords: [31.6200, 74.8765],
      monuments: 'Golden Temple, Guru Ka Langar, Akal Takht, Jallianwala Bagh',
      schedule: {
        morning: '05:00 AM: Palki Sahib early morning ceremony as Sri Guru Granth Sahib is carried in a golden palanquin.',
        afternoon: '12:30 PM: Volunteer and dine at the world\'s largest free community kitchen serving 100,000 daily.',
        evening: '05:00 PM: Solemn walk through Jallianwala Bagh bullet marks and Martyrs\' Well.'
      },
      transit: 'Direct Air Transit / Train to Amritsar',
      cuisine: 'Amritsari Kulcha with Chole, Makki di Roti & Sarson da Saag, Sweet Lassi',
      budget: '₹1,500 – ₹3,000 / day',
      asiInfo: 'Universal Spiritual Sanctuary & National Heritage'
    },
    {
      day: 77,
      circuitId: 'c10',
      title: 'Gateway to the Gods: Haridwar & Rishikesh',
      city: 'Haridwar & Rishikesh',
      state: 'Uttarakhand',
      coords: [29.9457, 78.1642],
      monuments: 'Har Ki Pauri, Parmarth Niketan, Beatles Ashram (Chaurasi Kutia), Lakshman Jhula',
      schedule: {
        morning: '06:00 AM: Dip in the crystal clear emerald waters of the Ganga emerging from the Himalayas.',
        afternoon: '01:00 PM: Meditate inside the stone dome meditation caves of the Maharishi Mahesh Yogi ashram.',
        evening: '06:30 PM: World-famous evening Ganga Aarti at Parmarth Niketan with sacred Vedic chants.'
      },
      transit: 'Vande Bharat Express (Delhi to Haridwar/Dehradun - 4 hrs)',
      cuisine: 'Aloo Puri at Mohanji Puriwale & Kesar Malai Kulfi',
      budget: '₹1,400 – ₹2,800 / day',
      asiInfo: 'Ancient Himalayan Gateway & Yoga Capital'
    },
    {
      day: 78,
      circuitId: 'c10',
      title: 'Sacred High Confluence: Devprayag & Rudraprayag',
      city: 'Devprayag',
      state: 'Uttarakhand',
      coords: [30.1459, 78.5986],
      monuments: 'Sangam of Bhagirathi and Alaknanda (Birth of Ganga), Raghunathji Temple (10th c.)',
      schedule: {
        morning: '08:30 AM: Stand on the rocky promontory where turquoise Bhagirathi meets milky Alaknanda to form River Ganga.',
        afternoon: '01:00 PM: Ancient stone Raghunathji temple built by Adi Shankaracharya.',
        evening: '05:00 PM: Mountain drive through Himalayan oak and pine forests.'
      },
      transit: 'Badrinath Highway Mountain SUV',
      cuisine: 'Garhwali Kafuli, Chainsoo & Mandua (Finger millet) roti',
      budget: '₹1,800 – ₹3,500 / day',
      asiInfo: 'Panch Prayag Himalayan Heritage'
    },
    {
      day: 79,
      circuitId: 'c10',
      title: 'Meadows of the Gods: Valley of Flowers',
      city: 'Chamoli / Bhyundar Valley',
      state: 'Uttarakhand',
      coords: [30.7280, 79.6053],
      monuments: 'Valley of Flowers National Park, Pushpawati River, Nanda Devi Biosphere',
      schedule: {
        morning: '07:30 AM: Trek through the mist-shrouded high altitude alpine valley carpeted in 500+ species of wild flowers.',
        afternoon: '12:30 PM: Spot rare blue poppies, Brahma Kamal, and Himalayan musk deer.',
        evening: '04:30 PM: Return descent to Ghangaria listening to glacial mountain brooks.'
      },
      transit: 'Himalayan Mountain Trek',
      cuisine: 'Hot Thukpa, Momos & Ginger Lemon Honey Tea',
      budget: '₹2,500 – ₹4,500 / day',
      asiInfo: 'UNESCO World Heritage Natural & Cultural Site (1988/2005)'
    },
    {
      day: 80,
      circuitId: 'c10',
      title: 'The Grand Homecoming: Central Vista & National War Memorial',
      city: 'New Delhi',
      state: 'Delhi NCR',
      coords: [28.6129, 77.2295],
      monuments: 'India Gate, National War Memorial (Amar Jawan Jyoti), Rashtrapati Bhavan, National Museum',
      schedule: {
        morning: '09:00 AM: National Museum to gaze upon the 4,500-year-old Dancing Girl of Harappa and Indus Valley seals.',
        afternoon: '02:00 PM: Walk down Kartavya Path admiring the sandstone colonial and modernist architecture.',
        evening: '06:00 PM: Sunset tribute at the National War Memorial circular concentric rings of bravery.'
      },
      transit: 'Delhi Metro / Electric Cab',
      cuisine: 'Grand Celebratory Indian Heritage Feast',
      budget: '₹2,000 – ₹4,000 / day',
      asiInfo: 'National Monumental Axis of Independent India'
    }
  ];

  const BOOKMARK_STORAGE_KEY = 'bv_80days_bookmarked';
  let plannerMap = null;
  let activeMarkers = [];
  let routePolyline = null;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEightyDaysPlanner);
  } else {
    initEightyDaysPlanner();
  }

  window.addEventListener('load', () => {
    const container = document.getElementById('eighty-days-section');
    if (container && (!container.children || container.children.length === 0)) {
      initEightyDaysPlanner();
    }
  });

  function initEightyDaysPlanner() {
    const container = document.getElementById('eighty-days-section');
    if (!container) return;
    container.classList.add('is-visible');
    container.style.opacity = '1';
    container.style.display = 'block';
    container.style.visibility = 'visible';
    container.style.transform = 'none';
    renderPlannerShell();
    renderCircuitsFilter();
    renderDayCards(EXPEDITION_DAYS);
    updateProgressBadge();
    setTimeout(() => {
      initMap();
    }, 150);
  }

  function getBookmarkedDays() {
    try {
      const data = localStorage.getItem(BOOKMARK_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function toggleBookmarkDay(dayNum) {
    const list = getBookmarkedDays();
    const idx = list.indexOf(dayNum);
    if (idx > -1) {
      list.splice(idx, 1);
      if (typeof window.showToast === 'function') {
        window.showToast(`Day ${dayNum} removed from passport`, 'info');
      }
    } else {
      list.push(dayNum);
      if (typeof window.showToast === 'function') {
        window.showToast(`⭐ Day ${dayNum} marked as explored in passport!`, 'success');
      }
    }
    localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(list));
    updateProgressBadge();
    // Re-render card UI
    const btn = document.querySelector(`.bookmark-day-btn[data-day="${dayNum}"]`);
    if (btn) {
      const isBookmarked = list.includes(dayNum);
      btn.classList.toggle('active', isBookmarked);
      btn.innerHTML = isBookmarked ? '⭐ Explored' : '☆ Mark Explored';
    }
  }

  function updateProgressBadge() {
    const list = getBookmarkedDays();
    const counter = document.getElementById('eighty-days-progress-count');
    const bar = document.getElementById('eighty-days-progress-bar');
    if (counter) {
      counter.textContent = `${list.length} / 80 Days Explored (${Math.round((list.length / 80) * 100)}%)`;
    }
    if (bar) {
      bar.style.width = `${(list.length / 80) * 100}%`;
    }
  }

  function renderPlannerShell() {
    const container = document.getElementById('eighty-days-section');
    if (!container) return;

    container.innerHTML = `
      <div class="planner-header-box">
        <div class="hero-badge">🗺️ 80-DAY BHARAT DARSHAN EXPEDITION</div>
        <h2>८०-दिवसीय भव्य भारत दर्शन</h2>
        <p class="planner-tagline">
          <strong>80-Day Grand Bharat Darshan</strong> — 10 grand circuits, 80 hand-crafted daily itineraries, transit modes, authentic cuisines, and ASI-verified monuments across 28 States and Union Territories.
        </p>

        <!-- Progress Tracker Bar -->
        <div class="expedition-progress-wrapper">
          <div class="progress-info-row">
            <span><strong>Your Bharat Darshan Passport:</strong></span>
            <span id="eighty-days-progress-count">0 / 80 Days Explored (0%)</span>
          </div>
          <div class="expedition-bar-track">
            <div id="eighty-days-progress-bar" class="expedition-bar-fill" style="width: 0%;"></div>
          </div>
        </div>

        <!-- Filter Controls -->
        <div class="planner-controls-row">
          <div class="planner-search-box">
            <input type="text" id="planner-search-input" placeholder="🔍 Search by city, state, or monument (e.g. Hampi, Varanasi, Taj, Konark)..." autocomplete="off">
          </div>
          <div class="planner-action-btns">
            <button type="button" class="btn btn-secondary btn-sm" id="planner-filter-bookmarked-btn">⭐ Saved Only</button>
            <button type="button" class="btn btn-primary btn-sm" id="planner-export-btn">📥 Export Bharat Darshan Plan</button>
          </div>
        </div>

        <div id="planner-circuits-nav" class="circuits-filter-bar"></div>
      </div>

      <!-- MAP CONTAINER -->
      <div class="planner-map-card">
        <div class="map-status-overlay">
          <span id="map-circuit-label">Active Route: All 80 Days of Bharat Darshan</span>
        </div>
        <div id="eighty-days-map" style="height: 440px; width: 100%; border-radius: 14px;"></div>
      </div>

      <!-- DAILY CARDS CONTAINER -->
      <div id="eighty-days-cards-grid" class="daily-cards-grid"></div>
    `;

    // Bind search and filter events
    const searchInput = document.getElementById('planner-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const filtered = EXPEDITION_DAYS.filter(d => 
          d.title.toLowerCase().includes(query) ||
          d.city.toLowerCase().includes(query) ||
          d.state.toLowerCase().includes(query) ||
          d.monuments.toLowerCase().includes(query)
        );
        renderDayCards(filtered);
        updateMapMarkers(filtered);
      });
    }

    const bookmarkedOnlyBtn = document.getElementById('planner-filter-bookmarked-btn');
    if (bookmarkedOnlyBtn) {
      let onlyBookmarked = false;
      bookmarkedOnlyBtn.addEventListener('click', () => {
        onlyBookmarked = !onlyBookmarked;
        bookmarkedOnlyBtn.classList.toggle('active', onlyBookmarked);
        if (onlyBookmarked) {
          const bDays = getBookmarkedDays();
          const filtered = EXPEDITION_DAYS.filter(d => bDays.includes(d.day));
          renderDayCards(filtered);
          updateMapMarkers(filtered);
        } else {
          renderDayCards(EXPEDITION_DAYS);
          updateMapMarkers(EXPEDITION_DAYS);
        }
      });
    }

    const exportBtn = document.getElementById('planner-export-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', exportBharatDarshanPlan);
    }
  }

  function exportBharatDarshanPlan() {
    const bookmarked = getBookmarkedDays();
    let text = `BHARAT VIRASAT — 80-DAY BHARAT DARSHAN EXPEDITION REPORT\n`;
    text += `८०-दिवसीय भव्य भारत दर्शन यात्रा विवरण\n`;
    text += `Generated on: ${new Date().toLocaleDateString('en-IN')}\n`;
    text += `Total Completed: ${bookmarked.length} / 80 Days\n\n`;
    text += `====================================================\n\n`;

    EXPEDITION_DAYS.forEach(d => {
      const status = bookmarked.includes(d.day) ? '[COMPLETED]' : '[PLANNED]';
      text += `DAY ${d.day}: ${d.title} ${status}\n`;
      text += `📍 Location: ${d.city}, ${d.state}\n`;
      text += `🏛️ Monuments: ${d.monuments}\n`;
      text += `🚆 Transit: ${d.transit}\n`;
      text += `🍛 Food: ${d.cuisine}\n`;
      text += `💰 Estimated Budget: ${d.budget}\n`;
      text += `----------------------------------------------------\n\n`;
    });

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Bharat_Virasat_80_Day_Bharat_Darshan.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    if (typeof window.showToast === 'function') {
      window.showToast('📥 80-Day Bharat Darshan plan downloaded successfully!', 'success');
    }
  }

  function renderCircuitsFilter() {
    const nav = document.getElementById('planner-circuits-nav');
    if (!nav) return;

    let html = `<button type="button" class="circuit-pill active" data-circuit="all">All Circuits (80 Days)</button>`;
    EXPEDITION_CIRCUITS.forEach(c => {
      html += `<button type="button" class="circuit-pill" data-circuit="${c.id}">${c.name}</button>`;
    });
    nav.innerHTML = html;

    const pills = nav.querySelectorAll('.circuit-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const cId = pill.getAttribute('data-circuit');
        if (cId === 'all') {
          renderDayCards(EXPEDITION_DAYS);
          updateMapMarkers(EXPEDITION_DAYS);
          const lbl = document.getElementById('map-circuit-label');
          if (lbl) lbl.textContent = 'Active Route: All 80 Days of Bharat Darshan';
        } else {
          const filtered = EXPEDITION_DAYS.filter(d => d.circuitId === cId);
          renderDayCards(filtered);
          updateMapMarkers(filtered);
          const cObj = EXPEDITION_CIRCUITS.find(c => c.id === cId);
          const lbl = document.getElementById('map-circuit-label');
          if (lbl) lbl.textContent = `Active Route: ${cObj ? cObj.name : cId}`;
        }
      });
    });
  }

  function initMap() {
    const mapEl = document.getElementById('eighty-days-map');
    if (!mapEl || typeof L === 'undefined') return;
    if (plannerMap) {
      plannerMap.invalidateSize();
      return;
    }

    try {
      plannerMap = L.map('eighty-days-map', {
        center: [22.5, 78.9],
        zoom: 5,
        scrollWheelZoom: false
      });

      // CartoDB Voyager high-contrast map style
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 18
      }).addTo(plannerMap);

      updateMapMarkers(EXPEDITION_DAYS);

      setTimeout(() => {
        if (plannerMap) plannerMap.invalidateSize();
      }, 300);
    } catch (e) {
      console.warn('Leaflet map init notice:', e);
    }
  }

  function updateMapMarkers(days) {
    if (!plannerMap || typeof L === 'undefined') return;

    // Clear existing markers & lines
    activeMarkers.forEach(m => plannerMap.removeLayer(m));
    activeMarkers = [];
    if (routePolyline) {
      plannerMap.removeLayer(routePolyline);
      routePolyline = null;
    }

    const latlngs = [];

    days.forEach(d => {
      if (!d.coords) return;
      latlngs.push(d.coords);

      const customIcon = L.divIcon({
        className: 'custom-expedition-marker',
        html: `<div class="marker-pin"><span class="pin-day">${d.day}</span></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -28]
      });

      const marker = L.marker(d.coords, { icon: customIcon }).addTo(plannerMap);
      marker.bindPopup(`
        <div class="map-popup-card">
          <div class="popup-badge">Day ${d.day}</div>
          <h4>${d.title}</h4>
          <p class="popup-loc">📍 ${d.city}, ${d.state}</p>
          <p class="popup-mono">🏛️ ${d.monuments}</p>
          <p class="popup-food">🍛 Must try: ${d.cuisine}</p>
          <button type="button" class="popup-jump-btn" onclick="document.querySelector('#day-card-${d.day}')?.scrollIntoView({behavior:'smooth'})">View Details →</button>
        </div>
      `);

      activeMarkers.push(marker);
    });

    if (latlngs.length > 1) {
      routePolyline = L.polyline(latlngs, {
        color: '#d4af37',
        weight: 3,
        opacity: 0.8,
        dashArray: '6, 8',
        lineCap: 'round'
      }).addTo(plannerMap);

      plannerMap.fitBounds(routePolyline.getBounds(), { padding: [30, 30] });
    } else if (latlngs.length === 1) {
      plannerMap.setView(latlngs[0], 9);
    }
  }

  function renderDayCards(days) {
    const grid = document.getElementById('eighty-days-cards-grid');
    if (!grid) return;

    const bookmarked = getBookmarkedDays();

    if (days.length === 0) {
      grid.innerHTML = `
        <div class="empty-planner-msg">
          <p>No expedition days matched your criteria. Clear search or filters to see all 80 days.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = days.map(d => {
      const isSaved = bookmarked.includes(d.day);
      const circuit = EXPEDITION_CIRCUITS.find(c => c.id === d.circuitId) || {};

      return `
        <div class="daily-card" id="day-card-${d.day}">
          <div class="card-top-ribbon">
            <span class="day-number-badge">DAY ${d.day}</span>
            <span class="circuit-tag" style="background:${circuit.color || '#d4af37'}22; color:${circuit.color || '#d4af37'}; border-color:${circuit.color || '#d4af37'}55;">
              ${circuit.name || 'Circuit'}
            </span>
            <button type="button" class="bookmark-day-btn ${isSaved ? 'active' : ''}" data-day="${d.day}">
              ${isSaved ? '⭐ Explored' : '☆ Mark Explored'}
            </button>
          </div>

          <h3 class="day-card-title">${d.title}</h3>
          <div class="day-card-meta">
            <span>📍 ${d.city}, ${d.state}</span>
            <span>💰 ${d.budget}</span>
          </div>

          <div class="day-card-monuments">
            <span class="monu-icon">🏛️</span>
            <strong>Key Highlights:</strong> ${d.monuments}
          </div>

          <!-- Schedule Accordion -->
          <div class="day-timeline">
            <div class="time-item">
              <span class="time-slot">🌅 Morning:</span>
              <span class="time-desc">${d.schedule.morning}</span>
            </div>
            <div class="time-item">
              <span class="time-slot">☀️ Afternoon:</span>
              <span class="time-desc">${d.schedule.afternoon}</span>
            </div>
            <div class="time-item">
              <span class="time-slot">🌇 Sunset:</span>
              <span class="time-desc">${d.schedule.evening}</span>
            </div>
          </div>

          <div class="day-extras-row">
            <div class="extra-pill">
              <span class="icon">🚆</span>
              <span><strong>Transit:</strong> ${d.transit}</span>
            </div>
            <div class="extra-pill">
              <span class="icon">🍛</span>
              <span><strong>Cuisine:</strong> ${d.cuisine}</span>
            </div>
          </div>

          <div class="day-asi-badge">
            <span class="asi-icon">🛡️</span>
            <span>${d.asiInfo}</span>
          </div>

          <div class="day-card-actions">
            <button type="button" class="btn btn-secondary btn-sm fly-to-map-btn" data-coords="${d.coords.join(',')}">
              🗺️ Fly on Map
            </button>
            <button type="button" class="btn btn-secondary btn-sm ask-ai-day-btn" data-city="${d.city}" data-title="${d.title}">
              💬 Ask AI Guide
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Bind card buttons
    grid.querySelectorAll('.bookmark-day-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const dNum = parseInt(btn.getAttribute('data-day'), 10);
        toggleBookmarkDay(dNum);
      });
    });

    grid.querySelectorAll('.fly-to-map-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const coordsStr = btn.getAttribute('data-coords');
        if (coordsStr && plannerMap) {
          const [lat, lon] = coordsStr.split(',').map(Number);
          plannerMap.flyTo([lat, lon], 12, { duration: 1.5 });
          document.getElementById('eighty-days-map')?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    grid.querySelectorAll('.ask-ai-day-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const city = btn.getAttribute('data-city');
        const title = btn.getAttribute('data-title');
        const chatInput = document.getElementById('gemini-chat-input');
        const chatBtn = document.getElementById('ai-chat-btn');
        if (chatBtn) chatBtn.click();
        if (chatInput) {
          chatInput.value = `Tell me more about the 80-day journey stop: ${title} in ${city}! What hidden secrets should I look for?`;
          const sendBtn = document.getElementById('gemini-send-btn');
          if (sendBtn) sendBtn.click();
        }
      });
    });
  }

  window.initEightyDaysPlanner = initEightyDaysPlanner;

  window.openEightyDaysPlanner = function() {
    const el = document.getElementById('eighty-days-section');
    if (el) {
      if (!el.children || el.children.length === 0) {
        initEightyDaysPlanner();
      }
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

})();
