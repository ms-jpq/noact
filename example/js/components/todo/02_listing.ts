import { button, div, i, li, ol, span } from "../../../../src/noact-elements"
import { cn } from "nda/dist/isomorphic/dom"
import { map } from "nda/dist/isomorphic/list"
import { TodoItem } from "../../state"

export type TodoListingProps = {
  ontoggle: (_: TodoItem) => void
  onremove: (_: TodoItem) => void
  items: TodoItem[]
}

export const TodoListing = ({ ontoggle, onremove, items }: TodoListingProps) =>
  div(
    { className: "todo-listing" },
    ol(
      {},
      ...map(
        (item) =>
          li(
            { className: "d-grid" },
            span(
              { className: cn("pointer"), onclick: () => ontoggle(item) },
              i({
                className: cn(
                  "pointer",
                  "fas",
                  item.status === "todo" ? "fa-toggle-on" : "fa-toggle-off",
                ),
              }),
              span({ txt: item.message }),
            ),
            button({
              className: cn("pointer"),
              txt: "×",
              onclick: () => onremove(item),
            }),
          ),
        items,
      ),
    ),
  )
