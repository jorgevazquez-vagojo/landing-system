import { tpl, nav, hero, features, stats, testimonials, pricing, faq, cta, contactForm, footer } from './helpers';
import type { TemplateDefinition } from './types';

export const batch2Templates: TemplateDefinition[] = [
  // ---- Real Estate (4) ----
  tpl('real-luxury-homes', 'Luxury Real Estate', 'Premium properties for discerning buyers', 'real-estate', 'hospitality',
    ['luxury', 'homes', 'real-estate'], 'linear-gradient(135deg, #b8860b, #daa520)', '🏡',
    [nav('LuxuryHomes', ['Properties', 'Services', 'About', 'Contact'], 1),
     hero('Find Your Dream Home', 'Exclusive luxury properties in prime locations worldwide', 'View Properties', 2, 'split'),
     features('Why Choose Us', 'White-glove real estate service', [
       {title:'Curated Portfolio',description:'Hand-selected luxury properties',icon:'home'},
       {title:'Private Viewings',description:'Exclusive tours at your convenience',icon:'key'},
       {title:'Concierge Service',description:'End-to-end buying assistance',icon:'star'}], 3),
     stats([{value:'500+',label:'Properties'},{value:'$2B+',label:'Sales Volume'},{value:'98%',label:'Client Satisfaction'}], 4),
     testimonials('Client Stories', [
       {name:'Victoria Chen',role:'Homeowner',quote:'Found our perfect penthouse in just two weeks'},
       {name:'Robert Hughes',role:'Investor',quote:'Exceptional portfolio of investment properties'}], 5),
     contactForm('Schedule a Private Viewing', 'Our team will arrange everything', 6),
     footer('LuxuryHomes', 7)]),

  tpl('real-commercial', 'Commercial Property', 'Premium commercial real estate solutions', 'real-estate', 'hospitality',
    ['commercial', 'office', 'retail'], 'linear-gradient(135deg, #2c3e50, #34495e)', '🏢',
    [nav('CommercialPro', ['Listings', 'Services', 'Market Reports', 'Contact'], 1),
     hero('Commercial Spaces That Drive Growth', 'Office, retail, and industrial properties for your business', 'Browse Listings', 2),
     features('Full-Service Commercial Real Estate', 'Expert guidance for every transaction', [
       {title:'Market Analysis',description:'Data-driven property valuations',icon:'bar-chart'},
       {title:'Lease Negotiation',description:'Favorable terms for tenants and landlords',icon:'file-text'},
       {title:'Property Management',description:'Hassle-free property operations',icon:'settings'}], 3),
     stats([{value:'1200+',label:'Listings'},{value:'50M sqft',label:'Managed'},{value:'15+',label:'Markets'}], 4),
     cta('Ready to Find Your Next Space?', 'Our commercial experts are standing by', 'Get Started', 5),
     footer('CommercialPro', 6)]),

  tpl('real-vacation-rental', 'Vacation Rental', 'Beautiful vacation homes for memorable stays', 'real-estate', 'hospitality',
    ['vacation', 'rental', 'airbnb'], 'linear-gradient(135deg, #00b4d8, #0077b6)', '🌴',
    [nav('StayVilla', ['Destinations', 'Properties', 'Experiences', 'Book Now'], 1),
     hero('Your Perfect Getaway Awaits', 'Handpicked vacation homes in stunning destinations', 'Explore Stays', 2, 'split'),
     features('Why Book With Us', 'Premium vacation experience', [
       {title:'Verified Properties',description:'Every home personally inspected',icon:'check-circle'},
       {title:'Instant Booking',description:'Confirm your stay in seconds',icon:'zap'},
       {title:'24/7 Guest Support',description:'Assistance whenever you need it',icon:'headphones'}], 3),
     testimonials('Guest Reviews', [
       {name:'Sarah M.',role:'Family Traveler',quote:'The villa exceeded all our expectations'},
       {name:'James K.',role:'Couple',quote:'Romantic beachfront stay we will never forget'}], 4),
     pricing('Stay Options', 'Something for every budget', [
       {name:'Cozy Retreat',price:'From $99/night',description:'Studios and apartments',features:['1-2 guests','Kitchen','WiFi'],ctaText:'Browse'},
       {name:'Family Villa',price:'From $249/night',description:'Houses and villas',features:['4-8 guests','Pool','Full kitchen','Garden'],ctaText:'Browse',highlighted:true},
       {name:'Luxury Estate',price:'From $599/night',description:'Premium properties',features:['8+ guests','Private pool','Chef available','Concierge'],ctaText:'Browse'}], 5),
     footer('StayVilla', 6)]),

  tpl('real-agency', 'Real Estate Agency', 'Full-service real estate brokerage', 'real-estate', 'hospitality',
    ['agency', 'broker', 'buy-sell'], 'linear-gradient(135deg, #1a5276, #2e86c1)', '🏠',
    [nav('HomeFirst', ['Buy', 'Sell', 'Rent', 'Agents', 'Contact'], 1),
     hero('Your Trusted Real Estate Partner', 'Buying, selling, or renting — we make it simple', 'Find an Agent', 2),
     features('Our Services', 'Comprehensive real estate solutions', [
       {title:'Buying',description:'Find your next home with expert guidance',icon:'search'},
       {title:'Selling',description:'Get top dollar with our marketing strategy',icon:'trending-up'},
       {title:'Renting',description:'Quality rentals in great neighborhoods',icon:'home'}], 3),
     stats([{value:'2500+',label:'Homes Sold'},{value:'45',label:'Expert Agents'},{value:'20+',label:'Years Experience'}], 4),
     contactForm('Get a Free Home Valuation', 'Know what your property is worth', 5),
     footer('HomeFirst', 6)]),

  // ---- Health (8) ----
  tpl('health-telehealth', 'Telehealth Platform', 'Virtual healthcare from anywhere', 'health', 'lifestyle',
    ['telehealth', 'doctor', 'virtual-care'], 'linear-gradient(135deg, #00b894, #00cec9)', '🩺',
    [nav('TeleCare', ['Services', 'How It Works', 'Pricing', 'Download'], 1),
     hero('See a Doctor in Minutes', 'Board-certified physicians available 24/7 from your phone', 'Book Appointment', 2),
     features('Healthcare Made Simple', 'Quality care without the waiting room', [
       {title:'Video Consultations',description:'Face-to-face with certified doctors',icon:'video'},
       {title:'E-Prescriptions',description:'Sent directly to your pharmacy',icon:'file-text'},
       {title:'Health Records',description:'All your data in one secure place',icon:'shield'}], 3),
     stats([{value:'1M+',label:'Consultations'},{value:'500+',label:'Doctors'},{value:'4.9★',label:'Rating'}], 4),
     pricing('Simple Plans', 'Healthcare should be affordable', [
       {name:'Pay Per Visit',price:'$49',description:'No commitment',features:['Single consultation','E-prescription','Chat follow-up'],ctaText:'Book Now'},
       {name:'Monthly',price:'$29/mo',description:'Unlimited access',features:['Unlimited visits','Family plan','Priority booking','Lab orders'],ctaText:'Subscribe',highlighted:true},
       {name:'Enterprise',price:'Custom',description:'For organizations',features:['Employee wellness','Analytics dashboard','API access'],ctaText:'Contact'}], 5),
     footer('TeleCare', 6)]),

  tpl('health-gym', 'Fitness Gym', 'Transform your body and mind', 'health', 'lifestyle',
    ['gym', 'fitness', 'workout'], 'linear-gradient(135deg, #e74c3c, #c0392b)', '💪',
    [nav('IronFit', ['Programs', 'Trainers', 'Membership', 'Schedule'], 1),
     hero('Unleash Your Potential', 'State-of-the-art equipment and expert trainers', 'Start Free Trial', 2, 'split'),
     features('Why IronFit', 'More than just a gym', [
       {title:'Personal Training',description:'Certified trainers guide your journey',icon:'user'},
       {title:'Group Classes',description:'Yoga, HIIT, spinning, and more',icon:'users'},
       {title:'Nutrition Plans',description:'Customized meal plans for your goals',icon:'heart'}], 3),
     stats([{value:'10K+',label:'Members'},{value:'50+',label:'Classes/Week'},{value:'24/7',label:'Access'}], 4),
     pricing('Membership Plans', 'Invest in yourself', [
       {name:'Basic',price:'$29/mo',description:'Gym access',features:['Equipment access','Locker room','Free WiFi'],ctaText:'Join'},
       {name:'Premium',price:'$59/mo',description:'Full access',features:['All classes','Personal trainer session','Sauna','App tracking'],ctaText:'Join',highlighted:true},
       {name:'VIP',price:'$99/mo',description:'Elite experience',features:['Everything in Premium','Unlimited PT','Nutrition coaching','Guest passes'],ctaText:'Join'}], 5),
     footer('IronFit', 6)]),

  tpl('health-yoga', 'Yoga & Wellness Studio', 'Find balance and inner peace', 'health', 'lifestyle',
    ['yoga', 'meditation', 'wellness'], 'linear-gradient(135deg, #a29bfe, #6c5ce7)', '🧘',
    [nav('ZenFlow', ['Classes', 'Workshops', 'Teachers', 'Pricing'], 1),
     hero('Find Your Inner Balance', 'Yoga, meditation, and mindfulness in a serene space', 'Book a Class', 2),
     features('Our Practice', 'Holistic wellness for everybody', [
       {title:'Yoga Classes',description:'Hatha, Vinyasa, Yin, and Restorative',icon:'sun'},
       {title:'Meditation',description:'Guided sessions for all levels',icon:'heart'},
       {title:'Workshops',description:'Deep-dive retreats and intensives',icon:'book-open'}], 3),
     testimonials('Student Stories', [
       {name:'Lisa Park',role:'Member 3 years',quote:'ZenFlow transformed my relationship with my body'},
       {name:'David Chen',role:'Beginner',quote:'The teachers make everyone feel welcome'}], 4),
     pricing('Class Packages', 'Start your journey', [
       {name:'Drop-In',price:'$20',description:'Single class',features:['Any class','Mat rental included'],ctaText:'Book'},
       {name:'Monthly',price:'$120/mo',description:'Unlimited',features:['Unlimited classes','Workshops 20% off','Guest pass'],ctaText:'Subscribe',highlighted:true},
       {name:'Annual',price:'$99/mo',description:'Best value',features:['Unlimited classes','Free workshops','Retreat discount'],ctaText:'Subscribe'}], 5),
     footer('ZenFlow', 6)]),

  tpl('health-dental', 'Dental Clinic', 'Modern dentistry with a gentle touch', 'health', 'lifestyle',
    ['dental', 'dentist', 'teeth'], 'linear-gradient(135deg, #74b9ff, #0984e3)', '🦷',
    [nav('BrightSmile', ['Services', 'Technology', 'Team', 'Book'], 1),
     hero('Your Best Smile Starts Here', 'Comprehensive dental care using cutting-edge technology', 'Book Appointment', 2),
     features('Our Services', 'Complete dental solutions', [
       {title:'General Dentistry',description:'Cleanings, fillings, and preventive care',icon:'shield'},
       {title:'Cosmetic',description:'Whitening, veneers, and smile makeovers',icon:'star'},
       {title:'Orthodontics',description:'Invisalign and modern braces',icon:'smile'}], 3),
     stats([{value:'15K+',label:'Happy Patients'},{value:'20+',label:'Years Experience'},{value:'5★',label:'Google Rating'}], 4),
     faq('Common Questions', [
       {question:'Do you accept insurance?',answer:'We accept most major dental insurance plans.'},
       {question:'How often should I visit?',answer:'We recommend checkups every 6 months.'},
       {question:'Is teeth whitening safe?',answer:'Yes, our professional whitening treatments are completely safe.'}], 5),
     contactForm('Book Your Visit', 'Same-day appointments available', 6),
     footer('BrightSmile', 7)]),

  tpl('health-nutrition', 'Nutrition Coaching', 'Personalized nutrition for your goals', 'health', 'lifestyle',
    ['nutrition', 'diet', 'coaching'], 'linear-gradient(135deg, #55efc4, #00b894)', '🥗',
    [nav('NutriPlan', ['Programs', 'How It Works', 'Success Stories', 'Start'], 1),
     hero('Eat Better, Feel Amazing', 'Science-based nutrition plans tailored to your lifestyle', 'Get Your Plan', 2),
     features('How It Works', 'Simple steps to better nutrition', [
       {title:'Assessment',description:'Comprehensive health and diet analysis',icon:'clipboard'},
       {title:'Custom Plan',description:'Personalized meals and macros',icon:'target'},
       {title:'Ongoing Support',description:'Weekly check-ins with your coach',icon:'message-circle'}], 3),
     stats([{value:'25K+',label:'Plans Created'},{value:'92%',label:'Goal Achievement'},{value:'4.8★',label:'Rating'}], 4),
     testimonials('Transformations', [
       {name:'Mike T.',role:'Lost 30 lbs',quote:'The meal plans fit perfectly into my busy schedule'},
       {name:'Anna R.',role:'Athlete',quote:'My performance improved dramatically with proper nutrition'}], 5),
     cta('Start Your Transformation', 'First consultation is free', 'Book Free Call', 6),
     footer('NutriPlan', 7)]),

  tpl('health-mental', 'Mental Health App', 'Your mental wellness companion', 'health', 'lifestyle',
    ['mental-health', 'therapy', 'mindfulness'], 'linear-gradient(135deg, #fd79a8, #e84393)', '🧠',
    [nav('MindWell', ['Features', 'Therapists', 'Resources', 'Download'], 1),
     hero('Your Mental Health Matters', 'Connect with licensed therapists from the comfort of home', 'Start Therapy', 2),
     features('Support When You Need It', 'Professional help made accessible', [
       {title:'Video Therapy',description:'Sessions with licensed professionals',icon:'video'},
       {title:'Mood Tracking',description:'Monitor your emotional wellbeing',icon:'activity'},
       {title:'Self-Help Tools',description:'CBT exercises and guided journals',icon:'book'}], 3),
     stats([{value:'100K+',label:'Sessions'},{value:'500+',label:'Therapists'},{value:'Confidential',label:'Always'}], 4),
     pricing('Therapy Plans', 'Invest in your wellbeing', [
       {name:'Self-Guided',price:'$15/mo',description:'Tools and resources',features:['Mood tracker','Guided exercises','Community'],ctaText:'Start'},
       {name:'Therapy',price:'$65/week',description:'Professional support',features:['Weekly sessions','Messaging','All self-help tools'],ctaText:'Begin',highlighted:true},
       {name:'Intensive',price:'$120/week',description:'Comprehensive care',features:['2 sessions/week','Priority scheduling','Psychiatry referral'],ctaText:'Begin'}], 5),
     footer('MindWell', 6)]),

  tpl('health-pharmacy', 'Online Pharmacy', 'Medications delivered to your door', 'health', 'lifestyle',
    ['pharmacy', 'medication', 'delivery'], 'linear-gradient(135deg, #00cec9, #0984e3)', '💊',
    [nav('MedExpress', ['How It Works', 'Medications', 'Pricing', 'FAQ'], 1),
     hero('Pharmacy at Your Fingertips', 'Prescription medications delivered fast and affordably', 'Transfer Prescription', 2),
     features('Why MedExpress', 'Better pharmacy experience', [
       {title:'Free Delivery',description:'Medications shipped to your door',icon:'truck'},
       {title:'Auto-Refills',description:'Never miss a dose',icon:'refresh-cw'},
       {title:'Pharmacist Chat',description:'Expert advice anytime',icon:'message-circle'}], 3),
     stats([{value:'50%',label:'Avg Savings'},{value:'2-Day',label:'Delivery'},{value:'1M+',label:'Prescriptions'}], 4),
     faq('Common Questions', [
       {question:'How do I transfer my prescription?',answer:'Simply provide your current pharmacy details and we handle the rest.'},
       {question:'Is it safe to order online?',answer:'We are a fully licensed pharmacy with rigorous quality controls.'},
       {question:'What about insurance?',answer:'We accept most insurance plans and offer competitive cash prices.'}], 5),
     cta('Switch to MedExpress', 'First order ships free', 'Get Started', 6),
     footer('MedExpress', 7)]),

  tpl('health-devices', 'Medical Devices', 'Innovative health technology solutions', 'health', 'lifestyle',
    ['medtech', 'devices', 'healthcare-tech'], 'linear-gradient(135deg, #636e72, #2d3436)', '⚕️',
    [nav('MedTech', ['Products', 'Research', 'Partners', 'Contact'], 1),
     hero('Technology That Saves Lives', 'FDA-approved medical devices for hospitals and clinics', 'View Products', 2),
     features('Our Solutions', 'Advancing patient care', [
       {title:'Diagnostics',description:'AI-powered imaging and lab devices',icon:'search'},
       {title:'Monitoring',description:'Real-time patient monitoring systems',icon:'activity'},
       {title:'Surgical',description:'Precision instruments and robotics',icon:'crosshair'}], 3),
     stats([{value:'200+',label:'Hospitals'},{value:'50+',label:'Countries'},{value:'15',label:'FDA Clearances'}], 4),
     contactForm('Request a Demo', 'See our devices in action', 5),
     footer('MedTech', 6)]),

  // ---- Education (8) ----
  tpl('edu-courses', 'Online Course Platform', 'Learn anything from world-class instructors', 'education', 'lifestyle',
    ['courses', 'elearning', 'online-education'], 'linear-gradient(135deg, #6c5ce7, #a29bfe)', '📚',
    [nav('LearnHub', ['Courses', 'Instructors', 'Pricing', 'Enterprise'], 1),
     hero('Learn Without Limits', 'Thousands of courses taught by industry experts', 'Browse Courses', 2),
     features('Why LearnHub', 'The best online learning experience', [
       {title:'Expert Instructors',description:'Learn from industry professionals',icon:'award'},
       {title:'Hands-On Projects',description:'Build real-world portfolio pieces',icon:'code'},
       {title:'Certificates',description:'Earn recognized credentials',icon:'award'}], 3),
     stats([{value:'10K+',label:'Courses'},{value:'5M+',label:'Students'},{value:'95%',label:'Completion Rate'}], 4),
     pricing('Learning Plans', 'Invest in your future', [
       {name:'Free',price:'$0',description:'Get started',features:['5 free courses','Community access','Basic certificate'],ctaText:'Start Free'},
       {name:'Pro',price:'$29/mo',description:'Full access',features:['All courses','Projects','Pro certificates','Mentorship'],ctaText:'Go Pro',highlighted:true},
       {name:'Team',price:'$20/user/mo',description:'For organizations',features:['Everything in Pro','Admin dashboard','Custom paths','SSO'],ctaText:'Contact'}], 5),
     footer('LearnHub', 6)]),

  tpl('edu-bootcamp', 'Coding Bootcamp', 'Launch your tech career in 12 weeks', 'education', 'lifestyle',
    ['coding', 'bootcamp', 'programming'], 'linear-gradient(135deg, #2d3436, #636e72)', '💻',
    [nav('CodeCamp', ['Programs', 'Outcomes', 'Financing', 'Apply'], 1),
     hero('Become a Developer in 12 Weeks', 'Intensive coding bootcamp with job placement guarantee', 'Apply Now', 2),
     features('Our Programs', 'Career-focused curriculum', [
       {title:'Full-Stack Web',description:'React, Node.js, databases, and deployment',icon:'code'},
       {title:'Data Science',description:'Python, ML, AI, and analytics',icon:'bar-chart'},
       {title:'UX/UI Design',description:'Research, Figma, prototyping, and testing',icon:'pen-tool'}], 3),
     stats([{value:'93%',label:'Job Placement'},{value:'$85K',label:'Avg Salary'},{value:'5000+',label:'Graduates'}], 4),
     testimonials('Graduate Stories', [
       {name:'Alex Rivera',role:'Now at Google',quote:'CodeCamp gave me the skills and confidence to switch careers'},
       {name:'Priya Shah',role:'Startup Founder',quote:'The best investment I ever made in myself'}], 5),
     cta('Your New Career Starts Here', 'Next cohort begins soon — limited spots', 'Apply Now', 6),
     footer('CodeCamp', 7)]),

  tpl('edu-language', 'Language School', 'Master a new language naturally', 'education', 'lifestyle',
    ['language', 'learning', 'languages'], 'linear-gradient(135deg, #fdcb6e, #e17055)', '🌍',
    [nav('LinguaFlow', ['Languages', 'Method', 'Teachers', 'Pricing'], 1),
     hero('Speak a New Language with Confidence', 'Live classes with native speakers in small groups', 'Start Learning', 2),
     features('Our Method', 'How we make fluency achievable', [
       {title:'Live Classes',description:'Small groups with native speakers',icon:'users'},
       {title:'AI Practice',description:'Conversation practice anytime',icon:'message-circle'},
       {title:'Cultural Context',description:'Learn language through culture',icon:'globe'}], 3),
     stats([{value:'30+',label:'Languages'},{value:'200K+',label:'Students'},{value:'4.9★',label:'Rating'}], 4),
     pricing('Study Plans', 'Flexible and affordable', [
       {name:'Casual',price:'$15/mo',description:'Self-paced',features:['AI practice','Flashcards','Progress tracking'],ctaText:'Start'},
       {name:'Committed',price:'$49/mo',description:'With live classes',features:['4 live classes/mo','AI practice','Certificate'],ctaText:'Enroll',highlighted:true},
       {name:'Intensive',price:'$149/mo',description:'Fast results',features:['Daily classes','Private tutor','Immersion exercises'],ctaText:'Enroll'}], 5),
     footer('LinguaFlow', 6)]),

  tpl('edu-university', 'University Landing', 'Shape your future at a top university', 'education', 'lifestyle',
    ['university', 'higher-education', 'campus'], 'linear-gradient(135deg, #0c2461, #1e3799)', '🎓',
    [nav('Meridian University', ['Programs', 'Admissions', 'Campus Life', 'Apply'], 1),
     hero('Where Great Minds Come Together', 'World-class education preparing leaders for tomorrow', 'Apply Now', 2, 'split'),
     features('Academic Excellence', 'Programs designed for impact', [
       {title:'100+ Programs',description:'Undergraduate and graduate degrees',icon:'book-open'},
       {title:'Research Centers',description:'Cutting-edge research opportunities',icon:'flask-conical'},
       {title:'Global Network',description:'Alumni in 120+ countries',icon:'globe'}], 3),
     stats([{value:'Top 50',label:'World Ranking'},{value:'25K',label:'Students'},{value:'96%',label:'Employment Rate'}], 4),
     testimonials('Alumni Voices', [
       {name:'Dr. Elena Vasquez',role:'Researcher, MIT',quote:'Meridian gave me the foundation for my career in science'},
       {name:'James Okonkwo',role:'CEO, TechStartup',quote:'The entrepreneurship program changed my trajectory'}], 5),
     cta('Begin Your Journey', 'Applications open for Fall 2026', 'Start Application', 6),
     footer('Meridian University', 7)]),

  tpl('edu-tutoring', 'Tutoring Service', 'One-on-one academic excellence', 'education', 'lifestyle',
    ['tutoring', 'academic', 'homework'], 'linear-gradient(135deg, #00b894, #00cec9)', '📖',
    [nav('TutorMatch', ['Subjects', 'Tutors', 'How It Works', 'Start'], 1),
     hero('Expert Tutors, Better Grades', 'Personalized one-on-one tutoring for all subjects and levels', 'Find a Tutor', 2),
     features('How TutorMatch Works', 'Simple and effective', [
       {title:'Match',description:'We pair you with the perfect tutor',icon:'search'},
       {title:'Learn',description:'Live sessions online or in-person',icon:'video'},
       {title:'Improve',description:'Track progress and reach your goals',icon:'trending-up'}], 3),
     stats([{value:'10K+',label:'Tutors'},{value:'2 Grade',label:'Avg Improvement'},{value:'500K+',label:'Sessions'}], 4),
     pricing('Tutoring Plans', 'Quality education is affordable', [
       {name:'Starter',price:'$30/hr',description:'Occasional help',features:['Choose your tutor','Flexible scheduling','Session notes'],ctaText:'Book'},
       {name:'Regular',price:'$25/hr',description:'Weekly sessions',features:['Dedicated tutor','Progress reports','Parent dashboard','Priority booking'],ctaText:'Enroll',highlighted:true},
       {name:'Intensive',price:'$20/hr',description:'3+ sessions/week',features:['Everything in Regular','Study plans','Exam prep','Group discounts'],ctaText:'Enroll'}], 5),
     footer('TutorMatch', 6)]),

  tpl('edu-lms', 'Learning Management System', 'The LMS built for modern teams', 'education', 'lifestyle',
    ['lms', 'training', 'corporate-learning'], 'linear-gradient(135deg, #0984e3, #74b9ff)', '🖥️',
    [nav('SkillForge', ['Features', 'Solutions', 'Pricing', 'Demo'], 1),
     hero('Train Your Team, Track Their Growth', 'Modern LMS for employee onboarding, compliance, and upskilling', 'Request Demo', 2),
     features('Built for Business', 'Everything you need to train at scale', [
       {title:'Course Builder',description:'Drag-and-drop course creation',icon:'layers'},
       {title:'Analytics',description:'Detailed learning analytics and reports',icon:'bar-chart'},
       {title:'Integrations',description:'Connect with Slack, Teams, and HRIS',icon:'link'}], 3),
     stats([{value:'2000+',label:'Companies'},{value:'5M+',label:'Learners'},{value:'99.99%',label:'Uptime'}], 4),
     pricing('Plans', 'Scale your training', [
       {name:'Starter',price:'$3/user/mo',description:'Small teams',features:['50 users','10 courses','Basic analytics'],ctaText:'Start'},
       {name:'Business',price:'$8/user/mo',description:'Growing orgs',features:['500 users','Unlimited courses','Advanced analytics','SSO'],ctaText:'Start',highlighted:true},
       {name:'Enterprise',price:'Custom',description:'Large orgs',features:['Unlimited users','API','Custom branding','Dedicated CSM'],ctaText:'Contact'}], 5),
     footer('SkillForge', 6)]),

  tpl('edu-certification', 'Professional Certification', 'Advance your career with certifications', 'education', 'lifestyle',
    ['certification', 'professional', 'credentials'], 'linear-gradient(135deg, #e17055, #d63031)', '🏅',
    [nav('CertifyPro', ['Certifications', 'Paths', 'Employers', 'Start'], 1),
     hero('Certifications That Employers Trust', 'Industry-recognized credentials to advance your career', 'Explore Certs', 2),
     features('Why CertifyPro', 'Credentials with real value', [
       {title:'Industry-Aligned',description:'Co-developed with leading companies',icon:'briefcase'},
       {title:'Proctored Exams',description:'Verified and tamper-proof testing',icon:'shield'},
       {title:'Digital Badges',description:'Share on LinkedIn and portfolios',icon:'award'}], 3),
     stats([{value:'50+',label:'Certifications'},{value:'300K+',label:'Certified Pros'},{value:'85%',label:'Promotion Rate'}], 4),
     cta('Start Your Certification Journey', 'First practice exam is free', 'Browse Certifications', 5),
     footer('CertifyPro', 6)]),

  tpl('edu-kids', 'Kids Education', 'Fun learning adventures for children', 'education', 'lifestyle',
    ['kids', 'children', 'fun-learning'], 'linear-gradient(135deg, #ffeaa7, #fdcb6e)', '🎨',
    [nav('FunLearn', ['Programs', 'Ages', 'Parents', 'Try Free'], 1),
     hero('Where Kids Love to Learn', 'Interactive educational adventures for ages 3-12', 'Start Free Trial', 2, 'split'),
     features('Learning Made Fun', 'Education through play', [
       {title:'Interactive Games',description:'Learn math, reading, and science through play',icon:'gamepad-2'},
       {title:'Adaptive Learning',description:'Adjusts to each childs level',icon:'brain'},
       {title:'Parent Dashboard',description:'Track progress and set goals',icon:'bar-chart'}], 3),
     stats([{value:'2M+',label:'Kids Learning'},{value:'1000+',label:'Activities'},{value:'4.9★',label:'Parent Rating'}], 4),
     pricing('Family Plans', 'Affordable education', [
       {name:'Free',price:'$0',description:'Get started',features:['5 activities/day','Basic subjects','Progress tracking'],ctaText:'Play Free'},
       {name:'Family',price:'$9.99/mo',description:'Full access',features:['Unlimited activities','All subjects','3 child profiles','Offline mode'],ctaText:'Subscribe',highlighted:true},
       {name:'School',price:'$4/student/mo',description:'Classroom use',features:['Teacher dashboard','Curriculum aligned','Bulk pricing'],ctaText:'Contact'}], 5),
     footer('FunLearn', 6)]),

  // ---- Marketing (8) ----
  tpl('mkt-digital-agency', 'Digital Marketing Agency', 'Results-driven digital marketing', 'marketing', 'professional-services',
    ['agency', 'digital-marketing', 'growth'], 'linear-gradient(135deg, #e74c3c, #c0392b)', '🚀',
    [nav('GrowthLab', ['Services', 'Case Studies', 'Team', 'Contact'], 1),
     hero('We Grow Brands That Matter', 'Data-driven digital marketing that delivers measurable ROI', 'Get Free Audit', 2),
     features('Our Services', 'Full-stack digital marketing', [
       {title:'SEO & Content',description:'Dominate organic search results',icon:'search'},
       {title:'Paid Media',description:'Google Ads, Meta, and programmatic',icon:'target'},
       {title:'Conversion Optimization',description:'Turn visitors into customers',icon:'trending-up'}], 3),
     stats([{value:'300+',label:'Clients'},{value:'10x',label:'Avg ROI'},{value:'$500M+',label:'Revenue Generated'}], 4),
     testimonials('Client Results', [
       {name:'Tech Startup CEO',role:'+340% organic traffic',quote:'GrowthLab 10x-ed our inbound leads in 6 months'},
       {name:'E-commerce Director',role:'+280% ROAS',quote:'Best agency partnership we have ever had'}], 5),
     contactForm('Get Your Free Marketing Audit', 'No obligation, just insights', 6),
     footer('GrowthLab', 7)]),

  tpl('mkt-seo', 'SEO Agency', 'Dominate search engine rankings', 'marketing', 'professional-services',
    ['seo', 'search', 'rankings'], 'linear-gradient(135deg, #27ae60, #2ecc71)', '🔍',
    [nav('RankFirst', ['Services', 'Results', 'Process', 'Contact'], 1),
     hero('Page One or Nothing', 'Enterprise SEO that drives qualified organic traffic', 'Free SEO Audit', 2),
     features('Our SEO Services', 'Comprehensive search optimization', [
       {title:'Technical SEO',description:'Site speed, indexing, and architecture',icon:'settings'},
       {title:'Content Strategy',description:'Keywords, content, and link building',icon:'file-text'},
       {title:'Local SEO',description:'Dominate your local market',icon:'map-pin'}], 3),
     stats([{value:'500+',label:'Keywords Page 1'},{value:'200%',label:'Avg Traffic Growth'},{value:'50+',label:'Industries'}], 4),
     cta('Ready to Rank Higher?', 'Get a comprehensive SEO audit for free', 'Claim Free Audit', 5),
     footer('RankFirst', 6)]),

  tpl('mkt-social', 'Social Media Agency', 'Build your brand on social media', 'marketing', 'professional-services',
    ['social-media', 'content', 'engagement'], 'linear-gradient(135deg, #e1306c, #fd1d1d)', '📱',
    [nav('SocialPulse', ['Services', 'Portfolio', 'Pricing', 'Contact'], 1),
     hero('Social Media That Converts', 'Strategy, content, and community management for top brands', 'Get Proposal', 2),
     features('What We Do', 'End-to-end social media management', [
       {title:'Strategy',description:'Data-driven social media strategy',icon:'target'},
       {title:'Content Creation',description:'Scroll-stopping visuals and copy',icon:'camera'},
       {title:'Community',description:'Engage and grow your audience',icon:'users'}], 3),
     stats([{value:'100M+',label:'Impressions/Mo'},{value:'50+',label:'Brand Partners'},{value:'5x',label:'Engagement Growth'}], 4),
     pricing('Packages', 'Social media done right', [
       {name:'Essentials',price:'$1,500/mo',description:'Core social',features:['2 platforms','12 posts/mo','Monthly report'],ctaText:'Start'},
       {name:'Growth',price:'$3,500/mo',description:'Full management',features:['4 platforms','30 posts/mo','Stories/Reels','Community mgmt'],ctaText:'Start',highlighted:true},
       {name:'Enterprise',price:'Custom',description:'Multi-brand',features:['All platforms','Unlimited content','Influencer collabs','Dedicated team'],ctaText:'Contact'}], 5),
     footer('SocialPulse', 6)]),

  tpl('mkt-branding', 'Branding Studio', 'Brands that people remember', 'marketing', 'professional-services',
    ['branding', 'design', 'identity'], 'linear-gradient(135deg, #2c3e50, #3498db)', '🎯',
    [nav('BrandCraft', ['Services', 'Portfolio', 'Process', 'Contact'], 1),
     hero('Brands Built to Last', 'Strategic branding that connects with your audience and drives growth', 'Start a Project', 2),
     features('Our Services', 'Complete branding solutions', [
       {title:'Brand Strategy',description:'Positioning, messaging, and architecture',icon:'compass'},
       {title:'Visual Identity',description:'Logo, colors, typography, and guidelines',icon:'pen-tool'},
       {title:'Brand Experience',description:'Packaging, web, and environmental design',icon:'layout'}], 3),
     testimonials('Featured Work', [
       {name:'FinTech Startup',role:'Series A to B',quote:'BrandCraft helped us look like a billion-dollar company'},
       {name:'Retail Chain',role:'50 locations',quote:'Our rebrand increased foot traffic by 40%'}], 4),
     cta('Ready to Build Your Brand?', 'Schedule a free brand discovery call', 'Book Discovery Call', 5),
     footer('BrandCraft', 6)]),

  tpl('mkt-pr', 'PR & Communications', 'Strategic public relations that get results', 'marketing', 'professional-services',
    ['pr', 'communications', 'media-relations'], 'linear-gradient(135deg, #8e44ad, #9b59b6)', '📰',
    [nav('PressForward', ['Services', 'Clients', 'Newsroom', 'Contact'], 1),
     hero('Get the Coverage You Deserve', 'Strategic PR that puts your brand in top-tier media', 'Get Started', 2),
     features('PR Services', 'Comprehensive communications', [
       {title:'Media Relations',description:'Placements in top publications',icon:'newspaper'},
       {title:'Crisis Management',description:'Protect your reputation 24/7',icon:'shield'},
       {title:'Thought Leadership',description:'Position executives as industry voices',icon:'mic'}], 3),
     stats([{value:'5000+',label:'Media Placements'},{value:'100+',label:'Clients'},{value:'15B+',label:'Impressions'}], 4),
     contactForm('Lets Talk PR', 'Free 30-minute strategy session', 5),
     footer('PressForward', 6)]),

  tpl('mkt-content', 'Content Marketing', 'Content that drives business growth', 'marketing', 'professional-services',
    ['content', 'blog', 'copywriting'], 'linear-gradient(135deg, #f39c12, #e67e22)', '✏️',
    [nav('ContentPro', ['Services', 'Results', 'Pricing', 'Start'], 1),
     hero('Content That Converts', 'SEO-optimized content strategy that drives traffic and leads', 'Get Content Plan', 2),
     features('Content Services', 'End-to-end content marketing', [
       {title:'Strategy',description:'Keyword research and content planning',icon:'map'},
       {title:'Production',description:'Blog posts, whitepapers, and videos',icon:'pen-tool'},
       {title:'Distribution',description:'Multi-channel content amplification',icon:'share-2'}], 3),
     stats([{value:'10K+',label:'Articles Published'},{value:'300%',label:'Avg Traffic Growth'},{value:'200+',label:'Active Clients'}], 4),
     pricing('Content Plans', 'Scale your content', [
       {name:'Starter',price:'$2,000/mo',description:'4 articles',features:['4 blog posts/mo','Keyword research','Basic analytics'],ctaText:'Start'},
       {name:'Growth',price:'$5,000/mo',description:'Full funnel',features:['10 pieces/mo','Lead magnets','Email sequences','Video scripts'],ctaText:'Start',highlighted:true},
       {name:'Scale',price:'$10,000/mo',description:'Content engine',features:['20+ pieces/mo','Dedicated team','Strategy sessions','Full analytics'],ctaText:'Contact'}], 5),
     footer('ContentPro', 6)]),

  tpl('mkt-influencer', 'Influencer Platform', 'Connect brands with creators', 'marketing', 'professional-services',
    ['influencer', 'creators', 'partnerships'], 'linear-gradient(135deg, #e84393, #fd79a8)', '⭐',
    [nav('CreatorLink', ['For Brands', 'For Creators', 'Platform', 'Sign Up'], 1),
     hero('Where Brands Meet Creators', 'AI-powered influencer marketing platform with 500K+ vetted creators', 'Join Platform', 2),
     features('Platform Features', 'Influencer marketing simplified', [
       {title:'AI Matching',description:'Find the perfect creators for your brand',icon:'brain'},
       {title:'Campaign Management',description:'Brief, approve, and track in one place',icon:'layout'},
       {title:'ROI Analytics',description:'Measure real business impact',icon:'bar-chart'}], 3),
     stats([{value:'500K+',label:'Creators'},{value:'10K+',label:'Campaigns'},{value:'8x',label:'Avg ROI'}], 4),
     cta('Start Your First Campaign', 'Free trial with 3 creator matches', 'Get Started Free', 5),
     footer('CreatorLink', 6)]),

  tpl('mkt-growth', 'Growth Hacking Agency', 'Rapid experimentation for fast growth', 'marketing', 'professional-services',
    ['growth', 'experiments', 'startup'], 'linear-gradient(135deg, #00b894, #55efc4)', '📈',
    [nav('GrowthX', ['Method', 'Case Studies', 'Team', 'Apply'], 1),
     hero('10x Growth in 90 Days', 'Data-driven growth experiments for startups and scale-ups', 'Apply for Growth Sprint', 2),
     features('The GrowthX Method', 'Systematic experimentation', [
       {title:'Audit & Strategy',description:'Identify highest-impact growth levers',icon:'search'},
       {title:'Rapid Experiments',description:'20+ experiments per month',icon:'zap'},
       {title:'Scale Winners',description:'Double down on what works',icon:'trending-up'}], 3),
     stats([{value:'200+',label:'Startups Scaled'},{value:'20+',label:'Experiments/Mo'},{value:'10x',label:'Avg Growth'}], 4),
     testimonials('Founder Testimonials', [
       {name:'YC Founder',role:'Seed → Series B',quote:'GrowthX helped us find product-market fit faster'},
       {name:'SaaS CEO',role:'$0 to $5M ARR',quote:'The experiment velocity is unmatched'}], 5),
     cta('Ready to Grow?', 'Limited spots available per quarter', 'Apply Now', 6),
     footer('GrowthX', 7)]),
];
