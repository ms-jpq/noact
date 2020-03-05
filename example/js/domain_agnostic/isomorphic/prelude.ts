export const id = <T>(x: T) => x

export const str = (thing: object) => thing.toString()

export const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

export const counter = () => ((i) => () => (i += 1))(0)

export const timer = () => {
  let prev = performance.now()
  return () => {
    const temp = prev
    const next = (prev = performance.now())
    return next - temp
  }
}
