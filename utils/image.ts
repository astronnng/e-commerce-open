const IMAGEM_PADRAO_PRODUTO = '/images/shirts1.jpg';

export function isValidProductImageSrc(valor?: string | null): valor is string {
  if (!valor || typeof valor !== 'string') {
    return false;
  }

  return valor.startsWith('/') || valor.startsWith('http://') || valor.startsWith('https://');
}

export function getSafeProductImageSrc(valor?: string | null): string {
  return isValidProductImageSrc(valor) ? valor : IMAGEM_PADRAO_PRODUTO;
}
