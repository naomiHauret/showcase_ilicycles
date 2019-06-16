import React, { memo, useEffect, Fragment, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSpring, animated } from 'react-spring'
import { ds } from "styles/tokens"

const ContactUs = memo(
  (props) => {
    const { title, text, titleMargins } = props
    const [innerWidth, setWindowWidth] = useState(0)
    useEffect(() => {
      // Update the document title using the browser API
      setWindowWidth(window.innerWidth)
    })
    const [ref, inView] = useInView({
      /* Optional options */
      threshold: innerWidth > ds.get("grid.width.md") ? 0.25 : 0,
      triggerOnce: true,
    })

    return <Fragment>
      <animated.h2 ref={ref}
        style={
          useSpring({
            to: { opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(25px)' }, from: { opacity: 0, transform: 'translateY(25px)' },
            delay: 50,
          })
        } className={`text-blue-100 text-center sm:text-left ${titleMargins}`}>{title}</animated.h2>
      <animated.div style={
        useSpring({
          to: { opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(15px)' }, from: { opacity: 0, transform: 'translateY(15px)' },
          delay: 250,
        })
      } >
        {text}
      </animated.div>
    </Fragment>
  }
)

export default ContactUs