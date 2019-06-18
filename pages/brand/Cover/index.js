import React, { memo, useEffect, Fragment, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"
import { useSpring, animated } from "react-spring"
import { ds } from "styles/tokens"
import styles from "./styles.local.css"
import { pxTo } from "design-system-utils"
const baseFontSize = ds.get("type.sizes.baseFontSize")

const Cover = memo((props) => {
  const { title, image } = props
  const [innerWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  })
  const [ref, inView] = useInView({
    threshold: innerWidth > ds.get("grid.width.md") ? 0.25 : 0,
    triggerOnce: true,
  })

  return (
    <div ref={ref} className={`${styles.cover} flex relative items-center justify-center`}>
      <animated.picture
        style={useSpring({
          to: { opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(10px)" },
          from: { opacity: 0, transform: "translateY(10px)" },
        })}
        className="w-full h-full block absolute left-0 top-0"
      >
        <source srcSet={image["md"].url} media={`(min-width: 319px)`} />
        <source srcSet={image["@2x"].url} media={`(min-width: 990px)`} />
        <img src={image.preview.url} className="w-full h-full object-cover" />
      </animated.picture>
      <animated.h1
        style={useSpring({
          to: { opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(5px)" },
          from: { opacity: 0, transform: "translateY(5px)" },
          delay: 250,
        })}
        className="text-center z-1 relative text-white-100"
      >
        {title}
      </animated.h1>
    </div>
  )
})

export default Cover
