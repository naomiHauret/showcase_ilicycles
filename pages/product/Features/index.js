import React, { memo, useState, Fragment, useRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSpring, animated } from 'react-spring'
import styles from './styles.local.css'
import Container from "components/Container"
import Link from "next/link"
import Button from "components/Button"
import Translate from "components/Translate"
import { ds } from "styles/tokens"
import { Carousel } from 'react-responsive-carousel'
import ReactSVG from 'react-svg'
import { RichText } from "prismic-reactjs"
import { pxTo } from 'design-system-utils'
import Item from './Item'
const baseFontSize = ds.get("type.sizes.baseFontSize")
const Features = memo(
  (props) => {
    const { list, locale } = props
    const [innerWidth, setWindowWidth] = useState(0)

    useEffect(() => {

      setWindowWidth(window.innerWidth)
    })
    const [ref, inView] = useInView({

      threshold: innerWidth > ds.get("grid.width.md") ? 0.45 : 0,
      triggerOnce: true,
    })
const baseFontSize = ds.get("type.sizes.baseFontSize")

    return <div className="mt-40 md:mt-150" ref={ref}>
      <Container contained={true} staticStyles={styles.featuresWrapper}>
        {list.map((feature, key) => <Item
           key={key}
           photos={feature.photo}
           backgroundImage={feature.backgroundimage.url}
           title={feature.title}
           text={RichText.render(feature.text)}
           />
        )}
        <animated.div style={
          useSpring({
            to: {
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(10px)'
            },
            from: {
              opacity: 0,
              transform: 'translateY(10px)'
            },
          })
        }
          className="flex justify-center mt-40 mb-50 md:mb-80 md:mt-0">
          <Link
            prefetch
            passHref
            as={`/${locale}/brand`}
            href={`/brand?lang=${locale}`}
          >
            <a className="tw-button">
              <Button tagType="div" additionalStyles="mt-30 sm:mt-35" theme="primary" variant="default">
                <Translate id="product.ourBrand" />
              </Button>
            </a>
          </Link>
        </animated.div>
      </Container>
    </div>
  }
)

export default Features