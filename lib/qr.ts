import QRCode from 'qrcode';

export async function qrDataUrl(url: string) {
  return QRCode.toDataURL(url, { width: 320, margin: 1 });
}

export function makeMbReference() {
  return `${Math.floor(100000000 + Math.random() * 900000000)}`;
}
