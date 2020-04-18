import React from "react"
import styled, { css } from "styled-components"

import { scrollTo, scrollToPage } from "../../../../utils/scroll"

export const PageNavigationModal = ({ pageRefs, activePage }) => {
  return (
    <Container>
      <div onClick={() => scrollTo(0)}>first</div>
      <div
        onClick={() => {
          if (activePage <= 1) return
          const prevPage = pageRefs[activePage - 1]
          scrollToPage(prevPage)
        }}
      >
        prev
      </div>
      <div>{activePage}</div>
      <div
        onClick={() => {
          if (activePage >= pageRefs.length - 1) return
          const nextPage = pageRefs[activePage + 1]
          scrollToPage(nextPage)
        }}
      >
        next
      </div>
      <div
        onClick={() => {
          const lastPage = pageRefs[pageRefs.length - 1]
          scrollToPage(lastPage)
        }}
      >
        last
      </div>
    </Container>
  )
}

const Container = styled.div`
  transform: translate(-50%, -50%);
  left: 50%;
  position: fixed;
  bottom: 25px;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  border-radius: 50px;
  padding: 5px 40px;
  opacity: 0.8;
  color: white;
  background-color: #1a1a1a;
  font-size: 35px;
  font-weight: bold;
  @media(max-width: 760px){
    padding 5px 12px;
    height: 60px;
    bottom: 0;
  }
  div {
    padding: 0 30px;
    :hover {
      cursor: pointer;
      opacity: 0.7;
    }
    @media(max-width: 760px){
      font-size: 14px;
      padding: 0 8px
    }
  }
  div:nth-child(3){
    font-size: 50px;
    @media(max-width: 760px){
      font-size: 18px;
    }
  }
}
`
