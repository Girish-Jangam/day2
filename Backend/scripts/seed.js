const mongoose = require("mongoose");
require("dotenv").config();
const DestinationGuide = require("../models/DestinationGuide");
const DestinationDetail = require("../models/DestinationDetail");
const Favorite = require("../models/Favorite");
const TripItinerary = require("../models/TripItinerary");
const User = require("../models/User");
const TravelGroup = require("../models/TravelGroup");
const UserLogin = require("../models/UserLogin");
const UserItinerary = require("../models/UserItinerary");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit process with failure
  }
};

const seedData = async () => {
  await DestinationGuide.deleteMany({});
  await DestinationDetail.deleteMany({});
  await Favorite.deleteMany({});
  await TripItinerary.deleteMany({});
  await User.deleteMany({});
  await TravelGroup.deleteMany({});
  await UserLogin.deleteMany({});
  await UserItinerary.deleteMany({});

  const destinationGuides = [
    {
      id: "123",
      title: "Bali Destination Guide",
      summary: "Explore the beauty of Bali with our comprehensive guide.",
      photos: [
        "BALI/bali1.jpg",
        "BALI/bali2.jpg",
        "BALI/BALI3.jpg",
        "BALI/BALI4.jpg",
        "BALI/BALI5.jpg",
        "BALI/BALI6.jpg",
        "BALI/BALI7.jpg",
        "BALI/BALI8.jpg",
        "BALI/BALI9.jpg",
        "BALI/BALI10.jpg"
      ],
      history: "Bali has a rich history that dates back to the 9th century, marked by the arrival of Hinduism. Known as the 'Island of the Gods,' it has seen various kingdoms, influences from India, and a rich cultural evolution.",
      culture: "Bali’s culture is deeply influenced by Balinese Hinduism. Its religious ceremonies, traditional dances, and colorful festivals like Galungan and Kuningan showcase the island's vibrant traditions.",
      attractions: [
        "Uluwatu Temple",
        "Sacred Monkey Forest Sanctuary",
        "Besakih Temple",
        "Mount Batur"
      ],
      lodgingRecommendations: [
        "Luxury villa",
        "Beachfront resorts",
        "Eco-friendly boutique hotels"
      ],
      diningRecommendations: [
        "Babi Guling (Balinese Suckling Pig)",
        "Sate Lilit",
        "Fresh seafood at Jimbaran Bay"
      ],
      activitiesRecommendations: [
        "Surfing",
        "Snorkeling",
        "Diving",
        "Hiking Mount Batur"
      ]
    },
    {
      id: "456",
      title: "Paris Destination Guide",
      summary: "Discover the magic of Paris, the City of Lights.",
      photos: [
        "paris/Paris6.jpg",
        "paris/Paris7.jpg",
        "paris/PARIS1.jpg",
        "paris/Paris10.jpg",
        "paris/Paris12.jpg"
      ],
      history: "Paris, often referred to as the City of Lights, has a long and illustrious history, dating back to the Roman period. It has been the center of art, culture, and politics for centuries and is home to iconic landmarks like the Eiffel Tower and the Louvre.",
      culture: "Paris is a cultural hub, known for its world-class museums, rich literary history, and vibrant fashion scene. The city is renowned for its cafes, theaters, and a thriving art community that has inspired generations.",
      attractions: [
        "Eiffel Tower",
        "Louvre Museum",
        "Notre Dame Cathedral",
        "Champs-Élysées"
      ],
      lodgingRecommendations: [
        "5-star luxury hotels",
        "Charming boutique hotels in Montmartre",
        "Affordable hotels near the Seine"
      ],
      diningRecommendations: [
        "Croissants and café au lait",
        "Fine dining at Le Meurice",
        "Street food at Le Marais"
      ],
      activitiesRecommendations: [
        "Bungee jumping from Eiffel Tower",
        "Shopping at Champs-Élysées",
        "Picnicking at Luxembourg Gardens"
      ]
    },
    {
      id: "458",
      title: "Switzerland Destination Guide",
      summary: "Explore the breathtaking landscapes of Switzerland.",
      photos: [
        "Switzerland/caption.jpg",
        "switzerland/Zurich.jpg",
        "switzerland/Interlaken.jpg",
        "switzerland/Geneva.jpg",
        "switzerland/Lucerne.jpg"
      ],
      history: "Switzerland's history is shaped by its neutrality, being a central European country that avoided involvement in both World Wars. The Swiss Confederation dates back to the 13th century, and the country is renowned for its precision and craftsmanship, particularly in watchmaking.",
      culture: "Swiss culture is a unique blend of German, French, and Italian influences, reflecting its geographical position. The country's traditions are rooted in outdoor life, with skiing, mountaineering, and hiking being major pastimes.",
      attractions: [
        "Lake Geneva",
        "Matterhorn Mountain",
        "Swiss National Park",
        "Jungfraujoch"
      ],
      lodgingRecommendations: [
        "Luxury alpine resorts",
        "Charming chalets in Zermatt",
        "Mountain hostels"
      ],
      diningRecommendations: [
        "Fondue",
        "Rösti",
        "Swiss chocolate"
      ],
      activitiesRecommendations: [
        "Skiing",
        "Hiking",
        "Mountain biking"
      ]
    },
    {
      id: "457",
      title: "India Destination Guide",
      summary: "Experience the diversity of India, from the Himalayas to the beaches.",
      photos: [
        "India/caption.jpg",
        "india/Jaipur.jpg",
        "india/Kerala.jpg",
        "india/Goa.jpg",
        "india/Mumbai.jpg"
      ],
      history: "India is one of the oldest civilizations in the world, with a history spanning over 5,000 years. It is known for its rich culture, religious diversity, and the empires that shaped its past, including the Maurya and Gupta empires, and later the British Raj.",
      culture: "India's culture is deeply intertwined with religion, music, dance, and cuisine. The country is home to a rich tapestry of languages, ethnic groups, and festivals. It is famous for its vibrant traditions and spiritual practices such as yoga and meditation.",
      attractions: [
        "Taj Mahal",
        "Jaipur Forts",
        "Goa Beaches",
        "Kerala Backwaters"
      ],
      lodgingRecommendations: [
        "Luxury heritage hotels",
        "Beach resorts in Goa",
        "Eco-friendly homestays in Kerala"
      ],
      diningRecommendations: [
        "Indian street food",
        "Traditional thali",
        "Tandoori dishes"
      ],
      activitiesRecommendations: [
        "Pilgrimage tourism",
        "Trekking in the Himalayas",
        "Camel safaris in Rajasthan"
      ]
    },
    {
      id: "459",
      title: "London Destination Guide",
      summary: "Uncover the rich history and vibrant culture of London.",
      photos: [
        "london/caption.jpg",
        "london/LondonEye.jpg",
        "london/TowerBridge.jpg",
        "london/BuckinghamPalace.jpg",
        "london/HydePark.jpg"
      ],
      history: "London, founded by the Romans in 43 AD, has evolved into a global city. It has been the center of the British Empire, and its history includes monarchies, revolutions, and world-changing events. Landmarks like the Tower of London hold centuries of historical significance.",
      culture: "London is a cultural powerhouse, with a thriving arts scene, renowned museums, historic theaters like the Globe, and a fusion of modern and traditional architecture. It’s a melting pot of global cultures with a rich music and fashion scene.",
      attractions: [
        "Tower of London",
        "Buckingham Palace",
        "London Eye",
        "British Museum"
      ],
      lodgingRecommendations: [
        "Historic hotels near Covent Garden",
        "Modern skyscraper hotels with views",
        "Affordable inns near Oxford Street"
      ],
      diningRecommendations: [
        "Afternoon tea",
        "Fish and chips",
        "Pubs and international cuisine"
      ],
      activitiesRecommendations: [
        "London Eye ride",
        "West End theater shows",
        "Walking tours in the city center"
      ]
    }
  ];

  const destinationDetails = [
    {
      id: "123",
      title: "Bali Destination Guide",
      description: "Detailed information about Bali including history, culture, attractions, and recommendations.",
      reviews: [
        {
          user: "user123",
          rating: 5,
          comment: "Amazing guide, helped me plan my trip perfectly!"
        },
        {
          user: "user124",
          rating: 2,
          comment: "Not great, but okay."
        },
        {
          user: "user123",
          rating: 5,
          comment: "Amazing guide, helped me plan my trip perfectly!"
        },
        {
          user: "user124",
          rating: 2,
          comment: "Not great, but okay."
        },
        {
          user: "user123",
          rating: 5,
          comment: "Amazing guide, helped me plan my trip perfectly!"
        },
        {
          user: "user124",
          rating: 2,
          comment: "Not great, but okay."
        }
      ]
    },
    {
      id: "456",
      title: "Paris Destination Guide",
      description: "Paris, often called the City of Lights, is a premier travel destination renowned for its iconic landmarks like the Eiffel Tower, the Louvre Museum, and Notre Dame Cathedral, alongside its rich history, vibrant art scene, elegant fashion, and world-class cuisine, making it a captivating blend of romance, culture, and architectural beauty, particularly alluring for those seeking a sophisticated European experience.",
      reviews: [
        {
          user: "user123",
          rating: 4,
          comment: "Amazing guide, helped me plan my trip perfectly!"
        }
      ]
    },
    {
      id: "458",
      title: "Switzerland Destination Guide",
      description: "Explore the breathtaking landscapes of Switzerland.",
      reviews: [
        {
          user: "user125",
          rating: 5,
          comment: "Absolutely stunning!"
        }
      ]
    },
    {
      id: "457",
      title: "India Destination Guide",
      description: "Experience the diversity of India, from the Himalayas to the beaches.",
      reviews: [
        {
          user: "user126",
          rating: 3,
          comment: "Good, but could be better."
        }
      ]
    },
    {
      id: "459",
      title: "London Destination Guide",
      description: "Uncover the rich history and vibrant culture of London.",
      reviews: [
        {
          user: "user127",
          rating: 5,
          comment: "Excellent guide!"
        }
      ]
    }
  ];

  const users = [
    {
      username: "johnDoe",
      email: "john@example.com",
      password: "password123"
    },
    {
      username: "janeSmith",
      email: "jane@example.com",
      password: "password456"
    },
    {
      username: "peterPan",
      email: "peter@example.com",
      password: "password789"
    },
    {
      username: "aliceWonder",
      email: "alice@example.com",
      password: "password101"
    },
    {
      username: "bobTheBuilder",
      email: "bob@example.com",
      password: "password102"
    }
  ];

  const userLogins = [
    {
      id: "1a7e",
      userName: "lakshmi",
      password: "HelloWorld8"
    },
    {
      id: "a187",
      userName: "ashok",
      password: "HelloWorld8"
    },
    {
      id: "877c",
      userName: "lakshmi",
      password: "HelloWorld8"
    }
  ];

  const tripItineraries = [
    {
      id: "123",
      destination: "Bali",
      duration: "7 days",
      activities: [
        "Surfing",
        "Snorkeling",
        "Diving",
        "Swimming"
      ],
      lodging: [
        "Luxury villa",
        "Castle restaurant",
        "Prime villa"
      ],
      dining: [
        "Local cuisine"
      ]
    },
    {
      id: "e1b3",
      destination: "Switzerland",
      duration: "10 days",
      activities: [
        "Surfing",
        "Snorkeling",
        "Diving"
      ],
      lodging: [
        "Luxury villa",
        "Castle restaurant",
        "Prime villa",
        "Switzer suites resort"
      ],
      dining: [
        "Local cuisine",
        "Switzer Dining",
        "Hills zurich"
      ]
    },
    {
      id: "456",
      destination: "Paris",
      duration: "12 days",
      activities: [
        "Bungee jumping",
        "Camping",
        "Scuba diving",
        "Paragliding"
      ],
      lodging: [
        "Luxury villa",
        "Castle restaurant",
        "Prime villa",
        "European resort"
      ],
      dining: [
        "Local cuisine",
        "Continental Dining",
        "European prestige"
      ]
    },
    {
      id: "4e40",
      destination: "India",
      duration: "15 days",
      activities: [
        "Bungee jumping",
        "Camping",
        "Scuba diving",
        "Paragliding",
        "Pilgrimage tourism",
        "Trekking"
      ],
      lodging: [
        "Luxury villa",
        "Castle restaurant",
        "Prime villa",
        "Taz resort"
      ],
      dining: [
        "Local cuisine",
        "Continental Dining",
        "Indian chef feast"
      ]
    }
  ];

  const travelGroups = [
    {
      id: "group1",
      name: "Hiking in the Himalayas",
      description: "Let's explore the majestic Himalayas together!",
      isPublic: true,
      creatorId: "user1",
      members: [
        "user2"
      ],
      messages: []
    },
    {
      id: "group2",
      name: "Private Beach Getaway",
      description: "Relaxing trip to a secluded beach.",
      isPublic: true,
      creatorId: "user2",
      members: [
        "user2",
        "user1"
      ],
      messages: []
    }
  ];

  const userItineraries = [
    {
      id: "e1b3",
      itineraryId: "e1b3",
      startDate: new Date("2025-03-30"),
      endDate: new Date("2025-04-14"),
      duration: 16,
      activities: [
        "Surfing",
        "Snorkeling",
        "Diving"
      ],
      lodging: [
        "Luxury villa",
        "Castle restaurant",
        "Prime villa",
        "Switzer suites resort"
      ],
      dining: [
        "Local cuisine",
        "Switzer Dining",
        "Hills zurich"
      ]
    },
    {
      id: "123",
      itineraryId: "123",
      startDate: new Date("2025-03-19"),
      endDate: new Date("2025-03-29"),
      duration: 11,
      activities: [
        "Surfing",
        "Snorkeling",
        "Diving",
        "Swimming"
      ],
      lodging: [
        "Luxury villa",
        "Castle restaurant",
        "Prime villa"
      ],
      dining: [
        "Local cuisine"
      ]
    },
    {
      id: "456",
      itineraryId: "456",
      startDate: new Date("2025-03-13"),
      endDate: new Date("2025-03-15"),
      duration: 3,
      activities: [
        "Bungee jumping",
        "Camping",
        "Scuba diving",
        "Paragliding"
      ],
      lodging: [
        "Luxury villa",
        "Castle restaurant",
        "Prime villa",
        "European resort"
      ],
      dining: [
        "Local cuisine",
        "Continental Dining",
        "European prestige"
      ]
    }
  ];

  const favorites = [
    {
      id: "123",
      title: "Bali Destination Guide",
      summary: "Explore the beauty of Bali with our comprehensive guide.",
      photos: [
        "BALI/bali1.jpg",
        "BALI/bali2.jpg",
        "BALI/BALI3.jpg",
        "BALI/BALI4y.jpg",
        "BALI/BALI5.jpg",
        "BALI/BALI6.jpg",
        "BALI/BALI7.jpg",
        "BALI/BALI8.jpg",
        "BALI/BALI9.jpg",
        "BALI/BALI10.jpg"
      ],
      userId: "user1"
    },
    {
      id: "456",
      title: "Paris Destination Guide",
      summary: "Discover the magic of Paris, the City of Lights.",
      photos: [
        "paris/Paris6.jpg",
        "paris/Paris7.jpg",
        "paris/PARIS1.jpg",
        "paris/Paris10.jpg",
        "paris/Paris12.jpg"
      ],
      userId: "user2"
    },
    {
      id: "458",
      title: "Switzerland Destination Guide",
      summary: "Explore the breathtaking landscapes of Switzerland.",
      photos: [
        "Switzerland/caption.jpg",
        "switzerland/Zurich.jpg",
        "switzerland/Interlaken.jpg",
        "switzerland/Geneva.jpg",
        "switzerland/Lucerne.jpg"
      ],
      userId: "user3"
    }
  ];

  await DestinationGuide.insertMany(destinationGuides);
  await DestinationDetail.insertMany(destinationDetails);
  await User.insertMany(users);
  await UserLogin.insertMany(userLogins);
  await TripItinerary.insertMany(tripItineraries);
  await TravelGroup.insertMany(travelGroups);
  await UserItinerary.insertMany(userItineraries);
  await Favorite.insertMany(favorites);

  console.log("🌱 Data seeded successfully");
  process.exit(0);
};

const start = async () => {
  await connectDB();
  await seedData();
};

start();