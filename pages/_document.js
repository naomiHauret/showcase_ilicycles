// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

import Document, { Head, Main, NextScript } from "next/document"
import { Fragment } from "react"

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const isProduction = process.env.NODE_ENV === "production"
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps, isProduction }
  }

  render() {
    const { isProduction } = this.props
    return (
      <html lang="fr">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="google-site-verification" content="" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <meta name="author" content="Ili Cycles" />
          <link rel="icon" href="/static/favicon.ico" />
          <link rel="icon" href="/static/32x32.png" />
          <link rel="icon" href="/static/96x96.png" />
          <link crossOrigin="anonymous" rel="preload" href="/static/fonts/ProximaNova-Regular.woff2" as="font" />
          <link crossOrigin="anonymous" rel="preload" href="/static/fonts/ProximaNova-Bold.woff2" as="font" />
          <link crossOrigin="anonymous" rel="preload" href="/static/fonts/ProximaNova-Medium.woff2" as="font" />
          <link crossOrigin="anonymous" rel="preload" href="/static/fonts/ProximaNova-Semibold.woff2" as="font" />
          <link crossOrigin="anonymous" rel="preload" href="/static/fonts/Roboto-Regular.woff2" as="font" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <div id="fb-root" />
        <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v3.3&appId=1125593067596811&autoLogAppEvents=1"></script>
      </html>
    )
  }
}
