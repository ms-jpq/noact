export const big_print = (str: string, top = " ", btm = " ") => {
  const { columns } = process.stdout
  return `
  ${top.repeat(columns - 2)}
  ${str}
  ${btm.repeat(columns - 2)}
  `
}
