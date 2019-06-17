import React, { memo, useEffect, Fragment, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSpring, animated } from 'react-spring'
import { ds } from "styles/tokens"
import styles from './styles.local.css'
import { pxTo } from 'design-system-utils'
const baseFontSize = ds.get("type.sizes.baseFontSize")

const Content = memo(
  (props) => {
    const { title, text, picture } = props
    const [innerWidth, setWindowWidth] = useState(0)

    useEffect(() => {

      setWindowWidth(window.innerWidth)
    })
    const [ref, inView] = useInView({

      threshold: innerWidth > ds.get("grid.width.md") ? 0.25 : 0,
      triggerOnce: true,
    })

    return <div ref={ref}>
      <animated.h2 style={
        useSpring({
          to: { opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(15px)' }, from: { opacity: 0, transform: 'translateY(15px)' },
          delay: 250,
        })
      } className="text-center md:text-left text-blue-100 my-30 md:mb-20 md:mt-80">{title}</animated.h2>
      <div className={`md:grid md:grid-col-12 md:gap-30 ${styles.grid}`}>
        <animated.div style={
          useSpring({
            to: { opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(10px)' }, from: { opacity: 0, transform: 'translateY(10px)' },
            delay: 375,
          })
        } className={`${styles.gridCol1}`}>
          {text}
        </animated.div>
        <animated.div style={
          useSpring({
            to: { opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(5px)' }, from: { opacity: 0, transform: 'translateY(5px)' },
            delay: 350,
          })
        } className={`${styles.gridCol2} hidden md:relative md:block`}>
          <picture className="w-full h-full block absolute left-0 top-0">
            <source
              srcSet={picture.url} media={`(min-width: ${pxTo(ds.get("grid.width.md"), baseFontSize, "rem")})`} />

            <source
              srcSet={picture['desktop@2x'].url} media={`(min-width: ${pxTo(ds.get("grid.width.md"), baseFontSize, "rem")}) (-webkit-min-device-pixel-ratio: 1.25) and ( min--moz-device-pixel-ratio: 1.25) and ( -o-min-device-pixel-ratio: 1.25/1) and ( min-device-pixel-ratio: 1.25) and ( min-resolution: 200dpi) and ( min-resolution: 1.25dppx)`} />

            <img src='' className="w-full h-full object-cover" />
          </picture>
        </animated.div>
      </div>
    </div>

  }
)

export default Content