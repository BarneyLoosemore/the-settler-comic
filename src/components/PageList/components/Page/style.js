import styled from "styled-components"

import { TABLET_BREAKPOINT, PAGE_BOTTOM_MARGIN } from "../../../../utils/style"

export const PageImage = styled.img`
  margin: 0 auto ${PAGE_BOTTOM_MARGIN}px auto;
  background-color: #f1f1f1;
  height: 100%;
  width: ${({ landscape }) => (landscape ? 100 : 50)}%;
  @media (max-width: ${TABLET_BREAKPOINT}) {
    width: 100%;
  }
`
