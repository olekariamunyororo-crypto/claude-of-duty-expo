import * as Sentry from '@sentry/react-native';

let initialized = false;

export function initSentry() {
  if (initialized) return;
  initialized = true;
  // Optional: set SENTRY_DSN in env / app config to enable
  const dsn = process.env.EXPO_PUBLIC_SENTRY_DSN;
  if (!dsn) return;
  Sentry.init({
    dsn,
    enableInExpoDevelopment: false,
    tracesSampleRate: 0.2,
  });
}
