
import React, { memo } from 'react'
import { useSpring, animated } from 'react-spring'
import styles from './styles.local.css'
const Decoration = memo(
  (props) => {
      return <animated.div className={`absolute z-0 top-0 left-0 sm:bg-blue-100 ${styles.decoration}`}
          style={
            useSpring({
              to: { opacity: 1, width: '70.2125%' }, from: { opacity: 0,  width: '0%' },
              delay: 350
            })
          }
        />
  }
)

export default Decoration