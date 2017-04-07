export const isCommandValid = (text, command, offset) =>
  command === text.substr(0, offset)
