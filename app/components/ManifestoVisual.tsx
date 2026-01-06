import Image from 'next/image'
import ManifestoVideo from './ManifestoVideo'

export default async function ManifestoVisual() {
  const { getTranslations } = await import('next-intl/server')
  const t = await getTranslations('home')

  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/assets/hero/sambaEmRodas1-lotado.jpg"
          alt="Profecia Cultural"
          fill
          priority={false}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>

      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="lg:max-w-3xl">
            <p className="text-sm md:text-base font-sans tracking-wide text-white/80">
              {t('manifestoTitle')}
            </p>

            <h2 className="mt-4 text-3xl md:text-5xl font-serif font-bold text-white">
              {t('manifestoQuote')}
            </h2>

            <p className="mt-6 text-sm md:text-base text-white/80 font-sans">
              {t('manifestoRoute')}
            </p>
          </div>

          <div className="lg:w-[420px] lg:flex-shrink-0">
            <ManifestoVideo />
          </div>
        </div>
      </div>
    </section>
  )
}
