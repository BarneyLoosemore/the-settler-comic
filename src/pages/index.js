import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link, graphql } from "gatsby"

import { Layout } from "../components/Layout"
import { SEO } from "../components/SEO"
import { TABLET_BREAKPOINT } from "../utils/style"
import { getIssues, getPrismicText } from "../utils/prismic"

const Container = styled.div`
  margin-top: 3vh;
  padding-left: 16px;
  padding-bottom: 64px;
  white-space: nowrap;
  overflow: auto;
  overflow: auto;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: ${TABLET_BREAKPOINT}) {
    padding: 0 64px;
  }
`

const Title = styled.h1`
  @media (max-width: ${TABLET_BREAKPOINT}) {
    margin: 2vh 16px;
    font-size: 24px;
  }
  @media (min-width: ${TABLET_BREAKPOINT}) {
    text-align: center;
    margin-top: 48px;
    margin-bottom: 40px;
    font-size: 32px;
  }
`

const Image = styled.img`
  border-radius: 8px;
  background-color: #f1f1f1;
  width: 25%;
  @media (max-width: ${TABLET_BREAKPOINT}) {
    width: 90%;
  }
`

const IssueLink = styled(Link)`
  padding-right: 16px;
  @media (min-width: ${TABLET_BREAKPOINT}) {
    margin: 0 2px;
    transition: opacity 0.15s ease-in-out;
    :hover {
      opacity: 0.7;
      cursor: pointer;
    }
  }
`

export const query = graphql`
  {
    prismic {
      allIssues {
        edges {
          node {
            _meta {
              uid
            }
            cover: issue_cover
            title: issue_title
          }
        }
      }
    }
  }
`

const Index = ({ data }) => {
  const issues = getIssues(data)
    .sort((a, b) => a._meta.uid - b._meta.uid)
    .map(({ _meta: { uid }, cover: { url }, title }) => ({
      id: Number(uid),
      url,
      title: getPrismicText(title),
    }))

  return (
    <Layout>
      <SEO name="index" />
      <Title>Issues</Title>

      <Container>
        {issues.map(({ id, url, title }) => (
          <IssueLink key={id} to={`/issue/${id}`}>
            <Image src={url} />
          </IssueLink>
        ))}
      </Container>
    </Layout>
  )
}

Index.propTypes = {
  data: PropTypes.shape({}),
}

export default Index
