import { Fragment, PureComponent } from "react"
import { withRouter } from "next/router"
import Link from "next/link"
import { Client, Prismic, linkResolver } from "utils/prismic"
import Layout from "components/Layout"
import { RichText } from "prismic-reactjs"
import { AVAILABLE_LOCALES, DEFAULT_LANG } from "utils/config"
import Container from "components/Container"
import Cover from "./Cover"
import Content from "./Content"

class Brand extends PureComponent {
  static async getInitialProps({ req }) {
    try {
      const brand = await Client(req).query(Prismic.Predicates.at("document.type", "la_marque"), { lang: "*" })
      const layout = await Client(req).query(Prismic.Predicates.at("document.type", "modele_de_page"), { lang: "*" })
      return { brand, layout }
    } catch (error) {
      console.log(error)
      return { error: true }
    }
  }

  render() {
    const { error, router, brand, layout, translation } = this.props
    const locale = router.query.lang ? router.query.lang : DEFAULT_LANG
    let layoutContent
    let localizedContent = {}
    let localizedSeo = {}


    if (brand) {
      brand.results.filter((result) => {
        let contentLocale = result.lang.slice(0, 2)
        localizedContent[contentLocale] = result.data
        localizedSeo[contentLocale] = {}
        Object.keys(localizedContent[contentLocale]).filter((key) => {
          if (key.includes("meta")) localizedSeo[contentLocale][key] = localizedContent[contentLocale][key]
        })
      })
    }
    if (layout) {
      layoutContent = layout.results.filter((result) => result.lang.slice(0, 2) === locale).map((r) => r.data)[0]
    }
    if (this.props.error) return <Fragment />
    return (
      <Layout withForm={true} theme="light" locale={locale} content={layoutContent} seo={localizedSeo[locale]}>
        <Cover image={localizedContent[locale].cover_pic} title={localizedContent[locale].cover_title} />
            <Container contained={true} staticStyles="mb-40 md:mb-75">
              <Content
                picture={localizedContent[locale].picture}
                title={localizedContent[locale].ourhistory_title}
                text={RichText.render(localizedContent[locale].ourhistory_text)}
              />
            </Container>
      </Layout>
    )
  }
}

export default withRouter(Brand)
