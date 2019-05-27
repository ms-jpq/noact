import bs from "bootstrap/dist/css/bootstrap.min.css"
import ps from "./page.css"
import { $, $$, AwaitFrame, Classes as _, DOMReady, Inc, Randomize, Range, Timer } from "./utils"
import { NewMountPoint, NNode } from "../src/noact"
import "@fortawesome/fontawesome-free/js/all"
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
} from "../src/noact-elements"

let renderPage: (_: AppState) => void = () => {}

const GITHUB_BASE = "crymetothemoon"

const enum View {
  notdone = "Remaining",
  done = "Done",
  showall = "Show all",
}

const enum TodoStatus {
  done = "done",
  notdone = "notdone",
  donependingupdate = "donependingupdate",
  notdonependingupdate = "notdonependingupdate",
}

type TodoItem = {
  id: number
  message: string
  status: TodoStatus
}

type AppState = {
  count: number
  viewing: View
  items: TodoItem[]
}

const Counter = Inc()

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

const spacerH = () => span({ className: ps.spacer })

const benchMark = ({ count, viewing, items }: AppState) =>
  div(
    { className: _(bs.mt3, bs.containerFluid) },
    div(
      { className: _(bs.row, bs.alignItemsCenter) },
      div(
        { className: bs.col },
        div(
          { className: bs.inputGroup },
          div(
            { className: bs.inputGroupPrepend },
            label({ htmlFor: "benchmark-input", className: bs.inputGroupText, txt: "Repeat this:" }),
          ),
          input({
            id: "benchmark-input",
            className: _(bs.formControl),
            type: "number",
            min: "0",
            max: "100",
            value: String(count),
          }),
          div(
            { className: bs.inputGroupAppend },
            button({
              className: _(bs.btn, bs.btnOutlineSecondary),
              txt: "GO",
              onclick: () => {
                const { value, max } = $<HTMLInputElement>(`#benchmark-input`)
                if (Number(value) > Number(max)) {
                  return
                }
                renderPage({ count: Number(value), viewing, items })
              },
            }),
          ),
        ),
      ),
      div({ className: _(bs.colAuto, bs.textRight) }, p({ className: _("timer", bs.mt1, bs.mb0), txt: "🐳" })),
    ),
  )

const todoComponent = ({ idx, count, viewing, items }: AppState & { idx: number }) => {
  const {
    [TodoStatus.done]: done,
    [TodoStatus.notdone]: notdone,
    [TodoStatus.donependingupdate]: donelimbo,
    [TodoStatus.notdonependingupdate]: notdonelimbo,
  }: Record<TodoStatus, TodoItem[]> = items.reduce(
    (acc, curr) => ({ ...acc, [curr.status]: [...acc[curr.status], curr] }),
    {
      [TodoStatus.done]: [],
      [TodoStatus.notdone]: [],
      [TodoStatus.donependingupdate]: [],
      [TodoStatus.notdonependingupdate]: [],
    },
  )

  const visibility = (status: TodoStatus) => {
    switch (viewing) {
      case View.done:
        return status === TodoStatus.done || status === TodoStatus.notdonependingupdate
      case View.notdone:
        return status === TodoStatus.notdone || status === TodoStatus.donependingupdate
      case View.showall:
        return true
    }
  }

  const totalUpdate = (view: View) => {
    const allDone = donelimbo.map((item) => ({ ...item, status: TodoStatus.done }))
    const allNotDone = notdonelimbo.map((item) => ({ ...item, status: TodoStatus.notdone }))
    renderPage({ count, viewing: view, items: [...done, ...allDone, ...notdone, ...allNotDone] })
  }

  const createTodoItem = ({ id, status, message }: TodoItem) =>
    li(
      { className: _(bs.listGroupItem, { [bs.dNone]: !visibility(status) }) },
      div(
        { className: _(bs.dFlex, bs.justifyContentBetween) },
        div(
          { className: _(bs.customControl, bs.customSwitch, bs.flexGrow1) },
          input({
            className: bs.customControlInput,
            type: "checkbox",
            checked: status === TodoStatus.done || status === TodoStatus.donependingupdate,
            id: `todo-list-${id}-${idx}`,
            oninput: ({ target }) => {
              const { checked } = target as HTMLInputElement
              const newStatus = (() => {
                switch (viewing) {
                  case View.done:
                    return checked ? TodoStatus.done : TodoStatus.notdonependingupdate
                  case View.notdone:
                    return checked ? TodoStatus.donependingupdate : TodoStatus.notdone
                  case View.showall:
                    return checked ? TodoStatus.done : TodoStatus.notdone
                }
              })()
              const newItems = items.map((item) => ({ ...item, status: item.id === id ? newStatus : item.status }))
              renderPage({ count, viewing, items: newItems })
            },
          }),
          label({
            className: _(bs.customControlLabel, bs.textWrap, bs.w100),
            htmlFor: `todo-list-${id}-${idx}`,
            txt: message,
          }),
        ),
        button(
          {
            className: bs.close,
            type: "button",
            onclick: () => {
              const newItems = items.filter((item) => item.id !== id)
              renderPage({ count, viewing, items: newItems })
            },
          },
          span({ txt: "×" }),
        ),
      ),
    )

  const createNavs = () =>
    [View.notdone, View.done, View.showall].map((view) =>
      li(
        { className: _(bs.navItem, ps.clickable) },
        a({
          className: _(bs.navLink, { [bs.active]: view === viewing }),
          txt: view,
          onclick: () => view !== viewing && totalUpdate(view),
        }),
      ),
    )

  const oninput = () => {
    const input = $<HTMLInputElement>(`#todo-input-${idx}`)
    if (!input.value) {
      return
    }
    const status = viewing === View.done ? TodoStatus.notdonependingupdate : TodoStatus.notdone
    renderPage({ count, viewing, items: [...items, { id: Counter(), message: input.value, status }] })
    input.value = ""
    $$(`.todo.list-group`).map((l) => (l.scrollTop = l.scrollHeight))
  }

  return div(
    { className: bs.card },
    div(
      { className: bs.cardHeader },
      div(
        { className: bs.inputGroup },
        div(
          { className: bs.inputGroupPrepend },
          label({ htmlFor: `todo-input-${idx}`, className: bs.inputGroupText, txt: "I need to:" }),
        ),
        input({
          id: `todo-input-${idx}`,
          className: bs.formControl,
          type: "text",
          placeholder: "...",
          onkeydown: ({ key }) => {
            if (key !== "Enter") {
              return
            }
            oninput()
          },
        }),
        div(
          { className: bs.inputGroupAppend },
          button({ className: _(bs.btn, bs.btnOutlineSecondary), onclick: oninput }, i({ className: "fas fa-reply" })),
        ),
      ),
      br(),
      ul({ className: _(bs.nav, bs.navTabs, bs.cardHeaderTabs) }, ...createNavs()),
    ),
    div(
      { className: bs.cardBody },
      ul({ className: _(bs.listGroupFlush, bs.overflowAuto, bs.pl1, ps.todoComponent) }, ...items.map(createTodoItem)),
    ),
    div(
      {
        className: _(
          bs.cardFooter,
          bs.textMuted,
          bs.dFlex,
          bs.justifyContentBetween,
          bs.alignItemsCenter,
          bs.py0,
          bs.pr0,
          ps.todoFooter,
        ),
      },
      p({ className: bs.m0, txt: `${[...notdone, ...notdonelimbo].length} items left` }),
      button(
        {
          className: _(bs.btn, { [bs.invisible]: [...donelimbo, ...notdonelimbo].length == 0 }),
          onclick: () => totalUpdate(viewing),
        },
        i({
          className: "fas fa-sync",
        }),
      ),
    ),
  )
}

const page = (...children: NNode[]) => div({ className: ps.pageBody }, ...children)

const head = () =>
  header(
    {
      dataset: { toggle: "tooltip", placement: "bottom" },
      title: "HELLO! :)",
    },
    br(),
    div(
      { className: _(bs.jumbotron, bs.mxAuto, bs.textCenter) },
      h2({ txt: "This Page is Rendered Using Noact" }),
      p({ className: "timer", txt: "🐳" }),
    ),
    br(),
  )

const readme = (performanceComponent: NNode, demoComponents: NNode[]) =>
  div(
    { className: bs.card },
    div(
      { className: _(bs.cardHeader, bs.py0, ps.todoHeader) },
      h6(
        { className: _(bs.cardTitle, bs.dFlex, bs.mt2) },
        span({ className: "fas fa-book" }),
        spacerH(),
        a({
          target: "_blank",
          rel: "noopener",
          txt: "README (Github)",
          href: `https://${GITHUB_BASE}.github.io/noact/`,
        }),
      ),
    ),
    div(
      { className: bs.cardBody },
      section({}, h2({ innerHTML: `${strike({ txt: "Re" })().outerHTML}Noact` })),
      hr({ className: bs.borderDark }),
      section(
        {},
        p({ txt: "Noact is a minimal self-rendering Virtual DOM library." }),
        ul(
          {},
          li(
            {},
            p({
              innerHTML: `${
                b({ txt: "Declarative:" })().outerHTML
              } Pretty much like React, without the JSX compilation of course, hence the name.`,
            }),
          ),
          li(
            {},
            p({
              innerHTML: `${
                b({ txt: "Type safe:" })().outerHTML
              } Noact is completely typesafe, which means you get static type checking for free!`,
            }),
          ),
          li(
            {},
            p({
              innerHTML: `${b({ txt: "Simple:" })().outerHTML} Only ${
                a({
                  target: "blank",
                  rel: "noopener",
                  txt: "60 lines",
                  href: `https://github.com/${GITHUB_BASE}/noact/blob/master/src/noact.ts`,
                })().outerHTML
              } of type declarations & rendering code. (and 10ish lines of code-gen code)`,
            }),
          ),
        ),
      ),
      hr({ className: bs.borderDark }),
      section(
        {},
        h4({ txt: "How it feels to write Noact" }),
        img({
          className: _(bs.rounded, bs.imgFluid),
          src: Assets("demo.gif"),
        }),
        p({ txt: "- explosions -" }),
        p({
          className: _(bs.mb0),
          innerHTML: `Even has support for ${b({ txt: "style auto complete" })().outerHTML}`,
        }),
        img({
          className: _(bs.rounded, bs.imgFluid),
          src: Assets("type_demo.png"),
        }),
      ),
      hr({ className: bs.borderDark }),
      section(
        {},
        h4({ txt: "Todo App" }),
        performanceComponent,
        hr({ className: bs.borderDark }),
        ...demoComponents.flatMap((c) => [c, br()]),
      ),
      hr({ className: bs.borderDark }),
      section(
        {},
        h4({ txt: "Source code" }),
        ul(
          {},
          li(
            {},
            a({
              target: "_blank",
              rel: "noopener",
              txt: "Rendering Engine (60 lines)",
              href: `https://github.com/${GITHUB_BASE}/noact/blob/master/src/noact.ts`,
            }),
          ),
          li(
            {},
            a({
              target: "_blank",
              rel: "noopener",
              txt: "This page",
              href: `https://github.com/${GITHUB_BASE}/noact/blob/master/example/index.ts`,
            }),
          ),
        ),
      ),
    ),
  )

const main = async () => {
  await DOMReady()
  const mount = NewMountPoint(document.body)
  renderPage = async ({ count, viewing, items }) => {
    const time = Timer()
    const sorted = items.sort((a, b) => a.id - b.id)
    mount(
      page(
        head(),
        readme(
          benchMark({ count, viewing, items: sorted }),
          Range(1, count).map((idx) => todoComponent({ count, viewing, items: sorted, idx })),
        ),
      ),
    )
    const elapsed = time().toFixed(1)
    await AwaitFrame()
    const { length } = $$(`*`)
    $$(`.timer`).forEach((e) => (e.textContent = `rendered ${length} elements in ${elapsed}ms`))
  }

  renderPage({ count: 1, viewing: View.notdone, items: DEFAULT_ITEMS })
  document.title = "Noact"
}

main()

const Assets = (uri: string) => require(`../_assets/${uri}`)
