import React, { memo, useState, Fragment, useRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSpring, animated } from 'react-spring'
import styles from './styles.local.css'
import Link from "next/link"
import Button from "components/Button"
import Container from "components/Container"
import Translate from "components/Translate"
import { ds } from "styles/tokens"
import {Carousel} from 'react-responsive-carousel'
import ReactSVG from 'react-svg'

const TransportCapacity = memo(
  (props) => {
    const { title, text, slider, locale, features } = props
    const [innerWidth, setWindowWidth] = useState(0)

    useEffect(() => {
      // Update the document title using the browser API
      setWindowWidth(window.innerWidth)
    })
    const [ref, inView] = useInView({
      /* Optional options */
      threshold: innerWidth > ds.get("grid.width.md") ? 0.45 : 0,
      triggerOnce: true,
    })

    return <section ref={ref} className={`relative mt-80 ${styles.transportCapacity} flex flex-col-reverse md:block`}>
      <animated.div
        style={
          useSpring({
            to: { opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(15px)' }, from: { opacity: 0, transform: 'translateY(15px)' },
            delay: 150,
          })
        }
      className={`${styles.slider} my-40 md:my-0 md:absolute md:top-0 md:left-0 md:h-full`}>
        <Carousel
          infiniteLoop useKeyboardArrows swipeable showThumbs={false}>
          {slider.map((element, key) => <div className="shadow-md" key={key}>
              <img  src={element.photo.url} />
            </div>

          )}
        </Carousel>
      </animated.div>
      <Container contained={true} staticStyles={`md:grid md:gap-30 md:grid-col-12 ${styles.contentWrapper}`}>
        <div className={`${styles.content} md:text-right`}>
          <animated.h2
            style = {
              useSpring({
                to: {
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(10px)'
                },
                from: {
                  opacity: 0,
                  transform: 'translateY(10px)'
                },
                delay: 250,
              })
            }
          className='text-blue-100 mb-30'>{title}</animated.h2>
          <animated.div style={
          useSpring({
            to: { opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(10px)' }, from: { opacity: 0, transform: 'translateY(10px)' },
            delay: 350,
          })
        }>
            {text}

            <ul className={`${styles.featuresGrid} grid m-0 mt-50 md:mt-40 p-0 list-none md:text-15 text-black-100 font-emphasis tracking-045 md:tracking-052`}>
              {features.map((feature, key) => <li className="items-center m-0 p-0 flex" key={key}>
                <ReactSVG
                  src={feature.icon.url}
                />
                <span className="block ml-10 md:ml-15 text-left">
                  {feature.label}
                </span>
              </li>)}
            </ul>
          </animated.div>
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
              delay: 450,
            })
          }
          className="hidden md:mt-55 md:block">
            <Link
              prefetch
              passHref
              as={`/${locale}/product`}
              href={`/product?lang=${locale}`}
            >
              <a className="tw-button">
                <Button tagType="div" additionalStyles="mt-30 sm:mt-35" theme="primary" variant="default">
                  <Translate id="home.features" />
                </Button>
              </a>
            </Link>
          </animated.div>
        </div>
      </Container>
    </section>
  }
)

export default TransportCapacity