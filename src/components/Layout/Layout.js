import React from "react"
import PropTypes from "prop-types"

import { NavBar } from "../NavBar"
import { GlobalStyle, Container, Footer } from "./style"

export const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&display=swap"
        rel="stylesheet"
      ></link>
      <NavBar siteTitle="Conor's webcomic" />
      <Container>
        <main>{children}</main>
        <Footer>© Conor Fenner-Toora 2020</Footer>
      </Container>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
