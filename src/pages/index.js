import React, { useRef, useEffect, useState, useContext } from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import { Layout } from "../components/Layout"
// import Image from "../components/image"
import { SEO } from "../components/seo"
import { scrollToPage } from "../utils/scroll"
import { PageList } from "../components/PageList"

const isBrowser = typeof window !== "undefined"

const DEFAULT_IMAGES = [
  "https://scontent-lhr8-1.xx.fbcdn.net/v/t1.15752-9/s2048x2048/90737257_540133976704174_4751183167472271360_n.jpg?_nc_cat=107&_nc_sid=b96e70&_nc_ohc=xAvlchkkzl8AX9gnoYg&_nc_ht=scontent-lhr8-1.xx&_nc_tp=7&oh=2d7ee27899812fb0dac17b6d31cf4e22&oe=5EA1007F",
  "https://scontent-lhr8-1.xx.fbcdn.net/v/t1.15752-9/p1080x2048/90744482_567665480506784_182439683769237504_n.jpg?_nc_cat=101&_nc_sid=b96e70&_nc_ohc=h5ARr_z71pQAX88gqn2&_nc_ht=scontent-lhr8-1.xx&_nc_tp=6&oh=fac2c6867713f46a5115475c658e3c6a&oe=5EA414BF",
  "https://scontent-lhr8-1.xx.fbcdn.net/v/t1.15752-9/p1080x2048/90938547_2385848888183834_474504701212098560_n.jpg?_nc_cat=107&_nc_sid=b96e70&_nc_ohc=ax21ZXPy-5IAX-V_D6q&_nc_ht=scontent-lhr8-1.xx&_nc_tp=6&oh=bb62785794c2c1083335f6a6ddb1cc43&oe=5EA3ED3F",
]

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

const IndexPage = ({ location, data }) => {
  const [images, setImages] = useState(null)

  const {
    prismic: {
      allPages: { edges: pages },
    },
  } = data

  console.log(pages)
  // temp..
  useEffect(() => {
    console.log(location)
    setImages(DEFAULT_IMAGES)
  }, [])

  return (
    <Layout>
      <SEO name="index" />
      {/* TODO: add a fallback here in the event of there being no pages (maybe a 404?) */}
      {pages ? <PageList location={location} pages={pages} /> : null}
    </Layout>
  )
}

export default IndexPage
