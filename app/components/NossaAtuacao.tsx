import Image from 'next/image'

type Pillar = {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
}

export default async function NossaAtuacao() {
  const { getTranslations } = await import('next-intl/server')
  const t = await getTranslations('home')

  const pillars: Pillar[] = [
    {
      title: t('atuacaoPillar1Title'),
      description: t('atuacaoPillar1Desc'),
      imageSrc: '/assets/hero/sambaEmRodas1-lotado.jpg',
      imageAlt: t('atuacaoPillar1Title'),
    },
    {
      title: t('atuacaoPillar2Title'),
      description: t('atuacaoPillar2Desc'),
      imageSrc: '/assets/hero/oficina-Vinil.jpg',
      imageAlt: t('atuacaoPillar2Title'),
    },
    {
      title: t('atuacaoPillar3Title'),
      description: t('atuacaoPillar3Desc'),
      imageSrc: '/assets/hero/sambaEmRodas1Equipe.jpg',
      imageAlt: t('atuacaoPillar3Title'),
    },
  ]

  return (
    <section className="py-16 md:py-24 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
            {t('atuacaoTitle')}
          </h2>
          <p className="mt-4 text-foreground/80 font-sans">{t('atuacaoSubtitle')}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="overflow-hidden rounded-lg border border-border bg-card"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={pillar.imageSrc}
                  alt={pillar.imageAlt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/35" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-foreground">{pillar.title}</h3>
                <p className="mt-3 text-sm text-foreground/80 font-sans">{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
