type Props<T> = Partial<Omit<T, "style" | "dataset" | "classList">> & {
  style?: Extract<Partial<CSSStyleDeclaration>, string>
  dataset?: Record<string, string | number | boolean>
  txt?: string
}
type E = HTMLElementTagNameMap & Record<string, HTMLElement>
export type NNode<T extends HTMLElement = HTMLElement> = (() => T) & { tagName: keyof E; props: Props<T>; children: NNode[] }
export type MaybeNNode = NNode | undefined

export const Render = <T extends keyof E>(tagName: T) => (p: Props<E[T]> = {}, ...c: MaybeNNode[]): NNode<E[T]> => {
  const props = p.txt ? { ...p, textContent: p.txt } : p
  const { style = {}, dataset = {}, ..._p } = props
  const children = c.filter((c) => c) as NNode[]
  const render = ((element?: E[T]) => () => {
    if (element) return element
    const e = (element = document.createElement(tagName))
    Object.entries(_p).forEach(([k, v]) => ((<any>e)[k] = v))
    Object.entries(style).forEach(([k, v]) => ((<any>e.style)[k] = v))
    Object.entries(dataset).forEach(([k, v]) => (e.dataset[k] = v as string))
    children.forEach((child) => e.append(child()))
    return e
  })(undefined)
  return Object.assign(render, { tagName, props, children })
}

const patchProps = (prev: NNode, next: NNode) => {
  const e = prev()
  const { style: pStyle = {}, dataset: pData = {}, ...pProps } = prev.props
  const { style: nStyle = {}, dataset: nData = {}, ...nProps } = next.props
  Object.entries(pProps).forEach(([k]) => (<any>nProps)[k] === undefined && ((<any>e)[k] = undefined))
  Object.entries(nProps).forEach(([k, v]) => (<any>pProps)[k] !== v && ((<any>e)[k] = v))
  Object.entries(pStyle).forEach(([k]) => (<any>nStyle)[k] === undefined && e.style.removeProperty(k))
  Object.entries(nStyle).forEach(([k, v]) => (<any>pStyle)[k] !== v && ((<any>e.style)[k] = v))
  Object.entries(pData).forEach(([k]) => nData[k] === undefined && Reflect.deleteProperty(e.dataset, k))
  Object.entries(nData).forEach(([k, v]) => pData[k] !== v && (e.dataset[k] = v as string))
}

const longZip = <T>(a1: T[], a2: T[]) => [...Array(Math.max(a1.length, a2.length)).keys()].map((_, i) => [a1[i], a2[i]])

const reconciliate = (prev: NNode, next: NNode): NNode => {
  patchProps(prev, next)
  const element = prev()
  const children = longZip(prev.children, next.children).map(([p, n]) =>
    p && !n ? p().remove()
    : !p && n ? (element.append(n()), n)
    : p!.tagName !== n!.tagName ? (p!().replaceWith(n!()), n)
    : reconciliate(p!, n!)
  ).filter((c) => c)
  return Object.assign(prev, { props: next.props, children })
}

export const NewRNode = (element: HTMLElement, props: Record<string, unknown> = {}, ...children: MaybeNNode[]): NNode =>
  Object.assign(() => element, { tagName: element.tagName, props, children: children.filter((c) => c) as NNode[] })

export const NewMountPoint = (root: HTMLElement) => {
  let prev = NewRNode(root)
  return (...children: MaybeNNode[]) => (prev = reconciliate(prev, NewRNode(root as any, {}, ...children)))
}
