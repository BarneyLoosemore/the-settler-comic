import React from "react"
import { graphql } from "gatsby"

import { Layout } from "../components/Layout"
import { SEO } from "../components/SEO"
import { PageList } from "../components/PageList"

export const query = graphql`
  {
    prismic {
      allPages {
        edges {
          node {
            page_title
            page_content
            _meta {
              uid
            }
          }
        }
      }
    }
  }
`

const Comic = ({ location, data }) => {
  const {
    prismic: {
      allPages: { edges: pages },
    },
  } = data

  return (
    <Layout>
      <SEO name="comic" />
      {/* TODO: add a fallback here in the event of there being no pages (maybe a 404?) */}
      {pages ? <PageList location={location} pages={pages} /> : null}
    </Layout>
  )
}

export default Comic
