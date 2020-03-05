import { NewMountPoint, NNode } from "../../src/noact"
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

type TodoStatus = "done" | "todo"
type TodoItem = {
  last_update: number
  message: string
  status: TodoStatus
}

type AppState = {
  count: number
  viewing: View
  items: TodoItem[]
}

const DEFAULT_ITEMS: TodoItem[] = Randomize([
  { message: "Printer ran out of juice again", status: TodoStatus.notdone },
  { message: "Something about neighbour's cat", status: TodoStatus.notdone },
  { message: "Go to bed before 1AM", status: TodoStatus.notdone },
  { message: "Craig owes me money?", status: TodoStatus.notdone },
  { message: "👋Hire me👋", status: TodoStatus.notdone },
  { message: "Draw a prefect circle", status: TodoStatus.notdone },
  { message: "Take out trash", status: TodoStatus.done },
  { message: "Ask Jenny for penny", status: TodoStatus.done },
  { message: "Get groceries", status: TodoStatus.done },
  { message: "Download Mob Psycho", status: TodoStatus.done },
]).map((item) => ({ ...item, id: Counter() }))
