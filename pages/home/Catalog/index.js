import React, { memo, useEffect, Fragment, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSpring, animated } from 'react-spring'
import Button from 'components/Button'
import Translate from 'components/Translate'
import { ds } from "styles/tokens"

const Catalog = memo(
  (props) => {
    const { title, text, titleMargins, downloadUrl } = props
    const [innerWidth, setWindowWidth] = useState(0)

    useEffect(() => {

      setWindowWidth(window.innerWidth)
    })
    const [ref, inView] = useInView({

      threshold: innerWidth > ds.get("grid.width.md") ? 0.25 : 0,
      triggerOnce: true,
    })

    return <section ref={ref} className="hidden sm:block">
      <animated.h2
        style={
          useSpring({
            to: { opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(25px)' }, from: { opacity: 0, transform: 'translateY(25px)' },
            delay: 50,
          })
        }
      className={`text-blue-100 text-center sm:text-left ${titleMargins}`}>{title}</animated.h2>
      <animated.div

        style={
          useSpring({
            to: { opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(15px)' }, from: { opacity: 0, transform: 'translateY(15px)' },
            delay: 250,
          })
        }>
        {text}
      </animated.div>
      <animated.div
        style={
          useSpring({
            to: { opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(10px)' }, from: { opacity: 0, transform: 'translateY(10px)' },
            delay: 375,
          })
        }>
        <Button tagType="a" additionalStyles="sm:mt-35" theme="primary" variant="outline" href={downloadUrl}>
          <Translate id="home.downloadOurCatalog" />
        </Button>
      </animated.div>
    </section>
  }
)

export default Catalog