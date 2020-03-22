import { button, div, i, li, ol, span } from "../../../../src/noact-elements"
import { cn } from "nda/dist/isomorphic/dom"
import { map } from "nda/dist/isomorphic/iterator"
import { TodoItem } from "../../state"

export type TodoListingProps = {
  ontoggle: (_: TodoItem) => void
  onremove: (_: TodoItem) => void
  items: TodoItem[]
}

export const TodoListing = ({ ontoggle, onremove, items }: TodoListingProps) =>
  div(
    { className: cn("todo-listing", "px-6") },
    ol(
      {},
      ...map(
        (item) =>
          li(
            {
              className: cn(
                "d-grid",
                "grid-col",
                "ac-baseline",
                "ji-start",
                "border-top-solid",
                "border-thin",
                "pt-4",
                "py-1",
              ),
            },
            div(
              {
                className: cn("todo-message", "clickable"),
                onclick: () => ontoggle(item),
              },
              i({
                className: cn(
                  "clickable",
                  item.status === "todo"
                    ? "far fa-check-square"
                    : "fas fa-check-square",
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
