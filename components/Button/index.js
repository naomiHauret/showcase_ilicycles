import React, { memo } from "react"
import styles from './styles.local.css'

const themeSystem = {
  bg: {
    primary: {
      default: "bg-blue-100 focus:bg-blue-200 hover:bg-blue-200",
      outline: "bg-transparent hover:bg-blue-100  focus:bg-blue-100",
      inverted: 'bg-white-100 hover:bg-white-200  focus:bg-white-200',
    },
    secondary: {
      default: "bg-white-100 hover:bg-white-200  focus:bg-white-200",
      outline: "bg-white-100 hover:bg-white-200  focus:bg-white-200",
      inverted: 'bg-white-100 hover:bg-white-200  focus:bg-white-200',
    },
  },
  border: {
    primary: {
      default: "border-transparent",
      outline: "border-blue-100",
      inverted: 'border-transparent',
    },
    secondary: {
      default: " border-transparent",
      outline: "border-transparent",
      inverted: 'border-transparent',
    },
  },
  color: {
      primary:  {
        default: "text-white-100",
        outline: "text-blue-100 focus:text-white-100 hover:text-white-100",
        inverted: 'text-blue-100',
      },
      secondary:  {
        default: "text-black-100",
        outline: "text-black-100",
        inverted: 'text-black-100',
      },
  },
}

const Button = memo((props) => {
  const { children, tagType, theme, variant, duotheme, additionalStyles } = props
  const ComponentTag = tagType
  const componentProps = {}
  Object.keys(props)
    .filter((prop) => ["children", "tagType", "theme", "duotheme", "variant", "additionalStyles"].includes(prop) === false)
    .map((p) => (componentProps[p] = props[p]))

  return (
    <ComponentTag
      className={`
      tw-button
      text-center
      font-600
      font-emphasis
      py-10 px-30
      text-base
      rounded-5
      inline-flex
      justify-center
      no-underline
      border-solid
      border-1
      font-600
      tracking-052
      uppercase
      ${additionalStyles}
      ${styles.animation}
      ${themeSystem.bg[theme][variant]}
      ${themeSystem.border[theme][variant]}
      ${themeSystem.color[theme][variant]}
    `}
      {...componentProps}
    >
      {children}
    </ComponentTag>
  )
})

Button.defaultProps = {
  theme: 'primary',
  variant: 'default',
  duotheme: false,
  additionalStyles: "",
}

export default Button
