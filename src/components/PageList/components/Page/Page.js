import React from "react"
import { RichText } from "prismic-reactjs"

import { Container, Text, PageImage } from "./style"

export const Page = ({ pageRefs, uid, url, title }) => {
  const img = new Image()
  img.src = url
  const landscape = img.width > img.height
  return (
    <Container
      ref={el => {
        // TODO: add an associated id key for each images offsetTop once gql integrated
        // HMMm: is this needed anymore???
        pageRefs[uid] = el
      }}
    >
      <PageImage src={url} landscape={landscape} />
      <Text>{RichText.asText(title)}</Text>
    </Container>
  )
}
