export const isCommandValid = (text, command, offset) =>
  command.substr(0, offset) === text.substr(0, offset)

export const removeLineBreaks = (string) =>
  string.replace(/[\r\n]+/g, ' ')
