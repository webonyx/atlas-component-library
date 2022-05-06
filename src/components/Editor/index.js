import React from 'react'
import LexicalComposer from '@lexical/react/LexicalComposer'

import {SharedHistoryContext} from '../../editor/context/SharedHistoryContext'
import LexicalEditor from '../../editor/Editor'
import PlaygroundNodes from '../../editor/nodes/PlaygroundNodes'
import PlaygroundEditorTheme from '../../editor/themes/PlaygroundEditorTheme'

export const Editor = () => {
  const initialConfig = {
    namespace: 'AtlasEditor',
    nodes: [...PlaygroundNodes],
    onError: (error) => {
      throw error
    },
    theme: PlaygroundEditorTheme,
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SharedHistoryContext>
        <div className="editor-shell">
          <LexicalEditor />
        </div>
      </SharedHistoryContext>
    </LexicalComposer>
  )
}
