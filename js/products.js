/**
 * STACKLY LUXURY WATCHES — Centralized Product Catalog
 * Brand: STACKLY — Time, Crafted to Last.
 * Single source of truth for all products across the entire website.
 */

const STACKLY_PRODUCTS = [
  {
    id: 'chronos-type-0',
    name: 'CHRONOS TYPE-0',
    tagline: 'Skeletonized Tourbillon Flagship Timepiece',
    collection: 'limited',
    collectionName: 'Limited Editions',
    price: 48500,
    formattedPrice: '$48,500',
    image: './images/chronos-type-0.webp',
    gallery: [
      './images/chronos-type-0.webp',
      './images/craft-movement.webp',
      './images/craft-materials.webp',
      './images/craft-dial.webp'
    ],
    movement: 'Caliber ST-01 Flying Tourbillon (Manual-Wind)',
    movementType: 'tourbillon',
    caseMaterial: 'Grade 5 Titanium & Obsidian Ceramic Bezel',
    caseType: 'titanium',
    dialColor: 'black',
    strapMaterial: 'Hand-Stitched Matte Black Alligator with Titanium Deployant Clasp',
    strapType: 'alligator',
    caseDiameter: '41 mm',
    caseThickness: '10.8 mm',
    waterResistance: '50 m / 5 ATM',
    powerReserve: '72 Hours',
    frequency: '28,800 vph (4 Hz)',
    availability: 'Limited Edition — 25 Pieces Worldwide',
    bestseller: true,
    isNewArrival: false,
    variants: ['black', 'gold'],
    isFlagship: true,
    rating: 5.0,
    reviewsCount: 14,
    description: 'The pinnacle of STACKLY haute horlogerie. CHRONOS TYPE-0 unifies an openworked flying tourbillon caliber with an aeronautical Grade 5 titanium chassis, mirror-polished rhodium bridges, and double-domed sapphire crystal. Every component is beveled, polished, and assembled by a single master watchmaker over six months of dedicated craftsmanship.',
    highlights: [
      'Single-axis flying tourbillon cage completing one rotation per minute',
      'Skeletonized multi-level dial reveals the hand-polished gear train',
      'Double-domed sapphire crystal with multi-layer anti-reflective treatment',
      'Architectural rhodium bridges hand-beveled with diamond paste'
    ]
  },
  {
    id: 'aethelgard-classic',
    name: 'Aethelgard Classic',
    tagline: 'Pure Sartorial Grand Feu Dress Watch',
    collection: 'dress',
    collectionName: 'Classic Dress Watches',
    price: 14200,
    formattedPrice: '$14,200',
    image: './images/aethelgard-classic.webp',
    gallery: [
      './images/aethelgard-classic.webp',
      './images/craft-dial.webp',
      './images/craft-movement.webp'
    ],
    movement: 'Caliber ST-102 Ultra-Thin Manual-Wind',
    movementType: 'manual',
    caseMaterial: '950 Solid Platinum',
    caseType: 'platinum',
    dialColor: 'silver',
    strapMaterial: 'Espresso Matte Alligator Leather',
    strapType: 'alligator',
    caseDiameter: '39 mm',
    caseThickness: '7.4 mm',
    waterResistance: '30 m / 3 ATM',
    powerReserve: '50 Hours',
    frequency: '21,600 vph (3 Hz)',
    availability: 'In Stock — Boutique Allocation',
    bestseller: true,
    isNewArrival: false,
    variants: ['silver', 'black'],
    isFlagship: false,
    rating: 4.9,
    reviewsCount: 22,
    description: 'An enduring monument to traditional dress watch proportions. Aethelgard Classic features a genuine grand feu silver-white enamel dial accented by faceted rhodium spear indices and leaf-shaped hands. The 7.4mm slim profile rests weightlessly beneath the finest tailored shirt cuffs.',
    highlights: [
      'Grand feu enamel dial baked at 800°C for permanent luster',
      'Solid 950 platinum three-part case with mirror polishing',
      'Sapphire exhibition back revealing Geneva stripes on the bridges',
      'Hand-stitched semi-matte Louisiana alligator strap'
    ]
  },
  {
    id: 'vanguard-chronograph',
    name: 'Vanguard Chronograph',
    tagline: 'High-Performance Column-Wheel Flyback',
    collection: 'sport',
    collectionName: 'Sport & Chronograph',
    price: 19800,
    formattedPrice: '$19,800',
    image: './images/vanguard-chronograph.webp',
    gallery: [
      './images/vanguard-chronograph.webp',
      './images/craft-materials.webp',
      './images/craft-movement.webp'
    ],
    movement: 'Caliber ST-204 Automatic Flyback Chronograph',
    movementType: 'automatic',
    caseMaterial: 'Satin-Brushed Obsidian DLC Stainless Steel',
    caseType: 'steel',
    dialColor: 'black',
    strapMaterial: 'Perforated Racing Calfskin with Deployant Clasp',
    strapType: 'alligator',
    caseDiameter: '42 mm',
    caseThickness: '12.6 mm',
    waterResistance: '100 m / 10 ATM',
    powerReserve: '60 Hours',
    frequency: '28,800 vph (4 Hz)',
    availability: 'In Stock — Ready for Insured Delivery',
    bestseller: true,
    isNewArrival: false,
    variants: ['black', 'gold'],
    isFlagship: false,
    rating: 4.8,
    reviewsCount: 31,
    description: 'Engineered for precision timing and refined sportsmanship. Vanguard Chronograph employs an integrated column-wheel and vertical clutch mechanism to deliver crisp, instantaneous chronograph tactile actuation. Obsidian DLC finishing offers superlative scratch resistance.',
    highlights: [
      'Integrated column-wheel chronograph with flyback function',
      'Ceramic tachymeter bezel engraved and filled with liquid platinum',
      'Bi-compax chronograph sub-dials with snailed azuré finishing',
      'Water resistant to 100 meters with screw-locked crown and pushers'
    ]
  },
  {
    id: 'solis-minimalist',
    name: 'Solis Minimalist',
    tagline: 'Anthracite Sunburst Monolithic Purity',
    collection: 'minimalist',
    collectionName: 'Modern Minimalist',
    price: 9600,
    formattedPrice: '$9,600',
    image: './images/solis-minimalist.webp',
    gallery: [
      './images/solis-minimalist.webp',
      './images/craft-dial.webp',
      './images/craft-materials.webp'
    ],
    movement: 'Caliber ST-088 Ultra-Thin Automatic',
    movementType: 'automatic',
    caseMaterial: '316L Brushed Architectural Stainless Steel',
    caseType: 'steel',
    dialColor: 'anthracite',
    strapMaterial: 'Slate Grey Suede Leather',
    strapType: 'suede',
    caseDiameter: '38 mm',
    caseThickness: '6.8 mm',
    waterResistance: '50 m / 5 ATM',
    powerReserve: '45 Hours',
    frequency: '28,800 vph (4 Hz)',
    availability: 'In Stock',
    bestseller: true,
    isNewArrival: true,
    variants: ['silver', 'black'],
    isFlagship: false,
    rating: 4.9,
    reviewsCount: 19,
    description: 'Essentialism elevated to an art form. Solis Minimalist reduces horological design to its most poetic lines. The brushed anthracite dial captures light dynamically, punctuated only by delicate rhodium baton indices and razor-thin needle hands.',
    highlights: [
      'Architectural 38mm monolithic case with seamless integrated lugs',
      'Micro-rotor automatic caliber allowing an ultra-slim 6.8mm profile',
      'Anti-reflective sapphire crystal with flush bezel integration',
      'Bespoke Italian suede strap with quick-release spring bars'
    ]
  },
  {
    id: 'heritage-automatic',
    name: 'Heritage Automatic',
    tagline: 'Clous de Paris Guilloché Classic',
    collection: 'automatic',
    collectionName: 'Automatic Watches',
    price: 12500,
    formattedPrice: '$12,500',
    image: './images/heritage-automatic.webp',
    gallery: [
      './images/heritage-automatic.webp',
      './images/craft-dial.webp',
      './images/craft-movement.webp'
    ],
    movement: 'Caliber ST-301 Automatic with Tungsten Rotor',
    movementType: 'automatic',
    caseMaterial: 'Mirror-Polished 316L Stainless Steel',
    caseType: 'steel',
    dialColor: 'silver',
    strapMaterial: 'Ebony English Bridle Leather',
    strapType: 'alligator',
    caseDiameter: '40 mm',
    caseThickness: '9.2 mm',
    waterResistance: '50 m / 5 ATM',
    powerReserve: '55 Hours',
    frequency: '28,800 vph (4 Hz)',
    availability: 'In Stock — Limited Allocation',
    bestseller: true,
    isNewArrival: false,
    variants: ['silver', 'gold'],
    isFlagship: false,
    rating: 4.7,
    reviewsCount: 27,
    description: 'An homage to nineteenth-century horological traditions reinterpreted for contemporary life. The centerpiece is an engine-turned Clous de Paris guilloché dial created on antique rose-engine lathes, complemented by heat-blued screws visible through the exhibition caseback.',
    highlights: [
      'Engine-turned Clous de Paris dial center surrounded by opaline track',
      'Heavy tungsten oscillating weight for maximum winding efficiency',
      'Flame-blued balance screws and bevel-finished bridges',
      'Fluted crown embossed with the STACKLY monogram'
    ]
  },
  {
    id: 'nautilus-diver',
    name: 'Nautilus Diver Pro',
    tagline: 'High-Luxury Professional Submersible',
    collection: 'sport',
    collectionName: 'Sport & Chronograph',
    price: 16400,
    formattedPrice: '$16,400',
    image: './images/nautilus-diver.webp',
    gallery: [
      './images/nautilus-diver.webp',
      './images/craft-materials.webp',
      './images/craft-movement.webp'
    ],
    movement: 'Caliber ST-402 High-Shock Automatic',
    movementType: 'automatic',
    caseMaterial: 'Marine-Grade 904L Steel & Matte Ceramic Bezel',
    caseType: 'steel',
    dialColor: 'black',
    strapMaterial: 'Solid 904L Steel Bracelet with Glide Clasp',
    strapType: 'steel',
    caseDiameter: '41.5 mm',
    caseThickness: '12.0 mm',
    waterResistance: '300 m / 30 ATM',
    powerReserve: '70 Hours',
    frequency: '28,800 vph (4 Hz)',
    availability: 'In Stock',
    bestseller: true,
    isNewArrival: false,
    variants: ['silver', 'black'],
    isFlagship: false,
    rating: 4.9,
    reviewsCount: 42,
    description: 'Combining deep-ocean resilience with black-tie refinement. Nautilus Diver Pro is crafted from corrosion-impervious 904L steel with a 120-click unidirectional ceramic bezel and Grade X1 Super-LumiNova champagne-tinted hour plots.',
    highlights: [
      'Tested to 300 meters pressure with integrated helium escape valve',
      'Scratch-proof ceramic bezel insert with platinum-sputtered numerals',
      'Patented micro-adjusting bracelet clasp for tailored comfort',
      'Paramagnetic balance spring unaffected by magnetic fields'
    ]
  },
  {
    id: 'celeste-moonphase',
    name: 'Celeste Moonphase',
    tagline: 'Aventurine Astronomical Complication',
    collection: 'dress',
    collectionName: 'Classic Dress Watches',
    price: 22000,
    formattedPrice: '$22,000',
    image: './images/celeste-moonphase.webp',
    gallery: [
      './images/celeste-moonphase.webp',
      './images/craft-dial.webp',
      './images/craft-movement.webp'
    ],
    movement: 'Caliber ST-505 Astronomical Moonphase Automatic',
    movementType: 'automatic',
    caseMaterial: 'Grade 5 Titanium & Obsidian Ceramic',
    caseType: 'titanium',
    dialColor: 'blue',
    strapMaterial: 'Midnight Charcoal Alligator Leather',
    strapType: 'alligator',
    caseDiameter: '40 mm',
    caseThickness: '9.8 mm',
    waterResistance: '50 m / 5 ATM',
    powerReserve: '65 Hours',
    frequency: '28,800 vph (4 Hz)',
    availability: 'Boutique Exclusive — 50 Pieces Annually',
    bestseller: false,
    isNewArrival: true,
    variants: ['blue', 'gold'],
    isFlagship: false,
    rating: 5.0,
    reviewsCount: 9,
    description: 'A poetic rendering of celestial mechanics. The dial is hand-cut from genuine glittering aventurine glass, portraying a starry night sky above which a solid platinum moon disc tracks the lunar cycle with an accuracy deviation of only one day in 122 years.',
    highlights: [
      'Astronomical moonphase accurate for 122.6 continuous years',
      'Natural sparkling aventurine gemstone dial matrix',
      'Solid 950 platinum lunar disc engraved with craters',
      'Curved sapphire crystal echoing the arc of the celestial dome'
    ]
  },
  {
    id: 'monolith-tourbillon',
    name: 'Monolith Tourbillon',
    tagline: 'Forged Carbon & 7-Day Power Reserve',
    collection: 'limited',
    collectionName: 'Limited Editions',
    price: 54000,
    formattedPrice: '$54,000',
    image: './images/monolith-tourbillon.webp',
    gallery: [
      './images/monolith-tourbillon.webp',
      './images/craft-materials.webp',
      './images/craft-movement.webp'
    ],
    movement: 'Caliber ST-092 Twin-Barrel Tourbillon (Manual)',
    movementType: 'tourbillon',
    caseMaterial: 'Forged Carbon Fiber & Grade 5 Titanium Core',
    caseType: 'carbon',
    dialColor: 'black',
    strapMaterial: 'FKM High-Density Rubber with Titanium Deployant',
    strapType: 'rubber',
    caseDiameter: '43 mm',
    caseThickness: '11.5 mm',
    waterResistance: '100 m / 10 ATM',
    powerReserve: '168 Hours (7 Days)',
    frequency: '21,600 vph (3 Hz)',
    availability: 'Strictly Limited to 15 Numbered Pieces',
    bestseller: false,
    isNewArrival: true,
    variants: ['black'],
    isFlagship: false,
    rating: 5.0,
    reviewsCount: 6,
    description: 'Forged under extreme pressure and temperature, the Monolith case displays a unique marbling pattern that ensures no two watches are identical. Within rests an architectural 7-day power reserve movement with twin series-coupled spring barrels powering a titanium tourbillon cage.',
    highlights: [
      'High-compression forged carbon case weighing merely 48 grams',
      'Dual mainspring barrels delivering a full 7-day power reserve',
      'Anthracite ruthenium-plated movement bridges with micro-blasted relief',
      'Sapphire dial with luminous floating indices'
    ]
  },
  {
    id: 'elysium-dress',
    name: 'Elysium Ultra-Thin',
    tagline: '5.8mm Featherweight Horology',
    collection: 'dress',
    collectionName: 'Classic Dress Watches',
    price: 11800,
    formattedPrice: '$11,800',
    image: './images/elysium-dress.webp',
    gallery: [
      './images/elysium-dress.webp',
      './images/craft-dial.webp',
      './images/craft-materials.webp'
    ],
    movement: 'Caliber ST-064 Extra-Flat Hand-Wound',
    movementType: 'manual',
    caseMaterial: 'Mirror-Polished 316L Stainless Steel',
    caseType: 'steel',
    dialColor: 'silver',
    strapMaterial: 'Surgical Steel Milanese Mesh or Saddle Leather',
    strapType: 'steel',
    caseDiameter: '38.5 mm',
    caseThickness: '5.8 mm',
    waterResistance: '30 m / 3 ATM',
    powerReserve: '42 Hours',
    frequency: '21,600 vph (3 Hz)',
    availability: 'In Stock',
    bestseller: false,
    isNewArrival: false,
    variants: ['silver', 'black'],
    isFlagship: false,
    rating: 4.8,
    reviewsCount: 16,
    description: 'At a staggering 5.8mm in total thickness, Elysium redefines what is physically possible in mechanical dress watch engineering. Sunray silver opaline dial finishes interact gently with polished sword hands to create an aura of understated sovereignty.',
    highlights: [
      'Featherweight 5.8mm case profile designed for bespoke black-tie dress',
      'Manual-wind movement with fine swan-neck micrometer regulator',
      'High-density Milanese mesh bracelet woven from surgical steel',
      'Zero-glare sapphire crystal on front and exhibition caseback'
    ]
  },
  {
    id: 'meridian-gmt',
    name: 'Meridian Dual-Time GMT',
    tagline: 'Split Ceramic 24-Hour International Companion',
    collection: 'automatic',
    collectionName: 'Automatic Watches',
    price: 17500,
    formattedPrice: '$17,500',
    image: './images/meridian-gmt.webp',
    gallery: [
      './images/meridian-gmt.webp',
      './images/craft-materials.webp',
      './images/craft-movement.webp'
    ],
    movement: 'Caliber ST-610 True Independent GMT Automatic',
    movementType: 'automatic',
    caseMaterial: 'Brushed Grade 5 Titanium & Dual-Color Ceramic',
    caseType: 'titanium',
    dialColor: 'black',
    strapMaterial: 'Textured Waterproof Rubber-Leather Hybrid',
    strapType: 'rubber',
    caseDiameter: '41 mm',
    caseThickness: '11.8 mm',
    waterResistance: '150 m / 15 ATM',
    powerReserve: '65 Hours',
    frequency: '28,800 vph (4 Hz)',
    availability: 'In Stock — Ready for Dispatch',
    bestseller: false,
    isNewArrival: false,
    variants: ['black', 'blue'],
    isFlagship: false,
    rating: 4.9,
    reviewsCount: 23,
    description: 'Designed for the global navigator. Meridian features a true traveler GMT movement allowing the local hour hand to jump forward or backward in one-hour increments without stopping the seconds or altering home time. The split obsidian and slate ceramic bezel indicates day and night.',
    highlights: [
      'Jumping local-time hour hand with instantaneous date synchronization',
      'Bi-directional 24-hour ceramic bezel with laser-engraved markers',
      'Lightweight Grade 5 titanium case with satin-chamfered lugs',
      'Super-LumiNova luminescence on hands, markers, and GMT arrow'
    ]
  },
  {
    id: 'artisan-skeleton',
    name: 'Artisan Skeletonized',
    tagline: 'Openworked Caliber with Hand-Engraved Bridges',
    collection: 'limited',
    collectionName: 'Limited Editions',
    price: 36000,
    formattedPrice: '$36,000',
    image: './images/artisan-skeleton.webp',
    gallery: [
      './images/artisan-skeleton.webp',
      './images/craft-movement.webp',
      './images/craft-dial.webp'
    ],
    movement: 'Caliber ST-701 Openworked Manual-Wind',
    movementType: 'manual',
    caseMaterial: 'Obsidian Black Ceramic & Grade 5 Titanium Accents',
    caseType: 'ceramic',
    dialColor: 'black',
    strapMaterial: 'Hand-Burnished French Calfskin',
    strapType: 'alligator',
    caseDiameter: '40.5 mm',
    caseThickness: '9.6 mm',
    waterResistance: '50 m / 5 ATM',
    powerReserve: '58 Hours',
    frequency: '28,800 vph (4 Hz)',
    availability: 'Limited Edition — 30 Pieces Annually',
    bestseller: false,
    isNewArrival: true,
    variants: ['black', 'silver'],
    isFlagship: false,
    rating: 5.0,
    reviewsCount: 11,
    description: 'Horology stripped of all non-essential matter. Caliber ST-701 is pierced, beveled, and engraved entirely by hand, leaving an airy web of bridges in hand-beveled rhodium holding the escapement and gear train in visual suspension.',
    highlights: [
      'Over 140 hours of hand-filing, anglage, and bridge beveling per watch',
      'Scratch-proof obsidian ceramic case flanked by mirror-polished titanium screws',
      'Open view through both front and rear sapphire crystals',
      'Variable-inertia balance wheel with four platinum regulating screws'
    ]
  },
  {
    id: 'imperium-platinum',
    name: 'Imperium Perpetual',
    tagline: 'Grand Complication Programmed Until Year 2100',
    collection: 'limited',
    collectionName: 'Limited Editions',
    price: 62000,
    formattedPrice: '$62,000',
    image: './images/imperium-platinum.webp',
    gallery: [
      './images/imperium-platinum.webp',
      './images/craft-movement.webp',
      './images/craft-dial.webp'
    ],
    movement: 'Caliber ST-880 Perpetual Calendar Automatic',
    movementType: 'automatic',
    caseMaterial: '950 Solid Platinum',
    caseType: 'platinum',
    dialColor: 'silver',
    strapMaterial: 'Hand-Stitched Matte Black Alligator Leather',
    strapType: 'alligator',
    caseDiameter: '42 mm',
    caseThickness: '12.2 mm',
    waterResistance: '30 m / 3 ATM',
    powerReserve: '68 Hours',
    frequency: '28,800 vph (4 Hz)',
    availability: 'By Bespoke Commission Only',
    bestseller: false,
    isNewArrival: true,
    variants: ['silver', 'gold'],
    isFlagship: false,
    rating: 5.0,
    reviewsCount: 7,
    description: 'The ultimate expression of mechanical memory. The Imperium Perpetual Calendar accounts mechanically for months of varying lengths and leap years without requiring human adjustment until the secular year 2100. Cast in pure, heavy 950 solid platinum.',
    highlights: [
      'Mechanically programmed perpetual calendar displaying day, date, month, leap year, and moonphase',
      'Forged in solid 950 platinum with characteristic discreet diamond between 6 o clock lugs',
      'Heavy 950 platinum winding rotor with hand-guilloché motif',
      'Discreet inset case correctors with complimentary platinum setting stylus included'
    ]
  }
];

// Helper functions for easy querying across all pages
function getCatalog() {
  try {
    const custom = localStorage.getItem('stacklyCustomProducts');
    if (custom) {
      const parsed = JSON.parse(custom);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return STACKLY_PRODUCTS;
}

function getProductById(id) {
  const catalog = getCatalog();
  return catalog.find(p => p.id === id) || catalog[0];
}

function getBestsellerProducts() {
  return getCatalog().filter(p => p.bestseller);
}

function getNewArrivalProducts() {
  return getCatalog().filter(p => p.isNewArrival);
}

function getProductsByCollection(collection) {
  const catalog = getCatalog();
  if (!collection || collection === 'all') return catalog;
  return catalog.filter(p => p.collection === collection);
}

function filterProducts(filters = {}) {
  let list = getCatalog();

  if (filters.collection && filters.collection !== 'all') {
    list = list.filter(p => p.collection === filters.collection);
  }

  if (filters.priceRange && filters.priceRange !== 'all') {
    if (filters.priceRange === 'under-15k') {
      list = list.filter(p => p.price < 15000);
    } else if (filters.priceRange === '15k-30k') {
      list = list.filter(p => p.price >= 15000 && p.price <= 30000);
    } else if (filters.priceRange === 'over-30k') {
      list = list.filter(p => p.price > 30000);
    }
  }

  if (filters.movement && filters.movement !== 'all') {
    list = list.filter(p => p.movementType === filters.movement);
  }

  if (filters.caseMaterial && filters.caseMaterial !== 'all') {
    list = list.filter(p => p.caseType === filters.caseMaterial);
  }

  if (filters.dialColor && filters.dialColor !== 'all') {
    list = list.filter(p => p.dialColor === filters.dialColor);
  }

  if (filters.strapType && filters.strapType !== 'all') {
    list = list.filter(p => p.strapType === filters.strapType);
  }

  return list;
}

// Make accessible to all scripts
if (typeof window !== 'undefined') {
  window.STACKLY_PRODUCTS = STACKLY_PRODUCTS;
  window.getCatalog = getCatalog;
  window.getProductById = getProductById;
  window.getBestsellerProducts = getBestsellerProducts;
  window.getNewArrivalProducts = getNewArrivalProducts;
  window.getProductsByCollection = getProductsByCollection;
  window.filterProducts = filterProducts;
}
