import React, { useState } from "react"
import PropTypes from "prop-types"
import { FaTwitter, FaInstagram } from "react-icons/fa"
import { BsFillPersonFill } from "react-icons/bs"

import headerImage from "../../images/the-settler-title.png"

import {
  NavContainer,
  LinkContainer,
  InternalLink,
  ExternalLink,
  HeaderLink,
  Line,
  BurgerContainer,
  HeaderImage,
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
      <HeaderLink to="" css="max-width: 300px;">
        <HeaderImage src={headerImage} />
      </HeaderLink>
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
        <ExternalLink href="https://www.instagram.com/fennertoorac">
          <FaInstagram color="white" size={30} />
        </ExternalLink>
        <ExternalLink href="https://twitter.com/conorft">
          <FaTwitter color="white" size={30} />
        </ExternalLink>
        <ExternalLink href="https://ko-fi.com/fennertoorac">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
            width="2em"
            height="2em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734c4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09c-.443-.441-3.368-3.049-4.034-3.954c-.709-.965-1.041-2.7-.091-3.71c.951-1.01 3.005-1.086 4.363.407c0 0 1.565-1.782 3.468-.963c1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z"
              fill="white"
            />
          </svg>
        </ExternalLink>
        <ExternalLink href="https://conorft.myportfolio.com/home">
          <BsFillPersonFill color="white" size={30} />
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
