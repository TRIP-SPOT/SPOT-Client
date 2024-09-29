import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import * as Sentry from '@sentry/react-native';
import Error from '../common/Error';

export default function withSpotErrorBoundary<T extends object>(
  Component: React.ComponentType<T>,
) {
  return function ErrorBoundaryComponent({ ...props }: T) {
    return (
      <ErrorBoundary
        fallback={<Error />}
        onError={(err) => !__DEV__ && Sentry.captureException(err)}
      >
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
