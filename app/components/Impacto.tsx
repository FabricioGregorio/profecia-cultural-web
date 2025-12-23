type ImpactoProps = {
  impactos: string[]
}

export default async function Impacto({ impactos }: ImpactoProps) {
  const { getTranslations } = await import('next-intl/server')
  const t = await getTranslations('home')

  const placeholders = [
    t('impactoPlaceholder1'),
    t('impactoPlaceholder2'),
    t('impactoPlaceholder3'),
  ]

  const items: string[] = [...impactos]
  while (items.length < 3) items.push(placeholders[items.length])

  return (
    <section className="py-16 md:py-24 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
            {t('impactoTitle')}
          </h2>
          <p className="mt-4 text-foreground/80 font-sans">{t('impactoSubtitle')}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.slice(0, 3).map((text, idx) => (
            <div
              key={`${idx}-${text.slice(0, 20)}`}
              className="rounded-lg border border-border bg-card p-6"
            >
              <p className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
