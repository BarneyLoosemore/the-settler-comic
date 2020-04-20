import styled, { css } from "styled-components"
import { Link } from "gatsby"

import { TABLET_BREAKPOINT } from "../../utils/style"

export const NavContainer = styled.div`
  z-index: 999;
  display: flex;
  align-items: center;
  height: 100px;
  background-color: black;
  padding: 0 24px;
  font-family: "Manrope", sans-serif;
  @media (max-width: ${TABLET_BREAKPOINT}) {
    padding: 0;
    width: 100%;
    height: 70px;
    position: fixed;
    opacity: 0.95;
  }
`

export const LinkContainer = styled.div`
  display: flex;
  width: auto;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  @media (max-width: ${TABLET_BREAKPOINT}) {
    display: ${({ displayLinks }) => (displayLinks ? "flex" : "none")};
    position: fixed;
    top: 70px;
    padding-top: 16px;
    background-color: black;
    flex-direction: column;
    border-top: 2px solid white;
    a {
      padding-bottom: 16px;
    }
  }
`

export const InternalLink = styled(Link)`
  color: white;
  white-space: nowrap;
  text-decoration: none;
  font-size: 24px;
  font-weight: bold;
  margin: 0 16px;
  transition: color 0.2s;
  :hover {
    color: grey;
  }
  @media (max-width: ${TABLET_BREAKPOINT}) {
    font-size: 18px;
  }
`

export const ExternalLink = styled.a.attrs(() => ({
  target: "_blank",
  rel: "noopener noreferrer",
}))`
  display: flex;
  align-items: center;
  margin: 0 16px;
  transition: opacity 0.1s;
  :hover {
    opacity: 0.7;
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
  position: absolute;
  right: 32px;
  @media (min-width: ${TABLET_BREAKPOINT}) {
    display: none;
  }
`
