
import React, { memo, useEffect, useState } from 'react'
import { useSpring, animated } from 'react-spring'
import { useInView } from 'react-intersection-observer'
import { ds } from "styles/tokens"
import styles from './styles.local.css'

const Decoration = memo(
  (props) => {
      const [innerWidth, setWindowWidth] = useState(0)

      useEffect(() => {
        // Update the document title using the browser API
        setWindowWidth(window.innerWidth)
      })
      const [ref, inView] = useInView({
        /* Optional options */
        threshold: innerWidth > ds.get("grid.width.md") ? 0.5 : 0,
        triggerOnce: true,
      })


      return <animated.div ref={ref} className={`absolute z-0 top-0 left-0 h-full bg-transparent sm:bg-blue-100 ${styles.decoration}`}
          style={
            useSpring({
              to: { opacity: inView ? 1 : 0, width: inView ? '70.2125%' : '0%' }, from: { opacity: 0,  width: '0%' },
              delay: 350
            })
          }
        />
  }
)

export default Decoration