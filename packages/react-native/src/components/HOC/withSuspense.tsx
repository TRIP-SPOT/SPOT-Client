import { Suspense } from 'react';
import Skeleton from '../common/Skeleton';

interface WithSuspenseOptions {
  fallback?: React.ReactNode;
}

export default function withSuspense<T extends object>(
  Component: React.ComponentType<T>,
  options: WithSuspenseOptions = { fallback: <Skeleton /> },
) {
  return function SuspenseComponent({ ...props }: T) {
    return (
      <Suspense fallback={options.fallback}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...(props as T)} />
      </Suspense>
    );
  };
}
