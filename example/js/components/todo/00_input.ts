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
    { className: cn("todo-input", "px-6", "lab-inp-btn") },
    label({ txt: "I need to:", htmlFor: input_id }),
    input({
      id: input_id,
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
    button({}, i({ className: "fas fa-reply" })),
  )
}
