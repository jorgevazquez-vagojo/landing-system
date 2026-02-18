export function Divider(props: Record<string, unknown>) {
  const variant = (props.variant as string) || (props.style as string) || 'line';

  if (variant === 'space') {
    return <div className="py-8" />;
  }

  if (variant === 'wave') {
    return (
      <div className="overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-16 w-full text-gray-100">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="currentColor"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="py-8">
      <hr className="mx-auto max-w-6xl border-gray-200" />
    </div>
  );
}
