import React, { useRef, useEffect, useState, useContext } from "react"
import { Link } from "gatsby"

import { Layout } from "../components/Layout"
// import Image from "../components/image"
import { SEO } from "../components/seo"
import "./index.css"
import { scrollToPage } from "../utils/scroll"

const isBrowser = typeof window !== "undefined"

const DEFAULT_IMAGES = [
  "https://scontent-lhr8-1.xx.fbcdn.net/v/t1.15752-9/s2048x2048/90737257_540133976704174_4751183167472271360_n.jpg?_nc_cat=107&_nc_sid=b96e70&_nc_ohc=xAvlchkkzl8AX9gnoYg&_nc_ht=scontent-lhr8-1.xx&_nc_tp=7&oh=2d7ee27899812fb0dac17b6d31cf4e22&oe=5EA1007F",
  "https://scontent-lhr8-1.xx.fbcdn.net/v/t1.15752-9/p1080x2048/90744482_567665480506784_182439683769237504_n.jpg?_nc_cat=101&_nc_sid=b96e70&_nc_ohc=h5ARr_z71pQAX88gqn2&_nc_ht=scontent-lhr8-1.xx&_nc_tp=6&oh=fac2c6867713f46a5115475c658e3c6a&oe=5EA414BF",
  "https://scontent-lhr8-1.xx.fbcdn.net/v/t1.15752-9/p1080x2048/90938547_2385848888183834_474504701212098560_n.jpg?_nc_cat=107&_nc_sid=b96e70&_nc_ohc=ax21ZXPy-5IAX-V_D6q&_nc_ht=scontent-lhr8-1.xx&_nc_tp=6&oh=bb62785794c2c1083335f6a6ddb1cc43&oe=5EA3ED3F",
]

const ImageList = ({ images }) => {
  const pageRefs = []

  useEffect(() => {
    if (!isBrowser) {
      return null
    }
    if (JSON.parse(localStorage.getItem("CurrentPage"))) {
      scrollToPage(JSON.parse(localStorage.getItem("CurrentPage")).offsetTop)
    } else {
      const firstPage = pageRefs[0]
      localStorage.setItem(
        "CurrentPage",
        JSON.stringify({
          offsetTop: firstPage.offsetTop,
          offsetBottom: firstPage.offsetTop + firstPage.offsetHeight,
        })
      )
    }

    const handleScroll = () => {
      const currentPage = JSON.parse(localStorage.getItem("CurrentPage"))
      if (currentPage && pageRefs[0]) {
        if (
          window.pageYOffset + window.outerHeight <
          currentPage.offsetBottom
        ) {
          const prevPage =
            currentPage.index !== 0
              ? pageRefs[currentPage.index - 1]
              : currentPage
          console.log({ currentPage, pageRefs })
          localStorage.setItem(
            "CurrentPage",
            JSON.stringify({
              index: currentPage.index - 1,
              offsetTop: prevPage.offsetTop,
              offsetBottom: prevPage.offsetTop + prevPage.offsetHeight,
            })
          )
        }
        if (window.pageYOffset > currentPage.offsetTop) {
          const nextPage =
            currentPage.index !== pageRefs.length - 1
              ? pageRefs[currentPage.index + 1]
              : currentPage

          localStorage.setItem(
            "CurrentPage",
            JSON.stringify({
              index: currentPage.index + 1,
              offsetTop: nextPage.offsetTop,
              offsetBottom: nextPage.offsetTop + nextPage.offsetHeight,
            })
          )
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    if (isBrowser && pageRefs.length === images.length) {
      const imageOffsets = pageRefs.map(i => i.offsetTop)
      localStorage.setItem("PageRefs", JSON.stringify(imageOffsets))
    }
  }, [pageRefs, images])

  return (
    <div>
      {images.map((_, index) => (
        <div
          key={index}
          onClick={() => {
            const el = pageRefs[index]
            scrollToPage(el.offsetTop)
            isBrowser &&
              localStorage.setItem(
                "CurrentPage",
                JSON.stringify({
                  index,
                  offsetTop: el.offsetTop,
                  offsetBottom: el.offsetTop + el.offsetHeight,
                })
              )
          }}
          className="link"
        >
          {index}
        </div>
      ))}

      {images.map((image, index) => (
        <img
          ref={el => {
            // TODO: add an associated id key for each images offsetTop once gql integrated
            pageRefs[index] = el
          }}
          key={index}
          src={image}
        />
      ))}
    </div>
  )
}

const IndexPage = ({ location }) => {
  const [images, setImages] = useState(null)

  // temp..
  useEffect(() => {
    console.log(location)
    scrollToPage(location.state.page)
    setImages(DEFAULT_IMAGES)
  }, [])

  // typeof window !== "undefined" && scrollToRef(currentPageRef)

  return (
    <Layout>
      <SEO name="index" />
      {images ? <ImageList images={images} /> : null}
    </Layout>
  )
}

export default IndexPage
