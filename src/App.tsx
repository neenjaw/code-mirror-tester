import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import './App.css'
import { CodeEditor } from './components/code-editor'
import { ParseTree } from './components/parse-tree'
import { SplitView } from './components/split-view'
import { useCodeMirror } from './hooks/use-code-mirror'

import { code as exampleCode } from './data/code'
import { syntaxTree } from '@codemirror/language'
import { printTree } from './util/print-lezer-tree'

const HeaderText = styled.h1`
  margin: 0;
`

function App() {
  const codeEditorRef = useRef<HTMLDivElement>(null)
  const parseTreeRef = useRef<HTMLDivElement>(null)
  const codeView = useCodeMirror(codeEditorRef, exampleCode)
  const parseTreeView = useCodeMirror(parseTreeRef, 'loading...')

  useEffect(() => {
    setTimeout(() => {
      if (codeView && parseTreeView) {
        const codeViewState = codeView.state
        const codeViewTree = syntaxTree(codeViewState)
        const stringSyntaxTree = printTree(
          codeViewTree,
          codeViewState.doc.toString(),
          {
            colorizeOutput: false,
          }
        )
        parseTreeView.dispatch({
          changes: {
            from: 0,
            to: parseTreeView.state.doc.length,
            insert: stringSyntaxTree,
          },
        })
      }
    }, 300)
  }, [codeView, parseTreeView])

  return (
    <div className="App">
      <header className="App-header">
        <HeaderText>Codemirror</HeaderText>
      </header>
      <main>
        <SplitView
          left={<CodeEditor passRef={codeEditorRef} />}
          right={<ParseTree passRef={parseTreeRef} />}
        />
      </main>
    </div>
  )
}

export default App
