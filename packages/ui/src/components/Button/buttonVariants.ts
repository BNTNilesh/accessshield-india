import { cva } from 'class-variance-authority';
import { focusRing } from '../../lib/cn';

/** Shared button class variants — server-safe (no 'use client'). */
export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center rounded-md font-semibold no-underline transition-colors',
    focusRing,
    'disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        primary:
          'border-2 border-primary-700 bg-primary-600 text-white shadow-md hover:border-primary-800 hover:bg-primary-700 hover:shadow-lg',
        secondary:
          'border-2 border-primary-600 bg-white text-primary-700 shadow-sm hover:border-primary-700 hover:bg-primary-50',
        outline:
          'border-2 border-primary-600 bg-primary-50 text-primary-700 shadow-sm hover:border-primary-700 hover:bg-primary-100',
        ghost: 'border-2 border-transparent bg-transparent text-primary-700 hover:bg-primary-50',
        danger:
          'border-2 border-red-900 bg-error-700 text-white shadow-sm hover:border-red-950 hover:bg-red-800',
      },
      size: {
        sm: 'min-h-11 px-3 py-1.5 text-sm',
        md: 'min-h-11 px-4 py-2 text-base',
        lg: 'min-h-11 px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);
