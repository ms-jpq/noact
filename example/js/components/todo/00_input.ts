import { button, div, i, input, span } from "../../../../src/noact-elements"

export type TodoInputProps = {
  oninput: (_: string) => void
}

export const TodoInput = ({ oninput }: TodoInputProps) =>
  div(
    { className: "todo-input" },
    span(
      { txt: "I need to:" },
      input({
        onchange: ({ target }) => {
          const { value } = target as HTMLInputElement
          oninput(value)
        },
      }),
      button({}, i({ className: "fas fas-reply" })),
    ),
  )
