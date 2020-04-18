import styled, { css } from "styled-components"
import { Link } from "gatsby"

const TABLET_BREAKPOINT = "768px"

export const NavContainer = styled.div`
  opacity: 0.9;
  z-index: 999;
  width: 100%;
  height: 100px;
  background-color: black;
  font-family: "Manrope", sans-serif;
  @media (max-width: ${TABLET_BREAKPOINT}) {
    padding: 0 32px;
    height: 70px;
    position: fixed;
  }
`

export const NavInner = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  margin: 0 128px;
`

export const InteralLinkContainer = styled.div`
  display: flex;
  width: auto;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-left: 200px;
  @media (max-width: ${TABLET_BREAKPOINT}) {
    display: ${({ displayLinks }) => (displayLinks ? "flex" : "none")};
    position: fixed;
    top: 70px;
    background-color: purple;
    width: 100vw;
    margin: 0 -32px;
    flex-direction: column;
    * {
      margin-bottom: 16px;
    }
  }
`

export const InternalLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 24px;
  font-weight: bold;
  margin: 0 16px;
  @media (max-width: ${TABLET_BREAKPOINT}) {
    font-size: 18px;
  }
`

export const HeaderLink = styled(InternalLink)`
  font-size: 32px;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${TABLET_BREAKPOINT}) {
    font-size: 24px;
  }
`

export const Line = styled.div`
  width: 22px;
  height: 2px;
  background-color: white;
  margin: 3px 0;
  ${({ active, top }) =>
    active
      ? css`
          transform: rotate(${top && "-"}45deg);
          position: absolute;
          top: 32;
        `
      : null}
`

export const BurgerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  width: 60%;
  @media (min-width: ${TABLET_BREAKPOINT}) {
    display: none;
  }
`
