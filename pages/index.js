import { Fragment, PureComponent } from "react"
import { withRouter } from "next/router"
import Link from "next/link"
import { Client, Prismic, linkResolver } from "utils/prismic"
import Layout from "components/Layout"
import { RichText } from "prismic-reactjs"
import Translate from "components/Translate"
import { css } from "emotion"
import { AVAILABLE_LOCALES, DEFAULT_LANG } from 'utils/config'
import ReactSVG from 'react-svg'
import styles from './home/styles.local.css'
import Container from "components/Container"
import Decoration from "./home/Decoration"
import UrbanRevolution from "./home/UrbanRevolution"
import Button from "components/Button"
import { ds } from "styles/tokens"
import { mq } from "styles/tokens/helper"
import { useSpring, animated } from 'react-spring'

const baseFontSize = ds.get("type.sizes.baseFontSize")

class Home extends PureComponent {
  static async getInitialProps({ req }) {
    try {
      const home = await Client(req).getSingle("accueil")

      return { home }
    } catch (error) {
      console.log(error)
      return { error: true }
    }
  }

  render() {
    const { error, router, home, translation } = this.props
    const locale = router.query.lang ? router.query.lang : DEFAULT_LANG
    const seo = {}
    let content

    if (home) {
      content = home.data
      Object.keys(content).filter((key) => {
        if ( key.includes("meta")) seo[key] = content[key]
      })
    }
    return (
      <Layout locale={locale} seo={seo}>
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
              <section className="mt-40 sm:mt-165">
                <Container contained={true}>
                  <h2 className='text-blue-100 text-center mb-30 md:mb-50'>{content.dailytrip_title}</h2>
                  <div className={`${styles.featuresGrid} grid gap-30`}>
                    {content.features.map((feature, key) => <figure className={`${key < content.features.length - 1 ? 'mb-40 md:mb-0' : ''}`} key={key}>
                      <div className={`text-center ${styles.featureIllustration}`}>
                        <h3 className="mb-30 md: mb-40 text-blue-100 text-center">{feature.title}</h3>
                        <ReactSVG
                            src={feature.illustration.url}
                          />
                      </div>
                      <figcaption className="text-left mt-30 md:mt-50">
                        {RichText.render(feature.text)}
                      </figcaption>
                    </figure>)
                    }
                  </div>
                  <div className="flex justify-center mt-30 mb-40 md:mt-0">
                    <Link
                        prefetch
                        passHref
                        as={`/${locale}/product`}
                        href={`/product?lang=${locale}`}
                      >
                        <a className="tw-button">
                          <Button tagType="div" additionalStyles="sm:mt-35" theme="primary" variant="default">
                            <Translate id="home.ourProduct" />
                          </Button>
                        </a>
                    </Link>
                  </div>
                </Container>
              </section>
              {/******************** ************************  ********************/}

              {/********************** TRANSPORT CAPACITY *************************/}
              <section>
                <h2 className='text-blue-100'>{content.transportcapacity_title}</h2>
              </section>
              {/******************** ************************  ********************/}

              {/********************** FRENCH TOUCH *******************************/}
              <section className={`md:mt-80`}>
                <Container contained={true}>
                  <h2 className='text-center sm:text-left text-blue-100 mb-20 sm:mb-30'>{content.frenchtouch_title}</h2>
                  <div className="flex flex-col-reverse sm:grid sm:gap-30 sm:grid-col-12">
                    <div className={`${styles.gridFrenchTouchCol1} mt-30 md:mt-0`}>
                      {RichText.render(content.frenchtouch_text)}
                      <div class="flex justify-center sm:block">
                        <Link
                          prefetch
                          passHref
                          as={`/${locale}/brand`}
                          href={`/brand?lang=${locale}`}
                        >
                          <a className="tw-button">
                            <Button tagType="div" additionalStyles="mt-30 sm:mt-35" theme="primary" variant="default">
                              <Translate id="home.ourSavoirFaire" />
                            </Button>
                          </a>
                        </Link>
                      </div>
                    </div>
                    <div className={`${styles.gridFrenchTouchCol2} mx-auto sm:mx-unset max-w-400 sm:max-w-unset`}>
                      <img className="w-full h-full object-contain" src="/static/images/map_mobile.png"
                        srcSet="/static/images/map_mobile.png 250w,
                          /static/images/map_mobile@2x.png 500w,
                          /static/images/map_desktop.png 285w,
                          /static/images/map_desktop@2x.png 570w"
                        sizes="100vw"
                        alt=""
                      />
                    </div>
                  </div>
                </Container>
              </section>
              {/******************** ************************  ********************/}
              {/********************** COVER **************************************/}
              <div
                className={`sm:h-300 sm:mt-80 sm:bg-no-repeat sm:bg-center sm:bg-fixed`.concat(" ", css({
                  [mq.sm]: {
                    "--bgImage": `url(${content.cover.url})`,
                    backgroundSize: 'cover',
                    backgroundImage: 'var(--bgImage)',
                    "@media (-webkit-min-device-pixel-ratio: 1.25) and ( min--moz-device-pixel-ratio: 1.25) and ( -o-min-device-pixel-ratio: 1.25/1) and ( min-device-pixel-ratio: 1.25) and ( min-resolution: 200dpi) and ( min-resolution: 1.25dppx)": {
                      "--bgImage": `url(${content.cover["desktop@2x"].url})`,
                    },
                  },

                }))} />
              {/************************* SOCIAL etc **********************************/}
              <Container contained={true} staticStyles="mt-40 sm:mt-80 flex flex-col sm:grid sm:gap-30 sm:grid-col-12">
                <div className={`${styles.gridSocialsCol1}`}>
                  <section>
                    {/********************** FIND US ON SOCIAL MEDIA **************************************/}
                    <h2 className='text-blue-100 mb-20 sm:mb-30 text-center sm:text-left'>{content.findusonsocialmedia_title}</h2>
                    <div className="mb-20 sm:mb-30">
                      {RichText.render(content.findusonsocialmedia_text)}
                    </div>
                    <div className="fb-page flex justify-center sm:block" data-href="https://www.facebook.com/ilicycles/" data-tabs="journal" data-width="460" data-height="140" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="false"><blockquote cite="https://www.facebook.com/ilicycles/" className="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/ilicycles/">Ili cycles</a></blockquote></div>
                    <div className="flex items-center mt-30 mb-40">
                      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"><g fill="#15ACDF"><path d="M24.825 29.796a4.978 4.978 0 0 0 4.972-4.97 4.954 4.954 0 0 0-.94-2.897 4.964 4.964 0 0 0-4.029-2.073c-1.659 0-3.126.82-4.031 2.072a4.947 4.947 0 0 0-.94 2.897 4.973 4.973 0 0 0 4.968 4.971zm10.853-11.05V13.96l-.623.002-4.164.013.016 4.787z"></path><path d="M24.826 0C11.137 0 0 11.137 0 24.826c0 13.688 11.137 24.826 24.826 24.826 13.688 0 24.826-11.138 24.826-24.826C49.652 11.137 38.516 0 24.826 0zm14.119 21.929v11.56a5.463 5.463 0 0 1-5.457 5.458H16.164a5.462 5.462 0 0 1-5.457-5.458V16.165a5.462 5.462 0 0 1 5.457-5.457h17.323a5.463 5.463 0 0 1 5.458 5.457v5.764z"></path><path d="M32.549 24.826c0 4.257-3.464 7.723-7.723 7.723s-7.722-3.466-7.722-7.723a7.67 7.67 0 0 1 .568-2.897h-4.215v11.56a2.706 2.706 0 0 0 2.706 2.704h17.323a2.707 2.707 0 0 0 2.706-2.704v-11.56h-4.217c.367.894.574 1.873.574 2.897z"></path></g></svg>
                      <a className="block ml-10" href="https://www.instagram.com/ili_cycles">
                        <Translate id="home.findUsOnInstagram" />
                      </a>
                    </div>
                  </section>

                  {/************************************** CATALOG **************************************/}
                  <section className="hidden sm:block">
                    <h2 className='text-blue-100 mb-20 sm:mb-30 text-center sm:text-left'>{content.catalogue_title}</h2>
                    {RichText.render(content.catalogue_text)}
                    <Button tagType="a" additionalStyles="sm:mt-35" theme="primary" variant="outline" href={content.catalogue_link.url}>
                      <Translate id="home.downloadOurCatalog" />
                    </Button>
                  </section>
                </div>
                {/************************************** CONTACT US **************************************/}
                <section className={`${styles.gridSocialsCol2}`}>
                  <h2 className='text-blue-100 mb-20 sm:mb-30 mt-40 sm:mt-0 text-center sm:text-left'>{content.contactus_title}</h2>
                  {RichText.render(content.contactus_text)}
                </section>
              </Container>
          </Fragment>
        )}
      </Layout>
    )
  }
}

export default withRouter(Home)
