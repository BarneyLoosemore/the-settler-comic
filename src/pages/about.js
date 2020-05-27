import React from "react"
import PropTypes from "prop-types"
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
  text-align: center;
  @media (max-width: ${TABLET_BREAKPOINT}) {
    padding-top: 32px;
    margin: 0 32px;
  }
`

const Title = styled.div`
  font-size: 32px;
  font-weight: bold;
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
      <SEO title="About" />
      <Container>
        <Title>About</Title>
        <div style={{ textAlign: "left", fontSize: 18 }}>
          <RichText render={content} />
        </div>
      </Container>
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.shape({}),
}

export default AboutPage
