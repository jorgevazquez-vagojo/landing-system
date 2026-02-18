'use client';

import React, { useState, useCallback, FormEvent } from 'react';

type FieldName = 'name' | 'email' | 'phone' | 'message' | 'company' | 'subject';

interface ContactFormProps {
  title?: string;
  fields?: FieldName[];
  submitText?: string;
  variant?: 'default' | 'minimal' | 'split';
}

const fieldConfig: Record<FieldName, { label: string; type: string; placeholder: string; required: boolean }> = {
  name: { label: 'Full Name', type: 'text', placeholder: 'John Doe', required: true },
  email: { label: 'Email Address', type: 'email', placeholder: 'john@example.com', required: true },
  phone: { label: 'Phone Number', type: 'tel', placeholder: '+1 (555) 000-0000', required: false },
  message: { label: 'Message', type: 'textarea', placeholder: 'Tell us about your project...', required: true },
  company: { label: 'Company', type: 'text', placeholder: 'Acme Inc.', required: false },
  subject: { label: 'Subject', type: 'text', placeholder: 'General inquiry', required: false },
};

function getLandingId(): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get('landingId');
  if (fromUrl) return fromUrl;

  const pathParts = window.location.pathname.split('/').filter(Boolean);
  if (pathParts.length > 0) return pathParts[pathParts.length - 1];

  const el = document.querySelector('[data-landing-id]');
  if (el) return el.getAttribute('data-landing-id');

  return null;
}

function useContactForm(fields: FieldName[]) {
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    fields.forEach((f) => (initial[f] = ''));
    return initial;
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setStatus('submitting');
      setErrorMessage('');

      try {
        const landingId = getLandingId();
        const response = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            landingId,
            submittedAt: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.message || 'Something went wrong. Please try again.');
        }

        setStatus('success');
        setFormData(() => {
          const reset: Record<string, string> = {};
          fields.forEach((f) => (reset[f] = ''));
          return reset;
        });
      } catch (err) {
        setStatus('error');
        setErrorMessage(err instanceof Error ? err.message : 'An unexpected error occurred.');
      }
    },
    [formData, fields],
  );

  return { formData, status, errorMessage, handleChange, handleSubmit };
}

function SuccessMessage() {
  return (
    <div className="text-center py-12 px-6">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">Thank you!</h3>
      <p className="text-gray-600">Your message has been sent successfully. We&apos;ll get back to you shortly.</p>
    </div>
  );
}

function FormField({
  field,
  value,
  onChange,
  styleVariant,
}: {
  field: FieldName;
  value: string;
  onChange: (field: string, value: string) => void;
  styleVariant: 'default' | 'minimal' | 'split';
}) {
  const config = fieldConfig[field];
  if (!config) return null;

  const baseInput =
    styleVariant === 'minimal'
      ? 'w-full border-0 border-b-2 border-gray-200 bg-transparent px-0 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-600 focus:ring-0 transition-colors duration-200'
      : 'w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200';

  const labelClass =
    styleVariant === 'minimal'
      ? 'block text-sm font-medium text-gray-500 mb-1'
      : 'block text-sm font-semibold text-gray-700 mb-2';

  if (config.type === 'textarea') {
    return (
      <div className="col-span-full">
        <label htmlFor={`field-${field}`} className={labelClass}>
          {config.label}
          {config.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <textarea
          id={`field-${field}`}
          name={field}
          rows={4}
          required={config.required}
          placeholder={config.placeholder}
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
          className={`${baseInput} resize-none`}
        />
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={`field-${field}`} className={labelClass}>
        {config.label}
        {config.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={`field-${field}`}
        name={field}
        type={config.type}
        required={config.required}
        placeholder={config.placeholder}
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
        className={baseInput}
      />
    </div>
  );
}

function DefaultForm({ title, fields, submitText }: Omit<ContactFormProps, 'variant'>) {
  const fieldList = (fields || ['name', 'email', 'message']) as FieldName[];
  const { formData, status, errorMessage, handleChange, handleSubmit } = useContactForm(fieldList);

  if (status === 'success') return <SuccessMessage />;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-2xl mx-auto">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">{title}</h2>
            <p className="mt-3 text-lg text-gray-600">We&apos;d love to hear from you. Fill out the form below.</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {fieldList.map((field) => (
              <FormField
                key={field}
                field={field}
                value={formData[field] || ''}
                onChange={handleChange}
                styleVariant="default"
              />
            ))}
          </div>

          {status === 'error' && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-4">
              <p className="text-sm text-red-700">{errorMessage}</p>
            </div>
          )}

          <div className="text-center pt-2">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {status === 'submitting' ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </>
              ) : (
                submitText || 'Send Message'
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function MinimalForm({ title, fields, submitText }: Omit<ContactFormProps, 'variant'>) {
  const fieldList = (fields || ['name', 'email', 'message']) as FieldName[];
  const { formData, status, errorMessage, handleChange, handleSubmit } = useContactForm(fieldList);

  if (status === 'success') return <SuccessMessage />;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-lg mx-auto">
        {title && (
          <h2 className="text-2xl font-bold text-gray-900 mb-10">{title}</h2>
        )}
        <form onSubmit={handleSubmit} className="space-y-8">
          {fieldList.map((field) => (
            <FormField
              key={field}
              field={field}
              value={formData[field] || ''}
              onChange={handleChange}
              styleVariant="minimal"
            />
          ))}

          {status === 'error' && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-4">
              <p className="text-sm text-red-700">{errorMessage}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full rounded-lg bg-gray-900 px-6 py-3.5 text-base font-semibold text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {status === 'submitting' ? 'Sending...' : submitText || 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}

function SplitForm({ title, fields, submitText }: Omit<ContactFormProps, 'variant'>) {
  const fieldList = (fields || ['name', 'email', 'phone', 'message']) as FieldName[];
  const { formData, status, errorMessage, handleChange, handleSubmit } = useContactForm(fieldList);

  if (status === 'success') return <SuccessMessage />;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info panel */}
          <div className="flex flex-col justify-center">
            {title && (
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-6">
                {title}
              </h2>
            )}
            <p className="text-lg text-gray-600 leading-relaxed mb-10">
              Have a question or want to work together? Send us a message and we&apos;ll respond within 24 hours.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-gray-900">hello@company.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-gray-900">+1 (555) 000-0000</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Location</p>
                  <p className="text-gray-900">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form panel */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {fieldList.map((field) => (
                  <FormField
                    key={field}
                    field={field}
                    value={formData[field] || ''}
                    onChange={handleChange}
                    styleVariant="default"
                  />
                ))}
              </div>

              {status === 'error' && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                  <p className="text-sm text-red-700">{errorMessage}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full rounded-xl bg-indigo-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {status === 'submitting' ? (
                  <span className="inline-flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  submitText || 'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

const variantMap: Record<string, React.ComponentType<Omit<ContactFormProps, 'variant'>>> = {
  default: DefaultForm,
  minimal: MinimalForm,
  split: SplitForm,
};

export function ContactForm(props: Record<string, unknown>) {
  const title = (props.title as string) || '';
  const fields = (props.fields as FieldName[]) || ['name', 'email', 'message'];
  const submitText = (props.submitText as string) || 'Send Message';
  const variant = (props.variant as string) || 'default';

  const Component = variantMap[variant] || DefaultForm;

  return <Component title={title} fields={fields} submitText={submitText} />;
}
