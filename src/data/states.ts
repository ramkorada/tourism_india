import apImg from "@/assets/araku-valley-new.jpg";

export interface State {
  id: string;
  name: string;
  description: string;
  image: string;
  isAvailable: boolean;
}

export const states: State[] = [
  {
    id: "andhra-pradesh",
    name: "Andhra Pradesh",
    description: "The Koh-i-Noor of India, known for rich ancient heritage, vibrant coastlines, and Tirupati.",
    image: apImg,
    isAvailable: true,
  },
  {
    id: "rajasthan",
    name: "Rajasthan",
    description: "The Land of Kings, featuring majestic forts, opulent palaces, and the golden Thar desert.",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
    isAvailable: false,
  },
  {
    id: "kerala",
    name: "Kerala",
    description: "God's Own Country, celebrated for its emerald backwaters, lush hills, and Ayurvedic wellness.",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c0daf?w=800&q=80",
    isAvailable: false,
  },
  {
    id: "goa",
    name: "Goa",
    description: "World-famous beaches, Portuguese heritage, and a vibrant coastal lifestyle.",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
    isAvailable: false,
  },
  {
    id: "himachal-pradesh",
    name: "Himachal Pradesh",
    description: "Snow-laden mountains, Buddhist monasteries, and picturesque valleys.",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80",
    isAvailable: false,
  },
  {
    id: "uttarakhand",
    name: "Uttarakhand",
    description: "The Land of Gods, characterized by majestic Himalayan peaks and pristine trekking trails.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    isAvailable: false,
  },
  {
    id: "uttar-pradesh",
    name: "Uttar Pradesh",
    description: "The heart of India, home to the resplendent Taj Mahal and the spiritual ghats of Varanasi.",
    image: "https://images.unsplash.com/photo-1564507592208-02766324d455?w=800&q=80",
    isAvailable: false,
  },
  {
    id: "karnataka",
    name: "Karnataka",
    description: "A diverse canvas of ancient ruins at Hampi, lush western ghats, and royal Mysore.",
    image: "https://images.unsplash.com/photo-1600100397608-f010f41cb8b1?w=800&q=80",
    isAvailable: false,
  },
  {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    description: "The cultural capital of India, glowing with monumental Dravidian temples and classical music.",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
    isAvailable: false,
  },
  {
    id: "jammu-kashmir",
    name: "Jammu & Kashmir",
    description: "Paradise on Earth, known for its stunning alpine valleys, Dal Lake, and snow-capped peaks.",
    image: "https://images.unsplash.com/photo-1565018054866-968e244371f1?w=800&q=80",
    isAvailable: false,
  },
  {
    id: "gujarat",
    name: "Gujarat",
    description: "Vibrant festivals, the white salt desert of Rann of Kutch, and the home of Asiatic lions.",
    image: "https://images.unsplash.com/photo-1591018533408-c77a3a9b2f7c?w=800&q=80",
    isAvailable: false,
  },
  {
    id: "maharashtra",
    name: "Maharashtra",
    description: "A blend of ancient rock-cut caves, bustling metropolis Mumbai, and rich Maratha history.",
    image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800&q=80",
    isAvailable: false,
  },
  {
    id: "west-bengal",
    name: "West Bengal",
    description: "The cultural hub boasting colonial architecture, Sundarbans mangroves, and Darjeeling hills.",
    image: "https://images.unsplash.com/photo-1558451786-a462de7e3e9d?w=800&q=80",
    isAvailable: false,
  },
  {
    id: "assam",
    name: "Assam",
    description: "Home to the mighty Brahmaputra river, lush tea gardens, and the one-horned rhinoceros.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    isAvailable: false,
  },
  {
    id: "arunachal-pradesh",
    name: "Arunachal Pradesh",
    description: "Land of the Dawn-Lit Mountains, featuring pristine valleys and rich tribal culture.",
    image: "https://images.unsplash.com/photo-1623766215457-c8e804a63d32?w=800&q=80",
    isAvailable: false,
  },
];
