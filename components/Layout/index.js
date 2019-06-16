import React, { useState, memo, Fragment } from "react"
import { Translation as TranslationContext } from "store/Translation"
import SEOHead from "./SEOHead"
import { withRouter } from 'next/router'
import { AVAILABLE_LOCALES, DEFAULT_LANG } from 'utils/config'

const Layout = memo((props) => {
  const { children, seo, locale, router } = props
  const [translation, setLocale] = useState({ locale: props.locale, fallback: DEFAULT_LANG })

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
        <main role="main" className="flex-grow">
          {children}
        </main>
      </TranslationContext.Provider>
    </Fragment>
  )
})

export default withRouter(Layout)