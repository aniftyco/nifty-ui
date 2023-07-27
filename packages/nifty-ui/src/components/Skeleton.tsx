import { HTMLAttributes } from 'react';
import { cx } from '../utils';

export type SkeletonProps = {
  className?: 'string';
};

const Skeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cx('animate-pulse rounded-md bg-gray-500', className)} {...props} />;
};

export { Skeleton };
