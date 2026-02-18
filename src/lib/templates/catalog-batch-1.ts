import { tpl, nav, hero, features, stats, testimonials, pricing, faq, cta, contactForm, logoCloud, footer } from './helpers';
import type { TemplateDefinition } from './types';

export const batch1Templates: TemplateDefinition[] = [
  // ======================================================================
  // SaaS (12)
  // ======================================================================

  // 1. saas-crm
  tpl('saas-crm', 'CRM Platform', 'Powerful CRM for sales teams', 'saas', 'technology',
    ['crm', 'sales', 'pipeline'], 'linear-gradient(135deg, #667eea, #764ba2)', '📊',
    [nav('CRMPro', ['Features', 'Pricing', 'Integrations', 'Contact'], 1),
     hero('Close deals faster', 'AI-powered CRM that automates your pipeline', 'Start Free Trial', 2, 'centered'),
     features('Why CRMPro?', 'Everything your team needs', [
       {title:'Pipeline Management',description:'Visual drag-and-drop pipeline',icon:'layout'},
       {title:'AI Lead Scoring',description:'Prioritize your best leads',icon:'brain'},
       {title:'Email Automation',description:'Sequences that convert',icon:'mail'}], 3),
     stats([{value:'50K+',label:'Teams'},{value:'99.9%',label:'Uptime'},{value:'3x',label:'More Deals'}], 4),
     pricing('Simple Pricing', 'No hidden fees', [
       {name:'Starter',price:'$29/mo',description:'Small teams',features:['5 users','1K contacts','Email'],ctaText:'Start'},
       {name:'Pro',price:'$79/mo',description:'Growing teams',features:['25 users','10K contacts','AI scoring','API'],ctaText:'Try Pro',highlighted:true},
       {name:'Enterprise',price:'Custom',description:'Large orgs',features:['Unlimited','SSO','Dedicated support'],ctaText:'Contact'}], 5),
     footer('CRMPro', 6)]),

  // 2. saas-project
  tpl('saas-project', 'Project Management', 'Plan, track, and deliver projects on time', 'saas', 'technology',
    ['project', 'tasks', 'agile'], 'linear-gradient(135deg, #f093fb, #f5576c)', '📋',
    [nav('Taskflow', ['Features', 'Templates', 'Pricing', 'Blog'], 1),
     hero('Ship projects on time', 'Agile project management loved by 10K+ teams', 'Get Started Free', 2, 'centered'),
     features('Built for modern teams', 'From backlog to done', [
       {title:'Kanban Boards',description:'Visualize work in progress',icon:'columns'},
       {title:'Sprint Planning',description:'Plan sprints with velocity tracking',icon:'calendar'},
       {title:'Time Tracking',description:'Log hours and generate reports',icon:'clock'},
       {title:'Gantt Charts',description:'See project timelines at a glance',icon:'bar-chart-2'}], 3),
     testimonials('Teams love Taskflow', [
       {name:'Sarah Chen',role:'PM at Stripe',quote:'Taskflow replaced 3 tools for us.'},
       {name:'Marco Rivera',role:'CTO at Fintech Co',quote:'Our velocity doubled in 2 sprints.'}], 4),
     pricing('Plans that scale', 'Start free, upgrade anytime', [
       {name:'Free',price:'$0',description:'Individuals',features:['5 projects','Basic boards','1 GB storage'],ctaText:'Start Free'},
       {name:'Team',price:'$12/user/mo',description:'Small teams',features:['Unlimited projects','Gantt','Time tracking'],ctaText:'Try Team',highlighted:true},
       {name:'Business',price:'$24/user/mo',description:'Organizations',features:['Advanced analytics','SSO','Priority support'],ctaText:'Contact Sales'}], 5),
     footer('Taskflow', 6)]),

  // 3. saas-analytics
  tpl('saas-analytics', 'Analytics Dashboard', 'Real-time analytics for data-driven teams', 'saas', 'technology',
    ['analytics', 'dashboard', 'data'], 'linear-gradient(135deg, #4facfe, #00f2fe)', '📈',
    [nav('InsightHub', ['Product', 'Solutions', 'Pricing', 'Docs'], 1),
     hero('Data you can act on', 'Real-time dashboards that tell the whole story', 'Start Analyzing', 2, 'left'),
     logoCloud('Trusted by data teams at', 3),
     features('Powerful analytics', 'From raw data to actionable insights', [
       {title:'Real-time Dashboards',description:'Live data updated every second',icon:'activity'},
       {title:'Custom Reports',description:'Drag-and-drop report builder',icon:'file-text'},
       {title:'SQL Editor',description:'Query your data directly',icon:'code'},
       {title:'Alerts',description:'Get notified on anomalies',icon:'bell'}], 4),
     stats([{value:'2B+',label:'Events/day'},{value:'150ms',label:'Avg Query'},{value:'45K',label:'Dashboards'}], 5),
     pricing('Transparent pricing', 'Based on events tracked', [
       {name:'Startup',price:'$49/mo',description:'Up to 1M events',features:['5 dashboards','7-day retention','Email alerts'],ctaText:'Start'},
       {name:'Growth',price:'$199/mo',description:'Up to 50M events',features:['Unlimited dashboards','1-year retention','SQL access'],ctaText:'Start',highlighted:true},
       {name:'Scale',price:'$799/mo',description:'Unlimited events',features:['Unlimited everything','SLA','Dedicated CSM'],ctaText:'Contact'}], 6),
     footer('InsightHub', 7)]),

  // 4. saas-devtools
  tpl('saas-devtools', 'Developer Tools', 'APIs and SDKs that developers love', 'saas', 'technology',
    ['developer', 'api', 'sdk'], 'linear-gradient(135deg, #0c0c0c, #434343)', '🛠️',
    [nav('DevForge', ['APIs', 'SDKs', 'Docs', 'Pricing'], 1),
     hero('Build faster, ship sooner', 'APIs and tooling designed for developer happiness', 'Read the Docs', 2, 'centered'),
     features('Developer-first platform', 'Everything you need to ship', [
       {title:'REST & GraphQL APIs',description:'Flexible APIs for any use case',icon:'globe'},
       {title:'SDKs in 8 Languages',description:'Native SDKs with full type safety',icon:'package'},
       {title:'Webhooks',description:'Real-time event delivery',icon:'zap'},
       {title:'CLI Tool',description:'Manage everything from your terminal',icon:'terminal'}], 3),
     stats([{value:'99.99%',label:'API Uptime'},{value:'<50ms',label:'Latency'},{value:'12M',label:'API Calls/day'}], 4),
     faq('Common questions', [
       {question:'What languages are supported?',answer:'Python, JS, Go, Ruby, Java, PHP, Rust, and Swift.'},
       {question:'Is there a free tier?',answer:'Yes, 10K requests/month free forever.'},
       {question:'Do you offer on-prem?',answer:'Enterprise plans include private cloud deployment.'}], 5),
     cta('Start building today', 'Free tier with 10K requests/month', 'Get API Key', 6),
     footer('DevForge', 7)]),

  // 5. saas-ai-platform
  tpl('saas-ai-platform', 'AI Platform', 'Deploy ML models at scale with ease', 'saas', 'technology',
    ['ai', 'machine-learning', 'mlops'], 'linear-gradient(135deg, #a18cd1, #fbc2eb)', '🤖',
    [nav('NeuralOps', ['Platform', 'Models', 'Pricing', 'Research'], 1),
     hero('AI infrastructure, simplified', 'Train, deploy, and monitor ML models in minutes', 'Launch Playground', 2, 'centered'),
     features('End-to-end ML platform', 'From experiment to production', [
       {title:'Model Training',description:'GPU clusters on demand',icon:'cpu'},
       {title:'One-click Deploy',description:'Serve models with auto-scaling',icon:'upload-cloud'},
       {title:'Model Registry',description:'Version and track all models',icon:'database'},
       {title:'Monitoring',description:'Detect drift and anomalies',icon:'eye'}], 3),
     stats([{value:'500K+',label:'Models Deployed'},{value:'99.95%',label:'Uptime'},{value:'10x',label:'Faster Training'}], 4),
     testimonials('What ML engineers say', [
       {name:'Dr. Lisa Park',role:'ML Lead at Spotify',quote:'NeuralOps cut our deploy time from hours to minutes.'},
       {name:'James Okoro',role:'Data Scientist at Tesla',quote:'The monitoring caught a drift issue before it hit production.'}], 5),
     pricing('Usage-based pricing', 'Pay only for compute', [
       {name:'Explorer',price:'$0',description:'Experiment free',features:['100 GPU-hours','3 models','Community support'],ctaText:'Start Free'},
       {name:'Pro',price:'$299/mo',description:'Production workloads',features:['5K GPU-hours','Unlimited models','Priority support'],ctaText:'Go Pro',highlighted:true},
       {name:'Enterprise',price:'Custom',description:'Custom SLA',features:['Dedicated GPUs','SSO/SAML','On-prem option'],ctaText:'Talk to Us'}], 6),
     footer('NeuralOps', 7)]),

  // 6. saas-cybersecurity
  tpl('saas-cybersecurity', 'Cybersecurity Solution', 'Enterprise-grade security for your stack', 'saas', 'technology',
    ['security', 'compliance', 'threat-detection'], 'linear-gradient(135deg, #0f2027, #2c5364)', '🛡️',
    [nav('ShieldNet', ['Solutions', 'Compliance', 'Pricing', 'Contact'], 1),
     hero('Zero-trust security, zero hassle', 'Protect your infrastructure from every threat vector', 'Request Demo', 2, 'left'),
     features('Complete protection', 'Security across your entire stack', [
       {title:'Threat Detection',description:'AI-powered real-time monitoring',icon:'shield'},
       {title:'Vulnerability Scanning',description:'Continuous automated scanning',icon:'search'},
       {title:'Compliance',description:'SOC2, HIPAA, GDPR in one click',icon:'check-circle'},
       {title:'Incident Response',description:'Automated playbooks and alerts',icon:'alert-triangle'}], 3),
     stats([{value:'200M+',label:'Threats Blocked'},{value:'<1min',label:'Detection Time'},{value:'99.99%',label:'Accuracy'}], 4),
     logoCloud('Trusted by security teams at', 5),
     cta('Secure your stack today', 'Free security audit for new customers', 'Get Free Audit', 6),
     footer('ShieldNet', 7)]),

  // 7. saas-cloud-storage
  tpl('saas-cloud-storage', 'Cloud Storage', 'Fast, secure cloud storage for teams', 'saas', 'technology',
    ['storage', 'cloud', 'files'], 'linear-gradient(135deg, #11998e, #38ef7d)', '☁️',
    [nav('VaultDrive', ['Features', 'Security', 'Pricing', 'Download'], 1),
     hero('Your files, everywhere', 'Blazing-fast cloud storage with end-to-end encryption', 'Get 10 GB Free', 2, 'centered'),
     features('Store smarter', 'More than just file hosting', [
       {title:'E2E Encryption',description:'Zero-knowledge architecture',icon:'lock'},
       {title:'Smart Sync',description:'Access files without using disk space',icon:'refresh-cw'},
       {title:'Collaboration',description:'Real-time co-editing and comments',icon:'users'},
       {title:'Version History',description:'Restore any version, any time',icon:'git-branch'}], 3),
     stats([{value:'5B+',label:'Files Stored'},{value:'99.999%',label:'Durability'},{value:'200+',label:'Countries'}], 4),
     pricing('Storage plans', 'All plans include encryption', [
       {name:'Personal',price:'$4.99/mo',description:'100 GB',features:['100 GB storage','E2E encryption','Mobile apps'],ctaText:'Start'},
       {name:'Team',price:'$12.99/user/mo',description:'2 TB per user',features:['2 TB/user','Admin console','Smart sync'],ctaText:'Try Team',highlighted:true},
       {name:'Enterprise',price:'Custom',description:'Unlimited',features:['Unlimited storage','SSO','Audit logs','SLA'],ctaText:'Contact'}], 5),
     footer('VaultDrive', 6)]),

  // 8. saas-email-marketing
  tpl('saas-email-marketing', 'Email Marketing Tool', 'Beautiful emails that convert subscribers', 'saas', 'technology',
    ['email', 'marketing', 'automation'], 'linear-gradient(135deg, #ff9a9e, #fecfef)', '✉️',
    [nav('MailCraft', ['Features', 'Templates', 'Pricing', 'Blog'], 1),
     hero('Emails that actually convert', 'Drag-and-drop email builder with smart automation', 'Start for Free', 2, 'centered'),
     features('Grow your audience', 'All the tools you need', [
       {title:'Drag & Drop Builder',description:'Design emails without code',icon:'layout'},
       {title:'Smart Segments',description:'Target the right audience',icon:'filter'},
       {title:'A/B Testing',description:'Optimize every campaign',icon:'git-merge'},
       {title:'Automation Flows',description:'Drip campaigns on autopilot',icon:'repeat'}], 3),
     stats([{value:'98.7%',label:'Delivery Rate'},{value:'42%',label:'Avg Open Rate'},{value:'8B+',label:'Emails Sent'}], 4),
     testimonials('Marketers love MailCraft', [
       {name:'Emily Zhang',role:'CMO at Glossier',quote:'Our open rates jumped 35% after switching.'},
       {name:'David Kowalski',role:'Growth at Loom',quote:'Best email builder on the market, hands down.'}], 5),
     pricing('Simple pricing', 'Based on subscriber count', [
       {name:'Free',price:'$0',description:'Up to 500 subs',features:['500 subscribers','1K emails/mo','Basic templates'],ctaText:'Start Free'},
       {name:'Growth',price:'$29/mo',description:'Up to 10K subs',features:['10K subscribers','Unlimited emails','Automation'],ctaText:'Go Growth',highlighted:true},
       {name:'Pro',price:'$79/mo',description:'Up to 100K subs',features:['100K subscribers','A/B testing','Priority support'],ctaText:'Go Pro'}], 6),
     footer('MailCraft', 7)]),

  // 9. saas-helpdesk
  tpl('saas-helpdesk', 'Customer Support Helpdesk', 'Delight customers with fast support', 'saas', 'technology',
    ['helpdesk', 'support', 'tickets'], 'linear-gradient(135deg, #fbc2eb, #a6c1ee)', '🎧',
    [nav('DeskFlow', ['Features', 'Integrations', 'Pricing', 'Demo'], 1),
     hero('Support that scales', 'AI-powered helpdesk that resolves tickets 3x faster', 'Start Free Trial', 2, 'left'),
     features('Smarter support', 'Less busywork, more happy customers', [
       {title:'Unified Inbox',description:'All channels in one view',icon:'inbox'},
       {title:'AI Auto-replies',description:'Resolve common issues instantly',icon:'message-circle'},
       {title:'Knowledge Base',description:'Self-service portal for customers',icon:'book-open'},
       {title:'SLA Management',description:'Never miss a deadline',icon:'clock'}], 3),
     stats([{value:'70%',label:'Faster Resolution'},{value:'95%',label:'CSAT Score'},{value:'30K+',label:'Teams'}], 4),
     faq('Frequently asked', [
       {question:'Can I import from Zendesk?',answer:'Yes, one-click migration from Zendesk, Freshdesk, and Intercom.'},
       {question:'Do you support live chat?',answer:'Built-in live chat widget with chatbot fallback.'},
       {question:'Is there a mobile app?',answer:'iOS and Android apps with full ticket management.'}], 5),
     cta('Try DeskFlow free for 14 days', 'No credit card required', 'Start Trial', 6),
     footer('DeskFlow', 7)]),

  // 10. saas-hr-platform
  tpl('saas-hr-platform', 'HR Management Platform', 'Modern HR for modern companies', 'saas', 'technology',
    ['hr', 'recruiting', 'people'], 'linear-gradient(135deg, #fa709a, #fee140)', '👥',
    [nav('PeopleOS', ['Features', 'Pricing', 'Resources', 'Login'], 1),
     hero('HR that people actually like', 'Hire, onboard, and grow your team in one platform', 'Book a Demo', 2, 'centered'),
     features('All-in-one HR', 'Simplify every people process', [
       {title:'Applicant Tracking',description:'Manage candidates with ease',icon:'user-plus'},
       {title:'Onboarding',description:'Automated first-day workflows',icon:'clipboard'},
       {title:'Performance Reviews',description:'360-degree feedback cycles',icon:'star'},
       {title:'Payroll',description:'Global payroll in 50+ countries',icon:'dollar-sign'}], 3),
     stats([{value:'15K+',label:'Companies'},{value:'2M+',label:'Employees Managed'},{value:'50+',label:'Countries'}], 4),
     testimonials('HR leaders trust PeopleOS', [
       {name:'Rachel Adams',role:'VP People at Coinbase',quote:'Onboarding went from 2 weeks to 2 days.'},
       {name:'Tom Ikeda',role:'CHRO at Zalando',quote:'Finally, an HR tool our employees enjoy using.'}], 5),
     pricing('Plans for every team', 'Per employee per month', [
       {name:'Core',price:'\$6/emp/mo',description:'Essentials',features:['Directory','Time off','Documents'],ctaText:'Start'},
       {name:'Complete',price:'\$14/emp/mo',description:'Full suite',features:['ATS','Onboarding','Performance','Payroll'],ctaText:'Start',highlighted:true},
       {name:'Enterprise',price:'Custom',description:'Custom needs',features:['API access','Custom integrations','Dedicated CSM'],ctaText:'Contact'}], 6),
     footer('PeopleOS', 7)]),

  // 11. saas-collaboration
  tpl('saas-collaboration', 'Team Collaboration', 'Work together, from anywhere', 'saas', 'technology',
    ['collaboration', 'messaging', 'teamwork'], 'linear-gradient(135deg, #5ee7df, #b490ca)', '💬',
    [nav('TeamSync', ['Features', 'Security', 'Pricing', 'Download'], 1),
     hero('Where teams come together', 'Messaging, video, and docs in one workspace', 'Try Free', 2, 'centered'),
     features('Work your way', 'All communication in one place', [
       {title:'Channels',description:'Organized conversations by topic',icon:'hash'},
       {title:'Video Calls',description:'HD meetings with screen sharing',icon:'video'},
       {title:'Shared Docs',description:'Collaborate on docs in real time',icon:'file-text'},
       {title:'Integrations',description:'Connect 500+ apps you use daily',icon:'plug'}], 3),
     logoCloud('Used by teams at', 4),
     stats([{value:'8M+',label:'Daily Users'},{value:'1B+',label:'Messages/Day'},{value:'99.99%',label:'Uptime'}], 5),
     pricing('Free to start', 'Upgrade as you grow', [
       {name:'Free',price:'\$0',description:'Small teams',features:['10K message history','1:1 video','5 integrations'],ctaText:'Get Free'},
       {name:'Pro',price:'\$7.99/user/mo',description:'Growing teams',features:['Unlimited history','Group video','Unlimited integrations'],ctaText:'Go Pro',highlighted:true},
       {name:'Enterprise',price:'Custom',description:'Large orgs',features:['SSO/SAML','Compliance','99.99% SLA'],ctaText:'Contact'}], 6),
     footer('TeamSync', 7)]),

  // 12. saas-accounting
  tpl('saas-accounting', 'Accounting Software', 'Simple accounting for small businesses', 'saas', 'technology',
    ['accounting', 'invoicing', 'bookkeeping'], 'linear-gradient(135deg, #2af598, #009efd)', '💰',
    [nav('LedgerEase', ['Features', 'Pricing', 'Accountants', 'Login'], 1),
     hero('Accounting made simple', 'Invoicing, expenses, and reports in one place', 'Start Free Trial', 2, 'left'),
     features('Everything you need', 'Run your finances with confidence', [
       {title:'Invoicing',description:'Send professional invoices in seconds',icon:'file-text'},
       {title:'Expense Tracking',description:'Snap receipts with your phone',icon:'camera'},
       {title:'Bank Feeds',description:'Auto-import and categorize transactions',icon:'credit-card'},
       {title:'Tax Reports',description:'One-click tax-ready reports',icon:'file-check'}], 3),
     stats([{value:'500K+',label:'Businesses'},{value:'\$10B+',label:'Invoiced'},{value:'12hrs',label:'Saved/Month'}], 4),
     faq('Common questions', [
       {question:'Can my accountant access it?',answer:'Yes, free accountant access with every plan.'},
       {question:'Does it handle multi-currency?',answer:'Over 150 currencies with auto conversion.'},
       {question:'Is my data secure?',answer:'Bank-grade 256-bit encryption and SOC2 certified.'}], 5),
     cta('Try LedgerEase free for 30 days', 'No credit card needed', 'Start Free', 6),
     footer('LedgerEase', 7)]),

  // ======================================================================
  // E-commerce (10)
  // ======================================================================

  // 13. ecom-fashion
  tpl('ecom-fashion', 'Fashion Store', 'Trendy fashion for every season', 'ecommerce', 'commerce',
    ['fashion', 'clothing', 'style'], 'linear-gradient(135deg, #f5af19, #f12711)', '👗',
    [nav('LUXE', ['New In', 'Women', 'Men', 'Sale'], 1),
     hero('New Season Collection', 'Discover curated styles that define modern elegance', 'Shop Now', 2, 'centered'),
     features('Why shop LUXE?', 'Fashion with purpose', [
       {title:'Curated Collections',description:'Hand-picked by top stylists',icon:'star'},
       {title:'Free Shipping',description:'On all orders over \$50',icon:'truck'},
       {title:'Easy Returns',description:'30-day hassle-free returns',icon:'rotate-ccw'}], 3),
     testimonials('What our customers say', [
       {name:'Mia Johnson',role:'Fashion Blogger',quote:'LUXE is my go-to for everyday chic looks.'},
       {name:'Carlos Mendes',role:'Stylist',quote:'Quality fabrics and impeccable tailoring.'}], 4),
     stats([{value:'100K+',label:'Happy Customers'},{value:'2K+',label:'Styles'},{value:'48hr',label:'Delivery'}], 5),
     cta('Join the LUXE club', 'Get 15% off your first order', 'Sign Up', 6),
     footer('LUXE', 7)]),

  // 14. ecom-electronics
  tpl('ecom-electronics', 'Electronics Store', 'Latest tech at the best prices', 'ecommerce', 'commerce',
    ['electronics', 'gadgets', 'tech'], 'linear-gradient(135deg, #141e30, #243b55)', '🖥️',
    [nav('TechVault', ['Laptops', 'Phones', 'Audio', 'Deals'], 1),
     hero('Tech that empowers you', 'Premium electronics with expert reviews and fast shipping', 'Browse Deals', 2, 'left'),
     features('The TechVault difference', 'Shop with confidence', [
       {title:'Expert Reviews',description:'In-depth testing on every product',icon:'check-square'},
       {title:'Price Match',description:'Found it cheaper? We match it',icon:'tag'},
       {title:'2-Year Warranty',description:'Extended coverage on all items',icon:'shield'},
       {title:'Same-Day Delivery',description:'Order by 2 PM, get it today',icon:'zap'}], 3),
     stats([{value:'50K+',label:'Products'},{value:'4.8/5',label:'Avg Rating'},{value:'1M+',label:'Orders'}], 4),
     testimonials('Customer reviews', [
       {name:'Alex Turner',role:'Tech Enthusiast',quote:'Best selection and prices I have found online.'},
       {name:'Nina Patel',role:'Software Engineer',quote:'Their laptop recommendations were spot-on.'}], 5),
     cta('Sign up for exclusive deals', 'Members get early access to sales', 'Join Free', 6),
     footer('TechVault', 7)]),

  // 15. ecom-organic
  tpl('ecom-organic', 'Organic Food Market', 'Farm-fresh organic delivered to your door', 'ecommerce', 'commerce',
    ['organic', 'food', 'farm-fresh'], 'linear-gradient(135deg, #56ab2f, #a8e063)', '🥬',
    [nav('GreenBasket', ['Shop', 'Boxes', 'Farms', 'About'], 1),
     hero('Fresh from farm to table', '100% certified organic produce delivered weekly', 'Build Your Box', 2, 'centered'),
     features('Why go organic with us?', 'Quality you can taste', [
       {title:'100% Organic',description:'USDA certified, always',icon:'leaf'},
       {title:'Local Farms',description:'Sourced within 100 miles',icon:'map-pin'},
       {title:'Zero Waste',description:'Compostable packaging only',icon:'recycle'}], 3),
     stats([{value:'200+',label:'Local Farms'},{value:'500K+',label:'Boxes Delivered'},{value:'0',label:'Pesticides'}], 4),
     pricing('Weekly boxes', 'Pause or cancel anytime', [
       {name:'Essential',price:'\$35/wk',description:'For individuals',features:['8-10 items','Seasonal fruits','Vegetables'],ctaText:'Subscribe'},
       {name:'Family',price:'\$65/wk',description:'For families',features:['16-20 items','Fruits & vegetables','Dairy & eggs'],ctaText:'Subscribe',highlighted:true},
       {name:'Premium',price:'\$95/wk',description:'The full farm',features:['25+ items','Everything in Family','Meat & fish','Artisan bread'],ctaText:'Subscribe'}], 5),
     cta('Get 20% off your first box', 'Use code FRESH20 at checkout', 'Order Now', 6),
     footer('GreenBasket', 7)]),

  // 16. ecom-jewelry
  tpl('ecom-jewelry', 'Luxury Jewelry', 'Handcrafted fine jewelry and timepieces', 'ecommerce', 'commerce',
    ['jewelry', 'luxury', 'diamonds'], 'linear-gradient(135deg, #b8860b, #ffd700)', '💎',
    [nav('Aurelia', ['Collections', 'Engagement', 'Bespoke', 'Boutiques'], 1),
     hero('Timeless elegance', 'Handcrafted jewelry using ethically sourced gemstones', 'Explore Collection', 2, 'centered'),
     features('The Aurelia promise', 'Craftsmanship meets conscience', [
       {title:'Ethically Sourced',description:'Conflict-free diamonds guaranteed',icon:'heart'},
       {title:'Master Craftsmen',description:'40+ years of jewelry artistry',icon:'award'},
       {title:'Lifetime Warranty',description:'Free repairs and polishing',icon:'shield'}], 3),
     testimonials('Our clients say', [
       {name:'Victoria Lane',role:'Bride',quote:'My engagement ring is absolutely breathtaking.'},
       {name:'Robert Kim',role:'Collector',quote:'Aurelia pieces are true investment art.'}], 4),
     stats([{value:'150+',label:'Years Heritage'},{value:'50K+',label:'Pieces Crafted'},{value:'100%',label:'Ethical'}], 5),
     contactForm('Book a private consultation', 'Visit our atelier for a bespoke experience', 6),
     footer('Aurelia', 7)]),

  // 17. ecom-furniture
  tpl('ecom-furniture', 'Modern Furniture', 'Scandinavian-inspired modern furniture', 'ecommerce', 'commerce',
    ['furniture', 'interior', 'design'], 'linear-gradient(135deg, #c9d6ff, #e2e2e2)', '🪑',
    [nav('NordicNest', ['Living', 'Bedroom', 'Office', 'Sale'], 1),
     hero('Design your space', 'Minimalist furniture crafted from sustainable materials', 'Shop Collection', 2, 'left'),
     features('Built to last', 'Sustainable design philosophy', [
       {title:'Sustainable Materials',description:'FSC-certified wood and recycled steel',icon:'leaf'},
       {title:'Flat-Pack Shipping',description:'Easy assembly, lower carbon footprint',icon:'package'},
       {title:'10-Year Guarantee',description:'Built for a decade of daily use',icon:'check-circle'},
       {title:'AR Preview',description:'See furniture in your room with AR',icon:'smartphone'}], 3),
     stats([{value:'200K+',label:'Homes Furnished'},{value:'95%',label:'Recycled Packaging'},{value:'4.9/5',label:'Rating'}], 4),
     testimonials('Customer stories', [
       {name:'Anna Svensson',role:'Interior Designer',quote:'NordicNest nails the balance of form and function.'},
       {name:'Jake Morrison',role:'Architect',quote:'My clients always ask where I get my furniture.'}], 5),
     cta('Free design consultation', 'Our team helps you plan your space', 'Book Free Consult', 6),
     footer('NordicNest', 7)]),

  // 18. ecom-sports
  tpl('ecom-sports', 'Sports & Outdoor Gear', 'Premium gear for every adventure', 'ecommerce', 'commerce',
    ['sports', 'outdoor', 'gear'], 'linear-gradient(135deg, #e44d26, #f7931e)', '⛰️',
    [nav('TrailPeak', ['Running', 'Hiking', 'Cycling', 'Deals'], 1),
     hero('Gear up for adventure', 'Performance equipment tested on real trails', 'Shop Now', 2, 'centered'),
     features('Built for the wild', 'Gear that goes the distance', [
       {title:'Pro-tested Gear',description:'Tested by professional athletes',icon:'award'},
       {title:'Waterproof Tech',description:'IPX7 rated protection',icon:'droplet'},
       {title:'Lightweight Design',description:'Ultra-light without compromise',icon:'feather'}], 3),
     stats([{value:'300+',label:'Brands'},{value:'50K+',label:'Products'},{value:'4.7/5',label:'Avg Review'}], 4),
     testimonials('Athlete reviews', [
       {name:'Leo Martins',role:'Ultra Runner',quote:'TrailPeak has the best trail shoe selection.'},
       {name:'Sara Olsen',role:'Mountain Guide',quote:'Reliable gear I trust on every expedition.'}], 5),
     cta('Join TrailPeak Rewards', 'Earn points on every purchase', 'Join Free', 6),
     footer('TrailPeak', 7)]),

  // 19. ecom-beauty
  tpl('ecom-beauty', 'Beauty & Skincare', 'Clean beauty for radiant, healthy skin', 'ecommerce', 'commerce',
    ['beauty', 'skincare', 'cosmetics'], 'linear-gradient(135deg, #ffecd2, #fcb69f)', '✨',
    [nav('GlowLab', ['Skincare', 'Makeup', 'Haircare', 'Quiz'], 1),
     hero('Your skin, perfected', 'Science-backed clean beauty for every skin type', 'Take Skin Quiz', 2, 'centered'),
     features('Clean beauty promise', 'What makes GlowLab different', [
       {title:'Clean Ingredients',description:'No parabens, sulfates, or toxins',icon:'heart'},
       {title:'Dermatologist Tested',description:'Clinically proven results',icon:'check-circle'},
       {title:'Personalized Routine',description:'AI skin quiz for your perfect match',icon:'sparkles'},
       {title:'Cruelty Free',description:'Never tested on animals',icon:'smile'}], 3),
     stats([{value:'250K+',label:'Happy Skins'},{value:'98%',label:'Saw Results'},{value:'0',label:'Toxic Ingredients'}], 4),
     testimonials('Real results', [
       {name:'Olivia Chen',role:'Skincare Enthusiast',quote:'My acne cleared in 4 weeks with GlowLab.'},
       {name:'Priya Sharma',role:'Dermatologist',quote:'Finally a brand I can recommend to patients.'}], 5),
     cta('Get your personalized routine', 'Take our 2-minute skin quiz', 'Start Quiz', 6),
     footer('GlowLab', 7)]),

  // 20. ecom-books
  tpl('ecom-books', 'Bookstore Online', 'Curated reads for every book lover', 'ecommerce', 'commerce',
    ['books', 'reading', 'bookstore'], 'linear-gradient(135deg, #3a1c71, #d76d77)', '📚',
    [nav('PageTurn', ['Fiction', 'Non-Fiction', 'Kids', 'Book Clubs'], 1),
     hero('Stories that stay with you', 'Hand-curated collections from independent booksellers', 'Browse Books', 2, 'centered'),
     features('More than a bookstore', 'A community of readers', [
       {title:'Curated Picks',description:'Editor picks updated weekly',icon:'bookmark'},
       {title:'Book Clubs',description:'Join virtual reading communities',icon:'users'},
       {title:'Author Events',description:'Live Q&As with top authors',icon:'mic'},
       {title:'Indie First',description:'Supporting independent publishers',icon:'heart'}], 3),
     stats([{value:'1M+',label:'Titles'},{value:'200+',label:'Book Clubs'},{value:'50K+',label:'Monthly Readers'}], 4),
     pricing('Reading plans', 'Cancel anytime', [
       {name:'Explorer',price:'\$9.99/mo',description:'Casual reader',features:['1 book/month','Digital access','Community'],ctaText:'Start Reading'},
       {name:'Bibliophile',price:'\$19.99/mo',description:'Avid reader',features:['3 books/month','Audiobooks','Author events'],ctaText:'Subscribe',highlighted:true},
       {name:'Collector',price:'\$39.99/mo',description:'Book lover',features:['5 books/month','Signed editions','First editions access'],ctaText:'Subscribe'}], 5),
     footer('PageTurn', 6)]),

  // 21. ecom-pets
  tpl('ecom-pets', 'Pet Supplies', 'Everything your fur babies need', 'ecommerce', 'commerce',
    ['pets', 'dogs', 'cats'], 'linear-gradient(135deg, #f6d365, #fda085)', '🐾',
    [nav('PawPalace', ['Dogs', 'Cats', 'Food', 'Vet Chat'], 1),
     hero('Happy pets, happy life', 'Premium nutrition and toys for your furry family', 'Shop by Pet', 2, 'centered'),
     features('Why pet parents love us', 'Trusted by vets and pet owners', [
       {title:'Vet-Approved',description:'All products reviewed by vets',icon:'check-circle'},
       {title:'Auto-Delivery',description:'Never run out of food again',icon:'repeat'},
       {title:'Free Vet Chat',description:'24/7 online vet consultations',icon:'message-circle'}], 3),
     stats([{value:'500K+',label:'Pets Served'},{value:'10K+',label:'Products'},{value:'4.9/5',label:'Rating'}], 4),
     testimonials('Pet parent stories', [
       {name:'Amanda Brooks',role:'Dog Mom',quote:'Auto-delivery saves me so much time and worry.'},
       {name:'Kevin Wu',role:'Cat Dad',quote:'The vet chat helped me catch an issue early.'}], 5),
     cta('First order: 25% off', 'Plus free shipping on orders over \$35', 'Shop Now', 6),
     footer('PawPalace', 7)]),

  // 22. ecom-marketplace
  tpl('ecom-marketplace', 'Multi-vendor Marketplace', 'Buy and sell from trusted vendors', 'ecommerce', 'commerce',
    ['marketplace', 'vendors', 'multi-seller'], 'linear-gradient(135deg, #6a11cb, #2575fc)', '🏪',
    [nav('BazaarHub', ['Explore', 'Sell', 'Categories', 'Deals'], 1),
     hero('One marketplace, endless finds', 'Discover unique products from 10,000+ trusted sellers', 'Start Exploring', 2, 'centered'),
     features('Why BazaarHub?', 'The marketplace that works for everyone', [
       {title:'Buyer Protection',description:'100% money-back guarantee',icon:'shield'},
       {title:'Verified Sellers',description:'Every seller is vetted and rated',icon:'user-check'},
       {title:'Instant Payouts',description:'Sellers get paid within 24 hours',icon:'dollar-sign'},
       {title:'Global Shipping',description:'Ship to 180+ countries',icon:'globe'}], 3),
     stats([{value:'10K+',label:'Sellers'},{value:'5M+',label:'Products'},{value:'180+',label:'Countries'}], 4),
     faq('Marketplace FAQ', [
       {question:'How do I become a seller?',answer:'Sign up, verify your identity, and list your first product in minutes.'},
       {question:'What are the seller fees?',answer:'5% transaction fee, no monthly charges.'},
       {question:'How does buyer protection work?',answer:'Full refund if item is not as described or never arrives.'}], 5),
     cta('Start selling today', 'Zero monthly fees, only pay when you sell', 'Open Your Shop', 6),
     footer('BazaarHub', 7)]),

  // ======================================================================
  // Finance (8)
  // ======================================================================

  // 23. fin-banking
  tpl('fin-banking', 'Digital Banking', 'Banking reimagined for the digital age', 'finance', 'financial',
    ['banking', 'neobank', 'fintech'], 'linear-gradient(135deg, #0052d4, #4364f7)', '🏦',
    [nav('NeoBank', ['Personal', 'Business', 'Cards', 'Security'], 1),
     hero('Banking without boundaries', 'Zero fees, instant transfers, and smart savings tools', 'Open Account in 5 min', 2, 'centered'),
     features('Modern banking features', 'Everything legacy banks forgot', [
       {title:'Instant Transfers',description:'Send money globally in seconds',icon:'send'},
       {title:'Smart Budgets',description:'AI categorizes your spending',icon:'pie-chart'},
       {title:'Virtual Cards',description:'Create disposable cards for online',icon:'credit-card'},
       {title:'Savings Vaults',description:'Round up and save automatically',icon:'piggy-bank'}], 3),
     stats([{value:'5M+',label:'Accounts'},{value:'\$0',label:'Monthly Fees'},{value:'150+',label:'Currencies'}], 4),
     testimonials('Customer stories', [
       {name:'Julia Reyes',role:'Freelancer',quote:'No fees on international payments saved me thousands.'},
       {name:'Thomas Berger',role:'Small Business Owner',quote:'Opened my business account in 10 minutes flat.'}], 5),
     cta('Open your account today', 'No paperwork, no branch visits, no fees', 'Get Started', 6),
     footer('NeoBank', 7)]),

  // 24. fin-insurance
  tpl('fin-insurance', 'Insurance Provider', 'Smart insurance for modern life', 'finance', 'financial',
    ['insurance', 'coverage', 'protection'], 'linear-gradient(135deg, #1a2980, #26d0ce)', '🛡️',
    [nav('CoverWise', ['Auto', 'Home', 'Life', 'Claims'], 1),
     hero('Insurance that makes sense', 'Get covered in 90 seconds with instant quotes', 'Get a Quote', 2, 'left'),
     features('Why CoverWise?', 'Insurance redesigned', [
       {title:'Instant Quotes',description:'AI-powered pricing in 90 seconds',icon:'zap'},
       {title:'Easy Claims',description:'File claims from your phone',icon:'smartphone'},
       {title:'No Hidden Fees',description:'Transparent pricing, always',icon:'eye'},
       {title:'Bundle & Save',description:'Combine policies for up to 30% off',icon:'layers'}], 3),
     stats([{value:'2M+',label:'Policies'},{value:'<90s',label:'Quote Time'},{value:'97%',label:'Claims Approved'}], 4),
     faq('Insurance FAQ', [
       {question:'How fast can I get covered?',answer:'Most policies are active within minutes of purchase.'},
       {question:'Can I cancel anytime?',answer:'Yes, cancel anytime with prorated refunds.'},
       {question:'How do I file a claim?',answer:'Through our app in under 3 minutes, with AI-assisted filing.'}], 5),
     cta('Get your free quote', 'Takes less than 90 seconds', 'Start Quote', 6),
     footer('CoverWise', 7)]),

  // 25. fin-crypto
  tpl('fin-crypto', 'Crypto Exchange', 'Trade crypto with confidence', 'finance', 'financial',
    ['crypto', 'bitcoin', 'exchange'], 'linear-gradient(135deg, #f7971e, #ffd200)', '₿',
    [nav('CoinPeak', ['Trade', 'Earn', 'NFTs', 'Security'], 1),
     hero('Trade the future', 'Buy, sell, and earn on 200+ cryptocurrencies', 'Start Trading', 2, 'centered'),
     features('Built for traders', 'Advanced tools, simple interface', [
       {title:'200+ Coins',description:'All major cryptos and altcoins',icon:'coins'},
       {title:'0.1% Fees',description:'Lowest trading fees in the market',icon:'percent'},
       {title:'Staking Rewards',description:'Earn up to 12% APY on holdings',icon:'trending-up'},
       {title:'Cold Storage',description:'95% of assets in cold wallets',icon:'lock'}], 3),
     stats([{value:'\$50B+',label:'Trading Volume'},{value:'10M+',label:'Traders'},{value:'200+',label:'Cryptos'}], 4),
     faq('Crypto FAQ', [
       {question:'Is my crypto safe?',answer:'95% of assets are in cold storage with multi-sig and insurance.'},
       {question:'What are the withdrawal limits?',answer:'\$100K/day for verified accounts, higher for VIP.'},
       {question:'Do you support fiat?',answer:'Deposit and withdraw in USD, EUR, GBP, and 20+ currencies.'}], 5),
     cta('Get \$50 in free Bitcoin', 'Sign up and trade \$100 to earn your bonus', 'Claim Bonus', 6),
     footer('CoinPeak', 7)]),

  // 26. fin-trading
  tpl('fin-trading', 'Stock Trading Platform', 'Commission-free stock trading', 'finance', 'financial',
    ['stocks', 'trading', 'investing'], 'linear-gradient(135deg, #134e5e, #71b280)', '📉',
    [nav('TradeX', ['Stocks', 'ETFs', 'Options', 'Learn'], 1),
     hero('Invest in your future', 'Commission-free trading with powerful research tools', 'Open Account', 2, 'centered'),
     features('Smart investing tools', 'Professional tools, zero commissions', [
       {title:'\$0 Commissions',description:'Trade stocks and ETFs for free',icon:'dollar-sign'},
       {title:'Research Hub',description:'Analyst reports and earnings data',icon:'search'},
       {title:'Fractional Shares',description:'Invest with as little as \$1',icon:'scissors'},
       {title:'Paper Trading',description:'Practice risk-free with virtual money',icon:'edit'}], 3),
     stats([{value:'\$0',label:'Commissions'},{value:'7K+',label:'Stocks'},{value:'3M+',label:'Investors'}], 4),
     testimonials('Investor stories', [
       {name:'Michael Park',role:'Retail Investor',quote:'Fractional shares let me build a diversified portfolio on a budget.'},
       {name:'Elena Rossi',role:'Day Trader',quote:'The charting tools rival Bloomberg at a fraction of the cost.'}], 5),
     cta('Start investing with \$1', 'Free stock when you sign up', 'Get Free Stock', 6),
     footer('TradeX', 7)]),

  // 27. fin-wealth
  tpl('fin-wealth', 'Wealth Management', 'Grow and protect your wealth intelligently', 'finance', 'financial',
    ['wealth', 'advisory', 'portfolio'], 'linear-gradient(135deg, #2c3e50, #4ca1af)', '🏛️',
    [nav('WealthBridge', ['Services', 'Performance', 'About', 'Contact'], 1),
     hero('Your wealth, expertly managed', 'AI-driven portfolios with human advisory oversight', 'Schedule Consultation', 2, 'left'),
     features('Comprehensive wealth services', 'Tailored to your financial goals', [
       {title:'Robo-Advisory',description:'AI-optimized portfolio allocation',icon:'cpu'},
       {title:'Tax Harvesting',description:'Automatic tax-loss harvesting',icon:'percent'},
       {title:'Estate Planning',description:'Protect your legacy for generations',icon:'home'},
       {title:'Dedicated Advisor',description:'CFA-certified personal advisor',icon:'user'}], 3),
     stats([{value:'\$25B+',label:'AUM'},{value:'12%',label:'Avg Return'},{value:'50K+',label:'Clients'}], 4),
     testimonials('Client testimonials', [
       {name:'Richard Hamilton',role:'Retired CEO',quote:'WealthBridge saved me \$200K in taxes last year.'},
       {name:'Diana Weston',role:'Entrepreneur',quote:'Their estate planning gave my family total peace of mind.'}], 5),
     contactForm('Start your wealth journey', 'Schedule a free 30-minute consultation', 6),
     footer('WealthBridge', 7)]),

  // 28. fin-payments
  tpl('fin-payments', 'Payment Gateway', 'Accept payments anywhere, any way', 'finance', 'financial',
    ['payments', 'gateway', 'checkout'], 'linear-gradient(135deg, #7f00ff, #e100ff)', '💳',
    [nav('PayStream', ['Products', 'Developers', 'Pricing', 'Docs'], 1),
     hero('Payments made effortless', 'Accept credit cards, wallets, and crypto in one API', 'Get API Keys', 2, 'centered'),
     features('Universal payments', 'One integration, every payment method', [
       {title:'135+ Currencies',description:'Accept payments worldwide',icon:'globe'},
       {title:'One-click Checkout',description:'Reduce cart abandonment by 40%',icon:'shopping-cart'},
       {title:'Fraud Protection',description:'ML-powered fraud detection',icon:'shield'},
       {title:'Developer APIs',description:'REST, GraphQL, and webhooks',icon:'code'}], 3),
     stats([{value:'\$200B+',label:'Processed'},{value:'135+',label:'Currencies'},{value:'99.999%',label:'Uptime'}], 4),
     pricing('Transparent pricing', 'No setup fees, no monthly fees', [
       {name:'Standard',price:'2.9% + 30c',description:'Per transaction',features:['All payment methods','Fraud protection','Dashboard'],ctaText:'Start'},
       {name:'Pro',price:'2.5% + 25c',description:'High volume',features:['Everything in Standard','Priority support','Advanced analytics'],ctaText:'Apply',highlighted:true},
       {name:'Enterprise',price:'Custom',description:'Custom rates',features:['Volume discounts','Dedicated engineer','Custom SLA'],ctaText:'Contact Sales'}], 5),
     cta('Start accepting payments today', 'Go live in under 15 minutes', 'Get Started', 6),
     footer('PayStream', 7)]),

  // 29. fin-loans
  tpl('fin-loans', 'Personal Loans', 'Fast, fair personal loans online', 'finance', 'financial',
    ['loans', 'lending', 'personal-finance'], 'linear-gradient(135deg, #00b09b, #96c93d)', '🤝',
    [nav('LendQuick', ['Personal', 'Business', 'Rates', 'Apply'], 1),
     hero('Funds when you need them', 'Get approved in minutes with rates from 4.99% APR', 'Check Your Rate', 2, 'centered'),
     features('Borrowing made simple', 'No surprises, no hidden fees', [
       {title:'Instant Decisions',description:'Know your rate in 60 seconds',icon:'zap'},
       {title:'No Origination Fee',description:'Zero hidden charges',icon:'x-circle'},
       {title:'Flexible Terms',description:'Choose 12 to 84 month terms',icon:'sliders'},
       {title:'Same-Day Funding',description:'Money in your account today',icon:'clock'}], 3),
     stats([{value:'\$5B+',label:'Funded'},{value:'4.99%',label:'Rates From'},{value:'500K+',label:'Borrowers'}], 4),
     faq('Loan FAQ', [
       {question:'Will checking my rate affect my credit?',answer:'No, we do a soft pull that does not affect your credit score.'},
       {question:'How much can I borrow?',answer:'Personal loans from \$1,000 to \$100,000.'},
       {question:'How fast do I get funded?',answer:'Most approved borrowers receive funds the same business day.'}], 5),
     cta('Check your rate in 60 seconds', 'No impact on your credit score', 'Check Rate', 6),
     footer('LendQuick', 7)]),

  // 30. fin-tax
  tpl('fin-tax', 'Tax Services', 'Maximize refunds with expert tax filing', 'finance', 'financial',
    ['tax', 'filing', 'refunds'], 'linear-gradient(135deg, #355c7d, #6c5b7b)', '🧾',
    [nav('TaxEasy', ['Personal', 'Business', 'Pricing', 'Help'], 1),
     hero('Tax filing without the stress', 'AI-guided filing that maximizes your refund', 'File for Free', 2, 'centered'),
     features('Smarter tax filing', 'Every deduction, every credit', [
       {title:'AI Deduction Finder',description:'Never miss a deduction again',icon:'search'},
       {title:'CPA Review',description:'Expert review before you file',icon:'user-check'},
       {title:'Audit Protection',description:'We represent you if audited',icon:'shield'},
       {title:'Import W-2s',description:'Auto-import from 1M+ employers',icon:'download'}], 3),
     stats([{value:'10M+',label:'Returns Filed'},{value:'\$3,200',label:'Avg Refund'},{value:'100%',label:'Accuracy Guarantee'}], 4),
     pricing('Filing plans', 'Only pay when you file', [
       {name:'Basic',price:'Free',description:'Simple returns',features:['W-2 income','Standard deduction','Federal + state'],ctaText:'File Free'},
       {name:'Deluxe',price:'\$49',description:'Homeowners & investors',features:['Itemized deductions','Investment income','CPA review'],ctaText:'Start',highlighted:true},
       {name:'Self-Employed',price:'\$89',description:'Freelancers & businesses',features:['1099 income','Business expenses','Quarterly estimates'],ctaText:'Start'}], 5),
     faq('Tax FAQ', [
       {question:'When is the filing deadline?',answer:'April 15 for most filers. We support extensions too.'},
       {question:'Can I file state taxes too?',answer:'Yes, state filing is included with all plans.'},
       {question:'What if I get audited?',answer:'Deluxe and Self-Employed plans include full audit representation.'}], 6),
     footer('TaxEasy', 7)]),
];
