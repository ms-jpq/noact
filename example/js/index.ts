import { counter } from "nda/dist/isomorphic/prelude"
import { map } from "nda/dist/isomorphic/list"
import { NewMountPoint, NNode } from "../../src/noact"
import { shuffle } from "nda/dist/isomorphic/rand"
import {
  a,
  b,
  br,
  button,
  div,
  h2,
  h4,
  h6,
  header,
  hr,
  i,
  img,
  input,
  label,
  li,
  p,
  section,
  span,
  strike,
  ul,
} from "../../src/noact-elements"

const GITHUB_BASE = "ms-jpq"

const enum View {
  notdone = "Remaining",
  done = "Done",
  showall = "Show all",
}

type TodoItem = {
  last_update: number
  status: "done" | "todo"
  message: string
}

type AppState = {
  count: number
  viewing: View
  items: TodoItem[]
}

const inc = counter()

const DEFAULT_ITEMS: TodoItem[] = map(
  (i) => ({ ...i, last_update: inc() }),
  shuffle<Pick<TodoItem, "status" | "message">>([
    { message: "Printer ran out of juice again", status: "todo" },
    { message: "Something about neighbour's cat", status: "todo" },
    { message: "Go to bed before 1AM", status: "todo" },
    { message: "Craig owes me money?", status: "todo" },
    { message: "👋Hire me👋", status: "todo" },
    { message: "Draw a prefect circle", status: "todo" },
    { message: "Take out trash", status: "done" },
    { message: "Ask Jenny for penny", status: "done" },
    { message: "Get groceries", status: "done" },
    { message: "Download Mob Psycho", status: "done" },
  ]),
)
