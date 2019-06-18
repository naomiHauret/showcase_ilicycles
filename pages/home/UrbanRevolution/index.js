import React, { memo, Fragment, useRef, useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"

import { useSpring, animated } from "react-spring"
import styles from "./styles.local.css"
import Link from "next/link"
import Button from "components/Button"
import Translate from "components/Translate"
import { ds } from "styles/tokens"
import { pxTo } from "design-system-utils"
import MediaQuery from "react-responsive"

const UrbanRevolution = memo((props) => {
  const { title, text, locale } = props
  const [innerWidth, setWindowWidth] = useState(0)
  useEffect(() => {
    setWindowWidth(window.innerWidth)
  })
  const baseFontSize = ds.get("type.sizes.baseFontSize")
  const [ref, inView] = useInView({
    threshold: innerWidth > ds.get("grid.width.md") ? 0.35 : 0,
    triggerOnce: true,
  })

  return (
    <Fragment>
      <div ref={ref} className={styles.urbanRevolutionCol1}>
        <animated.h1
          style={useSpring({
            to: {
              opacity: inView ? 1 : 0,
              transform: "translateX(0)",
            },
            from: {
              opacity: 0,
              transform: "translateX(15px)",
            },
            delay: 350,
          })}
          className="mt-30 sm:text-white-100 sm:mt-0 mb-20 sm:mb-15"
        >
          {title}
        </animated.h1>
        <animated.div
          className="text-blue-100 sm:text-white-100"
          style={useSpring({
            to: {
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(15px)",
            },
            from: { opacity: 0, transform: "translateX(15px)" },
            delay: 470,
          })}
        >
          {text}
        </animated.div>
        <animated.div
          style={useSpring({
            to: { opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(15px)" },
            from: { opacity: 0, transform: "translateX(15px)" },
            delay: 530,
          })}
          className="flex justify-center mt-15 sm:mt-40 sm:mb-115"
        >
          <MediaQuery query={`(min-width: ${pxTo(887, baseFontSize, "rem")})`}>
            <Link prefetch passHref as={`/${locale}/product`} href={`/product?lang=${locale}`}>
              <a className="tw-button">
                <Button tagType="div" theme="secondary" variant="default">
                  <Translate id="home.discoverIlicycles" />
                </Button>
              </a>
            </Link>
          </MediaQuery>
          <MediaQuery query={`(max-width: ${pxTo(886, baseFontSize, "rem")})`}>
            <Link prefetch passHref as={`/${locale}/product`} href={`/product?lang=${locale}`}>
              <a className="tw-button">
                <Button tagType="div" theme="primary" variant="outline">
                  <Translate id="home.discoverIlicycles" />
                </Button>
              </a>
            </Link>
          </MediaQuery>
        </animated.div>
      </div>
      <div className={`mt-10 sm:mt-0 ${styles.urbanRevolutionCol2}`}>
        <animated.div
          style={useSpring({
            to: {
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-15%)",
            },
            from: { opacity: 0, transform: "translateX(-15%)" },
            delay: 525,
          })}
        >
          <picture>
            <source srcSet="/static/images/bicycle_mobile.png" media="(max-width: 886px)" />
            <source
              srcSet="/static/images/bicycle@2x_mobile.png"
              media={`(max-width: 886px) and (-webkit-min-device-pixel-ratio: 1.25) and ( min--moz-device-pixel-ratio: 1.25) and ( -o-min-device-pixel-ratio: 1.25/1) and ( min-device-pixel-ratio: 1.25) and ( min-resolution: 200dpi) and ( min-resolution: 1.25dppx))`}
            />
            <source srcSet="/static/images/bicycle.png" media={"(min-width: 887px)"} />
            <img src="" className="max-w-full sm:max-w-555 lg:max-w-unset" />
          </picture>
        </animated.div>
      </div>
    </Fragment>
  )
})

export default UrbanRevolution
