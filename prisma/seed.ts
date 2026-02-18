import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create default company
  const company = await prisma.company.upsert({
    where: { slug: 'demo-company' },
    update: {},
    create: {
      name: 'Demo Company',
      slug: 'demo-company',
    },
  });

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  await prisma.user.upsert({
    where: { email: 'admin@landing.system' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@landing.system',
      password: hashedPassword,
      role: 'ADMIN',
      companyId: company.id,
    },
  });

  // Create sample templates
  const templates = [
    {
      name: 'SaaS Startup',
      slug: 'saas-startup',
      category: 'saas',
      description: 'Modern SaaS product landing page with hero, features, pricing, and CTA.',
      sections: [
        { id: '1', type: 'hero', variant: 'centered', props: { title: 'Ship faster with our platform', subtitle: 'The all-in-one solution for modern teams to build, deploy, and scale.', ctaText: 'Start Free Trial', ctaUrl: '#' }, order: 0 },
        { id: '2', type: 'features', variant: 'grid-3', props: { title: 'Everything you need', items: [{ title: 'Fast', description: 'Lightning-fast performance', icon: 'zap' }, { title: 'Secure', description: 'Bank-grade security', icon: 'shield' }, { title: 'Scalable', description: 'Grows with your business', icon: 'trending-up' }] }, order: 1 },
        { id: '3', type: 'cta', variant: 'simple', props: { title: 'Ready to get started?', subtitle: 'Join thousands of teams already using our platform.', ctaText: 'Start Free Trial', ctaUrl: '#' }, order: 2 },
        { id: '4', type: 'footer', variant: 'simple', props: { companyName: 'YourCompany', year: 2026 }, order: 3 },
      ],
    },
    {
      name: 'Lead Capture',
      slug: 'lead-capture',
      category: 'marketing',
      description: 'High-conversion lead capture page with form and social proof.',
      sections: [
        { id: '1', type: 'hero', variant: 'split', props: { title: 'Get your free guide', subtitle: 'Download our comprehensive guide and start growing today.', ctaText: 'Download Now', ctaUrl: '#' }, order: 0 },
        { id: '2', type: 'contact-form', variant: 'default', props: { title: 'Get instant access', fields: ['name', 'email', 'phone'], submitText: 'Send me the guide' }, order: 1 },
        { id: '3', type: 'testimonials', variant: 'cards', props: { title: 'What people say', items: [{ name: 'Jane Doe', role: 'CEO', quote: 'This guide changed everything for us.', avatar: '' }] }, order: 2 },
        { id: '4', type: 'footer', variant: 'simple', props: { companyName: 'YourCompany', year: 2026 }, order: 3 },
      ],
    },
    {
      name: 'E-commerce Product',
      slug: 'ecommerce-product',
      category: 'ecommerce',
      description: 'Product showcase landing page with gallery, features, and buy CTA.',
      sections: [
        { id: '1', type: 'hero', variant: 'image-right', props: { title: 'The product you have been waiting for', subtitle: 'Crafted with care, designed for performance.', ctaText: 'Buy Now', ctaUrl: '#', image: '' }, order: 0 },
        { id: '2', type: 'features', variant: 'alternating', props: { title: 'Key Features', items: [{ title: 'Premium Materials', description: 'Built to last with the finest materials.' }, { title: 'Innovative Design', description: 'Sleek and modern design that stands out.' }] }, order: 1 },
        { id: '3', type: 'pricing', variant: 'single', props: { title: 'Simple Pricing', price: '$99', features: ['Free shipping', '30-day returns', 'Lifetime warranty'], ctaText: 'Buy Now' }, order: 2 },
        { id: '4', type: 'footer', variant: 'simple', props: { companyName: 'YourBrand', year: 2026 }, order: 3 },
      ],
    },
  ];

  for (const t of templates) {
    await prisma.template.upsert({
      where: { slug: t.slug },
      update: { sections: t.sections as never },
      create: {
        name: t.name,
        slug: t.slug,
        category: t.category,
        description: t.description,
        sections: t.sections as never,
        isPublic: true,
      },
    });
  }

  console.log('Seed complete!');
  console.log('  Admin: admin@landing.system / admin123');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
