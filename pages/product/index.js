import { Fragment, PureComponent } from "react"
import { withRouter } from "next/router"
import Link from "next/link"
import { Client, Prismic, linkResolver } from "utils/prismic"
import Layout from "components/Layout"
import { RichText } from "prismic-reactjs"
import Translate from "components/Translate"
import { AVAILABLE_LOCALES, DEFAULT_LANG } from 'utils/config'
import ReactSVG from 'react-svg'
import Container from "components/Container"
import { ds } from "styles/tokens"
import { pxTo } from 'design-system-utils'
import MediaQuery from 'react-responsive'
import styles from './styles.local.css'
import Quality from './Quality'
import Features from './Features'
const baseFontSize = ds.get("type.sizes.baseFontSize")
class Product extends PureComponent {
  static async getInitialProps({ req }) {
    try {
      const product = await Client(req).query(Prismic.Predicates.at("document.type", "le_produit"), { lang: '*' })
      const layout = await Client(req).query(Prismic.Predicates.at("document.type", "modele_de_page"), { lang: '*' })
      return { product, layout }
    } catch (error) {
      console.log(error)
      return { error: true }
    }
  }

  render() {
    const { error, router, product, layout, translation } = this.props
    const locale = router.query.lang ? router.query.lang : DEFAULT_LANG
    const seo = {}
    let content
    let layoutContent

    if (product) {
      content = product.results.filter(result => result.lang.slice(0, 2) === locale).map(r => r.data)[0]
      Object.keys(content).filter((key) => {
        if (key.includes("meta")) seo[key] = content[key]
      })
    }
    if (layout) {
      layoutContent = layout.results.filter(result => result.lang.slice(0, 2) === locale).map(r => r.data)[0]
    }
    return (
      <Layout theme="colorful" locale={locale} content={layoutContent} seo={seo}>
        {this.props.error ? (
          <Fragment />
        ) : (
            <Fragment>
              <div className="md:mt-170">
                <Quality title={content.quality_title} subtitle={content.quality_subtitle} text={RichText.render(content.quality_text)} price={content.quality_price} slider={content.slider}/>
                <Features locale={locale} list={content.features }/>
              </div>
            </Fragment>
          )}
      </Layout>
    )
  }
}

export default withRouter(Product)
