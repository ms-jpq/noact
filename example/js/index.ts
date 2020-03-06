import { Body, BodyProps } from "./layout/body"
import { counter } from "nda/dist/isomorphic/prelude"
import { Footer, FooterProps } from "./layout/footer"
import { Header, HeaderProps } from "./layout/header"
import { map } from "nda/dist/isomorphic/list"
import { NewMountPoint } from "../../src/noact"
import { shuffle } from "nda/dist/isomorphic/rand"
import { TodoItem } from "./state"

const inc = counter()
const mount = NewMountPoint(document.body)

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

type PageProps = {
  header: HeaderProps
  body: BodyProps
  footer: FooterProps
}

const render = ({ header, body, footer }: PageProps) =>
  mount(Header(header), Body(body), Footer(footer))
