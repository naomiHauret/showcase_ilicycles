module.exports = (variants) => {
  return function({ addUtilities }) {
    addUtilities(
      {
        ".object-contain": { objectFit: "contain" },
        ".object-cover": { objectFit: "cover" },
      },
      variants,
    )
  }
}
