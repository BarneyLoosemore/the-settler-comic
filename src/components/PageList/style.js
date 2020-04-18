import styled from "styled-components"

export const ImageContainer = styled.div`
  position: relative;
  :hover {
    img {
      filter: brightness(45%);
      transition: filter 0.2s ease-in-out;
    }
    div {
      opacity: 1 !important;
      transition: opacity 0.2s ease-in-out;
    }
  }
`

export const ImageText = styled.div`
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

export const Container = styled.div`
  margin: 0 auto;
  margin-top: 48px;
  max-width: 960px;
  @media (max-width: 760px) {
    margin-top: 32px;
  }
`

export const Image = styled.img`
  margin: 32px 0;
`
