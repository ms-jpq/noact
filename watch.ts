#!/usr/bin/env ts-node
import cors from "cors"
import express from "express"
import nodemon, { Settings } from "nodemon"
//@ts-ignore
import parse from "parse-gitignore"
import { big_print } from "nda/dist/node/prelude"
import { hostname } from "os"
import { slurp } from "nda/dist/node/fs"

const dist_dir = "./dist"
const port = 8080

const srv = (dir: string, port: number) => {
  express()
    .use(cors())
    .use(express.static(dir, {}))
    .listen(port)
  console.log(`-- Serving files at:  http://${hostname()}:${port}`)
}

const watch = (settings: Settings) =>
  nodemon(settings)
    .on("start", () => {
      console.log(big_print("STARTED", "$"))
    })
    .on("restart", (files) => {
      console.log(big_print("RESTARTED", "$"))
      console.log(files)
    })

const main = async () => {
  const exts = ["ts", "scss", "html"]
  const git_ignore = await slurp(".gitignore")
  const ignore = parse(git_ignore)
  const exec = "parcel build example/index.html"
  watch({
    ext: exts.join(),
    colours: true,
    ignore,
    exec,
  })
  srv(dist_dir, port)
}

main()
