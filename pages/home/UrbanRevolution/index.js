
import React, { memo, Fragment } from 'react'
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
      const baseFontSize = ds.get("type.sizes.baseFontSize")
      return <Fragment>
        <div className={styles.urbanRevolutionCol1}>
          <animated.h1
          style={
            useSpring({
              to: { opacity: 1, transform: 'translateX(0)' }, from: { opacity: 0,  transform: 'translateX(-15px)' },
              delay: 550
            })
          } className="mt-30 sm:mt-0 mb-20 sm:mb-15">{title}</animated.h1>
          <animated.div style={
            useSpring({
              to: { opacity: 1, transform: 'translateX(0)' }, from: { opacity: 0,  transform: 'translateX(-15px)' },
              delay: 650
            })
          }>
            {text}
          </animated.div>
          <animated.div  style={
            useSpring({
              to: { opacity: 1, transform: 'translateX(0)' }, from: { opacity: 0,  transform: 'translateX(-15px)' },
              delay: 730
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
              to: { opacity: 1, transform: 'translateX(0) translateY(0) rotate(0deg) ' }, from: { opacity: 0,  transform: 'translateX(-35px) translateY(15px) rotate(-5deg)' },
              delay: 730
            })
          }>
          <picture>
              <source srcset="/static/images/bicycle@2x.png" media={`(min-width: ${pxTo(ds.get("grid.width.sm"), baseFontSize, "rem")})`} />
              <img src="" className="md:max-w-555 lg:max-w-unset" />
          </picture>
          </animated.div>
        </div>

      </Fragment>
  }
)

export default UrbanRevolution