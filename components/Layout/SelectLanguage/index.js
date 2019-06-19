import React, { PureComponent, Fragment } from "react"
import Select from "react-select"
import { pxTo } from "design-system-utils"
import { ds } from "styles/tokens"
import Router from "next/router"
import Link from "next/link"
import Translate from "components/Translate"
import { DEFAULT_LANG } from "utils/config"
import MediaQuery from "react-responsive"

const baseFontSize = ds.get("type.sizes.baseFontSize")
const options = {
  en: {
    value: "en",
    label: "English",
    flag: <svg className="w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M473.655 88.276H38.345C17.167 88.276 0 105.443 0 126.621V385.38c0 21.177 17.167 38.345 38.345 38.345h435.31c21.177 0 38.345-17.167 38.345-38.345V126.621c0-21.178-17.167-38.345-38.345-38.345z" fill="#41479b" /><path d="M511.469 120.282c-3.022-18.159-18.797-32.007-37.814-32.007h-9.977l-163.54 107.147V88.276h-88.276v107.147L48.322 88.276h-9.977c-19.017 0-34.792 13.847-37.814 32.007l139.778 91.58H0v88.276h140.309L.531 391.717c3.022 18.159 18.797 32.007 37.814 32.007h9.977l163.54-107.147v107.147h88.276V316.577l163.54 107.147h9.977c19.017 0 34.792-13.847 37.814-32.007l-139.778-91.58H512v-88.276H371.691l139.778-91.579z" fill="#f5f5f5" /><g fill="#ff4b55"><path d="M282.483 88.276h-52.966v141.241H0v52.966h229.517v141.241h52.966V282.483H512v-52.966H282.483z" /><path d="M24.793 421.252l186.583-121.114h-32.428L9.224 410.31a38.393 38.393 0 0 0 15.569 10.942zM346.388 300.138H313.96l180.716 117.305a38.515 38.515 0 0 0 12.287-13.075l-160.575-104.23zM4.049 109.475l157.73 102.387h32.428L15.475 95.842a38.499 38.499 0 0 0-11.426 13.633zM332.566 211.862l170.035-110.375a38.4 38.4 0 0 0-15.699-10.86L300.138 211.862h32.428z" /></g></svg>  },
  fr: { value: "fr", label: "Français", flag: <svg className="w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M38.345 88.273C17.167 88.273 0 105.44 0 126.618v258.759c0 21.177 17.167 38.345 38.345 38.345h132.322V88.273H38.345z" fill="#41479b"/><path fill="#f5f5f5" d="M170.67 88.277h170.67v335.45H170.67z"/><path d="M473.655 88.273H341.333v335.448h132.322c21.177 0 38.345-17.167 38.345-38.345V126.618c0-21.178-17.167-38.345-38.345-38.345z" fill="#ff4b55"/></svg> },
}


class SelectLanguage extends PureComponent {
  state = {
    selectedOption: options[this.props.router.query.lang ? this.props.router.query.lang : DEFAULT_LANG],
  }

  _handleChange = (selectedOption) => {
    const { onChange, router } = this.props
    const newLocale = selectedOption.value
    this.setState({ selectedOption })
    onChange({ locale: newLocale, fallback: DEFAULT_LANG })
    let href
    let as
    switch (router.route) {
      case "/index":
        href = `/?lang=${newLocale}`
        as = `/${newLocale}`
        break

      case "/":
        href = `/?lang=${newLocale}`
        as = `/${newLocale}`
        break

      case "/brand":
        href = `/about?lang=${newLocale}`
        as = `/${newLocale}/brand`
        break

      case "/product":
        href = `/about?lang=${newLocale}`
        as = `/${newLocale}/product`
        break

      default:
        break
    }

    Router.push(href, as, {
      shallow: true,
    })
  }

  _handleNativeChange = (selectedOption) => {
    const { onChange, router } = this.props
    const newLocale = selectedOption
    this.setState({ selectedOption })
    onChange({ locale: newLocale, fallback: DEFAULT_LANG })
    let href
    let as
    switch (router.route) {
      case "/index":
        href = `/?lang=${newLocale}`
        as = `/${newLocale}`
        break

      case "/":
        href = `/?lang=${newLocale}`
        as = `/${newLocale}`
        break

      case "/brand":
        href = `/about?lang=${newLocale}`
        as = `/${newLocale}/brand`
        break

      case "/product":
        href = `/about?lang=${newLocale}`
        as = `/${newLocale}/product`
        break

      default:
        break
    }

    Router.push(href, as, {
      shallow: true,
    })
  }

  render() {
    const { selectedOption } = this.state
    const { router, theme, isDark } = this.props
    const locale = router.query.lang ? router.query.lang : DEFAULT_LANG
    const newLocale = locale === "en" ? "fr" : "en"
    let href
    let as
    const themeSystem = {
      color: {
        light: "#FFFFFF",
        colorful: "#15ACDF",
      },
    }
    switch (router.route) {
      case "/index":
        href = `/?lang=${newLocale}`
        as = `/${newLocale}`
        break

      case "/":
        href = `/?lang=${newLocale}`
        as = `/${newLocale}`
        break

      case "/brand":
        href = `/brand?lang=${newLocale}`
        as = `/${newLocale}/brand`
        break

      case "/work":
        href = `/product?lang=${newLocale}`
        as = `/${newLocale}/product`
        break
      default:
        break
    }
    const customStyles = {
      container: (base, state) => ({
        ...base,
        cursor: "pointer",
        pointerEvents: "all",
        border: 0,
        outline: 0,
      }),
      control: (base, state) => ({
        ...base,
        border: 0,
        outline: 0,
        boxShadow: "none",
        backgroundColor: "transparent",
      }),
      indicatorSeparator: (base, state) => ({
        background: "transparent",
      }),
      dropdownIndicator: (base, state) => ({
        ...base,
        padding: 0,
        opacity: 1,
        color: router.route === "/" || router.route === "/index"  || isDark ? "#161616" : themeSystem.color[theme],
      }),
      valueContainer: (base, state) => ({
        ...base,
      }),
      singleValue: (base, state) => ({
        ...base,
        position: "relative",
        transform: "unset",
        fontSize: "12px",
        color: router.route === "/" || router.route === "/index" || isDark ? "#161616" : themeSystem.color[theme],
      }),
      option: (base, state) => ({
        ...base,
        border: 0,
        outline: 0,
        backgroundColor: "#FFFFFF",
        fontSize: "12px",
        color: ds.get("colors['grey-300']"),
        fontWeight: state.isSelected ? "bold" : "100",
        fontFamily: ds.get("type.fontFamily.emphasis"),
      }),
      menu: (base, state) => ({
        boxShadow: `0 ${pxTo(2, baseFontSize, "rem")} ${pxTo(4, baseFontSize, "rem")} 0 rgba(0,0,0,0.2)`,
        zIndex: 5,
        position: "absolute",
        top: 0,
        backgroundColor: "white",
      }),
    }

    const goToWebsiteLabel = `goToWebsite.${newLocale}`
    return (
      <Fragment>
        <div className="text-black-100 font-emphasis text-12 relative">
          <MediaQuery query={`(min-width: ${pxTo(ds.get("breakpoints.md"), baseFontSize, "rem")})`}>
          <Select
            instanceId="selectLang"
            value={selectedOption}
            onChange={this._handleChange}
            options={Object.values(options)}
            styles={customStyles}
          />
        </MediaQuery>
        <MediaQuery query={`(max-width: ${pxTo(ds.get("breakpoints.md") - 1, baseFontSize, "rem")})`}>
          <div className="relative">
            <select onChange={e => this._handleNativeChange(e.target.value)} className="absolute opacity-0 top-0 left-0 w-full h-full">
                {Object.values(options).map((option, key) => <option selected={option.value === locale} value={option.value} key={key}>{option.label}</option> )}
            </select>
            <div className="w-20 h-20 flex">
              {options[locale].flag}
            </div>
          </div>
        </MediaQuery>
      </div>
      </Fragment>
    )
  }
}

export default SelectLanguage
