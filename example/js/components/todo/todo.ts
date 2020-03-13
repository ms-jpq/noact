import { cn } from "nda/dist/isomorphic/dom"
import { h2, section, p } from "../../../../src/noact-elements"
import { TodoInput, TodoInputProps } from "./00_input"
import { TodoListing, TodoListingProps } from "./02_listing"
import { TodoSelect, TodoSelectProps } from "./01_select"

export type TodoProps = {
  still_todo_count: number
  todo_sections: number
} & TodoInputProps &
  TodoSelectProps &
  TodoListingProps

export const Todo = ({
  oninput,
  onselect,
  ontoggle,
  onremove,
  viewing,
  items,
  idx,
  todo_sections,
  still_todo_count,
}: TodoProps) =>
  section(
    {
      className: cn(
        "todo",
        "d-grid",
        "mainly-padded",
        "lightly-bordered",
        "jc-space-between",
      ),
    },
    h2({ className: "todo-title", txt: "TODO" }),
    TodoInput({ oninput, idx }),
    TodoSelect({ onselect, viewing }),
    TodoListing({ ontoggle, onremove, items }),
    p({ className: "todo-info", txt: `${still_todo_count} items left` }),
    p({
      className: cn("todo-meta", "text-right"),
      txt: `${idx} of ${todo_sections}`,
    }),
  )
