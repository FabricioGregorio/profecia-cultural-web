'use client'

/**
 * Esta configuração é usada para o Sanity Studio que é montado na rota `/app/studio/[[...tool]]/page.tsx`
 */

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {ptBRLocale} from '@sanity/locale-pt-br'

import {dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  
  projectId,
  dataset,
  
  name: 'profecia_admin',
  title: 'Profecia Cultural', 

  // quais plugins aparecem:
  plugins: [
    structureTool({structure}),
    ptBRLocale(),
  ],

  schema,
})