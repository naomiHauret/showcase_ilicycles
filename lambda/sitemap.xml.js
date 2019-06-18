const app = require("./utils/app")
const sm = require('sitemap')
const locales = ['en']

const createSitemap = (res) => {
  let urlRoutes = ['', 'product', 'brand', 'legal']
  let pages = []
  let sitemap = sm.createSitemap({
    hostname: 'https://ilicycles.com',
    cacheTime: 60
  })

  urlRoutes.map(page => {
    pages.push(`/${page}`)
  })
  locales.forEach(locale => {
    urlRoutes.map(page => {
      pages.push(`/${locale}/${page}`)
    })
  })

  pages.map((item) => {
    sitemap.add({
      url: item,
      changefreq: 'daily',
      priority: 1
    })
  })
  res.send(sitemap.toString())
}

app.get('*', (req, res) => {
  res.header('Content-Type', 'application/xml')
  createSitemap(res)
})

module.exports = app
