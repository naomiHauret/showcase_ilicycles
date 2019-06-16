import React, { memo, useState, Fragment, useRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useSpring, animated } from 'react-spring'
import styles from './styles.local.css'
import Link from "next/link"
import Button from "components/Button"
import Container from "components/Container"
import Translate from "components/Translate"
import { ds } from "styles/tokens"
import {Carousel} from 'react-responsive-carousel'

const TransportCapacity = memo(
  (props) => {
    const { title, text, slider, locale } = props
    const [innerWidth, setWindowWidth] = useState(0)

    useEffect(() => {
      // Update the document title using the browser API
      setWindowWidth(window.innerWidth)
    })
    const [ref, inView] = useInView({
      /* Optional options */
      threshold: innerWidth > ds.get("grid.width.md") ? 0.45 : 0,
      triggerOnce: true,
    })

    return <section className={`relative mt-40 ${styles.transportCapacity}`}>
      <div className={`${styles.slider} shadow-md md:absolute md:top-0 md:left-0 md:h-full`}>
        <Carousel
          infiniteLoop useKeyboardArrows swipeable showThumbs={false}>
          {slider.map((element, key) => <div key={key}>
              <img  src={element.photo.url} />
            </div>

          )}
        </Carousel>
      </div>
      <Container contained={true} staticStyles={`md:grid md:gap-30 md:grid-col-12 ${styles.contentWrapper}`}>
        <div className={`${styles.content} md:text-right`}>
          <h2 className='text-blue-100 mb-30'>{title}</h2>
          <div>
            {text}
          </div>
        </div>
        <div className="mt-55">
          <Link
            prefetch
            passHref
            as={`/${locale}/product`}
            href={`/product?lang=${locale}`}
          >
            <a className="tw-button">
              <Button tagType="div" additionalStyles="mt-30 sm:mt-35" theme="primary" variant="default">
                <Translate id="home.features" />
              </Button>
            </a>
          </Link>
        </div>
      </Container>
    </section>
  }
)

export default TransportCapacity