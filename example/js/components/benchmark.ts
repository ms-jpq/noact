import { $ } from "nda/dist/browser/dom"
import {
  button,
  div,
  input,
  output,
  section,
  span,
} from "../../../src/noact-elements"
import { str } from "nda/dist/isomorphic/prelude"
import { cn } from "nda/dist/isomorphic/dom"

export type BenchmarkProps = {}

export const Benchmark = ({}: BenchmarkProps) =>
  output({ className: "benchmark-output" })

export type BenchmarkControlProps = {
  todo_sections: number
  on_new_bench: (_: number) => void
} & BenchmarkProps

export const BenchmarkControl = ({
  on_new_bench,
  todo_sections,
}: BenchmarkControlProps) =>
  section(
    { id: "benchmark-control" },
    div(
      { id: "benchmark-input" },
      span({ txt: "Repeat this:" }),
      input({
        value: str(todo_sections),
        onchange: ({ target }) => {
          const { value } = target as HTMLInputElement
          on_new_bench(parseInt(value))
        },
      }),
      button({
        className: cn("pointer"),
        txt: "GO",
        onclick: ({ target }) => {
          const b = target as HTMLButtonElement
          const value = $<HTMLInputElement>("input", b.parentElement!)!.value
          on_new_bench(parseInt(value))
        },
      }),
    ),
    Benchmark({}),
  )
