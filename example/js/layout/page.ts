import { Body, BodyProps } from "./body"
import { cn } from "nda/dist/isomorphic/dom"
import { div } from "../../../src/noact-elements"
import { filter } from "nda/dist/isomorphic/iterator"
import { Footer, FooterProps } from "./footer"
import { Header, HeaderProps } from "./header"
import { TodoItem, View } from "../state"

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
  const items = [
    ...filter(
      (i) => item_visible(body.viewing, last_view_update, i),
      body.items,
    ),
  ]
  return div(
    {
      id: "container",
      className: cn("d-grid", "mx-auto", "mt-12", "row-gap-12"),
    },
    Header(header),
    Body({ ...body, items }),
    Footer(footer),
  )
}
