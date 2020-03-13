import { button, div, h4 } from "../../../../src/noact-elements"
import { cn } from "nda/dist/isomorphic/dom"
import { View } from "../../state"

export type TodoSelectProps = {
  onselect: (_: View) => void
  viewing: View
}

export const TodoSelect = ({ onselect, viewing }: TodoSelectProps) =>
  div(
    { className: cn("todo-select", "px-6", "mt-4") },
    button(
      {
        className: cn({ active: viewing === "todo" }),
        onclick: () => onselect("todo"),
      },
      h4({ txt: "Remaining" }),
    ),
    button(
      {
        className: cn({ active: viewing === "done" }),
        onclick: () => onselect("done"),
      },
      h4({ txt: "Done" }),
    ),
    button(
      {
        className: cn({ active: viewing === "all" }),
        onclick: () => onselect("all"),
      },
      h4({ txt: "Showall" }),
    ),
  )
