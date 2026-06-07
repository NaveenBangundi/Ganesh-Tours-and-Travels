// Sri Ganesh Travels - Website Data

export const VEHICLE_FLEET = [
  {
    id: "hatchbacks",
    name: "Hatchbacks",
    models: [
      { name: "Maruti Swift", rateAc: 12, rateNonAc: 10 }
    ],
    type: "Budget Friendly",
    seating: "4 + 1",
    luggage: "2 Bags",
    ac: true,
    music: true,
    carrier: "Available on request",
    rateNonAc: 10,
    rateAc: 12,
    minKm: 300,
    engageRate: 1200,
    driverBata: 1000,
    mileageCng: 22,
    mileagePetrol: 16,
    description: "Compact, agile, and highly fuel-efficient. The perfect choice for single travelers, couples, or small families on budget-conscious city or outstation runs."
  },
  {
    id: "sedans",
    name: "Sedans",
    models: [
      { name: "Maruti Swift Dzire", rateAc: 14, rateNonAc: 12 },
      { name: "Hyundai Aura", rateAc: 14, rateNonAc: 12 },
      { name: "Toyota Etios", rateAc: 14, rateNonAc: 12 },
      { name: "Honda Amaze", rateAc: 12, rateNonAc: 10 }
    ],
    type: "Comfort & Economy",
    seating: "4 + 1",
    luggage: "3 Bags (Spacious boot)",
    ac: true,
    music: true,
    carrier: "Available on request",
    rateNonAc: 12,
    rateAc: 14,
    minKm: 300,
    engageRate: 1400,
    driverBata: 1000,
    mileageCng: 20,
    mileagePetrol: 14,
    description: "Our comfortable class of sedans. Features dedicated trunk space for multiple suitcases. Ideal for airport drop-offs, corporate commutes, and small families."
  },
  {
    id: "mpv",
    name: "MPV",
    models: [
      { name: "Maruti Ertiga", rateAc: 18, rateNonAc: 15 },
      { name: "Toyota Innova", rateAc: 18, rateNonAc: 15 },
      { name: "Toyota Innova Crysta", rateAc: 18, rateNonAc: 16 }
    ],
    type: "Premium Family Comfort",
    seating: "6 + 1 / 7 + 1",
    luggage: "4-5 Bags (Spacious boot + Roof Carrier)",
    ac: true,
    music: true,
    carrier: "Roof carrier available",
    rateNonAc: 15,
    rateAc: 18,
    minKm: 300,
    engageRate: 2000,
    driverBata: 1000,
    mileageCng: 18,
    mileagePetrol: 12,
    description: "Multi-Purpose Vehicles highlighting our flagship Ertiga CNG and premium Innovas. Best suited for family getaways, groups with heavy luggage, and supreme highway luxury."
  },
  {
    id: "tt",
    name: "TT",
    models: [
      { name: "Force Traveller", rateAc: 22, rateNonAc: 18 }
    ],
    type: "Group Travel Coach",
    seating: "12 to 26 Seater",
    luggage: "10+ Bags (Large roof carrier)",
    ac: true,
    music: true,
    carrier: "Heavy duty roof carrier included",
    rateNonAc: 18,
    rateAc: 22,
    minKm: 300,
    engageRate: 4000,
    driverBata: 1000,
    mileageCng: 0,
    mileagePetrol: 8,
    description: "Force Tempo Travellers built for large tourist groups, pilgrim tours, wedding party guest transports, and corporate excursions. Extremely spacious layout."
  }
];

export const TOUR_PACKAGES = [
  {
    id: "mysore_coorg",
    category: "karnataka",
    title: "Mysore & Coorg Heritage",
    duration: "3 Days / 2 Nights",
    startingPrice: 9500,
    tagline: "Explore royal history and foggy coffee plantations.",
    placesCovered: [
      "Mysore Palace & Chamundi Hills",
      "KRS Dam & Brindavan Gardens",
      "Abbey Falls & Raja's Seat (Coorg)",
      "Dubare Elephant Camp",
      "Bylakuppe Golden Temple (Tibetan Monastery)"
    ],
    inclusions: ["Driver allowance", "Fuel charges", "Pick & Drop from Bangalore"],
    exclusions: ["Tolls & State Permit", "Hotel stay & entry tickets"]
  },
  {
    id: "chikmagalur",
    category: "karnataka",
    title: "Chikmagalur Coffee Retreat",
    duration: "2 Days / 1 Night",
    startingPrice: 6500,
    tagline: "Chasing waterfalls and scaling highest peaks.",
    placesCovered: [
      "Mullayanagiri Peak (Highest in Karnataka)",
      "Baba Budangiri Hills",
      "Hebbe Falls & Jhari Falls",
      "Belur Chennakeshava Temple (Halebidu architecture)"
    ],
    inclusions: ["Driver allowance", "Fuel charges", "Pick & Drop from Bangalore"],
    exclusions: ["Tolls", "Hotel stay & entry fees"]
  },
  {
    id: "kerala_tour",
    category: "interstate",
    title: "Kerala Backwaters & Hills",
    duration: "4 Days / 3 Nights",
    startingPrice: 15500,
    tagline: "Experience God's Own Country in comfort.",
    placesCovered: [
      "Munnar Tea Estates & Mattupetty Dam",
      "Eravikulam National Park",
      "Thekkady Wildlife Sanctuary & Spice Garden",
      "Alleppey Backwaters Houseboat Cruise",
      "Kochi Fort & Marine Drive"
    ],
    inclusions: ["Driver allowance", "Fuel charges", "Pick & Drop from Bangalore"],
    exclusions: ["Kerala State Permit & Tolls", "Stay, food & activities fees"]
  },
  {
    id: "ooty_kodai",
    category: "interstate",
    title: "Ooty & Kodaikanal Escape",
    duration: "4 Days / 3 Nights",
    startingPrice: 14000,
    tagline: "Queen of Hills & Gift of the Forest.",
    placesCovered: [
      "Ooty Lake & Botanical Gardens",
      "Doddabetta Peak",
      "Kodaikanal Lake & Coaker's Walk",
      "Pillar Rocks & Pine Forest",
      "Silver Cascade Falls"
    ],
    inclusions: ["Driver allowance", "Fuel charges", "Pick & Drop from Bangalore"],
    exclusions: ["Tamil Nadu State Permit & Tolls", "Hotel stays & meals"]
  }
];

export const SERVICES = [
  {
    id: "airport",
    icon: "fa-plane-departure",
    title: "Airport Pickup & Drop",
    desc: "Punctual airport transfers to and from Kempegowda International Airport (BLR) with dedicated flight tracking to adjust pickup times."
  },
  {
    id: "outstation",
    icon: "fa-road",
    title: "Outstation Travel",
    desc: "Safe and comfortable long-distance travel within Karnataka and neighboring states (Kerala, Tamil Nadu, Andhra Pradesh) with veteran highway drivers."
  },
  {
    id: "family",
    icon: "fa-users",
    title: "Family Trips",
    desc: "Clean, hygienic, and spacious 7-seater vehicles like Ertiga so your entire family, children, and grandparents can travel together happily."
  },
  {
    id: "corporate",
    icon: "fa-briefcase",
    title: "Corporate Travel",
    desc: "Professional and reliable travel solutions for corporate events, client pickups, team commutes, and regular monthly contracts."
  },
  {
    id: "weddings",
    icon: "fa-holly-berry", // Will use ring or custom icon
    title: "Wedding & Event Transport",
    desc: "Elegant and decorated vehicle options to transport bride, groom, family, or guests in absolute luxury and stress-free timelines."
  },
  {
    id: "hotel",
    icon: "fa-hotel",
    title: "Hotel Transfers",
    desc: "Seamless transfers between city hotels, railway stations, and local attractions for tourist groups, business travelers, and families."
  }
];

export const FARE_CALCULATOR_DEFAULT = {
  fuelPriceCng: 85,
  fuelPricePetrol: 103,
  airportToll: 115,
  routes: [
    { name: "Bangalore Airport ⟷ Whitefield", distance: 50, zone: "east" },
    { name: "Bangalore Airport ⟷ Electronic City", distance: 65, zone: "south" },
    { name: "Bangalore Airport ⟷ Hebbal", distance: 30, zone: "north" },
    { name: "Bangalore Airport ⟷ Indiranagar", distance: 40, zone: "central" },
    { name: "Bangalore Airport ⟷ Majestic / KSR Railway Station", distance: 38, zone: "central" },
    { name: "Bangalore Airport ⟷ Jayanagar", distance: 45, zone: "south" },
    { name: "Bangalore Airport ⟷ Bannerghatta Road", distance: 58, zone: "south" },
    { name: "Bangalore Airport ⟷ Koramangala", distance: 42, zone: "central-south" }
  ]
};

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Indiranagar, Bangalore",
    rating: 5,
    text: "Very professional service. Booked the Ertiga for an airport drop at 4:00 AM. The car was sparkling clean, and Dayanand-ji was extremely punctual. Highly recommend his travels!"
  },
  {
    id: 2,
    name: "Priyanka Sen",
    location: "Whitefield, Bangalore",
    rating: 5,
    text: "We booked their Ertiga for a 4-day trip to Wayanad with our family of 6. The ride was extremely comfortable, the luggage roof carrier accommodated all our bags, and the driver knew the route like the back of his hand."
  },
  {
    id: 3,
    name: "Anil Bangera",
    location: "Electronic City, Bangalore",
    rating: 5,
    text: "Excellent rates compared to app cabs, and absolute safety. The CNG fuel made it cost-effective, and driver behavior was extremely polite and accommodating during our outstation wedding visit."
  }
];

export const VEHICLE_SPECS_ERTIGA = {
  model: "Maruti Suzuki Ertiga VXI (O) CNG",
  owner: "Dayanand Bangundi",
  registration: "KA 05 AN 8381",
  color: "White",
  features: [
    { label: "Comfortable Seating", desc: "Spacious 7-Seater layout with rear AC vents" },
    { label: "Eco-Friendly CNG", desc: "Equipped with factory-fitted S-CNG technology" },
    { label: "Luggage Space", desc: "Rear trunk space + roof carrier for heavy baggage" },
    { label: "Infotainment", desc: "Premium music system with Bluetooth/USB support" },
    { label: "Safety First", desc: "Dual front airbags, ABS with EBD, and safety locks" }
  ]
};

export const DRIVER_PARTNERS = [
  {
    id: "dayanand",
    name: "Dayanand Bangundi",
    nicknameTag: "Customers call me 'Santhosh Anna' with love",
    photo: "/driver_dayanand.png",
    vehicle: "MPV (Ertiga Flagship)",
    rating: 4.9,
    experience: "20+ Years",
    kmsDriven: "5,50,000+ KM",
    accidentHistory: "Zero Accidents (Clean Record)",
    languages: "Hindi, Telugu, Kannada, English",
    specialty: "Karnataka Route & Local Guide Expert",
    travelerFit: "Trusted Family Chauffeur",
    aboutMe: "Mr. Dayanand Bangundi (warmly known as Santhosh Anna) is the owner and founder of Sri Ganesh Travels. With over two decades of highway expertise, he is highly trusted by families and senior citizens for his extremely safe, defensive driving style and pleasant demeanor. He acts as an exceptional route guide who knows the best scenic routes, rest stops, and local eateries across South India.",
    drivingStyle: "Defensive, smooth, moderate speed, focus on family passenger comfort and safe passenger onboarding.",
    routesKnown: "Bangalore to Mysore, Coorg, Chikmagalur, Ooty, Wayanad, and entire Karnataka state highways.",
    safetyRating: "Gold Standard (Verified Chauffeur)",
    reviews: [
      { name: "Satish K.", text: "Dayanand is absolute family. We traveled to Coorg with our elderly parents and infant, and his driving was extremely smooth. He took breaks at clean restaurants and drove with extreme care." },
      { name: "Priya Raman", text: "Best highway travel experience! Dayanand's knowledge of the roads is incredible. He is highly punctual and very polite." }
    ]
  },
  {
    id: "reddy",
    name: "Reddy",
    nicknameTag: "Guests warmly name me 'Reddy Anna' with love",
    photo: "/driver_reddy.png",
    vehicle: "Tempo Traveller Coach",
    rating: 4.8,
    experience: "15+ Years",
    kmsDriven: "3,95,000+ KM",
    accidentHistory: "Zero Accidents (Clean Record)",
    languages: "Hindi, Telugu, Kannada, English, Tamil",
    specialty: "Group Pilgrim & Long Routes Specialist",
    travelerFit: "Group Adventure Specialist",
    aboutMe: "Reddy (Reddy Anna) is our long-distance coach and Tempo Traveller expert. He specializes in driving larger groups and pilgrim tours across South India. With 15+ years of heavy commercial coach experience, Reddy is widely appreciated for his patience, stamina on 1000+ km journeys, and expert navigation of complex ghat roads.",
    drivingStyle: "Steady highway cruising, comfortable group pacing, smooth clutch control on hill/ghat sections.",
    routesKnown: "Bangalore to Tirupati, Dharmasthala, Mantralaya, Shirdi, Madurai, Munnar, and Goa highways.",
    safetyRating: "Certified Coach Commander",
    reviews: [
      { name: "Ramesh Hegde", text: "We booked Reddy Anna for our family pilgrimage of 12 people to Tirupati. He drove the Tempo Traveller smoothly, stayed patient throughout the traffic, and handled parking and luggage very professionally." },
      { name: "Anil Kumar", text: "Excellent driver for long trips. He knows the routes like the back of his hand and kept everyone in the group comfortable." }
    ]
  },
  {
    id: "basvaraj",
    name: "Basvaraj",
    nicknameTag: "Riders fondly call me 'Bassu Anna' with love",
    photo: "/driver_basvaraj.png",
    vehicle: "Sedans (Swift Dzire / Etios)",
    rating: 4.9,
    experience: "12+ Years",
    kmsDriven: "3,60,000+ KM",
    accidentHistory: "Zero Accidents (Clean Record)",
    languages: "Hindi, Kannada",
    specialty: "Punctual & Highway Driving Specialist",
    travelerFit: "Premium Highway Captain",
    aboutMe: "Basvaraj (Bassu Anna) is our sedan specialist, handling premium airport transfers, corporate commutes, and fast-track highway trips. Known for his absolute punctuality, Basvaraj maintains his vehicle in showroom condition and uses real-time GPS navigation to ensure travelers avoid traffic congestion.",
    drivingStyle: "Highly punctual, alert highway maneuvering, smooth breaking, clean cabin management.",
    routesKnown: "Bangalore local transfers, Kempegowda Airport routes, Bangalore to Chennai, Hyderabad, and Pune expressways.",
    safetyRating: "Punctuality & Safety Star",
    reviews: [
      { name: "Vikram Sen", text: "Basvaraj was waiting at the airport before my flight landed. Clean car, pleasant smell, and smooth drive to my hotel. Will definitely book him again for my corporate visits." },
      { name: "Roopa M.", text: "Bassu Anna's driving was highly safe during our quick weekend trip to Chennai. He was very professional and silent, letting us rest." }
    ]
  }
];
