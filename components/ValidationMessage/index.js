import React, { Fragment, useState, useEffect } from "react"
import { useSpring, animated, useTransition } from "react-spring"

const ValidationMessage = (componentProps) => {
  useEffect(() => {
    setTimeout(() => setVisible(false), 5000)
  }, [])
  const [visible, setVisible] = useState(true)
  const transitions = useTransition(visible, null, {
    from: { opacity: 0, transform: 'translateY(5px)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(-5px)' },
  })

  return (
    <Fragment>
      {transitions.map(({ item, key, props }) =>
        visible && <animated.div key={key} style={props}>{componentProps.children}</animated.div>
      )}
    </Fragment>
  )
}

export default ValidationMessage
