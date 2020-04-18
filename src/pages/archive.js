import React from "react"
import { Link, navigate, graphql } from "gatsby"
import { RichText } from "prismic-reactjs"

import { Layout } from "../components/Layout"
import { SEO } from "../components/SEO"
import { scrollToPage } from "../utils/scroll"

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

const SecondPage = ({ data }) => {
  const pageRefs = JSON.parse(localStorage.getItem("PageRefs"))

  const {
    prismic: {
      allPages: { edges: pages },
    },
  } = data

  const sortedPages = pages.sort((a, b) => a.node._meta.uid - b.node._meta.uid)

  console.log(sortedPages)
  return (
    <Layout>
      <SEO title="Page two" />
      <div
        style={{ display: "flex", flexDirection: "column", height: "200px" }}
      >
        {sortedPages.map(({ node: { page_title: title, _meta: { uid } } }) => (
          <Link
            key={uid}
            to="/"
            state={{ page: pageRefs ? pageRefs[uid] : null }}
          >
            {RichText.asText(title)}
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export default SecondPage
