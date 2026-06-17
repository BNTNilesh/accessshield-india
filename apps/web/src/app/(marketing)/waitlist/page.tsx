'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, Select, Button } from '@accessshield/ui';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

const waitlistSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  companySize: z.enum(['1-10', '11-50', '51-200', '201-1000', '1000+'], {
    required_error: 'Please select company size',
  }),
  phone: z
    .string()
    .regex(/^(\+91|91|0)?[6-9]\d{9}$/, 'Enter a valid Indian phone number')
    .optional()
    .or(z.literal('')),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

const companySizeOptions = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-1000', label: '201-1000 employees' },
  { value: '1000+', label: '1000+ employees' },
];

export default function WaitlistPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
  });

  const onSubmit = async (data: WaitlistFormData) => {
    try {
      setError('');
      const response = await fetch(`${API_BASE}/api/v1/public/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 429) {
          setError('Too many requests. Please try again later.');
        } else if (response.status === 400 && errorData.errors) {
          const fields = Object.values(errorData.errors as Record<string, string[]>).flat();
          setError(fields[0] ?? 'Please check the form and try again.');
        } else {
          setError(
            (errorData as { detail?: string }).detail ?? 'Failed to submit. Please try again.',
          );
        }
        return;
      }

      setSubmitted(true);
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    }
  };

  if (submitted) {
    return (
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
            <svg
              className="mx-auto h-16 w-16 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h1 className="mt-4 text-2xl font-bold text-text-primary">Thanks for signing up!</h1>
            <p
              className="mt-2 text-base leading-normal text-text-secondary"
              role="status"
              aria-live="polite"
            >
              We&apos;ll be in touch within 1 business day to set up your account and get you
              started.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Start your free trial
          </h1>
          <p className="mt-4 text-lg leading-normal text-text-secondary">
            No credit card required. Get started in under 2 minutes.
          </p>
        </div>

        <div className="mt-12 rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
                <span aria-label="required" className="ml-0.5 text-red-600">
                  *
                </span>
              </label>
              <Input
                id="name"
                type="text"
                autoComplete="name"
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className="mt-1.5"
                {...register('name')}
              />
              {errors.name && (
                <p id="name-error" role="alert" className="mt-1.5 text-sm text-red-700">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Work Email
                <span aria-label="required" className="ml-0.5 text-red-600">
                  *
                </span>
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className="mt-1.5"
                {...register('email')}
              />
              {errors.email && (
                <p id="email-error" role="alert" className="mt-1.5 text-sm text-red-700">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                Company Name
                <span aria-label="required" className="ml-0.5 text-red-600">
                  *
                </span>
              </label>
              <Input
                id="company"
                type="text"
                autoComplete="organization"
                aria-required="true"
                aria-invalid={!!errors.company}
                aria-describedby={errors.company ? 'company-error' : undefined}
                className="mt-1.5"
                {...register('company')}
              />
              {errors.company && (
                <p id="company-error" role="alert" className="mt-1.5 text-sm text-red-700">
                  {errors.company.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="companySize" className="block text-sm font-medium text-gray-700">
                Company Size
                <span aria-label="required" className="ml-0.5 text-red-600">
                  *
                </span>
              </label>
              <Select
                id="companySize"
                options={companySizeOptions}
                placeholder="Select company size"
                aria-required="true"
                aria-invalid={!!errors.companySize}
                aria-describedby={errors.companySize ? 'companySize-error' : undefined}
                className="mt-1.5"
                onChange={(value) => setValue('companySize', value as any)}
              />
              {errors.companySize && (
                <p id="companySize-error" role="alert" className="mt-1.5 text-sm text-red-700">
                  {errors.companySize.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number (optional)
              </label>
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+91 98765 43210"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                className="mt-1.5"
                {...register('phone')}
              />
              {errors.phone && (
                <p id="phone-error" role="alert" className="mt-1.5 text-sm text-red-700">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {error && (
              <div role="alert" className="rounded-md bg-red-100 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              variant="primary"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Start free trial'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
