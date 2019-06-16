import { memo, Fragment } from "react"
import { css } from "emotion"
import { Global, css as globalCSS } from "@emotion/core"

const StyleguideLayout = memo((props) => {
  const { children, elements } = props
  return (
    <Fragment>
      <Global
        styles={globalCSS`
          body {
            font-family: sans;
          }
      `}
      />
      <div
        className={css({
          display: "grid",
          gridTemplateColumns: "250px 1fr",
          minHeight: "100vh",
        })}
      >
        <nav
          className={css({
            width: "100%",
            borderRight: "solid 1px #f3f3f3",
          })}
        >
          <div
            className={css({
              position: "relative",
              width: "100%",
            })}
          >
            <ul
              className={css({
                position: "fixed",
                top: 0,
                left: 0,
                padding: 0,
                margin: 0,
                listStyle: "none",
                width: "250px",
              })}
            >
              {elements.map((el, key) => (
                <li
                  className={css({
                    margin: 0,
                    padding: 0,
                    width: "100%",
                    "&:not(:last-child)": {
                      borderBottom: "solid 1px #f3f3f3",
                    },
                  })}
                >
                  <a
                    className={css({
                      textDecoration: "none",
                      padding: "10px 20px",
                      display: "block",
                      width: "100%",
                      height: "100%",
                      fontSize: "14px",
                      color: "gray",
                    })}
                    href={`#${el.id}`}
                  >
                    {el.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <main
          className={css({
            padding: "50px 20px",
            overflowY: "auto",
            maxWidth: "1000px",
          })}
        >
          {children}
        </main>
      </div>
    </Fragment>
  )
})

export default StyleguideLayout
