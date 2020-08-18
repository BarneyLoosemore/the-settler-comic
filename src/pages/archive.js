import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import * as R from "ramda"

import { Layout } from "../components/Layout"
import { SEO } from "../components/SEO"
import { LoadingSpinner } from "../components/LoadingSpinner"

import { getPrismicText } from "../utils/prismic"
import { sortByPage, sortByIssue } from "../utils/sort"

const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
  padding: 40px 0;
`

const LinkContainer = styled.div`
  font-size: 24px;
  margin-bottom: 30px;
`

const PageLink = styled(Link)`
  text-decoration: none;
  color: #1a1a1a;
  padding-bottom: 8px;
  border-bottom: 1px solid #dedede;
  transition: opacity 0.15s ease-in-out;
  :hover {
    opacity: 0.7;
  }
`

export const query = graphql`
  {
    prismic {
      allPages {
        edges {
          node {
            title: page_title
            pageNumber: page_number
            issueNumber: issue_number
            _meta {
              uid
            }
          }
        }
      }
    }
  }
`

const additionalQuery = graphql`
  query AdditionalPagesQuery($after: String) {
    prismic {
      allPages(after: $after) {
        edges {
          node {
            title: page_title
            pageNumber: page_number
            issueNumber: issue_number
            _meta {
              uid
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`

const Archive = ({ prismic }) => {
  const [fetchComplete, setFetchComplete] = useState(false)
  const [pages, setPages] = useState([])

  useEffect(() => {
    if (!fetchComplete && prismic) {
      recursivelyQueryPages()
    }
  }, [])

  const recursivelyQueryPages = async (endCursor = "", prevPages = []) => {
    const { data } = await prismic.load({
      variables: { after: endCursor },
      query: additionalQuery,
    })

    const {
      edges,
      pageInfo: { hasNextPage, endCursor: nextEndCursor },
    } = data?.allPages

    const newPages = R.pluck("node")(edges)
    const pages = [...prevPages, ...newPages]

    if (hasNextPage) {
      recursivelyQueryPages(nextEndCursor, pages)
    } else {
      setPages(pages)
      setFetchComplete(true)
    }
  }

  const pageRefs =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("PageRefs"))
      : null

  const formattedPages = pages.map(({ title, pageNumber, issueNumber }) => {
    return {
      title: getPrismicText(title),
      pageNumber: getPrismicText(pageNumber),
      issueNumber: getPrismicText(issueNumber),
    }
  })

  const uniqueFormattedPages = R.uniqBy(R.prop("pageNumber"), formattedPages)

  const sortedPages = uniqueFormattedPages.sort(sortByPage).sort(sortByIssue)

  return (
    <Layout>
      <SEO title="Archive" />
      <LinksContainer>
        <div style={{ maxWidth: "300px", textAlign: "left" }}>
          {!fetchComplete ? (
            <LoadingSpinner />
          ) : (
            sortedPages.map(({ title, issueNumber, pageNumber }) => (
              <LinkContainer key={`${issueNumber}-${pageNumber}`}>
                <PageLink
                  to={`/issue/${issueNumber}`}
                  state={{ page: pageRefs ? pageRefs[pageNumber - 1] : null }}
                >
                  {title}
                </PageLink>
              </LinkContainer>
            ))
          )}
        </div>
      </LinksContainer>
    </Layout>
  )
}

Archive.propTypes = {
  prismic: PropTypes.shape({}).isRequired,
}

export default Archive
