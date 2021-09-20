export default num => {
  if (Number.isInteger(num)) {
    if (num < 10) return `0${num}`
    return num
  }
  return '00'
}
