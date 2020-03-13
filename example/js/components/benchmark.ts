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
import { MIN_TODOS, MAX_TODOS } from "../state"

export type BenchmarkProps = {}

export const Benchmark = ({}: BenchmarkProps) =>
  output({ className: "benchmark-output" })

export type BenchmarkControlProps = {
  todo_sections: number
  on_new_bench: (_: number) => void
  onrandom: () => void
} & BenchmarkProps

export const BenchmarkControl = ({
  on_new_bench,
  onrandom,
  todo_sections,
}: BenchmarkControlProps) => {
  const input_id = "benchmark-input-input"
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
      label({ txt: `Put in ${MIN_TODOS}-${MAX_TODOS}:`, htmlFor: input_id }),
      input({
        id: input_id,
        type: "number",
        min: str(MIN_TODOS),
        max: str(MAX_TODOS),
        value: str(todo_sections),
        onchange: ({ target }) => {
          const { value } = target as HTMLInputElement
          on_new_bench(parseInt(value))
        },
      }),
      button({
        className: cn("clickable"),
        txt: "Random",
        onclick: onrandom,
      }),
    ),
    Benchmark({}),
  )
}
