import React, { useEffect, useState } from "react"
import styled, { css } from "styled-components"
import { RichText } from "prismic-reactjs"
import _ from "lodash"

import { scrollTo, scrollToPage, getOffset } from "../utils/scroll"
import { isBrowser } from "../utils/browser"

const ImageContainer = styled.div`
  position: relative;
  :hover {
    img {
      filter: brightness(45%);
      transition: filter 0.2s ease-in-out;
    }
    div {
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

const PageNavigationModal = styled.div`
  position: fixed;
  bottom: 25px;
  left: 25px;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  border-radius: 50px;
  padding: 5px 40px;
  opacity: 0.6;
  color: white;
  background-color: black;
  font-size: 35px;
  font-family: arial;
  font-weight: bold;
  div {
    padding: 0 30px;
    :hover {
      cursor: pointer;
      opacity: 0.7;
    }
  }
  div:nth-child(3){
    font-size: 50px;
  }
}
`

export const PageList = ({ pages, location }) => {
  const pageRefs = []
  const [active, setActive] = useState(1)

  const handleScroll = _.throttle(() => {
    const meanScrollPos = window.scrollY + window.innerHeight / 2
    pageRefs.forEach((p, index) => {
      if (!p) return
      const offsetTop = getOffset(p)
      const offsetBottom = offsetTop + p.offsetHeight

      if (offsetTop < meanScrollPos && meanScrollPos < offsetBottom) {
        setActive(index)
      }
    })
  }, 150)

  useEffect(() => {
    console.log(location.state.page)
    location.action === "PUSH" &&
      location.state &&
      location.state.page &&
      scrollToPage(location.state.page)
  }, [])

  useEffect(() => {
    // NOTE: Object.keys() hack required as uid keys in pageRefs object make it array-like (0:empty k:v pair & so length of 4)
    if (isBrowser && Object.keys(pageRefs).length === pages.length) {
      const pageOffsets = pageRefs.map(
        p =>
          p && {
            offsetTop: getOffset(p),
            offsetHeight: p.offsetHeight,
          }
      )
      localStorage.setItem("PageRefs", JSON.stringify(pageOffsets))
      window.addEventListener("scroll", handleScroll)
    }
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pageRefs, pages])

  const sortedPages = pages.sort((a, b) => a.node._meta.uid - b.node._meta.uid)

  return (
    <>
      {sortedPages.map(({ node: { page_title: title, _meta: { uid } } }) => (
        <PageLink
          key={uid}
          onClick={() => {
            const el = pageRefs[uid]
            scrollToPage(el)
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

      <PageNavigationModal>
        <div onClick={() => scrollTo(0)}>first</div>
        <div
          onClick={() => {
            if (active <= 1) return
            const prevPage = pageRefs[active - 1]
            scrollToPage(prevPage)
          }}
        >
          prev
        </div>
        <div>{active}</div>
        <div
          onClick={() => {
            if (active >= pageRefs.length - 1) return
            const nextPage = pageRefs[active + 1]
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
      </PageNavigationModal>

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
