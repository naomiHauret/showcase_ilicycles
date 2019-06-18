import React, { memo, Fragment, useState, useEffect } from "react"
import Translate from "components/Translate"
import Input from "components/Input"
import Button from "components/Button"
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
        message: "",
      })
    }
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
      sender: `${formData.firstname.trim()} ${formData.lastname.trim()}`,
      email: formData.mail.trim(),
      message: formData.message.trim(),
      "*reply": "email",
      "*subject": "Nouveau mail",
      "*default_email": MAIL_TARGET,
    })
  }
  return (
    <Fragment>
      <form className={`w-full flex flex-col ${styles.form}`} name="sendEmail" role="form" onSubmit={handleSubmit}>
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
        <div className="w-full mt-20">
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
        <div className="w-full mt-20">
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
          className={`${
            submitDisabled === true ? "opacity-50" : "opacity-100"
          } flex mt-30 md:mt-20 items-center justify-center md:block ${styles.button}`}
        >
          <Button tagType="button" theme="primary" variant="default" type="submit" disabled={submitDisabled}>
            <Translate id="formContact.send" />
          </Button>
        </div>
      </form>
    </Fragment>
  )
})

export default Form
