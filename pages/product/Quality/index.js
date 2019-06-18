import React, { memo, useState, Fragment, useRef, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { useSpring, animated } from "react-spring"
import styles from "./styles.local.css"
import Container from "components/Container"
import Translate from "components/Translate"
import { ds } from "styles/tokens"
import { Carousel } from "react-responsive-carousel"
import MediaQuery from "react-responsive"
import { pxTo } from "design-system-utils"

const baseFontSize = ds.get("type.sizes.baseFontSize")

const Quality = memo((props) => {
  const { title, text, slider, price, locale, subtitle } = props
  const [innerWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  })
  const [ref, inView] = useInView({
    threshold: innerWidth > ds.get("grid.width.md") ? 0.45 : 0,
    triggerOnce: true,
  })

  return (
    <section ref={ref}>
      <Container
        contained={true}
        staticStyles={`flex flex-col-reverse md:grid md:gap-30 md:grid-col-12 ${styles.grid}`}
      >
        <div className={`md:relative ${styles.gridCol1}`}>
          <MediaQuery query={`(min-width: ${pxTo(ds.get("breakpoints.md"), baseFontSize, "rem")})`}>
            <animated.div
              style={useSpring({
                to: { opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(15px)" },
                from: { opacity: 0, transform: "translateY(15px)" },
                delay: 125,
              })}
              className={`${styles.slider} my-40 md:my-0 md:absolute md:top-0 md:left-0 md:h-full`}
            >
              <Carousel infiniteLoop useKeyboardArrows swipeable showThumbs={false}>
                {slider.map((element, key) => (
                  <div className="shadow-md" key={key}>
                    <img src={element.image.url} />
                  </div>
                ))}
              </Carousel>
            </animated.div>
          </MediaQuery>
        </div>
        <div className={styles.gridCol2}>
          <animated.h1
            className="text-center md:text-right text-blue-100"
            style={useSpring({
              to: { opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)" },
              from: { opacity: 0, transform: "translateY(20px)" },
              delay: 150,
            })}
          >
            {title}
          </animated.h1>
          <animated.p
            className="text-center md:text-right mt-15 mb-10 md:mt-30 md:mb-10 text-blue-100 text-base"
            style={useSpring({
              to: { opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(15px)" },
              from: { opacity: 0, transform: "translateY(15px)" },
              delay: 250,
            })}
          >
            {subtitle}
          </animated.p>
          <animated.div
            className="text-center mb-30 md:mb-0 md:text-right font-emphasis text-blue-100 text-base font-600"
            style={useSpring({
              to: { opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(10px)" },
              from: { opacity: 0, transform: "translateY(10px)" },
              delay: 350,
            })}
          >
            {price}
          </animated.div>
          <MediaQuery query={`(min-width: ${pxTo(ds.get("breakpoints.md"), baseFontSize, "rem")})`}>
            <animated.div
              className="text-left md:text-right md:mt-30"
              style={useSpring({
                to: { opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(10px)" },
                from: { opacity: 0, transform: "translateY(10px)" },
                delay: 450,
              })}
            >
              {text}
            </animated.div>
          </MediaQuery>
        </div>
      </Container>
      <MediaQuery query={`(max-width: 990px)`}>
        <animated.div
          style={useSpring({
            to: { opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(15px)" },
            from: { opacity: 0, transform: "translateY(15px)" },
            delay: 125,
          })}
          className={`${styles.slider} mb-30`}
        >
          <Carousel infiniteLoop useKeyboardArrows swipeable showThumbs={false}>
            {slider.map((element, key) => (
              <div className="shadow-md" key={key}>
                <img src={element.image.url} />
              </div>
            ))}
          </Carousel>
        </animated.div>
        <Container contained={true}>
          <animated.div
            className="text-left"
            style={useSpring({
              to: { opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(10px)" },
              from: { opacity: 0, transform: "translateY(10px)" },
              delay: 450,
            })}
          >
            {text}
          </animated.div>
        </Container>
      </MediaQuery>
    </section>
  )
})

export default Quality
