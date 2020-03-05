export const fst = <T>(lst: T[]): T | undefined => lst[0]
export const snd = <T>(lst: T[]): T | undefined => lst[1]
export const last = <T>(lst: T[]): T | undefined => lst[lst.length - 1]

export const range = (begin: number, end: number, step = 1) => {
  const nums = []
  let nxt = begin
  while (nxt <= end) {
    nums.push(nxt)
    nxt = nxt + step
  }
  return nums
}

export const enumerate = <T>(lst: T[]): [number, T][] =>
  lst.map((e, i) => [i, e])

export const map = <T, U>(trans: (_: T) => U, lst: T[]) => lst.map(trans)

export const flat_map = <T, U>(trans: (_: T) => U[], lst: T[]) =>
  lst.flatMap(trans)

export const compact_map = <T, U>(trans: (_: T) => U | undefined, lst: T[]) => {
  const next = []
  for (const ele of lst) {
    const nxt = trans(ele)
    if (nxt !== undefined) {
      next.push(nxt)
    }
  }
  return next
}

export const filter = <T>(predicate: (_: T) => boolean, lst: T[]) =>
  lst.filter(predicate)

export const reduce = <T, U>(trans: (_: U, __: T) => U, init: U, lst: T[]) =>
  lst.reduce(trans, init)

export const zip = <T, U>(lst_a: T[], lst_b: U[]) => {
  const len = Math.min(lst_a.length, lst_b.length)
  const zipped: [T, U][] = []
  for (const idx in range(0, len - 1)) {
    zipped.push([lst_a[idx], lst_b[idx]])
  }
  return zipped
}

export const find_by = <T>(predicate: (_: T) => boolean, lst: T[]) =>
  lst.find(predicate)

export const sort_by = <T>(key_by: (_: T) => number, lst: T[]) => {
  const sort = (a: T, b: T) => key_by(a) - key_by(b)
  return [...lst].sort(sort)
}

export const sort_by_keys = <T>(keys_by: (_: T) => number[], lst: T[]) => {
  const sort = (a: T, b: T) => {
    const zipped = zip(keys_by(a), keys_by(b))
    for (const [lhs, rhs] of zipped) {
      if (lhs !== rhs) {
        return lhs - rhs
      }
    }
    return 0
  }
  return [...lst].sort(sort)
}

export const unique_by = <T>(key_by: (_: T) => any, lst: T[]) => {
  const set = new Set()
  const unique: T[] = []
  for (const ele of lst) {
    const key = key_by(ele)
    if (!set.has(key)) {
      unique.push(ele)
    }
    set.add(key)
  }
  return unique
}

export const any = <T>(predicate: (_: T) => boolean, lst: T[]) =>
  lst.some(predicate)

export const all = <T>(predicate: (_: T) => boolean, lst: T[]) =>
  lst.every(predicate)

export const take = <T>(n: number, lst: T[]) => lst.filter((_, i) => i < n)
export const drop = <T>(n: number, lst: T[]) => lst.filter((_, i) => i >= n)

export const chunk = <T>(n: number, lst: T[]) => {
  const res: T[][] = []
  for (const [idx, ele] of enumerate(lst)) {
    if (idx % n === 0) {
      res.push([])
    }
    last(res)!.push(ele)
  }
  return res
}

export const join = <T>(sep: string, lst: T[]) => lst.join(sep)

export const partition = <T, U extends keyof any>(
  key_by: (_: T) => U,
  lst: T[],
): Record<U, T[] | undefined> => {
  const res = Object.create(null)
  for (const ele of lst) {
    const key = key_by(ele)
    ;(res[key] || (res[key] = [])).push(ele)
  }
  return res
}

export const generate = <T>(generator: () => T, n: number) => {
  const lst = []
  for (const _ of range(1, n)) {
    lst.push(generator())
  }
  return lst
}
