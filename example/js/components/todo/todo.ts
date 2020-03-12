import { section } from "../../../../src/noact-elements"
import { TodoInfo, TodoInfoProps } from "./03_info"
import { TodoInput, TodoInputProps } from "./00_input"
import { TodoListing, TodoListingProps } from "./02_listing"
import { TodoSelect, TodoSelectProps } from "./01_select"

export type TodoProps = {} & TodoInputProps &
  TodoSelectProps &
  TodoListingProps &
  TodoInfoProps

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
    { className: "todo" },
    TodoInput({ oninput, idx }),
    TodoSelect({ onselect, viewing }),
    TodoListing({ ontoggle, onremove, items }),
    TodoInfo({ idx, still_todo_count, todo_sections }),
  )
