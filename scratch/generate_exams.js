const fs = require('fs');
const path = require('path');

const {
  generateAppNavbarJs,
  generateAppFooterJs,
  generateModalConfirmJs,
  generateEntityRowJs,
  generateLoginJs,
  generateEntityListJs,
  generateEntityDetailJs,
  generateAddEntityJs,
  generateManageTypesJs,
  generateTypeDetailJs,
  generateNotFoundJs,
  generateDeThiMarkdown
} = require('./generate_pages.js');

const {
  generateLoginTest,
  generateNavbarTest,
  generateFooterTest,
  generateRowTest,
  generateDetailTest,
  generateManageTypesTest,
  generateTypeDetailTest,
  generateListTest,
  generateAddTest,
  generateAuthContextTest
} = require('./generate_tests.js');


// 20 Domains configurations
const DOMAINS = [
  {
    id: "01_hotel",
    title: "Hotel Booking Manager",
    appName: "Hotel Booking App",
    logo: "/images/logo.jpg",
    version: "v1.0.0",
    course: "FER202 — ReactJS",
    year: 2026,
    copyright: "© 2026 Hotel Booking App",
    entitySingular: "room",
    entityPlural: "rooms",
    entitySingularPascal: "Room",
    entityPluralPascal: "Rooms",
    typeSingular: "roomType",
    typePlural: "roomTypes",
    typeSingularPascal: "RoomType",
    typePluralPascal: "RoomTypes",
    typeIdField: "roomTypeId",
    numField: "capacity",
    numLabel: "Capacity",
    numPlaceholder: "e.g. 2",
    numTestVal: 2,
    textField: "bedType",
    textLabel: "Bed Type",
    textPlaceholder: "e.g. King",
    textTestVal: "King",
    priceStyle: "weekday-weekend",
    price1Field: "priceWeekday",
    price1Label: "Price Weekday",
    price2Field: "priceWeekend",
    price2Label: "Price Weekend",
    dateField: "lastServiced",
    dateLabel: "Last Serviced",
    loginStyle: "L2",
    navbarStyle: "N1",
    sortStyle: "S1",
    categoryStyle: "C3",
    dbTypes: [
      { id: "1", name: "Standard" },
      { id: "2", name: "Deluxe" },
      { id: "3", name: "Suite" }
    ],
    dbItems: [
      { id: "1", name: "Room 101", roomTypeId: "1", capacity: 2, bedType: "Twin", priceWeekday: 500000, priceWeekend: 700000, lastServiced: "15/03/2026" },
      { id: "2", name: "Room 102", roomTypeId: "1", capacity: 2, bedType: "Twin", priceWeekday: 500000, priceWeekend: 700000, lastServiced: "16/03/2026" },
      { id: "3", name: "Room 201", roomTypeId: "2", capacity: 2, bedType: "Queen", priceWeekday: 800000, priceWeekend: 1000000, lastServiced: "20/03/2026" },
      { id: "4", name: "Room 202", roomTypeId: "2", capacity: 4, bedType: "Double-Queen", priceWeekday: 1200000, priceWeekend: 1500000, lastServiced: "21/03/2026" },
      { id: "5", name: "Room 301", roomTypeId: "3", capacity: 2, bedType: "King", priceWeekday: 2000000, priceWeekend: 2500000, lastServiced: "25/03/2026" }
    ]
  },
  {
    id: "02_pet",
    title: "Pet Clinic Registry",
    appName: "Pet Clinic App",
    logo: "/images/logo.jpg",
    version: "v1.0.0",
    course: "FER202 — ReactJS",
    year: 2026,
    copyright: "© 2026 Pet Clinic App",
    entitySingular: "pet",
    entityPlural: "pets",
    entitySingularPascal: "Pet",
    entityPluralPascal: "Pets",
    typeSingular: "breed",
    typePlural: "breeds",
    typeSingularPascal: "Breed",
    typePluralPascal: "Breeds",
    typeIdField: "breedId",
    numField: "age",
    numLabel: "Age (months)",
    numPlaceholder: "e.g. 12",
    numTestVal: 12,
    textField: "owner",
    textLabel: "Owner Name",
    textPlaceholder: "e.g. John Doe",
    textTestVal: "John Doe",
    priceStyle: "weekday-weekend",
    price1Field: "priceWeekday",
    price1Label: "Weekday Fee",
    price2Field: "priceWeekend",
    price2Label: "Weekend Fee",
    dateField: "lastVaccinated",
    dateLabel: "Last Vaccinated",
    loginStyle: "L1",
    navbarStyle: "N2",
    sortStyle: "S2",
    categoryStyle: "C1",
    dbTypes: [
      { id: "1", name: "Dog" },
      { id: "2", name: "Cat" },
      { id: "3", name: "Rabbit" }
    ],
    dbItems: [
      { id: "1", name: "Bella", breedId: "1", age: 24, owner: "Alice", priceWeekday: 200000, priceWeekend: 300000, lastVaccinated: "10/01/2026" },
      { id: "2", name: "Max", breedId: "1", age: 36, owner: "Bob", priceWeekday: 200000, priceWeekend: 300000, lastVaccinated: "15/02/2026" },
      { id: "3", name: "Luna", breedId: "2", age: 12, owner: "Charlie", priceWeekday: 150000, priceWeekend: 250000, lastVaccinated: "20/02/2026" },
      { id: "4", name: "Milo", breedId: "2", age: 18, owner: "David", priceWeekday: 150000, priceWeekend: 250000, lastVaccinated: "25/02/2026" },
      { id: "5", name: "Oliver", breedId: "3", age: 8, owner: "Eve", priceWeekday: 100000, priceWeekend: 180000, lastVaccinated: "05/03/2026" }
    ]
  },
  {
    id: "03_book",
    title: "Book Store Inventory",
    appName: "Book Store App",
    logo: "/images/logo.jpg",
    version: "v1.0.0",
    course: "FER202 — ReactJS",
    year: 2026,
    copyright: "© 2026 Book Store App",
    entitySingular: "book",
    entityPlural: "books",
    entitySingularPascal: "Book",
    entityPluralPascal: "Books",
    typeSingular: "genre",
    typePlural: "genres",
    typeSingularPascal: "Genre",
    typePluralPascal: "Genres",
    typeIdField: "genreId",
    numField: "pages",
    numLabel: "Pages",
    numPlaceholder: "e.g. 350",
    numTestVal: 350,
    textField: "author",
    textLabel: "Author",
    textPlaceholder: "e.g. J.K. Rowling",
    textTestVal: "J.K. Rowling",
    priceStyle: "min-max",
    price1Field: "priceMin",
    price1Label: "Price Min",
    price2Field: "priceMax",
    price2Label: "Price Max",
    dateField: "publishedDate",
    dateLabel: "Published Date",
    loginStyle: "L2",
    navbarStyle: "N3",
    sortStyle: "S1",
    categoryStyle: "C2",
    dbTypes: [
      { id: "1", name: "Fiction" },
      { id: "2", name: "Science" },
      { id: "3", name: "History" }
    ],
    dbItems: [
      { id: "1", name: "The Hobbit", genreId: "1", pages: 310, author: "J.R.R. Tolkien", priceMin: 120000, priceMax: 180000, publishedDate: "21/09/1937" },
      { id: "2", name: "A Brief History of Time", genreId: "2", pages: 256, author: "Stephen Hawking", priceMin: 150000, priceMax: 220000, publishedDate: "01/03/1988" },
      { id: "3", name: "Sapiens", genreId: "3", pages: 512, author: "Yuval Noah Harari", priceMin: 200000, priceMax: 290000, publishedDate: "04/09/2011" }
    ]
  },
  {
    id: "04_product",
    title: "Electronic Product Shop",
    appName: "Product Shop App",
    logo: "/images/logo.jpg",
    version: "v1.0.0",
    course: "FER202 — ReactJS",
    year: 2026,
    copyright: "© 2026 Product Shop App",
    entitySingular: "product",
    entityPlural: "products",
    entitySingularPascal: "Product",
    entityPluralPascal: "Products",
    typeSingular: "brand",
    typePlural: "brands",
    typeSingularPascal: "Brand",
    typePluralPascal: "Brands",
    typeIdField: "brandId",
    numField: "warranty",
    numLabel: "Warranty (months)",
    numPlaceholder: "e.g. 12",
    numTestVal: 12,
    textField: "model",
    textLabel: "Model Number",
    textPlaceholder: "e.g. A2633",
    textTestVal: "A2633",
    priceStyle: "weekday-weekend",
    price1Field: "priceWeekday",
    price1Label: "Price Normal",
    price2Field: "priceWeekend",
    price2Label: "Price Promo",
    dateField: "releaseDate",
    dateLabel: "Release Date",
    loginStyle: "L1",
    navbarStyle: "N1",
    sortStyle: "S1",
    categoryStyle: "C3",
    dbTypes: [
      { id: "1", name: "Apple" },
      { id: "2", name: "Samsung" },
      { id: "3", name: "Sony" }
    ],
    dbItems: [
      { id: "1", name: "iPhone 13", brandId: "1", warranty: 12, model: "A2633", priceWeekday: 18000000, priceWeekend: 17500000, releaseDate: "24/09/2021" },
      { id: "2", name: "Galaxy S22", brandId: "2", warranty: 24, model: "SM-S901B", priceWeekday: 16000000, priceWeekend: 15500000, releaseDate: "25/02/2022" },
      { id: "3", name: "WH-1000XM4", brandId: "3", warranty: 12, model: "XM4-B", priceWeekday: 6000000, priceWeekend: 5800000, releaseDate: "06/08/2020" }
    ]
  },
  {
    id: "05_student",
    title: "Student & Course Tracker",
    appName: "Student Registry App",
    logo: "/images/logo.jpg",
    version: "v1.0.0",
    course: "FER202 — ReactJS",
    year: 2026,
    copyright: "© 2026 Student Registry App",
    entitySingular: "student",
    entityPlural: "students",
    entitySingularPascal: "Student",
    entityPluralPascal: "Students",
    typeSingular: "department",
    typePlural: "departments",
    typeSingularPascal: "Department",
    typePluralPascal: "Departments",
    typeIdField: "departmentId",
    numField: "gpa",
    numLabel: "GPA",
    numPlaceholder: "e.g. 3.5",
    numTestVal: 3.5,
    textField: "major",
    textLabel: "Major",
    textPlaceholder: "e.g. Software Engineering",
    textTestVal: "Software Engineering",
    priceStyle: "min-max",
    price1Field: "priceMin",
    price1Label: "Tuition Min",
    price2Field: "priceMax",
    price2Label: "Tuition Max",
    dateField: "enrollmentDate",
    dateLabel: "Enrollment Date",
    loginStyle: "L2",
    navbarStyle: "N2",
    sortStyle: "S2",
    categoryStyle: "C1",
    dbTypes: [
      { id: "1", name: "Computing" },
      { id: "2", name: "Business" },
      { id: "3", name: "Design" }
    ],
    dbItems: [
      { id: "1", name: "Nguyen Van A", departmentId: "1", gpa: 3.8, major: "Software Engineering", priceMin: 25000000, priceMax: 30000000, enrollmentDate: "05/09/2023" },
      { id: "2", name: "Tran Thi B", departmentId: "2", gpa: 3.2, major: "International Business", priceMin: 22000000, priceMax: 26000000, enrollmentDate: "06/09/2023" },
      { id: "3", name: "Le Van C", departmentId: "3", gpa: 3.0, major: "Graphic Design", priceMin: 24000000, priceMax: 28000000, enrollmentDate: "07/09/2023" }
    ]
  },
  {
    id: "06_movie",
    title: "Movie Playlist Organizer",
    appName: "Movie Playlist App",
    logo: "/images/logo.jpg",
    version: "v1.0.0",
    course: "FER202 — ReactJS",
    year: 2026,
    copyright: "© 2026 Movie Playlist App",
    entitySingular: "movie",
    entityPlural: "movies",
    entitySingularPascal: "Movie",
    entityPluralPascal: "Movies",
    typeSingular: "category",
    typePlural: "categories",
    typeSingularPascal: "Category",
    typePluralPascal: "Categories",
    typeIdField: "categoryId",
    numField: "duration",
    numLabel: "Duration (min)",
    numPlaceholder: "e.g. 120",
    numTestVal: 120,
    textField: "director",
    textLabel: "Director",
    textPlaceholder: "e.g. Christopher Nolan",
    textTestVal: "Christopher Nolan",
    priceStyle: "min-max",
    price1Field: "priceMin",
    price1Label: "Ticket Normal",
    price2Field: "priceMax",
    price2Label: "Ticket IMAX",
    dateField: "releaseDate",
    dateLabel: "Release Date",
    loginStyle: "L1",
    navbarStyle: "N3",
    sortStyle: "S1",
    categoryStyle: "C2",
    dbTypes: [
      { id: "1", name: "Action" },
      { id: "2", name: "Sci-Fi" },
      { id: "3", name: "Drama" }
    ],
    dbItems: [
      { id: "1", name: "Inception", categoryId: "2", duration: 148, director: "Christopher Nolan", priceMin: 90000, priceMax: 150000, releaseDate: "16/07/2010" },
      { id: "2", name: "The Dark Knight", categoryId: "1", duration: 152, director: "Christopher Nolan", priceMin: 80000, priceMax: 140000, releaseDate: "18/07/2008" },
      { id: "3", name: "The Shawshank Redemption", categoryId: "3", duration: 142, director: "Frank Darabont", priceMin: 70000, priceMax: 120000, releaseDate: "23/09/1994" }
    ]
  },
  {
    id: "07_employee",
    title: "Employee Directory",
    appName: "Employee App",
    logo: "/images/logo.jpg",
    version: "v1.0.0",
    course: "FER202 — ReactJS",
    year: 2026,
    copyright: "© 2026 Employee App",
    entitySingular: "employee",
    entityPlural: "employees",
    entitySingularPascal: "Employee",
    entityPluralPascal: "Employees",
    typeSingular: "department",
    typePlural: "departments",
    typeSingularPascal: "Department",
    typePluralPascal: "Departments",
    typeIdField: "departmentId",
    numField: "experience",
    numLabel: "Experience (years)",
    numPlaceholder: "e.g. 5",
    numTestVal: 5,
    textField: "role",
    textLabel: "Job Role",
    textPlaceholder: "e.g. Senior Dev",
    textTestVal: "Senior Dev",
    priceStyle: "weekday-weekend",
    price1Field: "priceWeekday",
    price1Label: "Monthly Salary",
    price2Field: "priceWeekend",
    price2Label: "Overtime Rate",
    dateField: "startDate",
    dateLabel: "Start Date",
    loginStyle: "L2",
    navbarStyle: "N1",
    sortStyle: "S1",
    categoryStyle: "C3",
    dbTypes: [
      { id: "1", name: "Engineering" },
      { id: "2", name: "Human Resources" },
      { id: "3", name: "Marketing" }
    ],
    dbItems: [
      { id: "1", name: "John Smith", departmentId: "1", experience: 6, role: "Senior Developer", priceWeekday: 50000000, priceWeekend: 600000, startDate: "01/06/2021" },
      { id: "2", name: "Emma Watson", departmentId: "2", experience: 3, role: "HR Executive", priceWeekday: 20000000, priceWeekend: 0, startDate: "15/08/2023" },
      { id: "3", name: "Ryan Reynolds", departmentId: "3", experience: 4, role: "Marketing Specialist", priceWeekday: 25000000, priceWeekend: 300000, startDate: "10/02/2022" }
    ]
  },
  {
    id: "08_event",
    title: "Event Planner Dashboard",
    appName: "Event Planner App",
    logo: "/images/logo.jpg",
    version: "v1.0.0",
    course: "FER202 — ReactJS",
    year: 2026,
    copyright: "© 2026 Event Planner App",
    entitySingular: "event",
    entityPlural: "events",
    entitySingularPascal: "Event",
    entityPluralPascal: "Events",
    typeSingular: "location",
    typePlural: "locations",
    typeSingularPascal: "Location",
    typePluralPascal: "Locations",
    typeIdField: "locationId",
    numField: "duration",
    numLabel: "Duration (hours)",
    numPlaceholder: "e.g. 4",
    numTestVal: 4,
    textField: "organizer",
    textLabel: "Organizer",
    textPlaceholder: "e.g. FPT Corp",
    textTestVal: "FPT Corp",
    priceStyle: "weekday-weekend",
    price1Field: "priceWeekday",
    price1Label: "Entry Price",
    price2Field: "priceWeekend",
    price2Label: "VIP Price",
    dateField: "eventDate",
    dateLabel: "Event Date",
    loginStyle: "L1",
    navbarStyle: "N2",
    sortStyle: "S2",
    categoryStyle: "C1",
    dbTypes: [
      { id: "1", name: "Convention Center" },
      { id: "2", name: "Grand Ballroom" },
      { id: "3", name: "Outdoor Park" }
    ],
    dbItems: [
      { id: "1", name: "Tech Expo 2026", locationId: "1", duration: 8, organizer: "FPT Software", priceWeekday: 100000, priceWeekend: 150000, eventDate: "20/04/2026" },
      { id: "2", name: "Gala Dinner", locationId: "2", duration: 4, organizer: "FPT University", priceWeekday: 500000, priceWeekend: 700000, eventDate: "21/04/2026" }
    ]
  },
  {
    id: "09_recipe",
    title: "Recipe Cookbook",
    appName: "Cookbook App",
    logo: "/images/logo.jpg",
    version: "v1.0.0",
    course: "FER202 — ReactJS",
    year: 2026,
    copyright: "© 2026 Cookbook App",
    entitySingular: "recipe",
    entityPlural: "recipes",
    entitySingularPascal: "Recipe",
    entityPluralPascal: "Recipes",
    typeSingular: "cuisine",
    typePlural: "cuisines",
    typeSingularPascal: "Cuisine",
    typePluralPascal: "Cuisines",
    typeIdField: "cuisineId",
    numField: "prepTime",
    numLabel: "Prep Time (min)",
    numPlaceholder: "e.g. 30",
    numTestVal: 30,
    textField: "difficulty",
    textLabel: "Difficulty",
    textPlaceholder: "e.g. Medium",
    textTestVal: "Medium",
    priceStyle: "min-max",
    price1Field: "priceMin",
    price1Label: "Cost Min",
    price2Field: "priceMax",
    price2Label: "Cost Max",
    dateField: "createdDate",
    dateLabel: "Created Date",
    loginStyle: "L2",
    navbarStyle: "N3",
    sortStyle: "S1",
    categoryStyle: "C3",
    dbTypes: [
      { id: "1", name: "Vietnamese" },
      { id: "2", name: "Italian" },
      { id: "3", name: "Japanese" }
    ],
    dbItems: [
      { id: "1", name: "Pho Bo", cuisineId: "1", prepTime: 180, difficulty: "Hard", priceMin: 50000, priceMax: 100000, createdDate: "01/01/2026" },
      { id: "2", name: "Spaghetti", cuisineId: "2", prepTime: 30, difficulty: "Easy", priceMin: 80000, priceMax: 150000, createdDate: "02/01/2026" }
    ]
  },
  {
    id: "10_job",
    title: "IT Job Board",
    appName: "IT Job Board App",
    logo: "/images/logo.jpg",
    version: "v1.0.0",
    course: "FER202 — ReactJS",
    year: 2026,
    copyright: "© 2026 IT Job Board App",
    entitySingular: "job",
    entityPlural: "jobs",
    entitySingularPascal: "Job",
    entityPluralPascal: "Jobs",
    typeSingular: "company",
    typePlural: "companies",
    typeSingularPascal: "Company",
    typePluralPascal: "Companies",
    typeIdField: "companyId",
    numField: "experience",
    numLabel: "Experience Required (yrs)",
    numPlaceholder: "e.g. 2",
    numTestVal: 2,
    textField: "location",
    textLabel: "Location",
    textPlaceholder: "e.g. Hanoi",
    textTestVal: "Hanoi",
    priceStyle: "min-max",
    price1Field: "priceMin",
    price1Label: "Salary Min",
    price2Field: "priceMax",
    price2Label: "Salary Max",
    dateField: "postedDate",
    dateLabel: "Posted Date",
    loginStyle: "L1",
    navbarStyle: "N1",
    sortStyle: "S1",
    categoryStyle: "C2",
    dbTypes: [
      { id: "1", name: "FPT Software" },
      { id: "2", name: "VNG Corp" },
      { id: "3", name: "Viettel" }
    ],
    dbItems: [
      { id: "1", name: "React Developer", companyId: "1", experience: 2, location: "Hanoi", priceMin: 15000000, priceMax: 25000000, postedDate: "01/03/2026" },
      { id: "2", name: "NodeJS Tech Lead", companyId: "2", experience: 7, location: "Ho Chi Minh", priceMin: 40000000, priceMax: 60000000, postedDate: "02/03/2026" }
    ]
  },
  {
    id: "11_flight",
    title: "Flight Reservation App",
    appName: "Flight Booking App",
    logo: "/images/logo.jpg",
    version: "v1.0.0",
    course: "FER202 — ReactJS",
    year: 2026,
    copyright: "© 2026 Flight Booking App",
    entitySingular: "flight",
    entityPlural: "flights",
    entitySingularPascal: "Flight",
    entityPluralPascal: "Flights",
    typeSingular: "airline",
    typePlural: "airlines",
    typeSingularPascal: "Airline",
    typePluralPascal: "Airlines",
    typeIdField: "airlineId",
    numField: "duration",
    numLabel: "Duration (hours)",
    numPlaceholder: "e.g. 2",
    numTestVal: 2,
    textField: "aircraft",
    textLabel: "Aircraft",
    textPlaceholder: "e.g. Airbus A321",
    textTestVal: "Airbus A321",
    priceStyle: "weekday-weekend",
    price1Field: "priceWeekday",
    price1Label: "Eco Price",
    price2Field: "priceWeekend",
    price2Label: "Business Price",
    dateField: "flightDate",
    dateLabel: "Flight Date",
    loginStyle: "L2",
    navbarStyle: "N2",
    sortStyle: "S1",
    categoryStyle: "C3",
    dbTypes: [
      { id: "1", name: "Vietnam Airlines" },
      { id: "2", name: "Vietjet Air" },
      { id: "3", name: "Bamboo Airways" }
    ],
    dbItems: [
      { id: "1", name: "VN123 - HAN to SGN", airlineId: "1", duration: 2, aircraft: "Airbus A350", priceWeekday: 1500000, priceWeekend: 3500000, flightDate: "10/04/2026" },
      { id: "2", name: "VJ456 - DAD to HAN", airlineId: "2", duration: 1.2, aircraft: "Airbus A320", priceWeekday: 800000, priceWeekend: 1800000, flightDate: "11/04/2026" }
    ]
  },
  {
    id: "12_music",
    title: "Music Playlist Manager",
    appName: "Music Playlist App",
    logo: "/images/logo.jpg",
    version: "v1.0.0",
    course: "FER202 — ReactJS",
    year: 2026,
    copyright: "© 2026 Music Playlist App",
    entitySingular: "song",
    entityPlural: "songs",
    entitySingularPascal: "Song",
    entityPluralPascal: "Songs",
    typeSingular: "artist",
    typePlural: "artists",
    typeSingularPascal: "Artist",
    typePluralPascal: "Artists",
    typeIdField: "artistId",
    numField: "plays",
    numLabel: "Lượt nghe (k)",
    numPlaceholder: "e.g. 100",
    numTestVal: 100,
    textField: "album",
    textLabel: "Album",
    textPlaceholder: "e.g. The Album",
    textTestVal: "The Album",
    priceStyle: "weekday-weekend",
    price1Field: "priceWeekday",
    price1Label: "Production Cost",
    price2Field: "priceWeekend",
    price2Label: "Royalty Fee",
    dateField: "releaseDate",
    dateLabel: "Release Date",
    loginStyle: "L1",
    navbarStyle: "N3",
    sortStyle: "S1",
    categoryStyle: "C1",
    dbTypes: [
      { id: "1", name: "Son Tung M-TP" },
      { id: "2", name: "Den Vau" },
      { id: "3", name: "My Tam" }
    ],
    dbItems: [
      { id: "1", name: "Chung Ta Cua Tuong Lai", artistId: "1", plays: 50000, album: "Single", priceWeekday: 100000000, priceWeekend: 5000000, releaseDate: "08/03/2024" },
      { id: "2", name: "Mang Tien Ve Cho Me", artistId: "2", plays: 30000, album: "Single", priceWeekday: 50000000, priceWeekend: 2000000, releaseDate: "29/12/2021" }
    ]
  },
  {
    id: "13_task",
    title: "Task Tracker - Kanban",
    appName: "Kanban Task App",
    logo: "/images/logo.jpg",
    version: "v1.0.0",
    course: "FER202 — ReactJS",
    year: 2026,
    copyright: "© 2026 Kanban Task App",
    entitySingular: "task",
    entityPlural: "tasks",
    entitySingularPascal: "Task",
    entityPluralPascal: "Tasks",
    typeSingular: "project",
    typePlural: "projects",
    typeSingularPascal: "Project",
    typePluralPascal: "Projects",
    typeIdField: "projectId",
    numField: "duration",
    numLabel: "Duration (hours)",
    numPlaceholder: "e.g. 5",
    numTestVal: 5,
    textField: "priority",
    textLabel: "Priority",
    textPlaceholder: "e.g. High",
    textTestVal: "High",
    priceStyle: "min-max",
    price1Field: "priceMin",
    price1Label: "Estimated Cost",
    price2Field: "priceMax",
    price2Label: "Actual Cost",
    dateField: "deadline",
    dateLabel: "Deadline",
    loginStyle: "L2",
    navbarStyle: "N1",
    sortStyle: "S2",
    categoryStyle: "C3",
    dbTypes: [
      { id: "1", name: "ERP System" },
      { id: "2", name: "Mobile App" },
      { id: "3", name: "Website Rebranding" }
    ],
    dbItems: [
      { id: "1", name: "Design Database", projectId: "1", duration: 12, priority: "High", priceMin: 2000000, priceMax: 3000000, deadline: "15/04/2026" },
      { id: "2", name: "Implement Auth Flow", projectId: "1", duration: 8, priority: "Medium", priceMin: 1500000, priceMax: 2000000, deadline: "18/04/2026" }
    ]
  },
  {
    id: "14_showroom",
    title: "Car Showroom App",
    appName: "Car Showroom App",
    logo: "/images/logo.jpg",
    version: "v1.0.0",
    course: "FER202 — ReactJS",
    year: 2026,
    copyright: "© 2026 Car Showroom App",
    entitySingular: "car",
    entityPlural: "cars",
    entitySingularPascal: "Car",
    entityPluralPascal: "Cars",
    typeSingular: "dealer",
    typePlural: "dealers",
    typeSingularPascal: "Dealer",
    typePluralPascal: "Dealers",
    typeIdField: "dealerId",
    numField: "year",
    numLabel: "Model Year",
    numPlaceholder: "e.g. 2024",
    numTestVal: 2024,
    textField: "engine",
    textLabel: "Engine Type",
    textPlaceholder: "e.g. V6 Turbo",
    textTestVal: "V6 Turbo",
    priceStyle: "weekday-weekend",
    price1Field: "priceWeekday",
    price1Label: "MSRP Price",
    price2Field: "priceWeekend",
    price2Label: "Dealer Price",
    dateField: "receivedDate",
    dateLabel: "Received Date",
    loginStyle: "L1",
    navbarStyle: "N2",
    sortStyle: "S1",
    categoryStyle: "C2",
    dbTypes: [
      { id: "1", name: "Hanoi Ford" },
      { id: "2", name: "Saigon Toyota" },
      { id: "3", name: "Da Nang Hyundai" }
    ],
    dbItems: [
      { id: "1", name: "Ford Ranger", dealerId: "1", year: 2023, engine: "2.0L Bi-Turbo", priceWeekday: 900000000, priceWeekend: 880000000, receivedDate: "05/01/2026" },
      { id: "2", name: "Toyota Camry", dealerId: "2", year: 2024, engine: "2.5L Hybrid", priceWeekday: 1400000000, priceWeekend: 1390000000, receivedDate: "12/01/2026" }
    ]
  },
  {
    id: "15_inventory",
    title: "Supermarket Inventory",
    appName: "Supermarket Stock App",
    logo: "/images/logo.jpg",
    version: "v1.0.0",
    course: "FER202 — ReactJS",
    year: 2026,
    copyright: "© 2026 Supermarket Stock App",
    entitySingular: "item",
    entityPlural: "items",
    entitySingularPascal: "Item",
    entityPluralPascal: "Items",
    typeSingular: "supplier",
    typePlural: "suppliers",
    typeSingularPascal: "Supplier",
    typePluralPascal: "Suppliers",
    typeIdField: "supplierId",
    numField: "stock",
    numLabel: "Stock Quantity",
    numPlaceholder: "e.g. 50",
    numTestVal: 50,
    textField: "unit",
    textLabel: "Unit",
    textPlaceholder: "e.g. Bottle",
    textTestVal: "Bottle",
    priceStyle: "weekday-weekend",
    price1Field: "priceWeekday",
    price1Label: "Cost Price",
    price2Field: "priceWeekend",
    price2Label: "Selling Price",
    dateField: "expiryDate",
    dateLabel: "Expiry Date",
    loginStyle: "L2",
    navbarStyle: "N3",
    sortStyle: "S1",
    categoryStyle: "C1",
    dbTypes: [
      { id: "1", name: "Unilever" },
      { id: "2", name: "Vinamilk" },
      { id: "3", name: "Masan Group" }
    ],
    dbItems: [
      { id: "1", name: "Omo Detergent 2kg", supplierId: "1", stock: 120, unit: "Bag", priceWeekday: 95000, priceWeekend: 110000, expiryDate: "15/12/2027" },
      { id: "2", name: "Vinamilk Fresh Milk 1L", supplierId: "2", stock: 200, unit: "Box", priceWeekday: 30000, priceWeekend: 35000, expiryDate: "20/08/2026" }
    ]
  },
  {
    id: "16_doctor",
    title: "Doctor Appointment App",
    appName: "Doctor Appointment App",
    logo: "/images/logo.jpg",
    version: "v1.0.0",
    course: "FER202 — ReactJS",
    year: 2026,
    copyright: "© 2026 Doctor Appointment App",
    entitySingular: "appointment",
    entityPlural: "appointments",
    entitySingularPascal: "Appointment",
    entityPluralPascal: "Appointments",
    typeSingular: "doctor",
    typePlural: "doctors",
    typeSingularPascal: "Doctor",
    typePluralPascal: "Doctors",
    typeIdField: "doctorId",
    numField: "duration",
    numLabel: "Duration (min)",
    numPlaceholder: "e.g. 30",
    numTestVal: 30,
    textField: "patient",
    textLabel: "Patient Name",
    textPlaceholder: "e.g. Alex",
    textTestVal: "Alex",
    priceStyle: "min-max",
    price1Field: "priceMin",
    price1Label: "Fee Normal",
    price2Field: "priceMax",
    price2Label: "Fee Specialist",
    dateField: "appointmentDate",
    dateLabel: "Appointment Date",
    loginStyle: "L1",
    navbarStyle: "N1",
    sortStyle: "S2",
    categoryStyle: "C3",
    dbTypes: [
      { id: "1", name: "Dr. Nguyen (Cardiology)" },
      { id: "2", name: "Dr. Tran (Pediatrics)" },
      { id: "3", name: "Dr. Le (Dermatology)" }
    ],
    dbItems: [
      { id: "1", name: "Regular Heart Checkup", doctorId: "1", duration: 30, patient: "Bui Ngoc A", priceMin: 300000, priceMax: 500000, appointmentDate: "12/04/2026" },
      { id: "2", name: "Baby Growth Consult", doctorId: "2", duration: 45, patient: "Vu Thi B", priceMin: 200000, priceMax: 400000, appointmentDate: "13/04/2026" }
    ]
  },
  {
    id: "17_realestate",
    title: "Property Listings - Real Estate",
    appName: "Real Estate App",
    logo: "/images/logo.jpg",
    version: "v1.0.0",
    course: "FER202 — ReactJS",
    year: 2026,
    copyright: "© 2026 Real Estate App",
    entitySingular: "property",
    entityPlural: "properties",
    entitySingularPascal: "Property",
    entityPluralPascal: "Properties",
    typeSingular: "agent",
    typePlural: "agents",
    typeSingularPascal: "Agent",
    typePluralPascal: "Agents",
    typeIdField: "agentId",
    numField: "area",
    numLabel: "Area (sqm)",
    numPlaceholder: "e.g. 75",
    numTestVal: 75,
    textField: "status",
    textLabel: "Status",
    textPlaceholder: "e.g. Available",
    textTestVal: "Available",
    priceStyle: "min-max",
    price1Field: "priceMin",
    price1Label: "Price Base",
    price2Field: "priceMax",
    price2Label: "Price Target",
    dateField: "listedDate",
    dateLabel: "Listed Date",
    loginStyle: "L2",
    navbarStyle: "N2",
    sortStyle: "S1",
    categoryStyle: "C1",
    dbTypes: [
      { id: "1", name: "Brokerage Team A" },
      { id: "2", name: "Brokerage Team B" }
    ],
    dbItems: [
      { id: "1", name: "Landmark 81 Apartment", agentId: "1", area: 85, status: "Available", priceMin: 5000000000, priceMax: 5500000000, listedDate: "10/02/2026" },
      { id: "2", name: "Vinhome Riverside Villa", agentId: "2", area: 250, status: "Negotiating", priceMin: 20000000000, priceMax: 22000000000, listedDate: "15/02/2026" }
    ]
  },
  {
    id: "18_gym",
    title: "Gym Class Scheduler",
    appName: "Gym Scheduler App",
    logo: "/images/logo.jpg",
    version: "v1.0.0",
    course: "FER202 — ReactJS",
    year: 2026,
    copyright: "© 2026 Gym Scheduler App",
    entitySingular: "gymClass",
    entityPlural: "gymClasses",
    entitySingularPascal: "GymClass",
    entityPluralPascal: "GymClasses",
    typeSingular: "trainer",
    typePlural: "trainers",
    typeSingularPascal: "Trainer",
    typePluralPascal: "Trainers",
    typeIdField: "trainerId",
    numField: "capacity",
    numLabel: "Max Capacity",
    numPlaceholder: "e.g. 20",
    numTestVal: 20,
    textField: "level",
    textLabel: "Level",
    textPlaceholder: "e.g. Beginner",
    textTestVal: "Beginner",
    priceStyle: "weekday-weekend",
    price1Field: "priceWeekday",
    price1Label: "Weekday Fee",
    price2Field: "priceWeekend",
    price2Label: "Weekend Fee",
    dateField: "startDate",
    dateLabel: "Start Date",
    loginStyle: "L1",
    navbarStyle: "N3",
    sortStyle: "S1",
    categoryStyle: "C2",
    dbTypes: [
      { id: "1", name: "Trainer Coach Coach A" },
      { id: "2", name: "Trainer Coach Coach B" }
    ],
    dbItems: [
      { id: "1", name: "Power Yoga Morning", trainerId: "1", capacity: 15, level: "Intermediate", priceWeekday: 150000, priceWeekend: 200000, startDate: "01/04/2026" },
      { id: "2", name: "HIIT Weight Loss", trainerId: "2", capacity: 25, level: "Advanced", priceWeekday: 180000, priceWeekend: 220000, startDate: "05/04/2026" }
    ]
  },
  {
    id: "19_course",
    title: "Online Course Learning",
    appName: "Course Platform App",
    logo: "/images/logo.jpg",
    version: "v1.0.0",
    course: "FER202 — ReactJS",
    year: 2026,
    copyright: "© 2026 Course Platform App",
    entitySingular: "lesson",
    entityPlural: "lessons",
    entitySingularPascal: "Lesson",
    entityPluralPascal: "Lessons",
    typeSingular: "module",
    typePlural: "modules",
    typeSingularPascal: "Module",
    typePluralPascal: "Modules",
    typeIdField: "moduleId",
    numField: "duration",
    numLabel: "Duration (min)",
    numPlaceholder: "e.g. 15",
    numTestVal: 15,
    textField: "type",
    textLabel: "Lesson Type",
    textPlaceholder: "e.g. Video / Quiz",
    textTestVal: "Video",
    priceStyle: "min-max",
    price1Field: "priceMin",
    price1Label: "Access Fee Min",
    price2Field: "priceMax",
    price2Label: "Access Fee Max",
    dateField: "releasedDate",
    dateLabel: "Released Date",
    loginStyle: "L2",
    navbarStyle: "N1",
    sortStyle: "S1",
    categoryStyle: "C3",
    dbTypes: [
      { id: "1", name: "Module 1: React Basics" },
      { id: "2", name: "Module 2: Advanced Hooks" }
    ],
    dbItems: [
      { id: "1", name: "Introduction to React", moduleId: "1", duration: 10, type: "Video", priceMin: 0, priceMax: 10000, releasedDate: "01/02/2026" },
      { id: "2", name: "UseState Hooks Deep Dive", moduleId: "1", duration: 25, type: "Video", priceMin: 5000, priceMax: 15000, releasedDate: "03/02/2026" }
    ]
  },
  {
    id: "20_freelance",
    title: "Freelance Job Platform",
    appName: "Freelance App",
    logo: "/images/logo.jpg",
    version: "v1.0.0",
    course: "FER202 — ReactJS",
    year: 2026,
    copyright: "© 2026 Freelance App",
    entitySingular: "gig",
    entityPlural: "gigs",
    entitySingularPascal: "Gig",
    entityPluralPascal: "Gigs",
    typeSingular: "category",
    typePlural: "categories",
    typeSingularPascal: "Category",
    typePluralPascal: "Categories",
    typeIdField: "categoryId",
    numField: "delivery",
    numLabel: "Delivery Time (days)",
    numPlaceholder: "e.g. 5",
    numTestVal: 5,
    textField: "level",
    textLabel: "Seller Level",
    textPlaceholder: "e.g. Top Rated",
    textTestVal: "Top Rated",
    priceStyle: "min-max",
    price1Field: "priceMin",
    price1Label: "Price Min",
    price2Field: "priceMax",
    price2Label: "Price Max",
    dateField: "createdDate",
    dateLabel: "Created Date",
    loginStyle: "L1",
    navbarStyle: "N2",
    sortStyle: "S2",
    categoryStyle: "C1",
    dbTypes: [
      { id: "1", name: "Graphic Design" },
      { id: "2", name: "Web Development" }
    ],
    dbItems: [
      { id: "1", name: "Logo Design Premium", categoryId: "1", delivery: 3, level: "Level 2", priceMin: 500000, priceMax: 1200000, createdDate: "12/03/2026" },
      { id: "2", name: "Next.js Landing Page", categoryId: "2", delivery: 7, level: "Top Rated", priceMin: 2000000, priceMax: 5000000, createdDate: "14/03/2026" }
    ]
  }
];

// Helper to copy directory recursively
function copyDirSync(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist' || entry.name === 'build') {
      continue;
    }
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Generate the exams
function generate() {
  const workspaceRoot = 'd:\\University\\Ki5\\FER202\\PE\\backup';
  const templateBaseDir = path.join(workspaceRoot, 'template2', 'template');
  const mockExamsRoot = path.join(workspaceRoot, 'mock_exams');

  if (!fs.existsSync(mockExamsRoot)) {
    fs.mkdirSync(mockExamsRoot, { recursive: true });
  }

  console.log(`Starting generation from baseline: ${templateBaseDir}`);

  for (let d of DOMAINS) {
    const examDirName = `mock_exam_${d.id}`;
    const examPath = path.join(mockExamsRoot, examDirName);
    
    console.log(`Generating: ${examDirName}`);
    const tempProjDir = path.join(examPath, 'template');
    const solProjDir = path.join(examPath, 'solution');
    const tempNodeModules = path.join(tempProjDir, 'node_modules');
    const solNodeModules = path.join(solProjDir, 'node_modules');
    const hasTempNodeModules = fs.existsSync(tempNodeModules);
    const hasSolNodeModules = fs.existsSync(solNodeModules);

    const tempNodeModulesBackup = path.join(workspaceRoot, `temp_nm_backup_${d.id}`);
    const solNodeModulesBackup = path.join(workspaceRoot, `sol_nm_backup_${d.id}`);

    if (hasTempNodeModules) {
      fs.renameSync(tempNodeModules, tempNodeModulesBackup);
    }
    if (hasSolNodeModules) {
      fs.renameSync(solNodeModules, solNodeModulesBackup);
    }

    if (fs.existsSync(examPath)) {
      // Clean existing
      fs.rmSync(examPath, { recursive: true, force: true });
    }
    fs.mkdirSync(examPath, { recursive: true });

    // 1. Create template and solution folders by copying templateBaseDir
    copyDirSync(templateBaseDir, tempProjDir);
    copyDirSync(templateBaseDir, solProjDir);

    // Restore node_modules
    if (hasTempNodeModules) {
      fs.mkdirSync(path.dirname(tempNodeModules), { recursive: true });
      fs.renameSync(tempNodeModulesBackup, tempNodeModules);
    }
    if (hasSolNodeModules) {
      fs.mkdirSync(path.dirname(solNodeModules), { recursive: true });
      fs.renameSync(solNodeModulesBackup, solNodeModules);
    }


    // 2. We will generate the files for both folders
    generateProjectFiles(tempProjDir, d, false);
    generateProjectFiles(solProjDir, d, true);

    // 3. Generate DeThi.md in examPath
    const deThiContent = generateDeThiMarkdown(d);
    fs.writeFileSync(path.join(examPath, 'DeThi.md'), deThiContent, 'utf8');
  }

  console.log('All 20 mock exams generated successfully!');
}

// Check template code generation helpers
// To compile components dynamically with delimiters:
// we process a block of code, selecting between TEMPLATE and SOLUTION code.
function processDelimiters(content, isSolution) {
  if (isSolution) {
    // Keep solution, discard template blocks
    let res = content.replace(/\/\/ === TEMPLATE_START ===[\s\S]*?\/\/ === TEMPLATE_END ===\r?\n?/g, '');
    res = res.replace(/\/\/ === SOLUTION_START ===\r?\n?/g, '');
    res = res.replace(/\/\/ === SOLUTION_END ===\r?\n?/g, '');
    return res;
  } else {
    // Keep template blocks, discard solution
    let res = content.replace(/\/\/ === SOLUTION_START ===[\s\S]*?\/\/ === SOLUTION_END ===\r?\n?/g, '');
    res = res.replace(/\/\/ === TEMPLATE_START ===\r?\n?/g, '');
    res = res.replace(/\/\/ === TEMPLATE_END ===\r?\n?/g, '');
    return res;
  }
}

// Function to generate project-specific files
function generateProjectFiles(projDir, d, isSolution) {
  // Clear the car-related files copied from template2
  const filesToDelete = [
    'src/api/carApi.js',
    'src/context/CarContext.jsx',
    'src/reducer/carReducer.js',
    'src/reducer/carTypeReducer.js',
    'src/components/CarRow.jsx',
    'src/components/CarTypeList.jsx',
    'src/components/FilterBar.jsx',
    'src/pages/CarList.jsx',
    'src/pages/CarDetail.jsx',
    'src/pages/AddCar.jsx',
    'src/pages/ManageCarTypes.jsx',
    'src/pages/CarTypeDetail.jsx',
    'src/__tests__/AddCar.test.jsx',
    'src/__tests__/CarDetail.test.jsx',
    'src/__tests__/CarList.test.jsx',
    'src/__tests__/CarRow.test.jsx',
    'src/__tests__/CarTypeDetail.test.jsx',
    'src/__tests__/ManageCarTypes.test.jsx',
    'src/__tests__/AuthContext.test.jsx',
  ];

  for (let f of filesToDelete) {
    const fp = path.join(projDir, f);
    if (fs.existsSync(fp)) {
      fs.unlinkSync(fp);
    }
  }

  // Write dynamic files
  // 1. db.json
  const dbJson = generateDbJson(d);
  fs.writeFileSync(path.join(projDir, 'db.json'), JSON.stringify(dbJson, null, 2), 'utf8');

  // 2. package.json name change and adding dependencies
  const pkgPath = path.join(projDir, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    pkg.name = `mock-exam-${d.id}`;
    pkg.devDependencies = pkg.devDependencies || {};
    pkg.devDependencies['axios-mock-adapter'] = '^2.1.0';
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf8');
  }

  // 3. src/data/about.js
  const aboutJs = `export default {
  appName: '${d.appName}',
  logo: '${d.logo}',
  version: '${d.version}',
  course: '${d.course}',
  year: ${d.year},
  copyright: '${d.copyright}',
}
`;
  fs.writeFileSync(path.join(projDir, 'src/data/about.js'), aboutJs, 'utf8');

  // 4. src/api/authApi.js
  fs.writeFileSync(path.join(projDir, 'src/api/authApi.js'), generateAuthApiJs(d), 'utf8');

  // 5. src/api/entityApi.js
  fs.writeFileSync(path.join(projDir, `src/api/${d.entitySingular}Api.js`), generateEntityApiJs(d), 'utf8');

  // 6. src/context/AuthContext.jsx
  fs.writeFileSync(path.join(projDir, 'src/context/AuthContext.jsx'), generateAuthContextJs(d), 'utf8');

  // 7. src/context/EntityContext.jsx
  fs.writeFileSync(path.join(projDir, `src/context/${d.entitySingularPascal}Context.jsx`), generateEntityContextJs(d), 'utf8');

  // 8. src/reducer/authReducer.js
  fs.writeFileSync(path.join(projDir, 'src/reducer/authReducer.js'), generateAuthReducerJs(d), 'utf8');

  // 9. src/reducer/entityReducer.js
  fs.writeFileSync(path.join(projDir, `src/reducer/${d.entitySingular}Reducer.js`), generateEntityReducerJs(d), 'utf8');

  // 10. src/utils/format.js
  fs.writeFileSync(path.join(projDir, 'src/utils/format.js'), generateFormatJs(d), 'utf8');

  // 11. src/utils/validate.js
  fs.writeFileSync(path.join(projDir, 'src/utils/validate.js'), generateValidateJs(d), 'utf8');

  // 12. src/routes/AppRoutes.jsx
  fs.writeFileSync(path.join(projDir, 'src/routes/AppRoutes.jsx'), generateAppRoutesJs(d), 'utf8');

  // 13. src/routes/ProtectedRoute.jsx
  fs.writeFileSync(path.join(projDir, 'src/routes/ProtectedRoute.jsx'), generateProtectedRouteJs(d), 'utf8');

  // 14. src/components/AppNavbar.jsx
  const appNavbarRaw = generateAppNavbarJs(d);
  fs.writeFileSync(path.join(projDir, 'src/components/AppNavbar.jsx'), processDelimiters(appNavbarRaw, isSolution), 'utf8');

  // 15. src/components/AppFooter.jsx
  const appFooterRaw = generateAppFooterJs(d);
  fs.writeFileSync(path.join(projDir, 'src/components/AppFooter.jsx'), processDelimiters(appFooterRaw, isSolution), 'utf8');

  // 16. src/components/ModalConfirm.jsx
  const modalConfirmRaw = generateModalConfirmJs(d);
  fs.writeFileSync(path.join(projDir, 'src/components/ModalConfirm.jsx'), processDelimiters(modalConfirmRaw, isSolution), 'utf8');

  // 17. src/components/EntityRow.jsx
  const entityRowRaw = generateEntityRowJs(d);
  fs.writeFileSync(path.join(projDir, `src/components/${d.entitySingularPascal}Row.jsx`), processDelimiters(entityRowRaw, isSolution), 'utf8');

  // 18. src/pages/Login.jsx
  const loginRaw = generateLoginJs(d);
  fs.writeFileSync(path.join(projDir, 'src/pages/Login.jsx'), processDelimiters(loginRaw, isSolution), 'utf8');

  // 19. src/pages/EntityList.jsx
  const entityListRaw = generateEntityListJs(d);
  fs.writeFileSync(path.join(projDir, `src/pages/${d.entitySingularPascal}List.jsx`), processDelimiters(entityListRaw, isSolution), 'utf8');

  // 20. src/pages/EntityDetail.jsx
  const entityDetailRaw = generateEntityDetailJs(d);
  fs.writeFileSync(path.join(projDir, `src/pages/${d.entitySingularPascal}Detail.jsx`), processDelimiters(entityDetailRaw, isSolution), 'utf8');

  // 21. src/pages/AddEntity.jsx
  const addEntityRaw = generateAddEntityJs(d);
  fs.writeFileSync(path.join(projDir, `src/pages/Add${d.entitySingularPascal}.jsx`), processDelimiters(addEntityRaw, isSolution), 'utf8');

  // 22. src/pages/ManageTypes.jsx
  const manageTypesRaw = generateManageTypesJs(d);
  fs.writeFileSync(path.join(projDir, `src/pages/Manage${d.typePluralPascal}.jsx`), processDelimiters(manageTypesRaw, isSolution), 'utf8');

  // 23. src/pages/TypeDetail.jsx
  const typeDetailRaw = generateTypeDetailJs(d);
  fs.writeFileSync(path.join(projDir, `src/pages/${d.typeSingularPascal}Detail.jsx`), processDelimiters(typeDetailRaw, isSolution), 'utf8');

  // 24. src/pages/NotFound.jsx
  const notFoundRaw = generateNotFoundJs(d);
  fs.writeFileSync(path.join(projDir, 'src/pages/NotFound.jsx'), processDelimiters(notFoundRaw, isSolution), 'utf8');

  // 25. src/App.jsx
  fs.writeFileSync(path.join(projDir, 'src/App.jsx'), generateAppJs(d), 'utf8');

  // 26. Write the Tests!
  fs.writeFileSync(path.join(projDir, 'src/__tests__/Login.test.jsx'), generateLoginTest(d), 'utf8');
  fs.writeFileSync(path.join(projDir, 'src/__tests__/AppNavbar.test.jsx'), generateNavbarTest(d), 'utf8');
  fs.writeFileSync(path.join(projDir, 'src/__tests__/AppFooter.test.jsx'), generateFooterTest(d), 'utf8');
  fs.writeFileSync(path.join(projDir, `src/__tests__/${d.entitySingularPascal}Row.test.jsx`), generateRowTest(d), 'utf8');
  fs.writeFileSync(path.join(projDir, `src/__tests__/${d.entitySingularPascal}Detail.test.jsx`), generateDetailTest(d), 'utf8');
  fs.writeFileSync(path.join(projDir, `src/__tests__/Manage${d.typePluralPascal}.test.jsx`), generateManageTypesTest(d), 'utf8');
  
  if (d.categoryStyle === 'C1' || d.categoryStyle === 'C3') {
    fs.writeFileSync(path.join(projDir, `src/__tests__/${d.typeSingularPascal}Detail.test.jsx`), generateTypeDetailTest(d), 'utf8');
  }
  fs.writeFileSync(path.join(projDir, `src/__tests__/${d.entitySingularPascal}List.test.jsx`), generateListTest(d), 'utf8');
  fs.writeFileSync(path.join(projDir, `src/__tests__/Add${d.entitySingularPascal}.test.jsx`), generateAddTest(d), 'utf8');
  fs.writeFileSync(path.join(projDir, 'src/__tests__/AuthContext.test.jsx'), generateAuthContextTest(d), 'utf8');


  // Overwrite jest.config.js with a clean version without testMatch
  const jestConfig = `export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./src/setupTests.js'],
  moduleNameMapper: {
    '\\\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
    '\\\\.(png|jpg|jpeg|gif|svg|webp)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\\\.[jt]sx?$': 'babel-jest',
  },
}
`;
  fs.writeFileSync(path.join(projDir, 'jest.config.js'), jestConfig, 'utf8');
}


// Generate the dynamic templates contents
function generateDbJson(d) {
  return {
    users: [
      { id: "1", username: "admin", password: "admin123", role: "Admin", fullName: "Admin Manager", email: "admin@test.com" },
      { id: "2", username: "user1", password: "user123", role: "User", fullName: "Nguyen Van User", email: "user1@test.com" },
      { id: "3", username: "agent", password: "agent123", role: "User", fullName: "Tran Thi Agent", email: "agent@test.com" }
    ],
    [d.typePlural]: d.dbTypes,
    [d.entityPlural]: d.dbItems
  };
}

function generateAuthApiJs(d) {
  return `import axios from 'axios'
const BASE_URL = 'http://localhost:3001'

export const login = async (username, password) => {
  const response = await axios.get(\`\${BASE_URL}/users\`)
  const users = response.data
  const user = users.find(u => u.username === username && u.password === password)
  if (!user) {
    throw new Error('Invalid username or password.')
  }
  ${d.loginStyle === 'L1' ? "if (user.role !== 'Admin') {\n    throw new Error('Access denied. Only Admin users can log in.')\n  }" : ''}
  return user
}
`;
}


function generateEntityApiJs(d) {
  return `import axios from 'axios'
const BASE_URL = 'http://localhost:3001'

export const fetch${d.typePluralPascal} = async () => {
  const response = await axios.get(\`\${BASE_URL}/${d.typePlural}\`)
  return response.data
}

export const fetch${d.typeSingularPascal}ById = async (id) => {
  const response = await axios.get(\`\${BASE_URL}/${d.typePlural}/\${id}\`)
  return response.data
}

export const add${d.typeSingularPascal} = async (data) => {
  const response = await axios.post(\`\${BASE_URL}/${d.typePlural}\`, data)
  return response.data
}

export const delete${d.typeSingularPascal} = async (id) => {
  const response = await axios.delete(\`\${BASE_URL}/${d.typePlural}/\${id}\`)
  return response.data
}

export const fetch${d.entityPluralPascal} = async () => {
  const response = await axios.get(\`\${BASE_URL}/${d.entityPlural}\`)
  return response.data
}

export const fetch${d.entitySingularPascal}ById = async (id) => {
  const response = await axios.get(\`\${BASE_URL}/${d.entityPlural}/\${id}\`)
  return response.data
}

export const add${d.entitySingularPascal} = async (data) => {
  const response = await axios.post(\`\${BASE_URL}/${d.entityPlural}\`, data)
  return response.data
}

export const delete${d.entitySingularPascal} = async (id) => {
  const response = await axios.delete(\`\${BASE_URL}/${d.entityPlural}/\${id}\`)
  return response.data
}
`;
}

function generateAuthContextJs(d) {
  return `import { createContext, useContext, useState, useEffect } from 'react'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const isAuthenticated = !!user

  const loginUser = (userData) => {
    setUser(userData)
    sessionStorage.setItem('user', JSON.stringify(userData))
  }

  const logoutUser = () => {
    setUser(null)
    sessionStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
`;
}

function generateEntityContextJs(d) {
  return `import { createContext, useContext, useReducer, useEffect } from 'react'
import { ${d.entitySingular}Reducer, initialState } from '../reducer/${d.entitySingular}Reducer'
import { fetch${d.typePluralPascal}, fetch${d.entityPluralPascal} } from '../api/${d.entitySingular}Api'

export const ${d.entitySingularPascal}Context = createContext(null)

export function ${d.entitySingularPascal}Provider({ children }) {
  const [state, dispatch] = useReducer(${d.entitySingular}Reducer, initialState)

  useEffect(() => {
    Promise.allSettled([fetch${d.typePluralPascal}(), fetch${d.entityPluralPascal}()]).then(
      ([typesResult, itemsResult]) => {
        if (typesResult.status === 'fulfilled')
          dispatch({ type: 'SET_TYPES', payload: typesResult.value })
        if (itemsResult.status === 'fulfilled')
          dispatch({ type: 'SET_ITEMS', payload: itemsResult.value })
        else
          dispatch({ type: 'SET_ERROR', payload: itemsResult.reason?.message })
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    )
  }, [])

  return (
    <${d.entitySingularPascal}Context.Provider value={{ state, dispatch }}>
      {children}
    </${d.entitySingularPascal}Context.Provider>
  )
}

export function use${d.entitySingularPascal}() {
  return useContext(${d.entitySingularPascal}Context)
}
`;
}

function generateAuthReducerJs(d) {
  return `export const loginInitialState = {
  username: '',
  password: '',
  validated: false,
  serverError: '',
}

export function loginReducer(state, action) {
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...state, username: action.payload }
    case 'SET_PASSWORD':
      return { ...state, password: action.payload }
    case 'SET_VALIDATED':
      return { ...state, validated: action.payload }
    case 'SET_ERROR':
      return { ...state, serverError: action.payload, validated: false }
    case 'CANCEL':
      return loginInitialState
    default:
      return state
  }
}
`;
}

function generateEntityReducerJs(d) {
  return `export const initialState = {
  loading: true,
  error: null,
  ${d.typePlural}: [],
  ${d.entityPlural}: [],
}

export function ${d.entitySingular}Reducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_TYPES':
      return { ...state, ${d.typePlural}: action.payload }
    case 'SET_ITEMS':
      return { ...state, ${d.entityPlural}: action.payload }
    case 'ADD_ITEM':
      return { ...state, ${d.entityPlural}: [...state.${d.entityPlural}, action.payload] }
    case 'DELETE_ITEM':
      return {
        ...state,
        ${d.entityPlural}: state.${d.entityPlural}.filter((item) => item.id !== action.payload),
      }
    case 'DELETE_TYPE':
      return {
        ...state,
        ${d.typePlural}: state.${d.typePlural}.filter((type) => type.id !== action.payload),
      }
    case 'ADD_TYPE':
      return { ...state, ${d.typePlural}: [...state.${d.typePlural}, action.payload] }
    default:
      return state
  }
}
`;
}

function generateFormatJs(d) {
  return `export const formatVND = (value) => {
  if (value === undefined || value === null) return '—'
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
}

export const formatDateDisplay = (dateString) => {
  if (!dateString) return '—'
  return dateString
}

export const formatPriceRange = (min, max) => {
  if (min === 0 && max === 0) return '0 ₫'
  return \`\${formatVND(min)} – \${formatVND(max)}\`
}
`;
}

function generateValidateJs(d) {
  return `export const validateUsername = (username) => {
  if (!username || username.trim().length < 3) return 'Username must be at least 3 characters.'
  return null
}

export const validatePassword = (password) => {
  if (!password || password.length < 5) return 'Password must be at least 5 characters.'
  return null
}
`;
}

function generateAppRoutesJs(d) {
  return `import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import ${d.entitySingularPascal}List from '../pages/${d.entitySingularPascal}List'
import ${d.entitySingularPascal}Detail from '../pages/${d.entitySingularPascal}Detail'
import Add${d.entitySingularPascal} from '../pages/Add${d.entitySingularPascal}'
import Manage${d.typePluralPascal} from '../pages/Manage${d.typePluralPascal}'
import ${d.typeSingularPascal}Detail from '../pages/${d.typeSingularPascal}Detail'
import NotFound from '../pages/NotFound'
import ProtectedRoute from './ProtectedRoute'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <${d.entitySingularPascal}List />
          </ProtectedRoute>
        }
      />
      <Route
        path="/${d.entityPlural}/:id"
        element={
          <ProtectedRoute>
            <${d.entitySingularPascal}Detail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <Add${d.entitySingularPascal} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/${d.typePlural}"
        element={
          <ProtectedRoute>
            <Manage${d.typePluralPascal} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/${d.typePlural}/:id"
        element={
          <ProtectedRoute>
            <${d.typeSingularPascal}Detail />
          </ProtectedRoute>
        }
      />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
`;
}

function generateProtectedRouteJs(d) {
  return `import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}
`;
}

function generateAppJs(d) {
  return `import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ${d.entitySingularPascal}Provider } from './context/${d.entitySingularPascal}Context'
import AppNavbar from './components/AppNavbar'
import AppFooter from './components/AppFooter'
import AppRoutes from './routes/AppRoutes'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <${d.entitySingularPascal}Provider>
          <div className="d-flex flex-column min-vh-host min-vh-100">
            <AppNavbar />
            <main className="flex-grow-1">
              <AppRoutes />
            </main>
            <AppFooter />
          </div>
        </${d.entitySingularPascal}Provider>
      </AuthProvider>
    </Router>
  )
}
`;
}

generate();

