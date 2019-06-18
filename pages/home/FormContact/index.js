import React, { memo, Fragment, useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { useSpring, animated } from "react-spring"
import Form from "./Form"

const FormContact = memo((props) => {
  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  })

  return (
    <Fragment>
      <div ref={ref}>
        <animated.div
          style={useSpring({
            to: { opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)" },
            from: { opacity: 0, transform: "translateY(20px)" },
            delay: 350,
          })}
        >
          <Form locale={props.locale} />
        </animated.div>
      </div>
    </Fragment>
  )
})

export default FormContact
