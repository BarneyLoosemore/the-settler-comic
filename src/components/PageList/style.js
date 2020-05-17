import styled from "styled-components"

import { TABLET_BREAKPOINT } from "../../utils/style"

export const Container = styled.div`
  margin-top: 48px;
  padding-bottom: 128px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 760px) {
    margin-top: 32px;
`

export const IssueText = styled.h1`
  text-align: center;
  margin-top: 32px;
  @media (min-width: ${TABLET_BREAKPOINT}) {
    margin-top: 64px;
  }
`
