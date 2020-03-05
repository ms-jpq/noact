import assert from "assert"
import { execFile, spawn } from "child_process"

export const run = (cmd: string, ...args: string[]) =>
  new Promise<{
    stdout: string
    stderr: string
  }>((resolve, reject) =>
    execFile(cmd, args, (err, stdout, stderr) =>
      err ? reject(err) : resolve({ stdout, stderr }),
    ),
  )

export type PipeArgs = {
  cmd: string
  args: string[]
  stdin?: any
}

export const pipe = async ({ cmd, args, stdin }: PipeArgs) => {
  const stream = spawn(cmd, args)
  const done = new Promise((resolve) => stream.once("close", resolve))

  const out_buf: any = []
  const err_buf: any = []
  let stdout: Buffer | undefined = undefined
  let stderr: Buffer | undefined = undefined

  stream.stdout.on("data", (chunk) => out_buf.push(chunk))
  stream.stdout.on("close", () => (stdout = Buffer.concat(out_buf)))

  stream.stderr.on("data", (chunk) => err_buf.push(chunk))
  stream.stderr.on("close", () => (stderr = Buffer.concat(err_buf)))

  if (stdin !== undefined) {
    await new Promise((resolve, reject) => {
      stream.stdin.write(stdin, (err) => (err ? reject(err) : resolve()))
      stream.stdin.end()
    })
  }

  await done
  assert(stdout !== undefined && stderr !== undefined)
  return [stdout!, stderr!]
}
