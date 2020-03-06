export type View = "todo" | "done" | "all"

export type TodoItem = {
  last_update: number
  status: "done" | "todo"
  message: string
}

export type AppState = {
  todo_sections: number
  viewing: View
  items: TodoItem[]
}
