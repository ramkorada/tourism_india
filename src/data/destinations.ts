import arakuValley from "@/assets/araku-valley-new.jpg";
import papikondalu from "@/assets/papikondalu-new.jpg";
import borraCaves from "@/assets/borra-caves-new.jpg";
import tirupati from "@/assets/tirupati-new.jpg";
import lepakshi from "@/assets/lepakshi-new.jpg";
import amaravati from "@/assets/amaravati-new.jpg";
import rishikonda from "@/assets/rishikonda-new.jpg";
import yarada from "@/assets/yarada-new.jpg";
import srisailam from "@/assets/srisailam-new.jpg";
import konaseema from "@/assets/konaseema-new.jpg";
import horsleyHills from "@/assets/horsley-hills-new.jpg";
import gandikota from "@/assets/gandikota-new.jpg";
import nagarjunaSagar from "@/assets/nagarjuna-sagar.jpg";
import ahobilam from "@/assets/ahobilam.jpg";
import mantralayam from "@/assets/mantralayam.jpg";
import talakona from "@/assets/talakona.jpg";
import ethipothala from "@/assets/ethipothala.jpg";
import pulicatLake from "@/assets/pulicat-lake.jpg";
import lambasingi from "@/assets/lambasingi.jpg";

export type Category = "Nature" | "Heritage" | "Temples" | "Beaches" | "Hill Stations" | "Wildlife";

export interface Destination {
  id: string;
  stateId: string;
  name: string;
  description: string;
  category: Category;
  district: string;
  image: string;
  mapUrl: string;
  rating: number;
  reviewCount: number;
}

export const destinations: Destination[] = [
  {
    id: "araku-valley",
    stateId: "andhra-pradesh",
    name: "Araku Valley",
    description: "A pristine hill station surrounded by lush coffee plantations, waterfalls, and tribal culture nestled in the Eastern Ghats.",
    category: "Hill Stations",
    district: "Alluri Sitharama Raju",
    image: arakuValley,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Araku+Valley+Andhra+Pradesh",
    rating: 4.6,
    reviewCount: 2340,
  },
  {
    id: "papikondalu",
    stateId: "andhra-pradesh",
    name: "Papikondalu",
    description: "Majestic hills along the Godavari River offering breathtaking boat cruises through lush green gorges.",
    category: "Nature",
    district: "East Godavari",
    image: papikondalu,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Papikondalu+Andhra+Pradesh",
    rating: 4.7,
    reviewCount: 1890,
  },
  {
    id: "borra-caves",
    stateId: "andhra-pradesh",
    name: "Borra Caves",
    description: "Million-year-old limestone caves with spectacular stalactite and stalagmite formations deep within the Ananthagiri Hills.",
    category: "Nature",
    district: "Alluri Sitharama Raju",
    image: borraCaves,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Borra+Caves+Andhra+Pradesh",
    rating: 4.4,
    reviewCount: 3120,
  },
  {
    id: "srisailam",
    stateId: "andhra-pradesh",
    name: "Srisailam",
    description: "A sacred Jyotirlinga temple town set amidst the dense Nallamala forests with the majestic Srisailam Dam on the Krishna River.",
    category: "Temples",
    district: "Nandyal",
    image: srisailam,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Srisailam+Temple+Andhra+Pradesh",
    rating: 4.7,
    reviewCount: 8900,
  },
  {
    id: "tirupati",
    stateId: "andhra-pradesh",
    name: "Tirupati",
    description: "Home to the world-renowned Sri Venkateswara Temple, one of the most visited and sacred pilgrimage destinations on earth.",
    category: "Temples",
    district: "Tirupati",
    image: tirupati,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Tirumala+Venkateswara+Temple+Tirupati",
    rating: 4.8,
    reviewCount: 15200,
  },
  {
    id: "lepakshi",
    stateId: "andhra-pradesh",
    name: "Lepakshi",
    description: "A 16th-century architectural marvel featuring the famous hanging pillar, exquisite Vijayanagara-era murals, and a monolithic Nandi.",
    category: "Heritage",
    district: "Anantapur",
    image: lepakshi,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Lepakshi+Temple+Anantapur+Andhra+Pradesh",
    rating: 4.5,
    reviewCount: 2780,
  },
  {
    id: "amaravati",
    stateId: "andhra-pradesh",
    name: "Amaravati",
    description: "An ancient Buddhist center with 2,000-year-old stupa ruins, rich archaeological heritage, and the capital region of Andhra Pradesh.",
    category: "Heritage",
    district: "Guntur",
    image: amaravati,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Amaravati+Stupa+Guntur+Andhra+Pradesh",
    rating: 4.3,
    reviewCount: 1560,
  },
  {
    id: "gandikota",
    stateId: "andhra-pradesh",
    name: "Gandikota",
    description: "India's own Grand Canyon — a stunning gorge carved by the Pennar River with a medieval fort perched on dramatic cliff edges.",
    category: "Nature",
    district: "Kadapa",
    image: gandikota,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Gandikota+Fort+Kadapa+Andhra+Pradesh",
    rating: 4.6,
    reviewCount: 3450,
  },
  {
    id: "konaseema",
    stateId: "andhra-pradesh",
    name: "Konaseema",
    description: "The 'God's Own Creation' — a tropical paradise of coconut groves, Godavari delta backwaters, and serene village life.",
    category: "Nature",
    district: "Konaseema",
    image: konaseema,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Konaseema+Andhra+Pradesh",
    rating: 4.5,
    reviewCount: 2100,
  },
  {
    id: "horsley-hills",
    stateId: "andhra-pradesh",
    name: "Horsley Hills",
    description: "A cool, misty hill station at 1265m with panoramic views, ancient trees, and a tranquil escape from Rayalaseema's heat.",
    category: "Hill Stations",
    district: "Chittoor",
    image: horsleyHills,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Horsley+Hills+Chittoor+Andhra+Pradesh",
    rating: 4.4,
    reviewCount: 1780,
  },
  {
    id: "rishikonda",
    stateId: "andhra-pradesh",
    name: "Rishikonda Beach",
    description: "Known as the 'Jewel of the East Coast,' this golden sandy beach offers water sports, surfing, and stunning Bay of Bengal sunrises.",
    category: "Beaches",
    district: "Visakhapatnam",
    image: rishikonda,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Rishikonda+Beach+Visakhapatnam",
    rating: 4.5,
    reviewCount: 4230,
  },
  {
    id: "yarada",
    stateId: "andhra-pradesh",
    name: "Yarada Beach",
    description: "A secluded paradise surrounded by hills on three sides, offering crystal-clear waters and pristine, uncrowded shores.",
    category: "Beaches",
    district: "Visakhapatnam",
    image: yarada,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Yarada+Beach+Visakhapatnam",
    rating: 4.4,
    reviewCount: 1890,
  },
  {
    id: "nagarjuna-sagar",
    stateId: "andhra-pradesh",
    name: "Nagarjuna Sagar",
    description: "One of the world's largest masonry dams with an ancient Buddhist site, Nagarjunakonda island museum, and scenic reservoir views.",
    category: "Heritage",
    district: "Palnadu",
    image: nagarjunaSagar,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Nagarjuna+Sagar+Dam+Andhra+Pradesh",
    rating: 4.5,
    reviewCount: 3200,
  },
  {
    id: "ahobilam",
    stateId: "andhra-pradesh",
    name: "Ahobilam",
    description: "A sacred Narasimha pilgrimage with nine temples nestled in the rugged Nallamala Hills, known for challenging treks and divine caves.",
    category: "Temples",
    district: "Nandyal",
    image: ahobilam,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Ahobilam+Temple+Nandyal+Andhra+Pradesh",
    rating: 4.6,
    reviewCount: 2450,
  },
  {
    id: "mantralayam",
    stateId: "andhra-pradesh",
    name: "Mantralayam",
    description: "A revered pilgrimage town on the Tungabhadra River, home to the Brindavana of Sri Raghavendra Swami, attracting millions annually.",
    category: "Temples",
    district: "Kurnool",
    image: mantralayam,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Mantralayam+Temple+Kurnool+Andhra+Pradesh",
    rating: 4.7,
    reviewCount: 5600,
  },
  {
    id: "talakona",
    stateId: "andhra-pradesh",
    name: "Talakona Waterfalls",
    description: "The highest waterfall in Andhra Pradesh at 270 feet, surrounded by the Sri Venkateswara National Park's dense forest and rare wildlife.",
    category: "Nature",
    district: "Tirupati",
    image: talakona,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Talakona+Waterfalls+Tirupati+Andhra+Pradesh",
    rating: 4.4,
    reviewCount: 1950,
  },
  {
    id: "ethipothala",
    stateId: "andhra-pradesh",
    name: "Ethipothala Falls",
    description: "A stunning 70-foot waterfall formed by three streams near Nagarjuna Sagar, with a crocodile breeding center and lush surroundings.",
    category: "Nature",
    district: "Palnadu",
    image: ethipothala,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Ethipothala+Falls+Andhra+Pradesh",
    rating: 4.3,
    reviewCount: 1670,
  },
  {
    id: "pulicat-lake",
    stateId: "andhra-pradesh",
    name: "Pulicat Lake",
    description: "India's second largest brackish water lagoon, a birdwatcher's haven with flamingos, pelicans, and the historic Dutch-era Pulicat town.",
    category: "Wildlife",
    district: "Tirupati",
    image: pulicatLake,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Pulicat+Lake+Bird+Sanctuary+Andhra+Pradesh",
    rating: 4.3,
    reviewCount: 1340,
  },
  {
    id: "lambasingi",
    stateId: "andhra-pradesh",
    name: "Lambasingi",
    description: "The 'Kashmir of Andhra Pradesh' — a tiny hamlet at 1000m altitude known for sub-zero temperatures, mist-covered valleys, and pepper farms.",
    category: "Hill Stations",
    district: "Visakhapatnam",
    image: lambasingi,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Lambasingi+Visakhapatnam+Andhra+Pradesh",
    rating: 4.5,
    reviewCount: 2870,
  },
];
