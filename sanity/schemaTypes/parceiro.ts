import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'parceiro',
  title: 'Parceiros',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome da Instituição',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'url',
      title: 'Site do Parceiro (Opcional)',
      type: 'url',
    }),
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
  ],
})