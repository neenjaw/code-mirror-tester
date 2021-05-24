import * as React from 'react'
import type { ReactNode } from 'react'
import styled from 'styled-components'

interface ISplitView {
  left: ReactNode
  right: ReactNode
}

const SplitViewWrapper = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: left;
`

const SplitViewSide = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: calc(50% - 8px);
  flex-grow: 0;
  flex-shrink: 0;

  &:nth-child(1) {
    padding-right: 8px;
  }
  &:nth-child(2) {
    padding-left: 8px;
  }
`

export function SplitView({ left, right }: ISplitView): JSX.Element {
  return (
    <SplitViewWrapper>
      <SplitViewSide>{left}</SplitViewSide>
      <SplitViewSide>{right}</SplitViewSide>
    </SplitViewWrapper>
  )
}
