import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

import { Layout } from "../components/Layout"
import { SEO } from "../components/SEO"

import { getPages, getPrismicText } from "../utils/prismic"
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

const Archive = ({ data }) => {
  const pageRefs =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("PageRefs"))
      : null

  const pages = getPages(data).map(({ title, pageNumber, issueNumber }) => {
    return {
      title: getPrismicText(title),
      pageNumber: getPrismicText(pageNumber),
      issueNumber: getPrismicText(issueNumber),
    }
  })

  const sortedPages = pages.sort(sortByPage).sort(sortByIssue)

  return (
    <Layout>
      <SEO title="Archive" />
      <LinksContainer>
        <div style={{ maxWidth: "300px", textAlign: "left" }}>
          {sortedPages.map(({ title, issueNumber, pageNumber }) => (
            <LinkContainer key={`${issueNumber}-${pageNumber}`}>
              <PageLink
                to={`/issue/${issueNumber}`}
                state={{ page: pageRefs ? pageRefs[pageNumber] : null }}
              >
                {title}
              </PageLink>
            </LinkContainer>
          ))}
        </div>
      </LinksContainer>
    </Layout>
  )
}

Archive.propTypes = {
  data: PropTypes.shape({}),
}

export default Archive
