const enabled = typeof __DEV__ !== 'undefined' ? __DEV__ : true;

export const log = {
  info: (...args: unknown[]) => enabled && console.log('[COD]', ...args),
  warn: (...args: unknown[]) => console.warn('[COD]', ...args),
  error: (...args: unknown[]) => console.error('[COD]', ...args),
};
