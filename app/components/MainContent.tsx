import type { EventoShowcase } from '@/sanity/lib/eventos'

import ManifestoVisual from './ManifestoVisual'
import Showcase from './Showcase'
import NossaAtuacao from './NossaAtuacao'
import Impacto from './Impacto'
import ParceirosCTA from './ParceirosCTA'

type MainContentProps = {
  eventos: EventoShowcase[]
  impactos: string[]
}

export default async function MainContent({ eventos, impactos }: MainContentProps) {
  return (
    <>
      <ManifestoVisual />
      <Showcase eventos={eventos} />
      <NossaAtuacao />
      <Impacto impactos={impactos} />
      <ParceirosCTA />
    </>
  )
}
