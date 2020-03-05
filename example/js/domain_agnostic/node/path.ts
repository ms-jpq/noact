import p from "path"

export const basename = p.basename

export const dirname = p.dirname

export const extname = p.extname

export const fn_ext = (path: string) => {
  const ext = p.extname(path)
  const file_name = path.slice(0, path.length - ext.length)
  return [file_name, ext]
}

export const join = p.join

export const relative = p.relative
