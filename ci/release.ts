#!/usr/bin/env ts-node
import { filter, map } from "nda/dist/isomorphic/iterator"
import { cp, isdir, readdir, rm } from "nda/dist/node/fs"
import { dirname } from "nda/dist/node/path"
import { call, SpawnArgs } from "nda/dist/node/sub_process"

const dist_dir = "./dist"
const artifacts_dir = "./artifacts"

const chdir = () => {
  const root = dirname(__dirname)
  process.chdir(root)
}

const run = async (args: SpawnArgs) => {
  const code = await call(args)
  if (code != 0) {
    process.exit(code)
  }
}

const git_clone = async () => {
  if (await isdir(artifacts_dir)) {
    return
  } else {
    const token = process.env["CI_TOKEN"]
    const email = "ci@ci.ci"
    const username = "ci-bot"
    const uri = `https://ms-jpq:${token}@github.com/ms-jpq/noact-page.git`
    await run({ cmd: "git", args: ["clone", uri, artifacts_dir] })
    await run({
      cmd: "git",
      args: ["config", "user.email", email],
      opts: { cwd: artifacts_dir },
    })
    await run({
      cmd: "git",
      args: ["config", "user.name", username],
      opts: { cwd: artifacts_dir },
    })
  }
}

const git_commit = async () => {
  const time = new Date().toISOString()
  const msg = `CI - ${time}`
  await run({ cmd: "git", args: ["add", "-A"], opts: { cwd: artifacts_dir } })
  await run({
    cmd: "git",
    args: ["commit", "-m", msg],
    opts: { cwd: artifacts_dir },
  })
  await run({
    cmd: "git",
    args: ["push", "--force"],
    opts: { cwd: artifacts_dir },
  })
}

const copy = async () => {
  const prev = await readdir(1, artifacts_dir)
  const prev__artifacts = filter((n) => !n.endsWith(".git"), [
    ...prev.dirs,
    ...prev.files,
  ])
  await Promise.all(map(rm, prev__artifacts))
  await cp(dist_dir, artifacts_dir)
}

const main = async () => {
  chdir()
  await git_clone()
  await run({ cmd: "npm", args: ["run", "build"] })
  await copy()
  await git_commit()
}

main()
