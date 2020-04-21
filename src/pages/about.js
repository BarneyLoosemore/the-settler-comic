import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { RichText } from "prismic-reactjs"

import { Layout } from "../components/Layout"
import { SEO } from "../components/SEO"
import { TABLET_BREAKPOINT } from "../utils/style"

export const query = graphql`
  {
    prismic {
      allAbouts {
        edges {
          node {
            content
          }
        }
      }
    }
  }
`

const Container = styled.div`
  max-width: 682px;
  margin: 0 auto;
  padding-top: 48px;
  @media (max-width: ${TABLET_BREAKPOINT}) {
    padding-top: 32px;
    margin: 0 32px;
  }
`

const Title = styled.div`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
`

const AboutPage = ({ data }) => {
  const {
    prismic: {
      allAbouts: {
        edges: [
          {
            node: { content },
          },
        ],
      },
    },
  } = data

  return (
    <Layout>
      <SEO title="about" />
      <Container>
        <Title>About</Title>
        <RichText render={content} />
      </Container>
    </Layout>
  )
}

export default AboutPage
