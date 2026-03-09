export const allProducts = [

/* ================= FRUITS ================= */

{ id: 1,  name: "Apple",       image: "/products/apple.png",       price: "₹120", quantities: ["500g","1kg","2kg"],    category:"fruits-vegetables", subCategory:"fruits",     rating: 4.5, reviews: 128, origin: "Himachal Pradesh", shelf: "5–7 days", description: "Crisp, sweet Himalayan apples packed with antioxidants and dietary fibre. Perfect for snacking, baking, or adding to salads. Handpicked from high-altitude orchards for maximum freshness.", highlights: ["Rich in Vitamin C & B6","High dietary fibre","No artificial wax coating","Cold-chain delivered"] },
{ id: 2,  name: "Banana",      image: "/products/banana.png",      price: "₹60",  quantities: ["6pcs","12pcs","24pcs"],category:"fruits-vegetables", subCategory:"fruits",     rating: 4.3, reviews: 95,  origin: "Kerala",            shelf: "3–5 days", description: "Naturally ripened Kerala bananas with a creamy texture and rich sweetness. Great for breakfast, smoothies, or a quick energy boost throughout the day.", highlights: ["Instant energy source","High potassium","Naturally ripened","No preservatives"] },
{ id: 3,  name: "Orange",      image: "/products/orange.png",      price: "₹90",  quantities: ["500g","1kg","2kg"],    category:"fruits-vegetables", subCategory:"fruits",     rating: 4.4, reviews: 110, origin: "Nagpur",            shelf: "7–10 days",description: "Juicy Nagpur oranges, India's finest, bursting with Vitamin C and natural citrus sweetness. Ideal for fresh juice, zesting, or eating as is.", highlights: ["Immunity booster","High Vitamin C","Low calorie","Freshly harvested"] },
{ id: 4,  name: "Mango",       image: "/products/mango.png",       price: "₹150", quantities: ["500g","1kg","2kg"],    category:"fruits-vegetables", subCategory:"fruits",     rating: 4.8, reviews: 245, origin: "Ratnagiri, Maharashtra", shelf: "4–6 days", description: "The king of fruits — Alphonso mangoes from Ratnagiri with an unmatched aroma, fibre-rich golden pulp, and natural sweetness. No artificial ripening, ever.", highlights: ["GI-tagged Alphonso variety","Naturally ripened","Zero artificial chemicals","Fibre-rich golden pulp"] },
{ id: 5,  name: "Pineapple",   image: "/products/pineapple.png",   price: "₹80",  quantities: ["1pc","2pcs"],          category:"fruits-vegetables", subCategory:"fruits",     rating: 4.2, reviews: 67,  origin: "Assam",             shelf: "5–7 days", description: "Tangy-sweet Assam pineapples with a juicy core and vibrant flavour. Great for fruit bowls, desserts, grilling, or tropical smoothies.", highlights: ["Rich in Bromelain enzyme","Aids digestion","Naturally tropical sweet","Farm sourced"] },
{ id: 6,  name: "Papaya",      image: "/products/papaya.png",      price: "₹70",  quantities: ["1pc","2pcs"],          category:"fruits-vegetables", subCategory:"fruits",     rating: 4.1, reviews: 54,  origin: "Andhra Pradesh",    shelf: "4–5 days", description: "Soft, sweet papaya with bright orange flesh loaded with Vitamin A and digestive enzymes. Ideal for breakfast or as a post-meal digestive aid.", highlights: ["Aids digestion","High Vitamin A","Low calorie","Anti-inflammatory"] },
{ id: 7,  name: "Guava",       image: "/products/guava.png",       price: "₹60",  quantities: ["500g","1kg"],          category:"fruits-vegetables", subCategory:"fruits",     rating: 4.0, reviews: 43,  origin: "Uttar Pradesh",     shelf: "4–6 days", description: "Crunchy and fragrant Allahabad guavas — one of the richest sources of Vitamin C. Eat fresh with salt and chilli or blend into a refreshing juice.", highlights: ["4× Vitamin C of oranges","High fibre","Low glycaemic index","Great for immunity"] },
{ id: 8,  name: "Watermelon",  image: "/products/watermelon.png",  price: "₹120", quantities: ["1pc","2pcs"],          category:"fruits-vegetables", subCategory:"fruits",     rating: 4.6, reviews: 189, origin: "Karnataka",         shelf: "7–10 days",description: "Sweet, hydrating Karnataka watermelons — 92% water content makes them the ultimate summer fruit. Perfect for juices, smoothies, or chilling in slices.", highlights: ["92% water content","Lycopene-rich","Natural electrolyte","Seedless variety"] },
{ id: 9,  name: "Strawberry",  image: "/products/strawberry.png",  price: "₹200", quantities: ["250g","500g"],         category:"fruits-vegetables", subCategory:"fruits",     rating: 4.7, reviews: 203, origin: "Mahabaleshwar",     shelf: "2–3 days", description: "Fresh, hand-picked Mahabaleshwar strawberries with a deep red colour and a perfect sweet-tart balance. Best enjoyed fresh, in shakes, or as cake toppings.", highlights: ["Hand-picked & washed","Rich in antioxidants","No cold-storage delay","Same-day dispatch"] },
{ id: 10, name: "Kiwi",        image: "/products/kiwi.webp",       price: "₹220", quantities: ["3pcs","6pcs"],         category:"fruits-vegetables", subCategory:"fruits",     rating: 4.5, reviews: 88,  origin: "New Zealand (Imported)", shelf: "10–14 days", description: "Premium imported kiwis with vibrant green flesh and a tangy-sweet flavour. Packed with Vitamin K, C, and folate — a nutritional powerhouse in every bite.", highlights: ["Imported premium grade","High Vitamin K & C","Supports heart health","Rich in folate"] },

/* ================= VEGETABLES ================= */

{ id: 11, name: "Tomato",      image: "/products/tomato.png",      price: "₹80",  quantities: ["500g","1kg","2kg"],    category:"fruits-vegetables", subCategory:"vegetables", rating: 4.3, reviews: 175, origin: "Nashik",            shelf: "5–7 days", description: "Firm, bright-red Nashik tomatoes with a rich umami flavour. Essential for curries, gravies, chutneys, and salads. Sourced fresh from the tomato capital of India.", highlights: ["Lycopene-rich","Firm & non-bruised","Direct farm sourced","Pesticide-tested"] },
{ id: 12, name: "Potato",      image: "/products/potato.webp",     price: "₹60",  quantities: ["1kg","2kg","5kg"],     category:"fruits-vegetables", subCategory:"vegetables", rating: 4.2, reviews: 310, origin: "Agra, UP",         shelf: "14–21 days",description: "The all-rounder of Indian kitchens — Agra potatoes with smooth skin and fluffy interior. Ideal for frying, boiling, mashing, and curries.", highlights: ["Smooth skin","High starch variety","Versatile cooking","Long shelf life"] },
{ id: 13, name: "Onion",       image: "/products/onion.png",       price: "₹70",  quantities: ["1kg","2kg","5kg"],     category:"fruits-vegetables", subCategory:"vegetables", rating: 4.1, reviews: 280, origin: "Lasalgaon, Nashik", shelf: "21–30 days",description: "Pungent, flavourful red onions from Lasalgaon — India's largest onion market. The backbone of Indian cooking, essential for almost every dish.", highlights: ["Strong pungent flavour","Long shelf life","Low moisture variety","Farm sorted"] },
{ id: 14, name: "Carrot",      image: "/products/carrot.png",      price: "₹90",  quantities: ["500g","1kg"],          category:"fruits-vegetables", subCategory:"vegetables", rating: 4.4, reviews: 134, origin: "Punjab",            shelf: "7–10 days", description: "Crisp, sweet Punjab carrots with a vibrant orange colour. Rich in beta-carotene and Vitamin A. Perfect for juicing, salads, curries, and halwa.", highlights: ["Beta-carotene rich","High Vitamin A","Sweet & crunchy","Great for juicing"] },
{ id: 15, name: "Cabbage",     image: "/products/cabbage.webp",    price: "₹50",  quantities: ["1pc","2pcs"],          category:"fruits-vegetables", subCategory:"vegetables", rating: 4.0, reviews: 89,  origin: "Ooty, Tamil Nadu",  shelf: "7–10 days", description: "Fresh, tightly packed Ooty cabbage with crisp leaves and mild flavour. Great for stir-fries, coleslaws, and wraps. Low calorie and highly nutritious.", highlights: ["Low calorie","High Vitamin K","Crisp & fresh leaves","No yellowing"] },
{ id: 16, name: "Cauliflower", image: "/products/cauliflower.png", price: "₹60",  quantities: ["1pc","2pcs"],          category:"fruits-vegetables", subCategory:"vegetables", rating: 4.1, reviews: 77,  origin: "Punjab",            shelf: "5–7 days", description: "White, compact Punjab cauliflower with a mild nutty taste. Excellent for aloo gobi, soups, roasting, and low-carb rice alternatives.", highlights: ["Tight compact florets","Rich in Vitamin C","Low carb","Fresh-cut aroma"] },
{ id: 17, name: "Spinach",     image: "/products/spinach.webp",    price: "₹40",  quantities: ["250g","500g"],         category:"fruits-vegetables", subCategory:"vegetables", rating: 4.3, reviews: 112, origin: "Pune",              shelf: "3–4 days", description: "Tender baby spinach leaves from Pune with a mild earthiness. A superfood packed with iron, calcium, and folate. Perfect for palak paneer, salads, and smoothies.", highlights: ["Iron & folate-rich","Tender baby leaves","No thick stalks","Washed & packed"] },
{ id: 18, name: "Brinjal",     image: "/products/brinjal.png",     price: "₹70",  quantities: ["500g","1kg"],          category:"fruits-vegetables", subCategory:"vegetables", rating: 3.9, reviews: 58,  origin: "Gujarat",           shelf: "5–7 days", description: "Glossy purple Gujarat brinjals with few seeds and a tender flesh. Essential for baingan bharta, curries, and grilled preparations.", highlights: ["Glossy unblemished skin","Low seeds","Tender flesh","Antioxidant-rich"] },
{ id: 19, name: "Capsicum",    image: "/products/capsicum.png",    price: "₹110", quantities: ["500g","1kg"],          category:"fruits-vegetables", subCategory:"vegetables", rating: 4.2, reviews: 93,  origin: "Himachal Pradesh",  shelf: "7–10 days", description: "Firm, thick-walled green capsicums from Himachal Pradesh with a mild sweetness and crunch. Great for stir-fries, pasta, pizzas, and sabzis.", highlights: ["Thick-walled & crunchy","High Vitamin C","Mild sweetness","Firm texture"] },
{ id: 20, name: "Green Peas",  image: "/products/peas.png",        price: "₹130", quantities: ["500g","1kg"],          category:"fruits-vegetables", subCategory:"vegetables", rating: 4.5, reviews: 147, origin: "Uttar Pradesh",     shelf: "4–5 days", description: "Sweet, plump green peas freshly shelled and packed. A winter favourite loaded with plant protein and dietary fibre. Perfect for matar paneer, pulao, and soups.", highlights: ["High plant protein","Sweet & plump","Freshly shelled","Flash-frozen fresh"] },

/* ================= MILK ================= */

{ id: 21, name: "Amul Milk",         image: "/products/amul-milk.png",      price: "₹60",  quantities: ["500ml","1L"],   category:"dairy", subCategory:"milk",   rating: 4.6, reviews: 520, origin: "Gujarat Co-op", shelf: "2 days",  description: "India's most trusted full-cream milk from Amul, the dairy co-operative that transformed India's white revolution. Pasteurised and homogenised for consistent quality and taste.", highlights: ["Pasteurised & homogenised","Full cream 6% fat","No added preservatives","Trusted since 1946"] },
{ id: 22, name: "Mother Dairy Milk", image: "/products/mother-dairy.png",   price: "₹60",  quantities: ["500ml","1L"],   category:"dairy", subCategory:"milk",   rating: 4.5, reviews: 418, origin: "Delhi NCR",     shelf: "2 days",  description: "Mother Dairy toned milk — fresh, wholesome, and tested for purity. A staple in millions of Indian households, perfect for chai, cooking, or drinking straight.", highlights: ["Toned 3% fat","Double toned variant available","Strict quality testing","Daily fresh supply"] },
{ id: 23, name: "Nestle Milk",       image: "/products/nestle-milk.png",    price: "₹65",  quantities: ["500ml","1L"],   category:"dairy", subCategory:"milk",   rating: 4.4, reviews: 267, origin: "Pan India",     shelf: "90 days (UHT)", description: "Nestle UHT processed milk that stays fresh without refrigeration until opened. Ideal for travel, office, or stocking up. Rich in calcium and essential vitamins.", highlights: ["UHT processed","No refrigeration needed (unopened)","Calcium & Vitamin D fortified","Long shelf life"] },
{ id: 24, name: "Cow Milk",          image: "/products/cow-milk.png",       price: "₹70",  quantities: ["1L","2L"],      category:"dairy", subCategory:"milk",   rating: 4.7, reviews: 189, origin: "Local Farms",   shelf: "1–2 days",description: "Pure, fresh A2 cow milk sourced from local grass-fed desi cows. Lighter on digestion and richer in nutrients than A1 milk. Best for children and health-conscious families.", highlights: ["A2 protein milk","Grass-fed desi cows","Easy to digest","No hormones given"] },
{ id: 25, name: "Buffalo Milk",      image: "/products/buffalo-milk.png",   price: "₹80",  quantities: ["1L","2L"],      category:"dairy", subCategory:"milk",   rating: 4.5, reviews: 143, origin: "Haryana",       shelf: "1–2 days",description: "Creamy, thick buffalo milk from Haryana — higher in fat and calcium than cow milk. Perfect for making paneer, khoa, ghee, and rich dairy preparations.", highlights: ["High fat 7–8%","Rich in calcium","Ideal for sweets & paneer","Thick creamy texture"] },

/* ================= CHEESE ================= */

{ id: 26, name: "Cheddar Cheese",    image: "/products/cheddar.png",         price: "₹180", quantities: ["200g","500g"], category:"dairy", subCategory:"cheese", rating: 4.5, reviews: 98,  origin: "Amul Dairy",    shelf: "30 days", description: "Sharp, aged Cheddar cheese with a firm texture and distinctive tangy flavour. Excellent for sandwiches, grilled cheese, pasta bakes, and cheeseboards.", highlights: ["Aged sharp flavour","Firm sliceable texture","High calcium","Vegetarian rennet"] },
{ id: 27, name: "Mozzarella Cheese", image: "/products/mozzarella.webp",     price: "₹220", quantities: ["200g","500g"], category:"dairy", subCategory:"cheese", rating: 4.7, reviews: 175, origin: "La Ferme / Amul",shelf: "15 days", description: "Stretchy, milky mozzarella — the soul of every pizza and caprese salad. Melts beautifully under heat, creating that iconic cheese pull everyone loves.", highlights: ["Perfect melt & stretch","Mild creamy flavour","Great for pizza & pasta","Low in sodium"] },
{ id: 28, name: "Processed Cheese",  image: "/products/processed-cheese.webp",price: "₹150",quantities: ["200g","400g"], category:"dairy", subCategory:"cheese", rating: 4.2, reviews: 221, origin: "Amul",          shelf: "180 days",description: "Smooth, creamy processed cheese that melts perfectly on toast, sandwiches, and burgers. A pantry essential loved by kids and adults alike.", highlights: ["Melts smoothly","Long shelf life","Mild crowd-pleasing flavour","Individually portioned"] },
{ id: 29, name: "Cheese Slices",     image: "/products/cheese-slices.png",   price: "₹170", quantities: ["5pcs","10pcs"],category:"dairy", subCategory:"cheese", rating: 4.3, reviews: 134, origin: "Britannia",     shelf: "60 days", description: "Individually wrapped cheese slices — perfectly portioned for burgers, sandwiches, and wraps. Consistent melt and flavour every time.", highlights: ["Individually wrapped","Consistent melt","Ready-to-use","School lunch friendly"] },
{ id: 30, name: "Cheese Spread",     image: "/products/cheese-spread.png",   price: "₹160", quantities: ["200g","400g"], category:"dairy", subCategory:"cheese", rating: 4.4, reviews: 167, origin: "Amul",          shelf: "90 days", description: "Creamy, spreadable cheese with a smooth consistency and rich dairy flavour. Perfect on crackers, toast, or as a dip base. Comes in plain and herb variants.", highlights: ["Ultra-smooth spread","No artificial colour","Versatile usage","Rich creamy taste"] },

/* ================= CHIPS ================= */

{ id: 31, name: "Lays Classic",       image: "/products/lays-classic.png",  price: "₹20",  quantities: ["20g","50g","100g"], category:"snacks", subCategory:"chips",    rating: 4.4, reviews: 890, origin: "PepsiCo India", shelf: "6 months", description: "The original, lightly salted Lay's chips — thin-cut, crispy, and perfectly seasoned. The world's best-selling chip for a reason. Great with dips or straight from the bag.", highlights: ["Light & crispy","Classic salted flavour","No MSG","Perfect with dips"] },
{ id: 32, name: "Lays Magic Masala",  image: "/products/lays-masala.png",   price: "₹20",  quantities: ["20g","50g","100g"], category:"snacks", subCategory:"chips",    rating: 4.6, reviews: 1120,origin: "PepsiCo India", shelf: "6 months", description: "India's favourite chip flavour — Lays Magic Masala. Tangy, spicy, and utterly addictive. The perfect companion for evenings, movies, and chai time.", highlights: ["India's #1 chip flavour","Tangy masala spice blend","Crispy thin cut","No artificial colours"] },
{ id: 33, name: "Uncle Chips",        image: "/products/uncle-chips.png",   price: "₹20",  quantities: ["20g","50g","100g"], category:"snacks", subCategory:"chips",    rating: 4.1, reviews: 445, origin: "PepsiCo India", shelf: "6 months", description: "Thick-cut, extra-crunchy Uncle Chips with a bold masala punch. A nostalgic favourite that's been satisfying Indian taste buds for decades.", highlights: ["Thick-cut extra crunch","Bold masala flavour","Nostalgic classic","Satisfying crunch"] },
{ id: 34, name: "Doritos Nacho",      image: "/products/doritos.png",       price: "₹50",  quantities: ["50g","100g"],       category:"snacks", subCategory:"chips",    rating: 4.5, reviews: 567, origin: "PepsiCo India", shelf: "6 months", description: "Bold, triangular Doritos with an intense nacho cheese flavour. Perfect for dipping into salsa, guacamole, or munching straight. The ultimate party chip.", highlights: ["Intense nacho cheese","Triangular dip-friendly shape","Bold & crunchy","Party favourite"] },
{ id: 35, name: "Pringles",           image: "/products/pringles.png",      price: "₹120", quantities: ["100g","200g"],      category:"snacks", subCategory:"chips",    rating: 4.6, reviews: 432, origin: "Kellogg's",     shelf: "12 months",description: "Iconic saddle-shaped Pringles in a signature canister — uniformly crispy, perfectly seasoned, and zero-crumble. Once you pop, you really can't stop.", highlights: ["Uniform shape & crunch","Zero crumble packaging","Multiple flavours","Premium imported snack"] },

/* ================= BISCUITS ================= */

{ id: 36, name: "Parle-G",    image: "/products/parleg.png",     price: "₹10",  quantities: ["60g","120g","250g"], category:"snacks", subCategory:"biscuits", rating: 4.8, reviews: 2340,origin: "Parle Products", shelf: "6 months", description: "India's most beloved biscuit since 1939 — Parle-G. Sweet, glucose-rich, and perfectly paired with chai. The biscuit that feeds a nation.", highlights: ["India's #1 biscuit","Glucose & energy-rich","Classic chai companion","Trusted since 1939"] },
{ id: 37, name: "Good Day",   image: "/products/goodday.png",    price: "₹30",  quantities: ["100g","200g"],       category:"snacks", subCategory:"biscuits", rating: 4.5, reviews: 678, origin: "Britannia",      shelf: "6 months", description: "Buttery, cashew-studded Good Day biscuits with a rich, crumbly texture and heavenly aroma. The biscuit that makes every day a little better.", highlights: ["Real cashew pieces","Rich buttery flavour","Crumbly golden texture","Great with milk"] },
{ id: 38, name: "Marie Gold", image: "/products/marie.png",      price: "₹30",  quantities: ["100g","200g"],       category:"snacks", subCategory:"biscuits", rating: 4.3, reviews: 389, origin: "Britannia",      shelf: "6 months", description: "Light, crisp Marie Gold biscuits — mildly sweet with a delicate texture. Perfect for dunking in tea, as a low-cal snack, or pairing with butter and jam.", highlights: ["Light & crisp","Low calorie","Perfect tea dunker","No artificial colour"] },
{ id: 39, name: "Oreo",       image: "/products/oreo.png",       price: "₹40",  quantities: ["100g","200g"],       category:"snacks", subCategory:"biscuits", rating: 4.7, reviews: 1567,origin: "Mondelez",       shelf: "9 months", description: "The world's favourite cookie — two crispy chocolate wafers with a sweet vanilla cream filling. Twist, lick, dunk. The ritual that never gets old.", highlights: ["Iconic twist-lick-dunk","Premium cocoa wafer","Creamy vanilla filling","Global #1 cookie"] },
{ id: 40, name: "Hide & Seek",image: "/products/hide-seek.png",  price: "₹40",  quantities: ["100g","200g"],       category:"snacks", subCategory:"biscuits", rating: 4.4, reviews: 423, origin: "Parle Products", shelf: "6 months", description: "Parle Hide & Seek — chocolate chip cookies with chunks of real chocolate hidden inside. Indulgent, crunchy, and impossible to eat just one.", highlights: ["Real chocolate chips","Indulgent crunch","Premium cookie","Perfect dessert snack"] },

/* ================= JUICES ================= */

{ id: 41, name: "Real Orange Juice",     image: "/products/real-orange.png",    price: "₹110", quantities: ["1L","2L"],      category:"beverages", subCategory:"juices",      rating: 4.3, reviews: 234, origin: "Dabur India",  shelf: "6 months", description: "Dabur Real orange juice — no artificial flavours, packed with the goodness of fresh oranges. A refreshing breakfast companion loaded with Vitamin C.", highlights: ["No artificial flavour","Vitamin C fortified","100% juice","No added colour"] },
{ id: 42, name: "Real Mango Juice",      image: "/products/real-mango.png",     price: "₹110", quantities: ["1L","2L"],      category:"beverages", subCategory:"juices",      rating: 4.5, reviews: 312, origin: "Dabur India",  shelf: "6 months", description: "Thick, pulpy Real mango juice with the authentic taste of Alphonso mangoes. No added preservatives, just pure mango goodness in every sip.", highlights: ["Alphonso mango pulp","No preservatives","Rich & thick","Family pack available"] },
{ id: 43, name: "Tropicana Apple Juice", image: "/products/tropicana-apple.png",price: "₹120", quantities: ["1L"],          category:"beverages", subCategory:"juices",      rating: 4.4, reviews: 189, origin: "PepsiCo India",shelf: "9 months", description: "Crisp, clear Tropicana apple juice pressed from fresh apples. Refreshing, mildly sweet, and perfect for mixing into mocktails or enjoying straight.", highlights: ["Pressed from fresh apples","Clear & crisp","No added sugar variant","Chilled best"] },
{ id: 44, name: "B Natural Mixed Fruit", image: "/products/bnatural.jpg",       price: "₹120", quantities: ["1L"],          category:"beverages", subCategory:"juices",      rating: 4.2, reviews: 145, origin: "ITC Foods",    shelf: "6 months", description: "A tropical blend of mango, pineapple, guava, and apple — B Natural mixed fruit juice is naturally sweetened with no added colour or artificial flavour.", highlights: ["Multi-fruit blend","No artificial colour","Naturally sweetened","Tropical flavour"] },
{ id: 45, name: "Paper Boat Aamras",     image: "/products/paperboat.png",      price: "₹40",  quantities: ["200ml","500ml"],category:"beverages", subCategory:"juices",      rating: 4.6, reviews: 567, origin: "Hector Beverages", shelf: "9 months", description: "Paper Boat Aamras — thick, sweet mango pulp drink that tastes like summer at grandma's house. Made with real mango pulp, minimal ingredients, and lots of nostalgia.", highlights: ["Real mango pulp","Thick & indulgent","No artificial additives","Nostalgia in a pack"] },

/* ================= SOFT DRINKS ================= */

{ id: 46, name: "Coca Cola",     image: "/products/coke.png",         price: "₹40",  quantities: ["500ml","1L","2L"], category:"beverages", subCategory:"soft-drinks", rating: 4.5, reviews: 1230,origin: "Coca-Cola India", shelf: "9 months", description: "The iconic Coca-Cola — crisp, refreshing, and unmistakably bold. The world's favourite cola with its secret blend of flavours and effervescent fizz. Best served ice cold.", highlights: ["World's #1 cola","Crisp effervescent fizz","Best served chilled","Secret blend of flavours"] },
{ id: 47, name: "Pepsi",         image: "/products/pepsi.png",        price: "₹40",  quantities: ["500ml","1L","2L"], category:"beverages", subCategory:"soft-drinks", rating: 4.4, reviews: 987, origin: "PepsiCo India",  shelf: "9 months", description: "Bold, bolder, Pepsi — the sweeter, smoother rival to Coke with a lighter finish. Perfect for parties, meals, or a mid-day refresher.", highlights: ["Sweeter cola profile","Smooth finish","Party staple","Bold refreshing taste"] },
{ id: 48, name: "Sprite",        image: "/products/sprite.png",       price: "₹40",  quantities: ["500ml","1L","2L"], category:"beverages", subCategory:"soft-drinks", rating: 4.3, reviews: 765, origin: "Coca-Cola India", shelf: "9 months", description: "Clear, crisp Sprite with a clean lemon-lime flavour and no caffeine. The go-to thirst quencher when you want refreshment without the cola darkness.", highlights: ["Caffeine-free","Lemon-lime crisp flavour","Crystal clear","Great for mocktails"] },
{ id: 49, name: "Fanta",         image: "/products/fanta.png",        price: "₹40",  quantities: ["500ml","1L","2L"], category:"beverages", subCategory:"soft-drinks", rating: 4.2, reviews: 543, origin: "Coca-Cola India", shelf: "9 months", description: "Vibrant, fruity Fanta Orange — bubbly and fun with an irresistible orange sweetness. The drink that brings out the playful side in everyone.", highlights: ["Bright orange flavour","Bubbly & fun","No artificial preservatives","Fruity refreshment"] },
{ id: 50, name: "Mountain Dew",  image: "/products/mountain-dew.png", price: "₹40",  quantities: ["500ml","1L","2L"], category:"beverages", subCategory:"soft-drinks", rating: 4.3, reviews: 678, origin: "PepsiCo India",  shelf: "9 months", description: "Neon-green Mountain Dew with an electrifying citrus-lime blast. High energy, bold flavour, and an intense kick that fuels every adventure.", highlights: ["Intense citrus kick","High energy drink","Bold neon flavour","Gamer & adventure favourite"] },

/* ================= RICE ================= */

{ id: 51, name: "Basmati Rice",      image: "/products/basmati.png",    price: "₹200", quantities: ["1kg","5kg","10kg"], category:"grains", subCategory:"rice",  rating: 4.7, reviews: 445, origin: "Punjab / Haryana", shelf: "12 months", description: "Extra-long grain aged Basmati rice with a natural fragrance, fluffy texture, and non-sticky finish. The gold standard for biryanis, pulaos, and festive rice dishes.", highlights: ["Extra-long aged grain","Non-sticky fluffy texture","Natural aroma","GI-tagged Basmati"] },
{ id: 52, name: "Sona Masoori Rice", image: "/products/sona.webp",      price: "₹180", quantities: ["1kg","5kg","10kg"], category:"grains", subCategory:"rice",  rating: 4.5, reviews: 312, origin: "Andhra Pradesh",   shelf: "12 months", description: "Light, low-starch Sona Masoori rice — the everyday rice of South Indian households. Cooks quickly, easy on digestion, and perfect for everyday meals, idli batter, and pongal.", highlights: ["Low starch & lightweight","Quick cooking","Ideal for South Indian cooking","Easy digestion"] },
{ id: 53, name: "Brown Rice",        image: "/products/brown-rice.jpg", price: "₹220", quantities: ["1kg","5kg"],        category:"grains", subCategory:"rice",  rating: 4.3, reviews: 189, origin: "Punjab",           shelf: "6 months",  description: "Unpolished brown rice with the bran layer intact — nutty in flavour, chewy in texture, and packed with fibre, magnesium, and B vitamins. A conscious choice for a healthier diet.", highlights: ["Whole grain unpolished","High fibre & nutrients","Nutty flavour","Diabetic-friendly low GI"] },
{ id: 54, name: "Kolam Rice",        image: "/products/kolam.png",      price: "₹170", quantities: ["1kg","5kg"],        category:"grains", subCategory:"rice",  rating: 4.2, reviews: 134, origin: "Maharashtra",      shelf: "12 months", description: "Short-grain Kolam rice from Maharashtra — soft, slightly sticky, and quick to cook. The preferred daily rice in Maharashtrian kitchens, ideal for varan-bhat and khichdi.", highlights: ["Soft sticky texture","Quick cook variety","Maharashtra favourite","Budget-friendly"] },
{ id: 55, name: "Jasmine Rice",      image: "/products/jasmine.png",    price: "₹250", quantities: ["1kg","5kg"],        category:"grains", subCategory:"rice",  rating: 4.6, reviews: 167, origin: "Thailand (Imported)", shelf: "12 months", description: "Premium Thai Jasmine rice with a delicate floral aroma and slightly sticky texture. Perfect for Asian-style dishes, fried rice, and coconut rice preparations.", highlights: ["Floral jasmine aroma","Imported Thai premium","Slightly sticky texture","Asian cuisine favourite"] },

/* ================= WHEAT ================= */

{ id: 56, name: "Aashirvaad Atta",      image: "/products/aashirvaad.png",    price: "₹160", quantities: ["1kg","5kg","10kg"], category:"grains", subCategory:"wheat", rating: 4.7, reviews: 892, origin: "ITC Foods",      shelf: "3 months", description: "Aashirvaad Select Sharbati atta — made from 100% Sharbati wheat from Sehore MP, known for its natural sweetness and superior gluten. Makes soft, fluffy rotis that stay soft for hours.", highlights: ["100% Sharbati wheat","Soft rotis guaranteed","High gluten content","India's #1 atta brand"] },
{ id: 57, name: "Fortune Chakki Atta",  image: "/products/fortune-atta.png",  price: "₹150", quantities: ["1kg","5kg","10kg"], category:"grains", subCategory:"wheat", rating: 4.5, reviews: 567, origin: "Adani Wilmar",   shelf: "3 months", description: "Fortune chakki fresh atta — stone-ground to retain natural nutrients and fibre. The traditional chakki method preserves wheat germ for softer, more nutritious rotis.", highlights: ["Chakki stone-ground","Nutrient-rich wheat germ","Soft & pliable dough","Traditional milling"] },
{ id: 58, name: "Patanjali Atta",       image: "/products/patanjali-atta.png",price: "₹140", quantities: ["1kg","5kg","10kg"], category:"grains", subCategory:"wheat", rating: 4.3, reviews: 423, origin: "Patanjali Foods", shelf: "3 months", description: "Patanjali organic wheat atta — sourced from natural farms with no synthetic pesticides. High fibre, whole wheat flour for daily use, making healthy rotis the natural way.", highlights: ["Organic farm sourced","No synthetic pesticides","High fibre whole wheat","Affordable & pure"] },
{ id: 59, name: "Organic Wheat Flour",  image: "/products/organic-atta.png",  price: "₹180", quantities: ["1kg","5kg"],        category:"grains", subCategory:"wheat", rating: 4.4, reviews: 234, origin: "Rajasthan",       shelf: "2 months", description: "Certified organic whole wheat flour stone-milled from heirloom wheat varieties. No bleaching, no additives — just pure, nourishing wheat flour for the health-conscious family.", highlights: ["Certified organic","Heirloom wheat varieties","Stone-milled","Zero additives"] },
{ id: 60, name: "Multigrain Atta",      image: "/products/multigrain.png",    price: "₹200", quantities: ["1kg","5kg"],        category:"grains", subCategory:"wheat", rating: 4.6, reviews: 345, origin: "Various",         shelf: "2 months", description: "A power blend of wheat, soy, oats, maize, and chana — Multigrain Atta delivers superior nutrition in every roti. Rich in protein, fibre, and essential micronutrients.", highlights: ["6-grain blend","High protein & fibre","Superior nutrition","Soft golden rotis"] },

/* ================= COOKING OIL ================= */

{
id: 61,
name: "Fortune Sunflower Oil",
image: "/oil.png",
price: "₹180",
quantities: ["1L","2L","5L"],
category: "essentials",
subCategory: "cooking-oil",
rating: 4.6,
reviews: 432,
origin: "Adani Wilmar",
shelf: "12 months",
description: "Fortune sunflower oil is light, healthy, and rich in Vitamin E. Perfect for deep frying, sautéing, and everyday cooking with a neutral taste that enhances food flavours.",
highlights: [
"Rich in Vitamin E",
"Light & healthy",
"Neutral flavour",
"Heart friendly"
]
},

{
id: 62,
name: "Dhara Mustard Oil",
image: "/oil.png",
price: "₹190",
quantities: ["1L","2L","5L"],
category: "essentials",
subCategory: "cooking-oil",
rating: 4.5,
reviews: 321,
origin: "Dhara India",
shelf: "12 months",
description: "Pure Dhara mustard oil with a strong natural aroma and rich flavour. A traditional cooking oil widely used in North and East Indian cuisines.",
highlights: [
"Cold pressed mustard seeds",
"Strong natural aroma",
"Traditional Indian cooking",
"High omega fatty acids"
]
},

/* ================= SUGAR ================= */

{
id: 63,
name: "Tata White Sugar",
image: "/sugar.png",
price: "₹50",
quantities: ["1kg","2kg","5kg"],
category: "essentials",
subCategory: "sugar",
rating: 4.4,
reviews: 289,
origin: "Tata Consumer",
shelf: "24 months",
description: "Premium refined white sugar from Tata. Pure, hygienically packed, and ideal for tea, coffee, desserts, and baking.",
highlights: [
"99.9% pure sugar",
"Hygienically packed",
"Fine crystals",
"Perfect for beverages"
]
},

{
id: 64,
name: "Organic Brown Sugar",
image: "/sugar.png",
price: "₹80",
quantities: ["500g","1kg"],
category: "essentials",
subCategory: "sugar",
rating: 4.5,
reviews: 167,
origin: "Organic Farms",
shelf: "24 months",
description: "Natural brown sugar with rich molasses flavour. Ideal for baking, desserts, and healthier sweetening alternatives.",
highlights: [
"Natural molasses",
"Less processed",
"Rich flavour",
"Perfect for baking"
]
},

/* ================= EGGS ================= */

{
id: 65,
name: "Farm Fresh Eggs",
image: "/eggs.png",
price: "₹90",
quantities: ["6pcs","12pcs","30pcs"],
category: "essentials",
subCategory: "eggs",
rating: 4.7,
reviews: 540,
origin: "Local Poultry Farms",
shelf: "7–10 days",
description: "Fresh farm eggs with rich yellow yolks and high protein content. Perfect for breakfast, baking, and healthy meals.",
highlights: [
"High protein",
"Farm fresh",
"Rich yellow yolk",
"Packed daily"
]
},

{
id: 66,
name: "Brown Eggs",
image: "/eggs.png",
price: "₹110",
quantities: ["6pcs","12pcs","30pcs"],
category: "essentials",
subCategory: "eggs",
rating: 4.6,
reviews: 321,
origin: "Organic Poultry Farms",
shelf: "7–10 days",
description: "Premium brown eggs sourced from free-range hens. Rich in nutrients and flavour, perfect for healthy diets.",
highlights: [
"Free-range hens",
"Rich nutrients",
"Premium quality",
"Protein packed"
]
}
];