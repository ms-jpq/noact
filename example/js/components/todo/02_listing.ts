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
            {},
            span(
              { onclick: () => ontoggle(item) },
              i({
                className: cn(
                  "pointer",
                  item.status === "todo" ? "1-TODO-1" : "2-TODO-2",
                ),
              }),
              span({ txt: item.message }),
            ),
            button({ txt: "×", onclick: () => onremove(item) }),
          ),
        items,
      ),
    ),
  )
