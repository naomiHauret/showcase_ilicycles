import React, { memo, useState, Fragment, useRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSpring, animated } from 'react-spring'
import styles from './styles.local.css'
import Link from "next/link"
import Button from "components/Button"
import Translate from "components/Translate"
import { ds } from "styles/tokens"

const FrenchTouch = memo(
  (props) => {
    const { title, text, locale } = props
    const [innerWidth, setWindowWidth] = useState(0)

    useEffect(() => {

      setWindowWidth(window.innerWidth)
    })
    const [ref, inView] = useInView({

      threshold: innerWidth > ds.get("grid.width.md") ? 0.45 : 0,
      triggerOnce: true,
    })

    return <Fragment>
      <animated.h2
        ref={ref}
        style={
          useSpring({
            to: { opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(10px)' }, from: { opacity: 0, transform: 'translateY(10px)' },
            delay: 50,
          })
        }
        className='text-center sm:text-left text-blue-100 mb-20 sm:mb-30'>
          {title}
      </animated.h2>
      <div className="flex flex-col-reverse sm:grid sm:gap-30 sm:grid-col-12">
        <div className={`${styles.gridCol1} mt-30 md:mt-0`}>
          <animated.div ref={ref}
            style={
              useSpring({
                to: { opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)' }, from: { opacity: 0, transform: 'translateY(20px)' },
                delay: 250,
              })}
            >
              {text}
            </animated.div>
          <animated.div ref={ref}
            style={
              useSpring({
                to: { opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(15px)' }, from: { opacity: 0, transform: 'translateY(15px)' },
                delay: 350,
              })} className="flex justify-center sm:block">
              <Link
                prefetch
                passHref
                as={`/${locale}/brand`}
                href={`/brand?lang=${locale}`}
              >
                <a className="tw-button">
                  <Button tagType="div" additionalStyles="mt-30 sm:mt-35" theme="primary" variant="default">
                    <Translate id="home.ourSavoirFaire" />
                  </Button>
                </a>
              </Link>
            </animated.div>
        </div>
        <div
          className={`${styles.gridCol2} mx-auto sm:mx-unset max-w-400 sm:max-w-unset`}
        >
          <animated.img ref={ref}
            style={
              useSpring({
                to: { opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(25px)' }, from: { opacity: 0, transform: 'translateY(25px)' },
                delay: 550,
              })} className="w-full h-full object-contain" src="/static/images/map_mobile.png"
            srcSet="/static/images/map_mobile.png 250w,
              /static/images/map_mobile@2x.png 500w,
              /static/images/map_desktop.png 285w,
              /static/images/map_desktop@2x.png 570w"
            sizes="100vw"
            alt=""
          />
        </div>
      </div>
    </Fragment>
  }
)

export default FrenchTouch