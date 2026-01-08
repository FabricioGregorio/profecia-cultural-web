import {useDocumentOperation} from 'sanity'
import type {DocumentActionComponent} from 'sanity'

export const PublishOrSaveAction: DocumentActionComponent = (props) => {
  const {id, type, published, onComplete} = props
  const {publish} = useDocumentOperation(id, type)

  return {
    label: published ? 'Salvar alterações' : 'Publicar',
    tone: 'positive',
    disabled: publish.disabled,
    onHandle: () => {
      publish.execute()
      onComplete()
    },
  }
}
