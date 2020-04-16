import React, { useEffect, useState } from "react"
import styled, { css } from "styled-components"
import { RichText } from "prismic-reactjs"
import _ from "lodash"

import { scrollToPage } from "../utils/scroll"
import { isBrowser } from "../utils/browser"

const ImageContainer = styled.div`
  position: relative;
  :hover {
    & > img {
      filter: brightness(45%);
      transition: filter 0.2s ease-in-out;
    }
    & > div {
      opacity: 1 !important;
      transition: opacity 0.2s ease-in-out;
    }
  }
`

const ImageText = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 40px;
  font-family: arial;
  opacity: 0;
`

const PageLink = styled.div`
  font-size: 32px;
  text-align: center;
  padding: 16px;
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

const AdditionalNav = styled.div`
  height: 45px;
  background-color: white;
  position: fixed;
  width: 100%;
  display: flex;
  z-index: 9999;
  flex-direction: row;
  align-items: center;
  overflow: scroll;
`

const NavItem = styled.div`
  margin: 0 8px;
  font-weight: bold;
  font-family: arial;
  font-size: 14px;
  white-space: nowrap;
  padding: 4px 12px;
  border-radius: 20px;
  -webkit-transition: background-color 500ms ease-out;
  -moz-transition: background-color 500ms ease-out;
  -o-transition: background-color 500ms ease-out;
  transition: background-color 500ms ease-out;

  ${({ active }) =>
    active &&
    css`
      color: white;
      background-color: black;
    `};
`

export const PageList = ({ pages, location }) => {
  const [activePage, setActivePage] = useState(1)
  const pageRefs = []

  const getMeanOffset = el => {
    return el.offsetTop + el.offsetHeight / 2
  }

  const handleScroll = _.throttle(() => {
    const viewportMean = window.scrollY + window.innerHeight / 2
    pageRefs.map((p, index) => {
      if (p) {
        const offsetTop = p.offsetTop
        const offsetBottom = offsetTop + height
        if (offsetTop < viewportMean < offsetBottom) {
          setActivePage(index)
          console.log({ viewportMean, offsetTop, p, offsetBottom })
        }
      }
    })
  }, 250)

  useEffect(() => {
    // console.log(activePage)
  }, [activePage])

  useEffect(() => {
    location.action === "PUSH" && scrollToPage(location.state.page - 70)
  }, [])

  useEffect(() => {
    // Object.keys() hack required as uid keys in pageRefs object make it array-like (0:empty k:v pair & so length of 4)
    if (isBrowser && Object.keys(pageRefs).length === pages.length) {
      const pageOffsets = pageRefs.map(p => p && p.offsetTop)
      localStorage.setItem("PageRefs", JSON.stringify(pageOffsets))
      window.addEventListener("scroll", handleScroll)
    }
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pageRefs, pages])

  const sortedPages = pages.sort((a, b) => a.node._meta.uid - b.node._meta.uid)

  return (
    <>
      <AdditionalNav>
        {sortedPages.map(({ node: { page_title: title, _meta: { uid } } }) => (
          <NavItem
            active={Number(uid) === activePage}
            onClick={() => {
              setActivePage(uid)
              const el = pageRefs[uid]
              scrollToPage(el.offsetTop - 70)
            }}
          >
            {/* {console.log(uid)} */}
            {RichText.asText(title)}
          </NavItem>
        ))}
      </AdditionalNav>
      {sortedPages.map(({ node: { page_title: title, _meta: { uid } } }) => (
        <PageLink
          key={uid}
          onClick={() => {
            const el = pageRefs[uid]
            scrollToPage(el.offsetTop - 70)
            isBrowser &&
              localStorage.setItem(
                "CurrentPage",
                JSON.stringify({
                  uid,
                  offsetTop: el.offsetTop,
                  offsetBottom: el.offsetTop + el.offsetHeight,
                })
              )
          }}
        >
          <div style={{ fontSize: 24, fontFamily: "arial" }}>
            {RichText.asText(title)}
          </div>
        </PageLink>
      ))}

      {sortedPages.map(
        ({
          node: {
            page_title: title,
            page_content: { url },
            _meta: { uid },
          },
        }) => (
          <ImageContainer
            key={uid}
            ref={el => {
              // TODO: add an associated id key for each images offsetTop once gql integrated
              pageRefs[uid] = el
            }}
          >
            <img src={url} />
            <ImageText>{RichText.asText(title)}</ImageText>
          </ImageContainer>
        )
      )}
    </>
  )
}
