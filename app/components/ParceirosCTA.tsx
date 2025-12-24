import { buildWhatsAppLink } from '@/app/lib/whatsapp'

export default async function ParceirosCTA() {
  const { getTranslations } = await import('next-intl/server')
  const t = await getTranslations('home')

  const href = buildWhatsAppLink(t('ctaWhatsAppMessage'))

  return (
    <section className="py-16 md:py-24 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="rounded-lg border border-border bg-card p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
            {t('ctaTitle')}
          </h2>
          <p className="mt-4 text-foreground/80 font-sans max-w-3xl mx-auto">
            {t('ctaText')}
          </p>
          <p className="mt-3 text-sm text-foreground/70 font-sans">
            {t('ctaContactHint')}
          </p>

          <div className="mt-8">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm md:text-base font-sans font-semibold text-primary-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              {t('ctaButton')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
