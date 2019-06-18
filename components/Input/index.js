import React, { Fragment } from "react"
import { css } from "emotion"
import { pxTo } from "design-system-utils"
import { ds } from "styles/tokens"
import { mq } from "styles/tokens/helper"
import styles from "./styles.local.css"

const baseFontSize = ds.get("type.sizes.baseFontSize")
const themeSystem = {
  borders: {
    default: "border-white-100",
    colorful: "border-blue-100",
  },
  colors: {
    default: "text-white-100",
    colorful: "text-grey-200",
  },
}

const Input = (props) => {
  const { label, name, handleChange, tagType, theme } = props
  const inputProps = {}
  Object.keys(props)
    .filter((prop) => ["label", "handleChange", "tagType"].includes(prop) === false)
    .map((p) => (inputProps[p] = props[p]))

  const InputTag = tagType
  return (
    <Fragment>
      <label className={`text-14 tracking-045 text-left`} htmlFor={name}>
        <div className="hidden">{label}</div>
        <div
          className={`relative overflow-hidden ${tagType === "textarea" ? "" : "w-full"}`.concat(
            " ",
            css({
              marginTop: tagType === "textarea" ? "0.5ch" : 0,
              [mq.md]: {
                marginTop: tagType === "textarea" ? "1ch" : 0,
              },
            }),
          )}
        >
          <InputTag
            className={`
              w-full
              ${tagType !== "textarea" ? "mt-10 md:mt-0 pb-10" : ""}
              font-family-inherit text-inherit
              focus:outline-none
              bg-transparent
              border-0
              border-b-1
              ${themeSystem.colors[theme]}
              ${themeSystem.borders[theme]}
              block
              h-full
            `.concat(
              " ",
              css({
                minHeight: tagType === "textarea" ? pxTo(100, baseFontSize, "rem") : 0,
                resize: "none",
              }),
            )}
            onChange={handleChange}
            required
            {...inputProps}
          />
        </div>
      </label>
    </Fragment>
  )
}

Input.defaultProps = {
  theme: "default",
}

export default Input
