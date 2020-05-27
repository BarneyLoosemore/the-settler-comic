module.exports = {
  siteMetadata: {
    title: `Conor webcomic`,
    description: ``,
    author: `Barney Loosemore`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon-32x32.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-prismic-graphql",
      options: {
        repositoryName: "conorwebcomic", // (REQUIRED, replace with your own)
        // accessToken: "##########", // (optional API access token)
        path: "/preview", // (optional preview path. Default: /preview)
        previews: true, // (optional, activated Previews. Default: false)
        pages: [
          {
            // optional
            type: "Issue", // TypeName from prismic
            match: "/issue/:uid", // pages will be generated under this pattern
            path: "/issue", // optional path for unpublished documents
            component: require.resolve("./src/templates/issue.js"),
          },
        ],
      },
    },
    { resolve: `gatsby-plugin-styled-components` },
  ],
}
