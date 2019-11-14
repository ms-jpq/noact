# [~~Re~~Noact](https://ms-jpq.github.io/noact/)

Noact is a minimal **_self-rendering_** Virtual DOM library.

- **Declarative:** Pretty much like React, without the JSX compilation of course, hence the name.
- **Type safe:** Noact is completely typesafe, which means you get [static type checking][auto complete gif] for free!
- **Simple:** [Only 60 lines][60 lines] of type declarations & rendering code. (and 10ish lines of code-gen code)

## [Example App](https://ms-jpq.github.io/noact-page/)

## How it feels to write Noact

![demo.gif]

**\- Explosions \-**

Even has support for **style auto complete**

![typedemo.png]

## Usage

Noact is inspired by the syntax of the [elm HTML engine][elm html]

```Typescript
import { button, div } from "./NoactElements"
const component1 = div({},
    button({ onclick: () => alert(":D"), txt: "+" }),
    div({ txt: "♥" }),
    button({ onclick: () => alert("D:"), txt: "-" })
)
```

`component1` is a memoized `() => HTMLElement` function, `component1()` will give you back

```HTML
<div>
  <button>+</button>
  <div>♥</div>
  <button>-</button>
</div>
```

You can use `component1` as it is, or compose it in a Virtual DOM configuration

```Typescript
import { createMountPoint } from "./Noact"
const mount = createMountPoint(document.querySelector(`#root`))
const remount = () => mount(
    component1,
    span({ txt: new Date().toString() })
)
setInterval(remount, 1000)
```

Here the root element will be populated with both `component1` and `span`. Every 1000ms, `#root > span` and only `#root > span` will be updated.

In essence, `component1` is both the rendering function, and the virtual DOM.

## License

[MIT License][mit]

[demo.gif]: https://raw.githubusercontent.com/ms-jpq/Noact/master/_assets/demo.gif
[typedemo.png]: https://raw.githubusercontent.com/ms-jpq/Noact/master/_assets/type_demo.png
[auto complete gif]: https://github.com/ms-jpq/Noact/blob/master/_assets/auto_complete.gif
[elm html]: https://package.elm-lang.org/packages/elm/html/latest/
[mit]: https://github.com/ms-jpq/Noact/blob/master/LICENSE
[60 lines]: https://github.com/ms-jpq/Noact/blob/master/src/noact.ts
