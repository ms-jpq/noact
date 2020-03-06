import { $ } from "nda/dist/browser/dom"
import { button, div, input, output, span } from "../../../src/noact-elements"
import { str } from "nda/dist/isomorphic/prelude"

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
  div(
    {},
    div(
      { id: "benchmark-control" },
      span({ txt: "Repeat this:" }),
      input({
        value: str(todo_sections),
        onchange: ({ target }) => {
          const { value } = target as HTMLInputElement
          on_new_bench(parseInt(value))
        },
      }),
      button({
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
