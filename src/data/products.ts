import { Product, CategoryInfo } from '../types/product';

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    id: 'electronics',
    name: 'Electronics & Technology',
    tagline: 'High-performance audio, wearables & precision computer gear.',
    description: 'Engineered for seamless daily connectivity, gaming precision, and acoustic clarity.',
    iconName: 'Headphones',
    productCount: 8,
    featuredImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    subcategories: ['Audio & Headphones', 'Power & Chargers', 'Smartwatches', 'Peripherals & Gaming', 'Webcams & Display']
  },
  {
    id: 'toys',
    name: 'Toys & Games',
    tagline: 'Creative engineering, STEM discovery & timeless tactical games.',
    description: 'High-grade educational kits, mechanical puzzles, and RC vehicles built to inspire curiosity.',
    iconName: 'Gamepad2',
    productCount: 6,
    featuredImage: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&auto=format&fit=crop&q=80',
    subcategories: ['STEM & Robotics', 'Building & Construction', 'Mechanical Puzzles', 'Classic Strategy', 'RC & Stunt']
  },
  {
    id: 'home',
    name: 'Home & Everyday Essentials',
    tagline: 'Modern task lighting, smart desktop organization & living gadgets.',
    description: 'Thoughtfully designed minimalist essentials that elevate work surfaces and daily living.',
    iconName: 'Home',
    productCount: 5,
    featuredImage: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80',
    subcategories: ['Desk & Workspace', 'Modern Lighting', 'Smart Gadgets', 'Kitchen Precision', 'Organization']
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle & Personal Accessories',
    tagline: 'Tactile everyday carry, thermal travel drinkware & tech organizers.',
    description: 'Engineered utility for daily transit, commuters, and minimalist travellers.',
    iconName: 'Compass',
    productCount: 4,
    featuredImage: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80',
    subcategories: ['Minimalist Wallets', 'Thermal Drinkware', 'Tech Travel Cases', 'Everyday Carry']
  }
];

export const PRODUCTS_DATA: Product[] = [
  // 1. ANC Headphones
  {
    id: 'bgt-anc-900',
    title: 'BlueGate AcousticPro Active Noise-Cancelling Wireless Headphones',
    slug: 'acousticpro-anc-wireless-headphones',
    category: 'electronics',
    categoryLabel: 'Electronics & Technology',
    subcategory: 'Audio & Headphones',
    brand: 'BlueGate Acoustic',
    price: 79.99,
    compareAtPrice: 109.99,
    rating: 4.9,
    reviewCount: 142,
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    badge: 'Best Seller',
    stockCount: 38,
    inStock: true,
    sku: 'BGT-AUD-9001',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=900&auto=format&fit=crop&q=85'
    ],
    shortDescription: 'Hybrid 3-stage active noise cancellation with 40mm beryllium drivers and 42-hour continuous battery life.',
    description: 'The AcousticPro brings studio-grade fidelity to everyday UK commuting. Featuring dual feedforward and feedback microphones for -38dB ambient reduction, plush memory-foam ear cushions wrapped in breathable protein leather, and ultra-low latency multipoint Bluetooth 5.3 connection.',
    specifications: {
      'Driver Size': '40mm Custom Beryllium Diaphragm',
      'Noise Cancellation': 'Hybrid ANC (-38dB depth)',
      'Battery Life': '42 hours (ANC ON) / 60 hours (ANC OFF)',
      'Fast Charge': '10 mins charge = 5 hours playback',
      'Bluetooth Version': '5.3 Multipoint (SBC, AAC, LDAC)',
      'Weight': '248g lightweight aerospace aluminum frame'
    },
    includedInBox: [
      'AcousticPro ANC Wireless Headphones',
      'Protective EVA travel case',
      'Braided USB-C to USB-C charging cable (1.2m)',
      '3.5mm gold-plated audio cable',
      'Airplane dual-pin adapter',
      'User manual & UK 2-year warranty card'
    ],
    deliveryInfo: 'Royal Mail 48 Tracked (Free over £40) or DPD Next Day delivery available at checkout.',
    warrantyInfo: 'Official 24-Month BlueGate UK Limited Hardware Warranty with direct customer support.',
    variants: [
      {
        id: 'color',
        name: 'Colorway',
        options: [
          { label: 'Midnight Matte Black', value: 'matte-black', inStock: true, skuSuffix: 'MB' },
          { label: 'Lunar Silver', value: 'lunar-silver', inStock: true, skuSuffix: 'LS' },
          { label: 'Cobalt Blue', value: 'cobalt-blue', inStock: true, skuSuffix: 'CB' }
        ]
      }
    ],
    faqs: [
      {
        question: 'Does this pair with two devices at once (laptop and phone)?',
        answer: 'Yes, multipoint Bluetooth 5.3 allows seamless switching between your phone and laptop without disconnecting.'
      },
      {
        question: 'Is it comfortable for wearing with glasses?',
        answer: 'The ultra-soft high-density memory foam distributes clamping force evenly, making it exceptionally comfortable even during extended eyewear sessions.'
      }
    ]
  },

  // 2. Gaming Controller
  {
    id: 'bgt-ctrl-800',
    title: 'ApexStrike Wireless Precision Gaming Controller with Hall-Effect Triggers',
    slug: 'apexstrike-wireless-gaming-controller',
    category: 'electronics',
    categoryLabel: 'Electronics & Technology',
    subcategory: 'Peripherals & Gaming',
    brand: 'ApexStrike',
    price: 49.99,
    compareAtPrice: 64.99,
    rating: 4.8,
    reviewCount: 96,
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    badge: 'Hall-Effect No Drift',
    stockCount: 27,
    inStock: true,
    sku: 'BGT-GME-8002',
    images: [
      'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=900&auto=format&fit=crop&q=85'
    ],
    shortDescription: 'Zero-drift electromagnetic Hall Effect sticks, dual haptic rumble motors, and 1,000Hz polling rate for PC and consoles.',
    description: 'Engineered for competitive esports accuracy. Hall Effect sensors eliminate potentiometer stick-drift entirely. Includes tactile mechanical microswitch face buttons and 4 programmable rear remappable macro paddles.',
    specifications: {
      'Sensor Technology': 'Hall Effect Electromagnetic Sticks & Triggers',
      'Polling Rate': '1000Hz (Wired & 2.4GHz Wireless)',
      'Connectivity': '2.4GHz Low-Latency USB Dongle, Bluetooth 5.2, USB-C',
      'Battery': '1,200mAh Lithium-ion (Up to 22h battery life)',
      'Compatibility': 'Windows 10/11, Steam Deck, Android, iOS, Nintendo Switch'
    },
    includedInBox: [
      'ApexStrike Pro Wireless Controller',
      '2.4GHz Ultra-Low Latency USB Receiver',
      '2m Braided Type-C cable',
      '2x Alternative thumbstick caps (high-rise / domed)',
      'Quick-start configuration guide'
    ],
    deliveryInfo: 'In stock at UK fulfillment center. Dispatched within 24 business hours.',
    warrantyInfo: '12-Month UK Manufacturer Replacement Warranty against mechanical defects.',
    variants: [
      {
        id: 'color',
        name: 'Chassis Finish',
        options: [
          { label: 'Cyber White', value: 'cyber-white', inStock: true, skuSuffix: 'CW' },
          { label: 'Stealth Shadow', value: 'stealth-shadow', inStock: true, skuSuffix: 'SS' }
        ]
      }
    ]
  },

  // 3. Smartwatch
  {
    id: 'bgt-watch-500',
    title: 'PulseFit Horizon 1.43" AMOLED GPS Fitness Smartwatch',
    slug: 'pulsefit-horizon-amoled-smartwatch',
    category: 'electronics',
    categoryLabel: 'Electronics & Technology',
    subcategory: 'Smartwatches',
    brand: 'PulseFit',
    price: 69.99,
    compareAtPrice: 89.99,
    rating: 4.8,
    reviewCount: 78,
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    badge: '14-Day Battery',
    stockCount: 19,
    inStock: true,
    sku: 'BGT-WTC-5003',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=900&auto=format&fit=crop&q=85'
    ],
    shortDescription: 'Ultra-crisp 466x466 AMOLED screen with continuous heart rate, SpO2, sleep tracking, and 5ATM water resistance.',
    description: 'A refined daily companion built with aircraft-grade aluminum alloy bezel and sapphire-coated glass. Delivers up to 14 days of typical use on a single magnetic charge and supports over 100 indoor and outdoor sports modes.',
    specifications: {
      'Display': '1.43" HD AMOLED (466x466 px, 1,000 nits peak brightness)',
      'Sensors': 'Optical Heart Rate, Blood Oxygen SpO2, 3-Axis Accelerometer, Barometer',
      'Water Resistance': '5ATM (50 meters swimming proof)',
      'Battery Life': '14 days typical / 7 days heavy use',
      'App Support': 'iOS 13+ and Android 8.0+'
    },
    includedInBox: [
      'PulseFit Horizon Smartwatch',
      'Fluororubber 22mm quick-release strap',
      'Magnetic USB fast charging cable',
      'Instruction manual'
    ],
    deliveryInfo: 'Tracked 48-hour delivery across England, Scotland, Wales & Northern Ireland.',
    warrantyInfo: '1-Year UK Warranty with online claims verification.',
    variants: [
      {
        id: 'finish',
        name: 'Case & Strap',
        options: [
          { label: 'Obsidian Black', value: 'obsidian-black', inStock: true },
          { label: 'Titanium Grey', value: 'titanium-grey', inStock: true }
        ]
      }
    ]
  },

  // 4. Bluetooth Speaker
  {
    id: 'bgt-spk-400',
    title: 'SoundSphere 360° Portable IPX7 Waterproof Bluetooth Speaker',
    slug: 'soundsphere-360-waterproof-speaker',
    category: 'electronics',
    categoryLabel: 'Electronics & Technology',
    subcategory: 'Audio & Headphones',
    brand: 'SoundSphere',
    price: 39.99,
    compareAtPrice: 54.99,
    rating: 4.7,
    reviewCount: 112,
    isNew: false,
    isBestSeller: false,
    isFeatured: true,
    badge: 'IPX7 Waterproof',
    stockCount: 45,
    inStock: true,
    sku: 'BGT-AUD-4004',
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=900&auto=format&fit=crop&q=85'
    ],
    shortDescription: 'Dual passive radiators producing room-filling 20W stereo sound with 16-hour playtime and True Wireless Stereo pairing.',
    description: 'Submersible up to 1 meter for 30 minutes, SoundSphere is built for gardens, beach days, and shower acoustics. Connect two units wirelessly for true left/right channel stereo separation.',
    specifications: {
      'Power Output': '20W RMS (Dual full-range drivers + dual passive radiators)',
      'Waterproof Rating': 'IPX7 certified',
      'Battery Life': '16 hours at 60% volume (4,400mAh battery)',
      'Dimensions': '180mm x 75mm cylindrical compact form',
      'Weight': '540g'
    },
    includedInBox: [
      'SoundSphere 360 Speaker',
      'Tear-resistant carry strap',
      'Type-C charging cable',
      'Aux 3.5mm line cable',
      'User manual'
    ],
    deliveryInfo: 'Dispatched from UK warehouse within 1 working day.',
    warrantyInfo: '12-Month UK Warranty included.',
    variants: [
      {
        id: 'color',
        name: 'Fabric Color',
        options: [
          { label: 'Graphite Grey', value: 'graphite-grey', inStock: true },
          { label: 'Deep Teal', value: 'deep-teal', inStock: true }
        ]
      }
    ]
  },

  // 5. Mechanical Keyboard
  {
    id: 'bgt-kb-700',
    title: 'KeyCraft Pro 75% Tri-Mode Wireless Mechanical Keyboard',
    slug: 'keycraft-pro-75-mechanical-keyboard',
    category: 'electronics',
    categoryLabel: 'Electronics & Technology',
    subcategory: 'Peripherals & Gaming',
    brand: 'KeyCraft',
    price: 89.99,
    compareAtPrice: 119.99,
    rating: 4.9,
    reviewCount: 65,
    isNew: true,
    isBestSeller: false,
    isFeatured: true,
    badge: 'Hot-Swappable',
    stockCount: 16,
    inStock: true,
    sku: 'BGT-PER-7005',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=900&auto=format&fit=crop&q=85'
    ],
    shortDescription: 'Gasket-mounted hot-swappable mechanical switches with pre-lubed stabilizers, PBT double-shot keycaps, and rotary media knob.',
    description: 'Designed for discerning typists and UK developers. Featuring five layers of sound-dampening foam for an acoustically deep, creamy typing sound profile. Tri-mode connectivity supports 2.4GHz, Bluetooth 5.0 (3 devices), and Type-C wired.',
    specifications: {
      'Layout': '75% Compact (82 Keys + CNC Aluminum Knob)',
      'Mount Type': 'Gasket-Mounted with Poron Foam & PET Sheet',
      'Switch Type': 'Factory Pre-Lubed Linear Cream Switches (45g actuation)',
      'Hot-Swap': '5-Pin PCB Compatible with Cherry/Gateron/Kailh',
      'Keycaps': 'OEM Profile Double-Shot PBT (UK ISO / ANSI hybrid)',
      'Battery': '4,000mAh Rechargeable (Up to 200h without RGB)'
    },
    includedInBox: [
      'KeyCraft Pro 75 Keyboard',
      '2.4GHz Magnetic Storage Dongle',
      '2-in-1 Keycap & Switch Puller Tool',
      'Braided Type-C Cable',
      '4x Spare Mechanical Switches',
      'Dust Cover'
    ],
    deliveryInfo: 'Royal Mail 24/48 Tracked service available.',
    warrantyInfo: '2-Year UK Limited Warranty.',
    variants: [
      {
        id: 'switch',
        name: 'Switch Feel',
        options: [
          { label: 'Linear Cream (Quiet & Smooth)', value: 'linear-cream', inStock: true },
          { label: 'Tactile Panda (Gentle Bump)', value: 'tactile-panda', inStock: true }
        ]
      }
    ]
  },

  // 6. 65W Power Bank
  {
    id: 'bgt-pwr-600',
    title: 'VoltCore 20,000mAh 65W GaN Fast-Charging Power Bank',
    slug: 'voltcore-20000mah-65w-powerbank',
    category: 'electronics',
    categoryLabel: 'Electronics & Technology',
    subcategory: 'Power & Chargers',
    brand: 'VoltCore',
    price: 44.99,
    compareAtPrice: 59.99,
    rating: 4.8,
    reviewCount: 88,
    isNew: false,
    isBestSeller: true,
    isFeatured: false,
    badge: 'Charges Laptops',
    stockCount: 31,
    inStock: true,
    sku: 'BGT-PWR-6006',
    images: [
      'https://images.unsplash.com/photo-1609592426508-cc037b545fec?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=900&auto=format&fit=crop&q=85'
    ],
    shortDescription: 'High-density lithium polymer battery with 65W USB-C Power Delivery capable of charging MacBooks, laptops, tablets, and phones.',
    description: 'Equipped with an intelligent digital smart status LED display showing real-time voltage, wattage, and remaining battery percentage. Airline approved (74Wh capacity).',
    specifications: {
      'Capacity': '20,000mAh / 74Wh (FAA/CAA Airline Carry-On Safe)',
      'Outputs': '2x USB-C (Max 65W PD 3.0), 1x USB-A (Max 22.5W QC 4.0)',
      'Input': 'USB-C 65W Rapid Recharge (Full charge in 90 minutes)',
      'Protection': '10-Point MultiProtect Overvoltage & Thermal Safety Shield'
    },
    includedInBox: [
      'VoltCore 65W Power Bank',
      '100W E-Marker 1m USB-C to USB-C cable',
      'Travel carry pouch',
      'Safety documentation'
    ],
    deliveryInfo: 'Compliant UK ground battery shipping via tracked courier.',
    warrantyInfo: '18-Month UK Warranty.',
    variants: [
      {
        id: 'color',
        name: 'Casing Color',
        options: [
          { label: 'Space Charcoal', value: 'space-charcoal', inStock: true },
          { label: 'Silver Mist', value: 'silver-mist', inStock: true }
        ]
      }
    ]
  },

  // 7. Ergonomic Mouse
  {
    id: 'bgt-mou-300',
    title: 'SilentGlide Ergonomic Wireless Mouse with Dual Bluetooth & 2.4G',
    slug: 'silentglide-ergonomic-wireless-mouse',
    category: 'electronics',
    categoryLabel: 'Electronics & Technology',
    subcategory: 'Peripherals & Gaming',
    brand: 'BlueGate Tech',
    price: 24.99,
    compareAtPrice: 32.99,
    rating: 4.6,
    reviewCount: 54,
    isNew: false,
    isBestSeller: false,
    isFeatured: false,
    stockCount: 42,
    inStock: true,
    sku: 'BGT-PER-3007',
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=900&auto=format&fit=crop&q=85'
    ],
    shortDescription: '90% silent micro-switches with contoured natural palm rest, 4,000 DPI optical sensor, and rechargeable USB-C battery.',
    description: 'Designed for quiet library study, open-plan offices, and home studios. Effortlessly toggle between 3 connected devices at the click of a button.',
    specifications: {
      'Sensor': 'Adjustable Optical (800 / 1200 / 2400 / 4000 DPI)',
      'Acoustics': 'Whisper-quiet silent switches (<20dB click)',
      'Battery': 'Rechargeable 500mAh (Up to 70 days per charge)',
      'Weight': '88g ergonomic balance'
    },
    includedInBox: [
      'SilentGlide Mouse',
      'Nano USB 2.4GHz Dongle',
      'Type-C Charging Cable',
      'Quick Start Guide'
    ],
    deliveryInfo: 'Fast dispatch from UK distribution center.',
    warrantyInfo: '12-Month UK Warranty.',
    variants: [
      {
        id: 'color',
        name: 'Color',
        options: [
          { label: 'Matte Slate', value: 'matte-slate', inStock: true },
          { label: 'Off-White', value: 'off-white', inStock: true }
        ]
      }
    ]
  },

  // 8. 4K Webcam
  {
    id: 'bgt-cam-650',
    title: 'Lumina Studio 4K Ultra-HD Streaming Webcam with Privacy Shutter',
    slug: 'lumina-studio-4k-webcam',
    category: 'electronics',
    categoryLabel: 'Electronics & Technology',
    subcategory: 'Webcams & Display',
    brand: 'Lumina',
    price: 59.99,
    compareAtPrice: 79.99,
    rating: 4.8,
    reviewCount: 41,
    isNew: true,
    isBestSeller: false,
    isFeatured: false,
    badge: '4K Ultra-HD',
    stockCount: 22,
    inStock: true,
    sku: 'BGT-CAM-6508',
    images: [
      'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=900&auto=format&fit=crop&q=85'
    ],
    shortDescription: 'Sony STARVIS sensor with AI auto-framing, dual stereo noise-cancelling microphones, and physical privacy lens slider.',
    description: 'Elevate Zoom, Microsoft Teams, and streaming broadcasts. Superb low-light dynamic range balances skin tones under harsh fluorescent or window lighting.',
    specifications: {
      'Resolution': '4K @ 30fps / 1080p @ 60fps',
      'Field of View': '90° Wide Angle with distortion correction',
      'Microphones': 'Dual Omnidirectional with AI noise reduction',
      'Mount': 'Universal monitor clip with 1/4" tripod brass thread'
    },
    includedInBox: [
      'Lumina Studio 4K Webcam',
      'Integrated physical privacy shutter',
      'Mini desktop tripod',
      '1.8m USB-C to USB-A cable'
    ],
    deliveryInfo: 'Royal Mail tracked UK dispatch.',
    warrantyInfo: '1-Year UK Warranty.'
  },

  // =================== TOYS & GAMES ===================
  // 9. STEM Coding Bot
  {
    id: 'bgt-toy-101',
    title: 'RoboMaster STEM Programmable Explorer Robot Kit (Ages 8-14)',
    slug: 'robomaster-stem-programmable-robot-kit',
    category: 'toys',
    categoryLabel: 'Toys & Games',
    subcategory: 'STEM & Robotics',
    brand: 'RoboMaster STEM',
    price: 64.99,
    compareAtPrice: 84.99,
    rating: 4.9,
    reviewCount: 73,
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    badge: 'STEM Certified',
    stockCount: 26,
    inStock: true,
    sku: 'BGT-TOY-1011',
    images: [
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=900&auto=format&fit=crop&q=85'
    ],
    shortDescription: 'Hands-on robotics engineering kit with ultrasonic obstacle avoidance, line tracking, and Scratch/Python block coding.',
    description: 'Build confidence in robotics and computer science. Children construct the motorized explorer from modular snap-fit components, then code real autonomous behaviors through an intuitive tablet/phone app or PC software.',
    specifications: {
      'Age Recommendation': '8 to 14 Years',
      'Sensors Included': 'Ultrasonic Distance, Dual Optical Line Tracker, Gyroscope',
      'Coding Languages': 'Block-based Scratch 3.0 & Text Python',
      'Assembly Time': 'Approx. 45–60 minutes (no soldering required)',
      'Safety Standard': 'CE & UKCA Certified, BS EN 71 Non-toxic ABS plastics'
    },
    includedInBox: [
      'Main robotic logic brain core',
      '2x High-torque precision geared DC motors',
      'Caterpillar tread & omni-wheel modules',
      'Ultrasonic distance eye sensor module',
      'Rechargeable 1,800mAh safety battery pack',
      'Full-color UK curriculum activity workbook'
    ],
    deliveryInfo: 'Tracked UK courier delivery with signature options.',
    warrantyInfo: '12-Month UK Toy & STEM Guarantee.',
    faqs: [
      {
        question: 'Is an iPad or tablet strictly required?',
        answer: 'The kit includes infrared manual remote control for instant driving out-of-the-box. Advanced programming is accessed via free iOS, Android, or Windows software.'
      }
    ]
  },

  // 10. Modular Architecture Set
  {
    id: 'bgt-toy-102',
    title: 'MegaArchitect 1,280-Piece Skyline Metropolis Modular Building Set',
    slug: 'megaarchitect-modular-city-building-set',
    category: 'toys',
    categoryLabel: 'Toys & Games',
    subcategory: 'Building & Construction',
    brand: 'MegaArchitect',
    price: 49.99,
    compareAtPrice: 69.99,
    rating: 4.8,
    reviewCount: 59,
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    badge: '1,280 Pieces',
    stockCount: 18,
    inStock: true,
    sku: 'BGT-TOY-1022',
    images: [
      'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=900&auto=format&fit=crop&q=85'
    ],
    shortDescription: 'Precision engineered architectural micro-bricks recreating iconic global bridge and skyscraper landmarks in stunning detail.',
    description: 'A rewarding tactile challenge for older kids, teens, and adult builders. Compatible with all major construction block standards, featuring custom illuminated LED light strip bricks.',
    specifications: {
      'Piece Count': '1,280 High-Precision Bricks',
      'Age Guidance': '9 Years to Adult',
      'Finished Size': '48cm Length x 18cm Width x 28cm Height',
      'Materials': 'High-tensile virgin ABS plastic',
      'Lighting': 'Included USB-powered LED micro-wire system'
    },
    includedInBox: [
      '1,280 Numbered sorted building blocks',
      'Sturdy landscape display baseplate',
      'Warm white micro LED wire kit',
      'Brick separator tool',
      'Spiral-bound illustrated instruction manual'
    ],
    deliveryInfo: 'Packaged in heavy-duty shipping box to protect collectable packaging.',
    warrantyInfo: 'Free missing-piece replacement service within the UK.'
  },

  // 11. Kinetic Marble Run
  {
    id: 'bgt-toy-103',
    title: 'KineticGravity 150-Piece Transparent STEM Marble Run System',
    slug: 'kineticgravity-transparent-marble-run',
    category: 'toys',
    categoryLabel: 'Toys & Games',
    subcategory: 'STEM & Robotics',
    brand: 'KineticPlay',
    price: 32.99,
    compareAtPrice: 42.99,
    rating: 4.7,
    reviewCount: 84,
    isNew: false,
    isBestSeller: false,
    isFeatured: false,
    stockCount: 35,
    inStock: true,
    sku: 'BGT-TOY-1033',
    images: [
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=900&auto=format&fit=crop&q=85'
    ],
    shortDescription: 'Spiral vortexes, centrifugal funnels, and motorized marble lift elevator with 30 glass marbles.',
    description: 'Watch physics and kinetic potential energy in action. Crystal-clear interlocking tubes let children track the marbles through every loop, drops, and hairpin curve.',
    specifications: {
      'Pieces': '150 Snap-Fit Modular Components',
      'Marbles Included': '30 Smooth glass marbles',
      'Elevator': 'Battery-operated automated helical lift',
      'Certifications': 'UKCA & CE Safe Toy Standards'
    },
    includedInBox: [
      '120 Translucent track tubes & slides',
      'Motorized helical lift tower',
      '30 Standard glass marbles',
      'Illustrated challenge blueprints booklet'
    ],
    deliveryInfo: 'Fast dispatch across the UK.',
    warrantyInfo: 'BlueGate 1-Year Toy Guarantee.'
  },

  // 12. RC All-Terrain Buggy
  {
    id: 'bgt-toy-104',
    title: 'TerraTrack 1:16 High-Speed 4WD RC Off-Road Stunt Buggy 2.4GHz',
    slug: 'terratrack-high-speed-rc-buggy',
    category: 'toys',
    categoryLabel: 'Toys & Games',
    subcategory: 'RC & Stunt',
    brand: 'TerraTrack',
    price: 38.99,
    compareAtPrice: 49.99,
    rating: 4.8,
    reviewCount: 46,
    isNew: true,
    isBestSeller: false,
    isFeatured: false,
    badge: '30 km/h Top Speed',
    stockCount: 20,
    inStock: true,
    sku: 'BGT-TOY-1044',
    images: [
      'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=900&auto=format&fit=crop&q=85'
    ],
    shortDescription: 'Dual high-speed 380 brushed motors, independent oil-filled suspension, and anti-skid TPR all-terrain tyres.',
    description: 'Tackles gravel, grass, pavement, and dirt ramps effortlessly. Features proportional steering control for precise navigation and includes dual rechargeable modular battery packs for 40+ minutes of total driving time.',
    specifications: {
      'Scale': '1:16 High-Racer Chassis',
      'Top Speed': 'Up to 30 km/h (18.6 mph)',
      'Control Range': 'Up to 80 meters (2.4GHz anti-interference)',
      'Drive System': 'Full-Time 4-Wheel Drive (4WD)',
      'Batteries': '2x 7.4V 1,200mAh Li-ion packs included'
    },
    includedInBox: [
      'TerraTrack 4WD RC Buggy',
      '2.4GHz Pistol Grip Transmitter',
      '2x Modular rechargeable battery packs',
      'USB Safe Balance Charger',
      'Lug wrench & spare body clip pins'
    ],
    deliveryInfo: 'UK Mainland tracked delivery within 2-3 business days.',
    warrantyInfo: '90-Day Parts & Mechanical Warranty.'
  },

  // 13. Handcrafted Wooden Chess & Backgammon
  {
    id: 'bgt-toy-105',
    title: 'Grandmaster 15" Handcrafted Magnetic Solid Walnut Chess & Backgammon Set',
    slug: 'grandmaster-handcrafted-wooden-chess-set',
    category: 'toys',
    categoryLabel: 'Toys & Games',
    subcategory: 'Classic Strategy',
    brand: 'Grandmaster Games',
    price: 34.99,
    compareAtPrice: 48.00,
    rating: 4.9,
    reviewCount: 67,
    isNew: false,
    isBestSeller: true,
    isFeatured: false,
    stockCount: 15,
    inStock: true,
    sku: 'BGT-TOY-1055',
    images: [
      'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=900&auto=format&fit=crop&q=85'
    ],
    shortDescription: 'Carved solid walnut and maple folding board with weighted magnetic pieces and velvet storage interior.',
    description: 'A classic 2-in-1 heirloom set featuring Staunton chess pieces on one side and a backgammon arena on the interior. Magnetic bases prevent accidental piece displacement while playing at home or travelling.',
    specifications: {
      'Board Dimensions': '38cm x 38cm (15" x 15") open',
      'King Height': '7.6cm (3") with weighted brass core',
      'Wood Species': 'Natural Solid Walnut and Maple Inlay',
      'Finish': 'Hand-polished satin protective lacquer'
    },
    includedInBox: [
      'Solid Walnut folding game board',
      '32 Weighted magnetic carved chessmen (extra 2 Queens)',
      '30 Wooden backgammon / draughts checkers',
      '4 Wooden dice + 1 doubling cube',
      'Protective cloth travel dust sleeve'
    ],
    deliveryInfo: 'Shipped securely in padded protective packaging.',
    warrantyInfo: 'Lifetime Workmanship Guarantee.'
  },

  // =================== HOME & EVERYDAY ESSENTIALS ===================
  // 14. Desk LED Lamp
  {
    id: 'bgt-hom-201',
    title: 'AuraGlow Minimalist Aluminum LED Desk Lamp with Wireless Charging Base',
    slug: 'auraglow-minimalist-led-desk-lamp',
    category: 'home',
    categoryLabel: 'Home & Everyday Essentials',
    subcategory: 'Modern Lighting',
    brand: 'AuraGlow Living',
    price: 29.99,
    compareAtPrice: 39.99,
    rating: 4.8,
    reviewCount: 82,
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    badge: 'Qi Wireless Base',
    stockCount: 33,
    inStock: true,
    sku: 'BGT-HOM-2011',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=900&auto=format&fit=crop&q=85'
    ],
    shortDescription: 'Architect-grade anodized aluminum arm with 5 color temperatures, stepless touch dimming, and 10W wireless charging pad.',
    description: 'Eliminate screen glare and eye fatigue. Honeycomb light diffusion panel produces flicker-free, RG0 blue-light certified illumination. The weighted base integrates a fast 10W Qi induction pad for charging smartphones.',
    specifications: {
      'Color Temperature': '2700K (Warm Glow) to 6500K (Daylight Focus)',
      'Brightness': 'Up to 900 Lumens (CRI > 95 for true color accuracy)',
      'Wireless Output': '10W / 7.5W Qi Certified Charging Pad',
      'Adjustability': 'Dual 180° swivel hinges with 90° rotating head'
    },
    includedInBox: [
      'AuraGlow Aluminum LED Desk Lamp',
      'UK 3-Pin Safety Approved Power Adapter (1.8m)',
      'Instruction manual'
    ],
    deliveryInfo: 'Tracked UK delivery within 48 hours.',
    warrantyInfo: '2-Year UK Replacement Warranty.'
  },

  // 15. Aroma Diffuser
  {
    id: 'bgt-hom-202',
    title: 'NordicMist 350ml Ceramic Ultrasonic Essential Oil Diffuser',
    slug: 'nordicmist-ceramic-aroma-diffuser',
    category: 'home',
    categoryLabel: 'Home & Everyday Essentials',
    subcategory: 'Smart Gadgets',
    brand: 'NordicMist',
    price: 26.99,
    compareAtPrice: 34.99,
    rating: 4.7,
    reviewCount: 61,
    isNew: true,
    isBestSeller: false,
    isFeatured: false,
    stockCount: 29,
    inStock: true,
    sku: 'BGT-HOM-2022',
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=900&auto=format&fit=crop&q=85'
    ],
    shortDescription: 'Handcrafted ribbed matte ceramic cover with whisper-quiet 24dB ultrasonic atomization and ambient candlelight warm glow.',
    description: 'Transform bedrooms and home offices into tranquil sanctuaries. Operates continuously for up to 10 hours on a single fill with automated safety auto-shutoff when the water chamber empties.',
    specifications: {
      'Capacity': '350ml BPA-free water tank',
      'Coverage': 'Up to 30 square meters',
      'Timer Modes': '1h / 3h / 6h / Continuous',
      'Sound Level': 'Whisper-quiet < 24dB'
    },
    includedInBox: [
      'NordicMist Ceramic Diffuser',
      'UK Power Supply',
      'Water measuring cup',
      'Care & cleaning guide'
    ],
    deliveryInfo: 'Fast dispatch from UK warehouse.',
    warrantyInfo: '1-Year Limited Warranty.'
  },

  // 16. Precision Kitchen Scale
  {
    id: 'bgt-hom-203',
    title: 'AccuChef 0.1g Precision Digital Kitchen & Coffee Brew Scale',
    slug: 'accuchef-precision-digital-food-scale',
    category: 'home',
    categoryLabel: 'Home & Everyday Essentials',
    subcategory: 'Kitchen Precision',
    brand: 'AccuChef',
    price: 18.99,
    compareAtPrice: 24.99,
    rating: 4.8,
    reviewCount: 95,
    isNew: false,
    isBestSeller: true,
    isFeatured: false,
    badge: '0.1g Precision',
    stockCount: 48,
    inStock: true,
    sku: 'BGT-HOM-2033',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=900&auto=format&fit=crop&q=85'
    ],
    shortDescription: 'Brushed 304 food-grade stainless steel platform with high-precision strain gauge sensors and built-in brew timer.',
    description: 'Perfect for espresso brewing, culinary baking, and meal prep portion control. High-contrast reverse-backlit LCD screen displays measurements clearly in grams, ounces, milliliters, and pounds.',
    specifications: {
      'Measuring Range': '0.1g to 3,000g (3kg max capacity)',
      'Units': 'g, oz, ml, lb:oz',
      'Features': 'Tare function, auto-off, integrated stopwatch timer',
      'Power': 'Type-C rechargeable lithium battery'
    },
    includedInBox: [
      'AccuChef Digital Scale',
      'Removable non-slip silicone heat pad',
      'USB-C charging cord',
      'Instruction manual'
    ],
    deliveryInfo: 'UK tracked post dispatch.',
    warrantyInfo: '2-Year Warranty.'
  },

  // 17. Cable Management Clips
  {
    id: 'bgt-hom-204',
    title: 'DeskFlow Weighted Silicone 5-Slot Desk Cable Organizer (2-Pack)',
    slug: 'deskflow-silicone-cable-organizer-2pack',
    category: 'home',
    categoryLabel: 'Home & Everyday Essentials',
    subcategory: 'Desk & Workspace',
    brand: 'DeskFlow',
    price: 12.99,
    compareAtPrice: 16.99,
    rating: 4.6,
    reviewCount: 38,
    isNew: false,
    isBestSeller: false,
    isFeatured: false,
    stockCount: 60,
    inStock: true,
    sku: 'BGT-HOM-2044',
    images: [
      'https://images.unsplash.com/photo-1541140532154-b024d705b909?w=900&auto=format&fit=crop&q=85'
    ],
    shortDescription: 'Weighted steel core wrapped in non-scratch eco-friendly silicone with strong traceless 3M adhesive base.',
    description: 'Keep your charging cables, HDMI cords, and mouse lines neatly anchored at the edge of your desk. Prevents dropped cables behind furniture.',
    specifications: {
      'Slots': '5 flexible slots (cables up to 6mm diameter)',
      'Base': 'Steel weighted plate + 3M residue-free micro-suction pad',
      'Pack Size': 'Includes 2 identical units'
    },
    includedInBox: [
      '2x DeskFlow 5-Slot Cable Organizers',
      '2x Extra 3M replacement pads',
      'Surface prep alcohol wipes'
    ],
    deliveryInfo: 'In stock. Same day dispatch if ordered before 2pm.',
    warrantyInfo: '12-Month Quality Guarantee.'
  },

  // =================== LIFESTYLE & PERSONAL ACCESSORIES ===================
  // 18. RFID Cardholder
  {
    id: 'bgt-lif-301',
    title: 'Aegis Elite RFID-Blocking Minimalist Aerospace Aluminium Wallet',
    slug: 'aegis-elite-rfid-blocking-aluminum-wallet',
    category: 'lifestyle',
    categoryLabel: 'Lifestyle & Personal Accessories',
    subcategory: 'Minimalist Wallets',
    brand: 'Aegis Gear',
    price: 22.99,
    compareAtPrice: 32.99,
    rating: 4.9,
    reviewCount: 118,
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    badge: 'RFID Protected',
    stockCount: 36,
    inStock: true,
    sku: 'BGT-LIF-3011',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=900&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=900&auto=format&fit=crop&q=85'
    ],
    shortDescription: 'Quick-access pop-up card mechanism with aerospace anodized 6061-T6 aluminum shielding and spring-steel cash clip.',
    description: 'Slender front-pocket profile holds up to 6 credit cards in the shielded chamber plus banknotes and ID cards under the exterior carbon-fiber money clip. Patented trigger fans cards in an ergonomic cascading array.',
    specifications: {
      'Capacity': '6 cards in ejector + 4 exterior cards / cash',
      'RFID Protection': 'Blocks 13.56 MHz RFID/NFC skimming frequencies',
      'Dimensions': '10.2cm x 6.3cm x 0.8cm ultra-slim',
      'Weight': 'Only 62g'
    },
    includedInBox: [
      'Aegis Elite Minimalist Card Wallet',
      'Matte black gift presentation box',
      'Maintenance micro-tool'
    ],
    deliveryInfo: 'Dispatched via Royal Mail 48 Tracked.',
    warrantyInfo: 'Lifetime Mechanical Warranty.',
    variants: [
      {
        id: 'color',
        name: 'Finish',
        options: [
          { label: 'Matte Gunmetal', value: 'gunmetal', inStock: true },
          { label: 'Brushed Silver', value: 'brushed-silver', inStock: true }
        ]
      }
    ]
  },

  // 19. Insulated Travel Flask
  {
    id: 'bgt-lif-302',
    title: 'HydroTherm 750ml Vacuum-Insulated Stainless Steel Travel Flask',
    slug: 'hydrotherm-vacuum-insulated-travel-flask',
    category: 'lifestyle',
    categoryLabel: 'Lifestyle & Personal Accessories',
    subcategory: 'Thermal Drinkware',
    brand: 'HydroTherm',
    price: 19.99,
    compareAtPrice: 26.99,
    rating: 4.8,
    reviewCount: 77,
    isNew: false,
    isBestSeller: false,
    isFeatured: false,
    stockCount: 40,
    inStock: true,
    sku: 'BGT-LIF-3022',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=900&auto=format&fit=crop&q=85'
    ],
    shortDescription: 'Double-wall copper vacuum insulation keeping drinks icy cold for 24 hours or piping hot for 12 hours. 100% leakproof lid.',
    description: 'Crafted from food-grade 18/8 pro-grade stainless steel that preserves pure flavor without metallic aftertaste. Powder-coated sweat-free matte finish fits all standard UK vehicle cup holders.',
    specifications: {
      'Capacity': '750ml (25 oz)',
      'Insulation': 'TempShield Double-Wall Copper Vacuum',
      'Material': '18/8 Kitchen-Grade Pro Stainless Steel (BPA & Toxin Free)',
      'Mouth Diameter': 'Wide mouth accommodates standard ice cubes'
    },
    includedInBox: [
      'HydroTherm 750ml Thermal Flask',
      'Leakproof insulated flex cap',
      'Carabiner clip'
    ],
    deliveryInfo: 'Tracked dispatch from UK depot.',
    warrantyInfo: '5-Year Insulation Guarantee.',
    variants: [
      {
        id: 'color',
        name: 'Colorway',
        options: [
          { label: 'Nordic Forest Green', value: 'forest-green', inStock: true },
          { label: 'Deep Ocean Blue', value: 'ocean-blue', inStock: true },
          { label: 'Arctic White', value: 'arctic-white', inStock: true }
        ]
      }
    ]
  },

  // 20. Tech Travel Organizer Case
  {
    id: 'bgt-lif-303',
    title: 'TechShield EVA Hard-Shell Electronics Travel Organizer Case',
    slug: 'techshield-hard-shell-electronics-travel-case',
    category: 'lifestyle',
    categoryLabel: 'Lifestyle & Personal Accessories',
    subcategory: 'Tech Travel Cases',
    brand: 'TechShield',
    price: 16.99,
    compareAtPrice: 22.99,
    rating: 4.7,
    reviewCount: 52,
    isNew: true,
    isBestSeller: false,
    isFeatured: false,
    stockCount: 50,
    inStock: true,
    sku: 'BGT-LIF-3033',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=900&auto=format&fit=crop&q=85'
    ],
    shortDescription: 'Shockproof water-repellent EVA outer shell with custom elastic organizer loops and dual zippered mesh compartments.',
    description: 'Consolidate all chargers, power banks, SSD hard drives, earbuds, stylus pens, and SD memory cards in one organized, drop-resistant travel pouch. Slips easily into backpacks and carry-on luggage.',
    specifications: {
      'Material': 'High-density ballistic EVA with water-resistant 900D nylon fabric',
      'Zippers': 'Smooth YKK dual metal zip pulls',
      'Dimensions': '24cm x 17cm x 6cm compact briefcase style',
      'Weight': '210g'
    },
    includedInBox: [
      'TechShield Hard-Shell Electronics Organizer',
      'Removable wrist carry strap',
      '3x Hook-and-loop cable ties'
    ],
    deliveryInfo: 'Fast dispatch across all UK postcodes.',
    warrantyInfo: '12-Month Quality Guarantee.'
  }
];
