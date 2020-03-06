import { Body, BodyProps } from "./body"
import { div } from "../../../src/noact-elements"
import { filter, sort_by_keys } from "nda/dist/isomorphic/list"
import { Footer, FooterProps } from "./footer"
import { Header, HeaderProps } from "./header"
import { TodoItem, TodoStatus, View } from "../state"

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

const sort_todos = (last_view_update: number, items: TodoItem[]) =>
  sort_by_keys(
    (i) => [
      i.last_update > last_view_update ? 1 : 0,
      idx_by_status(i.status),
      i.last_update,
    ],
    items,
  )

const item_visible = (view: View, last_view_update: number, item: TodoItem) => {
  switch (view) {
    case "all":
      return true
    case "todo":
      return item.last_update > last_view_update || item.status === "todo"
    case "done":
      return item.last_update > last_view_update || item.status === "done"
  }
}

export type PageProps = {
  last_view_update: number
  header: HeaderProps
  body: BodyProps
  footer: FooterProps
}

export const Page = ({ last_view_update, header, body, footer }: PageProps) => {
  const sorted = sort_todos(last_view_update, body.items)
  const items = filter(
    (i) => item_visible(body.viewing, last_view_update, i),
    sorted,
  )
  return div(
    { id: "container", className: "d-grid" },
    Header(header),
    Body({ ...body, items }),
    Footer(footer),
  )
}
