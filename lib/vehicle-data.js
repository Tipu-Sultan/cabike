// Mock data for vehicles

export const featuredVehicles = [
  {
    id: "car-1",
    title: "BMW 3 Series",
    price: 385000,
    year: 2021,
    mileage: 25000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    location: "San Francisco, CA",
    image: "https://images.pexels.com/photos/100656/pexels-photo-100656.jpeg?auto=compress&cs=tinysrgb&w=1600",
    type: "car",
    isVerified: true,
    sellerName: "Premium Auto",
    listedDate: "2 days ago"
  },
  {
    id: "bike-1",
    title: "Ducati Panigale V4",
    price: 201999,
    year: 2022,
    mileage: 3500,
    engineSize: 1103,
    bikeType: "Sport",
    location: "Los Angeles, CA",
    image: "https://images.pexels.com/photos/2393816/pexels-photo-2393816.jpeg?auto=compress&cs=tinysrgb&w=1600",
    type: "bike",
    isVerified: true,
    sellerName: "Moto Enthusiast",
    listedDate: "3 days ago"
  },
  {
    id: "car-2",
    title: "Tesla Model 3",
    price: 42990,
    year: 2022,
    mileage: 12000,
    fuelType: "Electric",
    transmission: "Automatic",
    location: "Seattle, WA",
    image: "https://images.pexels.com/photos/12861125/pexels-photo-12861125.jpeg?auto=compress&cs=tinysrgb&w=1600",
    type: "car",
    isVerified: true,
    sellerName: "Electric Motors",
    listedDate: "1 week ago"
  }
];

export const recentVehicles = [
  {
    id: "car-3",
    title: "Honda Civic",
    price: 23500,
    year: 2020,
    mileage: 30000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    location: "Portland, OR",
    image: "https://images.pexels.com/photos/7036586/pexels-photo-7036586.jpeg?auto=compress&cs=tinysrgb&w=1600",
    type: "car",
    isVerified: false,
    sellerName: "John Smith",
    listedDate: "1 day ago"
  },
  {
    id: "bike-2",
    title: "Kawasaki Ninja 650",
    price: 8500,
    year: 2019,
    mileage: 12000,
    engineSize: 649,
    bikeType: "Sport",
    location: "Denver, CO",
    image: "https://images.pexels.com/photos/2317519/pexels-photo-2317519.jpeg?auto=compress&cs=tinysrgb&w=1600",
    type: "bike",
    isVerified: false,
    sellerName: "Mike Johnson",
    listedDate: "3 days ago"
  },
  {
    id: "car-4",
    title: "Audi A4",
    price: 35800,
    year: 2020,
    mileage: 28000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    location: "Chicago, IL",
    image: "https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?auto=compress&cs=tinysrgb&w=1600",
    type: "car",
    isVerified: true,
    sellerName: "Luxury Cars Inc",
    listedDate: "5 days ago"
  },
  {
    id: "bike-3",
    title: "Harley-Davidson Street 750",
    price: 7500,
    year: 2018,
    mileage: 15000,
    engineSize: 750,
    bikeType: "Cruiser",
    location: "Austin, TX",
    image: "https://images.pexels.com/photos/1715189/pexels-photo-1715189.jpeg?auto=compress&cs=tinysrgb&w=1600",
    type: "bike",
    isVerified: false,
    sellerName: "Classic Rides",
    listedDate: "1 week ago"
  },
  {
    id: "car-5",
    title: "Toyota Camry",
    price: 25900,
    year: 2021,
    mileage: 18000,
    fuelType: "Hybrid",
    transmission: "Automatic",
    location: "Miami, FL",
    image: "https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=1600",
    type: "car",
    isVerified: true,
    sellerName: "EcoDrive Motors",
    listedDate: "2 days ago"
  },
  {
    id: "bike-4",
    title: "Yamaha YZF-R6",
    price: 10999,
    year: 2020,
    mileage: 8000,
    engineSize: 599,
    bikeType: "Sport",
    location: "San Diego, CA",
    image: "https://images.pexels.com/photos/163210/motorcycle-racer-racing-race-163210.jpeg?auto=compress&cs=tinysrgb&w=1600",
    type: "bike",
    isVerified: true,
    sellerName: "Speed Demons",
    listedDate: "4 days ago"
  },
  {
    id: "car-6",
    title: "Ford Mustang GT",
    price: 42500,
    year: 2019,
    mileage: 35000,
    fuelType: "Gasoline",
    transmission: "Manual",
    location: "Nashville, TN",
    image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1600",
    type: "car",
    isVerified: false,
    sellerName: "Muscle Car Haven",
    listedDate: "1 week ago"
  },
  {
    id: "bike-5",
    title: "Honda CBR650R",
    price: 9299,
    year: 2021,
    mileage: 5500,
    engineSize: 649,
    bikeType: "Sport",
    location: "Phoenix, AZ",
    image: "https://images.pexels.com/photos/2966208/pexels-photo-2966208.jpeg?auto=compress&cs=tinysrgb&w=1600",
    type: "bike",
    isVerified: false,
    sellerName: "Sarah Williams",
    listedDate: "2 days ago"
  }
];

// Combined data for all vehicles
export const allVehicles = [...featuredVehicles, ...recentVehicles];