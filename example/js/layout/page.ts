import { cn } from "nda/iso/dom.js"
import { filter } from "nda/iso/iterator.js"
import { div } from "../../../src/noact-elements.js"
import { type TodoItem, type View } from "../state.js"
import { Body, type BodyProps } from "./body.js"
import { Footer, type FooterProps } from "./footer.js"
import { Header, type HeaderProps } from "./header.js"

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
    ...filter(body.items, (i) =>
      item_visible(body.viewing, last_view_update, i),
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
