import type { EventoShowcase } from '@/sanity/lib/eventos'

import ManifestoVisual from './ManifestoVisual'
import Showcase from './Showcase'
import NossaAtuacao from './NossaAtuacao'
import ParceirosCTA from './ParceirosCTA'

type MainContentProps = {
  eventos: EventoShowcase[]
}

export default async function MainContent({ eventos }: MainContentProps) {
  return (
    <>
      <ManifestoVisual />
      <Showcase eventos={eventos} />
      <NossaAtuacao />
      <ParceirosCTA />
    </>
  )
}
