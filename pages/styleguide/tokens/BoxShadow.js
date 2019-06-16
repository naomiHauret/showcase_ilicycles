import React from "react"
import { css } from "emotion"

const BoxShadow = ({ shadows }) => {
  return (
    <div
      className={css({
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridAutoRows: "auto",
        gridGap: "30px",
      })}
    >
      {shadows.map((value, key) => (
        <figure
          className={`shadow-${value}`.concat(
            " ",
            css({
              width: "100%",
              height: "200px",
              padding: 0,
              margin: 0,
              position: "relative",
            }),
          )}
        >
          <figcaption
            className={css({
              padding: "10px 20px",
              backgroundColor: "#FFFFFF",
              position: "absolute",
              bottom: 0,
              margin: 0,
              width: "100%",
              "> code": {
                fontSize: "12px",
                display: "block",
                color: "gray",
              },
            })}
          >
            <code>{value}</code>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

export default BoxShadow
