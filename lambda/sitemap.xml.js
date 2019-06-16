const app = require("./utils/app")
const Prismic = require("prismic-javascript")
const sm = require('sitemap')
const locales = ['fr', 'en']

const initApi = (req) => {
  return Prismic.getApi(process.env.PRISMIC_URL, {
    req: req
  })
}

const createSitemap = (res) => {
  let urlRoutes = []

  let sitemap = sm.createSitemap({
    hostname: 'https://ilicycles.com',
    cacheTime: 60
  })

  initApi(req = null).then((api) => {
    api.query('').then((response) => {

      const docs = response.results
      docs.forEach(doc => {
        locales.forEach(locale => {
          if (doc.type === 'home-page') {
            urlRoutes.push(`/${locale}`)
          }
          else {
            urlRoutes.push(`/${locale}/${doc.uid}`)
          }
        })
      })
      urlRoutes.map((item) => {
        sitemap.add({
          url: item,
          changefreq: 'daily',
          priority: 1
        })
      })
      res.send(sitemap.toString())
    })
  })
}

app.get('*', (req, res) => {
  res.header('Content-Type', 'application/xml')
  createSitemap(res)
})

module.exports = app
