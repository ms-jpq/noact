export const $ = <E extends HTMLElement = HTMLElement>(selector: string) =>
  (document.querySelector(selector) || undefined) as E | undefined

export const $$ = <E extends HTMLElement = HTMLElement>(selector: string) =>
  [...document.querySelectorAll(selector)] as E[]

export const wait_frame = () => new Promise<number>(requestAnimationFrame)

export const img_loaded = (img: HTMLImageElement) => {
  const err = new Error(`img failed to load: ${img.src}`)
  const unsub = () => {
    img.onload = null
    img.onerror = null
  }
  return new Promise((resolve, reject) => {
    if (img.complete) {
      img.naturalWidth === 0 ? reject(err) : resolve()
    } else {
      img.onload = () => (unsub(), resolve())
      img.onerror = () => (unsub(), reject(err))
    }
  })
}
