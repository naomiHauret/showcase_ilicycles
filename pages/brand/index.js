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
const baseFontSize = ds.get("type.sizes.baseFontSize")

class Brand extends PureComponent {
  static async getInitialProps({ req }) {
    try {
      const brand = await Client(req).query(Prismic.Predicates.at("document.type", "la_marque"), { lang : '*'  })
      const layout = await Client(req).query(Prismic.Predicates.at("document.type", "modele_de_page"), { lang : '*'  })
      return { brand, layout }
    } catch (error) {
      console.log(error)
      return { error: true }
    }
  }

  render() {
    const { error, router, brand, layout, translation } = this.props
    const locale = router.query.lang ? router.query.lang : DEFAULT_LANG
    const seo = {}
    let content
    let layoutContent

    if (brand) {
      content = brand.results.filter(result => result.lang.slice(0, 2) === locale).map(r => r.data)[0]
      Object.keys(content).filter((key) => {
        if ( key.includes("meta")) seo[key] = content[key]
      })
    }
    if (layout) {
      layoutContent = layout.results.filter(result => result.lang.slice(0, 2) === locale).map(r => r.data)[0]
    }
    return (
      <Layout theme="light" locale={locale} content={layoutContent} seo={seo}>
        {this.props.error ? (
          <Fragment />
        ) : (
          <Fragment>
              <div className={`${styles.cover} flex relative items-center justify-center`}>
                  <picture className="w-full h-full block absolute left-0 top-0">
                       <source
                        srcSet={content.cover_pic.mobile.url}  media={`(min-width: 0px)`} />
                      <source
                        srcSet={content.cover_pic['mobile@2x'].url}  media={`(min-width: 0) and (-webkit-min-device-pixel-ratio: 1.25) and ( min--moz-device-pixel-ratio: 1.25) and ( -o-min-device-pixel-ratio: 1.25/1) and ( min-device-pixel-ratio: 1.25) and ( min-resolution: 200dpi) and ( min-resolution: 1.25dppx))`} />

                      <source
                        srcSet={content.cover_pic.url.url}  media={`(min-width: ${pxTo(ds.get("grid.width.md"), baseFontSize, "rem")})`} />

                      <source
                        srcSet={content.cover_pic['@2x'].url}  media={`(min-width: ${pxTo(ds.get("grid.width.md"), baseFontSize, "rem")}) (-webkit-min-device-pixel-ratio: 1.25) and ( min--moz-device-pixel-ratio: 1.25) and ( -o-min-device-pixel-ratio: 1.25/1) and ( min-device-pixel-ratio: 1.25) and ( min-resolution: 200dpi) and ( min-resolution: 1.25dppx)`} />

                      <img src={content.cover_pic.preview.url} className="w-full h-full object-cover" />
                  </picture>
                  <h1 className="z-1 relative text-white-100">{content.cover_title}</h1>
              </div>
              <Container contained={true}>
                <h2 className="text-blue-100 md:mb-20 md:mt-80">{content.ourhistory_title}</h2>
                <div>
                  {RichText.render(content.ourhistory_text)}
                </div>
              </Container>
          </Fragment>
        )}
      </Layout>
    )
  }
}

export default withRouter(Brand)
