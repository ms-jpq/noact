#!/usr/bin/env ts-node
import { cp, readdir, rm } from "nda/dist/node/fs"
import { filter, map } from "nda/dist/isomorphic/list"
import { run } from "nda/dist/node/sub_process"

const dist_dir = "./dist"
const artifacts_dir = "./artifacts"

const main = async () => {
  const { stdout, stderr } = await run("npm", "run", "build")
  console.error(stderr)
  console.log(stdout)
  const prev = await readdir(1, artifacts_dir)
  const prev__artifacts = filter((n) => !n.endsWith(".git"), [
    ...prev.dirs,
    ...prev.files,
  ])
  await Promise.all(map(rm, prev__artifacts))
  await cp(dist_dir, artifacts_dir)

  const { stdout: gout, stderr: gerr } = await run("./git.sh")
  console.error(gerr)
  console.log(gout)
}

main()
