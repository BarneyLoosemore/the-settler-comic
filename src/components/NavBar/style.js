import styled, { css } from "styled-components"
import { Link } from "gatsby"

import { TABLET_BREAKPOINT } from "../../utils/style"

export const NavContainer = styled.div`
  z-index: 999;
  display: flex;
  align-items: center;
  height: 100px;
  background: linear-gradient(180.96deg, #3b4953 -120.95%, #0e0e13 99.18%);
  padding: 0 48px;
  font-family: "Manrope", sans-serif;
  @media (max-width: ${TABLET_BREAKPOINT}) {
    padding: 0;
    width: 100%;
    height: 70px;
    position: fixed;
    opacity: 0.97;
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
    ${({ displayLinks }) =>
      displayLinks
        ? css`
            transform: translateY(0);
            opacity: 1;
            border-top: 2px solid white;
            pointer-events: all;
          `
        : css`
            transform: translateY(-30px);
            opacity: 0;
            border-top: none;
            pointer-events: none;
          `}
    transition: all 0.2s ease-in-out;
    position: fixed;
    top: 70px;
    padding-top: 16px;
    background-color: #17171f;
    flex-direction: column;
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
  transition: opacity 0.15s;
  :hover {
    opacity: 0.7;
  }
`

export const HeaderLink = styled(InternalLink)`
  max-width: 300px;
  @media (max-width: ${TABLET_BREAKPOINT}) {
    max-width: 150px;
  }
`

export const Line = styled.div`
  width: 22px;
  height: 2px;
  background-color: white;
  margin: 3px 0;
  transition: all 0.15s ease-in-out;
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
  z-index: 2;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  position: absolute;
  padding: 16px;
  right: 16px;
  :active {
    transition: all 0.15s ease-in-out;
    opacity: 0.6;
  }
  @media (min-width: ${TABLET_BREAKPOINT}) {
    display: none;
  }
`

export const HeaderImage = styled.img`
  transition: opacity 0.15s;
  :hover {
    opacity: 0.7;
  }
`
