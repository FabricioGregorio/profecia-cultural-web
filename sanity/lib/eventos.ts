import { groq } from 'next-sanity'
import type { TypedObject } from '@portabletext/types'

import { client } from './client'

type SanityReference = {
  _ref: string
  _type: 'reference'
}

export type SanityImage = {
  _type: 'image'
  asset: SanityReference
  crop?: unknown
  hotspot?: unknown
}

export type EventoShowcase = {
  _id: string
  titulo: string
  slug?: string
  categorias?: string[]
  categoriaPrincipal?: string
  descricaoCurta?: string
  capa?: SanityImage
  dataRealizacao?: string
  datasRealizacao?: string[]
  periodoRealizacao?: {
    inicio?: string
    fim?: string
  }
  local?: string | string[]
}

export type EventoDetalhado = EventoShowcase & {
  conceito?: TypedObject[]
  galeria?: Array<(SanityImage & { _key?: string; legenda?: string })>
  videos?: Array<{ url?: string; titulo?: string }>
}

export async function getShowcaseEventos(limit = 3): Promise<EventoShowcase[]> {
  const query = groq`*[_type == "eventos" && defined(slug.current)] | order(coalesce(periodoRealizacao.inicio, dataRealizacao, datasRealizacao[0]) desc)[0...$limit]{
    _id,
    titulo,
    "slug": slug.current,
    categorias,
    categoriaPrincipal,
    descricaoCurta,
    capa,
    dataRealizacao,
    datasRealizacao,
    periodoRealizacao,
    local
  }`

  return client.fetch<EventoShowcase[]>(query, { limit })
}

export async function getEventoPorSlug(slug: string): Promise<EventoDetalhado | null> {
  const query = groq`*[_type == "eventos" && slug.current == $slug][0]{
    _id,
    titulo,
    "slug": slug.current,
    categorias,
    categoriaPrincipal,
    descricaoCurta,
    conceito,
    capa,
    galeria,
    videos,
    dataRealizacao,
    datasRealizacao,
    periodoRealizacao,
    local
  }`

  return client.fetch<EventoDetalhado | null>(query, { slug })
}
