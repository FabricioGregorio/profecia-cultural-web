import { type SchemaTypeDefinition } from 'sanity'
import eventos from './eventos'
import parceiro from './parceiro'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventos, parceiro],
}