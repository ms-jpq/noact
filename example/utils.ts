export const DOMReady = () =>
  new Promise<void>((resolve) => document.addEventListener("DOMContentLoaded", resolve as any, { once: true }))

export const $ = <T extends Element = HTMLElement>(selector: string, e: ParentNode = document) =>
  e.querySelector(selector) as T

export const $$ = <T extends Element = HTMLElement>(selector: string, e: ParentNode = document) =>
  [...e.querySelectorAll(selector)] as T[]

export const Inc = () => ((n) => () => n++)(0)

export const Random = (lo: number, hi: number) => Math.floor(Math.random() * (hi - lo + 1)) + lo
export const Range = (lo: number, hi: number) => [...Array(hi - lo + 1)].map((_, i) => i + lo)

export const Randomize = <T>(list: T[]) => {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[list[i], list[j]] = [list[j], list[i]]
  }
  return list
}

export const Classes = (...classes: (string | Record<string, boolean>)[]) =>
  classes
    .flatMap((c) => {
      if (typeof c === "string") {
        return [c]
      } else {
        return Object.entries(c).flatMap(([k, v]) => (v ? [k] : []))
      }
    })
    .join(" ")

export const Timer = () => {
  let prev = performance.now()
  return () => {
    const temp = prev
    const next = (prev = performance.now())
    return next - temp
  }
}

export const AwaitFrame = () => new Promise<number>((resolve) => requestAnimationFrame(resolve))
