#!/usr/bin/env node
import { top_level, run, dist_dir } from "../build.mjs"
import { filter } from "nda/iso/iterator.js"
import { lstatSync, readdirSync, rmSync, writeFileSync } from "node:fs"
import { join, sep } from "node:path"
import { env } from "node:process"

/**
 * @param {string} path
 */
const is_dir = (path) => {
  try {
    const stat = lstatSync(path)
    return stat.isDirectory()
  } catch {
    return false
  }
}

const time = new Date().toISOString()
const artifacts_dir = join(top_level, "artifacts")
const diff_guarantee = join(artifacts_dir, "build_record.txt")

const git_clone = () => {
  if (is_dir(artifacts_dir)) {
    return
  } else {
    const token = env["CI_TOKEN"]
    const email = "ci@ci.ci"
    const username = "ci-bot"
    const uri = `https://ms-jpq:${token}@github.com/ms-jpq/noact-page.git`
    run({}, "git", "clone", uri, artifacts_dir)
    run({ cwd: artifacts_dir }, "git", "config", "user.email", email)
    run({ cwd: artifacts_dir }, "git", "config", "user.name", username)
  }
}

const git_commit = () => {
  const msg = `CI - ${time}`
  run({ cwd: artifacts_dir }, "git", "add", "-A")
  run({ cwd: artifacts_dir }, "git", "commit", "-m", msg)
  run({ cwd: artifacts_dir }, "git", "push", "--force")
}

const copy = async () => {
  const prev = readdirSync(artifacts_dir)
  for (const name of filter((n) => !n.endsWith(".git"), prev)) {
    const path = join(artifacts_dir, name)
    rmSync(path, { recursive: true })
  }
  run({}, "rsync", "--archive", "--", dist_dir + sep, artifacts_dir + sep)
  writeFileSync(diff_guarantee, time)
}

const main = () => {
  git_clone()
  copy()
  git_commit()
}

main()
