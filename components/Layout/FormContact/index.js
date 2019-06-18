import React, { memo } from "react"
import styles from './styles.local.css'
import Container from "components/Container"
import Form from './Form'

const FormContact = memo((props) => {
  const { title, text, locale } = props

  return (
    <section id="contact" className="py-40 md:py-50 bg-blue-100 text-white-100 mb-50 md:mb-80">
      <Container contained={true} staticStyles="md:grid md:gap-30 md:grid-col-12">
        <div className={`text-center md:text-left ${styles.gridCol1}`}>
          <h4 className="text-13 font-600 mb-15 sm:mb-20 sm:text-20">{title}</h4>
          {text}
        </div>

        <div className={styles.gridCol2}>
          <Form locale={locale} />
        </div>
      </Container>
    </section>
  )

})

export default FormContact
