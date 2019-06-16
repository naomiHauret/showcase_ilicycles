import React, { Fragment } from "react"
import { css } from "emotion"

const LetterSpacing = ({ spacings }) => {
  return (
    <Fragment>
      {spacings.map((spacing, key) => (
        <div
          key={key}
          className={`tracking-${spacing}`.concat(
            " ",
            css({
              padding: "20px",
              boxShadow: "rgba(0, 0, 0, 0.12) 0 2px 5px 0",
              marginBottom: key < spacings.length ? "10px" : 0,
            }),
          )}
        >
          <code
            className={css({
              float: "right",
              padding: "10px 0 0 15px",
              color: "gray",
              fontSize: "12px",
            })}
          >
            tracking-{spacing}
          </code>
          <p>Un cygne qui s'était évadé de sa cage</p>
        </div>
      ))}
    </Fragment>
  )
}

export default LetterSpacing
