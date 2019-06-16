const pxTo = require("design-system-utils").pxTo
const ds = require("./styles/tokens/index.js").ds
const colors = require("./styles/tokens/index.js").colorPalette
const fontFamilies = require("./styles/tokens/index.js").fontFamilies
const fontSizes = require("./styles/tokens/index.js").fontSizes
const baseFontSize = ds.get("type.sizes.base")

const fsizes = {}
Object.keys(fontSizes).map((size) => (fsizes[size] = pxTo(ds.get(`type.sizes.${size}`), baseFontSize, "rem")))

const spacings = {}
for (let i = 0; i < 250; i = i + 5) {
  spacings[i] = pxTo(i, baseFontSize, "rem")
}

/*
Tailwind - The Utility-First CSS Framework
View the full documentation at https://tailwindcss.com.
*/

module.exports = {
  prefix: "",
  important: false,
  separator: ":",
  customMedia: {
    "--screen-sm-below": `(max-width: ${pxTo(ds.get("breakpoints.sm") - 1, baseFontSize, "rem")})`,
    "--screen-mobile": `(max-width: ${pxTo(ds.get("breakpoints.md") - 1, baseFontSize, "rem")})`,
    "--screen-sm": `(min-width: ${pxTo(ds.get("breakpoints.sm"), baseFontSize, "rem")})`,
    "--screen-md": `(min-width: ${pxTo(ds.get("breakpoints.md"), baseFontSize, "rem")})`,
    "--screen-lg": `(min-width: ${pxTo(ds.get("breakpoints.lg"), baseFontSize, "rem")})`,
    "--screen-xl": `(min-width: ${pxTo(ds.get("breakpoints.xl"), baseFontSize, "rem")})`,
  },
  theme: {
    /*
|-------------------------------------------------------------------------------
| Screens
|-------------------------------------------------------------------------------
*/

    screens: {
      xs: 0,
      sm: pxTo(ds.get("breakpoints.sm"), baseFontSize, "rem"),
      md: pxTo(ds.get("breakpoints.md"), baseFontSize, "rem"),
      lg: pxTo(ds.get("breakpoints.lg"), baseFontSize, "rem"),
      xl: pxTo(ds.get("breakpoints.xl"), baseFontSize, "rem"),
    },

    /*
|-------------------------------------------------------------------------------
| Typo
|-------------------------------------------------------------------------------
*/
    colors: {
      ...colors,
    },
    fontFamily: {
      unset: ["unset"],
      "family-inherit": ["inherit"],
      emphasis: fontFamilies.emphasis.split(),
      text: fontFamilies.text.split(),
      // ...
    },
    fontSize: {
      inherit: "inherit",
      px: `${ds.get("type.sizes.base")}px`,
      '12-px': `${ds.get("type.sizes.12")}px`,
      // rem conversion
      ...fsizes,
    },
    fontWeight: {
      ...ds.get("type.fontWeights"),
    },
    lineHeight: {
      ...ds.get("type.lineHeights"),
    },
    letterSpacing: {
      ...ds.get("type.spacings"),
    },
    textColor: (theme) => theme("colors"),
    /*
|-------------------------------------------------------------------------------
| Backgrounds
|-------------------------------------------------------------------------------
*/
    backgroundColor: (theme) => theme("colors"),
    backgroundSize: {},

    /*
|-------------------------------------------------------------------------------
| Borders
|-------------------------------------------------------------------------------
*/
    borderWidth: {
      ...ds.get("borderWidths"),
    },
    borderColor: (theme) => theme("colors"),
    borderRadius: {
      ...ds.get("radius"),
    },

    /*
|-------------------------------------------------------------------------------
| Dimensions
|-------------------------------------------------------------------------------
*/
    width: {
      auto: "auto",
      screen: "100vw",
      full: "100%",
    },
    height: {
      full: "100%",
      1: pxTo(1, baseFontSize, "rem"),
      300: pxTo(300, baseFontSize, "rem"),
      screen: "100vh",
    },
    minWidth: {
      0: "0",
      full: "100%",
    },
    minHeight: {
      0: "0",
      full: "100%",
      screen: "100vh",
    },
    maxWidth: {
      0: "0",
      sm: pxTo(ds.get("grid.width.sm"), baseFontSize, "rem"),
      md: pxTo(ds.get("grid.width.md"), baseFontSize, "rem"),
      lg: pxTo(ds.get("grid.width.lg"), baseFontSize, "rem"),
      xl: pxTo(ds.get("grid.width.xl"), baseFontSize, "rem"),
      300: pxTo(300, baseFontSize, "rem"),
      400: pxTo(400, baseFontSize, "rem"),
      555: pxTo(555, baseFontSize, "rem"),
      full: "100%",
      unset: 'unset',
    },
    maxHeight: {
      0: "0",
      full: "100%",
      screen: "100vh",
      unset: 'unset',
    },

    /*
|-------------------------------------------------------------------------------
| Spacings
|-------------------------------------------------------------------------------
*/
    padding: {
      unset: "unset",
      0: "0",
      ...spacings,
    },
    margin: {
      unset: "unset",
      auto: "auto",
      ...spacings,
    },
    /*
|-------------------------------------------------------------------------------
| Lists
|-------------------------------------------------------------------------------
*/
    listStyleType: {
      none: "none",
    },
    /*
|-------------------------------------------------------------------------------
| Shadows
|-------------------------------------------------------------------------------
*/
    boxShadow: {
      ...ds.get("shadows"),
    },

    /*
|-------------------------------------------------------------------------------
| zIndex
|-------------------------------------------------------------------------------
*/
    zIndex: {
      0: 0,
      1: 1,
      5: 5,
      10: 10,
    },

    /*
|-------------------------------------------------------------------------------
| opacity
|-------------------------------------------------------------------------------
*/
    opacity: {
      0: "0",
      50: ".5",
      75: ".75",
      100: "1",
    },

    /*
|-------------------------------------------------------------------------------
| SVG
|-------------------------------------------------------------------------------
*/
    fill: {},
    stroke: {},
  },

  variants: {
    appearance: ["responsive"],
    backgroundColor: ["responsive", "hover", "focus", "focus-within"],
    backgroundAttachment: ["responsive"],
    backgroundPosition: ["responsive"],
    backgroundRepeat: ["responsive"],
    backgroundSize: ["responsive"],
    borderColor: ["responsive", "hover", "focus"],
    borderRadius: ["responsive"],
    borderStyle: ["responsive"],
    borderWidth: ["responsive"],
    cursor: ["responsive"],
    display: ["responsive"],
    flexDirection: ["responsive"],
    flexWrap: ["responsive"],
    alignItems: ["responsive"],
    justifyContent: ["responsive"],
    flex: ["responsive"],
    flexGrow: ["responsive"],
    flexShrink: ["responsive"],
    fontFamily: ["responsive"],
    fontWeight: ["responsive", "hover", "focus"],
    height: ["responsive"],
    lineHeight: ["responsive"],
    listStylePosition: ["responsive"],
    listStyleType: ["responsive"],
    margin: ["responsive"],
    maxHeight: ["responsive"],
    maxWidth: ["responsive"],
    minHeight: ["responsive"],
    minWidth: ["responsive"],
    opacity: ["responsive", "hover", "focus"],
    outline: ["focus"],
    overflow: ["responsive"],
    padding: ["responsive"],
    pointerEvents: ["responsive"],
    position: ["responsive"],
    boxShadow: ["responsive", "hover", "focus"],
    textAlign: ["responsive"],
    textColor: ["responsive", "hover", "focus"],
    textSize: ["responsive"],
    textTransform: ["responsive", "hover", "focus"],
    fontStyle: ["responsive", "hover", "focus"],
    textDecoration: ["responsive", "hover", "focus"],
    letterSpacing: ["responsive"],
    userSelect: ["responsive"],
    width: ["responsive"],
    zIndex: ["responsive"],
  },
  corePlugins: {
    alignContent: false,
    alignSelf: false,
    borderCollapse: false,
    fill: false,
    float: false,
    inset: ["responsive"],
    fontSmoothing: false,
    resize: false,
    tableLayout: false,
    stroke: false,
    verticalAlign: false,
    visibility: false,
    whitespace: false,
    wordBreak: false,
    container: false,
  },
  plugins: [require("./styles/vendors/tailwind/plugins/objectFit")(["responsive"])],
}
