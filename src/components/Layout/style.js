import styled, { createGlobalStyle } from "styled-components"

import { TABLET_BREAKPOINT } from "../../utils/style"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  @media (max-width: ${TABLET_BREAKPOINT}) {
    min-height: calc(100vh - 70px);
    padding-top: 70px;
  }
`

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Manrope', sans-serif;
  }
  html {
    font-family: 'Manrope', sans-serif;
  }
  main { 
    font-family: 'Manrope', sans-serif;
  }
  img {
    max-width: 100%;
  }
`

export const Footer = styled.footer`
  padding: 8px;
  font-size: 14px;
`
