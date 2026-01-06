import { groq } from 'next-sanity'

import { client } from './client'

export type EventoShowcase = {
  _id: string
  titulo: string
  slug?: string
  categoria?: string
  descricaoCurta?: string
  capa?: unknown
  impacto?: string
  dataRealizacao?: string
  periodoRealizacao?: {
    inicio?: string
    fim?: string
  }
  local?: string | string[]
}

export async function getShowcaseEventos(limit = 3): Promise<EventoShowcase[]> {
  const query = groq`*[_type == "eventos"] | order(coalesce(periodoRealizacao.inicio, dataRealizacao) desc)[0...$limit]{
    _id,
    titulo,
    "slug": slug.current,
    categoria,
    descricaoCurta,
    capa,
    impacto,
    dataRealizacao,
    periodoRealizacao,
    local
  }`

  return client.fetch<EventoShowcase[]>(query, { limit })
}

export async function getImpactoEventos(limit = 3): Promise<string[]> {
  const query = groq`*[_type == "eventos" && defined(impacto) && impacto != ""] | order(coalesce(periodoRealizacao.inicio, dataRealizacao) desc)[0...$limit]{
    _id,
    impacto
  }`

  const results = await client.fetch<Array<{ _id: string; impacto: string }>>(query, { limit })
  return results.map((r) => r.impacto).filter(Boolean)
}
