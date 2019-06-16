
import React, { memo, Fragment, useRef, useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { useSpring, animated } from 'react-spring'
import styles from './styles.local.css'
import Link from "next/link"
import Button from "components/Button"
import Translate from "components/Translate"
import { ds } from "styles/tokens"
import { pxTo } from 'design-system-utils'
const UrbanRevolution = memo(
  (props) => {
      const {title, text, locale} = props
      const [innerWidth, setWindowWidth] = useState(0)
      useEffect(() => {
        // Update the document title using the browser API
        setWindowWidth(window.innerWidth)
      })
      const baseFontSize = ds.get("type.sizes.baseFontSize")
      const [ref, inView] = useInView({
        /* Optional options */
        threshold: innerWidth > ds.get("grid.width.md") ? 0.35 : 0,
        triggerOnce: true,
      })

      return <Fragment>
        <div ref={ref} className={styles.urbanRevolutionCol1}>
          <animated.h1
          style={
            useSpring({
                to: { opacity: inView ? 1 : 0,
                  transform:  inView ? `${innerWidth > ds.get("grid.width.md") ? 'translateX(0)' : 'translateY(0)'}` : `${innerWidth > ds.get("grid.width.md") ? 'translateX(-15px)' : 'translateY(20px)'}`
                },
                from: { opacity: 0, transform: innerWidth > ds.get("grid.width.md") ? 'translateX(-15px)' : 'translateY(20px)' },
              delay: 50
            })
          } className="mt-30 sm:text-white-100 sm:mt-0 mb-20 sm:mb-15">{title}</animated.h1>
          <animated.div
            className="text-blue-100 sm:text-white-100"
          style={
            useSpring({
              to: {
                opacity: inView ? 1 : 0, transform: inView ? `${innerWidth > ds.get("grid.width.md") ? 'translateX(0)' : 'translateY(0)'}` : `${innerWidth > ds.get("grid.width.md") ? 'translateX(-15px)' : 'translateY(20px)'}`
              }, from: { opacity: 0, transform: innerWidth > ds.get("grid.width.md") ? 'translateX(-15px)' : 'translateY(20px)' },
              delay: 150
            })
          }>
            {text}
          </animated.div>
          <animated.div  style={
            useSpring({
              to: { opacity: inView ? 1 : 0, transform: inView ? `${innerWidth > ds.get("grid.width.md") ? 'translateX(0)' : 'translateY(0)'}` : `${innerWidth > ds.get("grid.width.md") ? 'translateX(-15px)' : 'translateY(20px)'}` }, from: { opacity: 0, transform: innerWidth > ds.get("grid.width.md") ? 'translateX(-15px)' : 'translateY(20px)' },
              delay: 230
            })
          } className="flex justify-center mt-15 sm:mt-40 sm:mb-115">
            <Link
                prefetch
                passHref
                as={`/${locale}/product`}
                href={`/product?lang=${locale}`}
              >
                <a className="tw-button">
                  <Button tagType="div" theme="secondary" variant="default">
                    <Translate id="home.discoverIlicycles" />
                  </Button>
                </a>
            </Link>
          </animated.div>
        </div>
        <div className={`mt-10 sm:mt-0 ${styles.urbanRevolutionCol2}`}>
          <animated.div style={
            useSpring({
              to: { opacity: inView ? 1 : 0, transform: inView ? `${innerWidth > ds.get("grid.width.md") ? 'translateX(0)' : 'translateY(0)'}` : `${innerWidth > ds.get("grid.width.md") ? 'translateX(-15%)' : 'translateY(20px)'}` }, from: { opacity: 0, transform: innerWidth > ds.get("grid.width.md") ? 'translateX(-15%)' : 'translateY(20px)' },
              delay: 425
            })
          }>
          <picture>
              <source srcSet="/static/images/bicycle@2x.png" media={`(min-width: ${pxTo(ds.get("grid.width.sm"), baseFontSize, "rem")})`} />
              <img src="" className="sm:max-w-555 lg:max-w-unset" />
          </picture>
          </animated.div>
        </div>

      </Fragment>
  }
)

export default UrbanRevolution