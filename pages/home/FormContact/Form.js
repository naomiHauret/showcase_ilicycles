import React, { memo, Fragment, useState, useEffect } from "react"
import Translate from "components/Translate"
import Input from "components/Input"
import Button from "components/Button"
import ValidationMessage from "components/ValidationMessage"
import { useSendMail } from "services/formContact"
import { MAIL_TARGET } from "utils/config"
import styles from "./styles.local.css"
import { t } from "utils/translation"

const Form = memo((props) => {
  // Initial state
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    mail: "",
    message: "",
    sent: false,
  })

  const [submitDisabled, setSubmitDisabled] = useState(true)

  // sendMailQuery is an object that holds our query status (success, failure, pending)
  // sendMail calls useSendMail hook for us
  const [query, sendMail] = useSendMail()

  // componentDidUpdate
  // Empty form fields when mail is sent
  useEffect(() => {
    if (
      document.forms["sendEmail"].elements["*honeypot"].value === "" &&
      document.forms["sendEmail"].checkValidity() &&
      formData.firstname.trim() !== "" &&
      formData.mail.trim() !== "" &&
      formData.message.trim() !== "" &&
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
      'expéditeur': `${formData.firstname.trim()} ${formData.lastname.trim()}`,
      email: formData.mail.trim(),
      message: formData.message.trim(),
      "*reply": "email",
      "*subject": "Nouveau mail depuis votre site !",
      "*default_email": MAIL_TARGET,
    })
    setFormData({
      firstname: "",
      lastname: "",
      mail: "",
      message: "",
      sent: true,
    })

    setTimeout(() => setFormData({
      ...formData,
      sent: false,
    }), 5000)
  }

  return (
    <Fragment>
      <form className={`w-full flex flex-col md:items-baseline ${styles.form}`} name="sendEmail" role="form" onSubmit={handleSubmit}>
        <div className="mt-15 w-full">
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
            theme="colorful"
            placeholder={t("formContact.fields.firstname", { locale: props.locale })}
          />
        </div>
        <div className="mt-20 w-full">
          <Input
            handleChange={(e) =>
              setFormData({
                ...formData,
                lastname: e.target.value,
              })
            }
            theme="colorful"
            value={formData.lastname}
            label={<Translate id="formContact.fields.lastname" />}
            name="fc_lastname"
            type="text"
            tagType="input"
            pattern=".{3,50}"
            minLength="3"
            maxLength="50"
            size="50"
            placeholder={t("formContact.fields.lastname", { locale: props.locale })}
          />
        </div>
        <div className="mt-20">
          <Input
            handleChange={(e) =>
              setFormData({
                ...formData,
                mail: e.target.value,
              })
            }
            theme="colorful"
            value={formData.mail}
            label={<Translate id="formContact.fields.mail" />}
            name="fc_email"
            type="email"
            tagType="input"
            pattern=".{5,45}"
            maxLength="45"
            minLength="5"
            size="45"
            placeholder={t("formContact.fields.mail", { locale: props.locale })}
            pattern="[^@\s]+@[^@\s]+"
          />
        </div>
        <div className="mt-20 w-full">
          <Input
            handleChange={(e) =>
              setFormData({
                ...formData,
                message: e.target.value,
              })
            }
            theme="colorful"
            value={formData.message}
            label={<Translate id="formContact.fields.message" />}
            name="fc_message"
            placeholder={t("formContact.fields.message", { locale: props.locale })}
            tagType="textarea"
            minLength="5"
            maxLength="5000000"
            placeholder=" "
          />
        </div>
        <input type="hidden" name="*reply" value="email" />
        <input
          type="hidden"
          name="*subject"
          value="Hello Ili Cycles, quelqu'un vous a envoyé un nouveau mail depuis votre site !"
        />
        <input type="hidden" name="*honeypot" />
        <div
          className={"flex flex-col sm:flex-row mt-30 md:mt-20 items-center justify-center"}
        >
          <div className={`${
            submitDisabled === true ? "opacity-50 pointer-events-none" : "opacity-100"
            }`}
          >
            <Button tagType="button" theme="primary" variant="default" type="submit" disabled={submitDisabled}>
              <Translate id="formContact.send" />
            </Button>
          </div>
          <div className="text-center sm:text-left mt-20 sm:mt-0 sm:ml-15 text-green-100">
            {formData.sent === true && <ValidationMessage><Translate id="formContact.messageSent" /></ValidationMessage>}
          </div>
        </div>
      </form>
    </Fragment>
  )
})

export default Form
