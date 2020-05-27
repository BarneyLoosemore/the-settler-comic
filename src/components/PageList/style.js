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

export const IssueText = styled.div`
  text-align: left;
  margin: 2vh 16px;
  font-size: 28px;
  color: #1a1a1a;
  padding-bottom: 8px;
  border-bottom: 1px solid #dedede;
  @media (min-width: ${TABLET_BREAKPOINT}) {
    text-align: center;
    padding-bottom: 24px;
    margin-top: 24px;
    margin-bottom: 40px;
    font-size: 32px;
  }
`
