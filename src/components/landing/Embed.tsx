export function Embed(props: Record<string, unknown>) {
  const html = (props.html as string) || '';
  const title = (props.title as string) || '';

  return (
    <section className="py-12 px-4">
      <div className="mx-auto max-w-4xl">
        {title && <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">{title}</h2>}
        {html ? (
          <div
            className="overflow-hidden rounded-lg"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <div className="rounded-lg border-2 border-dashed border-gray-200 py-12 text-center text-gray-400">
            Add embed code (HTML/iframe)
          </div>
        )}
      </div>
    </section>
  );
}
