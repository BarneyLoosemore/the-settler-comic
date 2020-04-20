import React from "react"
import styled from "styled-components"

import { Layout } from "../components/Layout"
import { SEO } from "../components/SEO"

const ErrorText = styled.div`
  text-align: center;
  font-size: 20px;
  width: 100%;
  margin: 32px 0;
`
const ErrorHeader = styled(ErrorText)`
  font-size: 32px;
  font-weight: bold;
`

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <ErrorHeader>NOT FOUND</ErrorHeader>
    <ErrorText>
      You just hit a route that doesn&#39;t exist... the sadness.
    </ErrorText>
  </Layout>
)

export default NotFoundPage
