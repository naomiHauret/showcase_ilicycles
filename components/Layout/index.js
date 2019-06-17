import React, { useState, memo, Fragment } from "react"
import { Translation as TranslationContext } from "store/Translation"
import SEOHead from "./SEOHead"
import { withRouter } from 'next/router'
import { AVAILABLE_LOCALES, DEFAULT_LANG } from 'utils/config'
import Container from 'components/Container'
import styles from './styles.local.css'
import Translate from "components/Translate"
import SelectLanguage from './SelectLanguage'
import Link from "next/link"
import { RichText } from "prismic-reactjs"
import useWindowScroll from '@react-hook/window-scroll'
import { useSpring, animated } from 'react-spring'

const Layout = memo((props) => {
  const { children, seo, locale, router, content, theme } = props
  const [translation, setLocale] = useState({ locale: props.locale, fallback: DEFAULT_LANG })
  const scrollY = useWindowScroll(60)
  const themeSystem = {
    color: {
      light: 'text-black-100 md:text-white-100',
      colorful: 'text-black-100 md:text-blue-100',
    }
  }
  return (
    <Fragment>
      <SEOHead
        title={seo['meta_title']}
        metadescription={seo['meta_description']}
        socialmediaTitle={seo['meta_title']}
        socialmediaDescription={seo['meta_description']}
        socialmediaLocale={AVAILABLE_LOCALES[locale]}
      />
      <TranslationContext.Provider value={translation}>
        <animated.header
          style={
          useSpring({
            to: {
              background: scrollY < 350 ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 1)',
            },
              from: {
                background: 'rgba(255, 255, 255, 1)'
              },
          })
        }
        className={`fixed w-full top-0 left-0 z-10 pt-15 pb-20 shadow-lg ${styles.header}
        ${scrollY < 350 ? 'md:py-50 md:shadow-none' : 'md:py-5 md:shadow-lg'}
        ${scrollY < 350 ? themeSystem.color[theme] : 'text-black-100'}`}>
          <nav>
            <Container contained={true} staticStyles="flex items-center">
            <ul className={`list-none items-center p-0 flex text-base tracking-052 ${styles.headerNav}`}>
              <li>
                    <Link
                      prefetch
                      passHref
                      as={`/${locale}`}
                      href={`/?lang=${locale}`}
                    >
                      <a className="tw-unstyled-link">
                        <span className="hidden">
                          <Translate id="layout.menu.home" />
                        </span>
                        <svg className={styles.logo} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 93 22"><g fill="currentColor" fillRule="nonzero"><path d="M2.72 6.03H7.1l-.46 2.71-4.26-.72zM0 21.88h4.38L6.51 9.47l-4.26-.73zM16.91 6.03h4.38l-.46 2.71-4.26-.72zM14.19 21.88h4.38l2.14-12.41-4.26-.73zM10.75.59L7.1 21.88h4.38L15.13.59zM21.89 21.25H93v1H21.89zM57.66 17.39h-1.28v.37s-.01.96-1.22 1.13c-1.21.17-5.09.38-6.13-.04s-1.41-.91-1.5-1.5c-.09-.59-.09-2.08 0-2.67.09-.59.46-1.08 1.5-1.5 1.04-.42 4.92-.21 6.13-.04 1.21.17 1.22 1.13 1.22 1.13v.37h1.28v-.61s.06-1.72-1.97-1.97-6.03-.14-7.43.17c-1.39.31-1.86 1.38-1.99 2.26-.13.88-.13 2.21 0 3.09.13.88.6 1.95 1.99 2.26 1.39.31 5.4.42 7.43.17 2.03-.25 1.97-1.97 1.97-1.97v-.65zm-23.18 0H33.2v.37s-.01.96-1.22 1.13c-1.21.17-5.09.38-6.13-.04s-1.41-.91-1.5-1.5c-.09-.59-.09-2.08 0-2.67.09-.59.46-1.08 1.5-1.5 1.04-.42 4.92-.21 6.13-.04 1.21.17 1.22 1.13 1.22 1.13v.37h1.28v-.61s.06-1.72-1.97-1.97-6.03-.14-7.43.17c-1.39.31-1.86 1.38-1.99 2.26-.13.88-.13 2.21 0 3.09.13.88.6 1.95 1.99 2.26 1.39.31 5.4.42 7.43.17 2.03-.25 1.97-1.97 1.97-1.97v-.65zM44.55 12.12l-4.03 3.66-4.03-3.66h-1.64l5.07 4.6v3.4h1.2v-3.4l5.06-4.6zM68.98 20.12v-1.14h-8.36v-7.04h-1.21v8.18zM81.33 12.93v-.99H70.46v8.18h10.87v-1.14h-9.66v-2.61h9.49v-1.16h-9.49v-2.28zM90.86 12.17c-2.03-.25-5.01-.25-6.4.06-1.39.31-1.68 1.07-1.73 1.85-.05.77-.17 2.33 2.13 2.42 2.29.09 4.52.25 5.6.29 1.08.04 1.14.88 1.11 1.12-.01.11 0 .69-.96 1.05-.95.36-4.19.18-5.4.01-1.21-.17-1.22-1.13-1.22-1.13v-.37h-1.28v.61s-.06 1.72 1.97 1.97 5.01.25 6.4-.06c1.39-.31 1.68-1.07 1.73-1.85.05-.77.17-2.33-2.13-2.42-2.29-.09-4.52-.25-5.6-.29-1.08-.04-1.14-.88-1.11-1.12.01-.11 0-.69.96-1.05.95-.36 4.19-.18 5.4-.01 1.21.17 1.22 1.13 1.22 1.13v.37h1.28v-.61s.06-1.72-1.97-1.97z"/></g></svg>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      prefetch
                      passHref
                      as={`/${locale}/product`}
                      href={`/product?lang=${locale}`}
                    >
                      <a className="tw-unstyled-link font-600">
                        <Translate id="layout.menu.product" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      prefetch
                      passHref
                      as={`/${locale}/brand`}
                      href={`/brand?lang=${locale}`}
                    >
                      <a className=" tw-unstyled-link font-600">
                        <Translate id="layout.menu.brand" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      prefetch
                      passHref
                      as={`/${locale}#contact`}
                      href={`/?lang=${locale}#contact`}
                    >
                      <a className="tw-unstyled-link font-bold">
                        <Translate id="layout.menu.contact" />
                      </a>
                    </Link>
                  </li>
                </ul>
                <div className="ml-auto">
                 <SelectLanguage router={router} onChange={setLocale}  />
                </div>
                </Container>
          </nav>
        </animated.header>
        <main role="main" className="flex-grow pt-80 md:pt-0">
          {children}
        </main>
        <footer className="bg-black-200 text-white-100 pt-50 pb-30 md:pt-60 md:pb-20">
          <Container contained={true} staticStyles={`grid gap-30 ${styles.footerGrid}`}>
            <nav className={styles.navigation}>
              <h3 className="text-14 font-600">
                <Translate id="layout.footer.sitemap" />
              </h3>
                <ul className="list-none p-0">
                  <li>
                    <Link
                      prefetch
                      passHref
                      as={`/${locale}`}
                      href={`/?lang=${locale}`}
                    >
                      <a className="tw-unstyled-link">
                        <Translate id="layout.menu.home" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      prefetch
                      passHref
                      as={`/${locale}/product`}
                      href={`/product?lang=${locale}`}
                    >
                      <a className="tw-unstyled-link">
                        <Translate id="layout.menu.product" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      prefetch
                      passHref
                      as={`/${locale}/brand`}
                      href={`/brand?lang=${locale}`}
                    >
                      <a className=" tw-unstyled-link">
                        <Translate id="layout.menu.brand" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      prefetch
                      passHref
                      as={`/${locale}#contact`}
                      href={`/?lang=${locale}#contact`}
                    >
                      <a className=" tw-unstyled-link">
                        <Translate id="layout.menu.contact" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link
                      prefetch
                      passHref
                      as={`/${locale}/legal`}
                      href={`/legal?lang=${locale}`}
                    >
                      <a className=" tw-unstyled-link">
                        <Translate id="layout.menu.legalNotice" />
                      </a>
                    </Link>
                  </li>
                </ul>
            </nav>
            <div className={styles.openingTimesAndContact}>
              <h3 className="text-14 font-600">
                <Translate id="layout.footer.openingTimesAndContact" />
              </h3>
              <div className="font-500 text-12 tracking-0 mt-20">
                {content.footer_text_time}
                <div className="mt-25">
                  {RichText.render(content.footer_text_address)}
                </div>
                <div className="mt-40">
                  <a className="tw-unstyled-link flex items-center mb-10" href="https://www.facebook.com/ilicycles/">
                    <svg aria-hidden="true" className={`${styles.icon} block mr-15`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" ><path fill="currentColor" d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"/></svg>
                    <span>Ili Cycles</span>
                  </a>
                  <a className="tw-unstyled-link flex items-center" href="https://www.instagram.com/ili_cycles/">
                    <svg className={`${styles.icon} block mr-15`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
                    <span>Ili Cycles</span>
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.mission}>
                <h3 className="text-14 font-600">
                <Translate id="layout.footer.ourMission" />
              </h3>
              <div className="mt-20 font-500 text-12 tracking-0">
                {RichText.render(content.footer_text_mission)}
              </div>
            </div>
            <div>

            </div>
          </Container>
        </footer>
      </TranslationContext.Provider>
    </Fragment>
  )
})

export default withRouter(Layout)