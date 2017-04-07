export const isCommandValid = (text, command, offset) =>
  command === text.substr(0, offset)

export const removeLineBreaks = (string) =>
  string.replace(/[\r\n]+/g, ' ')
