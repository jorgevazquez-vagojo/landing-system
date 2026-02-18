import { tpl, nav, hero, features, stats, testimonials, pricing, faq, cta, contactForm, countdown, footer } from './helpers';
import type { TemplateDefinition } from './types';

export const batch4Templates: TemplateDefinition[] = [
  // ---- Legal (5) ----
  tpl('legal-firm', 'Law Firm Landing', 'Trusted legal counsel for decades', 'legal', 'professional-services',
    ['law', 'attorney', 'legal-services'], 'linear-gradient(135deg, #2c3e50, #34495e)', '⚖️',
    [nav('Sterling & Associates', ['Practice Areas', 'Attorneys', 'Results', 'Contact'], 1),
     hero('Justice You Can Count On', 'Award-winning attorneys with 30+ years of combined experience', 'Free Consultation', 2),
     features('Practice Areas', 'Comprehensive legal services', [
       {title:'Personal Injury',description:'Maximum compensation for your case',icon:'shield'},
       {title:'Business Law',description:'Contracts, disputes, and compliance',icon:'briefcase'},
       {title:'Estate Planning',description:'Wills, trusts, and asset protection',icon:'file-text'}], 3),
     stats([{value:'$500M+',label:'Recovered'},{value:'5000+',label:'Cases Won'},{value:'30+',label:'Years Experience'}], 4),
     testimonials('Client Testimonials', [
       {name:'John M.',role:'Personal Injury',quote:'They fought for me when no one else would'},
       {name:'Sarah K.',role:'Business Dispute',quote:'Professional, thorough, and got results'}], 5),
     contactForm('Schedule Your Free Consultation', 'No fees unless we win your case', 6),
     footer('Sterling & Associates', 7)]),

  tpl('legal-immigration', 'Immigration Law', 'Navigate immigration with confidence', 'legal', 'professional-services',
    ['immigration', 'visa', 'citizenship'], 'linear-gradient(135deg, #0984e3, #74b9ff)', '🗽',
    [nav('Pathways Legal', ['Services', 'Process', 'Success Stories', 'Contact'], 1),
     hero('Your American Dream Starts Here', 'Expert immigration attorneys guiding families and businesses', 'Book Consultation', 2),
     features('Our Services', 'Immigration solutions for every situation', [
       {title:'Family Visas',description:'Reunite with your loved ones',icon:'heart'},
       {title:'Work Visas',description:'H-1B, L-1, O-1, and more',icon:'briefcase'},
       {title:'Citizenship',description:'Naturalization and green card applications',icon:'flag'}], 3),
     stats([{value:'10K+',label:'Visas Approved'},{value:'98%',label:'Success Rate'},{value:'15+',label:'Languages'}], 4),
     faq('Immigration FAQ', [
       {question:'How long does a green card take?',answer:'Processing times vary from 6 months to 3 years depending on the category.'},
       {question:'Can you help with deportation cases?',answer:'Yes, we handle removal defense and appeals.'},
       {question:'Do you offer payment plans?',answer:'Yes, we offer flexible payment plans for all services.'}], 5),
     contactForm('Start Your Immigration Journey', 'Free case evaluation', 6),
     footer('Pathways Legal', 7)]),

  tpl('legal-ip', 'Intellectual Property Law', 'Protect your innovations and creations', 'legal', 'professional-services',
    ['ip', 'patent', 'trademark'], 'linear-gradient(135deg, #6c5ce7, #a29bfe)', '💡',
    [nav('IP Shield', ['Patents', 'Trademarks', 'Copyrights', 'Contact'], 1),
     hero('Protect What You Create', 'Full-service intellectual property law for inventors and businesses', 'Protect Your IP', 2),
     features('IP Services', 'Comprehensive protection', [
       {title:'Patents',description:'Utility, design, and provisional patents',icon:'lightbulb'},
       {title:'Trademarks',description:'Registration, monitoring, and enforcement',icon:'shield'},
       {title:'Trade Secrets',description:'NDA drafting and litigation',icon:'lock'}], 3),
     stats([{value:'5000+',label:'Patents Filed'},{value:'8000+',label:'Trademarks'},{value:'99%',label:'Registration Rate'}], 4),
     cta('Protect Your Innovation', 'Free IP assessment for startups', 'Get Free Assessment', 5),
     footer('IP Shield', 6)]),

  tpl('legal-family', 'Family Law Practice', 'Compassionate family legal support', 'legal', 'professional-services',
    ['family', 'divorce', 'custody'], 'linear-gradient(135deg, #e17055, #fdcb6e)', '👨‍👩‍👧',
    [nav('Family First Law', ['Services', 'Approach', 'Resources', 'Contact'], 1),
     hero('Protecting What Matters Most', 'Compassionate family law attorneys focused on positive outcomes', 'Free Consultation', 2),
     features('Family Law Services', 'Sensitive and skilled representation', [
       {title:'Divorce',description:'Mediation and litigation options',icon:'users'},
       {title:'Child Custody',description:'Best interests of your children first',icon:'heart'},
       {title:'Adoption',description:'Guiding families through the adoption process',icon:'home'}], 3),
     testimonials('Client Stories', [
       {name:'Maria L.',role:'Custody Case',quote:'They put my children first every step of the way'},
       {name:'David R.',role:'Adoption',quote:'Made our dream of becoming parents a reality'}], 4),
     contactForm('Confidential Consultation', 'We listen with empathy and act with strength', 5),
     footer('Family First Law', 6)]),

  tpl('legal-corporate', 'Corporate Law Firm', 'Strategic counsel for growing businesses', 'legal', 'professional-services',
    ['corporate', 'business-law', 'M&A'], 'linear-gradient(135deg, #1a5276, #2e86c1)', '🏛️',
    [nav('Apex Corporate Law', ['Services', 'Industries', 'Team', 'Contact'], 1),
     hero('Business Law That Drives Results', 'From startup formation to M&A — strategic legal counsel for every stage', 'Schedule a Call', 2),
     features('Corporate Services', 'Full-spectrum business law', [
       {title:'M&A Advisory',description:'Mergers, acquisitions, and due diligence',icon:'git-merge'},
       {title:'Corporate Governance',description:'Board advisory and compliance',icon:'shield'},
       {title:'Capital Markets',description:'IPO, fundraising, and securities',icon:'trending-up'}], 3),
     stats([{value:'$10B+',label:'Deal Value'},{value:'500+',label:'Companies Served'},{value:'Top 50',label:'Law Firm Ranking'}], 4),
     contactForm('Engage Our Team', 'Confidential consultation for business leaders', 5),
     footer('Apex Corporate Law', 6)]),

  // ---- Media (5) ----
  tpl('media-podcast', 'Podcast Show', 'Your next favorite podcast', 'media', 'creative',
    ['podcast', 'audio', 'show'], 'linear-gradient(135deg, #e74c3c, #c0392b)', '🎙️',
    [nav('The Deep Dive', ['Episodes', 'About', 'Guests', 'Subscribe'], 1),
     hero('Conversations That Matter', 'Weekly deep dives with the worlds most interesting minds', 'Listen Now', 2, 'split'),
     features('Why Listeners Love Us', 'Not your average podcast', [
       {title:'In-Depth',description:'60-minute conversations, no fluff',icon:'clock'},
       {title:'Top Guests',description:'CEOs, scientists, and thought leaders',icon:'star'},
       {title:'Research-Backed',description:'Every episode thoroughly researched',icon:'book-open'}], 3),
     stats([{value:'200+',label:'Episodes'},{value:'5M+',label:'Downloads'},{value:'Top 10',label:'Apple Podcasts'}], 4),
     cta('Never Miss an Episode', 'Subscribe on your favorite platform', 'Subscribe', 5),
     footer('The Deep Dive', 6)]),

  tpl('media-streaming', 'Streaming Platform', 'Entertainment without limits', 'media', 'creative',
    ['streaming', 'video', 'entertainment'], 'linear-gradient(135deg, #0f0c29, #302b63)', '🎬',
    [nav('StreamVault', ['Browse', 'Originals', 'Live TV', 'Plans'], 1),
     hero('Unlimited Entertainment', '10,000+ movies, series, and originals in stunning 4K HDR', 'Start Free Trial', 2),
     features('Why StreamVault', 'The ultimate streaming experience', [
       {title:'4K HDR',description:'Crystal-clear picture quality',icon:'monitor'},
       {title:'Originals',description:'Award-winning exclusive content',icon:'film'},
       {title:'Offline Mode',description:'Download and watch anywhere',icon:'download'}], 3),
     stats([{value:'10K+',label:'Titles'},{value:'4K HDR',label:'Quality'},{value:'6',label:'Simultaneous Streams'}], 4),
     pricing('Plans', 'Choose your experience', [
       {name:'Basic',price:'$8.99/mo',description:'1 screen',features:['Full catalog','HD quality','1 screen'],ctaText:'Start Trial'},
       {name:'Standard',price:'$14.99/mo',description:'Most popular',features:['Full catalog','4K HDR','4 screens','Downloads'],ctaText:'Start Trial',highlighted:true},
       {name:'Premium',price:'$22.99/mo',description:'Family',features:['Full catalog','4K HDR Dolby','6 screens','Downloads','Live TV'],ctaText:'Start Trial'}], 5),
     footer('StreamVault', 6)]),

  tpl('media-magazine', 'Digital Magazine', 'Quality journalism in the digital age', 'media', 'creative',
    ['magazine', 'journalism', 'news'], 'linear-gradient(135deg, #2c3e50, #3498db)', '📰',
    [nav('The Observer', ['Latest', 'Topics', 'Subscribe', 'About'], 1),
     hero('Journalism You Can Trust', 'Award-winning long-form journalism and investigative reporting', 'Read Free Articles', 2),
     features('What We Cover', 'In-depth reporting that matters', [
       {title:'Investigations',description:'Holding power to account',icon:'search'},
       {title:'Culture',description:'Arts, books, film, and music',icon:'palette'},
       {title:'Technology',description:'How tech shapes our world',icon:'cpu'}], 3),
     stats([{value:'50+',label:'Pulitzer Noms'},{value:'10M+',label:'Monthly Readers'},{value:'150+',label:'Years of Journalism'}], 4),
     pricing('Subscription', 'Support quality journalism', [
       {name:'Digital',price:'$9.99/mo',description:'Online access',features:['Unlimited articles','Newsletter','Archive access'],ctaText:'Subscribe'},
       {name:'Print + Digital',price:'$19.99/mo',description:'Complete access',features:['Monthly print edition','Digital access','Subscriber events'],ctaText:'Subscribe',highlighted:true},
       {name:'Student',price:'$4.99/mo',description:'With valid .edu',features:['Full digital access','Student newsletter','Career resources'],ctaText:'Subscribe'}], 5),
     footer('The Observer', 6)]),

  tpl('media-photo', 'Photography Portfolio', 'Capturing moments that last forever', 'media', 'creative',
    ['photography', 'portfolio', 'photographer'], 'linear-gradient(135deg, #636e72, #2d3436)', '📸',
    [nav('Elena Vasquez Photography', ['Portfolio', 'Services', 'About', 'Book'], 1),
     hero('Stories Told Through Light', 'Award-winning photography for weddings, portraits, and brands', 'View Portfolio', 2, 'split'),
     features('Photography Services', 'Capturing your most important moments', [
       {title:'Weddings',description:'Authentic, emotional wedding photography',icon:'heart'},
       {title:'Portraits',description:'Professional headshots and family portraits',icon:'user'},
       {title:'Commercial',description:'Brand photography and product shoots',icon:'camera'}], 3),
     testimonials('Client Love', [
       {name:'Jessica & Tom',role:'Wedding',quote:'She captured moments we did not even know happened'},
       {name:'StartupCo',role:'Brand Shoot',quote:'The images elevated our entire brand identity'}], 4),
     contactForm('Book Your Session', 'Limited dates available — book early', 5),
     footer('Elena Vasquez Photography', 6)]),

  tpl('media-video', 'Video Production', 'Compelling video content that converts', 'media', 'creative',
    ['video', 'production', 'film'], 'linear-gradient(135deg, #e74c3c, #f39c12)', '🎥',
    [nav('FrameForge', ['Work', 'Services', 'Process', 'Contact'], 1),
     hero('Video That Tells Your Story', 'End-to-end video production for brands, ads, and documentaries', 'View Our Work', 2),
     features('Our Services', 'Full production capabilities', [
       {title:'Brand Films',description:'Compelling brand stories that connect',icon:'film'},
       {title:'Commercials',description:'TV and digital ad production',icon:'tv'},
       {title:'Animation',description:'2D, 3D, and motion graphics',icon:'palette'}], 3),
     stats([{value:'500+',label:'Projects'},{value:'50+',label:'Awards'},{value:'100+',label:'Brand Partners'}], 4),
     cta('Lets Create Something Amazing', 'Free creative consultation', 'Start a Project', 5),
     footer('FrameForge', 6)]),

  // ---- B2B (5) ----
  tpl('b2b-consulting', 'Business Consulting', 'Strategic consulting for growth', 'b2b', 'technology',
    ['consulting', 'strategy', 'management'], 'linear-gradient(135deg, #1a5276, #2e86c1)', '💼',
    [nav('NorthStar Consulting', ['Services', 'Industries', 'Case Studies', 'Contact'], 1),
     hero('Strategy That Drives Results', 'Top-tier management consulting for Fortune 500 and high-growth companies', 'Request Proposal', 2),
     features('Our Expertise', 'Where strategy meets execution', [
       {title:'Growth Strategy',description:'Market expansion and revenue optimization',icon:'trending-up'},
       {title:'Digital Transformation',description:'Technology-driven business transformation',icon:'cpu'},
       {title:'Operations',description:'Supply chain and process improvement',icon:'settings'}], 3),
     stats([{value:'200+',label:'Engagements'},{value:'$5B+',label:'Value Created'},{value:'Fortune 500',label:'Clients'}], 4),
     testimonials('Client Results', [
       {name:'Global CPG Company',role:'+40% Revenue',quote:'NorthStar transformed our go-to-market strategy'},
       {name:'Tech Unicorn',role:'IPO Ready',quote:'Their operational expertise was invaluable for our IPO preparation'}], 5),
     contactForm('Start a Conversation', 'Confidential inquiry for business leaders', 6),
     footer('NorthStar Consulting', 7)]),

  tpl('b2b-logistics', 'Logistics & Supply Chain', 'End-to-end supply chain solutions', 'b2b', 'technology',
    ['logistics', 'supply-chain', 'shipping'], 'linear-gradient(135deg, #e67e22, #d35400)', '🚛',
    [nav('FreightFlow', ['Solutions', 'Network', 'Technology', 'Contact'], 1),
     hero('Supply Chain Excellence', 'AI-powered logistics platform connecting shippers with global carriers', 'Get a Quote', 2),
     features('Our Solutions', 'Complete logistics management', [
       {title:'Freight Management',description:'Ocean, air, and ground shipping',icon:'truck'},
       {title:'Warehouse',description:'Fulfillment centers in 20+ countries',icon:'package'},
       {title:'Visibility',description:'Real-time tracking and analytics',icon:'eye'}], 3),
     stats([{value:'50+',label:'Countries'},{value:'$2B+',label:'Freight Managed'},{value:'99.5%',label:'On-Time Rate'}], 4),
     cta('Optimize Your Supply Chain', 'Free logistics assessment', 'Request Assessment', 5),
     footer('FreightFlow', 6)]),

  tpl('b2b-manufacturing', 'Manufacturing Company', 'Precision manufacturing at scale', 'b2b', 'technology',
    ['manufacturing', 'industrial', 'production'], 'linear-gradient(135deg, #636e72, #2d3436)', '🏭',
    [nav('PrecisionWorks', ['Capabilities', 'Industries', 'Quality', 'RFQ'], 1),
     hero('Engineering Excellence, Delivered', 'ISO-certified precision manufacturing for aerospace, medical, and automotive', 'Request Quote', 2),
     features('Our Capabilities', 'Advanced manufacturing solutions', [
       {title:'CNC Machining',description:'5-axis precision to ±0.001"',icon:'settings'},
       {title:'Injection Molding',description:'High-volume plastic production',icon:'box'},
       {title:'Assembly',description:'Clean room and standard assembly',icon:'wrench'}], 3),
     stats([{value:'ISO 9001',label:'Certified'},{value:'50+',label:'Years'},{value:'99.8%',label:'Quality Rate'}], 4),
     contactForm('Request a Quote', 'Upload drawings for fast quoting', 5),
     footer('PrecisionWorks', 6)]),

  tpl('b2b-wholesale', 'Wholesale Distribution', 'Bulk supply for businesses', 'b2b', 'technology',
    ['wholesale', 'distribution', 'bulk'], 'linear-gradient(135deg, #00b894, #00cec9)', '📦',
    [nav('BulkSource', ['Products', 'Industries', 'Pricing', 'Apply'], 1),
     hero('Wholesale Supply, Simplified', 'One platform for all your bulk purchasing needs with competitive pricing', 'Open Account', 2),
     features('Why BulkSource', 'The smarter way to buy wholesale', [
       {title:'Competitive Pricing',description:'Direct from manufacturers',icon:'tag'},
       {title:'Fast Shipping',description:'Next-day delivery available',icon:'truck'},
       {title:'Net Terms',description:'Net-30, Net-60 for qualified buyers',icon:'credit-card'}], 3),
     stats([{value:'100K+',label:'Products'},{value:'10K+',label:'Business Buyers'},{value:'48hr',label:'Avg Delivery'}], 4),
     cta('Open a Wholesale Account', 'Apply in 5 minutes, approved in 24 hours', 'Apply Now', 5),
     footer('BulkSource', 6)]),

  tpl('b2b-hr-services', 'HR Outsourcing', 'Complete HR solutions for your business', 'b2b', 'technology',
    ['hr', 'payroll', 'outsourcing'], 'linear-gradient(135deg, #6c5ce7, #a29bfe)', '👥',
    [nav('PeopleFirst HR', ['Services', 'Solutions', 'Resources', 'Demo'], 1),
     hero('HR That Works For You', 'Payroll, benefits, compliance, and HR management in one platform', 'Get a Demo', 2),
     features('All-in-One HR', 'Everything your team needs', [
       {title:'Payroll',description:'Automated payroll processing in 50 states',icon:'dollar-sign'},
       {title:'Benefits',description:'Health, dental, 401(k), and more',icon:'heart'},
       {title:'Compliance',description:'Stay compliant with federal and state laws',icon:'shield'}], 3),
     stats([{value:'5000+',label:'Companies'},{value:'500K+',label:'Employees Managed'},{value:'99.9%',label:'Payroll Accuracy'}], 4),
     pricing('Plans', 'Scale with your team', [
       {name:'Essential',price:'$6/employee/mo',description:'Core HR',features:['Payroll','Time tracking','Employee portal'],ctaText:'Start'},
       {name:'Professional',price:'$12/employee/mo',description:'Full HR',features:['Everything Essential','Benefits admin','Performance reviews','Compliance'],ctaText:'Start',highlighted:true},
       {name:'Enterprise',price:'Custom',description:'Complex orgs',features:['Everything Professional','Dedicated advisor','Custom integrations','SLA'],ctaText:'Contact'}], 5),
     footer('PeopleFirst HR', 6)]),

  // ---- Local (5) ----
  tpl('local-salon', 'Beauty Salon', 'Look and feel your absolute best', 'local', 'professional-services',
    ['salon', 'beauty', 'hair'], 'linear-gradient(135deg, #fd79a8, #e84393)', '💇',
    [nav('Luxe Salon', ['Services', 'Stylists', 'Gallery', 'Book'], 1),
     hero('Where Style Meets Art', 'Premium hair, nail, and beauty services in a luxurious setting', 'Book Appointment', 2, 'split'),
     features('Our Services', 'Head-to-toe beauty', [
       {title:'Hair',description:'Cuts, color, styling, and treatments',icon:'scissors'},
       {title:'Nails',description:'Manicures, pedicures, and nail art',icon:'palette'},
       {title:'Skin',description:'Facials, peels, and skin care',icon:'sparkles'}], 3),
     testimonials('Client Love', [
       {name:'Rachel K.',role:'Regular Client',quote:'Best salon experience in the city, hands down'},
       {name:'Amanda T.',role:'Bridal Party',quote:'Made our entire bridal party look stunning'}], 4),
     cta('Treat Yourself', 'New clients get 20% off their first visit', 'Book Now', 5),
     footer('Luxe Salon', 6)]),

  tpl('local-gym', 'Local Fitness Center', 'Your neighborhood fitness destination', 'local', 'professional-services',
    ['gym', 'fitness', 'local'], 'linear-gradient(135deg, #e74c3c, #c0392b)', '🏋️',
    [nav('FitZone', ['Facilities', 'Classes', 'Membership', 'Visit'], 1),
     hero('Your Body, Your Goals, Our Support', 'State-of-the-art equipment, expert trainers, and 50+ weekly classes', 'Try for Free', 2),
     features('What We Offer', 'Everything you need to get fit', [
       {title:'Free Weights',description:'Full Olympic lifting platform and dumbbells',icon:'dumbbell'},
       {title:'Cardio Zone',description:'Treadmills, bikes, rowers, and more',icon:'activity'},
       {title:'Group Fitness',description:'50+ classes per week including HIIT and yoga',icon:'users'}], 3),
     stats([{value:'5000+',label:'Members'},{value:'50+',label:'Classes/Week'},{value:'5am-11pm',label:'Open Daily'}], 4),
     pricing('Memberships', 'No long-term contracts', [
       {name:'Basic',price:'$19/mo',description:'Gym only',features:['Equipment access','Locker room','Free parking'],ctaText:'Join'},
       {name:'Plus',price:'$39/mo',description:'Gym + classes',features:['All equipment','All group classes','Guest pass/month'],ctaText:'Join',highlighted:true},
       {name:'Premium',price:'$59/mo',description:'All access',features:['Everything Plus','Personal training session','Sauna','Towel service'],ctaText:'Join'}], 5),
     footer('FitZone', 6)]),

  tpl('local-dental', 'Neighborhood Dentist', 'Family dentistry you can trust', 'local', 'professional-services',
    ['dentist', 'family', 'dental-care'], 'linear-gradient(135deg, #74b9ff, #0984e3)', '😁',
    [nav('Smile Care Dental', ['Services', 'Team', 'Insurance', 'Appointment'], 1),
     hero('Healthy Smiles for the Whole Family', 'Gentle, comprehensive dental care in your neighborhood', 'Book Appointment', 2),
     features('Our Services', 'Complete dental care', [
       {title:'Family Dentistry',description:'Check-ups, cleanings, and preventive care',icon:'shield'},
       {title:'Cosmetic',description:'Whitening, bonding, and veneers',icon:'star'},
       {title:'Emergency',description:'Same-day emergency appointments',icon:'zap'}], 3),
     stats([{value:'10K+',label:'Patients'},{value:'25+',label:'Years Serving'},{value:'5★',label:'Rating'}], 4),
     faq('Patient FAQ', [
       {question:'Do you accept my insurance?',answer:'We accept most major dental plans. Call us to verify your coverage.'},
       {question:'Do you see children?',answer:'Yes! We love seeing patients of all ages, starting from age 1.'},
       {question:'What about dental anxiety?',answer:'We offer sedation options and a gentle approach for anxious patients.'}], 5),
     contactForm('Request an Appointment', 'New patients always welcome', 6),
     footer('Smile Care Dental', 7)]),

  tpl('local-plumber', 'Plumbing Services', 'Reliable plumbing when you need it', 'local', 'professional-services',
    ['plumbing', 'repair', 'home-services'], 'linear-gradient(135deg, #0984e3, #74b9ff)', '🔧',
    [nav('AquaFix Plumbing', ['Services', 'Emergency', 'About', 'Call Now'], 1),
     hero('Plumbing Problems? We Fix It Fast', 'Licensed plumbers available 24/7 for emergency and scheduled service', 'Call Now', 2),
     features('Our Services', 'Full-service plumbing solutions', [
       {title:'Emergency Repair',description:'24/7 emergency plumbing service',icon:'zap'},
       {title:'Installation',description:'Fixtures, water heaters, and piping',icon:'wrench'},
       {title:'Drain Cleaning',description:'Camera inspection and hydro-jetting',icon:'droplets'}], 3),
     stats([{value:'24/7',label:'Emergency Service'},{value:'15K+',label:'Jobs Completed'},{value:'4.9★',label:'Google Rating'}], 4),
     testimonials('Customer Reviews', [
       {name:'Tom H.',role:'Emergency Call',quote:'They came in 30 minutes on a Sunday night. Lifesavers!'},
       {name:'Linda M.',role:'Bathroom Renovation',quote:'Professional, clean, and on budget'}], 5),
     cta('Need a Plumber?', 'Free estimates on all non-emergency work', 'Get Free Estimate', 6),
     footer('AquaFix Plumbing', 7)]),

  tpl('local-realtor', 'Real Estate Agent', 'Your local real estate expert', 'local', 'professional-services',
    ['realtor', 'agent', 'homes'], 'linear-gradient(135deg, #2c3e50, #3498db)', '🏡',
    [nav('Agent Sarah Miller', ['Listings', 'Buyers', 'Sellers', 'Contact'], 1),
     hero('Your Home, My Mission', 'Top-producing agent with deep local expertise and a personal touch', 'Contact Sarah', 2, 'split'),
     features('How I Help', 'Full-service real estate', [
       {title:'Buyers',description:'Find your dream home in the right neighborhood',icon:'search'},
       {title:'Sellers',description:'Sell fast and for top dollar with my strategy',icon:'trending-up'},
       {title:'Investment',description:'Smart investment property guidance',icon:'bar-chart'}], 3),
     stats([{value:'$50M+',label:'Annual Sales'},{value:'150+',label:'Homes Sold'},{value:'99%',label:'Client Satisfaction'}], 4),
     testimonials('What Clients Say', [
       {name:'The Johnsons',role:'First-Time Buyers',quote:'Sarah made buying our first home a joy, not a stress'},
       {name:'Mark P.',role:'Seller',quote:'Sold in 5 days, $20K over asking. Incredible.'}], 5),
     contactForm('Get in Touch', 'Free market analysis for your home', 6),
     footer('Sarah Miller Real Estate', 7)]),

  // ---- Special (8) ----
  tpl('special-product-launch', 'Product Launch', 'Build hype for your next big thing', 'special', 'campaigns',
    ['launch', 'product', 'hype'], 'linear-gradient(135deg, #e74c3c, #f39c12)', '🚀',
    [nav('LaunchPad', ['Product', 'Features', 'Pricing', 'Pre-Order'], 1),
     hero('The Future Is Here', 'Introducing the next generation of innovation — available for pre-order now', 'Pre-Order Now', 2),
     features('What Makes It Special', 'Engineered for perfection', [
       {title:'Revolutionary Design',description:'Thinner, lighter, and more powerful',icon:'zap'},
       {title:'AI-Powered',description:'Smart features that learn and adapt',icon:'brain'},
       {title:'All-Day Battery',description:'20 hours of continuous use',icon:'battery'}], 3),
     stats([{value:'10x',label:'Faster'},{value:'20hr',label:'Battery'},{value:'50%',label:'Lighter'}], 4),
     countdown('Available In', '2026-06-01T00:00:00', 5),
     pricing('Choose Your Edition', 'Limited first-run available', [
       {name:'Standard',price:'$499',description:'The essentials',features:['Core device','1-year warranty','Free shipping'],ctaText:'Pre-Order'},
       {name:'Pro',price:'$799',description:'For power users',features:['Enhanced specs','2-year warranty','Priority shipping','Accessories bundle'],ctaText:'Pre-Order',highlighted:true},
       {name:'Founders',price:'$999',description:'Limited edition',features:['Everything Pro','Serial number','Founders community','Lifetime updates'],ctaText:'Pre-Order'}], 6),
     footer('LaunchPad', 7)]),

  tpl('special-black-friday', 'Black Friday Sale', 'The biggest deals of the year', 'special', 'campaigns',
    ['black-friday', 'sale', 'deals'], 'linear-gradient(135deg, #000000, #434343)', '🏷️',
    [nav('MegaSale', ['Deals', 'Categories', 'Doorbusters', 'Gift Ideas'], 1),
     hero('BLACK FRIDAY MEGA SALE', 'Up to 70% off everything — 48 hours only', 'Shop Deals', 2),
     features('Top Categories', 'Incredible savings across the store', [
       {title:'Electronics',description:'Up to 60% off TVs, laptops, and more',icon:'monitor'},
       {title:'Fashion',description:'50% off all clothing and accessories',icon:'shirt'},
       {title:'Home',description:'70% off furniture and decor',icon:'home'}], 3),
     countdown('Sale Ends In', '2026-11-30T23:59:59', 4),
     stats([{value:'70%',label:'Max Discount'},{value:'1000+',label:'Deals'},{value:'Free',label:'Shipping Over $50'}], 5),
     cta('Do Not Miss Out', 'Deals this good only come once a year', 'Shop All Deals', 6),
     footer('MegaSale', 7)]),

  tpl('special-crowdfunding', 'Crowdfunding Campaign', 'Back the next big innovation', 'special', 'campaigns',
    ['crowdfunding', 'kickstarter', 'backing'], 'linear-gradient(135deg, #00b894, #55efc4)', '🎯',
    [nav('BackThis', ['Project', 'Rewards', 'Updates', 'FAQ'], 1),
     hero('Help Us Build the Future', 'Support our campaign and be among the first to own this groundbreaking product', 'Back This Project', 2),
     features('Why Back Us', 'A product worth believing in', [
       {title:'Innovative Design',description:'Solving a real problem in a new way',icon:'lightbulb'},
       {title:'Proven Team',description:'Experienced engineers and designers',icon:'users'},
       {title:'Transparent',description:'Regular updates and open communication',icon:'eye'}], 3),
     stats([{value:'$250K',label:'Goal'},{value:'2500+',label:'Backers'},{value:'30 Days',label:'Remaining'}], 4),
     pricing('Reward Tiers', 'Choose your reward', [
       {name:'Supporter',price:'$25',description:'Early supporter',features:['Thank you card','Name on supporters page','Updates access'],ctaText:'Back'},
       {name:'Early Bird',price:'$149',description:'Limited 500',features:['1 product unit','30% off retail','Early delivery','Exclusive color'],ctaText:'Back',highlighted:true},
       {name:'Champion',price:'$499',description:'VIP backer',features:['2 product units','40% off retail','Founders edition','Private community'],ctaText:'Back'}], 5),
     faq('Campaign FAQ', [
       {question:'When will it ship?',answer:'Estimated delivery is March 2027 for early bird backers.'},
       {question:'Is my money safe?',answer:'Funds are held in escrow until production milestones are met.'},
       {question:'Can I get a refund?',answer:'Full refund available up to 30 days after the campaign ends.'}], 6),
     footer('BackThis', 7)]),

  tpl('special-coming-soon', 'Coming Soon Page', 'Build anticipation for your launch', 'special', 'campaigns',
    ['coming-soon', 'launch', 'waitlist'], 'linear-gradient(135deg, #2c3e50, #3498db)', '⏳',
    [nav('Project X', ['About', 'Updates'], 1),
     hero('Something Big Is Coming', 'We are building something extraordinary. Be the first to know when we launch.', 'Join Waitlist', 2),
     features('What to Expect', 'A sneak peek at what we are building', [
       {title:'Revolutionary',description:'A completely new approach to the problem',icon:'zap'},
       {title:'Simple',description:'Powerful yet incredibly easy to use',icon:'check-circle'},
       {title:'Affordable',description:'Premium features at a fair price',icon:'tag'}], 3),
     countdown('Launching In', '2026-09-01T00:00:00', 4),
     contactForm('Join the Waitlist', 'Be first in line when we launch', 5),
     footer('Project X', 6)]),

  tpl('special-app-launch', 'Mobile App Launch', 'Download the app everyone is talking about', 'special', 'campaigns',
    ['app', 'mobile', 'download'], 'linear-gradient(135deg, #667eea, #764ba2)', '📱',
    [nav('AppName', ['Features', 'Screenshots', 'Reviews', 'Download'], 1),
     hero('Your Life, Simplified', 'The #1 productivity app with 5M+ downloads and a 4.9-star rating', 'Download Free', 2),
     features('Key Features', 'Why millions love this app', [
       {title:'Smart Reminders',description:'AI-powered reminders that know your schedule',icon:'bell'},
       {title:'Team Sync',description:'Collaborate with your team in real-time',icon:'users'},
       {title:'Offline Mode',description:'Works perfectly without internet',icon:'wifi-off'}], 3),
     stats([{value:'5M+',label:'Downloads'},{value:'4.9★',label:'App Store'},{value:'#1',label:'Productivity'}], 4),
     testimonials('User Reviews', [
       {name:'TechCrunch',role:'Review',quote:'The most elegant productivity app we have seen this year'},
       {name:'App Store',role:'Editor Choice',quote:'Beautifully designed with incredibly powerful features'}], 5),
     cta('Download Now — Its Free', 'Available on iOS and Android', 'Get the App', 6),
     footer('AppName', 7)]),

  tpl('special-webinar-funnel', 'Webinar Sales Funnel', 'Convert viewers into customers', 'special', 'campaigns',
    ['webinar', 'funnel', 'sales'], 'linear-gradient(135deg, #e74c3c, #c0392b)', '📡',
    [nav('MasterClass', ['What You Learn', 'Speaker', 'Register'], 1),
     hero('FREE Masterclass: Scale Your Business to 7 Figures', 'Learn the exact framework used by 500+ successful entrepreneurs', 'Reserve Your Seat', 2),
     features('What You Will Learn', '90 minutes that could change your business', [
       {title:'The Framework',description:'The 3-step system for predictable revenue',icon:'target'},
       {title:'Case Studies',description:'Real results from real businesses',icon:'bar-chart'},
       {title:'Action Plan',description:'Leave with a clear implementation roadmap',icon:'map'}], 3),
     stats([{value:'500+',label:'Success Stories'},{value:'$10M+',label:'Generated'},{value:'Free',label:'To Attend'}], 4),
     countdown('Live Webinar Starts In', '2026-04-15T19:00:00', 5),
     contactForm('Reserve Your Free Seat', 'Limited spots — register now', 6),
     footer('MasterClass', 7)]),

  tpl('special-ebook', 'E-book Download', 'Free guide to boost your knowledge', 'special', 'campaigns',
    ['ebook', 'download', 'lead-magnet'], 'linear-gradient(135deg, #f39c12, #e67e22)', '📕',
    [nav('BookTitle', ['Preview', 'Chapters', 'Author', 'Download'], 1),
     hero('The Ultimate Guide to Digital Marketing in 2026', 'Download your free 100-page guide used by 50K+ marketers worldwide', 'Download Free', 2),
     features('Inside the Guide', '100 pages of actionable insights', [
       {title:'Strategy',description:'Build a complete digital marketing strategy',icon:'map'},
       {title:'Tactics',description:'SEO, paid media, email, and social playbooks',icon:'target'},
       {title:'Templates',description:'20+ ready-to-use templates and checklists',icon:'file-text'}], 3),
     stats([{value:'50K+',label:'Downloads'},{value:'100',label:'Pages'},{value:'20+',label:'Templates'}], 4),
     testimonials('Reader Reviews', [
       {name:'Marketing Director',role:'Fortune 500',quote:'The most comprehensive marketing guide I have read'},
       {name:'Startup Founder',role:'YC Alumni',quote:'This guide helped us 3x our leads in 2 months'}], 5),
     contactForm('Get Your Free Copy', 'Enter your email to download instantly', 6),
     footer('Digital Marketing Guide', 7)]),

  tpl('special-waitlist', 'Waitlist & Early Access', 'Be first in line for something amazing', 'special', 'campaigns',
    ['waitlist', 'early-access', 'beta'], 'linear-gradient(135deg, #0f0c29, #302b63)', '✨',
    [nav('NextGen', ['Vision', 'Early Access', 'Investors'], 1),
     hero('Get Early Access to the Future', 'Join 10,000+ people on the waitlist for the most anticipated launch of 2026', 'Join Waitlist', 2),
     features('Why Join Early', 'Exclusive benefits for early adopters', [
       {title:'Priority Access',description:'Skip the line on launch day',icon:'zap'},
       {title:'Founding Price',description:'Lock in 50% off forever',icon:'tag'},
       {title:'Shape the Product',description:'Direct input on features and roadmap',icon:'message-circle'}], 3),
     stats([{value:'10K+',label:'On Waitlist'},{value:'50%',label:'Off Forever'},{value:'Q3 2026',label:'Launch Date'}], 4),
     countdown('Launch Date', '2026-09-15T00:00:00', 5),
     contactForm('Secure Your Spot', 'No credit card required', 6),
     footer('NextGen', 7)]),
];
