import Link from 'next/link';
import type { ComponentProps } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { buttonVariants } from '@accessshield/ui';
import { cn } from '@/lib/utils';

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export interface ButtonLinkProps extends ComponentProps<typeof Link>, ButtonVariantProps {}

/** Link styled as a theme button — avoids asChild class merge issues with Next.js Link. */
export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonLinkProps) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export interface ButtonAnchorProps extends ComponentProps<'a'>, ButtonVariantProps {}

/** External anchor styled as a theme button. */
export function ButtonAnchor({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonAnchorProps) {
  return <a className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
