import { defineField, defineType } from 'sanity'

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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL da página)',
      description: 'Clique em "Generate" para criar o link automático',
      type: 'slug',
      options: { source: 'titulo', maxLength: 96 },
      validation: (rule) => rule.required(),
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
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'fim',
          title: 'Data Final',
          type: 'date',
        }),
      ],
      validation: (rule) =>
        rule.custom((value) => {
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
      hidden: ({ document }) =>
        Boolean(
          (document as unknown as { periodoRealizacao?: { inicio?: string } } | undefined)
            ?.periodoRealizacao?.inicio
        ),
    }),
    defineField({
      name: 'local',
      title: 'Locais do Evento',
      description: 'Você pode informar mais de um local (separe por vírgulas). Ex: Tobias Barreto/SE, Aracaju/SE, Salvador/BA',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
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
              initialValue: ''
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
              title: 'URL do Vídeo'
            },
            {
              name: 'titulo',
              type: 'string',
              title: 'Título do Vídeo (Opcional)'
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

    // --- IMPACTO E CATEGORIA ---
    defineField({
      name: 'impacto',
      title: 'Frase de Impacto ou Depoimento',
      description: 'Ex: "Mais de 200 pessoas impactadas" ou um elogio recebido.',
      type: 'text',
      rows: 2,
    }),
    
    defineField({
      name: 'categoria',
      title: 'Categoria (legado)',
      description: 'Campo antigo (uma categoria). Use “Categorias” para novos eventos.',
      type: 'string',
      hidden: ({ document }) => Boolean((document as unknown as { categorias?: string[] } | undefined)?.categorias?.length),
      options: {
        list: [
          { title: 'Teatro', value: 'teatro' },
          { title: 'Dança', value: 'danca' },
          { title: 'Audiovisual', value: 'audiovisual' },
          { title: 'Evento Cultural', value: 'evento' },
          { title: 'Educação / Oficina', value: 'educacao' },
        ],
      },
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