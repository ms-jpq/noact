import { h1, header } from "../../../src/noact-elements.js"
import { cn } from "nda/iso/dom.js"

export type HeaderProps = {}

export const Header = ({}: HeaderProps) =>
  header(
    {
      className: cn(
        "d-grid",
        "text-centre",
        "ji-centre",
        "lightly-bordered",
        "py-8",
      ),
    },
    h1({ className: "font-w500", txt: "This Page is Rendered Using Noact" }),
  )
