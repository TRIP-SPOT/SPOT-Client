import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Error from '../common/Error';

export default function withSpotErrorBoundary<T extends object>(
  Component: React.ComponentType<T>,
) {
  return function ErrorBoundaryComponent({ ...props }: T) {
    return (
      <ErrorBoundary fallback={<Error />}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
