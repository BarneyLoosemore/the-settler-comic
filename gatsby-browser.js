const { registerLinkResolver } = require("gatsby-source-prismic-graphql")
const { linkResolver } = require("./src/utils/linkResolver")
require("smoothscroll-polyfill").polyfill()

window.__forceSmoothScrollPolyfill__ = true

registerLinkResolver(linkResolver)
