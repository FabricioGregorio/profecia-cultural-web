import type {StructureResolver} from 'sanity/structure'

// ordem do menu
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Painel Administrativo')
    .items([

      S.documentTypeListItem('eventos')
        .title('Eventos e Realizações')
        .icon(() => '🎭'), 

      S.divider(),

      S.documentTypeListItem('parceiro')
        .title('Parceiros')
        .icon(() => '🤝'),

    ])