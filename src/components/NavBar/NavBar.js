import React, { useState } from "react"
import PropTypes from "prop-types"

import {
  NavContainer,
  NavInner,
  InteralLinkContainer,
  InternalLink,
  HeaderLink,
  Line,
  BurgerContainer,
} from "./style"

const BurgerMenu = ({ active, handleClick }) => (
  <BurgerContainer onClick={handleClick}>
    <Line active={active} top />
    <Line active={active} />
  </BurgerContainer>
)

export const NavBar = ({ siteTitle }) => {
  const [displayLinks, setDisplayLinks] = useState(false)
  return (
    <NavContainer>
      <NavInner>
        <HeaderLink to="">{siteTitle}</HeaderLink>
        <InteralLinkContainer displayLinks={displayLinks}>
          <InternalLink to="about">About</InternalLink>
          <InternalLink to="archive">Archive</InternalLink>
        </InteralLinkContainer>
        <BurgerMenu
          active={displayLinks}
          handleClick={() => setDisplayLinks(!displayLinks)}
        />
      </NavInner>
    </NavContainer>
  )
}

NavBar.propTypes = {
  siteTitle: PropTypes.string,
}

NavBar.defaultProps = {
  siteTitle: ``,
}
