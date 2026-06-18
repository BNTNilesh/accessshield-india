import Link from 'next/link';
import type { ComponentProps } from 'react';
import {
  getButtonStyle,
  getButtonThemeClassName,
  type ButtonThemeSize,
  type ButtonThemeVariant,
} from '@accessshield/ui';
import { cn } from '@/lib/utils';

export interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: ButtonThemeVariant;
  size?: ButtonThemeSize;
}

/** Link styled as a theme button. */
export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  style,
  ...props
}: ButtonLinkProps) {
  const v = (variant ?? 'primary') as ButtonThemeVariant;
  const s = (size ?? 'md') as ButtonThemeSize;

  return (
    <Link
      data-as-btn={v}
      className={cn(getButtonThemeClassName(v, s), className)}
      style={{ ...getButtonStyle(v), ...style }}
      {...props}
    />
  );
}

export interface ButtonAnchorProps extends ComponentProps<'a'> {
  variant?: ButtonThemeVariant;
  size?: ButtonThemeSize;
}

/** External anchor styled as a theme button. */
export function ButtonAnchor({
  variant = 'primary',
  size = 'md',
  className,
  style,
  ...props
}: ButtonAnchorProps) {
  const v = (variant ?? 'primary') as ButtonThemeVariant;
  const s = (size ?? 'md') as ButtonThemeSize;

  return (
    <a
      data-as-btn={v}
      className={cn(getButtonThemeClassName(v, s), className)}
      style={{ ...getButtonStyle(v), ...style }}
      {...props}
    />
  );
}
