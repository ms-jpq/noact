import {
  div,
  a,
  h1,
  strike,
  span,
  article,
  p,
  i,
  hr,
  ul,
  li,
  b,
  h2,
  img,
  section,
} from "../../../src/noact-elements"

export type ReadmeProps = {}

export const Readme = ({}: ReadmeProps) =>
  section(
    { id: "readme" },
    div({}, p({}, i({ className: "fas fa-book" }), span({ txt: "README.md" }))),
    article(
      {},
      h1({}, a({}, strike({ txt: "Re" }), span({ txt: "Noact" }))),
      hr(),
      p({ txt: "Noact is a minimal self-rendering Virtual DOM library." }),
      ul(
        {},
        li(
          {},
          b({ txt: "Declarative:" }),
          span({
            txt:
              "Pretty much like React, without the JSX compilation of course, hence the name.",
          }),
        ),
        li(
          {},
          b({ txt: "Type safe:" }),
          span({ txt: "Noact is completely typesafe, which means you get" }),
          a({
            txt: "static type checking",
            href:
              "https://github.com/ms-jpq/Noact/blob/master/_assets/auto_complete.gif",
          }),
          span({ txt: "for free!" }),
        ),
        li(
          {},
          b({ txt: "Simple:" }),
          a({
            txt: "Only 60 lines",
            href: "https://github.com/ms-jpq/Noact/blob/master/src/noact.ts",
          }),
          span({
            txt:
              "of type declarations & rendering code. (and 10ish lines of code-gen code)",
          }),
        ),
      ),
      hr(),
      h2({ txt: "How it feels to write Noact" }),
      img({
        src:
          "https://raw.githubusercontent.com/ms-jpq/Noact/master/_assets/demo.gif",
      }),
      b({ txt: "- Explosions -" }),
      p(
        {},
        span({ txt: "Even has support for" }),
        b({ txt: "style auto complete" }),
      ),
    ),
  )
