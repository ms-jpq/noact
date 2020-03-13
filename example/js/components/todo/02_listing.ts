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
            { className: cn("d-grid", "grid-col", "ac-baseline", "ji-start") },
            div(
              {
                className: cn("todo-message", "clickable"),
                onclick: () => ontoggle(item),
              },
              i({
                className: cn(
                  "clickable",
                  "fas",
                  item.status === "todo" ? "fa-toggle-off" : "fa-toggle-on",
                ),
              }),
              span({ txt: item.message }),
            ),
            button({
              className: cn("clickable", "border-clear", "js-end", "font-w900"),
              txt: "×",
              onclick: () => onremove(item),
            }),
          ),
        items,
      ),
    ),
  )
