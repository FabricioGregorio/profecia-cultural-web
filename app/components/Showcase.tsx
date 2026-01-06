import Image from 'next/image'

import { urlFor } from '@/sanity/lib/image'
import type { EventoShowcase } from '@/sanity/lib/eventos'
import { buildWhatsAppLink } from '@/app/lib/whatsapp'

type ShowcaseProps = {
  eventos: EventoShowcase[]
}

type ShowcaseCard = {
  key: string
  categoria: string
  titulo: string
  teaser: string
  imageSrc: string
  href: string
}

function categoryLabelKey(value: string) {
  if (value === 'teatro') return 'categories.teatro'
  if (value === 'danca') return 'categories.danca'
  if (value === 'audiovisual') return 'categories.audiovisual'
  if (value === 'evento') return 'categories.evento'
  if (value === 'educacao') return 'categories.educacao'
  return 'categories.outros'
}

export default async function Showcase({ eventos }: ShowcaseProps) {
  const { getTranslations } = await import('next-intl/server')
  const t = await getTranslations('home')

  const placeholders: ShowcaseCard[] = [
    {
      key: 'placeholder-1',
      categoria: 'evento',
      titulo: t('showcasePlaceholderTitle1'),
      teaser: t('showcasePlaceholderTeaser1'),
      imageSrc: '/assets/hero/sambaEmRodas1-lotado.jpg',
      href: buildWhatsAppLink(t('showcaseWhatsAppMessageGeneric')),
    },
    {
      key: 'placeholder-2',
      categoria: 'evento',
      titulo: t('showcasePlaceholderTitle2'),
      teaser: t('showcasePlaceholderTeaser2'),
      imageSrc: '/assets/hero/sambaEmRodas2.jpg',
      href: buildWhatsAppLink(t('showcaseWhatsAppMessageGeneric')),
    },
    {
      key: 'placeholder-3',
      categoria: 'educacao',
      titulo: t('showcasePlaceholderTitle3'),
      teaser: t('showcasePlaceholderTeaser3'),
      imageSrc: '/assets/hero/oficinaDiscoAoSomDeVinil.jpg',
      href: buildWhatsAppLink(t('showcaseWhatsAppMessageGeneric')),
    },
  ]

  const realCards: ShowcaseCard[] = eventos.slice(0, 3).map((evento) => {
    const imageSrc = evento.capa
      ? urlFor(evento.capa).width(1200).height(800).fit('crop').url()
      : '/assets/hero/sambaEmRodas1-lotado.jpg'

    const teaser = (evento.descricaoCurta || '').trim() || t('showcaseFallbackTeaser')

    const title = (evento.titulo || '').trim() || t('showcaseFallbackTitle')

    const href = buildWhatsAppLink(
      t('showcaseWhatsAppMessage', {
        title,
      })
    )

    return {
      key: evento._id,
      categoria: evento.categoria || 'outros',
      titulo: title,
      teaser,
      imageSrc,
      href,
    }
  })

  const cards: ShowcaseCard[] = [...realCards]
  while (cards.length < 3) {
    cards.push(placeholders[cards.length])
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
            {t('showcaseTitle')}
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <a
              key={card.key}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              aria-label={card.titulo}
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={card.imageSrc}
                  alt={card.titulo}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/45 transition-transform duration-500 group-hover:scale-105" />

                <div className="absolute left-4 top-4">
                  <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-sans font-semibold text-primary-foreground">
                    {t(categoryLabelKey(card.categoria))}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-serif font-bold text-foreground">{card.titulo}</h3>
                <p className="mt-3 text-sm text-foreground/80 font-sans whitespace-pre-line">{card.teaser}</p>

                <div className="mt-auto pt-6">
                  <span className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-sans font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:-translate-y-0.5 group-hover:bg-primary/90 group-hover:-translate-y-0.5">
                    {t('showcaseButton')}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
