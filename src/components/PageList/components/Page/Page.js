import React from "react"
import { RichText } from "prismic-reactjs"

import { Container, Text, Image } from "./style"

export const Page = ({ pageRefs, uid, url, title }) => {
  return (
    <Container
      ref={el => {
        // TODO: add an associated id key for each images offsetTop once gql integrated
        // HMMm: is this needed anymore???
        pageRefs[uid] = el
      }}
    >
      <Image src={url} />
      <Text>{RichText.asText(title)}</Text>
    </Container>
  )
}
