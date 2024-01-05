const KEY_ACCESS_KEY_DEV =
  'vJeCZKSmshAFMpPnDG3QzdV6UxE2gLHaqTWu7YfBw9NRbtkr';
const KEY_ACCESS_KEY_PROD =
  'pLm7G9cqyWJE6a5UYnzhjwgQs2fCRKkvMAFT84tZHDxd3XeB';
const KEY_REFRESH_KEY_DEV =
  'uhfWxz4J52sjyYLnKGScFZ9mrEUtvbCXqpAd8637kVwHaeBR';
const KEY_REFRESH_KEY_PROD =
  'nEpv8XqZbrGzyhYVd5cNfJQ2Ks6kDegtFm3HuUTa9SjBAwM4';

export function getCookieAccessKey(): string {
  return process.env.MODE_ENV === 'prod'
    ? KEY_ACCESS_KEY_PROD
    : KEY_ACCESS_KEY_DEV;
}

export function getCookieRefreshKey(): string {
  return process.env.MODE_ENV === 'prod'
    ? KEY_REFRESH_KEY_PROD
    : KEY_REFRESH_KEY_DEV;
}