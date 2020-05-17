import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { Layout } from "../components/Layout"
import { SEO } from "../components/SEO"
import { PageList } from "../components/PageList"
import { getPages, getPrismicText } from "../utils/prismic"

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
            _meta {
              uid
            }
          }
        }
      }
    }
  }
`

const Issue = ({ location, data, pageContext: { uid } }) => {
  const pages = getPages(data)

  const formattedPages = pages.map(
    ({ issueNumber, pageNumber, title, content: { url } }) => ({
      issueNumber: getPrismicText(issueNumber),
      pageNumber: getPrismicText(pageNumber),
      title: getPrismicText(title),
      content: url,
    })
  )

  return (
    <Layout>
      <SEO name={`issue-${uid}`} />
      {formattedPages && formattedPages.length > 0 ? (
        <PageList
          location={location}
          pages={formattedPages}
          issueNumber={uid}
        />
      ) : (
        <h1 style={{ textAlign: "center", marginTop: 64 }}>Coming soon!</h1>
      )}
    </Layout>
  )
}

Issue.propTypes = {
  location: PropTypes.shape({}),
  data: PropTypes.shape({}),
  pageContext: PropTypes.shape({
    uid: PropTypes.string,
  }),
}

export default Issue
