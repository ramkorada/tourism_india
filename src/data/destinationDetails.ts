// Destination details data
export interface NearbyPlace {
  name: string;
  type: "restaurant" | "hotel" | "pub" | "attraction" | "transport";
  distance: string;
  priceRange: string;
  rating: number;
  bookingUrl?: string;
  mapUrl?: string;
}

export interface TravelInfo {
  fromHyderabad: { distance: string; time: string; mode: string };
  fromVisakhapatnam: { distance: string; time: string; mode: string };
  fromVijayawada: { distance: string; time: string; mode: string };
  estimatedDailyCost: { budget: string; mid: string; luxury: string };
  bestTimeToVisit: string;
  idealDuration: string;
}

export interface GuideInfo {
  bestFor: string[];
  mustVisitSpots: string[];
  localTips: string[];
  safetyTips: string[];
  whatToCarry: string[];
}

export interface GuideContact {
  name: string;
  type: "helpline" | "tour_operator" | "local_guide" | "emergency" | "temple" | "tourism_office";
  phone: string;
  description: string;
  website?: string;
}

export interface DestinationDetail {
  id: string;
  history: string;
  culture: string;
  nearbyPlaces: NearbyPlace[];
  travelInfo: TravelInfo;
  cabServices: { name: string; pricePerKm: string; contact: string }[];
  guideInfo: GuideInfo;
  guideContacts: GuideContact[];
}

const mapSearch = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const destinationDetails: Record<string, DestinationDetail> = {
  "araku-valley": {
    id: "araku-valley",
    history: "Araku Valley, nestled in the Eastern Ghats at 1300m altitude, has been home to various tribal communities for centuries. The valley was relatively unknown until the British era when it was discovered as a hill station. The indigenous tribes — Konda Dora, Kotia, and Kulia — have preserved their unique traditions, crafts, and agricultural practices. The valley became famous for its coffee plantations introduced during the colonial period, and today Araku coffee is internationally acclaimed.",
    culture: "The tribal culture of Araku is vibrant and unique. The local communities practice Dhimsa dance, a traditional art form recognized by UNESCO. The Tribal Museum showcases artifacts, tools, and lifestyle of 19 different tribal groups. Annual festivals like Ituka Pongal and the Coffee Festival celebrate local heritage. The valley is also known for its handloom weaving and bamboo craft traditions passed down through generations.",
    guideInfo: {
      bestFor: ["Families", "Nature lovers", "Coffee enthusiasts", "Photographers", "Trekkers"],
      mustVisitSpots: ["Padmapuram Gardens", "Tribal Museum", "Coffee Plantations", "Chaparai Waterfalls", "Galikonda View Point", "Ananthagiri Hills", "Katiki Waterfalls"],
      localTips: ["Buy fresh Araku coffee directly from tribal cooperatives", "Visit on weekdays to avoid crowds", "Try bamboo chicken — a tribal delicacy cooked inside bamboo", "Hire a local tribal guide for plantation walks", "Take the Vizag-Araku train for one of India's most scenic railway journeys"],
      safetyTips: ["Roads are hilly with sharp curves — drive cautiously", "Carry warm clothes even in summer as evenings are cold", "Mobile network is patchy in deep valleys"],
      whatToCarry: ["Warm jacket", "Comfortable trekking shoes", "Rain gear (Jun-Sep)", "Mosquito repellent", "Cash (limited ATMs)"],
    },
    nearbyPlaces: [
      { name: "Araku Valley Resort", type: "hotel", distance: "0.5 km", priceRange: "₹2,000 - ₹5,000/night", rating: 4.3, bookingUrl: "https://www.makemytrip.com/hotels/araku_valley-hotels.html", mapUrl: mapSearch("Araku Valley Resort Araku Andhra Pradesh") },
      { name: "Haritha Valley Resort (APTDC)", type: "hotel", distance: "1 km", priceRange: "₹1,500 - ₹3,500/night", rating: 4.1, bookingUrl: "https://www.booking.com/searchresults.html?ss=Araku+Valley", mapUrl: mapSearch("Haritha Valley Resort Araku Valley") },
      { name: "Junglewood Resort", type: "hotel", distance: "2 km", priceRange: "₹3,000 - ₹7,000/night", rating: 4.5, bookingUrl: "https://www.makemytrip.com/hotels/araku_valley-hotels.html", mapUrl: mapSearch("Junglewood Resort Araku Valley") },
      { name: "Green Valley Restaurant", type: "restaurant", distance: "0.3 km", priceRange: "₹200 - ₹500", rating: 4.2, mapUrl: mapSearch("Green Valley Restaurant Araku Valley") },
      { name: "Tribal Kitchen", type: "restaurant", distance: "0.8 km", priceRange: "₹150 - ₹400", rating: 4.5, mapUrl: mapSearch("Tribal Kitchen Araku Valley") },
      { name: "Bamboo Chicken Corner", type: "restaurant", distance: "1.2 km", priceRange: "₹200 - ₹500", rating: 4.6, mapUrl: mapSearch("Bamboo Chicken Araku Valley") },
      { name: "Coffee Day Café", type: "pub", distance: "0.5 km", priceRange: "₹100 - ₹300", rating: 4.0, mapUrl: mapSearch("Coffee Day Cafe Araku Valley") },
      { name: "Borra Caves", type: "attraction", distance: "30 km", priceRange: "₹60 entry", rating: 4.4, mapUrl: mapSearch("Borra Caves Andhra Pradesh") },
      { name: "Padmapuram Gardens", type: "attraction", distance: "3 km", priceRange: "₹30 entry", rating: 4.1, mapUrl: mapSearch("Padmapuram Gardens Araku Valley") },
      { name: "Tribal Museum", type: "attraction", distance: "1 km", priceRange: "₹50 entry", rating: 4.3, mapUrl: mapSearch("Tribal Museum Araku Valley") },
      { name: "Chaparai Waterfalls", type: "attraction", distance: "15 km", priceRange: "Free", rating: 4.2, mapUrl: mapSearch("Chaparai Waterfalls Araku Valley") },
    ],
    travelInfo: {
      fromHyderabad: { distance: "690 km", time: "12 hours", mode: "Train + Road" },
      fromVisakhapatnam: { distance: "115 km", time: "3.5 hours", mode: "Road / Train" },
      fromVijayawada: { distance: "480 km", time: "9 hours", mode: "Road" },
      estimatedDailyCost: { budget: "₹1,500 - ₹2,500", mid: "₹3,000 - ₹5,000", luxury: "₹6,000 - ₹12,000" },
      bestTimeToVisit: "October to March",
      idealDuration: "2-3 days",
    },
    cabServices: [
      { name: "Vizag Cabs", pricePerKm: "₹12/km", contact: "+91 98765 43210" },
      { name: "AP Tourism Cabs", pricePerKm: "₹14/km", contact: "+91 87654 32109" },
      { name: "Ola / Uber", pricePerKm: "₹10-15/km", contact: "App based" },
    ],
    guideContacts: [
      { name: "AP Tourism Helpline", type: "helpline", phone: "1800 425 4545", description: "24/7 toll-free AP Tourism helpline for bookings & queries" },
      { name: "Araku Tourism", type: "tour_operator", phone: "+91 94923 33659", description: "Local tour packages, hotel & cab bookings", website: "https://arakutourism.com" },
      { name: "Vizag Araku Holiday Trips", type: "tour_operator", phone: "+91 98490 61129", description: "Vizag-Araku custom packages & guided tours", website: "https://vizagarakuholidaytrips.com" },
      { name: "Araku Tours & Travels", type: "local_guide", phone: "+91 90001 23456", description: "Local tribal guides for plantation walks & cave treks", website: "https://www.arakutourpackages.com" },
      { name: "APTDC Araku Resort", type: "tourism_office", phone: "+91 08936 249326", description: "Haritha Valley Resort booking & info" },
      { name: "Police / Emergency", type: "emergency", phone: "112", description: "All-India emergency helpline" },
    ],
  },
  "papikondalu": {
    id: "papikondalu",
    history: "Papikondalu, meaning 'Papiki's Hills', are a range of hills along the Godavari River in the East and West Godavari districts. These hills have been significant in Telugu literature and folklore for centuries. The legendary boat journey through the gorges has been a pilgrimage route since ancient times. The region witnessed significant historical events during the Chalukya and Kakatiya dynasties.",
    culture: "The region is home to the Koya and Konda Reddi tribal communities who have lived in harmony with nature for centuries. Traditional fishing, bamboo craft, and forest produce collection form their livelihood. The annual Sammakka Saralamma Jatara, one of Asia's largest tribal festivals, draws millions. The boat cruise through Papikondalu offers glimpses into tribal village life along the riverbanks.",
    guideInfo: {
      bestFor: ["Adventure seekers", "Couples", "Photography lovers", "Nature enthusiasts"],
      mustVisitSpots: ["Papi Hills Boat Cruise", "Perantalapalli Village", "Godavari River Confluence", "Tribal Hamlets", "Kolluru Village"],
      localTips: ["Book the overnight cruise for the best experience", "Early morning cruises have the best lighting for photography", "Carry your own snacks as options are limited on the boat", "Visit during monsoon for the most dramatic gorge views"],
      safetyTips: ["Life jackets are provided — always wear them", "Don't lean over the boat railings", "Avoid visiting during heavy flood seasons (Aug-Sep)"],
      whatToCarry: ["Sunscreen & hat", "Motion sickness medicine", "Waterproof bags for electronics", "Light snacks and water"],
    },
    nearbyPlaces: [
      { name: "Godavari Gateway Resort", type: "hotel", distance: "2 km", priceRange: "₹2,500 - ₹6,000/night", rating: 4.4, bookingUrl: "https://www.makemytrip.com/hotels/rajahmundry-hotels.html", mapUrl: mapSearch("Godavari Gateway Resort Rajahmundry") },
      { name: "Papikondalu Cruise Stay", type: "hotel", distance: "0 km", priceRange: "₹3,000 - ₹8,000/night", rating: 4.6, bookingUrl: "https://www.booking.com/searchresults.html?ss=Papikondalu", mapUrl: mapSearch("Papikondalu Cruise Rajahmundry") },
      { name: "Hotel Manasa", type: "hotel", distance: "3 km", priceRange: "₹1,500 - ₹3,000/night", rating: 4.0, bookingUrl: "https://www.makemytrip.com/hotels/rajahmundry-hotels.html", mapUrl: mapSearch("Hotel Manasa Rajahmundry") },
      { name: "Godavari Bhojanam", type: "restaurant", distance: "1 km", priceRange: "₹200 - ₹600", rating: 4.5, mapUrl: mapSearch("Godavari Bhojanam Rajahmundry") },
      { name: "River View Restaurant", type: "restaurant", distance: "1.5 km", priceRange: "₹250 - ₹500", rating: 4.2, mapUrl: mapSearch("River View Restaurant Rajahmundry") },
      { name: "Perantalapalli", type: "attraction", distance: "15 km", priceRange: "Free", rating: 4.3, mapUrl: mapSearch("Perantalapalli Andhra Pradesh") },
      { name: "ISKCON Temple Rajahmundry", type: "attraction", distance: "5 km", priceRange: "Free", rating: 4.5, mapUrl: mapSearch("ISKCON Temple Rajahmundry") },
    ],
    travelInfo: {
      fromHyderabad: { distance: "450 km", time: "8 hours", mode: "Road / Train to Rajahmundry" },
      fromVisakhapatnam: { distance: "200 km", time: "4 hours", mode: "Road" },
      fromVijayawada: { distance: "200 km", time: "4 hours", mode: "Road" },
      estimatedDailyCost: { budget: "₹2,000 - ₹3,000", mid: "₹4,000 - ₹7,000", luxury: "₹8,000 - ₹15,000" },
      bestTimeToVisit: "September to February",
      idealDuration: "2 days",
    },
    cabServices: [
      { name: "Rajahmundry Cabs", pricePerKm: "₹11/km", contact: "+91 98765 11111" },
      { name: "Godavari Tours", pricePerKm: "₹13/km", contact: "+91 87654 22222" },
    ],
    guideContacts: [
      { name: "AP Tourism Helpline", type: "helpline", phone: "1800 425 4545", description: "24/7 toll-free AP Tourism helpline" },
      { name: "Godavari Cruise Bookings", type: "tour_operator", phone: "+91 93937 93937", description: "Official Papikondalu boat cruise bookings" },
      { name: "Rajahmundry Tourism Office", type: "tourism_office", phone: "+91 0883 2478855", description: "Local tourism information & guides" },
      { name: "Police / Emergency", type: "emergency", phone: "112", description: "All-India emergency helpline" },
    ],
  },
  "borra-caves": {
    id: "borra-caves",
    history: "Borra Caves, discovered in 1807 by British geologist William King, are the largest caves in India. These karstic limestone caves are estimated to be 150 million years old, formed by the Gosthani River flowing through the limestone area. The caves hold religious significance for local tribes who worship the Shivalinga-shaped stalagmite formation inside. Archaeological surveys have found Stone Age tools, suggesting human habitation dating back millions of years.",
    culture: "The caves are sacred to the local Valmiki tribal community who consider them the abode of Lord Shiva. The unique stalactite and stalagmite formations resemble a Shiva Linga, a cow's udder, human brain, and other shapes that have inspired local legends. The tribal communities hold annual rituals at the cave entrance. The nearby villages showcase traditional Dhimsa dance performances for visitors.",
    guideInfo: {
      bestFor: ["Families with kids", "Geology enthusiasts", "History buffs", "Everyone — one of AP's must-visits"],
      mustVisitSpots: ["Main Cave Chamber", "Shiva Linga Formation", "Katiki Waterfalls (nearby)", "Araku Valley (combine trip)", "Galikonda View Point"],
      localTips: ["Visit early morning (9-10 AM) to avoid crowds", "Combine with Araku Valley for a 2-day trip", "The cave is well-lit with walkways — suitable for all ages", "Local guides at the entrance explain formations well"],
      safetyTips: ["Wear non-slip footwear — cave floors can be slippery", "Watch your head in low ceiling areas", "Hold the railings while descending steps", "Not recommended for claustrophobic visitors"],
      whatToCarry: ["Non-slip shoes", "Light jacket (cave is cool inside)", "Camera with flash", "Water bottle"],
    },
    nearbyPlaces: [
      { name: "Borra Caves Guest House", type: "hotel", distance: "0.5 km", priceRange: "₹1,000 - ₹2,500/night", rating: 3.8, bookingUrl: "https://www.makemytrip.com/hotels/borra_caves-hotels.html", mapUrl: mapSearch("Borra Caves Guest House Andhra Pradesh") },
      { name: "Tyda Nature Camp", type: "hotel", distance: "20 km", priceRange: "₹1,500 - ₹3,000/night", rating: 4.2, bookingUrl: "https://www.booking.com/searchresults.html?ss=Borra+Caves", mapUrl: mapSearch("Tyda Nature Camp Araku") },
      { name: "Hilltop Dhaba", type: "restaurant", distance: "0.3 km", priceRange: "₹100 - ₹300", rating: 3.9, mapUrl: mapSearch("Hilltop Dhaba Borra Caves") },
      { name: "Katiki Waterfalls", type: "attraction", distance: "18 km", priceRange: "Free", rating: 4.3, mapUrl: mapSearch("Katiki Waterfalls Andhra Pradesh") },
      { name: "Araku Valley", type: "attraction", distance: "30 km", priceRange: "Free", rating: 4.6, mapUrl: mapSearch("Araku Valley Andhra Pradesh") },
      { name: "Galikonda View Point", type: "attraction", distance: "25 km", priceRange: "Free", rating: 4.4, mapUrl: mapSearch("Galikonda View Point Araku") },
    ],
    travelInfo: {
      fromHyderabad: { distance: "660 km", time: "11 hours", mode: "Train + Road" },
      fromVisakhapatnam: { distance: "92 km", time: "3 hours", mode: "Road / Train" },
      fromVijayawada: { distance: "450 km", time: "8 hours", mode: "Road" },
      estimatedDailyCost: { budget: "₹1,000 - ₹2,000", mid: "₹2,500 - ₹4,000", luxury: "₹5,000 - ₹8,000" },
      bestTimeToVisit: "October to March",
      idealDuration: "1 day (combine with Araku)",
    },
    cabServices: [
      { name: "Vizag Cabs", pricePerKm: "₹12/km", contact: "+91 98765 43210" },
      { name: "Araku Tours", pricePerKm: "₹14/km", contact: "+91 87654 33333" },
    ],
    guideContacts: [
      { name: "AP Tourism Helpline", type: "helpline", phone: "1800 425 4545", description: "24/7 toll-free AP Tourism helpline" },
      { name: "Araku Tourism (covers Borra)", type: "tour_operator", phone: "+91 94923 33659", description: "Combined Araku-Borra tour packages", website: "https://arakutourism.com" },
      { name: "Forest Dept (Araku Range)", type: "tourism_office", phone: "+91 08936 249226", description: "Permissions for treks & forest areas" },
      { name: "Police / Emergency", type: "emergency", phone: "112", description: "All-India emergency helpline" },
    ],
  },
  "srisailam": {
    id: "srisailam",
    history: "Srisailam is one of the twelve Jyotirlingas and one of the eighteen Maha Shakti Peethas, making it one of the most sacred sites in Hinduism. The Mallikarjuna Swamy Temple dates back to the 2nd century CE and was expanded by the Vijayanagara kings. The Srisailam Dam on the Krishna River, built in 1981, is one of India's largest hydroelectric projects. The surrounding Nallamala Hills are home to the Nagarjunasagar-Srisailam Tiger Reserve, India's largest tiger reserve.",
    culture: "Srisailam blends deep spiritual significance with breathtaking natural beauty. The annual Maha Shivaratri festival attracts lakhs of devotees. The temple's Brahmotsavam features grand processions. The Nallamala forests are home to the Chenchu tribe, one of India's oldest tribal communities. The Patala Ganga cable car offers unique views of the Krishna River gorge.",
    guideInfo: {
      bestFor: ["Pilgrims & devotees", "Nature lovers", "Trekkers", "Wildlife enthusiasts", "Families"],
      mustVisitSpots: ["Mallikarjuna Swamy Temple", "Srisailam Dam", "Patala Ganga (cable car)", "Akka Mahadevi Caves", "Sakshi Ganapathi Temple", "Nallamala Forest Safari", "Octopus View Point"],
      localTips: ["Visit the temple early morning (5-6 AM) for peaceful darshan", "Patala Ganga cable car ride is a must — ₹100 per person", "Book APTDC accommodation 2 weeks in advance", "Try the temple prasadam — divine taste", "Night views of the illuminated dam are spectacular"],
      safetyTips: ["Ghat roads are steep with 72 hairpin bends — drive carefully", "Carry motion sickness medicine for the ghat road", "Don't venture into forests without a guide — wildlife area", "Keep distance from monkeys near the temple"],
      whatToCarry: ["Traditional clothing for temple", "Comfortable shoes for ghat walking", "Water & snacks", "Camera", "Warm clothes (nights are cool)"],
    },
    nearbyPlaces: [
      { name: "Haritha Hotel (APTDC)", type: "hotel", distance: "0.5 km", priceRange: "₹1,500 - ₹3,500/night", rating: 4.0, bookingUrl: "https://www.makemytrip.com/hotels/srisailam-hotels.html", mapUrl: mapSearch("Haritha Hotel Srisailam") },
      { name: "Temple Accommodation (Devasthanam)", type: "hotel", distance: "0.2 km", priceRange: "₹200 - ₹1,000/night", rating: 3.8, mapUrl: mapSearch("Srisailam Devasthanam Accommodation") },
      { name: "Hotel Sai Srisailam", type: "hotel", distance: "1 km", priceRange: "₹1,200 - ₹3,000/night", rating: 4.1, bookingUrl: "https://www.booking.com/searchresults.html?ss=Srisailam", mapUrl: mapSearch("Hotel Sai Srisailam") },
      { name: "Srisailam Bhojanalayam", type: "restaurant", distance: "0.3 km", priceRange: "₹100 - ₹300", rating: 4.3, mapUrl: mapSearch("Srisailam Bhojanalayam") },
      { name: "Sree Lakshmi Restaurant", type: "restaurant", distance: "0.5 km", priceRange: "₹150 - ₹400", rating: 4.0, mapUrl: mapSearch("Sree Lakshmi Restaurant Srisailam") },
      { name: "Srisailam Dam View Point", type: "attraction", distance: "3 km", priceRange: "Free", rating: 4.6, mapUrl: mapSearch("Srisailam Dam Andhra Pradesh") },
      { name: "Patala Ganga", type: "attraction", distance: "2 km", priceRange: "₹100 cable car", rating: 4.5, mapUrl: mapSearch("Patala Ganga Srisailam") },
      { name: "Akka Mahadevi Caves", type: "attraction", distance: "5 km", priceRange: "Free", rating: 4.2, mapUrl: mapSearch("Akka Mahadevi Caves Srisailam") },
      { name: "Nagarjunasagar Dam", type: "attraction", distance: "150 km", priceRange: "₹20 entry", rating: 4.5, mapUrl: mapSearch("Nagarjuna Sagar Dam Andhra Pradesh") },
    ],
    travelInfo: {
      fromHyderabad: { distance: "230 km", time: "5 hours", mode: "Road" },
      fromVisakhapatnam: { distance: "540 km", time: "10 hours", mode: "Road" },
      fromVijayawada: { distance: "230 km", time: "5 hours", mode: "Road" },
      estimatedDailyCost: { budget: "₹1,000 - ₹2,000", mid: "₹2,500 - ₹5,000", luxury: "₹5,000 - ₹10,000" },
      bestTimeToVisit: "October to March (Shivaratri in Feb/Mar is special)",
      idealDuration: "2 days",
    },
    cabServices: [
      { name: "Hyderabad Outstation Cabs", pricePerKm: "₹11/km", contact: "+91 98765 44444" },
      { name: "Srisailam Local Autos", pricePerKm: "₹15/km", contact: "Available at bus stand" },
      { name: "Ola / Uber (from Hyderabad)", pricePerKm: "₹10-14/km", contact: "App based" },
    ],
    guideContacts: [
      { name: "AP Tourism Helpline", type: "helpline", phone: "1800 425 4545", description: "24/7 toll-free AP Tourism helpline" },
      { name: "Srisailam Devasthanam", type: "temple", phone: "+91 08524 287760", description: "Temple darshan, accommodation & pooja bookings", website: "https://www.srisailadevasthanam.org" },
      { name: "Srisailam Tourism (AR Holidays)", type: "tour_operator", phone: "+91 90596 64435", description: "Srisailam tour packages & local guides", website: "https://srisailamtourism.com" },
      { name: "APTDC Srisailam", type: "tourism_office", phone: "+91 08524 287425", description: "Haritha Hotel bookings & tourist info" },
      { name: "Police / Emergency", type: "emergency", phone: "112", description: "All-India emergency helpline" },
    ],
  },
  "tirupati": {
    id: "tirupati",
    history: "Tirupati is home to the Sri Venkateswara Temple (Tirumala), one of the richest and most visited religious sites in the world. The temple's history dates back over 2,000 years, with references in Tamil Sangam literature. Built in the Dravidian architectural style, the main deity Lord Venkateswara (Balaji) attracts over 75,000 pilgrims daily. The temple was patronized by various dynasties including the Pallavas, Cholas, and the Vijayanagara Empire.",
    culture: "Tirupati is a spiritual epicenter of Hinduism. The head-tonsuring tradition (offering hair to the deity) is practiced by millions annually. The temple's Brahmotsavam festival, celebrated for 9 days, features grand processions with the deity on different vahanams (vehicles). The prasadam (sacred food), especially the Tirupati Laddu, is world-famous and has a GI tag.",
    guideInfo: {
      bestFor: ["Pilgrims & devotees", "Families", "History enthusiasts", "Solo travelers", "Everyone"],
      mustVisitSpots: ["Sri Venkateswara Temple (Tirumala)", "Chandragiri Fort", "Sri Kalahasti Temple", "Talakona Waterfalls", "Tirupati Deer Park", "Silathoranam (Natural Rock Arch)", "Kapila Theertham"],
      localTips: ["Book darshan tickets online 2-3 weeks in advance via TTD website", "₹300 special darshan saves 8-10 hours of waiting", "Free accommodation available through TTD — book early", "Try the famous Tirupati Laddu (₹50 for 2)", "Tonsuring is free at designated halls"],
      safetyTips: ["Beware of middlemen selling 'fast darshan' — use only official TTD services", "Keep valuables in lockers provided at the temple", "Wear modest clothing for temple entry", "Stay hydrated — summer temperatures exceed 40°C"],
      whatToCarry: ["Comfortable walking shoes (lots of walking)", "Traditional clothes for temple", "Water bottle", "ID proof for darshan", "Cash for prasadam & offerings"],
    },
    nearbyPlaces: [
      { name: "Fortune Kences Hotel", type: "hotel", distance: "2 km", priceRange: "₹3,000 - ₹8,000/night", rating: 4.5, bookingUrl: "https://www.makemytrip.com/hotels/tirupati-hotels.html", mapUrl: mapSearch("Fortune Kences Hotel Tirupati") },
      { name: "Hotel Bliss", type: "hotel", distance: "1 km", priceRange: "₹1,200 - ₹3,000/night", rating: 4.0, bookingUrl: "https://www.booking.com/searchresults.html?ss=Tirupati", mapUrl: mapSearch("Hotel Bliss Tirupati") },
      { name: "Marasa Sarovar Premiere", type: "hotel", distance: "3 km", priceRange: "₹4,000 - ₹10,000/night", rating: 4.6, bookingUrl: "https://www.makemytrip.com/hotels/tirupati-hotels.html", mapUrl: mapSearch("Marasa Sarovar Premiere Tirupati") },
      { name: "TTD Canteen (Annadanam)", type: "restaurant", distance: "0 km", priceRange: "Free", rating: 4.7, mapUrl: mapSearch("TTD Annadanam Tirumala") },
      { name: "Minerva Grand", type: "restaurant", distance: "3 km", priceRange: "₹300 - ₹800", rating: 4.3, mapUrl: mapSearch("Minerva Grand Tirupati") },
      { name: "Maya Restaurant", type: "restaurant", distance: "2 km", priceRange: "₹200 - ₹600", rating: 4.1, mapUrl: mapSearch("Maya Restaurant Tirupati") },
      { name: "Rayalaseema Ruchulu", type: "restaurant", distance: "4 km", priceRange: "₹200 - ₹500", rating: 4.4, mapUrl: mapSearch("Rayalaseema Ruchulu Tirupati") },
      { name: "Sri Kalahasteeswara Temple", type: "attraction", distance: "36 km", priceRange: "Free", rating: 4.6, mapUrl: mapSearch("Sri Kalahasteeswara Temple Srikalahasti") },
      { name: "Chandragiri Fort", type: "attraction", distance: "15 km", priceRange: "₹25 entry", rating: 4.2, mapUrl: mapSearch("Chandragiri Fort Tirupati") },
      { name: "Talakona Waterfalls", type: "attraction", distance: "49 km", priceRange: "₹50 entry", rating: 4.4, mapUrl: mapSearch("Talakona Waterfalls Andhra Pradesh") },
    ],
    travelInfo: {
      fromHyderabad: { distance: "580 km", time: "8 hours", mode: "Train / Flight" },
      fromVisakhapatnam: { distance: "680 km", time: "12 hours", mode: "Train" },
      fromVijayawada: { distance: "390 km", time: "6 hours", mode: "Road / Train" },
      estimatedDailyCost: { budget: "₹1,000 - ₹2,000", mid: "₹3,000 - ₹6,000", luxury: "₹7,000 - ₹15,000" },
      bestTimeToVisit: "Year-round (Sep-Feb ideal)",
      idealDuration: "2-3 days",
    },
    cabServices: [
      { name: "Tirupati Cabs", pricePerKm: "₹10/km", contact: "+91 98765 55555" },
      { name: "TTD Transport", pricePerKm: "₹12/km", contact: "+91 87654 66666" },
      { name: "Ola / Uber", pricePerKm: "₹9-13/km", contact: "App based" },
    ],
    guideContacts: [
      { name: "TTD Helpline", type: "helpline", phone: "1800 425 4141", description: "24/7 toll-free TTD helpline for darshan & seva queries" },
      { name: "TTD Call Center", type: "temple", phone: "+91 0877 223 3333", description: "Darshan tickets, accommodation & donation queries", website: "https://www.tirumala.org" },
      { name: "TTD WhatsApp Guide", type: "local_guide", phone: "+91 93993 99399", description: "WhatsApp support for pilgrimage planning" },
      { name: "TTD Donation Queries", type: "temple", phone: "155257", description: "Toll-free for donation-related queries" },
      { name: "AP Tourism Helpline", type: "helpline", phone: "1800 425 4545", description: "24/7 toll-free AP Tourism helpline" },
      { name: "Police / Emergency", type: "emergency", phone: "112", description: "All-India emergency helpline" },
    ],
  },
  "lepakshi": {
    id: "lepakshi",
    history: "Lepakshi, a small historical village in Anantapur district, houses the famous Veerabhadra Temple built in 1530 AD by Virupanna, a governor under the Vijayanagara Empire. The name 'Lepakshi' translates to 'Rise, Bird' — a reference to the legend of Lord Rama asking the wounded bird Jatayu to rise. The temple is an architectural masterpiece with the largest monolithic Nandi (bull) in India, measuring 27 feet long and 15 feet high. The famous 'Hanging Pillar' that doesn't fully touch the ground remains an engineering mystery.",
    culture: "The temple walls feature some of the finest examples of Vijayanagara mural paintings depicting scenes from the Ramayana, Mahabharata, and Puranas. The intricate ceiling paintings, executed in the 'fresco secco' technique, cover over 1,000 sq ft. The 70 stone pillars are carved with dancing figures, musicians, and mythological scenes.",
    guideInfo: {
      bestFor: ["History buffs", "Architecture lovers", "Photographers", "Day trippers from Hyderabad/Bangalore"],
      mustVisitSpots: ["Hanging Pillar", "Monolithic Nandi Bull", "Veerabhadra Temple Murals", "Nagalinga Sculpture", "Jatayu Park"],
      localTips: ["Best visited as a day trip from Hyderabad (2.5 hrs drive)", "Hire a guide at the temple for ₹200-300 — the stories are worth it", "Early morning light is best for photography of the Nandi", "Visit the Lepakshi Handicrafts Emporium for authentic souvenirs"],
      safetyTips: ["Sun can be intense — carry sunscreen and hat", "Limited food options — eat before coming", "Temple floors can be hot in summer — carry socks"],
      whatToCarry: ["Sun hat & sunscreen", "Water & snacks", "Camera", "Socks for temple", "Cash for guide & souvenirs"],
    },
    nearbyPlaces: [
      { name: "APTDC Haritha Hotel", type: "hotel", distance: "0.5 km", priceRange: "₹1,200 - ₹2,500/night", rating: 3.7, bookingUrl: "https://www.makemytrip.com/hotels/lepakshi-hotels.html", mapUrl: mapSearch("APTDC Haritha Hotel Lepakshi") },
      { name: "Lepakshi Guest House", type: "hotel", distance: "0.3 km", priceRange: "₹800 - ₹1,500/night", rating: 3.5, bookingUrl: "https://www.booking.com/searchresults.html?ss=Lepakshi", mapUrl: mapSearch("Lepakshi Guest House Andhra Pradesh") },
      { name: "Nandi Restaurant", type: "restaurant", distance: "0.2 km", priceRange: "₹100 - ₹300", rating: 3.8, mapUrl: mapSearch("Nandi Restaurant Lepakshi") },
      { name: "Penukonda Fort", type: "attraction", distance: "40 km", priceRange: "Free", rating: 4.1, mapUrl: mapSearch("Penukonda Fort Andhra Pradesh") },
      { name: "Lepakshi Handicrafts Emporium", type: "attraction", distance: "0.5 km", priceRange: "Free", rating: 4.0, mapUrl: mapSearch("Lepakshi Handicrafts Emporium") },
    ],
    travelInfo: {
      fromHyderabad: { distance: "120 km", time: "2.5 hours", mode: "Road" },
      fromVisakhapatnam: { distance: "750 km", time: "13 hours", mode: "Train + Road" },
      fromVijayawada: { distance: "350 km", time: "6 hours", mode: "Road" },
      estimatedDailyCost: { budget: "₹800 - ₹1,500", mid: "₹2,000 - ₹3,500", luxury: "₹4,000 - ₹8,000" },
      bestTimeToVisit: "October to March",
      idealDuration: "1 day (day trip from Hyderabad)",
    },
    cabServices: [
      { name: "Hindupur Cabs", pricePerKm: "₹10/km", contact: "+91 98765 77777" },
      { name: "Hyderabad Outstation", pricePerKm: "₹12/km", contact: "+91 87654 88888" },
    ],
    guideContacts: [
      { name: "AP Tourism Helpline", type: "helpline", phone: "1800 425 4545", description: "24/7 toll-free AP Tourism helpline" },
      { name: "Lepakshi Temple Guide", type: "local_guide", phone: "+91 94402 12345", description: "Certified temple guide — history & architecture tours" },
      { name: "APTDC Lepakshi", type: "tourism_office", phone: "+91 08559 272375", description: "Haritha Hotel bookings & local info" },
      { name: "Police / Emergency", type: "emergency", phone: "112", description: "All-India emergency helpline" },
    ],
  },
  "amaravati": {
    id: "amaravati",
    history: "Amaravati, located on the banks of the Krishna River in Guntur district, was the capital of the ancient Satavahana dynasty (2nd century BCE). It was a major center of Buddhism, housing the Great Stupa (Mahachaitya), one of the largest Buddhist stupas ever built, rivaling Sanchi and Borobudur. The stupa was adorned with elaborate limestone carvings depicting scenes from Buddha's life.",
    culture: "Amaravati represents a unique blend of Buddhist and Hindu heritage. The Amaravati School of Art, characterized by its dynamic narrative relief sculptures, influenced Buddhist art across Southeast Asia. The archaeological museum houses priceless artifacts from the stupa site.",
    guideInfo: {
      bestFor: ["History enthusiasts", "Buddhist pilgrims", "Architecture students", "Families"],
      mustVisitSpots: ["Amaravati Stupa Ruins", "Archaeological Museum", "Undavalli Caves", "Prakasam Barrage", "Dhyana Buddha Statue", "Mangalagiri Temple"],
      localTips: ["Combine with Vijayawada visit (just 30 km away)", "The museum closes at 5 PM — plan accordingly", "Try Guntur-style biryani and mirchi bajji", "Visit Undavalli Caves for stunning rock-cut architecture"],
      safetyTips: ["Summer temperatures are extreme — carry water", "Limited shade at archaeological sites", "Construction activity in the new capital area — follow marked paths"],
      whatToCarry: ["Sun protection", "Comfortable walking shoes", "Water & snacks", "Camera"],
    },
    nearbyPlaces: [
      { name: "Hotel Minerva Grand", type: "hotel", distance: "5 km", priceRange: "₹2,000 - ₹5,000/night", rating: 4.2, bookingUrl: "https://www.makemytrip.com/hotels/vijayawada-hotels.html", mapUrl: mapSearch("Hotel Minerva Grand Vijayawada") },
      { name: "Gateway Hotel", type: "hotel", distance: "8 km", priceRange: "₹3,500 - ₹7,000/night", rating: 4.4, bookingUrl: "https://www.booking.com/searchresults.html?ss=Vijayawada", mapUrl: mapSearch("Gateway Hotel Vijayawada") },
      { name: "Babai Hotel", type: "restaurant", distance: "2 km", priceRange: "₹150 - ₹400", rating: 4.3, mapUrl: mapSearch("Babai Hotel Guntur") },
      { name: "Guntur Biryani House", type: "restaurant", distance: "6 km", priceRange: "₹200 - ₹500", rating: 4.4, mapUrl: mapSearch("Guntur Biryani House") },
      { name: "Undavalli Caves", type: "attraction", distance: "10 km", priceRange: "₹25 entry", rating: 4.5, mapUrl: mapSearch("Undavalli Caves Andhra Pradesh") },
      { name: "Prakasam Barrage", type: "attraction", distance: "15 km", priceRange: "Free", rating: 4.2, mapUrl: mapSearch("Prakasam Barrage Vijayawada") },
      { name: "Mangalagiri Temple", type: "attraction", distance: "12 km", priceRange: "Free", rating: 4.4, mapUrl: mapSearch("Mangalagiri Temple Andhra Pradesh") },
    ],
    travelInfo: {
      fromHyderabad: { distance: "370 km", time: "5.5 hours", mode: "Road" },
      fromVisakhapatnam: { distance: "380 km", time: "7 hours", mode: "Train / Road" },
      fromVijayawada: { distance: "30 km", time: "45 mins", mode: "Road" },
      estimatedDailyCost: { budget: "₹1,000 - ₹2,000", mid: "₹2,500 - ₹4,500", luxury: "₹5,000 - ₹10,000" },
      bestTimeToVisit: "October to March",
      idealDuration: "1-2 days",
    },
    cabServices: [
      { name: "Vijayawada Cabs", pricePerKm: "₹10/km", contact: "+91 98765 99999" },
      { name: "AP Travels", pricePerKm: "₹11/km", contact: "+91 87654 00000" },
    ],
    guideContacts: [
      { name: "AP Tourism Helpline", type: "helpline", phone: "1800 425 4545", description: "24/7 toll-free AP Tourism helpline" },
      { name: "Amaravati Archaeological Museum", type: "tourism_office", phone: "+91 08645 222255", description: "Museum timings & guided tour bookings" },
      { name: "Vijayawada Tourism Office", type: "tourism_office", phone: "+91 0866 2578402", description: "Regional tourism info for Amaravati & surrounds" },
      { name: "Police / Emergency", type: "emergency", phone: "112", description: "All-India emergency helpline" },
    ],
  },
  "gandikota": {
    id: "gandikota",
    history: "Gandikota, known as the 'Grand Canyon of India', is a village in Kadapa district featuring a spectacular gorge formed by the Pennar River cutting through the Erramala hills. The Gandikota Fort, built by the Kalyani Chalukyas in the 12th century, sits dramatically on the edge of a 300-foot deep gorge. The fort changed hands between the Chalukyas, Vijayanagara Empire, and the Qutb Shahis over centuries. Inside the fort are the Madhava Raya Temple, the Ranganatha Temple, and a Jamia Masjid — showcasing the region's multi-cultural history.",
    culture: "Gandikota is a hidden gem that has recently gained attention as India's answer to the Grand Canyon. The fort walls span nearly 5 km and contain remnants of a once-thriving medieval town. The Mylavaram Dam nearby adds to the scenic beauty. The region's Rayalaseema culture is known for its warrior traditions, spicy cuisine, and vibrant folk arts like Burra Katha.",
    guideInfo: {
      bestFor: ["Adventure seekers", "Photographers", "History buffs", "Camping enthusiasts", "Trekkers"],
      mustVisitSpots: ["Gandikota Gorge (Grand Canyon)", "Gandikota Fort", "Madhava Raya Temple", "Ranganatha Temple", "Mylavaram Dam", "Jamia Masjid inside Fort", "Belum Caves (nearby)"],
      localTips: ["Camp overnight at the gorge edge for a stunning sunrise — it's life-changing", "APTDC has camping facilities — book in advance", "Combine with Belum Caves (60 km away) for a 2-day trip", "Carry your own food — limited restaurants", "Visit on full moon nights for a magical experience"],
      safetyTips: ["Stay away from cliff edges — no railings in many areas", "Don't trek down the gorge without a guide", "Roads to Gandikota are narrow — drive carefully at night", "Limited mobile network coverage"],
      whatToCarry: ["Camping gear (tent, sleeping bag)", "Food & water (essential)", "Torch/flashlight", "Trekking shoes", "Camera with wide-angle lens", "Power bank (no charging points)"],
    },
    nearbyPlaces: [
      { name: "APTDC Haritha Resort", type: "hotel", distance: "0.5 km", priceRange: "₹1,200 - ₹2,500/night", rating: 3.9, bookingUrl: "https://www.makemytrip.com/hotels/gandikota-hotels.html", mapUrl: mapSearch("APTDC Haritha Resort Gandikota") },
      { name: "Gandikota Camping Tents", type: "hotel", distance: "0.3 km", priceRange: "₹800 - ₹2,000/night", rating: 4.3, mapUrl: mapSearch("Gandikota Camping Tents") },
      { name: "Local Dhaba", type: "restaurant", distance: "1 km", priceRange: "₹100 - ₹250", rating: 3.5, mapUrl: mapSearch("Restaurant near Gandikota Fort") },
      { name: "Gandikota Fort", type: "attraction", distance: "0.2 km", priceRange: "Free", rating: 4.6, mapUrl: mapSearch("Gandikota Fort Kadapa Andhra Pradesh") },
      { name: "Mylavaram Dam", type: "attraction", distance: "5 km", priceRange: "Free", rating: 4.3, mapUrl: mapSearch("Mylavaram Dam Gandikota") },
      { name: "Belum Caves", type: "attraction", distance: "60 km", priceRange: "₹65 entry", rating: 4.5, mapUrl: mapSearch("Belum Caves Andhra Pradesh") },
      { name: "Owk Reservoir", type: "attraction", distance: "30 km", priceRange: "Free", rating: 4.0, mapUrl: mapSearch("Owk Reservoir Kurnool") },
    ],
    travelInfo: {
      fromHyderabad: { distance: "380 km", time: "6.5 hours", mode: "Road" },
      fromVisakhapatnam: { distance: "600 km", time: "11 hours", mode: "Road" },
      fromVijayawada: { distance: "340 km", time: "6 hours", mode: "Road" },
      estimatedDailyCost: { budget: "₹800 - ₹1,500", mid: "₹2,000 - ₹4,000", luxury: "₹4,000 - ₹8,000" },
      bestTimeToVisit: "October to February",
      idealDuration: "1-2 days",
    },
    cabServices: [
      { name: "Kadapa Cabs", pricePerKm: "₹10/km", contact: "+91 98765 33333" },
      { name: "Hyderabad Outstation", pricePerKm: "₹12/km", contact: "+91 87654 44444" },
    ],
    guideContacts: [
      { name: "AP Tourism Helpline", type: "helpline", phone: "1800 425 4545", description: "24/7 toll-free AP Tourism helpline" },
      { name: "JC Resort Gandikota", type: "tour_operator", phone: "+91 95055 85855", description: "Camping, trekking & guided gorge tours", website: "https://jcresortgandikota.com" },
      { name: "APTDC Gandikota", type: "tourism_office", phone: "+91 08562 244025", description: "Haritha Resort bookings & tourist info" },
      { name: "Police / Emergency", type: "emergency", phone: "112", description: "All-India emergency helpline" },
    ],
  },
  "konaseema": {
    id: "konaseema",
    history: "Konaseema, the 'God's Own Creation', is a lush deltaic region where the Godavari River splits into multiple tributaries before emptying into the Bay of Bengal. The region has been a rice bowl and coconut paradise for centuries. Ancient references in Telugu literature describe Konaseema as 'Andhra's Kerala'. The region was integral to the Vengi Chalukya and Eastern Chalukya kingdoms. The Antarvedi Temple, where the Godavari meets the sea, has been a pilgrimage site for over 1,000 years.",
    culture: "Konaseema's culture revolves around the Godavari — fishing, boat festivals, and riverside temples define daily life. The region produces India's finest coconut oil and is famous for its unique 'Konaseema' cuisine featuring prawn curries, crab preparations, and sweet pongal. The annual boat race festival (Teppotsavam) at Antarvedi is a grand spectacle. Traditional Telugu drama (Harikatha, Burra Katha) thrives here.",
    guideInfo: {
      bestFor: ["Nature lovers", "Foodies", "Couples", "Photographers", "Anyone seeking peace & tranquility"],
      mustVisitSpots: ["Antarvedi Temple & Beach", "Coringa Wildlife Sanctuary", "Dindi Resorts (backwaters)", "Coconut Groves Walk", "Godavari River Boat Ride", "Draksharamam Temple", "Amalapuram Town"],
      localTips: ["Stay at Dindi resort for the ultimate backwater experience", "Try Konaseema special prawn curry — it's legendary", "Take a country boat ride through coconut groves at sunset", "Visit Antarvedi on full moon for the river-sea confluence view", "Buy authentic Konaseema coconut oil directly from farmers"],
      safetyTips: ["Monsoon can cause flooding — avoid Jul-Aug", "Mosquitoes are common near backwaters — use repellent", "Boat rides should be taken only with life jackets"],
      whatToCarry: ["Mosquito repellent", "Light cotton clothes", "Camera", "Sunscreen", "Cash (limited ATMs in villages)"],
    },
    nearbyPlaces: [
      { name: "Dindi Resorts", type: "hotel", distance: "0 km", priceRange: "₹3,500 - ₹8,000/night", rating: 4.5, bookingUrl: "https://www.makemytrip.com/hotels/konaseema-hotels.html", mapUrl: mapSearch("Dindi Resorts Konaseema Andhra Pradesh") },
      { name: "Sterling Konaseema", type: "hotel", distance: "2 km", priceRange: "₹4,000 - ₹9,000/night", rating: 4.4, bookingUrl: "https://www.booking.com/searchresults.html?ss=Konaseema", mapUrl: mapSearch("Sterling Konaseema Resort") },
      { name: "Coconut Country Resort", type: "hotel", distance: "5 km", priceRange: "₹2,000 - ₹5,000/night", rating: 4.2, bookingUrl: "https://www.makemytrip.com/hotels/konaseema-hotels.html", mapUrl: mapSearch("Coconut Country Resort Konaseema") },
      { name: "Konaseema Kitchen", type: "restaurant", distance: "1 km", priceRange: "₹200 - ₹600", rating: 4.6, mapUrl: mapSearch("Konaseema Kitchen Restaurant") },
      { name: "Godavari Fish Point", type: "restaurant", distance: "3 km", priceRange: "₹150 - ₹500", rating: 4.4, mapUrl: mapSearch("Godavari Fish Point Konaseema") },
      { name: "Antarvedi Temple", type: "attraction", distance: "30 km", priceRange: "Free", rating: 4.5, mapUrl: mapSearch("Antarvedi Temple Andhra Pradesh") },
      { name: "Coringa Wildlife Sanctuary", type: "attraction", distance: "40 km", priceRange: "₹50 entry", rating: 4.3, mapUrl: mapSearch("Coringa Wildlife Sanctuary Kakinada") },
      { name: "Draksharamam Temple", type: "attraction", distance: "25 km", priceRange: "Free", rating: 4.6, mapUrl: mapSearch("Draksharamam Temple Andhra Pradesh") },
    ],
    travelInfo: {
      fromHyderabad: { distance: "480 km", time: "8 hours", mode: "Road / Train to Rajahmundry" },
      fromVisakhapatnam: { distance: "250 km", time: "5 hours", mode: "Road" },
      fromVijayawada: { distance: "200 km", time: "4 hours", mode: "Road" },
      estimatedDailyCost: { budget: "₹1,500 - ₹2,500", mid: "₹3,500 - ₹6,000", luxury: "₹7,000 - ₹15,000" },
      bestTimeToVisit: "October to March",
      idealDuration: "2-3 days",
    },
    cabServices: [
      { name: "Rajahmundry Cabs", pricePerKm: "₹11/km", contact: "+91 98765 55555" },
      { name: "Konaseema Local Autos", pricePerKm: "₹14/km", contact: "Available at bus stand" },
    ],
    guideContacts: [
      { name: "AP Tourism Helpline", type: "helpline", phone: "1800 425 4545", description: "24/7 toll-free AP Tourism helpline" },
      { name: "Dindi Resorts Booking", type: "tour_operator", phone: "+91 0884 2345678", description: "Backwater resort & boat ride bookings" },
      { name: "Konaseema Tourism", type: "tourism_office", phone: "+91 08856 232345", description: "Local tourism info & guide services" },
      { name: "Police / Emergency", type: "emergency", phone: "112", description: "All-India emergency helpline" },
    ],
  },
  "horsley-hills": {
    id: "horsley-hills",
    history: "Horsley Hills (Yenugu Mallama Konda) is a serene hill station in Chittoor district at an altitude of 1265m. Named after W.D. Horsley, the British collector who discovered its potential in 1870, it served as a summer retreat during the colonial era. The hills are part of the southernmost extension of the Eastern Ghats. A 1500-year-old Sampangi tree (the 'Tree of Life'), believed to be the oldest tree in South India, still stands here. The area's unique ecology supports rare species of flora and fauna.",
    culture: "Horsley Hills represents Rayalaseema's natural heritage. The hill is sacred to local Sugali (Lambadi) tribes. The region's culture blends Rayalaseema warrior traditions with pastoral tranquility. The nearby Madanapalle town is famous for Jiddu Krishnamurti's birthplace. Local handicrafts include Kalamkari prints and Kondapalli toys from the broader Andhra tradition.",
    guideInfo: {
      bestFor: ["Families with kids", "Couples", "Nature lovers", "Weekend getaway seekers", "Cyclists"],
      mustVisitSpots: ["1500-year-old Sampangi Tree", "Horsley Hills View Point", "Environmental Park", "Gali Bandalu (Wind Rocks)", "Gangothri Lake", "Madanapalle Krishnamurti Centre"],
      localTips: ["Perfect weekend getaway from Bangalore (150 km) or Tirupati (140 km)", "Cycling to the hilltop is popular — bikes available for rent", "Try the local ragi mudde and Rayalaseema chicken curry", "Evenings are misty and beautiful — carry a jacket", "Visit the 1500-year-old tree at sunrise for magical light"],
      safetyTips: ["Roads are steep with sharp curves", "Fog can reduce visibility — drive slowly", "Limited medical facilities — carry basic first aid", "No petrol pumps on the hill — fuel up before ascending"],
      whatToCarry: ["Warm clothes (surprisingly cold)", "Cycling gear (optional)", "Torch/flashlight", "Snacks & water", "Camera"],
    },
    nearbyPlaces: [
      { name: "Haritha Hill Resort (APTDC)", type: "hotel", distance: "0.5 km", priceRange: "₹1,500 - ₹3,500/night", rating: 4.0, bookingUrl: "https://www.makemytrip.com/hotels/horsley_hills-hotels.html", mapUrl: mapSearch("Haritha Hill Resort Horsley Hills") },
      { name: "Horsley Hills Guest House", type: "hotel", distance: "0.3 km", priceRange: "₹1,000 - ₹2,500/night", rating: 3.8, mapUrl: mapSearch("Horsley Hills Guest House Andhra Pradesh") },
      { name: "Hilltop Café", type: "restaurant", distance: "0.5 km", priceRange: "₹100 - ₹300", rating: 3.7, mapUrl: mapSearch("Hilltop Cafe Horsley Hills") },
      { name: "Rayalaseema Mess", type: "restaurant", distance: "3 km", priceRange: "₹100 - ₹250", rating: 4.2, mapUrl: mapSearch("Rayalaseema Mess Madanapalle") },
      { name: "1500-year-old Sampangi Tree", type: "attraction", distance: "1 km", priceRange: "Free", rating: 4.5, mapUrl: mapSearch("Sampangi Tree Horsley Hills") },
      { name: "Gali Bandalu (Wind Rocks)", type: "attraction", distance: "2 km", priceRange: "Free", rating: 4.2, mapUrl: mapSearch("Gali Bandalu Wind Rocks Horsley Hills") },
      { name: "Gangothri Lake", type: "attraction", distance: "3 km", priceRange: "Free", rating: 4.0, mapUrl: mapSearch("Gangothri Lake Horsley Hills") },
    ],
    travelInfo: {
      fromHyderabad: { distance: "380 km", time: "7 hours", mode: "Road" },
      fromVisakhapatnam: { distance: "820 km", time: "14 hours", mode: "Train + Road" },
      fromVijayawada: { distance: "450 km", time: "8 hours", mode: "Road" },
      estimatedDailyCost: { budget: "₹1,000 - ₹2,000", mid: "₹2,500 - ₹4,500", luxury: "₹5,000 - ₹9,000" },
      bestTimeToVisit: "September to February",
      idealDuration: "1-2 days",
    },
    cabServices: [
      { name: "Madanapalle Cabs", pricePerKm: "₹10/km", contact: "+91 98765 66666" },
      { name: "Tirupati Outstation", pricePerKm: "₹12/km", contact: "+91 87654 77777" },
    ],
    guideContacts: [
      { name: "AP Tourism Helpline", type: "helpline", phone: "1800 425 4545", description: "24/7 toll-free AP Tourism helpline" },
      { name: "APTDC Horsley Hills", type: "tourism_office", phone: "+91 08571 256325", description: "Haritha Hill Resort bookings & info" },
      { name: "Forest Dept (Chittoor)", type: "tourism_office", phone: "+91 08572 222225", description: "Trekking permits & nature park info" },
      { name: "Police / Emergency", type: "emergency", phone: "112", description: "All-India emergency helpline" },
    ],
  },
  "rishikonda": {
    id: "rishikonda",
    history: "Rishikonda Beach, located 8 km from Visakhapatnam city, has been a popular destination since the 1960s when the APTDC developed it as a beach resort. The name derives from 'Rishi' (sage) and 'Konda' (hill), referring to the sages who once meditated on the rocky hills surrounding the beach. Today it's known as the 'Jewel of the East Coast' and is one of India's best beaches for water sports.",
    culture: "Rishikonda is at the heart of Vizag's cosmopolitan beach culture. The beach hosts annual surfing competitions, sand sculpture festivals, and beach volleyball tournaments. Local seafood cuisine, particularly the Andhra-style fish curry, is a major cultural draw.",
    guideInfo: {
      bestFor: ["Beach lovers", "Water sports enthusiasts", "Couples", "Families", "Solo travelers"],
      mustVisitSpots: ["Rishikonda Beach (water sports)", "Thotlakonda Buddhist Complex", "Kailasagiri Hill Park", "INS Kurusura Submarine Museum", "Dolphin's Nose", "RK Beach Promenade"],
      localTips: ["Water sports are best from 8-11 AM when waves are perfect", "Surfing lessons available for ₹500-1000 per session", "Sunset views from Kailasagiri are spectacular", "Try the local seafood at beachside shacks — fish fry is a must"],
      safetyTips: ["Swim only in designated areas with lifeguards", "Strong undercurrents — don't go too deep", "Apply sunscreen generously", "Don't swim after dark"],
      whatToCarry: ["Swimwear & towel", "Sunscreen (SPF 50+)", "Sunglasses & hat", "Waterproof phone pouch", "Change of clothes"],
    },
    nearbyPlaces: [
      { name: "Novotel Visakhapatnam", type: "hotel", distance: "3 km", priceRange: "₹5,000 - ₹12,000/night", rating: 4.6, bookingUrl: "https://www.makemytrip.com/hotels/visakhapatnam-hotels.html", mapUrl: mapSearch("Novotel Visakhapatnam Varun Beach") },
      { name: "Haritha Beach Resort", type: "hotel", distance: "0.3 km", priceRange: "₹2,500 - ₹5,000/night", rating: 4.2, bookingUrl: "https://www.booking.com/searchresults.html?ss=Rishikonda+Beach", mapUrl: mapSearch("Haritha Beach Resort Rishikonda Visakhapatnam") },
      { name: "The Park Visakhapatnam", type: "hotel", distance: "5 km", priceRange: "₹4,000 - ₹10,000/night", rating: 4.5, bookingUrl: "https://www.makemytrip.com/hotels/visakhapatnam-hotels.html", mapUrl: mapSearch("The Park Hotel Visakhapatnam") },
      { name: "Bay 15 Café", type: "pub", distance: "5 km", priceRange: "₹500 - ₹1,500", rating: 4.4, mapUrl: mapSearch("Bay 15 Cafe Visakhapatnam") },
      { name: "Sea Inn Restaurant", type: "restaurant", distance: "1 km", priceRange: "₹300 - ₹800", rating: 4.3, mapUrl: mapSearch("Sea Inn Restaurant Rishikonda Beach") },
      { name: "Dharani Restaurant", type: "restaurant", distance: "4 km", priceRange: "₹200 - ₹600", rating: 4.5, mapUrl: mapSearch("Dharani Restaurant Visakhapatnam") },
      { name: "Coastal Kitchen", type: "restaurant", distance: "3 km", priceRange: "₹300 - ₹700", rating: 4.3, mapUrl: mapSearch("Coastal Kitchen Visakhapatnam") },
      { name: "Thotlakonda Buddhist Complex", type: "attraction", distance: "5 km", priceRange: "₹25 entry", rating: 4.4, mapUrl: mapSearch("Thotlakonda Buddhist Complex Visakhapatnam") },
      { name: "Kailasagiri", type: "attraction", distance: "8 km", priceRange: "₹50 entry", rating: 4.5, mapUrl: mapSearch("Kailasagiri Hill Park Visakhapatnam") },
      { name: "INS Kurusura Submarine Museum", type: "attraction", distance: "10 km", priceRange: "₹40 entry", rating: 4.5, mapUrl: mapSearch("INS Kurusura Submarine Museum Visakhapatnam") },
    ],
    travelInfo: {
      fromHyderabad: { distance: "620 km", time: "10 hours", mode: "Flight (1.5h) / Train" },
      fromVisakhapatnam: { distance: "8 km", time: "20 mins", mode: "Road" },
      fromVijayawada: { distance: "350 km", time: "6 hours", mode: "Train / Road" },
      estimatedDailyCost: { budget: "₹1,500 - ₹2,500", mid: "₹3,500 - ₹6,000", luxury: "₹7,000 - ₹15,000" },
      bestTimeToVisit: "October to March",
      idealDuration: "1-2 days",
    },
    cabServices: [
      { name: "Vizag Yellow Cabs", pricePerKm: "₹10/km", contact: "+91 98765 12345" },
      { name: "Ola / Uber", pricePerKm: "₹8-12/km", contact: "App based" },
    ],
    guideContacts: [
      { name: "AP Tourism Helpline", type: "helpline", phone: "1800 425 4545", description: "24/7 toll-free AP Tourism helpline" },
      { name: "APTDC Vizag Office", type: "tourism_office", phone: "+91 0891 2788820", description: "Vizag region tourism info & resort bookings" },
      { name: "Vizag Water Sports", type: "tour_operator", phone: "+91 90000 45678", description: "Surfing, jet skiing & beach activities at Rishikonda" },
      { name: "Coast Guard (Vizag)", type: "emergency", phone: "+91 0891 2739256", description: "Maritime rescue & sea emergency" },
      { name: "Police / Emergency", type: "emergency", phone: "112", description: "All-India emergency helpline" },
    ],
  },
  "yarada": {
    id: "yarada",
    history: "Yarada Beach is one of the most secluded and pristine beaches near Visakhapatnam, surrounded by hills on three sides — making it naturally sheltered and scenic. The area was historically part of the naval and military zone. The beach remained relatively undiscovered until the early 2000s when eco-tourism initiatives opened it to visitors.",
    culture: "Yarada represents the unspoiled, raw beauty of Andhra's coastline. The beach is popular among adventure enthusiasts for camping, trekking the surrounding Dolphin's Nose hill, and sunrise watching. Local fishing communities around Yarada still practice traditional net-fishing methods.",
    guideInfo: {
      bestFor: ["Nature lovers", "Adventure seekers", "Couples seeking privacy", "Photographers", "Meditation & yoga practitioners"],
      mustVisitSpots: ["Yarada Beach", "Dolphin's Nose Viewpoint", "Lighthouse", "Mangamaripeta Beach (nearby)", "Ross Hill Church"],
      localTips: ["Best visited early morning for sunrise — it's magical", "Carry your own food and water — no shops at the beach", "Great for camping — but get permission from locals", "Combine with Dolphin's Nose trek for a full-day adventure"],
      safetyTips: ["No lifeguards — swim with caution", "Beach is secluded — avoid visiting alone after dark", "Roads to the beach are narrow — drive carefully", "Check tide timings before planning"],
      whatToCarry: ["Food & water (essential)", "Camping gear if staying", "Comfortable trekking shoes", "Torch/flashlight", "Sunscreen"],
    },
    nearbyPlaces: [
      { name: "The Park Hotel Vizag", type: "hotel", distance: "10 km", priceRange: "₹4,000 - ₹10,000/night", rating: 4.5, bookingUrl: "https://www.makemytrip.com/hotels/visakhapatnam-hotels.html", mapUrl: mapSearch("The Park Hotel Visakhapatnam") },
      { name: "Palm Beach Hotel", type: "hotel", distance: "8 km", priceRange: "₹2,000 - ₹4,500/night", rating: 4.1, bookingUrl: "https://www.booking.com/searchresults.html?ss=Visakhapatnam", mapUrl: mapSearch("Palm Beach Hotel Visakhapatnam") },
      { name: "Coastal Kitchen", type: "restaurant", distance: "3 km", priceRange: "₹250 - ₹600", rating: 4.2, mapUrl: mapSearch("Coastal Kitchen Visakhapatnam") },
      { name: "Dolphin's Nose Viewpoint", type: "attraction", distance: "2 km", priceRange: "Free", rating: 4.6, mapUrl: mapSearch("Dolphins Nose Viewpoint Visakhapatnam") },
      { name: "Lighthouse", type: "attraction", distance: "3 km", priceRange: "₹20 entry", rating: 4.3, mapUrl: mapSearch("Lighthouse Visakhapatnam") },
      { name: "Ross Hill Church", type: "attraction", distance: "5 km", priceRange: "Free", rating: 4.2, mapUrl: mapSearch("Ross Hill Church Visakhapatnam") },
    ],
    travelInfo: {
      fromHyderabad: { distance: "630 km", time: "10 hours", mode: "Flight (1.5h) / Train" },
      fromVisakhapatnam: { distance: "15 km", time: "35 mins", mode: "Road" },
      fromVijayawada: { distance: "360 km", time: "6.5 hours", mode: "Train / Road" },
      estimatedDailyCost: { budget: "₹1,200 - ₹2,000", mid: "₹3,000 - ₹5,000", luxury: "₹6,000 - ₹12,000" },
      bestTimeToVisit: "November to March",
      idealDuration: "1 day",
    },
    cabServices: [
      { name: "Vizag Yellow Cabs", pricePerKm: "₹10/km", contact: "+91 98765 12345" },
      { name: "Ola / Uber", pricePerKm: "₹8-12/km", contact: "App based" },
    ],
    guideContacts: [
      { name: "AP Tourism Helpline", type: "helpline", phone: "1800 425 4545", description: "24/7 toll-free AP Tourism helpline" },
      { name: "APTDC Vizag Office", type: "tourism_office", phone: "+91 0891 2788820", description: "Vizag region tourism info & resort bookings" },
      { name: "Coast Guard (Vizag)", type: "emergency", phone: "+91 0891 2739256", description: "Maritime rescue & sea emergency" },
      { name: "Police / Emergency", type: "emergency", phone: "112", description: "All-India emergency helpline" },
    ],
  },
  "nagarjuna-sagar": {
    id: "nagarjuna-sagar",
    history: "Nagarjuna Sagar is named after the great Buddhist scholar Acharya Nagarjuna who lived here in the 2nd century CE. The dam, completed in 1969, is one of the world's largest masonry dams built across the Krishna River. The Nagarjunakonda island, now partially submerged, was a major Buddhist center of the Ikshvaku dynasty (3rd-4th century CE). Excavations revealed monasteries, stupas, and universities that rivaled Nalanda.",
    culture: "The region has deep Buddhist heritage with artifacts from the Ikshvaku, Satavahana, and Chalukya periods. The island museum showcases exquisite limestone sculptures, inscriptions, and relics. Local festivals blend Telugu traditions with Buddhist cultural elements. The dam area is known for its spectacular illumination shows.",
    guideInfo: {
      bestFor: ["History buffs", "Families", "Photographers", "Weekend getaway"],
      mustVisitSpots: ["Nagarjunakonda Island Museum", "Nagarjuna Sagar Dam", "Ethipothala Falls", "Anupu Archaeological Site", "Srisailam Tiger Reserve Entry"],
      localTips: ["Take the boat to Nagarjunakonda island — boats run at fixed timings", "Visit during dam release season (Aug-Oct) for spectacular water overflow views", "Try the local Andhra-style fish curry at riverside restaurants", "The light and sound show at the dam is a must-see"],
      safetyTips: ["Boat timings are strict — don't miss the last boat back", "Carry water and sun protection on the island", "Roads near the dam can be slippery during monsoon"],
      whatToCarry: ["Camera", "Sun hat & sunscreen", "Water bottle", "Comfortable walking shoes"],
    },
    nearbyPlaces: [
      { name: "Nagarjuna Sagar Rest House", type: "hotel", distance: "1 km", priceRange: "₹1,000 - ₹3,000/night", rating: 3.8, mapUrl: mapSearch("Nagarjuna Sagar Rest House") },
      { name: "Haritha Vijay Vihar (APTDC)", type: "hotel", distance: "2 km", priceRange: "₹1,500 - ₹4,000/night", rating: 4.0, mapUrl: mapSearch("Haritha Vijay Vihar Nagarjuna Sagar") },
      { name: "Krishna River Fish Point", type: "restaurant", distance: "1 km", priceRange: "₹150 - ₹400", rating: 4.3, mapUrl: mapSearch("Fish Restaurant Nagarjuna Sagar") },
      { name: "Nagarjunakonda Island Museum", type: "attraction", distance: "Boat ride", priceRange: "₹50 entry + ₹75 boat", rating: 4.5, mapUrl: mapSearch("Nagarjunakonda Island Museum") },
      { name: "Ethipothala Falls", type: "attraction", distance: "11 km", priceRange: "₹20 entry", rating: 4.2, mapUrl: mapSearch("Ethipothala Falls Andhra Pradesh") },
    ],
    travelInfo: {
      fromHyderabad: { distance: "165 km", time: "3 hours", mode: "Road" },
      fromVisakhapatnam: { distance: "470 km", time: "8.5 hours", mode: "Road / Train" },
      fromVijayawada: { distance: "185 km", time: "3.5 hours", mode: "Road" },
      estimatedDailyCost: { budget: "₹1,200 - ₹2,000", mid: "₹2,500 - ₹4,000", luxury: "₹5,000 - ₹8,000" },
      bestTimeToVisit: "August to March",
      idealDuration: "1-2 days",
    },
    cabServices: [
      { name: "Macherla Cabs", pricePerKm: "₹10/km", contact: "+91 94403 11222" },
      { name: "Ola / Uber", pricePerKm: "₹10-14/km", contact: "App based" },
    ],
    guideContacts: [
      { name: "AP Tourism Helpline", type: "helpline", phone: "1800 425 4545", description: "24/7 toll-free AP Tourism helpline" },
      { name: "Nagarjunakonda Museum Office", type: "tourism_office", phone: "+91 08680 277555", description: "Island museum timings & boat schedule info" },
      { name: "Police / Emergency", type: "emergency", phone: "112", description: "All-India emergency helpline" },
    ],
  },
  "ahobilam": {
    id: "ahobilam",
    history: "Ahobilam is an ancient pilgrimage center in the Nallamala Hills, believed to be where Lord Narasimha appeared to slay Hiranyakashipu. The nine Narasimha temples (Nava Narasimha Kshetras) date back to the 9th-11th centuries under Chalukya patronage. The upper Ahobilam temples require a challenging trek through dense forests, making it a spiritual and adventure destination.",
    culture: "The temple town is administered by the Ahobila Mutt, one of the most important Vaishnavite institutions. Festivals like Narasimha Jayanti and Brahmotsavam draw thousands. Local tribal communities maintain centuries-old traditions of forest worship. The region is known for its honey, turmeric, and forest herbs.",
    guideInfo: {
      bestFor: ["Pilgrims", "Trekkers", "Nature lovers", "History buffs"],
      mustVisitSpots: ["Upper Ahobilam (Ugra Narasimha)", "Lower Ahobilam Temple Complex", "All 9 Narasimha Temples", "Nallamala Forest Trek", "Ahobila Mutt"],
      localTips: ["Start the upper Ahobilam trek early morning to avoid heat", "Hire a local guide — trails are not well-marked", "Try the temple prasadam — especially the pulihora and laddu", "Wear sturdy shoes for the rocky forest trails"],
      safetyTips: ["Trek in groups, never alone in the forest", "Carry enough water — no shops on the trekking route", "Watch for wild animals — leopards and bears inhabit the area", "Mobile network is very limited in upper Ahobilam"],
      whatToCarry: ["Sturdy trekking shoes", "2L+ water per person", "Energy bars & dry fruits", "Rain jacket (monsoon)", "First aid kit"],
    },
    nearbyPlaces: [
      { name: "APTDC Guest House Ahobilam", type: "hotel", distance: "0.5 km", priceRange: "₹800 - ₹2,000/night", rating: 3.5, mapUrl: mapSearch("APTDC Guest House Ahobilam") },
      { name: "Ahobila Mutt Guest House", type: "hotel", distance: "0.3 km", priceRange: "₹500 - ₹1,500/night", rating: 3.8, mapUrl: mapSearch("Ahobila Mutt Guest House") },
      { name: "Temple Annadanam Hall", type: "restaurant", distance: "0.2 km", priceRange: "Free (temple food)", rating: 4.5, mapUrl: mapSearch("Ahobilam Temple Annadanam") },
      { name: "Ugra Narasimha Temple (Upper)", type: "attraction", distance: "8 km trek", priceRange: "Free", rating: 4.8, mapUrl: mapSearch("Ugra Narasimha Temple Ahobilam") },
      { name: "Nallamala Forest View", type: "attraction", distance: "5 km", priceRange: "Free", rating: 4.4, mapUrl: mapSearch("Nallamala Forest Ahobilam") },
    ],
    travelInfo: {
      fromHyderabad: { distance: "360 km", time: "6.5 hours", mode: "Road via Kurnool" },
      fromVisakhapatnam: { distance: "550 km", time: "10 hours", mode: "Road" },
      fromVijayawada: { distance: "310 km", time: "5.5 hours", mode: "Road" },
      estimatedDailyCost: { budget: "₹800 - ₹1,500", mid: "₹2,000 - ₹3,500", luxury: "₹4,000 - ₹6,000" },
      bestTimeToVisit: "October to February",
      idealDuration: "2 days",
    },
    cabServices: [
      { name: "Nandyal Cabs", pricePerKm: "₹11/km", contact: "+91 94412 33455" },
      { name: "Kurnool Tours", pricePerKm: "₹12/km", contact: "+91 98490 55667" },
    ],
    guideContacts: [
      { name: "AP Tourism Helpline", type: "helpline", phone: "1800 425 4545", description: "24/7 toll-free AP Tourism helpline" },
      { name: "Ahobila Mutt Office", type: "temple", phone: "+91 08514 282233", description: "Temple darshan timings & accommodation" },
      { name: "Police / Emergency", type: "emergency", phone: "112", description: "All-India emergency helpline" },
    ],
  },
  "mantralayam": {
    id: "mantralayam",
    history: "Mantralayam is the holy resting place (Brindavana) of Sri Raghavendra Swami, a 17th-century Madhwa saint who entered Sanjivani Samadhi (live burial in meditation) in 1671 CE. The town on the banks of the Tungabhadra River has been a major pilgrimage center for over 350 years. It is believed that Sri Raghavendra Swami still blesses devotees from within the Brindavana.",
    culture: "The town revolves around the Raghavendra Swami Mutt. Daily poojas, Aradhana festival (annual celebration of the saint's Samadhi), and continuous devotional music define the cultural landscape. The Aradhana draws over 5 lakh devotees. Mantralayam is also known for its Madhwa Brahmin cuisine and prasadam.",
    guideInfo: {
      bestFor: ["Pilgrims", "Spiritual seekers", "Families", "Cultural tourists"],
      mustVisitSpots: ["Sri Raghavendra Swami Brindavana", "Manchale (Holy Well)", "Tungabhadra River Ghat", "Panchamukhi Anjaneya Temple", "Sri Raghavendra Swami Museum"],
      localTips: ["Visit early morning for less crowded darshan", "Don't miss the morning and evening Pooja at the Brindavana", "Try the Mutt's prasadam — especially the kosambari and payasa", "Book accommodation at the Mutt guest houses well in advance during Aradhana"],
      safetyTips: ["Town gets extremely crowded during Aradhana (August)", "Keep valuables safe during peak pilgrimage times", "Be mindful of river currents at the ghat"],
      whatToCarry: ["Traditional/modest clothing", "Donation materials", "Comfortable footwear (lots of walking)", "Camera (photography restricted inside sanctum)"],
    },
    nearbyPlaces: [
      { name: "Raghavendra Mutt Guest House", type: "hotel", distance: "0.1 km", priceRange: "₹300 - ₹1,500/night", rating: 4.0, mapUrl: mapSearch("Raghavendra Mutt Guest House Mantralayam") },
      { name: "Hotel Mayura", type: "hotel", distance: "0.5 km", priceRange: "₹800 - ₹2,500/night", rating: 3.7, mapUrl: mapSearch("Hotel Mayura Mantralayam") },
      { name: "Mutt Annadanam (Free Meals)", type: "restaurant", distance: "0.1 km", priceRange: "Free", rating: 4.8, mapUrl: mapSearch("Mantralayam Mutt Annadanam") },
      { name: "Sri Raghavendra Restaurant", type: "restaurant", distance: "0.3 km", priceRange: "₹100 - ₹300", rating: 4.0, mapUrl: mapSearch("Sri Raghavendra Restaurant Mantralayam") },
      { name: "Manchale (Holy Well)", type: "attraction", distance: "0.5 km", priceRange: "Free", rating: 4.5, mapUrl: mapSearch("Manchale Mantralayam") },
    ],
    travelInfo: {
      fromHyderabad: { distance: "370 km", time: "6 hours", mode: "Road" },
      fromVisakhapatnam: { distance: "750 km", time: "13 hours", mode: "Road / Flight + Road" },
      fromVijayawada: { distance: "340 km", time: "5.5 hours", mode: "Road" },
      estimatedDailyCost: { budget: "₹500 - ₹1,000", mid: "₹1,500 - ₹3,000", luxury: "₹3,000 - ₹5,000" },
      bestTimeToVisit: "October to March",
      idealDuration: "1-2 days",
    },
    cabServices: [
      { name: "Kurnool Travel Services", pricePerKm: "₹10/km", contact: "+91 94406 77889" },
      { name: "Ola / Uber", pricePerKm: "₹9-13/km", contact: "App based" },
    ],
    guideContacts: [
      { name: "AP Tourism Helpline", type: "helpline", phone: "1800 425 4545", description: "24/7 toll-free AP Tourism helpline" },
      { name: "Raghavendra Mutt Office", type: "temple", phone: "+91 08518 200200", description: "Darshan timings, accommodation & pooja bookings" },
      { name: "Police / Emergency", type: "emergency", phone: "112", description: "All-India emergency helpline" },
    ],
  },
  "talakona": {
    id: "talakona",
    history: "Talakona, at 270 feet, is the highest waterfall in Andhra Pradesh. Located within the Sri Venkateswara National Park, this cascading wonder has been a sacred bathing spot for centuries. Ancient inscriptions suggest pilgrims visiting Tirumala would stop here to bathe in the waterfall's holy waters. The surrounding forests are among the most biodiverse in South India.",
    culture: "Local tribal communities consider the waterfall sacred and perform rituals during festivals. The Sri Venkateswara National Park around Talakona is home to slender loris, golden gecko, and the Indian giant squirrel. The forest department organizes nature camps and eco-tours promoting sustainable tourism.",
    guideInfo: {
      bestFor: ["Trekkers", "Nature lovers", "Wildlife enthusiasts", "Photographers"],
      mustVisitSpots: ["Talakona Waterfalls", "Sri Venkateswara National Park", "Nature Trail to the falls", "Deer Park", "Observation Tower"],
      localTips: ["Visit during or just after monsoon (Jul-Oct) for maximum water flow", "The 2 km trek to the falls is moderate but rocky", "Carry your own food — limited options near the falls", "Start early morning for best lighting and fewer crowds"],
      safetyTips: ["Rocks near the waterfall are extremely slippery", "Don't venture beyond marked boundaries", "Leeches are common during monsoon — carry salt", "No swimming allowed in the waterfall pool"],
      whatToCarry: ["Waterproof shoes/sandals", "Change of clothes", "Insect repellent", "Water & snacks", "Plastic bags for wet clothes"],
    },
    nearbyPlaces: [
      { name: "Forest Rest House", type: "hotel", distance: "0.5 km", priceRange: "₹500 - ₹1,500/night", rating: 3.5, mapUrl: mapSearch("Talakona Forest Rest House") },
      { name: "APTDC Haritha Resort Tirupati", type: "hotel", distance: "45 km", priceRange: "₹1,500 - ₹3,500/night", rating: 4.0, mapUrl: mapSearch("APTDC Haritha Resort Tirupati") },
      { name: "Local Dhaba near falls", type: "restaurant", distance: "2 km", priceRange: "₹100 - ₹200", rating: 3.5, mapUrl: mapSearch("Talakona Waterfalls Food Stall") },
      { name: "Sri Venkateswara National Park", type: "attraction", distance: "0 km", priceRange: "₹25 entry", rating: 4.5, mapUrl: mapSearch("Sri Venkateswara National Park Tirupati") },
    ],
    travelInfo: {
      fromHyderabad: { distance: "620 km", time: "10 hours", mode: "Road / Flight to Tirupati + Road" },
      fromVisakhapatnam: { distance: "750 km", time: "12 hours", mode: "Road / Flight" },
      fromVijayawada: { distance: "440 km", time: "7.5 hours", mode: "Road" },
      estimatedDailyCost: { budget: "₹800 - ₹1,500", mid: "₹2,000 - ₹3,500", luxury: "₹4,000 - ₹7,000" },
      bestTimeToVisit: "July to January",
      idealDuration: "1 day",
    },
    cabServices: [
      { name: "Tirupati Cabs", pricePerKm: "₹12/km", contact: "+91 94404 55667" },
      { name: "Ola / Uber", pricePerKm: "₹10-14/km", contact: "App based" },
    ],
    guideContacts: [
      { name: "AP Tourism Helpline", type: "helpline", phone: "1800 425 4545", description: "24/7 toll-free AP Tourism helpline" },
      { name: "Forest Dept Talakona", type: "tourism_office", phone: "+91 08585 244025", description: "Entry permits, trekking info & rest house booking" },
      { name: "Police / Emergency", type: "emergency", phone: "112", description: "All-India emergency helpline" },
    ],
  },
  "ethipothala": {
    id: "ethipothala",
    history: "Ethipothala Falls is a 70-foot waterfall formed by the confluence of three streams — Nakka Vagu, Tummala Vagu, and Chandravanka Vagu — near Nagarjuna Sagar. The falls were historically used by local tribes for bathing rituals and are surrounded by limestone formations. A crocodile breeding center was established nearby to protect the local mugger crocodile population.",
    culture: "The area around Ethipothala is rural Telugu countryside with rich agricultural traditions. Local villages practice traditional weaving, pottery, and farming. The falls are a popular picnic destination for families from surrounding towns. The crocodile breeding center raises awareness about reptile conservation.",
    guideInfo: {
      bestFor: ["Families", "Nature lovers", "Photographers", "Day trippers"],
      mustVisitSpots: ["Ethipothala Falls", "Crocodile Breeding Center", "Nagarjuna Sagar Dam (nearby)", "Limestone Rock Formations", "Chandravanka Stream"],
      localTips: ["Visit during or after monsoon for the best water flow", "The crocodile center is free and very educational for kids", "Combine with a Nagarjuna Sagar Dam visit for a full day trip", "Try the local Andhra meals at roadside dhabas"],
      safetyTips: ["Stay behind safety railings at the viewpoint", "Rocks near the falls are very slippery", "Don't enter the water — strong undercurrents", "Keep safe distance from crocodile enclosures"],
      whatToCarry: ["Camera", "Water & snacks", "Comfortable shoes", "Raincoat (monsoon season)"],
    },
    nearbyPlaces: [
      { name: "Nagarjuna Sagar Hotels", type: "hotel", distance: "11 km", priceRange: "₹1,000 - ₹3,000/night", rating: 3.8, mapUrl: mapSearch("Hotels near Nagarjuna Sagar") },
      { name: "Local Dhaba", type: "restaurant", distance: "2 km", priceRange: "₹100 - ₹250", rating: 3.5, mapUrl: mapSearch("Restaurants near Ethipothala Falls") },
      { name: "Crocodile Breeding Center", type: "attraction", distance: "0.5 km", priceRange: "Free", rating: 4.0, mapUrl: mapSearch("Crocodile Breeding Center Ethipothala") },
      { name: "Nagarjuna Sagar Dam", type: "attraction", distance: "11 km", priceRange: "₹25 entry", rating: 4.5, mapUrl: mapSearch("Nagarjuna Sagar Dam") },
    ],
    travelInfo: {
      fromHyderabad: { distance: "175 km", time: "3.5 hours", mode: "Road" },
      fromVisakhapatnam: { distance: "480 km", time: "9 hours", mode: "Road" },
      fromVijayawada: { distance: "195 km", time: "4 hours", mode: "Road" },
      estimatedDailyCost: { budget: "₹800 - ₹1,500", mid: "₹2,000 - ₹3,500", luxury: "₹4,000 - ₹6,000" },
      bestTimeToVisit: "July to December",
      idealDuration: "Half day",
    },
    cabServices: [
      { name: "Local Auto/Cab", pricePerKm: "₹10/km", contact: "+91 94403 22334" },
      { name: "Macherla Tours", pricePerKm: "₹11/km", contact: "+91 98490 77889" },
    ],
    guideContacts: [
      { name: "AP Tourism Helpline", type: "helpline", phone: "1800 425 4545", description: "24/7 toll-free AP Tourism helpline" },
      { name: "Police / Emergency", type: "emergency", phone: "112", description: "All-India emergency helpline" },
    ],
  },
  "pulicat-lake": {
    id: "pulicat-lake",
    history: "Pulicat Lake is the second largest brackish water lagoon in India, spanning the AP-Tamil Nadu border. The Dutch East India Company established a trading post here in 1609, making it one of the earliest European settlements in India. The Pulicat Bird Sanctuary was established to protect the rich avian biodiversity. The town has remnants of Dutch architecture, cemeteries, and a fort.",
    culture: "Local fishing communities have practiced traditional lagoon fishing for centuries using handmade nets and country boats. The annual flamingo migration (Nov-Mar) is a spectacular event drawing birdwatchers worldwide. The Pulicat town retains Dutch-era churches, cemeteries, and colonial architecture. Local cuisine features fresh lagoon fish and prawn preparations.",
    guideInfo: {
      bestFor: ["Birdwatchers", "History buffs", "Nature photographers", "Quiet getaway seekers"],
      mustVisitSpots: ["Pulicat Bird Sanctuary", "Flamingo Point", "Dutch Cemetery", "Dutch Fort Ruins", "Pulicat Lagoon Boat Ride", "Lighthouse"],
      localTips: ["Visit between November and March for flamingo season", "Hire a local fisherman's boat for the best lagoon experience", "Early morning (6-8 AM) is prime birdwatching time", "Try the local prawn curry and fish fry — incredibly fresh"],
      safetyTips: ["Carry binoculars and sun protection", "Some areas have marshy terrain — wear proper footwear", "Boat rides can be bumpy — not for motion sickness-prone visitors"],
      whatToCarry: ["Binoculars", "Camera with zoom lens", "Sun hat & sunscreen", "Water & snacks", "Insect repellent"],
    },
    nearbyPlaces: [
      { name: "AP Tourism Guest House", type: "hotel", distance: "2 km", priceRange: "₹800 - ₹2,000/night", rating: 3.5, mapUrl: mapSearch("AP Tourism Guest House Pulicat") },
      { name: "Local Fish Point", type: "restaurant", distance: "1 km", priceRange: "₹100 - ₹300", rating: 4.2, mapUrl: mapSearch("Fish Restaurant Pulicat Lake") },
      { name: "Pulicat Bird Sanctuary", type: "attraction", distance: "0 km", priceRange: "₹25 entry", rating: 4.4, mapUrl: mapSearch("Pulicat Bird Sanctuary") },
      { name: "Dutch Cemetery", type: "attraction", distance: "1.5 km", priceRange: "Free", rating: 4.0, mapUrl: mapSearch("Dutch Cemetery Pulicat") },
    ],
    travelInfo: {
      fromHyderabad: { distance: "580 km", time: "9 hours", mode: "Road / Flight to Chennai + Road" },
      fromVisakhapatnam: { distance: "780 km", time: "13 hours", mode: "Road / Flight" },
      fromVijayawada: { distance: "380 km", time: "6 hours", mode: "Road" },
      estimatedDailyCost: { budget: "₹800 - ₹1,500", mid: "₹2,000 - ₹3,500", luxury: "₹4,000 - ₹6,000" },
      bestTimeToVisit: "November to March",
      idealDuration: "1 day",
    },
    cabServices: [
      { name: "Sullurupeta Cabs", pricePerKm: "₹10/km", contact: "+91 94405 66778" },
      { name: "Nellore Travels", pricePerKm: "₹11/km", contact: "+91 98490 44556" },
    ],
    guideContacts: [
      { name: "AP Tourism Helpline", type: "helpline", phone: "1800 425 4545", description: "24/7 toll-free AP Tourism helpline" },
      { name: "Forest Dept Pulicat", type: "tourism_office", phone: "+91 08623 245677", description: "Bird sanctuary permits & boat booking" },
      { name: "Police / Emergency", type: "emergency", phone: "112", description: "All-India emergency helpline" },
    ],
  },
  "lambasingi": {
    id: "lambasingi",
    history: "Lambasingi, at approximately 1000m altitude in the Chintapalli mandal of Visakhapatnam district, is known as the 'Kashmir of Andhra Pradesh' due to its sub-zero winter temperatures — rare for a South Indian location. The hamlet was relatively unknown until recent years when travelers discovered its misty valleys and pepper plantations. The local Valmiki and Bagata tribal communities have inhabited these hills for centuries.",
    culture: "The tribal communities practice traditional agriculture — growing pepper, coffee, turmeric, and jackfruit. The Valmiki tribals are known for their folk music and dances performed during harvest festivals. Lambasingi's pepper and turmeric are prized for their quality. The area is gaining recognition as an eco-tourism destination with community-led homestays.",
    guideInfo: {
      bestFor: ["Adventure seekers", "Couples", "Nature lovers", "Photographers", "Cold weather enthusiasts"],
      mustVisitSpots: ["Kothapalli Waterfalls", "Thajangi Reservoir", "Lambasingi View Point", "Pepper Plantations", "Misty Valley Sunrise Point"],
      localTips: ["Visit in December-January for sub-zero temperatures and morning frost", "Stay overnight to experience the fog-covered dawn", "Buy organic pepper and turmeric from tribal farmers", "The drive from Vizag through the ghat roads is scenic itself"],
      safetyTips: ["Roads are narrow and winding — drive very cautiously, especially in fog", "No petrol pumps after Chintapalli — fill up before", "Very limited mobile network", "Carry warm clothing even in mild winter months"],
      whatToCarry: ["Heavy woolen clothes & blankets", "Torch/flashlight", "Cash (no ATMs)", "Hot water thermos", "Warm socks & gloves"],
    },
    nearbyPlaces: [
      { name: "Tribal Homestays", type: "hotel", distance: "0 km", priceRange: "₹500 - ₹1,500/night", rating: 4.0, mapUrl: mapSearch("Lambasingi Homestay Visakhapatnam") },
      { name: "Lambasingi Camp Sites", type: "hotel", distance: "1 km", priceRange: "₹800 - ₹2,000/night", rating: 4.2, mapUrl: mapSearch("Lambasingi Camping Visakhapatnam") },
      { name: "Local Tribal Meals", type: "restaurant", distance: "0.5 km", priceRange: "₹100 - ₹200", rating: 4.0, mapUrl: mapSearch("Lambasingi Food Stall") },
      { name: "Kothapalli Waterfalls", type: "attraction", distance: "5 km", priceRange: "Free", rating: 4.3, mapUrl: mapSearch("Kothapalli Waterfalls Lambasingi") },
      { name: "Thajangi Reservoir", type: "attraction", distance: "3 km", priceRange: "Free", rating: 4.1, mapUrl: mapSearch("Thajangi Reservoir Lambasingi") },
    ],
    travelInfo: {
      fromHyderabad: { distance: "700 km", time: "12 hours", mode: "Flight to Vizag + Road" },
      fromVisakhapatnam: { distance: "107 km", time: "3.5 hours", mode: "Road (via Chintapalli)" },
      fromVijayawada: { distance: "490 km", time: "9 hours", mode: "Road" },
      estimatedDailyCost: { budget: "₹800 - ₹1,500", mid: "₹2,000 - ₹3,500", luxury: "₹4,000 - ₹6,000" },
      bestTimeToVisit: "November to February",
      idealDuration: "1-2 days",
    },
    cabServices: [
      { name: "Vizag Adventure Cabs", pricePerKm: "₹14/km", contact: "+91 98765 22334" },
      { name: "Chintapalli Jeep Hire", pricePerKm: "₹16/km", contact: "+91 94403 55667" },
    ],
    guideContacts: [
      { name: "AP Tourism Helpline", type: "helpline", phone: "1800 425 4545", description: "24/7 toll-free AP Tourism helpline" },
      { name: "Vizag Eco Tours", type: "tour_operator", phone: "+91 94407 88990", description: "Lambasingi camping & trekking packages", website: "https://vizagecotours.com" },
      { name: "Police / Emergency", type: "emergency", phone: "112", description: "All-India emergency helpline" },
    ],
  },
};
