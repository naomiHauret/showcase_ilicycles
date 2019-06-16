const colors = require("./colors").default
const fontFamilies = require("./fontFamilies").default
const fontSizes = require("./fontSizes").default
const DesignSystem = require("design-system-utils").default
const pxTo = require("design-system-utils").pxTo

const pxFontSize = {
  base: fontSizes.base,
}

const colorPalette = {
  transparent: "transparent",
  ...colors,
}

const myDesignSystem = {
  grid: {
    width: {
      xs: "100%",
      sm: 750,
      md: 940,
      lg: 1000,
      xl: 1100,
    },
  },
  breakpoints: {
    xs: 480,
    sm: 720,
    md: 991,
    lg: 1024,
    xl: 1260,
  },
  type: {
    sizes: fontSizes,
    fontFamily: fontFamilies,
    fontWeights: {
      400: 400,
      500: 500,
      600: 600,
    },
    lineHeights: {
      '18': pxTo(18, pxFontSize.base, 'rem'),
      '20': pxTo(20, pxFontSize.base, 'rem'),
      '21': pxTo(21, pxFontSize.base, 'rem'),
      '24': pxTo(24, pxFontSize.base, 'rem'),
      '30': pxTo(30, pxFontSize.base, 'rem'),
    },
    spacings: {
      0: 0,
      '034': pxTo(0.34, pxFontSize.base, 'rem'),
      '039': pxTo(0.39, pxFontSize.base, 'rem'),
      '052': pxTo(0.52, pxFontSize.base, 'rem'),
      '042': pxTo(0.42, pxFontSize.base, 'rem'),
      '045': pxTo(0.45, pxFontSize.base, 'rem'),
    },
  },
  radius: {
    0: 0,
    2: pxTo(2, pxFontSize.base, 'rem'),
    5: pxTo(5, pxFontSize.base, 'rem'),
    full: "999px",
  },
  colors: {
    ...colorPalette,
  },
  borderWidths: {
    0: 0,
    1: pxTo(1, pxFontSize.base, 'rem'),
  },
  shadows: {
    none: "none",
    md: `0 ${pxTo(2, pxFontSize.base, 'rem')} ${pxTo(10, pxFontSize.base, 'rem')} 0 rgba(0,0,0,0.3)`,
    lg: `0 0 ${pxTo(20, pxFontSize.base, 'rem')} 0 rgba(0,0,0,0.1)`,
  },
}

const ds = new DesignSystem(myDesignSystem, {
  useModularScale: true,
  fontSizeUnit: "rem",
})

module.exports = {
  ds,
  colorPalette,
  fontFamilies,
  fontSizes,
}
