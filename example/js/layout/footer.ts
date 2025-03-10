import { a, footer, p, span } from "../../../src/noact-elements.js"

export type FooterProps = {}

export const Footer = ({}: FooterProps) =>
  footer(
    {},
    p(
      { className: "text-centre" },
      span({ txt: "© " }),
      a({ txt: "ms-jpq", href: "https://ms-jpq.github.io" }),
    ),
  )
