export const linkResolver = doc => {
  if (doc.type === "issue") {
    return `/issue/${doc.uid}`
  }
  return "/"
}
