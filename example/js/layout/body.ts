import { cn } from "nda/iso/dom.js"
import { map, range } from "nda/iso/iterator.js"
import { main } from "../../../src/noact-elements.js"
import {
  BenchmarkControl,
  type BenchmarkControlProps,
} from "../components/benchmark.js"
import { Readme } from "../components/readme.js"
import { Todo, type TodoProps } from "../components/todo/todo.js"

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
    ...map(range(1, todo_sections), (idx) =>
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
    ),
  )
