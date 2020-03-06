import { Benchmark, BenchmarkProps } from "../components/benchmark"
import { h1, header } from "../../../src/noact-elements"

export type HeaderProps = {} & BenchmarkProps

export const Header = ({ elements, time_elapsed }: HeaderProps) =>
  header(
    {},
    h1({ txt: "This Page is Rendered Using Noact" }),
    Benchmark({ elements, time_elapsed }),
  )
