import { count_by, filter, map } from "nda/iso/iterator.js"
import { counter, sleep, timer } from "nda/iso/prelude.js"
import { int } from "nda/iso/rand.js"
import { $$ } from "nda/web/dom.js"
import { NewMountPoint } from "../../src/noact.js"
import "../css/page.scss"
import { type BodyProps } from "./layout/body.js"
import { Page, type PageProps } from "./layout/page.js"
import {
  MAX_TODOS,
  MIN_TODOS,
  type State,
  type TodoItem,
  type TodoStatus,
  type View,
} from "./state.js"

const inc = counter()
const mount = NewMountPoint(document.body)

// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
const shuffle = <const T>(pool: Iterable<T>) => {
  const coll = [...pool]
  for (let i = coll.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[coll[i], coll[j]] = [coll[j]!, coll[i]!]
  }
  return coll
}

const idx_by_status = (status: TodoStatus) => {
  switch (status) {
    case "todo":
      return 1
    case "done":
      return 2
    default:
      throw new Error("invalid status")
  }
}

const sort_todos = (items: TodoItem[]) =>
  [...items].sort((l, r) => {
    const a = idx_by_status(l.status)
    const b = idx_by_status(r.status)
    if (a !== b) {
      return a - b
    }
    return l.last_update - r.last_update
  })

const INIT_ITEMS = sort_todos([
  ...map(
    shuffle([
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
    (i) => ({ ...i, id: inc(), last_update: inc() }),
  ),
])

const INIT_STATE: State = {
  todo_sections: 1,
  viewing: {
    view: "todo",
    last_update: Date.now(),
  },
  items: INIT_ITEMS,
}

const invert_status = (status: TodoStatus) => {
  switch (status) {
    case "todo":
      return "done"
    case "done":
      return "todo"
    default:
      throw new Error("invalid status")
  }
}

const perf = async (draw: () => void) => {
  const t = timer()
  draw()
  await sleep(0)
  const elapsed = Math.round(t())
  const count = $$("*").length
  const benchmarks = $$<HTMLOutputElement>(".benchmark-output")
  for (const benchmark of benchmarks) {
    benchmark.value = `rendered ${count} elements in ${elapsed}ms`
  }
}

const update = ({ todo_sections, viewing, items }: State) => {
  const on_new_bench = (val: number) => {
    const todo_sections = Math.min(MAX_TODOS, Math.max(MIN_TODOS, val))
    update({ todo_sections, items, viewing })
  }

  const onrandom = () =>
    update({ items, viewing, todo_sections: int(MIN_TODOS, MAX_TODOS) })

  const oninput = (message: string) => {
    const new_item: TodoItem = {
      status: "todo",
      id: inc(),
      last_update: Date.now(),
      message,
    }
    const new_items = [...items, new_item]
    update({ todo_sections, items: new_items, viewing })
  }

  const ontoggle = (item: TodoItem) => {
    const new_items = [
      ...map(items, (i) => ({
        ...i,
        status: i.id === item.id ? invert_status(i.status) : i.status,
        last_update: i.id === item.id ? Date.now() : i.last_update,
      })),
    ]
    update({ todo_sections, items: new_items, viewing })
  }

  const onremove = (item: TodoItem) => {
    const new_items = [...filter(items, (i) => i.id !== item.id)]
    update({ todo_sections, items: new_items, viewing })
  }

  const onselect = (view: View) => {
    if (view !== viewing.view) {
      update({
        todo_sections,
        items: sort_todos(items),
        viewing: { view, last_update: Date.now() },
      })
    }
  }

  const still_todo_count = count_by(items, (i) => i.status === "todo")

  const body: BodyProps = {
    todo_sections,
    viewing: viewing.view,
    items,
    onrandom,
    on_new_bench,
    oninput,
    ontoggle,
    onremove,
    onselect,
    still_todo_count,
  }

  const page: PageProps = {
    last_view_update: viewing.last_update,
    header: {},
    body: body,
    footer: {},
  }

  perf(() => mount(Page(page)))
}

update(INIT_STATE)
