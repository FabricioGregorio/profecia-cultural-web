import {describe, expect, it} from 'vitest'

import {WHATSAPP_NUMBER_E164, buildWhatsAppLink} from '../app/lib/whatsapp'

describe('buildWhatsAppLink', () => {
  it('builds a wa.me link with encoded text', () => {
    const link = buildWhatsAppLink('Olá mundo!')

    expect(link).toBe(
      `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encodeURIComponent('Olá mundo!')}`,
    )
  })

  it('encodes special characters safely', () => {
    const message = 'A&B?= #'
    const link = buildWhatsAppLink(message)

    expect(link).toContain(`https://wa.me/${WHATSAPP_NUMBER_E164}?text=`)
    expect(link.endsWith(encodeURIComponent(message))).toBe(true)
  })
})
