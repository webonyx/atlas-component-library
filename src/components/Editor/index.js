import React from 'react'
import LexicalComposer from '@lexical/react/LexicalComposer'

import {isDevPlayground} from '../../editor/appSettings'
import {SettingsContext, useSettings} from '../../editor/context/SettingsContext'
import {SharedHistoryContext} from '../../editor/context/SharedHistoryContext'
import LexicalEditor from '../../editor/Editor'
import PlaygroundNodes from '../../editor/nodes/PlaygroundNodes'
import TestRecorderPlugin from '../../editor/plugins/TestRecorderPlugin'
import TypingPerfPlugin from '../../editor/plugins/TypingPerfPlugin'
import Settings from '../../editor/Settings'
import PlaygroundEditorTheme from '../../editor/themes/PlaygroundEditorTheme'

export const Editor = () => {
  const {settings} = useSettings()
  const {measureTypingPerf} = settings

  const initialConfig = {
    namespace: 'AtlasEditor',
    nodes: [...PlaygroundNodes],
    onError: (error) => {
      throw error
    },
    theme: PlaygroundEditorTheme,
  }

  return (
    <SettingsContext>
      <LexicalComposer initialConfig={initialConfig}>
        <SharedHistoryContext>
          <header>
            Test
          </header>
          <div className="editor-shell">
            <LexicalEditor />
          </div>
          <Settings />
          {isDevPlayground && <TestRecorderPlugin />}
          {measureTypingPerf && <TypingPerfPlugin />}
        </SharedHistoryContext>
      </LexicalComposer>
    </SettingsContext>
  )
}
