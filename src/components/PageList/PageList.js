import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import throttle from "lodash/throttle"

import { scrollToPage, getOffset } from "../../utils/scroll"
import { isBrowser } from "../../utils/browser"

import { PageNavigationModal } from "./components/PageNavigationModal"
import { Page } from "./components/Page"
import { Container, IssueText } from "./style"

export const PageList = ({ pages, location, issueNumber }) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // NOTE: Object.keys() hack required as uid keys in pageRefs object make it array-like (0:empty k:v pair & so length of 4)
    if (isBrowser && Object.keys(pageRefs).length === pages.length) {
      const pageOffsets = pageRefs
        .filter(page => page)
        .map(page => {
          return { offsetTop: getOffset(page), offsetHeight: page.offsetHeight }
        })

      localStorage.setItem("PageRefs", JSON.stringify(pageOffsets))
      window.addEventListener("scroll", handleScroll)
    }
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pageRefs, pages, handleScroll])

  const sortedPages = pages.sort((a, b) => a.pageNumber - b.pageNumber)

  return (
    <>
      <PageNavigationModal
        pageRefs={pageRefs}
        activePage={activePage}
        visible={pageNavVisible}
      />
      {issueNumber ? <IssueText>Issue {issueNumber}</IssueText> : null}
      <Container>
        {sortedPages.map(({ pageNumber, title, content }) => (
          <Page
            key={`page-${pageNumber}`}
            number={pageNumber}
            pageRefs={pageRefs}
            title={title}
            url={content}
          />
        ))}
      </Container>
    </>
  )
}

PageList.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      issueNumber: PropTypes.string.isRequired,
      pageNumber: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  location: PropTypes.shape({}),
  issueNumber: PropTypes.string,
}
