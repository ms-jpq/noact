import { $$, wait_frame } from "nda/dist/browser/dom"
import { Body, BodyProps } from "./layout/body"
import { count, filter, map, sort_by_keys } from "nda/dist/isomorphic/list"
import { counter, timer } from "nda/dist/isomorphic/prelude"
import { Footer, FooterProps } from "./layout/footer"
import { Header, HeaderProps } from "./layout/header"
import { NewMountPoint } from "../../src/noact"
import { shuffle } from "nda/dist/isomorphic/rand"
import { State, TodoItem, TodoStatus, View } from "./state"

const inc = counter()
const t = timer()
const mount = NewMountPoint(document.body)

const invert_status = (status: TodoStatus) => {
  switch (status) {
    case "todo":
      return "done"
    case "done":
      return "todo"
    default:
      throw new Error("invaild status")
  }
}

const idx_by_status = (status: TodoStatus) => {
  switch (status) {
    case "todo":
      return 1
    case "done":
      return 2
    default:
      throw new Error("invaild status")
  }
}

const sort_todos = (items: TodoItem[]) =>
  sort_by_keys((i) => [idx_by_status(i.status), i.last_update], items)

const INIT_ITEMS: TodoItem[] = sort_todos(
  map(
    (i) => ({ ...i, id: inc(), last_update: inc() }),
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
  ),
)

const INIT_STATE: State = {
  todo_sections: 1,
  viewing: "todo",
  items: INIT_ITEMS,
}

type PageProps = {
  header: HeaderProps
  body: BodyProps
  footer: FooterProps
}

const Page = ({ header, body, footer }: PageProps) => [
  Header(header),
  Body(body),
  Footer(footer),
]

const perf_counter = async () => {
  await wait_frame()
  const time = t()
  const count = $$("*").length
  const benchmarks = $$<HTMLOutputElement>(".benchmark-output")
  for (const benchmark of benchmarks) {
    benchmark.value = `rendered ${count} elements in ${time}ms`
  }
}

const update = async ({ todo_sections, viewing, items }: State) => {
  const on_new_bench = (todo_sections: number) =>
    update({ todo_sections, items, viewing })

  const oninput = (message: string) => {
    const new_item: TodoItem = {
      status: "todo",
      id: inc(),
      last_update: Date.now(),
      message,
    }
    const new_items = sort_todos([...items, new_item])
    update({ todo_sections, items: new_items, viewing })
  }

  const ontoggle = (item: TodoItem) => {
    const new_items = map(
      (i) => ({
        ...i,
        status: i.id === item.id ? invert_status(i.status) : i.status,
      }),
      items,
    )
    update({ todo_sections, items: new_items, viewing })
  }

  const onremove = (item: TodoItem) => {
    const new_items = filter((i) => i.id !== item.id, items)
    update({ todo_sections, items: new_items, viewing })
  }

  const onselect = (viewing: View) => update({ todo_sections, items, viewing })

  const still_todo_count = count((i) => i.status === "todo", items)

  const body: BodyProps = {
    todo_sections,
    viewing,
    items,
    on_new_bench,
    oninput,
    ontoggle,
    onremove,
    onselect,
    still_todo_count,
  }

  const page: PageProps = {
    header: {},
    body: body,
    footer: {},
  }

  mount(...Page(page))
  await perf_counter()
}
