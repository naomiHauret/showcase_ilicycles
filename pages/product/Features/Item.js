import React, { memo, useState, Fragment, useRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSpring, animated } from 'react-spring'
import styles from './styles.local.css'
import Container from "components/Container"
import Translate from "components/Translate"
import { ds } from "styles/tokens"
import { Carousel } from 'react-responsive-carousel'
import ReactSVG from 'react-svg'
import { pxTo } from 'design-system-utils'
const baseFontSize = ds.get("type.sizes.baseFontSize")

const Item = memo(
  (props) => {
    const { title, text, backgroundImage, photos } = props
    const [innerWidth, setWindowWidth] = useState(0)

    useEffect(() => {

      setWindowWidth(window.innerWidth)
    })
    const [ref, inView] = useInView({

      threshold: innerWidth > ds.get("grid.width.md") ? 0.65 : 0,
      triggerOnce: true,
    })
    const baseFontSize = ds.get("type.sizes.baseFontSize")

    return <section ref={ref} className={`${styles.contentWrapper} md:grid md:gap-30 md:grid-col-12`}>
          <div className={`flex flex-col ${styles.content} md:justify-between`}>
            <div className="relative">
              <animated.h2
                style={
                  useSpring({
                    to: { opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)' }, from: { opacity: 0, transform: 'translateY(20px)' },
                    delay: 125,
                  })
                }
                className={`text-blue-100 md:mb-30 md:mb-55 ${styles.metadata}`}>{title}</animated.h2>
              <animated.div style={
                useSpring({
                  to: { opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(15px)' }, from: { opacity: 0, transform: 'translateY(15px)' },
                  delay: 325,
                })
              } className={`tracking-039 text-14 md:font-bold ${styles.metadata}`}>
                {text}
              </animated.div>
              <div className={`absolute ${styles.featureIcon} ${styles.metadata}`}>
                <animated.div style={
                  useSpring({
                    to: { opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(10px)' }, from: { opacity: 0, transform: 'translateY(10px)' },
                    delay: 475,
                  })
                }>

                  <ReactSVG src={backgroundImage} />
                </animated.div>
              </div>
            </div>
            <animated.div style={
              useSpring({
                to: { opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(15px)' }, from: { opacity: 0, transform: 'translateY(15px)' },
                delay: 385,
              })
            } className={`relative mt-20 shadow-md md:mt-0 md:w-6/12 ${styles.featureImage}`}>
              <picture className="w-full h-full block absolute">
                <source
                  srcSet={photos.mobile.url} media={`(min-width: 0px)`} />
                <source
                  srcSet={photos['mobile@2x'].url} media={`(min-width: 0) and (-webkit-min-device-pixel-ratio: 1.25) and ( min--moz-device-pixel-ratio: 1.25) and ( -o-min-device-pixel-ratio: 1.25/1) and ( min-device-pixel-ratio: 1.25) and ( min-resolution: 200dpi) and ( min-resolution: 1.25dppx))`} />

                <source
                  srcSet={photos.url.url} media={`(min-width: ${pxTo(ds.get("grid.width.md"), baseFontSize, "rem")})`} />

                <source
                  srcSet={photos['@2x'].url} media={`(min-width: ${pxTo(ds.get("grid.width.md"), baseFontSize, "rem")}) (-webkit-min-device-pixel-ratio: 1.25) and ( min--moz-device-pixel-ratio: 1.25) and ( -o-min-device-pixel-ratio: 1.25/1) and ( min-device-pixel-ratio: 1.25) and ( min-resolution: 200dpi) and ( min-resolution: 1.25dppx)`} />

                <img src={photos.preview.url} className="w-full h-full object-cover" />
              </picture>
            </animated.div>
          </div>
        </section>
  }
)

export default Item