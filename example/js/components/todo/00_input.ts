import { button, div, i, input, label } from "../../../../src/noact-elements"
import { cn } from "nda/dist/isomorphic/dom"
import { non_empty } from "nda/dist/isomorphic/validation"

export type TodoInputProps = {
  oninput: (_: string) => void
  idx: number
}

export const TodoInput = ({ oninput, idx }: TodoInputProps) => {
  const input_id = `todo-input-${idx}`
  return div(
    {
      className: cn("todo-input", "px-6", "lab-inp-btn"),
    },
    label({
      htmlFor: input_id,
      txt: "I need to:",
    }),
    div(
      { className: cn("d-flex", "flex-row") },
      input({
        id: input_id,
        className: "flex-grow-1",
        placeholder: "...",
        onchange: ({ target }) => {
          const input = target as HTMLInputElement
          const { value } = input
          if (non_empty(value)) {
            oninput(value)
          }
          input.value = ""
        },
      }),
      button(
        { className: cn("clickable", "flex-shrink-1") },
        i({ className: "fas fa-reply" }),
      ),
    ),
  )
}
