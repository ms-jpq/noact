import { cn } from "nda/dist/isomorphic/dom"
import { h2, section, p, div } from "../../../../src/noact-elements"
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
      className: cn("todo", "lightly-bordered"),
    },
    div(
      {
        className: cn(
          "todo-header",
          "d-grid",
          "grid-col",
          "jc-space-between",
          "ai-baseline",
          "px-6",
        ),
      },
      h2({ className: cn("todo-title", "mb-0"), txt: "TODO" }),
      p({
        className: cn("todo-meta", "text-right"),
        txt: `${idx} of ${todo_sections} synchronized`,
      }),
    ),
    TodoInput({ oninput, idx }),
    TodoSelect({ onselect, viewing }),
    TodoListing({ ontoggle, onremove, items }),
    p({
      className: cn("todo-info", "px-6", "my-1"),
      txt: `${still_todo_count} items left`,
    }),
  )
