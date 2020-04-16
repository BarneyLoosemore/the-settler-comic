import React, { useState } from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import styled, { css } from "styled-components"

const TABLET_BREAKPOINT = "768px"

const NavContainer = styled.div`
  opacity: 0.9;
  z-index: 999;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100px;
  background-color: black;
  padding: 0 128px;
  @media (max-width: ${TABLET_BREAKPOINT}) {
    padding: 0 32px;
    height: 70px;
    position: fixed;
  }
`

const InteralLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 60%;
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

const InternalLink = styled(Link)`
  color: white;
  font-family: arial;
  text-decoration: none;
  font-size: 24px;
  font-weight: bold;
  @media (max-width: ${TABLET_BREAKPOINT}) {
    font-size: 18px;
  }
`

const HeaderLink = styled(InternalLink)`
  font-size: 32px;
  width: 40%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: ${TABLET_BREAKPOINT}) {
    font-size: 24px;
  }
`

const Line = styled.div`
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

const BurgerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  width: 60%;
  @media (min-width: ${TABLET_BREAKPOINT}) {
    display: none;
  }
`

const BurgerMenu = ({ active, handleClick }) => (
  <BurgerContainer onClick={handleClick}>
    <Line active={active} top />
    <Line active={active} />
  </BurgerContainer>
)

const Header = ({ siteTitle }) => {
  const [displayLinks, setDisplayLinks] = useState(false)
  return (
    <NavContainer>
      <HeaderLink to="">{siteTitle}</HeaderLink>
      <InteralLinkContainer displayLinks={displayLinks}>
        <InternalLink to="about">About</InternalLink>
        <InternalLink to="archive">Archive</InternalLink>
      </InteralLinkContainer>
      <BurgerMenu
        active={displayLinks}
        handleClick={() => setDisplayLinks(!displayLinks)}
      />
    </NavContainer>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
