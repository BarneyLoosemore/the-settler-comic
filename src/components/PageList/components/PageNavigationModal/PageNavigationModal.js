import React from "react"
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa"

import { scrollTo, scrollToPage } from "../../../../utils/scroll"
import { Container, PageNav, PageNumber } from "./style"

export const PageNavigationModal = ({ pageRefs, activePage, visible }) => {
  return (
    <Container visible={visible}>
      <PageNav onClick={() => scrollTo(0)}>
        <FaAngleDoubleLeft color={activePage <= 1 && "grey"} size={40} />
      </PageNav>
      <PageNav
        onClick={() => {
          if (activePage <= 1) return
          const prevPage = pageRefs[activePage - 1]
          scrollToPage(prevPage)
        }}
      >
        <FaAngleLeft size={40} />
      </PageNav>
      <PageNumber>{activePage}</PageNumber>
      <PageNav
        onClick={() => {
          if (activePage >= pageRefs.length - 1) return
          const nextPage = pageRefs[activePage + 1]
          scrollToPage(nextPage)
        }}
      >
        <FaAngleRight size={40} />
      </PageNav>
      <PageNav
        onClick={() => {
          const lastPage = pageRefs[pageRefs.length - 1]
          scrollToPage(lastPage)
        }}
      >
        <FaAngleDoubleRight
          color={activePage === pageRefs.length - 1 && "grey"}
          size={40}
        />
      </PageNav>
    </Container>
  )
}
