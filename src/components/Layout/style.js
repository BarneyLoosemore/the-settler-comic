import styled, { createGlobalStyle } from "styled-components"

export const Container = styled.div`
  @media (max-width: 768px) {
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
