'use client';

import { componentMap } from '@/components/landing';

interface Section {
  id: string;
  type: string;
  variant?: string;
  props: Record<string, unknown>;
  order: number;
}

export function LandingRenderer({ sections, landingId }: { sections: Section[]; landingId: string }) {
  return (
    <div data-landing-id={landingId}>
      {sections
        .sort((a, b) => a.order - b.order)
        .map((section) => {
          const Component = componentMap[section.type];
          if (!Component) return null;
          return (
            <Component
              key={section.id}
              {...section.props}
              variant={section.variant}
            />
          );
        })}
    </div>
  );
}
