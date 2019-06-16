import PrismicLib from "prismic-javascript"
import { CONTENT_API_URL } from "utils/config"

let frontClient

export const Client = (req = null) => {
  if (!req && frontClient) return frontClient
  else {
    const options = Object.assign({}, req ? { req } : {})
    return PrismicLib.client(CONTENT_API_URL, options)
  }
}
export const Prismic = PrismicLib

export const linkResolver = (doc) => {
  if (doc.type === "home-page") return "/"
  else if (doc.type === "brand") return "/brand"
  else return "/"
}
