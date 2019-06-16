import React from "react"
import { css } from "emotion"

const Palette = ({ colors }) => {
  return (
    <div
      className={css({
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridAutoRows: "auto",
        gridGap: "30px",
      })}
    >
      {colors.map((color, key) => (
        <figure
          className={`bg-${color}`.concat(
            " ",
            css({
              width: "100%",
              height: "200px",
              boxShadow: "rgba(0, 0, 0, 0.12) 0 2px 5px 0",
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
            <code>{color}</code>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

export default Palette
