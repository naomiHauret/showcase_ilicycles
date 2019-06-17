import React, { memo, useEffect, useState, Fragment, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSpring, animated } from 'react-spring'
import Translate from "components/Translate"
import { ds } from "styles/tokens"

const FindUs = memo(
  (props) => {
    const { title, features, locale, titleMargins, text } = props
    const [innerWidth, setWindowWidth] = useState(0)

    useEffect(() => {

      setWindowWidth(window.innerWidth)
    })
    const [ref, inView] = useInView({

      threshold: innerWidth > ds.get("grid.width.md") ? 0.25 : 0,
      triggerOnce: true,
    })

    return <section>
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
      } className="mb-20 sm:mb-30">
        {text}
      </animated.div>
      <animated.div
        style={
          useSpring({
            to: { opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(15px)' }, from: { opacity: 0, transform: 'translateY(15px)' },
            delay: 300,
          })
        }
      className="fb-page flex justify-center sm:block w-full" data-href="https://www.facebook.com/ilicycles/" data-tabs="journal" data-height="140" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="false"><blockquote cite="https://www.facebook.com/ilicycles/" className="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/ilicycles/">Ili cycles</a></blockquote></animated.div>

      <animated.div style={
        useSpring({
          to: { opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(15px)' }, from: { opacity: 0, transform: 'translateY(15px)' },
          delay: 325,
        })
      } className="flex items-center mt-30 mb-40">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"><g fill="#15ACDF"><path d="M24.825 29.796a4.978 4.978 0 0 0 4.972-4.97 4.954 4.954 0 0 0-.94-2.897 4.964 4.964 0 0 0-4.029-2.073c-1.659 0-3.126.82-4.031 2.072a4.947 4.947 0 0 0-.94 2.897 4.973 4.973 0 0 0 4.968 4.971zm10.853-11.05V13.96l-.623.002-4.164.013.016 4.787z"></path><path d="M24.826 0C11.137 0 0 11.137 0 24.826c0 13.688 11.137 24.826 24.826 24.826 13.688 0 24.826-11.138 24.826-24.826C49.652 11.137 38.516 0 24.826 0zm14.119 21.929v11.56a5.463 5.463 0 0 1-5.457 5.458H16.164a5.462 5.462 0 0 1-5.457-5.458V16.165a5.462 5.462 0 0 1 5.457-5.457h17.323a5.463 5.463 0 0 1 5.458 5.457v5.764z"></path><path d="M32.549 24.826c0 4.257-3.464 7.723-7.723 7.723s-7.722-3.466-7.722-7.723a7.67 7.67 0 0 1 .568-2.897h-4.215v11.56a2.706 2.706 0 0 0 2.706 2.704h17.323a2.707 2.707 0 0 0 2.706-2.704v-11.56h-4.217c.367.894.574 1.873.574 2.897z"></path></g></svg>
        <a className="block ml-10" href="https://www.instagram.com/ili_cycles">
          <Translate id="home.findUsOnInstagram" />
        </a>
      </animated.div>
    </section>
  }
)

export default FindUs