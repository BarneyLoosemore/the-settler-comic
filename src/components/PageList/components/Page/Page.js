import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

import { PageImage } from "./style"

export const Page = ({ pageRefs, number, url }) => {
  const [landscape, setLandscape] = useState(null)

  useEffect(() => {
    pageRefs[number].naturalWidth > pageRefs[number].naturalHeight
      ? setLandscape(true)
      : setLandscape(false)
  }, [pageRefs[number]])

  return (
    <PageImage
      src={url}
      ref={el => {
        pageRefs[number] = el
      }}
      landscape={landscape}
      loading="lazy"
    />
  )
}

Page.propTypes = {
  pageRefs: PropTypes.array.isRequired,
  number: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}
