export type View = "todo" | "done" | "all"

export type TodoStatus = "done" | "todo"

export type TodoItem = {
  id: number
  last_update: number
  status: TodoStatus
  message: string
}

export type State = {
  todo_sections: number
  viewing: {
    view: View
    last_update: number
  }
  items: TodoItem[]
}

export const [MIN_TODOS, MAX_TODOS] = [1, 100]
