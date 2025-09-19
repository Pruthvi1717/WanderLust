const { urlencoded } = require("express");

const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description:
      "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
  },
  {
    title: "Modern Loft in Downtown",
    description:
      "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "New York City",
    country: "United States",
  },
  {
    title: "Mountain Retreat",
    description:
      "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1000,
    location: "Aspen",
    country: "United States",
  },
  {
    title: "Historic Villa in Tuscany",
    description:
      "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 2500,
    location: "Florence",
    country: "Italy",
  },
  {
    title: "Secluded Treehouse Getaway",
    description:
      "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 800,
    location: "Portland",
    country: "United States",
  },
  {
    title: "Beachfront Paradise",
    description:
      "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
  },
  {
    title: "Rustic Cabin by the Lake",
    description:
      "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
  },
  {
    title: "Luxury Penthouse with City Views",
    description:
      "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description:
      "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
  },
  {
    title: "Safari Lodge in the Serengeti",
    description:
      "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
  },
  // continue same pattern for all remaining listings...
  {
  title: "Desert Oasis Camp",
  description:
    "Sleep under the stars in this unique desert camp. Enjoy traditional cuisine and camel rides.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  price: 1100,
  location: "Merzouga",
  country: "Morocco",
},
{
  title: "Charming Cottage in the Cotswolds",
  description:
    "Relax in this quintessential English cottage with thatched roof and beautiful gardens.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  price: 950,
  location: "Cotswolds",
  country: "United Kingdom",
},
{
  title: "Houseboat on the Backwaters",
  description:
    "Cruise through tranquil backwaters on a traditional houseboat. A unique Kerala experience.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  price: 700,
  location: "Alleppey",
  country: "India",
},
{
  title: "Igloo Stay under the Northern Lights",
  description:
    "Watch the Aurora Borealis from your glass igloo in this Arctic adventure.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1508261307083-5fbb4b6e8c35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  price: 2800,
  location: "Lapland",
  country: "Finland",
},
{
  title: "Traditional Ryokan with Onsen",
  description:
    "Immerse yourself in Japanese culture with a stay at this ryokan featuring hot spring baths.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1602422984725-b68b9b1bbab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  price: 2200,
  location: "Kyoto",
  country: "Japan",
},
{
  title: "Tropical Bungalow in Bali",
  description:
    "Relax in your private bungalow surrounded by lush greenery and rice terraces.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1521185496955-15097b20c5fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  price: 1300,
  location: "Ubud",
  country: "Indonesia",
},
{
  title: "Overwater Villa in the Maldives",
  description:
    "Step into the crystal-clear waters directly from your luxurious overwater villa.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  price: 5000,
  location: "Malé",
  country: "Maldives",
},
{
  title: "Countryside Farm Stay",
  description:
    "Experience rural life with fresh air, organic food, and farm activities.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1598899134739-24c46f58d1a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  price: 600,
  location: "Nashik",
  country: "India",
},
{
  title: "Historic Castle Stay",
  description:
    "Live like royalty in this medieval castle with grand halls and stunning views.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1516637090014-cb1ab0d08fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  price: 3200,
  location: "Edinburgh",
  country: "Scotland",
},
{
  title: "Cliffside Cave House",
  description:
    "Stay in a traditional cave house carved into the cliffs with breathtaking views.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1600132806370-19ffae6e29c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  price: 1400,
  location: "Santorini",
  country: "Greece",
},
{
  title: "Eco-Friendly Jungle Lodge",
  description:
    "Reconnect with nature in this sustainable lodge deep in the jungle, surrounded by wildlife.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  price: 1700,
  location: "Amazon Rainforest",
  country: "Brazil",
},
{
  title: "Arctic Expedition Cabin",
  description:
    "Adventure awaits in this remote Arctic cabin with dog sledding and glacier hikes.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  price: 2600,
  location: "Svalbard",
  country: "Norway",
},
{
  title: "Luxury Desert Resort",
  description:
    "A 5-star experience in the middle of the desert with infinity pools and private villas.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1549887534-3db1bd59dcca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  price: 4500,
  location: "Dubai",
  country: "UAE",
},
{
  title: "Chalet with Hot Tub",
  description:
    "After skiing, relax in the private hot tub of this cozy wooden chalet in the Alps.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  price: 2800,
  location: "Chamonix",
  country: "France",
},
{
  title: "Riverside Bamboo Hut",
  description:
    "Stay in a hand-crafted bamboo hut right by the riverside, surrounded by tropical beauty.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  price: 500,
  location: "Luang Prabang",
  country: "Laos",
},
{
  title: "Sahara Desert Camp",
  description:
    "Ride camels and sleep under the stars in this authentic Berber-style desert camp.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1529927066849-1b4b4d26a3c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  price: 750,
  location: "Sahara Desert",
  country: "Morocco",
},
{
  title: "Floating Villa",
  description:
    "A rare stay experience in a modern floating villa right on the water.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1539632346651-8b1bb7d6b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  price: 3900,
  location: "Phuket",
  country: "Thailand",
},
{
  title: "Historic Riad",
  description:
    "Stay in a beautifully restored riad with mosaic tiles and traditional Moroccan design.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1589987601380-5c6b2a6c2ef9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  price: 1800,
  location: "Marrakech",
  country: "Morocco",
},
{
  title: "Clifftop Luxury Villa",
  description:
    "Perched high above the sea, this villa offers dramatic views and private infinity pools.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  price: 6000,
  location: "Amalfi Coast",
  country: "Italy",
},
{
  title: "Rainforest Canopy Cabin",
  description:
    "Wake up surrounded by treetops and exotic birds in this elevated rainforest cabin.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1549887534-3db1bd59dcca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  price: 1600,
  location: "Costa Rica",
  country: "Costa Rica",
},

];
module.exports = { data: sampleListings };