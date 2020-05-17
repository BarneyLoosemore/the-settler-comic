import React, { useRef } from "react"
import PropTypes from "prop-types"

import { Container, Text, PageImage } from "./style"

export const Page = ({ pageRefs, number, url, title }) => {
  const ref = useRef(null)

  return (
    <Container
      ref={el => {
        pageRefs[number] = el
      }}
    >
      <PageImage
        src={url}
        ref={ref}
        landscape={
          ref &&
          ref.current &&
          ref.current.naturalWidth > ref.current.naturalHeight
        }
        loading="lazy"
      />
      <Text>{title}</Text>
    </Container>
  )
}

Page.propTypes = {
  pageRefs: PropTypes.array.isRequired,
  number: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}
