import React from "react"
import { css } from "emotion"

const BorderRadius = ({ radius }) => {
  return (
    <div
      className={css({
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridAutoRows: "auto",
        gridGap: "30px",
      })}
    >
      {radius.map((value, key) => (
        <figure
          className={css({
            width: "100%",
            height: "200px",
            padding: 0,
            margin: 0,
            position: "relative",
          })}
        >
          <div
            className={`rounded-${value}`.concat(
              " ",
              css({
                width: "100%",
                height: "150px",
                padding: 0,
                margin: 0,
                boxShadow: "rgba(0, 0, 0, 0.12) 0 2px 5px 0",
                backgroundColor: "#f2f2f2",
              }),
            )}
          />
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

export default BorderRadius
