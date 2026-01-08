import { defineField, defineType } from 'sanity'

import { apiVersion } from '../env'

async function isUniqueEventoSlug(
  slug: string,
  context: {
    document?: { _id?: string }
    getClient: (opts: { apiVersion: string }) => {
      fetch: (q: string, p: Record<string, unknown>) => Promise<boolean>
    }
  }
) {
  if (!slug) return true

  const docId = context.document?._id || ''
  const id = docId.replace(/^drafts\./, '')

  const client = context.getClient({ apiVersion })
  const query =
    'count(*[_type == "eventos" && slug.current == $slug && !(_id in [$draftId, $publishedId])]) == 0'

  return client.fetch(query, {
    slug,
    draftId: `drafts.${id}`,
    publishedId: id,
  })
}

function isYoutubeOrVimeoUrl(url: string) {
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.toLowerCase()
    return (
      host === 'youtube.com' ||
      host.endsWith('.youtube.com') ||
      host === 'youtu.be' ||
      host === 'vimeo.com' ||
      host.endsWith('.vimeo.com')
    )
  } catch {
    return false
  }
}

export default defineType({
  name: 'eventos',
  title: 'Eventos e Realizações',
  type: 'document',
  fields: [
    // --- CABEÇALHO DO EVENTO ---
    defineField({
      name: 'titulo',
      title: 'Título do Evento',
      type: 'string',
      validation: (rule) =>
        rule.required().max(80).warning('Títulos muito longos podem quebrar o layout (recomendado até 80 caracteres).'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL da página)',
      description: 'Clique em "Generate" para criar o link automático',
      type: 'slug',
      options: { source: 'titulo', maxLength: 96, isUnique: isUniqueEventoSlug },
      validation: (rule) =>
        rule.required().custom(async (value, context) => {
          const isUnique = await isUniqueEventoSlug(value?.current || '', context as any)
          return isUnique || 'Já existe um evento com esse link/slug.'
        }),
    }),
    defineField({
      name: 'periodoRealizacao',
      title: 'Período de Realização',
      description: 'Ex: de 22/10/2025 até 26/10/2025',
      type: 'object',
      fields: [
        defineField({
          name: 'inicio',
          title: 'Data Inicial',
          type: 'date',
          options: {
            dateFormat: 'DD/MM/YYYY',
            calendarTodayLabel: 'Hoje',
          } as any,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'fim',
          title: 'Data Final',
          type: 'date',
          options: {
            dateFormat: 'DD/MM/YYYY',
            calendarTodayLabel: 'Hoje',
          } as any,
        }),
      ],
      validation: (rule) =>
        rule.custom((value, context) => {
          const document = context.document as
            | {
                dataRealizacao?: string
              }
            | undefined

          const hasPeriodoInicio = Boolean(value?.inicio)
          const hasDataLegado = Boolean(document?.dataRealizacao)

          if (!hasPeriodoInicio && !hasDataLegado) {
            return 'Informe uma data: “Período de Realização” (Data Inicial) ou “Data de Realização (legado)”.'
          }

          if (!value) return true
          if (!value.inicio || !value.fim) return true
          if (value.fim < value.inicio) return 'A data final deve ser igual ou posterior à data inicial.'
          return true
        }),
    }),
    defineField({
      name: 'dataRealizacao',
      title: 'Data de Realização (legado)',
      description: 'Campo antigo (uma única data). Use “Período de Realização” para novos eventos.',
      type: 'date',
      options: {
        dateFormat: 'DD/MM/YYYY',
        calendarTodayLabel: 'Hoje',
      } as any,
      hidden: ({ document }) =>
        Boolean(
          (document as unknown as { periodoRealizacao?: { inicio?: string } } | undefined)
            ?.periodoRealizacao?.inicio
        ),
      validation: (rule) =>
        rule.custom((value, context) => {
          const document = context.document as
            | {
                periodoRealizacao?: {
                  inicio?: string
                }
              }
            | undefined

          const hasPeriodoInicio = Boolean(document?.periodoRealizacao?.inicio)
          const hasDataLegado = Boolean(value)

          if (!hasPeriodoInicio && !hasDataLegado) {
            return 'Informe uma data: “Período de Realização” (Data Inicial) ou “Data de Realização (legado)”.'
          }

          return true
        }),
    }),
    defineField({
      name: 'local',
      title: 'Locais do Evento',
      description: 'Você pode informar mais de um local (separe por vírgulas). Ex: Tobias Barreto/SE, Aracaju/SE, Salvador/BA',
      type: 'array',
      of: [
        {
          type: 'string',
          validation: (rule) =>
            rule
              .max(60)
              .warning('Local muito longo pode quebrar o layout (recomendado até 60 caracteres).'),
        },
      ],
      options: {
        layout: 'tags',
      },
      validation: (rule) =>
        rule.required().min(1).custom((value) => {
          if (!Array.isArray(value)) return true
          const hasAtLeastOne = value.some((item) => typeof item === 'string' && item.trim().length > 0)
          return hasAtLeastOne || 'Informe pelo menos 1 local.'
        }),
    }),

    // --- CONTEÚDO PRINCIPAL ---
    defineField({
      name: 'descricaoCurta',
      title: 'Resumo (Para a Capa)',
      description: 'Aparece na Home. Máximo 3 linhas.',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: 'conceito',
      title: 'O Conceito (Texto Completo)',
      description: 'A história completa do evento. Pode usar negrito, itálico, etc.',
      type: 'array', 
      of: [{type: 'block'}], 
    }),

    // --- MÍDIA COM LEGENDA ---
    defineField({
      name: 'capa',
      title: 'Foto de Capa (Destaque)',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'galeria',
      title: 'Galeria de Fotos',
      description: 'Adicione fotos. Ao clicar na foto adicionada, você verá o campo de legenda.',
      type: 'array',
      of: [
        { 
          type: 'image', 
          options: { hotspot: true },
          
          fields: [
            {
              name: 'legenda',
              type: 'string',
              title: 'Legenda da Foto',
              description: 'Opcional. Ex: "Momento da Roda de Conversa"',
              initialValue: '',
              validation: (rule) =>
                rule
                  .max(120)
                  .warning('Legenda muito longa pode quebrar o layout (recomendado até 120 caracteres).'),
            }
          ]
        }
      ],
    }),

    defineField({
      name: 'videos',
      title: 'Vídeos do Evento',
      description: 'Cole os links do YouTube ou Vimeo aqui.',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Link de Vídeo',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'URL do Vídeo',
              validation: (rule) =>
                rule.required().custom((value) => {
                  if (!value) return 'Informe a URL do vídeo.'
                  if (typeof value !== 'string') return 'URL inválida.'
                  return isYoutubeOrVimeoUrl(value) || 'Use um link do YouTube ou Vimeo.'
                }),
            },
            {
              name: 'titulo',
              type: 'string',
              title: 'Título do Vídeo (Opcional)',
              validation: (rule) =>
                rule
                  .max(80)
                  .warning('Título de vídeo muito longo pode quebrar o layout (recomendado até 80 caracteres).'),
            }
          ],
          preview: {
            select: {
              title: 'titulo',
              subtitle: 'url'
            }
          }
        }
      ]
    }),

    defineField({
      name: 'categorias',
      title: 'Categorias',
      description: 'Selecione uma ou mais categorias.',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Teatro', value: 'teatro' },
          { title: 'Dança', value: 'danca' },
          { title: 'Audiovisual', value: 'audiovisual' },
          { title: 'Evento Cultural', value: 'evento' },
          { title: 'Educação / Oficina', value: 'educacao' },
        ],
        layout: 'tags',
      },
    }),
  ],
  preview: {
    select: {
      title: 'titulo',
      local: 'local',
      media: 'capa',
    },
    prepare({ title, local, media }) {
      const subtitle = Array.isArray(local) ? local.join(', ') : local
      return {
        title,
        subtitle,
        media,
      }
    },
  },
})