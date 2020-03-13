import { cn } from "nda/dist/isomorphic/dom"
import { div, span } from "../../../../src/noact-elements"

export type TodoInfoProps = {
  idx: number
  todo_sections: number
  still_todo_count: number
}

export const TodoInfo = ({
  idx,
  todo_sections,
  still_todo_count,
}: TodoInfoProps) =>
  div(
    { className: cn("todo-info", "d-grid", "grid-col", "jc-space-between") },
    span({ txt: `${still_todo_count} items left` }),
    span({ txt: `${idx} of ${todo_sections}` }),
  )
