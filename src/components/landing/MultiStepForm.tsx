'use client';

import { useState, useCallback, useEffect } from 'react';
import { evaluateCondition, getProfiledFields, saveProfiledFields, validateField, type FormConfig, type FormField } from '@/lib/forms';

function getVisitorId(): string {
  if (typeof window === 'undefined') return '';
  let id = document.cookie.match(/ls_visitor=([^;]+)/)?.[1];
  if (!id) {
    id = crypto.randomUUID();
    document.cookie = `ls_visitor=${id};path=/;max-age=${365 * 24 * 60 * 60};SameSite=Lax`;
  }
  return id;
}

export function MultiStepForm(props: Record<string, unknown>) {
  const config = (props.formConfig || props) as Partial<FormConfig>;
  const steps = config.steps || [];
  const settings = config.settings || {};
  const formId = config.id || (props.formId as string) || '';

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Progressive profiling: hide fields already answered
  const profileCookie = settings.progressiveProfileCookie || 'ls_profile';
  const profiledFields = getProfiledFields(profileCookie);

  const getVisibleFields = useCallback((fields: FormField[]): FormField[] => {
    return fields.filter((f) => {
      // Hide if already profiled
      if (f.progressiveProfile && profiledFields.includes(f.name)) return false;
      // Hide if conditional and not met
      if (f.conditionalOn && !evaluateCondition(f.conditionalOn, formData)) return false;
      return true;
    });
  }, [formData, profiledFields]);

  // Skip empty steps
  useEffect(() => {
    if (steps.length > 0 && currentStep < steps.length) {
      const visibleFields = getVisibleFields(steps[currentStep].fields);
      if (visibleFields.length === 0 && currentStep < steps.length - 1) {
        setCurrentStep((s) => s + 1);
      }
    }
  }, [currentStep, steps, getVisibleFields]);

  function handleChange(name: string, value: string) {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  function validateStep(): boolean {
    if (steps.length === 0) return true;
    const fields = getVisibleFields(steps[currentStep].fields);
    const newErrors: Record<string, string> = {};

    for (const field of fields) {
      const error = validateField(field, formData[field.name] || '');
      if (error) newErrors[field.name] = error;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function nextStep() {
    if (!validateStep()) return;

    // Submit partial data
    if (formId) {
      await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formId,
          visitorId: getVisitorId(),
          data: formData,
          step: currentStep,
          isComplete: false,
        }),
      });
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      await submitForm();
    }
  }

  async function submitForm() {
    if (!validateStep()) return;
    setSubmitting(true);

    try {
      // Submit to forms API
      if (formId) {
        await fetch('/api/forms/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            formId,
            visitorId: getVisitorId(),
            data: formData,
            step: currentStep,
            isComplete: true,
          }),
        });
      }

      // Also submit to leads API if email present
      if (formData.email) {
        const landingId = document.querySelector('[data-landing-id]')?.getAttribute('data-landing-id');
        if (landingId) {
          await fetch('/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData, landingId }),
          });
        }
      }

      // Save profiled fields
      const allFields = steps.flatMap((s) => s.fields).filter((f) => f.progressiveProfile);
      const answered = allFields.filter((f) => formData[f.name]).map((f) => f.name);
      if (answered.length > 0) saveProfiledFields(profileCookie, answered);

      setSubmitted(true);

      if (settings.redirectUrl) {
        window.location.href = settings.redirectUrl;
      }
    } catch {
      setErrors({ _form: 'Submission failed. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg py-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg className="h-8 w-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{settings.successMessage || 'Thank you!'}</h3>
        <p className="mt-2 text-gray-600">Your submission has been received.</p>
      </div>
    );
  }

  if (steps.length === 0) {
    return (
      <div className="mx-auto max-w-lg py-12 text-center text-gray-500">
        No form steps configured.
      </div>
    );
  }

  const step = steps[currentStep];
  const visibleFields = getVisibleFields(step.fields);
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <section className="bg-white px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-lg">
        {/* Progress bar */}
        {settings.progressBar !== false && steps.length > 1 && (
          <div className="mb-6">
            <div className="mb-2 flex justify-between text-sm text-gray-500">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-200">
              <div className="h-full rounded-full bg-blue-600 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {/* Step header */}
        {step.title && <h3 className="mb-2 text-xl font-semibold text-gray-900">{step.title}</h3>}
        {step.description && <p className="mb-6 text-gray-600">{step.description}</p>}

        {/* Fields */}
        <div className="space-y-4">
          {visibleFields.map((field) => (
            <div key={field.id}>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {field.label}
                {field.required && <span className="ml-1 text-red-500">*</span>}
              </label>

              {(field.type === 'text' || field.type === 'email' || field.type === 'phone' || field.type === 'number' || field.type === 'date' || field.type === 'url') && (
                <input
                  type={field.type}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm ${errors[field.name] ? 'border-red-300' : 'border-gray-300'} focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
              )}

              {field.type === 'textarea' && (
                <textarea
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  rows={4}
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm ${errors[field.name] ? 'border-red-300' : 'border-gray-300'} focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
              )}

              {field.type === 'select' && (
                <select
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm ${errors[field.name] ? 'border-red-300' : 'border-gray-300'} focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                >
                  <option value="">Select...</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              )}

              {field.type === 'checkbox' && (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData[field.name] === 'true'}
                    onChange={(e) => handleChange(field.name, e.target.checked ? 'true' : 'false')}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">{field.placeholder || field.label}</span>
                </label>
              )}

              {field.type === 'radio' && field.options && (
                <div className="space-y-2">
                  {field.options.map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={field.name}
                        value={opt.value}
                        checked={formData[field.name] === opt.value}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                      />
                      <span className="text-sm text-gray-700">{opt.label}</span>
                    </label>
                  ))}
                </div>
              )}

              {errors[field.name] && <p className="mt-1 text-sm text-red-500">{errors[field.name]}</p>}
            </div>
          ))}
        </div>

        {errors._form && <p className="mt-4 text-sm text-red-500">{errors._form}</p>}

        {/* Navigation */}
        <div className="mt-6 flex justify-between">
          {currentStep > 0 ? (
            <button
              onClick={() => setCurrentStep((s) => s - 1)}
              className="rounded-lg bg-gray-100 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              Back
            </button>
          ) : <div />}
          <button
            onClick={nextStep}
            disabled={submitting}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : currentStep === steps.length - 1 ? (settings.submitText || 'Submit') : 'Next'}
          </button>
        </div>
      </div>
    </section>
  );
}
