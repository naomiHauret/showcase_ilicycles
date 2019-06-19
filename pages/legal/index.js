import { Fragment, PureComponent } from "react"
import { withRouter } from "next/router"
import { Client, Prismic } from "utils/prismic"
import Layout from "components/Layout"
import { RichText } from "prismic-reactjs"
import { AVAILABLE_LOCALES, DEFAULT_LANG } from "utils/config"
import Container from "components/Container"
import Content from "./Content"

class Legal extends PureComponent {
  static async getInitialProps({ req }) {
    try {
      const legal = await Client(req).query(Prismic.Predicates.at("document.type", "mentions_legales"), { lang: "*" })
      const layout = await Client(req).query(Prismic.Predicates.at("document.type", "modele_de_page"), { lang: "*" })
      return { legal, layout }
    } catch (error) {
      console.log(error)
      return { error: true }
    }
  }

  render() {
    const { error, router, legal, layout, translation } = this.props
    const locale = router.query.lang ? router.query.lang : DEFAULT_LANG
    let localizedContent = {}
    let localizedSeo = {}

    let layoutContent

    if (legal) {
      legal.results.filter((result) => {
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
      <Layout theme="colorful" locale={locale} content={layoutContent} seo={localizedSeo}>
        <Container contained={true} staticStyles="mt-50 md:mt-170 pb-100">
          <Content
            title={localizedContent[locale].legalnotice_title}
            text={RichText.render(localizedContent[locale].legalnotice_text)}
          />
        </Container>
      </Layout>
    )
  }
}

export default withRouter(Legal)
