import { button, div, i, input, label } from "../../../../src/noact-elements"

export type TodoInputProps = {
  oninput: (_: string) => void
  idx: number
}

export const TodoInput = ({ oninput, idx }: TodoInputProps) => {
  const input_id = `todo-input-${idx}`
  return div(
    { className: "todo-input" },
    label({ txt: "I need to:", htmlFor: input_id }),
    input({
      id: input_id,
      onchange: ({ target }) => {
        const { value } = target as HTMLInputElement
        oninput(value)
      },
    }),
    button({}, i({ className: "fas fa-reply" })),
  )
}
