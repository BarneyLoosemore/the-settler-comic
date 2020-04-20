import React, { useEffect, useState } from "react"
import throttle from "lodash/throttle"

import { scrollTo, scrollToPage, getOffset } from "../../utils/scroll"
import { isBrowser } from "../../utils/browser"
import { PageNavigationModal } from "./components/PageNavigationModal"
import { Page } from "./components/Page"

import { Container } from "./style"

export const PageList = ({ pages, location }) => {
  const pageRefs = []
  const [activePage, setActivePage] = useState(1)
  const [pageNavVisible, setPageNavVisible] = useState(false)

  const handleScroll = throttle(e => {
    const meanScrollPos = window.scrollY + window.innerHeight / 2
    pageRefs.forEach((page, index) => {
      if (!page) return
      const offsetTop = getOffset(page)
      const offsetBottom = offsetTop + page.offsetHeight

      if (offsetTop < meanScrollPos && meanScrollPos < offsetBottom) {
        setActivePage(index)
      }
    })
    if (!pageNavVisible) {
      setPageNavVisible(true)
      setTimeout(() => setPageNavVisible(false), 2000)
    }
  }, 150)

  useEffect(() => {
    location.action === "PUSH" &&
      location.state &&
      location.state.page &&
      scrollToPage(location.state.page)
  }, [])

  useEffect(() => {
    // NOTE: Object.keys() hack required as uid keys in pageRefs object make it array-like (0:empty k:v pair & so length of 4)
    if (isBrowser && Object.keys(pageRefs).length === pages.length) {
      const pageOffsets = pageRefs.map(page => {
        if (page)
          return {
            offsetTop: getOffset(page),
            offsetHeight: page.offsetHeight,
          }
      })
      localStorage.setItem("PageRefs", JSON.stringify(pageOffsets))
      window.addEventListener("scroll", handleScroll)
    }
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pageRefs, pages])

  const sortedPages = pages.sort((a, b) => a.node._meta.uid - b.node._meta.uid)

  return (
    <>
      <PageNavigationModal
        pageRefs={pageRefs}
        activePage={activePage}
        visible={pageNavVisible}
      />
      <Container>
        {sortedPages.map(
          ({
            node: {
              page_title: title,
              page_content: { url },
              _meta: { uid },
            },
          }) => (
            <Page
              key={uid}
              uid={uid}
              pageRefs={pageRefs}
              url={url}
              title={title}
            />
          )
        )}
      </Container>
    </>
  )
}
