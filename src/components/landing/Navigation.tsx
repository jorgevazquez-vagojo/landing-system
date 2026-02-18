'use client';

import { useState } from 'react';

interface NavLink {
  label: string;
  url: string;
}

export function Navigation(props: Record<string, unknown>) {
  const logo = (props.logo as string) || 'Brand';
  const links = (props.links as NavLink[]) || [];
  const variant = (props.variant as string) || 'default';
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className={`mx-auto max-w-6xl px-4 ${variant === 'centered' ? '' : ''}`}>
        <div className="flex h-16 items-center justify-between">
          <a href="#" className="text-xl font-bold text-gray-900">{logo}</a>

          {/* Desktop */}
          <div className="hidden items-center gap-6 md:flex">
            {links.map((link, i) => (
              <a key={i} href={link.url} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-600"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-gray-100 py-4 md:hidden">
            {links.map((link, i) => (
              <a key={i} href={link.url} className="block py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
