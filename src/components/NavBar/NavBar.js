import React, { useState } from "react"
import PropTypes from "prop-types"
import { FaTwitter, FaInstagram } from "react-icons/fa"

import {
  NavContainer,
  LinkContainer,
  InternalLink,
  ExternalLink,
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
      <HeaderLink to="">{siteTitle}</HeaderLink>
      <LinkContainer displayLinks={displayLinks}>
        <InternalLink to="" activeStyle={{ color: "grey" }}>
          Issues
        </InternalLink>
        <InternalLink
          to="about"
          activeStyle={{ color: "grey" }}
          partiallyActive
        >
          About
        </InternalLink>
        <InternalLink
          to="archive"
          activeStyle={{ color: "grey" }}
          partiallyActive
        >
          Archive
        </InternalLink>
        <ExternalLink href="https://twitter.com/conorft">
          <FaTwitter color="white" size={30} />
        </ExternalLink>
        <ExternalLink href="https://twitter.com/conorft">
          <FaInstagram color="white" size={30} />
        </ExternalLink>
      </LinkContainer>
      <BurgerMenu
        active={displayLinks}
        handleClick={() => setDisplayLinks(!displayLinks)}
      />
    </NavContainer>
  )
}

NavBar.propTypes = {
  siteTitle: PropTypes.string,
}

NavBar.defaultProps = {
  siteTitle: `Conor's webcomic`,
}
