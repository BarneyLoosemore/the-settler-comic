import React from "react"
import { Link, navigate } from "gatsby"

import { Layout } from "../components/Layout"
import { SEO } from "../components/SEO"
import { scrollToPage } from "../utils/scroll"

const SecondPage = () => {
  const pageRefs = JSON.parse(localStorage.getItem("PageRefs"))
  return (
    <Layout>
      <SEO title="Page two" />
      <div
        style={{ display: "flex", flexDirection: "column", height: "200px" }}
      >
        {pageRefs &&
          pageRefs.map((_, index) => (
            <Link to="/" state={{ page: pageRefs[index] }}>
              {index}
            </Link>
          ))}
      </div>
    </Layout>
  )
}

export default SecondPage
