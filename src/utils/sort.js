export const sortByPage = (a, b) => Number(a.pageNumber) - Number(b.pageNumber)

export const sortByIssue = (a, b) =>
  Number(a.issueNumber) - Number(b.issueNumber)
