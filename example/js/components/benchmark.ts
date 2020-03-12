import { $ } from "nda/dist/browser/dom"
import { cn } from "nda/dist/isomorphic/dom"
import { str } from "nda/dist/isomorphic/prelude"
import {
  button,
  div,
  input,
  label,
  output,
  section,
} from "../../../src/noact-elements"

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
}: BenchmarkControlProps) => {
  const input_id = "benchmark-input-input"
  return section(
    { id: "benchmark-control" },
    div(
      { id: "benchmark-input" },
      label({ txt: "Repeat this:", htmlFor: input_id }),
      input({
        id: input_id,
        value: str(todo_sections),
        onchange: ({ target }) => {
          const { value } = target as HTMLInputElement
          on_new_bench(parseInt(value))
        },
      }),
      button({
        className: cn("clickable"),
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
}
