import { Hero } from './Hero';
import { CTA } from './CTA';
import { Features } from './Features';
import { ContactForm } from './ContactForm';
import { RichText } from './RichText';
import { Footer } from './Footer';
import { Testimonials } from './Testimonials';
import { Pricing } from './Pricing';
import { FAQ } from './FAQ';
import { Stats } from './Stats';
import { LogoCloud } from './LogoCloud';
import { Gallery } from './Gallery';
import { Video } from './Video';
import { Countdown } from './Countdown';
import { Comparison } from './Comparison';
import { Navigation } from './Navigation';
import { Embed } from './Embed';
import { Divider } from './Divider';
import { MultiStepForm } from './MultiStepForm';
import { Checkout } from './Checkout';
import type { ComponentDefinition } from '@/types/component';

export const componentMap: Record<string, React.ComponentType<Record<string, unknown>>> = {
  hero: Hero,
  cta: CTA,
  features: Features,
  'contact-form': ContactForm,
  'rich-text': RichText,
  footer: Footer,
  testimonials: Testimonials,
  pricing: Pricing,
  faq: FAQ,
  stats: Stats,
  'logo-cloud': LogoCloud,
  gallery: Gallery,
  video: Video,
  countdown: Countdown,
  comparison: Comparison,
  navigation: Navigation,
  embed: Embed,
  divider: Divider,
  'multi-step-form': MultiStepForm as React.ComponentType<Record<string, unknown>>,
  checkout: Checkout as React.ComponentType<Record<string, unknown>>,
};

export const componentRegistry: ComponentDefinition[] = [
  {
    type: 'navigation',
    name: 'Navigation',
    icon: 'Menu',
    category: 'header',
    variants: [{ id: 'default', name: 'Default' }, { id: 'centered', name: 'Centered' }],
    defaultProps: { logo: 'YourBrand', links: [{ label: 'Home', url: '#' }, { label: 'Features', url: '#features' }, { label: 'Pricing', url: '#pricing' }] },
    propsSchema: [
      { name: 'logo', label: 'Logo Text', type: 'text' },
      { name: 'links', label: 'Navigation Links', type: 'array' },
    ],
  },
  {
    type: 'hero',
    name: 'Hero',
    icon: 'Sparkles',
    category: 'header',
    variants: [
      { id: 'centered', name: 'Centered' },
      { id: 'split', name: 'Split (Image Right)' },
      { id: 'image-right', name: 'Image Right' },
      { id: 'video-bg', name: 'Video Background' },
      { id: 'gradient', name: 'Gradient' },
      { id: 'minimal', name: 'Minimal' },
    ],
    defaultProps: { title: 'Build Something Amazing', subtitle: 'Start creating your next great project today.', ctaText: 'Get Started', ctaUrl: '#' },
    propsSchema: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'subtitle', label: 'Subtitle', type: 'textarea' },
      { name: 'ctaText', label: 'CTA Button Text', type: 'text' },
      { name: 'ctaUrl', label: 'CTA URL', type: 'url' },
      { name: 'image', label: 'Image', type: 'image' },
    ],
  },
  {
    type: 'features',
    name: 'Features',
    icon: 'Grid3x3',
    category: 'content',
    variants: [
      { id: 'grid-3', name: '3-Column Grid' },
      { id: 'grid-2', name: '2-Column Grid' },
      { id: 'alternating', name: 'Alternating' },
      { id: 'icon-list', name: 'Icon List' },
      { id: 'cards', name: 'Cards' },
    ],
    defaultProps: { title: 'Features', items: [{ title: 'Feature 1', description: 'Description of feature 1', icon: 'star' }, { title: 'Feature 2', description: 'Description of feature 2', icon: 'heart' }, { title: 'Feature 3', description: 'Description of feature 3', icon: 'zap' }] },
    propsSchema: [
      { name: 'title', label: 'Section Title', type: 'text' },
      { name: 'items', label: 'Feature Items', type: 'array' },
    ],
  },
  {
    type: 'cta',
    name: 'Call to Action',
    icon: 'MousePointerClick',
    category: 'cta',
    variants: [
      { id: 'simple', name: 'Simple' },
      { id: 'with-image', name: 'With Image' },
      { id: 'banner', name: 'Banner' },
      { id: 'split', name: 'Split' },
    ],
    defaultProps: { title: 'Ready to get started?', subtitle: 'Join thousands of happy customers.', ctaText: 'Sign Up Now', ctaUrl: '#' },
    propsSchema: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'subtitle', label: 'Subtitle', type: 'textarea' },
      { name: 'ctaText', label: 'Button Text', type: 'text' },
      { name: 'ctaUrl', label: 'Button URL', type: 'url' },
    ],
  },
  {
    type: 'testimonials',
    name: 'Testimonials',
    icon: 'MessageSquareQuote',
    category: 'social-proof',
    variants: [{ id: 'cards', name: 'Cards' }, { id: 'carousel', name: 'Carousel' }, { id: 'grid', name: 'Grid' }],
    defaultProps: { title: 'What our customers say', items: [{ name: 'Jane Doe', role: 'CEO at Company', quote: 'This product changed everything.', avatar: '' }] },
    propsSchema: [
      { name: 'title', label: 'Section Title', type: 'text' },
      { name: 'items', label: 'Testimonials', type: 'array' },
    ],
  },
  {
    type: 'pricing',
    name: 'Pricing',
    icon: 'CreditCard',
    category: 'content',
    variants: [{ id: 'single', name: 'Single Plan' }, { id: 'three-tier', name: 'Three Tiers' }, { id: 'comparison', name: 'Comparison' }],
    defaultProps: { title: 'Pricing', plans: [{ name: 'Basic', price: '$9/mo', features: ['Feature 1', 'Feature 2'], ctaText: 'Get Started' }] },
    propsSchema: [
      { name: 'title', label: 'Section Title', type: 'text' },
      { name: 'plans', label: 'Plans', type: 'array' },
    ],
  },
  {
    type: 'faq',
    name: 'FAQ',
    icon: 'HelpCircle',
    category: 'content',
    variants: [{ id: 'accordion', name: 'Accordion' }, { id: 'two-column', name: 'Two Column' }],
    defaultProps: { title: 'Frequently Asked Questions', items: [{ question: 'How does it work?', answer: 'It works great!' }] },
    propsSchema: [
      { name: 'title', label: 'Section Title', type: 'text' },
      { name: 'items', label: 'Questions', type: 'array' },
    ],
  },
  {
    type: 'contact-form',
    name: 'Contact Form',
    icon: 'Mail',
    category: 'form',
    variants: [{ id: 'default', name: 'Default' }, { id: 'minimal', name: 'Minimal' }, { id: 'split', name: 'Split with Info' }],
    defaultProps: { title: 'Get in touch', fields: ['name', 'email', 'message'], submitText: 'Send Message' },
    propsSchema: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'fields', label: 'Form Fields', type: 'array' },
      { name: 'submitText', label: 'Submit Button Text', type: 'text' },
    ],
  },
  {
    type: 'stats',
    name: 'Stats',
    icon: 'TrendingUp',
    category: 'social-proof',
    variants: [{ id: 'row', name: 'Row' }, { id: 'cards', name: 'Cards' }],
    defaultProps: { items: [{ value: '10K+', label: 'Customers' }, { value: '99%', label: 'Uptime' }, { value: '24/7', label: 'Support' }] },
    propsSchema: [{ name: 'items', label: 'Stats', type: 'array' }],
  },
  {
    type: 'logo-cloud',
    name: 'Logo Cloud',
    icon: 'Building2',
    category: 'social-proof',
    variants: [{ id: 'simple', name: 'Simple' }, { id: 'with-title', name: 'With Title' }],
    defaultProps: { title: 'Trusted by leading companies', logos: [] },
    propsSchema: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'logos', label: 'Logos', type: 'array' },
    ],
  },
  {
    type: 'gallery',
    name: 'Gallery',
    icon: 'Images',
    category: 'media',
    variants: [{ id: 'grid', name: 'Grid' }, { id: 'masonry', name: 'Masonry' }],
    defaultProps: { images: [] },
    propsSchema: [{ name: 'images', label: 'Images', type: 'array' }],
  },
  {
    type: 'video',
    name: 'Video',
    icon: 'Play',
    category: 'media',
    variants: [{ id: 'embed', name: 'Embed' }, { id: 'hero-video', name: 'Hero Video' }],
    defaultProps: { url: '', title: 'Watch our story' },
    propsSchema: [
      { name: 'url', label: 'Video URL', type: 'url' },
      { name: 'title', label: 'Title', type: 'text' },
    ],
  },
  {
    type: 'countdown',
    name: 'Countdown',
    icon: 'Timer',
    category: 'cta',
    variants: [{ id: 'default', name: 'Default' }, { id: 'hero', name: 'Hero Countdown' }],
    defaultProps: { title: 'Launching soon', targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() },
    propsSchema: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'targetDate', label: 'Target Date', type: 'text' },
    ],
  },
  {
    type: 'comparison',
    name: 'Comparison',
    icon: 'ArrowLeftRight',
    category: 'content',
    variants: [{ id: 'table', name: 'Table' }, { id: 'side-by-side', name: 'Side by Side' }],
    defaultProps: { title: 'Compare Plans', columns: ['Feature', 'Basic', 'Pro'], rows: [['Storage', '10GB', '100GB']] },
    propsSchema: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'columns', label: 'Columns', type: 'array' },
      { name: 'rows', label: 'Rows', type: 'array' },
    ],
  },
  {
    type: 'rich-text',
    name: 'Rich Text',
    icon: 'Type',
    category: 'content',
    variants: [{ id: 'default', name: 'Default' }, { id: 'narrow', name: 'Narrow' }],
    defaultProps: { content: '<h2>Your content here</h2><p>Add your text, images, and more.</p>' },
    propsSchema: [{ name: 'content', label: 'Content', type: 'richtext' }],
  },
  {
    type: 'embed',
    name: 'Embed',
    icon: 'Code',
    category: 'media',
    variants: [{ id: 'default', name: 'Default' }],
    defaultProps: { html: '', title: 'Embedded content' },
    propsSchema: [
      { name: 'html', label: 'Embed Code', type: 'textarea' },
      { name: 'title', label: 'Title', type: 'text' },
    ],
  },
  {
    type: 'divider',
    name: 'Divider',
    icon: 'Minus',
    category: 'layout',
    variants: [{ id: 'line', name: 'Line' }, { id: 'space', name: 'Spacer' }, { id: 'wave', name: 'Wave' }],
    defaultProps: { style: 'line' },
    propsSchema: [{ name: 'style', label: 'Style', type: 'select', options: [{ label: 'Line', value: 'line' }, { label: 'Spacer', value: 'space' }, { label: 'Wave', value: 'wave' }] }],
  },
  {
    type: 'multi-step-form',
    name: 'Multi-Step Form',
    icon: 'ClipboardList',
    category: 'form',
    variants: [{ id: 'default', name: 'Default' }, { id: 'card', name: 'Card Style' }],
    defaultProps: {
      formConfig: {
        steps: [
          {
            id: 'step-1',
            title: 'Contact Information',
            description: 'Tell us about yourself',
            fields: [
              { id: 'f-name', name: 'name', label: 'Full Name', type: 'text', required: true },
              { id: 'f-email', name: 'email', label: 'Email', type: 'email', required: true },
            ],
          },
          {
            id: 'step-2',
            title: 'Your Needs',
            description: 'Help us understand your requirements',
            fields: [
              { id: 'f-company', name: 'company', label: 'Company', type: 'text' },
              { id: 'f-message', name: 'message', label: 'Message', type: 'textarea' },
            ],
          },
        ],
        settings: { submitText: 'Submit', successMessage: 'Thank you!', progressBar: true },
      },
    },
    propsSchema: [
      { name: 'formConfig', label: 'Form Configuration (JSON)', type: 'array' },
    ],
  },
  {
    type: 'checkout',
    name: 'Checkout',
    icon: 'ShoppingCart',
    category: 'form',
    variants: [{ id: 'default', name: 'Default' }, { id: 'card', name: 'Card' }, { id: 'minimal', name: 'Minimal' }],
    defaultProps: {
      title: 'Complete Your Purchase',
      description: 'Secure payment via Stripe',
      products: [{ name: 'Product', description: 'Premium plan', price: 49, currency: 'USD' }],
      buttonText: 'Pay Now',
    },
    propsSchema: [
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'description', label: 'Description', type: 'text' },
      { name: 'products', label: 'Products', type: 'array' },
      { name: 'buttonText', label: 'Button Text', type: 'text' },
      { name: 'stripePublishableKey', label: 'Stripe Publishable Key', type: 'text' },
    ],
  },
  {
    type: 'footer',
    name: 'Footer',
    icon: 'PanelBottom',
    category: 'footer',
    variants: [{ id: 'simple', name: 'Simple' }, { id: 'columns', name: 'Multi-Column' }],
    defaultProps: { companyName: 'Your Company', year: 2026, links: [] },
    propsSchema: [
      { name: 'companyName', label: 'Company Name', type: 'text' },
      { name: 'links', label: 'Footer Links', type: 'array' },
    ],
  },
];
