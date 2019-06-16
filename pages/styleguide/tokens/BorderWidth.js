import React from "react"
import { css } from "emotion"

const BorderWidth = ({ widths }) => {
  return (
    <div
      className={css({
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridAutoRows: "auto",
        gridGap: "30px",
      })}
    >
      {widths.map((value, key) => (
        <figure
          className={`border-solid border-${value}`.concat(
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

export default BorderWidth
