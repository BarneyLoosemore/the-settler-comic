import React from "react"
import { Link, navigate, graphql } from "gatsby"
import styled from "styled-components"
import { RichText } from "prismic-reactjs"

import { Layout } from "../components/Layout"
import { SEO } from "../components/SEO"
import { scrollToPage } from "../utils/scroll"

const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
  padding-top: 40px;
`

const LinkContainer = styled.div`
  font-size: 24px;
  margin: 8px;
`

const PageLink = styled(Link)`
  text-decoration: none;
  color: #1a1a1a;
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
      <LinksContainer>
        {sortedPages.map(({ node: { page_title: title, _meta: { uid } } }) => (
          <LinkContainer key={uid}>
            <PageLink to="/" state={{ page: pageRefs ? pageRefs[uid] : null }}>
              {RichText.asText(title)}
            </PageLink>
          </LinkContainer>
        ))}
      </LinksContainer>
    </Layout>
  )
}

export default SecondPage
