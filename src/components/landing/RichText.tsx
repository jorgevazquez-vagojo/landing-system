export function RichText(props: Record<string, unknown>) {
  const content = (props.content as string) || '<p>Your content here</p>';
  const variant = (props.variant as string) || 'default';

  return (
    <section className="py-16 px-4">
      <div className={`mx-auto ${variant === 'narrow' ? 'max-w-2xl' : 'max-w-4xl'}`}>
        <div
          className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
}
