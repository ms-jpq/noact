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
  h2,
} from "../../../src/noact-elements"
import { int } from "nda/dist/isomorphic/rand"

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
  const [min_todos, max_todos] = [1, 100]
  const input_id = "benchmark-input-input"
  const clamp = (val: string) =>
    Math.min(max_todos, Math.max(min_todos, parseInt(val)))
  return section(
    {
      id: "benchmark-control",
      className: cn(
        "d-grid",
        "ai-baseline",
        "lightly-bordered",
        "mainly-padded",
      ),
    },
    h2({ id: "benchmark-title", txt: "Benchmark" }),
    div(
      { id: "benchmark-input" },
      label({ txt: `Put in ${min_todos}-${max_todos}:`, htmlFor: input_id }),
      input({
        id: input_id,
        type: "number",
        min: str(min_todos),
        max: str(max_todos),
        value: str(todo_sections),
        onchange: ({ target }) => {
          const { value } = target as HTMLInputElement
          on_new_bench(clamp(value))
        },
      }),
      button({
        className: cn("clickable"),
        txt: "Random",
        onclick: () => on_new_bench(int(min_todos, max_todos)),
      }),
    ),
    Benchmark({}),
  )
}
