"use client"

import { useReducer } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Counter reducer
interface CounterState {
  count: number
}

type CounterAction =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" }
  | { type: "set"; payload: number }

const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 }
    case "decrement":
      return { count: state.count - 1 }
    case "reset":
      return { count: 0 }
    case "set":
      return { count: action.payload }
    default:
      return state
  }
}

// Todo reducer
interface Todo {
  id: number
  text: string
  completed: boolean
}

interface TodoState {
  todos: Todo[]
  filter: "all" | "active" | "completed"
}

type TodoAction =
  | { type: "add_todo"; payload: string }
  | { type: "toggle_todo"; payload: number }
  | { type: "delete_todo"; payload: number }
  | { type: "set_filter"; payload: "all" | "active" | "completed" }
  | { type: "clear_completed" }

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case "add_todo":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
          },
        ],
      }
    case "toggle_todo":
      return {
        ...state,
        todos: state.todos.map((todo) => (todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo)),
      }
    case "delete_todo":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      }
    case "set_filter":
      return {
        ...state,
        filter: action.payload,
      }
    case "clear_completed":
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      }
    default:
      return state
  }
}

export default function UseReducerPage() {
  const [counterState, counterDispatch] = useReducer(counterReducer, { count: 0 })
  const [todoState, todoDispatch] = useReducer(todoReducer, {
    todos: [],
    filter: "all" as const,
  })

  const filteredTodos = todoState.todos.filter((todo) => {
    if (todoState.filter === "active") return !todo.completed
    if (todoState.filter === "completed") return todo.completed
    return true
  })

  const addTodo = (text: string) => {
    if (text.trim()) {
      todoDispatch({ type: "add_todo", payload: text.trim() })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20 px-4">
      <div className="max-w-6xl mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-purple-500/20 text-purple-300">React Hook</Badge>
          <h1 className="text-5xl font-bold text-white mb-4">useReducer</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The useReducer hook is an alternative to useState for managing complex state logic. It accepts a reducer
            function and returns the current state paired with a dispatch method.
          </p>
        </div>

        {/* Syntax */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Syntax</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-slate-900 p-4 rounded-lg text-green-400 overflow-x-auto">
              <code>{`const [state, dispatch] = useReducer(reducer, initialState)

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'ACTION_TYPE':
      return { ...state, /* new state */ }
    default:
      return state
  }
}`}</code>
            </pre>
          </CardContent>
        </Card>

        {/* Interactive Examples */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Counter Example */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Example 1: Counter</CardTitle>
              <CardDescription className="text-gray-400">Simple state management with actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-4">{counterState.count}</div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => counterDispatch({ type: "decrement" })}
                    variant="outline"
                    className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                  >
                    Decrement
                  </Button>
                  <Button
                    onClick={() => counterDispatch({ type: "increment" })}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Increment
                  </Button>
                  <Button
                    onClick={() => counterDispatch({ type: "reset" })}
                    variant="outline"
                    className="border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-white"
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={() => counterDispatch({ type: "set", payload: 10 })}
                    variant="outline"
                    className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white"
                  >
                    Set to 10
                  </Button>
                </div>
              </div>
              <pre className="bg-slate-900 p-3 rounded text-sm text-green-400 overflow-x-auto">
                <code>{`const counterReducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return { count: 0 }
    default:
      return state
  }
}`}</code>
              </pre>
            </CardContent>
          </Card>

          {/* Todo Stats */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Todo Statistics</CardTitle>
              <CardDescription className="text-gray-400">Complex state management example</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-400">{todoState.todos.length}</div>
                  <div className="text-gray-400 text-sm">Total</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-400">
                    {todoState.todos.filter((t) => !t.completed).length}
                  </div>
                  <div className="text-gray-400 text-sm">Active</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">
                    {todoState.todos.filter((t) => t.completed).length}
                  </div>
                  <div className="text-gray-400 text-sm">Completed</div>
                </div>
              </div>

              <div className="flex gap-1">
                {["all", "active", "completed"].map((filter) => (
                  <Button
                    key={filter}
                    onClick={() => todoDispatch({ type: "set_filter", payload: filter as any })}
                    variant={todoState.filter === filter ? "default" : "outline"}
                    size="sm"
                    className={
                      todoState.filter === filter
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                    }
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Todo App Example */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Example 2: Todo App</CardTitle>
            <CardDescription className="text-gray-400">Complex state with multiple action types</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Add a new todo"
                className="bg-slate-700 border-slate-600 text-white"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    addTodo(e.currentTarget.value)
                    e.currentTarget.value = ""
                  }
                }}
              />
              <Button
                onClick={(e) => {
                  const input = e.currentTarget.previousElementSibling as HTMLInputElement
                  addTodo(input.value)
                  input.value = ""
                }}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Add
              </Button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredTodos.map((todo) => (
                <div key={todo.id} className="flex items-center justify-between bg-slate-700 p-3 rounded">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => todoDispatch({ type: "toggle_todo", payload: todo.id })}
                      className="w-4 h-4"
                    />
                    <span className={`text-white ${todo.completed ? "line-through opacity-60" : ""}`}>{todo.text}</span>
                  </div>
                  <Button
                    onClick={() => todoDispatch({ type: "delete_todo", payload: todo.id })}
                    variant="outline"
                    size="sm"
                    className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                  >
                    Delete
                  </Button>
                </div>
              ))}
              {filteredTodos.length === 0 && (
                <div className="text-gray-400 text-center py-8">
                  {todoState.filter === "all" ? "No todos yet. Add one above!" : `No ${todoState.filter} todos.`}
                </div>
              )}
            </div>

            {todoState.todos.some((t) => t.completed) && (
              <Button
                onClick={() => todoDispatch({ type: "clear_completed" })}
                variant="outline"
                className="w-full border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
              >
                Clear Completed
              </Button>
            )}

            <pre className="bg-slate-900 p-3 rounded text-sm text-green-400 overflow-x-auto">
              <code>{`const todoReducer = (state, action) => {
  switch (action.type) {
    case 'add_todo':
      return {
        ...state,
        todos: [...state.todos, newTodo]
      }
    case 'toggle_todo':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      }
    // ... more cases
  }
}`}</code>
            </pre>
          </CardContent>
        </Card>

        {/* When to use useReducer */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">When to use useReducer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 p-4 rounded">
                <h4 className="text-green-400 font-medium mb-3">✅ Use useReducer when:</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Complex state logic with multiple sub-values</li>
                  <li>• State transitions depend on previous state</li>
                  <li>• Multiple actions affect the same state</li>
                  <li>• State updates are complex or interdependent</li>
                  <li>• You want predictable state updates</li>
                </ul>
              </div>

              <div className="bg-slate-900 p-4 rounded">
                <h4 className="text-yellow-400 font-medium mb-3">⚠️ Use useState when:</h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Simple state values (strings, numbers, booleans)</li>
                  <li>• Independent state updates</li>
                  <li>• State doesn't have complex logic</li>
                  <li>• Few state transitions</li>
                  <li>• Straightforward state management</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Points */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Key Points</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                useReducer is ideal for complex state logic and multiple related state variables
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                The reducer function must be pure and return a new state object
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Actions should be descriptive objects with a type property
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                dispatch function identity is stable and won't change between re-renders
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Can be combined with useContext for global state management
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
