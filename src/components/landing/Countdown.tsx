'use client';

import { useState, useEffect } from 'react';

export function Countdown(props: Record<string, unknown>) {
  const title = (props.title as string) || 'Launching soon';
  const targetDate = (props.targetDate as string) || new Date(Date.now() + 7 * 24 * 3600000).toISOString();
  const variant = (props.variant as string) || 'default';

  const [timeLeft, setTimeLeft] = useState(calcTimeLeft());

  function calcTimeLeft() {
    const diff = Math.max(0, new Date(targetDate).getTime() - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(timer);
  });

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  if (variant === 'hero') {
    return (
      <section className="py-24 px-4 bg-gradient-to-br from-blue-600 to-purple-700 text-white text-center">
        <h2 className="text-4xl font-bold md:text-5xl">{title}</h2>
        <div className="mt-10 flex justify-center gap-6">
          {units.map((u) => (
            <div key={u.label} className="rounded-xl bg-white/10 backdrop-blur-sm px-6 py-4">
              <p className="text-4xl font-bold md:text-5xl">{String(u.value).padStart(2, '0')}</p>
              <p className="mt-1 text-sm text-blue-100">{u.label}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 text-center">
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      <div className="mt-8 flex justify-center gap-4">
        {units.map((u) => (
          <div key={u.label} className="rounded-xl bg-gray-100 px-5 py-3">
            <p className="text-3xl font-bold text-gray-900">{String(u.value).padStart(2, '0')}</p>
            <p className="mt-1 text-xs text-gray-500">{u.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
