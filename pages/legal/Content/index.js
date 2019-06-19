import React, { memo, useEffect, Fragment, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"
import { useSpring, animated } from "react-spring"
import { ds } from "styles/tokens"
const baseFontSize = ds.get("type.sizes.baseFontSize")

const Content = memo((props) => {
  const { title, text, picture } = props
  const [innerWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  })
  const [ref, inView] = useInView({
    threshold: innerWidth > ds.get("grid.width.md") ? 0.25 : 0,
    triggerOnce: true,
  })

  return (
    <div ref={ref}>
      <animated.h1
        style={useSpring({
          to: { opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(15px)" },
          from: { opacity: 0, transform: "translateY(15px)" },
          delay: 250,
        })}
        className="text-center md:text-left text-blue-100 my-30 md:mb-20 md:mt-80"
      >
        {title}
      </animated.h1>
      <div>
        <animated.div
          style={useSpring({
            to: { opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(10px)" },
            from: { opacity: 0, transform: "translateY(10px)" },
            delay: 375,
          })}
        >
          {text}
        </animated.div>
      </div>
    </div>
  )
})

export default Content
