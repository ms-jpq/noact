import { Benchmark, BenchmarkProps } from "../components/benchmark"
import { cn } from "nda/dist/isomorphic/dom"
import { h1, header } from "../../../src/noact-elements"

export type HeaderProps = {} & BenchmarkProps

export const Header = ({}: HeaderProps) =>
  header(
    { className: cn("text-ellipsis", "text-centre") },
    h1({ txt: "This Page is Rendered Using Noact" }),
    Benchmark({}),
  )
