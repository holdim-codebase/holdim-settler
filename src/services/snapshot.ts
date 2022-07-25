export interface Proposal {
  id: string
  author: string
  symbol: string
  title: string
  body: string
  discussion: string
  snapshot: string
  state: string
  link: string
  /** UNIX timestamp in seconds */
  created: number
  /** UNIX timestamp in seconds */
  start: number
  /** UNIX timestamp in seconds */
  end: number

  space: {
    id: string
    name: string
    avatar: string
  }
}
