
import React, { memo, useEffect, useState, Fragment, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSpring, animated } from 'react-spring'
import { css } from "emotion"
import { mq } from "styles/tokens/helper"
import { ds } from "styles/tokens"

const Cover = memo(
  (props) => {
    const { cover, margins } = props
    const [innerWidth, setWindowWidth] = useState(0)
    useEffect(() => {

      setWindowWidth(window.innerWidth)
    })

    const [ref, inView] = useInView({

      threshold: innerWidth > ds.get("grid.width.md") ? 0.25 : 0,
      triggerOnce: true,
    })
    return <animated.div
        ref={ref}
        style={
          useSpring({
            to: { opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)' }, from: { opacity: 0, transform: 'translateY(30px)' },
          })
        }
          className={`hidden sm:block sm:bg-no-repeat sm:bg-center sm:bg-fixed ${margins}`.concat(" ", css({
            [mq.sm]: {
              height: '300px',
              "--bgImage": `url(${cover.url})`,
              backgroundSize: 'cover',
              backgroundImage: 'var(--bgImage)',
              "@media (-webkit-min-device-pixel-ratio: 1.25) and ( min--moz-device-pixel-ratio: 1.25) and ( -o-min-device-pixel-ratio: 1.25/1) and ( min-device-pixel-ratio: 1.25) and ( min-resolution: 200dpi) and ( min-resolution: 1.25dppx)": {
                "--bgImage": `url(${cover["desktop@2x"].url})`,
              },
            },

          }))} />
  }
)

export default Cover