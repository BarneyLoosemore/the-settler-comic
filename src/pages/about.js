import React from "react"
import { Link } from "gatsby"

import { Layout } from "../components/Layout"
import { SEO } from "../components/SEO"

const AboutPage = () => {
  console.log(JSON.parse(localStorage.getItem("PageRefs")))
  console.log(JSON.parse(localStorage.getItem("CurrentPage")))

  return (
    <Layout>
      <SEO title="about" />
      <h1>About</h1>
    </Layout>
  )
}

export default AboutPage
