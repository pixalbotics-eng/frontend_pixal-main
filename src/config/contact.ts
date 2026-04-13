/** UK branch — display + WhatsApp (wa.me uses digits only, no +) */
export const UK_PHONE_E164 = '+447769649531';
export const UK_PHONE_WA_DIGITS =
  process.env.NEXT_PUBLIC_WHATSAPP_UK?.replace(/\D/g, '') || '447769649531';
export const UK_PHONE_DISPLAY = '+44 7769 649531';

/**
 * Pakistan branch — urgent sales & estimates (WhatsApp + phone).
 * Override via NEXT_PUBLIC_WHATSAPP_PK_SALES if needed.
 */
export const PK_SALES_WHATSAPP_DIGITS =
  process.env.NEXT_PUBLIC_WHATSAPP_PK_SALES?.replace(/\D/g, '') || '923431743916';

export const PK_SALES_PHONE_E164 = '+923431743916';
export const PK_SALES_PHONE_DISPLAY = '+92 343 1743916';
