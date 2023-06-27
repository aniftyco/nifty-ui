import { cx } from '../../utils';

export type Props = {
  className?: string;
  variant?: 'secondary' | 'destructive';
};

// const badgeVariants = cva(
//   'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ',
//   {
//     variants: {
//       variant: {
//         default: '',
//         secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
//         destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
//         outline: 'text-foreground',
//       },
//     },
//     defaultVariants: {
//       variant: 'default',
//     },
//   }
// );

// export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }) {
  return (
    <div
      className={cx(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        className,
        {
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80':
            variant === 'destructive',
          'text-foreground': variant === 'outline',
        }
      )}
      {...props}
    />
  );
}

export { Badge };
