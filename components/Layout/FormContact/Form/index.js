import React, { memo, Fragment, useState, useEffect } from "react"
import Translate from 'components/Translate'
import Input from "components/Input"
import Button from "components/Button"
import { useSendMail } from "services/formContact"
import { MAIL_TARGET } from "utils/config"
import { useInView } from 'react-intersection-observer'
import { useSpring, animated } from 'react-spring'
import styles from './styles.local.css'
import { t } from "utils/translation"

const Form = memo((props) => {
  // Initial state
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    mail: "",
  })
  const [ref, inView] = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  })

  const [submitDisabled, setSubmitDisabled] = useState(true)

  // sendMailQuery is an object that holds our query status (success, failure, pending)
  // sendMail calls useSendMail hook for us
  const [query, sendMail] = useSendMail()

  // componentDidUpdate
  // Empty form fields when mail is sent
  useEffect(() => {
    if (query.success === true) {
      setFormData({
        firstname: "",
        lastname: "",
        mail: "",
      })
    }
    if (
      document.forms["sendEmail"].elements["*honeypot"].value === "" &&
      document.forms["sendEmail"].checkValidity() &&
      formData.firstname.trim() !== "" &&
      formData.mail.trim() !== "" &&
      formData.lastname.trim() !== ""
    ) {
      setSubmitDisabled(false)
    } else {
      setSubmitDisabled(true)
    }
  })

  // handle form submit
  function handleSubmit(e) {
    e.preventDefault()
    sendMail({
      sender: `${formData.firstname.trim()} ${formData.lastname.trim()}` ,
      email: formData.mail.trim(),
      "*reply": "email",
      "*subject": "Nouveau mail",
      "*default_email": MAIL_TARGET,
    })
  }

  return (
    <Fragment>
      <form
        ref={ref}
        className={`w-full flex flex-col md:grid overflow-hidden ${styles.grid}`}
        name="sendEmail"
        role="form"
        onSubmit={handleSubmit}
      >
          <div className="my-20 md:my-0 w-full">
            <Input
              handleChange={(e) =>
                setFormData({
                  ...formData,
                  firstname: e.target.value,
                })
              }
              value={formData.firstname}
              label={<Translate id="formContact.fields.firstname" />}
              name="fc_firstname"
              type="text"
              tagType="input"
              pattern=".{3,50}"
              minLength="3"
              maxLength="50"
              size="50"
              placeholder={t("formContact.fields.firstname", {locale: props.locale})}
            />
          </div>
          <div className="mb-20 md:mb-0 w-full">
            <Input
              handleChange={(e) =>
                setFormData({
                  ...formData,
                  lastname: e.target.value,
                })
              }
              value={formData.name}
              label={<Translate id="formContact.fields.lastname" />}
              name="fc_lastname"
              type="text"
              tagType="input"
              pattern=".{3,50}"
              minLength="3"
              maxLength="50"
              size="50"
              placeholder={t("formContact.fields.lastname", {locale: props.locale})}
            />
          </div>
          <div className="w-full">
            <Input
              handleChange={(e) =>
                setFormData({
                  ...formData,
                  mail: e.target.value,
                })
              }
              value={formData.mail}
              label={<Translate id="formContact.fields.mail" />}
              name="fc_email"
              type="email"
              tagType="input"
              pattern=".{5,45}"
              maxLength="45"
              minLength="5"
              size="45"
              placeholder={t("formContact.fields.mail", {locale: props.locale})}
              pattern="[^@\s]+@[^@\s]+"
            />
          </div>
        <input type="hidden" name="*reply" value="email" />
        <input type="hidden" name="*subject" value="Hello Ili Cycles, quelqu'un vous a envoyé un nouveau mail depuis votre site !" />
        <input type="hidden" name="*honeypot" />
        <div className={`${submitDisabled === true ? 'opacity-50' : 'opacity-100' } flex mt-30 md:mt-20 items-center justify-center md:block ${styles.button}`}>
          <Button
            tagType="button"
            theme="primary"
            variant="inverted"
            type="submit"
            disabled={submitDisabled}
          >
            <Translate id="formContact.interested" />
          </Button>
        </div>
      </form>
    </Fragment>
  )
})

export default Form