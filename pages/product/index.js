import { Fragment, PureComponent } from "react"
import { withRouter } from "next/router"
import Link from "next/link"
import { Client, Prismic, linkResolver } from "utils/prismic"
import Layout from "components/Layout"
import { RichText } from "prismic-reactjs"
import Translate from "components/Translate"
import { AVAILABLE_LOCALES, DEFAULT_LANG } from "utils/config"
import ReactSVG from "react-svg"
import Container from "components/Container"
import { ds } from "styles/tokens"
import { pxTo } from "design-system-utils"
import MediaQuery from "react-responsive"
import styles from "./styles.local.css"
import Quality from "./Quality"
import Features from "./Features"
const baseFontSize = ds.get("type.sizes.baseFontSize")
class Product extends PureComponent {
  static async getInitialProps({ req }) {
    try {
      const product = await Client(req).query(Prismic.Predicates.at("document.type", "le_produit"), { lang: "*" })
      const layout = await Client(req).query(Prismic.Predicates.at("document.type", "modele_de_page"), { lang: "*" })
      return { product, layout }
    } catch (error) {
      console.log(error)
      return { error: true }
    }
  }

  render() {
    const { error, router, product, layout, translation } = this.props
    const locale = router.query.lang ? router.query.lang : DEFAULT_LANG
    let localizedContent = {}
    let localizedSeo = {}
    let layoutContent
    product.results.filter((result) => {
      let contentLocale = result.lang.slice(0, 2)
      localizedContent[contentLocale] = result.data
      localizedSeo[contentLocale] = {}
      Object.keys(localizedContent[contentLocale]).filter((key) => {
        if (key.includes("meta")) localizedSeo[contentLocale][key] = localizedContent[contentLocale][key]
      })
    })
    if (layout) {
      layoutContent = layout.results.filter((result) => result.lang.slice(0, 2) === locale).map((r) => r.data)[0]
    }
    if (this.props.error) return <Fragment />
    return (
      <Layout withForm={true} theme="colorful" locale={locale} content={layoutContent} seo={localizedSeo[locale]}>
            <div className="mt-50 md:mt-170">
              <Quality
                title={localizedContent[locale].quality_title}
                subtitle={localizedContent[locale].quality_subtitle}
                text={RichText.render(localizedContent[locale].quality_text)}
                price={localizedContent[locale].quality_price}
                slider={localizedContent[locale].slider}
              />
              <Features locale={locale} list={localizedContent[locale].features} />
            </div>
      </Layout>
    )
  }
}

export default withRouter(Product)
