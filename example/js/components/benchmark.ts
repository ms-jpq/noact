import { button, div, input, p, span } from "../../../src/noact-elements"
import { str } from "nda/dist/isomorphic/prelude"

export type BenchmarkProps = { elements: number; time_elapsed: number }

export const Benchmark = ({ elements, time_elapsed }: BenchmarkProps) =>
  p({ txt: `rendered ${elements} elements in ${time_elapsed}ms` })

export type BenchmarkControlProps = {
  on_new_bench: (_: number) => void
} & BenchmarkProps

export const BenchmarkControl = ({
  on_new_bench,
  elements,
  time_elapsed,
}: BenchmarkControlProps) =>
  div(
    { id: "benchmark-control" },
    div(
      {},
      span({ txt: "Repeat this:" }),
      input({
        value: str(elements),
        onchange: ({ target }) => {
          const { value } = target as HTMLInputElement
          on_new_bench(parseInt(value))
        },
      }),
      button({
        txt: "GO",
        onclick: ({ target }) => {
          const b = target as HTMLButtonElement
          const value = b.parentElement?.querySelector("input")?.value
          on_new_bench(parseInt(value!))
        },
      }),
    ),
    Benchmark({ elements, time_elapsed }),
  )
