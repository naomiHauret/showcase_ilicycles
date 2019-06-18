import { Fragment, PureComponent } from "react"
import { withRouter } from "next/router"
import Link from "next/link"
import { Client, Prismic, linkResolver } from "utils/prismic"
import Layout from "components/Layout"
import { RichText } from "prismic-reactjs"
import Translate from "components/Translate"
import { AVAILABLE_LOCALES, DEFAULT_LANG } from "utils/config"
import ReactSVG from "react-svg"
import styles from "pages/home/styles.local.css"
import Container from "components/Container"
import Decoration from "pages/home/Decoration"
import UrbanRevolution from "pages/home/UrbanRevolution"
import DailyTravel from "pages/home/DailyTravel"
import FrenchTouch from "pages/home/FrenchTouch"
import ContactUs from "pages/home/ContactUs"
import FindUs from "pages/home/FindUs"
import FormContact from "pages/home/FormContact"
import Cover from "pages/home/Cover"
import Catalog from "./home/Catalog"
import Button from "components/Button"
import { ds } from "styles/tokens"
import { pxTo } from "design-system-utils"
import MediaQuery from "react-responsive"
import TransportCapacity from "./home/TransportCapacity"

const baseFontSize = ds.get("type.sizes.baseFontSize")

class Home extends PureComponent {
  static async getInitialProps({ req, query }) {
    try {
      const home = await Client(req).query(Prismic.Predicates.at("document.type", "accueil"), { lang: "*" })
      const layout = await Client(req).query(Prismic.Predicates.at("document.type", "modele_de_page"), { lang: "*" })
      return { home, layout, lang: query.lang }
    } catch (error) {
      console.log(error)
      return { error: true }
    }
  }

  render() {
    const { error, router, home, layout, translation, lang } = this.props
    const locale = lang ? lang : DEFAULT_LANG
    const seo = {}
    let content
    let layoutContent

    if (home) {
      content = home.results.filter((result) => result.lang.slice(0, 2) === locale).map((r) => r.data)[0]
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
            {/******************** SECTION URBAN REVOLUTION  ********************/}
            <div className="relative">
              <Decoration />
              <section className="text-blue-100 sm:text-white-100 sm:pt-150 text-center z-1 relative">
                <Container contained={true} staticStyles={`sm:grid sm:gap-30 sm:grid-col-12`}>
                  <UrbanRevolution
                    locale={locale}
                    title={content.urbanrevolution_title}
                    text={RichText.render(content.urbanrevolution_text)}
                  />
                </Container>
              </section>
            </div>
            {/******************** ************************  ********************/}
            {/************************* DAILY TRAVELS ***************************/}
            <DailyTravel
              margins="mt-40 sm:mt-90"
              title={content.dailytrip_title}
              features={content.features}
              locale={locale}
            />

            {/******************** ************************  ********************/}

            {/********************** TRANSPORT CAPACITY *************************/}
            <TransportCapacity
              locale={locale}
              features={content.features_grid}
              text={RichText.render(content.transportcapacity_text)}
              slider={content.slider}
              title={content.transportcapacity_title}
            />
            {/******************** ************************  ********************/}

            {/********************** FRENCH TOUCH *******************************/}
            <section className="md:mt-80">
              <Container contained={true}>
                <FrenchTouch
                  title={content.frenchtouch_title}
                  text={RichText.render(content.frenchtouch_text)}
                  locale={locale}
                />
              </Container>
            </section>
            {/******************** ************************  ********************/}
            {/********************** COVER **************************************/}
            <Cover margins="sm:mt-80" cover={content.cover} />
            {/************************* SOCIAL etc **********************************/}
            <Container
              contained={true}
              staticStyles="mb-70 md:mb-110 mt-40 sm:mt-80 flex flex-col sm:grid sm:gap-30 sm:grid-col-12"
            >
              <div className={`${styles.gridSocialsCol1}`}>
                {/********************** FIND US ON SOCIAL MEDIA **************************************/}
                <FindUs
                  title={content.findusonsocialmedia_title}
                  text={RichText.render(content.findusonsocialmedia_text)}
                  titleMargins="mb-20 sm:mb-30"
                />

                {/************************************** CATALOG **************************************/}
                <MediaQuery minDeviceWidth={pxTo(ds.get("breakpoints.sm"), baseFontSize, "rem")}>
                  <Catalog
                    titleMargins="mb-20 sm:mb-30"
                    downloadUrl={content.catalogue_link.url}
                    title={content.catalogue_title}
                    text={RichText.render(content.catalogue_text)}
                  />
                </MediaQuery>
              </div>
              {/************************************** CONTACT US **************************************/}
              <section className={`${styles.gridSocialsCol2}`}>
                <ContactUs
                  titleMargins="mb-20 sm:mb-30 mt-40 sm:mt-0"
                  title={content.contactus_title}
                  text={RichText.render(content.contactus_text)}
                />
                <FormContact theme="colorful" locale={locale} />
              </section>
            </Container>
          </Fragment>
        )}
      </Layout>
    )
  }
}

export default withRouter(Home)
