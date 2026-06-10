'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn, focusRing } from '../../lib/cn';
import { LoaderIcon } from '../../lib/icons';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center rounded-md font-medium transition-colors',
    focusRing,
    'disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-primary-dark',
        secondary: 'bg-white text-primary-dark border border-border hover:bg-primary-light',
        ghost: 'bg-transparent text-primary-dark hover:bg-primary-light',
        danger: 'bg-error-700 text-white hover:bg-red-800',
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

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  children: ReactNode;
  isLoading?: boolean;
  /** Explanation shown when disabled — keeps button focusable per a11y */
  disabledReason?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant,
      size,
      isLoading = false,
      disabled,
      disabledReason,
      className,
      type = 'button',
      onClick,
      ...props
    },
    ref,
  ) => {
    const isDisabled = Boolean(disabled ?? isLoading);
    const describedBy =
      disabledReason && isDisabled ? `${props.id ?? 'btn'}-disabled-reason` : undefined;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    return (
      <>
        <button
          ref={ref}
          type={type}
          aria-disabled={isDisabled || undefined}
          aria-busy={isLoading || undefined}
          aria-describedby={describedBy ?? props['aria-describedby']}
          className={cn(
            buttonVariants({ variant, size }),
            isDisabled && 'opacity-50 cursor-not-allowed',
            className,
          )}
          onClick={handleClick}
          {...props}
        >
          {isLoading ? (
            <>
              <span className="sr-only">Loading</span>
              <LoaderIcon size={16} className="mr-2 animate-spin" aria-hidden="true" />
              {children}
            </>
          ) : (
            children
          )}
        </button>
        {disabledReason && isDisabled && (
          <span id={describedBy} className="sr-only">
            {disabledReason}
          </span>
        )}
      </>
    );
  },
);

Button.displayName = 'Button';
