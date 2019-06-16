import React, { memo, useEffect, useState, Fragment, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSpring, animated } from 'react-spring'
import ReactSVG from 'react-svg'
import styles from './styles.local.css'
import Link from "next/link"
import Container from "components/Container"
import Button from "components/Button"
import Translate from "components/Translate"
import { RichText } from "prismic-reactjs"
import { ds } from "styles/tokens"

const DailyTravel = memo(
  (props) => {
    const { title, features, locale, margins } = props
    const [innerWidth, setWindowWidth] = useState(0)

    useEffect(() => {
      // Update the document title using the browser API
      setWindowWidth(window.innerWidth)
    })
    const [ref, inView] = useInView({
      /* Optional options */
      threshold: innerWidth > ds.get("grid.width.md") ? 0.75 : 0,
      triggerOnce: true,
    })

    return <section className={margins}>
      <Container contained={true}>
        <animated.h2
          ref={ref}
          className='text-blue-100 text-center mb-30 md:mb-50'
          style={
            useSpring({
              to: { opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(25px)' }, from: { opacity: 0, transform: 'translateY(25px)' },
              delay: innerWidth > ds.get("grid.width.md") ? 250 : 0,
            })
          }
        >
          {title}
        </animated.h2>
        <animated.div

          style={
            useSpring({
              to: { opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(5px)' }, from: { opacity: 0, transform: 'translateY(5px)' },
              delay: innerWidth > ds.get("grid.width.md") ? 450 : 50,
            })
          }

        className={`${styles.featuresGrid} grid gap-30`}>
          {features.map((feature, key) => <figure className={`${key < features.length - 1 ? 'mb-40 md:mb-0' : ''}`} key={key}>
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
        </animated.div>
        <animated.div className="flex justify-center mt-30 mb-40 md:mt-0"
          style={
            useSpring({
              to: { opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(15px)' }, from: { opacity: 0, transform: 'translateY(15px)' },
              delay: innerWidth > ds.get("grid.width.md") ? 550 : 100,
            })
          }>
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
        </animated.div>
      </Container>
    </section>
  }
)

export default DailyTravel