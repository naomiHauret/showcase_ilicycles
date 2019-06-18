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
const baseFontSize = ds.get("type.sizes.baseFontSize")

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
    const seo = {}
    let content
    let layoutContent

    if (legal) {
      content = legal.results.filter((result) => result.lang.slice(0, 2) === locale).map((r) => r.data)[0]
      Object.keys(content).filter((key) => {
        if (key.includes("meta")) seo[key] = content[key]
      })
    }
    if (layout) {
      layoutContent = layout.results.filter((result) => result.lang.slice(0, 2) === locale).map((r) => r.data)[0]
    }
    return (
      <Layout theme="light" locale={locale} content={layoutContent} seo={seo}>
        {this.props.error ? (
          <Fragment />
        ) : (
          <Fragment>
            <Container contained={true}>Hello from legal page</Container>
          </Fragment>
        )}
      </Layout>
    )
  }
}

export default withRouter(Legal)
