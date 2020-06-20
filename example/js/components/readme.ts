import { cn } from "nda/dist/isomorphic/dom"
import {
  div,
  a,
  h1,
  strike,
  span,
  p,
  i,
  hr,
  ul,
  li,
  b,
  h2,
  img,
  section,
  h6,
  h4,
} from "../../../src/noact-elements"

export type ReadmeProps = {}

export const Readme = ({}: ReadmeProps) =>
  section(
    { id: "readme", className: cn("lightly-bordered") },
    div(
      { id: "readme-header", className: cn("px-6", "py-1") },
      h4(
        { className: "mp-0" },
        i({ className: "fas fa-book" }),
        span({ txt: " README.md" }),
      ),
    ),
    div(
      { id: "readme-body", className: cn("px-6", "pt-1") },
      h1(
        {},
        a(
          { href: "https://ms-jpq.github.io/noact" },
          strike({ txt: "Re" }),
          span({ txt: "Noact" }),
        ),
      ),
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
              "https://github.com/ms-jpq/Noact/blob/noact/_assets/auto_complete.gif",
          }),
          span({ txt: "for free!" }),
        ),
        li(
          {},
          b({ txt: "Simple:" }),
          a({
            txt: "Only 60 lines",
            href: "https://github.com/ms-jpq/Noact/blob/noact/src/noact.ts",
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
        className: "img-responsive",
        src:
          "https://raw.githubusercontent.com/ms-jpq/Noact/noact/_assets/demo.gif",
      }),
      p({}, b({ txt: "- Explosions -" })),
      p(
        {},
        span({ txt: "Even has support for" }),
        b({ txt: "style auto complete" }),
      ),
      img({
        className: "img-responsive",
        src:
          "https://raw.githubusercontent.com/ms-jpq/Noact/noact/_assets/type_demo.png",
      }),
      hr(),
      h2({ txt: "Source code" }),
      ul(
        {},
        li(
          {},
          a({
            txt: "Rendering Engine",
            href: "https://github.com/ms-jpq/noact/tree/noact/src",
          }),
        ),
        li(
          {},
          a({
            txt: "This Page",
            href: "https://github.com/ms-jpq/noact/tree/noact/example",
          }),
        ),
      ),
    ),
  )
