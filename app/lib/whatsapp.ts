export const WHATSAPP_NUMBER_E164 = '5579998414881'

export function buildWhatsAppLink(message: string) {
  const text = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${text}`
}
