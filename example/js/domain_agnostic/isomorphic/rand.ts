export const float = (celi: number) => Math.random() * celi

export const int = (celi: number) =>
  Math.floor(Math.random() * Math.floor(celi + 1))

export const choice = <T>(pool: T[]) => pool[int(pool.length - 1)]
