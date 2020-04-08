export const scrollToPage = (offsetTop = 0) =>
  typeof window !== "undefined" && window.scrollTo({ top: offsetTop })
