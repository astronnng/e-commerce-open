const DEFAULT_PRODUCT_IMAGE = '/images/shirts1.jpg';

export function isValidProductImageSrc(value?: string | null): value is string {
  if (!value || typeof value !== 'string') {
    return false;
  }

  return value.startsWith('/') || value.startsWith('http://') || value.startsWith('https://');
}

export function getSafeProductImageSrc(value?: string | null): string {
  return isValidProductImageSrc(value) ? value : DEFAULT_PRODUCT_IMAGE;
}
