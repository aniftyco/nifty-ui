import { forwardRef, HTMLAttributes } from 'react';
import { cx } from '../utils';

export type AlertProps = {
  variant?: 'default' | 'destructive';
  className?: 'string';
};

const Alert = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      role="alert"
      className={cx(
        'relative w-full rounded-lg border p-4 [&:has(svg)]:pl-11 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
        className,
        {
          'bg-background text-foreground': variant === 'default',
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive':
            variant === 'destructive',
        }
      )}
    />
  )
);
Alert.displayName = 'Alert';

const AlertTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cx('mb-1 font-medium leading-none tracking-tight', className)} {...props} />
  )
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cx('text-sm [&_p]:leading-relaxed', className)} {...props} />
  )
);
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
