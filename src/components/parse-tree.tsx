import { RefObject } from 'react'
import styled from 'styled-components'

interface IParseTree {
  passRef: RefObject<HTMLDivElement>
}

const ParseTreeWrapper = styled.div`
  background-color: #fff;
`

export function ParseTree({ passRef }: IParseTree): JSX.Element {
  return <ParseTreeWrapper ref={passRef} />
}
