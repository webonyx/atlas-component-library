/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */
import './setupEnv'
import './index.css'

import AutoFocusPlugin from '@lexical/react/LexicalAutoFocusPlugin'
import AutoScrollPlugin from '@lexical/react/LexicalAutoScrollPlugin'
import LexicalClearEditorPlugin from '@lexical/react/LexicalClearEditorPlugin'
import HashtagsPlugin from '@lexical/react/LexicalHashtagPlugin'
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin'
import LinkPlugin from '@lexical/react/LexicalLinkPlugin'
import ListPlugin from '@lexical/react/LexicalListPlugin'
import LexicalMarkdownShortcutPlugin from '@lexical/react/LexicalMarkdownShortcutPlugin'
import PlainTextPlugin from '@lexical/react/LexicalPlainTextPlugin'
import RichTextPlugin from '@lexical/react/LexicalRichTextPlugin'
import TablesPlugin from '@lexical/react/LexicalTablePlugin'
import * as React from 'react'
import {useRef} from 'react'

import {useSharedHistoryContext} from './context/SharedHistoryContext'
import AutoLinkPlugin from './plugins/AutoLinkPlugin'
import CharacterStylesPopupPlugin from './plugins/CharacterStylesPopupPlugin'
import ClickableLinkPlugin from './plugins/ClickableLinkPlugin'
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin'
import EmojisPlugin from './plugins/EmojisPlugin'
import HorizontalRulePlugin from './plugins/HorizontalRulePlugin'
import ImagesPlugin from './plugins/ImagesPlugin'
import KeywordsPlugin from './plugins/KeywordsPlugin'
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin'
import MentionsPlugin from './plugins/MentionsPlugin'
import PollPlugin from './plugins/PollPlugin'
import TableCellActionMenuPlugin from './plugins/TableActionMenuPlugin'
import TableCellResizer from './plugins/TableCellResizer'
import ToolbarPlugin from './plugins/ToolbarPlugin'
import YouTubePlugin from './plugins/YouTubePlugin'
import ContentEditable from './ui/ContentEditable'
import Placeholder from './ui/Placeholder'

export default function Editor() {
  const {historyState} = useSharedHistoryContext();

  const text = 'Write something...';
  const placeholder = <Placeholder>{text}</Placeholder>;
  const scrollRef = useRef(null);
  const isRichText = true;

  return (
    <>
      {isRichText && <ToolbarPlugin />}
      <div
        className="editor-container"
        ref={scrollRef}>
        <AutoFocusPlugin />
        <LexicalClearEditorPlugin />
        <MentionsPlugin />
        <EmojisPlugin />
        <HashtagsPlugin />
        <KeywordsPlugin />
        <HorizontalRulePlugin />
        <AutoLinkPlugin />
        <CharacterStylesPopupPlugin />
        <AutoScrollPlugin scrollRef={scrollRef} />
        {isRichText ? (
          <>
            <HistoryPlugin externalHistoryState={historyState} />
            <RichTextPlugin
              contentEditable={<ContentEditable />}
              placeholder={placeholder}
              initialEditorState={undefined}
            />
            <LexicalMarkdownShortcutPlugin />
            <CodeHighlightPlugin />
            <ListPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} />
            <TablesPlugin />
            <TableCellActionMenuPlugin />
            <TableCellResizer />
            <ImagesPlugin />
            <LinkPlugin />
            <PollPlugin />
            <YouTubePlugin />
            <ClickableLinkPlugin />
          </>
        ) : (
          <>
            <PlainTextPlugin
              contentEditable={<ContentEditable />}
              placeholder={placeholder}
            />
            <HistoryPlugin externalHistoryState={historyState} />
          </>
        )}
      </div>
    </>
  );
}
