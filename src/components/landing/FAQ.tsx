'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQ(props: Record<string, unknown>) {
  const title = (props.title as string) || 'Frequently Asked Questions';
  const items = (props.items as FAQItem[]) || [];
  const variant = (props.variant as string) || 'accordion';

  if (items.length === 0) {
    return (
      <section className="py-16 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          <p className="mt-4 text-gray-500">Add FAQ items to help your visitors.</p>
        </div>
      </section>
    );
  }

  if (variant === 'two-column') {
    return (
      <section className="py-16 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">{title}</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {items.map((item, i) => (
              <div key={i}>
                <h3 className="font-semibold text-gray-900">{item.question}</h3>
                <p className="mt-2 text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">{title}</h2>
        <div className="space-y-3">
          {items.map((item, i) => (
            <AccordionItem key={i} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-4 text-left"
      >
        <span className="font-medium text-gray-900">{question}</span>
        <svg
          className={`h-5 w-5 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="border-t border-gray-100 px-6 py-4">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
}
