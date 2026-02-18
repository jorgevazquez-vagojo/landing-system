export function Footer(props: Record<string, unknown>) {
  const companyName = (props.companyName as string) || 'Company';
  const year = (props.year as number) || new Date().getFullYear();
  const links = (props.links as Array<{ label: string; url: string }>) || [];
  const variant = (props.variant as string) || 'simple';

  if (variant === 'columns') {
    return (
      <footer className="bg-gray-900 py-12 px-4 text-gray-400">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-lg font-bold text-white">{companyName}</h3>
              <p className="mt-2 text-sm">Building the future, one landing at a time.</p>
            </div>
            {links.length > 0 && (
              <div>
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-300">Links</h4>
                <ul className="space-y-2">
                  {links.map((link, i) => (
                    <li key={i}>
                      <a href={link.url} className="text-sm hover:text-white transition-colors">{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm">
            &copy; {year} {companyName}. All rights reserved.
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-gray-900 py-8 px-4 text-center text-gray-400">
      <div className="mx-auto max-w-6xl">
        {links.length > 0 && (
          <div className="mb-4 flex flex-wrap justify-center gap-6">
            {links.map((link, i) => (
              <a key={i} href={link.url} className="text-sm hover:text-white transition-colors">{link.label}</a>
            ))}
          </div>
        )}
        <p className="text-sm">&copy; {year} {companyName}. All rights reserved.</p>
      </div>
    </footer>
  );
}
