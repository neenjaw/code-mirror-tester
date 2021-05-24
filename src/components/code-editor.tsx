import { RefObject } from 'react'
import styled from 'styled-components'

interface ICodeEditor {
  passRef: RefObject<HTMLDivElement>
}

const EditorWrapper = styled.div`
  background-color: #fff;
`

export function CodeEditor({ passRef }: ICodeEditor): JSX.Element {
  return <EditorWrapper id="editor" ref={passRef}></EditorWrapper>
}
