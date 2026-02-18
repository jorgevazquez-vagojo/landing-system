import { tpl, nav, hero, features, stats, testimonials, pricing, faq, cta, contactForm, countdown, footer } from './helpers';
import type { TemplateDefinition } from './types';

export const batch3Templates: TemplateDefinition[] = [
  // ---- Food (6) ----
  tpl('food-restaurant', 'Restaurant Landing', 'Elegant dining experience online', 'food', 'hospitality',
    ['restaurant', 'dining', 'reservations'], 'linear-gradient(135deg, #d35400, #e67e22)', '🍽️',
    [nav('La Maison', ['Menu', 'Reservations', 'Events', 'Contact'], 1),
     hero('A Culinary Journey Awaits', 'Farm-to-table dining in the heart of the city', 'Reserve a Table', 2, 'split'),
     features('Our Experience', 'Every detail matters', [
       {title:'Seasonal Menu',description:'Fresh ingredients from local farms',icon:'leaf'},
       {title:'Wine Cellar',description:'300+ curated wines from around the world',icon:'wine'},
       {title:'Private Dining',description:'Intimate spaces for special occasions',icon:'star'}], 3),
     testimonials('Guest Reviews', [
       {name:'Food & Wine Magazine',role:'Press',quote:'One of the best new restaurants of the year'},
       {name:'Maria G.',role:'Regular Guest',quote:'Every visit feels like a celebration'}], 4),
     contactForm('Make a Reservation', 'Call us or book online', 5),
     footer('La Maison', 6)]),

  tpl('food-delivery', 'Food Delivery Service', 'Delicious meals delivered fast', 'food', 'hospitality',
    ['delivery', 'food-app', 'takeout'], 'linear-gradient(135deg, #ff6348, #ff4757)', '🛵',
    [nav('QuickBite', ['How It Works', 'Restaurants', 'Pricing', 'Download'], 1),
     hero('Craving Something Delicious?', 'Order from 1000+ restaurants and get it delivered in 30 minutes', 'Order Now', 2),
     features('Why QuickBite', 'The fastest food delivery', [
       {title:'30-Min Delivery',description:'Hot food at your door, guaranteed',icon:'zap'},
       {title:'1000+ Restaurants',description:'Every cuisine you can imagine',icon:'utensils'},
       {title:'Real-Time Tracking',description:'Watch your order on the map',icon:'map-pin'}], 3),
     stats([{value:'1M+',label:'Deliveries'},{value:'30 Min',label:'Avg Delivery'},{value:'1000+',label:'Restaurants'}], 4),
     cta('Hungry? Order Now', 'First delivery is free with code WELCOME', 'Download App', 5),
     footer('QuickBite', 6)]),

  tpl('food-cafe', 'Specialty Coffee Shop', 'Craft coffee and cozy vibes', 'food', 'hospitality',
    ['coffee', 'cafe', 'specialty'], 'linear-gradient(135deg, #6f4e37, #8b6914)', '☕',
    [nav('BrewHaus', ['Menu', 'Our Beans', 'Locations', 'Shop'], 1),
     hero('Coffee Worth Waking Up For', 'Single-origin beans roasted fresh daily', 'Find Nearest', 2),
     features('What Makes Us Special', 'Passion in every cup', [
       {title:'Single Origin',description:'Direct-trade beans from 12 countries',icon:'globe'},
       {title:'Fresh Roasted',description:'Roasted in small batches daily',icon:'flame'},
       {title:'Expert Baristas',description:'Trained to craft your perfect cup',icon:'award'}], 3),
     stats([{value:'12',label:'Origins'},{value:'5',label:'Locations'},{value:'4.9★',label:'Rating'}], 4),
     cta('Visit Us or Order Online', 'Subscribe for monthly bean deliveries', 'Shop Beans', 5),
     footer('BrewHaus', 6)]),

  tpl('food-bakery', 'Artisan Bakery', 'Handcrafted baked goods daily', 'food', 'hospitality',
    ['bakery', 'bread', 'pastry'], 'linear-gradient(135deg, #f9ca24, #f0932b)', '🥐',
    [nav('Golden Crust', ['Products', 'Custom Orders', 'Wholesale', 'Visit Us'], 1),
     hero('Baked with Love, Every Day', 'Artisan breads, pastries, and custom cakes made from scratch', 'Order Online', 2),
     features('Our Craft', 'Traditional methods, modern flavors', [
       {title:'Sourdough',description:'48-hour fermented breads',icon:'clock'},
       {title:'Custom Cakes',description:'Designed for your special occasions',icon:'cake'},
       {title:'Catering',description:'Pastry platters for events',icon:'gift'}], 3),
     testimonials('What Customers Say', [
       {name:'Jane D.',role:'Weekly Customer',quote:'The sourdough is the best I have ever tasted'},
       {name:'Corporate Client',role:'Office Catering',quote:'Our team looks forward to Friday pastry deliveries'}], 4),
     contactForm('Place a Custom Order', 'Cakes, platters, and special requests', 5),
     footer('Golden Crust', 6)]),

  tpl('food-catering', 'Catering Service', 'Premium catering for any event', 'food', 'hospitality',
    ['catering', 'events', 'corporate'], 'linear-gradient(135deg, #6c5ce7, #a29bfe)', '🎪',
    [nav('TasteMakers', ['Menus', 'Events', 'Gallery', 'Quote'], 1),
     hero('Unforgettable Events Start with Great Food', 'Full-service catering for weddings, corporate events, and celebrations', 'Get a Quote', 2),
     features('Our Services', 'Complete catering solutions', [
       {title:'Custom Menus',description:'Tailored to your event and preferences',icon:'utensils'},
       {title:'Full Service',description:'Setup, service, and cleanup included',icon:'check-circle'},
       {title:'Dietary Options',description:'Vegan, gluten-free, halal, and more',icon:'heart'}], 3),
     stats([{value:'5000+',label:'Events Catered'},{value:'98%',label:'Client Satisfaction'},{value:'50-5000',label:'Guest Capacity'}], 4),
     contactForm('Request a Quote', 'Tell us about your event', 5),
     footer('TasteMakers', 6)]),

  tpl('food-mealkit', 'Meal Kit Subscription', 'Chef-designed meals at home', 'food', 'hospitality',
    ['meal-kit', 'subscription', 'cooking'], 'linear-gradient(135deg, #00b894, #00cec9)', '📦',
    [nav('FreshBox', ['How It Works', 'Menus', 'Plans', 'Gift Cards'], 1),
     hero('Restaurant Meals, Made by You', 'Pre-portioned ingredients and chef recipes delivered weekly', 'Choose Your Plan', 2),
     features('How FreshBox Works', 'Cooking made easy', [
       {title:'Choose Recipes',description:'Pick from 30+ weekly options',icon:'book-open'},
       {title:'We Deliver',description:'Fresh ingredients at your door',icon:'truck'},
       {title:'Cook & Enjoy',description:'Easy recipes, ready in 30 minutes',icon:'clock'}], 3),
     stats([{value:'30+',label:'Weekly Recipes'},{value:'500K+',label:'Meals Delivered'},{value:'4.8★',label:'Rating'}], 4),
     pricing('Meal Plans', 'Flexible and delicious', [
       {name:'2 Meals',price:'$8.99/serving',description:'For couples',features:['2 recipes/week','2 servings each','Free delivery over $50'],ctaText:'Start'},
       {name:'3 Meals',price:'$7.99/serving',description:'Most popular',features:['3 recipes/week','2-4 servings','Free delivery','Premium recipes'],ctaText:'Start',highlighted:true},
       {name:'5 Meals',price:'$6.99/serving',description:'Best value',features:['5 recipes/week','2-4 servings','Free delivery','All recipes','Priority support'],ctaText:'Start'}], 5),
     footer('FreshBox', 6)]),

  // ---- Travel (6) ----
  tpl('travel-hotel', 'Boutique Hotel', 'Luxury stays in unique settings', 'travel', 'hospitality',
    ['hotel', 'luxury', 'boutique'], 'linear-gradient(135deg, #2c3e50, #4ca1af)', '🏨',
    [nav('Hotel Azura', ['Rooms', 'Dining', 'Spa', 'Book Now'], 1),
     hero('Where Luxury Meets Serenity', 'An intimate boutique experience on the Mediterranean coast', 'Check Availability', 2, 'split'),
     features('The Azura Experience', 'Every moment curated for you', [
       {title:'Oceanfront Suites',description:'Wake up to stunning sea views',icon:'sunrise'},
       {title:'Gourmet Dining',description:'Michelin-starred restaurant on-site',icon:'utensils'},
       {title:'Wellness Spa',description:'Rejuvenating treatments and infinity pool',icon:'heart'}], 3),
     testimonials('Guest Experiences', [
       {name:'Travel + Leisure',role:'Magazine',quote:'One of the top 10 boutique hotels in Europe'},
       {name:'Sophie L.',role:'Honeymooner',quote:'The most magical stay of our lives'}], 4),
     pricing('Room Types', 'Find your perfect room', [
       {name:'Deluxe',price:'From $299/night',description:'Garden view',features:['King bed','Balcony','Breakfast included'],ctaText:'Book'},
       {name:'Suite',price:'From $499/night',description:'Ocean view',features:['Living area','Ocean balcony','Spa credit','Breakfast'],ctaText:'Book',highlighted:true},
       {name:'Penthouse',price:'From $899/night',description:'Panoramic',features:['Full apartment','Private terrace','Butler service','All inclusive'],ctaText:'Book'}], 5),
     footer('Hotel Azura', 6)]),

  tpl('travel-airline', 'Airline Booking', 'Fly smarter, pay less', 'travel', 'hospitality',
    ['airline', 'flights', 'booking'], 'linear-gradient(135deg, #0052cc, #4c9aff)', '✈️',
    [nav('SkyLine Air', ['Flights', 'Destinations', 'Loyalty', 'Manage Booking'], 1),
     hero('Your Journey Starts Here', 'Book flights to 200+ destinations at the best prices', 'Search Flights', 2),
     features('Why Fly SkyLine', 'A better way to travel', [
       {title:'Best Prices',description:'Price match guarantee on all routes',icon:'tag'},
       {title:'Free Cancellation',description:'Change plans with zero fees',icon:'refresh-cw'},
       {title:'Sky Rewards',description:'Earn miles on every flight',icon:'star'}], 3),
     stats([{value:'200+',label:'Destinations'},{value:'15M+',label:'Passengers/Year'},{value:'4.7★',label:'Rating'}], 4),
     faq('Travel FAQ', [
       {question:'Can I change my booking?',answer:'Yes, all bookings can be changed up to 24 hours before departure for free.'},
       {question:'How does Sky Rewards work?',answer:'Earn 1 mile per dollar spent. Redeem for flights, upgrades, and partner perks.'},
       {question:'Is there free WiFi?',answer:'All long-haul flights include complimentary WiFi.'}], 5),
     footer('SkyLine Air', 6)]),

  tpl('travel-tours', 'Tour Operator', 'Curated travel experiences worldwide', 'travel', 'hospitality',
    ['tours', 'travel', 'experiences'], 'linear-gradient(135deg, #e17055, #fdcb6e)', '🗺️',
    [nav('WanderWise', ['Tours', 'Destinations', 'About', 'Book'], 1),
     hero('Explore the World with Expert Guides', 'Small-group tours designed for authentic cultural experiences', 'Browse Tours', 2),
     features('Why WanderWise', 'Travel done differently', [
       {title:'Small Groups',description:'Maximum 12 travelers per group',icon:'users'},
       {title:'Local Guides',description:'Expert local knowledge and connections',icon:'map'},
       {title:'All-Inclusive',description:'Accommodation, meals, and activities included',icon:'check-circle'}], 3),
     stats([{value:'50+',label:'Destinations'},{value:'98%',label:'Satisfaction'},{value:'10K+',label:'Happy Travelers'}], 4),
     testimonials('Traveler Stories', [
       {name:'Michael B.',role:'Japan Tour',quote:'The most well-organized and enriching trip ever'},
       {name:'Emma S.',role:'Peru Adventure',quote:'Experiences we could never have found on our own'}], 5),
     cta('Your Next Adventure Awaits', 'Book now and save 15% on early bookings', 'View All Tours', 6),
     footer('WanderWise', 7)]),

  tpl('travel-cruise', 'Cruise Line', 'Luxury cruises to dream destinations', 'travel', 'hospitality',
    ['cruise', 'ocean', 'luxury-travel'], 'linear-gradient(135deg, #0c2461, #1e3799)', '🚢',
    [nav('OceanVista', ['Cruises', 'Destinations', 'Ships', 'Offers'], 1),
     hero('Set Sail for Adventure', 'All-inclusive luxury cruises to the worlds most beautiful ports', 'View Cruises', 2),
     features('The OceanVista Difference', 'More than a cruise', [
       {title:'World-Class Dining',description:'10 restaurants with celebrity chefs',icon:'utensils'},
       {title:'Entertainment',description:'Broadway shows, live music, and more',icon:'music'},
       {title:'Destinations',description:'300+ ports across 7 continents',icon:'anchor'}], 3),
     stats([{value:'300+',label:'Ports'},{value:'12',label:'Ships'},{value:'5★',label:'Rating'}], 4),
     cta('Early Booking Specials', 'Book 2026 cruises and save up to 40%', 'See Offers', 5),
     footer('OceanVista', 6)]),

  tpl('travel-camping', 'Camping & Adventure', 'Outdoor adventures for everyone', 'travel', 'hospitality',
    ['camping', 'outdoor', 'adventure'], 'linear-gradient(135deg, #2d6a4f, #40916c)', '⛺',
    [nav('WildTrail', ['Adventures', 'Gear', 'Destinations', 'Book'], 1),
     hero('Answer the Call of the Wild', 'Guided camping trips and outdoor adventures in national parks', 'Explore Trips', 2, 'split'),
     features('Adventure Types', 'Find your perfect outdoor experience', [
       {title:'Camping Trips',description:'Guided multi-day backcountry camping',icon:'tent'},
       {title:'Hiking Tours',description:'Scenic trails with expert guides',icon:'mountain'},
       {title:'Water Sports',description:'Kayaking, rafting, and paddleboarding',icon:'waves'}], 3),
     stats([{value:'100+',label:'Trails'},{value:'25',label:'National Parks'},{value:'15K+',label:'Adventures Completed'}], 4),
     pricing('Trip Packages', 'Adventure for every level', [
       {name:'Day Trip',price:'From $79',description:'Single day',features:['Guided hike','Gear rental','Lunch included'],ctaText:'Book'},
       {name:'Weekend',price:'From $249',description:'2-3 days',features:['Camping gear','All meals','Guide','Transport'],ctaText:'Book',highlighted:true},
       {name:'Expedition',price:'From $799',description:'5-7 days',features:['Full expedition','All equipment','Expert guide','Photography'],ctaText:'Book'}], 5),
     footer('WildTrail', 6)]),

  tpl('travel-blog', 'Travel Blog', 'Stories and guides from around the world', 'travel', 'hospitality',
    ['blog', 'travel-writing', 'guides'], 'linear-gradient(135deg, #ff9a9e, #fecfef)', '📝',
    [nav('Nomad Notes', ['Destinations', 'Guides', 'Photography', 'Newsletter'], 1),
     hero('Stories From Every Corner of the Earth', 'Travel guides, photography, and inspiration for your next adventure', 'Start Reading', 2),
     features('What You Will Find', 'Your travel resource', [
       {title:'Destination Guides',description:'In-depth guides for 100+ destinations',icon:'map'},
       {title:'Travel Photography',description:'Stunning galleries from around the world',icon:'camera'},
       {title:'Budget Tips',description:'Travel more for less with insider tips',icon:'dollar-sign'}], 3),
     stats([{value:'500+',label:'Guides'},{value:'80+',label:'Countries'},{value:'2M+',label:'Monthly Readers'}], 4),
     cta('Never Miss a Story', 'Join 100K+ subscribers for weekly travel inspiration', 'Subscribe Free', 5),
     footer('Nomad Notes', 6)]),

  // ---- Events (6) ----
  tpl('events-conference', 'Tech Conference', 'The biggest tech event of the year', 'events', 'social',
    ['conference', 'tech', 'speakers'], 'linear-gradient(135deg, #0f0c29, #302b63)', '🎤',
    [nav('TechSummit 2026', ['Speakers', 'Schedule', 'Tickets', 'Sponsors'], 1),
     hero('The Future of Technology', 'Join 5000+ leaders, builders, and innovators for 3 days of inspiration', 'Get Tickets', 2),
     features('What to Expect', '3 days of tech innovation', [
       {title:'100+ Speakers',description:'Industry leaders and visionaries',icon:'mic'},
       {title:'Workshops',description:'Hands-on sessions with experts',icon:'wrench'},
       {title:'Networking',description:'Connect with 5000+ attendees',icon:'users'}], 3),
     stats([{value:'100+',label:'Speakers'},{value:'5000+',label:'Attendees'},{value:'3 Days',label:'Of Content'}], 4),
     countdown('Event Starts In', '2026-09-15T09:00:00', 5),
     pricing('Tickets', 'Early bird pricing available', [
       {name:'General',price:'$499',description:'Full access',features:['All keynotes','Workshop access','Lunch included','After party'],ctaText:'Buy'},
       {name:'VIP',price:'$999',description:'Premium experience',features:['Front-row seating','Speaker dinner','VIP lounge','Recordings'],ctaText:'Buy',highlighted:true},
       {name:'Team (5+)',price:'$399/each',description:'Group discount',features:['All General perks','Team meetup room','Priority seating'],ctaText:'Contact'}], 6),
     footer('TechSummit', 7)]),

  tpl('events-festival', 'Music Festival', 'Three days of unforgettable music', 'events', 'social',
    ['festival', 'music', 'concert'], 'linear-gradient(135deg, #f12711, #f5af19)', '🎵',
    [nav('SoundWave Fest', ['Lineup', 'Tickets', 'Info', 'Gallery'], 1),
     hero('Feel the Music', '50+ artists across 4 stages over 3 unforgettable days', 'Get Passes', 2),
     features('Festival Experience', 'More than just music', [
       {title:'4 Stages',description:'EDM, Rock, Hip-Hop, and Indie',icon:'music'},
       {title:'Food Village',description:'30+ food vendors and bars',icon:'utensils'},
       {title:'Camping',description:'On-site glamping and tent camping',icon:'tent'}], 3),
     countdown('Gates Open In', '2026-07-20T12:00:00', 4),
     pricing('Passes', 'Lock in your spot', [
       {name:'Day Pass',price:'$89',description:'Single day',features:['All stages','Food village','Re-entry'],ctaText:'Buy'},
       {name:'Weekend',price:'$199',description:'All 3 days',features:['All stages','Camping access','Early entry','Merch discount'],ctaText:'Buy',highlighted:true},
       {name:'VIP Weekend',price:'$399',description:'Premium',features:['VIP areas','Meet & greet','Premium camping','Open bar'],ctaText:'Buy'}], 5),
     footer('SoundWave Fest', 6)]),

  tpl('events-webinar', 'Webinar Platform', 'Host engaging webinars at scale', 'events', 'social',
    ['webinar', 'online-event', 'virtual'], 'linear-gradient(135deg, #667eea, #764ba2)', '📺',
    [nav('WebinarPro', ['Features', 'Use Cases', 'Pricing', 'Try Free'], 1),
     hero('Webinars That Actually Engage', 'Interactive webinar platform with HD video, polls, and analytics', 'Start Free Trial', 2),
     features('Powerful Features', 'Everything for great webinars', [
       {title:'HD Streaming',description:'Crystal clear video up to 10K viewers',icon:'video'},
       {title:'Interactive Tools',description:'Polls, Q&A, and breakout rooms',icon:'message-circle'},
       {title:'Analytics',description:'Engagement metrics and lead scoring',icon:'bar-chart'}], 3),
     stats([{value:'50K+',label:'Webinars Hosted'},{value:'10K',label:'Max Viewers'},{value:'99.9%',label:'Uptime'}], 4),
     pricing('Plans', 'Start hosting today', [
       {name:'Starter',price:'$49/mo',description:'Small events',features:['100 attendees','HD video','Basic analytics'],ctaText:'Start Free'},
       {name:'Pro',price:'$149/mo',description:'Professional',features:['1000 attendees','Breakout rooms','CRM integration','Custom branding'],ctaText:'Start Free',highlighted:true},
       {name:'Enterprise',price:'Custom',description:'Unlimited',features:['10K+ attendees','SSO','API','Dedicated support'],ctaText:'Contact'}], 5),
     footer('WebinarPro', 6)]),

  tpl('events-wedding', 'Wedding Planner', 'Your dream wedding, perfectly planned', 'events', 'social',
    ['wedding', 'planner', 'celebration'], 'linear-gradient(135deg, #ffecd2, #fcb69f)', '💒',
    [nav('Ever After Events', ['Services', 'Portfolio', 'Packages', 'Contact'], 1),
     hero('Your Perfect Day, Our Passion', 'Full-service wedding planning for unforgettable celebrations', 'Start Planning', 2, 'split'),
     features('Our Services', 'Every detail handled beautifully', [
       {title:'Full Planning',description:'From engagement to honeymoon send-off',icon:'calendar'},
       {title:'Venue Selection',description:'Access to 200+ exclusive venues',icon:'map-pin'},
       {title:'Design & Decor',description:'Custom themes and floral design',icon:'palette'}], 3),
     testimonials('Happy Couples', [
       {name:'Jennifer & Mark',role:'Vineyard Wedding',quote:'Everything was beyond our wildest dreams'},
       {name:'Priya & Raj',role:'Destination Wedding',quote:'They made planning from abroad completely stress-free'}], 4),
     pricing('Packages', 'Find your perfect package', [
       {name:'Day-Of',price:'From $2,500',description:'Coordination',features:['Day-of coordination','Vendor management','Timeline creation'],ctaText:'Inquire'},
       {name:'Full Planning',price:'From $8,000',description:'Complete service',features:['12-month planning','Vendor sourcing','Design & decor','Budget management'],ctaText:'Inquire',highlighted:true},
       {name:'Luxury',price:'From $20,000',description:'White glove',features:['Everything included','Destination expertise','Guest concierge','Honeymoon planning'],ctaText:'Inquire'}], 5),
     contactForm('Start Your Wedding Journey', 'Free consultation for couples', 6),
     footer('Ever After Events', 7)]),

  tpl('events-sports', 'Sports Event', 'The ultimate sports experience', 'events', 'social',
    ['sports', 'marathon', 'competition'], 'linear-gradient(135deg, #11998e, #38ef7d)', '🏆',
    [nav('City Marathon 2026', ['Route', 'Registration', 'Training', 'Sponsors'], 1),
     hero('Run the City, Own the Day', 'Join 30,000 runners in the biggest marathon of the year', 'Register Now', 2),
     features('Race Categories', 'A race for every runner', [
       {title:'Full Marathon',description:'42.2 km scenic city route',icon:'flag'},
       {title:'Half Marathon',description:'21.1 km for intermediate runners',icon:'map'},
       {title:'10K Fun Run',description:'Open to all ages and levels',icon:'heart'}], 3),
     countdown('Race Day', '2026-10-11T08:00:00', 4),
     stats([{value:'30K',label:'Runners'},{value:'42.2K',label:'Full Route'},{value:'50+',label:'Countries'}], 5),
     pricing('Registration', 'Secure your spot', [
       {name:'10K',price:'$35',description:'Fun run',features:['Finisher medal','T-shirt','Refreshments'],ctaText:'Register'},
       {name:'Half Marathon',price:'$65',description:'21.1 km',features:['Finisher medal','T-shirt','Pace groups','Training plan'],ctaText:'Register',highlighted:true},
       {name:'Full Marathon',price:'$95',description:'42.2 km',features:['Finisher medal','Premium shirt','Pace groups','Recovery zone','Photo package'],ctaText:'Register'}], 6),
     footer('City Marathon', 7)]),

  tpl('events-meetup', 'Community Meetup', 'Connect with like-minded people', 'events', 'social',
    ['meetup', 'community', 'networking'], 'linear-gradient(135deg, #6c5ce7, #fd79a8)', '🤝',
    [nav('DevConnect', ['Events', 'Communities', 'Speakers', 'Host'], 1),
     hero('Where Builders Connect', 'Monthly tech meetups, workshops, and networking events in your city', 'Find Events', 2),
     features('What We Offer', 'Community-driven events', [
       {title:'Tech Talks',description:'Learn from local experts and leaders',icon:'mic'},
       {title:'Workshops',description:'Hands-on sessions to build skills',icon:'code'},
       {title:'Networking',description:'Meet potential co-founders and collaborators',icon:'users'}], 3),
     stats([{value:'50+',label:'Cities'},{value:'100K+',label:'Members'},{value:'500+',label:'Events/Year'}], 4),
     cta('Host a Meetup', 'We provide the platform, you bring the community', 'Apply to Host', 5),
     footer('DevConnect', 6)]),

  // ---- Nonprofit (5) ----
  tpl('npo-charity', 'Charity Organization', 'Making a difference together', 'nonprofit', 'social',
    ['charity', 'donate', 'cause'], 'linear-gradient(135deg, #e74c3c, #c0392b)', '❤️',
    [nav('HopeFoundation', ['Our Work', 'Impact', 'Get Involved', 'Donate'], 1),
     hero('Every Donation Changes a Life', 'Providing clean water, education, and healthcare to communities in need', 'Donate Now', 2),
     features('Our Programs', 'Where your donation goes', [
       {title:'Clean Water',description:'Wells and filtration for rural communities',icon:'droplets'},
       {title:'Education',description:'Schools and scholarships for children',icon:'book-open'},
       {title:'Healthcare',description:'Mobile clinics and medical supplies',icon:'heart'}], 3),
     stats([{value:'2M+',label:'Lives Impacted'},{value:'50+',label:'Countries'},{value:'92¢',label:'Per Dollar to Programs'}], 4),
     testimonials('Impact Stories', [
       {name:'Village Elder, Kenya',role:'Water Project',quote:'For the first time, our children do not walk miles for water'},
       {name:'Teacher, India',role:'Education Program',quote:'We went from 10 students to 200 in three years'}], 5),
     cta('Join the Movement', 'Your $25 provides clean water for one person for a year', 'Donate Today', 6),
     footer('HopeFoundation', 7)]),

  tpl('npo-environment', 'Environmental Cause', 'Protect our planet for future generations', 'nonprofit', 'social',
    ['environment', 'climate', 'sustainability'], 'linear-gradient(135deg, #2d6a4f, #52b788)', '🌍',
    [nav('GreenEarth', ['Campaigns', 'Impact', 'Volunteer', 'Donate'], 1),
     hero('Defend the Planet We Call Home', 'Fighting climate change through conservation, advocacy, and community action', 'Take Action', 2),
     features('Our Initiatives', 'Tackling climate change head-on', [
       {title:'Reforestation',description:'Planting 1 million trees by 2030',icon:'tree-pine'},
       {title:'Ocean Cleanup',description:'Removing plastic from our oceans',icon:'waves'},
       {title:'Policy Advocacy',description:'Pushing for stronger climate legislation',icon:'megaphone'}], 3),
     stats([{value:'5M+',label:'Trees Planted'},{value:'100 Tons',label:'Plastic Removed'},{value:'30+',label:'Policy Wins'}], 4),
     cta('The Planet Needs You', 'Donate, volunteer, or spread the word', 'Get Involved', 5),
     footer('GreenEarth', 6)]),

  tpl('npo-education', 'Education Foundation', 'Quality education for every child', 'nonprofit', 'social',
    ['education', 'children', 'scholarships'], 'linear-gradient(135deg, #0984e3, #74b9ff)', '📖',
    [nav('BrightFuture', ['Programs', 'Impact', 'Partners', 'Donate'], 1),
     hero('Every Child Deserves to Learn', 'Providing scholarships, supplies, and schools to underserved communities', 'Support a Child', 2),
     features('How We Help', 'Education transforms lives', [
       {title:'Scholarships',description:'Full tuition for 10,000+ students annually',icon:'award'},
       {title:'School Building',description:'50 schools built in rural areas',icon:'home'},
       {title:'Teacher Training',description:'Professional development for 5,000 teachers',icon:'book-open'}], 3),
     stats([{value:'50K+',label:'Students Supported'},{value:'50',label:'Schools Built'},{value:'95%',label:'Graduation Rate'}], 4),
     cta('Sponsor a Student', '$50/month gives a child access to quality education', 'Sponsor Now', 5),
     footer('BrightFuture', 6)]),

  tpl('npo-animals', 'Animal Rescue', 'Saving and protecting animals in need', 'nonprofit', 'social',
    ['animals', 'rescue', 'adoption'], 'linear-gradient(135deg, #fdcb6e, #e17055)', '🐾',
    [nav('PawsHaven', ['Adopt', 'Rescue Stories', 'Volunteer', 'Donate'], 1),
     hero('Give Them a Second Chance', 'Rescuing, rehabilitating, and rehoming animals since 2010', 'Meet Our Animals', 2, 'split'),
     features('What We Do', 'Comprehensive animal welfare', [
       {title:'Rescue',description:'Emergency rescue operations 24/7',icon:'heart'},
       {title:'Rehabilitation',description:'Medical care and behavioral training',icon:'activity'},
       {title:'Adoption',description:'Finding forever homes for every animal',icon:'home'}], 3),
     stats([{value:'25K+',label:'Animals Rescued'},{value:'20K+',label:'Adopted'},{value:'98%',label:'Survival Rate'}], 4),
     cta('They Need Your Help', 'Adopt, foster, volunteer, or donate', 'View Adoptable Pets', 5),
     footer('PawsHaven', 6)]),

  tpl('npo-community', 'Community Project', 'Building stronger communities together', 'nonprofit', 'social',
    ['community', 'local', 'social-impact'], 'linear-gradient(135deg, #a29bfe, #6c5ce7)', '🏘️',
    [nav('CommunityFirst', ['Programs', 'Impact', 'Volunteer', 'Support'], 1),
     hero('Stronger Together', 'Empowering communities through housing, jobs, and education programs', 'Get Involved', 2),
     features('Our Programs', 'Holistic community development', [
       {title:'Affordable Housing',description:'Building homes for families in need',icon:'home'},
       {title:'Job Training',description:'Skills workshops and career placement',icon:'briefcase'},
       {title:'Youth Programs',description:'After-school and mentorship programs',icon:'users'}], 3),
     stats([{value:'500+',label:'Homes Built'},{value:'10K+',label:'Jobs Created'},{value:'50K+',label:'Youth Served'}], 4),
     contactForm('Partner With Us', 'Businesses, volunteers, and donors welcome', 5),
     footer('CommunityFirst', 6)]),

  // ---- Automotive (4) ----
  tpl('auto-dealership', 'Car Dealership', 'Find your perfect vehicle', 'automotive', 'lifestyle',
    ['cars', 'dealership', 'auto'], 'linear-gradient(135deg, #2c3e50, #34495e)', '🚗',
    [nav('AutoPrime', ['Inventory', 'Financing', 'Service', 'Contact'], 1),
     hero('Drive Your Dream Car Today', 'New and certified pre-owned vehicles with unbeatable financing options', 'Browse Inventory', 2),
     features('Why AutoPrime', 'The better car-buying experience', [
       {title:'500+ Vehicles',description:'New, used, and certified pre-owned',icon:'car'},
       {title:'Easy Financing',description:'Rates as low as 2.9% APR',icon:'credit-card'},
       {title:'Trade-In',description:'Top dollar for your current vehicle',icon:'refresh-cw'}], 3),
     stats([{value:'500+',label:'In Stock'},{value:'2.9%',label:'APR From'},{value:'4.9★',label:'Google Rating'}], 4),
     cta('Visit Our Showroom', 'Test drive any vehicle today — no appointment needed', 'Get Directions', 5),
     footer('AutoPrime', 6)]),

  tpl('auto-ev', 'EV Charging Network', 'Power your electric journey', 'automotive', 'lifestyle',
    ['ev', 'charging', 'electric-vehicle'], 'linear-gradient(135deg, #00b894, #00cec9)', '⚡',
    [nav('ChargeNet', ['Stations', 'App', 'Plans', 'Business'], 1),
     hero('Charge Everywhere, Drive Anywhere', 'The largest fast-charging network with 50,000+ stations nationwide', 'Find a Station', 2),
     features('ChargeNet Advantage', 'The smartest way to charge', [
       {title:'Ultra-Fast',description:'Up to 350kW charging speeds',icon:'zap'},
       {title:'50K+ Stations',description:'Coast-to-coast coverage',icon:'map-pin'},
       {title:'Smart App',description:'Real-time availability and route planning',icon:'smartphone'}], 3),
     stats([{value:'50K+',label:'Stations'},{value:'350kW',label:'Max Speed'},{value:'5M+',label:'Charges Completed'}], 4),
     pricing('Charging Plans', 'Save on every charge', [
       {name:'Pay As You Go',price:'$0.35/kWh',description:'No commitment',features:['Any station','App access','Receipt history'],ctaText:'Download App'},
       {name:'Member',price:'$12.99/mo',description:'Regular drivers',features:['$0.25/kWh rate','Priority access','Route planner','Rewards'],ctaText:'Subscribe',highlighted:true},
       {name:'Fleet',price:'Custom',description:'Businesses',features:['Volume pricing','Fleet dashboard','Dedicated support','Invoice billing'],ctaText:'Contact'}], 5),
     footer('ChargeNet', 6)]),

  tpl('auto-rental', 'Car Rental Service', 'Rent the perfect car for any trip', 'automotive', 'lifestyle',
    ['rental', 'car-hire', 'vehicles'], 'linear-gradient(135deg, #e17055, #d63031)', '🔑',
    [nav('DriveEasy', ['Cars', 'Locations', 'Deals', 'Business'], 1),
     hero('Your Ride, Your Way', 'From economy to luxury — rent by the day, week, or month', 'Book Now', 2),
     features('Why DriveEasy', 'Hassle-free car rental', [
       {title:'No Hidden Fees',description:'The price you see is the price you pay',icon:'check-circle'},
       {title:'Free Cancellation',description:'Cancel up to 24 hours before pickup',icon:'x-circle'},
       {title:'500+ Locations',description:'Pick up and drop off anywhere',icon:'map-pin'}], 3),
     stats([{value:'50K+',label:'Vehicles'},{value:'500+',label:'Locations'},{value:'4.8★',label:'Rating'}], 4),
     faq('Rental FAQ', [
       {question:'What do I need to rent?',answer:'A valid drivers license, credit card, and proof of insurance.'},
       {question:'Can I add additional drivers?',answer:'Yes, additional drivers can be added for $10/day.'},
       {question:'Is there a mileage limit?',answer:'Most rentals include unlimited mileage.'}], 5),
     footer('DriveEasy', 6)]),

  tpl('auto-motorcycle', 'Motorcycle Brand', 'Born to ride, built to last', 'automotive', 'lifestyle',
    ['motorcycle', 'bikes', 'riding'], 'linear-gradient(135deg, #2d3436, #636e72)', '🏍️',
    [nav('ThunderRide', ['Models', 'Experience', 'Dealers', 'Community'], 1),
     hero('Unleash the Road', 'Handcrafted motorcycles engineered for performance and soul', 'Explore Models', 2, 'split'),
     features('The ThunderRide Experience', 'Ride like no other', [
       {title:'Performance',description:'Twin-cam engines up to 120 HP',icon:'zap'},
       {title:'Craftsmanship',description:'Hand-finished with premium materials',icon:'wrench'},
       {title:'Heritage',description:'50 years of riding excellence',icon:'award'}], 3),
     stats([{value:'50+',label:'Years Heritage'},{value:'12',label:'Models'},{value:'1M+',label:'Riders Worldwide'}], 4),
     cta('Book a Test Ride', 'Experience the thunder at your nearest dealer', 'Find a Dealer', 5),
     footer('ThunderRide', 6)]),
];
