export function Comparison(props: Record<string, unknown>) {
  const title = (props.title as string) || 'Compare Plans';
  const columns = (props.columns as string[]) || ['Feature', 'Basic', 'Pro'];
  const rows = (props.rows as string[][]) || [['Storage', '10GB', '100GB'], ['Support', 'Email', '24/7']];
  const variant = (props.variant as string) || 'table';

  if (variant === 'side-by-side') {
    return (
      <section className="py-16 px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">{title}</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {columns.slice(1).map((col, ci) => (
              <div key={ci} className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="mb-4 text-xl font-bold text-gray-900">{col}</h3>
                <ul className="space-y-3">
                  {rows.map((row, ri) => (
                    <li key={ri} className="flex justify-between text-sm">
                      <span className="text-gray-600">{row[0]}</span>
                      <span className="font-medium text-gray-900">{row[ci + 1]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">{title}</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                {columns.map((col, i) => (
                  <th key={i} className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((row, ri) => (
                <tr key={ri} className="bg-white">
                  {row.map((cell, ci) => (
                    <td key={ci} className={`px-6 py-4 text-sm ${ci === 0 ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
