import { button, div } from "../../../../src/noact-elements"
import { cn } from "nda/dist/isomorphic/dom"
import { View } from "../../state"

export type TodoSelectProps = {
  onselect: (_: View) => void
  viewing: View
}

export const TodoSelect = ({ onselect, viewing }: TodoSelectProps) =>
  div(
    { className: cn("todo-select", "px-6") },
    button({
      txt: "Remaining",
      className: cn({ active: viewing === "todo" }),
      onclick: () => onselect("todo"),
    }),
    button({
      txt: "Done",
      className: cn({ active: viewing === "done" }),
      onclick: () => onselect("done"),
    }),
    button({
      txt: "Showall",
      className: cn({ active: viewing === "all" }),
      onclick: () => onselect("all"),
    }),
  )
