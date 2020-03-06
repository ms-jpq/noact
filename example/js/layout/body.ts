import { main } from "../../../src/noact-elements"
import { Readme } from "../components/readme"
import {
  BenchmarkControlProps,
  BenchmarkControl,
} from "../components/benchmark"
import { map, range } from "nda/dist/isomorphic/list"
import { Todo, TodoProps } from "../components/todo/todo"

export type BodyProps = { todo_sections: number } & BenchmarkControlProps &
  TodoProps

export const Body = ({
  todo_sections,
  viewing,
  items,
  elements,
  time_elapsed,
  on_new_bench,
  oninput,
  ontoggle,
  onremove,
  onselect,
  still_todo_count,
}: BodyProps) =>
  main(
    {},
    Readme({}),
    BenchmarkControl({ elements, time_elapsed, on_new_bench }),
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
          total_todo_sections: todo_sections,
          still_todo_count,
        }),
      range(1, todo_sections),
    ),
  )
