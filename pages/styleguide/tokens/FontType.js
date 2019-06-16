import React, { Fragment } from "react"
import { css } from "emotion"

const FontType = ({ types }) => {
  return (
    <Fragment>
      {types.map((type, key) => (
        <div
          key={key}
          className={`font-${type}`.concat(
            " ",
            css({
              padding: "20px",
              boxShadow: "rgba(0, 0, 0, 0.12) 0 2px 5px 0",
              fontSize: "16px",
              marginBottom: key < types.length ? "10px" : 0,
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
            font-{type}
          </code>
          <p>
            Un cygne qui s'était évadé de sa cage, Et, de ses pieds palmés frottant le pavé sec, Sur le sol raboteux
            traînait son blanc plumage. Près d'un ruisseau sans eau la bête ouvrant le bec
          </p>
        </div>
      ))}
    </Fragment>
  )
}

export default FontType
