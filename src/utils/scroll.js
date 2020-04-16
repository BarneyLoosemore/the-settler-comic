export const getOffset = element => {
  if (!element) return 0
  return getOffset(element.offsetParent) + element.offsetTop
}

export const scrollTo = pos => {
  if (typeof window === "undefined") return
  window.scrollTo({ top: pos, behavior: "smooth" })
}

export const scrollToPage = el => {
  if (typeof window === "undefined") return
  const { offsetTop, offsetHeight } = el
  const elVerticalCenter = offsetHeight / 2
  const centerOffset = offsetTop - (window.innerHeight / 2 - elVerticalCenter)
  scrollTo(centerOffset)
}
