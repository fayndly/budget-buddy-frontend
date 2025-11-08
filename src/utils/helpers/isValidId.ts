export const isValidId = (str: string) => {
  str = str + ''
  const len = str.length
  let valid = false
  if (len == 12 || len == 24) {
    valid = /^[0-9a-fA-F]+$/.test(str)
  }
  return valid
}
