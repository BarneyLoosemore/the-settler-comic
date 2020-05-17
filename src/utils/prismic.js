import * as R from "ramda"

export const getPages = R.compose(
  R.pluck("node"),
  R.pathOr([], ["prismic", "allPages", "edges"])
)

export const getIssues = R.compose(
  R.pluck("node"),
  R.pathOr([], ["prismic", "allIssues", "edges"])
)

export const getPrismicText = R.compose(R.prop("text"), R.prop(0))
