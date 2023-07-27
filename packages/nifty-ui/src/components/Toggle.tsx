import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cx } from '../utils';

export type ToggleProps = {
  size: 'sm' | 'lg' | 'default';
  variant: 'outline' | 'default';
  className?: string;
};

const Toggle = forwardRef<
  ElementRef<typeof TogglePrimitive.Root>,
  ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & ToggleProps
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cx(
      'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
      className,
      {
        'bg-transparent': variant === 'default',
        'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground': variant === 'outline',
      },
      {
        'h-9 px-2.5': size === 'sm',
        'h-10 px-3': size === 'default',
        'h-11 px-5': size === 'lg',
      }
    )}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle };
