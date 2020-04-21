import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import { Layout } from "../components/Layout"
import { SEO } from "../components/SEO"
import { TABLET_BREAKPOINT } from "../utils/style"

const Container = styled.div`
  @media (min-width: ${TABLET_BREAKPOINT}) {
    padding: 48px 64px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }
  @media (max-width: ${TABLET_BREAKPOINT}) {
    margin-top: 32px;
    padding-left: 16px;
    white-space: nowrap;
    overflow: auto;
  }
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`
const Image = styled.img`
  opacity: ${({ offset }) => offset};
  border-radius: 8px;
  @media (max-width: ${TABLET_BREAKPOINT}) {
    width: 90%;
  }
`

const ChapterLink = styled(Link)`
  @media (min-width: ${TABLET_BREAKPOINT}) {
    margin: 14px 18px;
    flex: 1 0 25%;
    transition: opacity 0.15s ease-in-out;
    :hover {
      opacity: 0.7;
      cursor: pointer;
    }
  }
  @media (max-width: ${TABLET_BREAKPOINT}) {
    padding-right: 16px;
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

const images = [
  "https://images.prismic.io/conorwebcomic/e6729de5-32f9-4f2b-af77-5c21b1b78047_Page2.jpg?auto=compress,format",
  "https://images.prismic.io/conorwebcomic/e6729de5-32f9-4f2b-af77-5c21b1b78047_Page2.jpg?auto=compress,format",
  "https://images.prismic.io/conorwebcomic/e6729de5-32f9-4f2b-af77-5c21b1b78047_Page2.jpg?auto=compress,format",
  "https://images.prismic.io/conorwebcomic/e6729de5-32f9-4f2b-af77-5c21b1b78047_Page2.jpg?auto=compress,format",
  "https://images.prismic.io/conorwebcomic/e6729de5-32f9-4f2b-af77-5c21b1b78047_Page2.jpg?auto=compress,format",
  "https://images.prismic.io/conorwebcomic/e6729de5-32f9-4f2b-af77-5c21b1b78047_Page2.jpg?auto=compress,format",
]

const Index = ({ data }) => {
  const pageRefs = JSON.parse(localStorage.getItem("PageRefs"))
  const {
    prismic: {
      allPages: { edges: pages },
    },
  } = data

  const urls = [...pages, ...pages].map(p => p.node.page_content.url)
  return (
    <Layout>
      <SEO name="index" />
      <Container>
        {images.map((url, index) => (
          // TODO: index here is temp - the page number is set in Prismic for the chapter in Q
          <ChapterLink
            to="comic"
            state={{ page: pageRefs ? pageRefs[index] : null }}
          >
            <Image src={url} offset={1 - Number(`0.${index}`)} />
          </ChapterLink>
        ))}
      </Container>
    </Layout>
  )
}

export default Index
