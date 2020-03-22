import { cn } from "nda/dist/isomorphic/dom"
import { main } from "../../../src/noact-elements"
import { map, range } from "nda/dist/isomorphic/iterator"
import { Readme } from "../components/readme"
import { Todo, TodoProps } from "../components/todo/todo"
import {
  BenchmarkControlProps,
  BenchmarkControl,
} from "../components/benchmark"

export type BodyProps = {
  todo_sections: number
} & BenchmarkControlProps &
  Omit<TodoProps, "idx">

export const Body = ({
  todo_sections,
  viewing,
  items,
  on_new_bench,
  onrandom,
  oninput,
  ontoggle,
  onremove,
  onselect,
  still_todo_count,
}: BodyProps) =>
  main(
    { className: cn("d-grid", "row-gap-8") },
    Readme({}),
    BenchmarkControl({ todo_sections, on_new_bench, onrandom }),
    ...map(
      (idx) =>
        Todo({
          idx,
          viewing,
          items,
          oninput,
          onremove,
          onselect,
          ontoggle,
          todo_sections,
          still_todo_count,
        }),
      range(1, todo_sections),
    ),
  )
