/** UK contact — display + WhatsApp (wa.me uses digits only, no +) */
export const UK_PHONE_E164 = '+447769649531';
export const UK_PHONE_WA_DIGITS = '447769649531';
export const UK_PHONE_DISPLAY = '+44 7769 649531';

/** Optional second UK WhatsApp (digits only, e.g. 4477…). Falls back to primary if unset. */
export const UK_WHATSAPP_PACKAGING_DIGITS =
  process.env.NEXT_PUBLIC_WHATSAPP_UK_PACKAGING?.replace(/\D/g, '') || UK_PHONE_WA_DIGITS;

/** Human-friendly +44 7xxx xxx xxx */
export function formatUkWaDigits(digits: string): string {
  const d = digits.replace(/\D/g, '');
  if (d.startsWith('44') && d.length >= 12) {
    const rest = d.slice(2);
    return `+44 ${rest.slice(0, 4)} ${rest.slice(4)}`;
  }
  return digits.startsWith('+') ? digits : `+${d}`;
}
