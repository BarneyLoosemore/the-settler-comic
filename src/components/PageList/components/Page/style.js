import styled from "styled-components"

import { TABLET_BREAKPOINT } from "../../../../utils/style"

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`

export const Text = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 40px;
  opacity: 0;
`
export const Image = styled.img`
  margin-bottom: 32px;
  width: 100%;
  @media (max-width: ${TABLET_BREAKPOINT}) {
  }
`
