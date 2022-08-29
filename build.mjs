#!/usr/bin/env node
import { spawnSync } from "node:child_process"
import { rmSync } from "node:fs"
import { dirname, join } from "node:path"
import { exit } from "node:process"
import { fileURLToPath } from "node:url"

export const top_level = dirname(fileURLToPath(new URL(import.meta.url)))
const modules = join(top_level, "node_modules")
export const bin = join(modules, ".bin")
export const dist_dir = join(top_level, "dist")

/**
 * @param {{ cwd?: string }} opts
 * @param {string} arg
 * @param {string[]} args
 */
export const run = ({ cwd = top_level }, arg, ...args) => {
  const { error, status } = spawnSync(arg, args, {
    stdio: "inherit",
    cwd,
  })

  if (error) {
    throw error
  }
  const code = status ?? 1

  if (code) {
    exit(code)
  }
}

const main = () => {
  rmSync(dist_dir, { recursive: true, force: true })
  run({}, join(bin, "webpack"))
}

main()
