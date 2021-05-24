import { useRef } from 'react'
import styled from 'styled-components'
import { useCodeMirror } from './use-code-mirror'
import { code as exampleCode } from '../data/code'

const EditorWrapper = styled.div``

export function CodeEditor(): JSX.Element {
  const parentRef = useRef<HTMLDivElement>(null)
  /*const view =*/ useCodeMirror(parentRef, exampleCode)

  return <EditorWrapper ref={parentRef}></EditorWrapper>
}
