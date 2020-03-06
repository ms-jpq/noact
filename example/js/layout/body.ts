import { filter, map, range, sort_by_keys } from "nda/dist/isomorphic/list"
import { main } from "../../../src/noact-elements"
import { Readme } from "../components/readme"
import { Todo, TodoProps } from "../components/todo/todo"
import { TodoItem, TodoStatus, View } from "../state"
import {
  BenchmarkControlProps,
  BenchmarkControl,
} from "../components/benchmark"

const idx_by_status = (status: TodoStatus) => {
  switch (status) {
    case "todo":
      return 1
    case "done":
      return 2
    default:
      throw new Error("invaild status")
  }
}

const sort_todos = (last_view_update: number, items: TodoItem[]) =>
  sort_by_keys(
    (i) => [
      i.last_update > last_view_update ? 1 : 0,
      idx_by_status(i.status),
      i.last_update,
    ],
    items,
  )

const item_visible = (view: View, last_view_update: number, item: TodoItem) => {
  switch (view) {
    case "all":
      return true
    case "todo":
      return item.last_update > last_view_update || item.status === "todo"
    case "done":
      return item.last_update > last_view_update || item.status === "done"
  }
}

export type BodyProps = {
  last_view_update: number
  todo_sections: number
} & BenchmarkControlProps &
  Omit<TodoProps, "idx">

export const Body = ({
  last_view_update,
  todo_sections,
  viewing,
  items,
  on_new_bench,
  oninput,
  ontoggle,
  onremove,
  onselect,
  still_todo_count,
}: BodyProps) => {
  const sorted = sort_todos(last_view_update, items)
  const visible_items = filter(
    (i) => item_visible(viewing, last_view_update, i),
    sorted,
  )
  return main(
    {},
    Readme({}),
    BenchmarkControl({ todo_sections, on_new_bench }),
    ...map(
      (idx) =>
        Todo({
          idx,
          viewing,
          items: visible_items,
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
}
