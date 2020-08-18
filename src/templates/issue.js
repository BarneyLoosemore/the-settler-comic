import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import * as R from "ramda"

import { Layout } from "../components/Layout"
import { SEO } from "../components/SEO"
import { PageList } from "../components/PageList"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { getPrismicText } from "../utils/prismic"

export const query = graphql`
  query PageQuery($uid: String) {
    prismic {
      allPages(where: { issue_number_fulltext: $uid }) {
        edges {
          node {
            issueNumber: issue_number
            pageNumber: page_number
            title: page_title
            content: page_content
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

const additionalQuery = graphql`
  query AdditionalPagesQuery($uid: String, $after: String) {
    prismic {
      allPages(where: { issue_number_fulltext: $uid }, after: $after) {
        edges {
          node {
            issueNumber: issue_number
            pageNumber: page_number
            title: page_title
            content: page_content
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

const Issue = ({ location, pageContext: { uid }, prismic }) => {
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

  const formattedPages = pages.map(
    ({ issueNumber, pageNumber, title, content: { url } }) => ({
      issueNumber: getPrismicText(issueNumber),
      pageNumber: getPrismicText(pageNumber),
      title: getPrismicText(title),
      content: url,
    })
  )

  const uniqueFormattedPages = R.uniqBy(R.prop("pageNumber"), formattedPages)

  return (
    <Layout>
      <SEO title={`Issue ${uid}`} />
      {!fetchComplete ? (
        <LoadingSpinner />
      ) : uniqueFormattedPages && uniqueFormattedPages.length > 0 ? (
        <PageList
          location={location}
          pages={uniqueFormattedPages}
          issueNumber={uid}
        />
      ) : (
        <h1
          style={{
            textAlign: "center",
            marginTop: 64,
            fontWeight: 400,
            color: "#1a1a1a",
          }}
        >
          Coming soon!
        </h1>
      )}
    </Layout>
  )
}

Issue.propTypes = {
  location: PropTypes.shape({}),
  pageContext: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
  prismic: PropTypes.shape({}).isRequired,
}

export default Issue
